#!/usr/bin/env python3
"""
detailed_quickscan.py

- Scans one or more targets (IP/hostname/CIDR/comma-list).
- Inclusive port range or small list.
- For each open TCP port: reverse DNS, service name, banner grab.
- Special-case: HTTP HEAD for web ports; SSL cert subject for 443.
- Writes results to scan_results.csv
- Use only on hosts you own / have permission to test.
"""

import socket
import ipaddress
import time
import csv
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed

try:
    input = raw_input  # py2 compatibility if needed
except NameError:
    pass

# ---------- Config ----------
TIMEOUT = 1.5          # seconds for socket operations
MAX_WORKERS = 60       # concurrency - lower this if you're on a congested network
CSV_FILE = "scan_results.csv"
HTTP_PORTS = {80, 8000, 8080, 8888}
# ----------------------------

def parse_targets(user):
    """Accept comma separated IPs/hosts and CIDR. Return list of IPv4 strings."""
    parts = [p.strip() for p in user.split(",") if p.strip()]
    out = set()
    for p in parts:
        try:
            if "/" in p:
                net = ipaddress.ip_network(p, strict=False)
                for ip in net.hosts():
                    out.add(str(ip))
                continue
            # literal IPv4?
            try:
                ipaddress.IPv4Address(p)
                out.add(p)
                continue
            except Exception:
                # try resolve hostname
                addr = socket.gethostbyname(p)
                out.add(addr)
        except Exception as e:
            print(f"[!] Could not parse or resolve '{p}': {e}")
    return sorted(out)

def reverse_dns(ip):
    try:
        name, _, _ = socket.gethostbyaddr(ip)
        return name
    except Exception:
        return ""

def service_name(port):
    try:
        return socket.getservbyport(port, "tcp")
    except Exception:
        return ""

def banner_grab(ip, port, timeout, hostname_for_tls=None):
    """
    Try to read an initial banner. For HTTP ports, send a HEAD to get headers.
    For port 443, try an SSL handshake and pull certificate subject (best-effort).
    Returns: (banner_text, http_headers_text, tls_cert_subject)
    """
    banner = ""
    http_headers = ""
    tls_subject = ""
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(timeout)
    try:
        res = s.connect_ex((ip, port))
        if res != 0:
            return banner, http_headers, tls_subject, res  # non-zero -> closed/filtered
        # connected
        # For HTTPS (443) attempt TLS handshake and get cert subject
        if port == 443:
            try:
                import ssl
                ctx = ssl.create_default_context()
                # do not verify certificates here; just get subject
                wrapped = ctx.wrap_socket(s, server_hostname=hostname_for_tls or ip)
                cert = wrapped.getpeercert()
                # Extract commonName or subject
                subject = cert.get('subject', ())
                # flatten subject tuples
                parts = []
                for t in subject:
                    for kv in t:
                        parts.append(f"{kv[0]}={kv[1]}")
                tls_subject = ", ".join(parts)
                # try a HEAD after TLS handshake
                try:
                    wrapped.settimeout(timeout)
                    wrapped.sendall(b"HEAD / HTTP/1.0\r\nHost: %s\r\n\r\n" % ((hostname_for_tls or ip).encode()))
                    data = wrapped.recv(4096)
                    if data:
                        http_headers = data.decode(errors="replace")
                except Exception:
                    pass
                try:
                    wrapped.close()
                except Exception:
                    pass
                return banner, http_headers, tls_subject, 0
            except Exception:
                # fall through to plain banner grab if TLS failed
                pass
        # For common HTTP ports send HEAD (not for TLS ports unless wrapped)
        if port in HTTP_PORTS:
            try:
                req = f"HEAD / HTTP/1.0\r\nHost: {ip}\r\n\r\n".encode()
                s.sendall(req)
                data = s.recv(4096)
                if data:
                    http_headers = data.decode(errors="replace")
            except Exception:
                pass
        # Generic banner read attempt: some services send a banner (SMTP, FTP, etc.)
        try:
            s.settimeout(0.8)
            data = s.recv(2048)
            if data:
                banner = data.decode(errors="replace")
        except Exception:
            # no initial banner
            pass
        try:
            s.close()
        except Exception:
            pass
        return banner, http_headers, tls_subject, 0
    except Exception as e:
        try:
            s.close()
        except Exception:
            pass
        return banner, http_headers, tls_subject, 999  # indicate error
        

def scan_port_record(ip, port, timeout, hostname_for_tls=None):
    """Return a dict with scan result and extra details (best-effort)."""
    result = {
        "target_ip": ip,
        "port": port,
        "is_open": False,
        "connect_code": None,
        "service": "",
        "banner": "",
        "http_headers": "",
        "tls_subject": "",
        "rDNS": "",
        "error": ""
    }
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(timeout)
        res = s.connect_ex((ip, port))
        s.close()
        result["connect_code"] = res
        if res != 0:
            return result
        # port is open
        result["is_open"] = True
        result["service"] = service_name(port)
        # rDNS
        try:
            result["rDNS"] = reverse_dns(ip)
        except Exception:
            result["rDNS"] = ""
        # banner / special probes
        banner, headers, tls_subj, errcode = banner_grab(ip, port, timeout, hostname_for_tls)
        result["banner"] = banner.strip()
        result["http_headers"] = headers.strip()
        result["tls_subject"] = tls_subj.strip()
        if errcode not in (0, None):
            result["error"] = f"banner_grab_err={errcode}"
    except Exception as e:
        result["error"] = str(e)
    return result

def save_csv_row(row, fname=CSV_FILE):
    header = ["timestamp","target_ip","rDNS","port","is_open","service","banner","http_headers","tls_subject","connect_code","error"]
    write_header = False
    try:
        # check if file exists by trying to open for reading
        with open(fname, "r", newline="") as fr:
            pass
    except FileNotFoundError:
        write_header = True
    with open(fname, "a", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        if write_header:
            w.writerow(header)
        w.writerow([time.strftime("%Y-%m-%d %H:%M:%S"),
                    row.get("target_ip",""),
                    row.get("rDNS",""),
                    row.get("port",""),
                    "yes" if row.get("is_open") else "no",
                    row.get("service",""),
                    row.get("banner",""),
                    row.get("http_headers",""),
                    row.get("tls_subject",""),
                    row.get("connect_code",""),
                    row.get("error","")])

def main():
    print("detailed_quickscan.py — only scan machines you own/have permission to test.\n")
    targets_in = input("Enter target(s) (IP/hostname/CIDR or comma list): ").strip()
    targets = parse_targets(targets_in)
    if not targets:
        print("No valid targets parsed. Exiting.")
        return
    print("Resolved targets:", targets)
    try:
        p1 = int(input("Enter first port to scan (1-65535): ").strip())
        p2 = int(input("Enter last port to scan (1-65535): ").strip())
    except ValueError:
        print("Ports must be integers.")
        return
    if p1 < 1 or p2 < 1 or p1 > 65535 or p2 > 65535:
        print("Ports must be 1..65535.")
        return
    if p1 > p2:
        p1, p2 = p2, p1
    consent = input("Do you confirm you own these machines / have permission? (yes/no): ").strip().lower()
    if consent not in ("y","yes"):
        print("Aborting (permission required).")
        return

    ports = list(range(p1, p2 + 1))
    print(f"\nScanning {len(targets)} target(s) x {len(ports)} port(s) with timeout={TIMEOUT}s (max_workers={MAX_WORKERS}).")
    print("Results will be appended to", CSV_FILE)
    print("Press Ctrl+C to stop.\n")

    for ip in targets:
        print(f"--- Scanning target {ip} ---")
        # For TLS hostname, prefer reverse DNS name if available; use ip otherwise
        hostname_for_tls = ip
        # We'll try rDNS inside worker too; but do a quick lookup now
        try:
            rd = reverse_dns(ip)
            if rd:
                hostname_for_tls = rd
        except Exception:
            pass
        with ThreadPoolExecutor(max_workers=MAX_WORKERS) as ex:
            futures = {ex.submit(scan_port_record, ip, port, TIMEOUT, hostname_for_tls): port for port in ports}
            try:
                for fut in as_completed(futures):
                    row = fut.result()
                    port = row["port"]
                    if row.get("is_open"):
                        print(f"[OPEN] {ip}:{port}  service={row.get('service') or 'unknown'}  rDNS={row.get('rDNS') or '-'}")
                        if row.get("banner"):
                            print("  banner:", row["banner"].splitlines()[0][:200])
                        if row.get("http_headers"):
                            print("  http headers:", (row["http_headers"].splitlines()[0])[:200])
                        if row.get("tls_subject"):
                            print("  tls subject:", row["tls_subject"])
                    # Save every probe (open or closed) so there's an audit trail
                    save_csv_row(row)
            except KeyboardInterrupt:
                print("\nScan interrupted by user.")
                return
        print(f"--- Done {ip} ---\n")
    print("All targets scanned. CSV saved to", CSV_FILE)

if __name__ == "__main__":
    main()
