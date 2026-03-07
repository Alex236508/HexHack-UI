javascript: (function() {
    window.hackerLoaded || (window.hackerLoaded = !0, function() {
        var t = Math.floor,
            n = Math.min,
            i = Math.max,
            o = Math.sin,
            l = Math.cos,
            r = Math.PI;

        function s(e, t, n, i) {
            const s = document.createElement("button");
            s.className = "hgui-btn", s.innerText = t, e.appendChild(s), requestAnimationFrame(() => {
                s.classList.add("btn--in")
            });
            let d;
            s.addEventListener("mouseenter", () => {
                d = setInterval(() => {
                    const e = document.createElement("div");
                    e.className = "hgui-particle", s.appendChild(e);
                    const t = s.getBoundingClientRect(),
                        n = Math.random() * t.width,
                        i = Math.random() * t.height;
                    e.style.left = `${n}px`, e.style.top = `${i}px`;
                    const d = 2 * (Math.random() * r),
                        a = 20 + 10 * Math.random();
                    requestAnimationFrame(() => {
                        e.style.transform = `translate(${l(d)*a}px, ${o(d)*a}px)`, e.style.opacity = "0"
                    }), setTimeout(() => e.remove(), 2e3)
                }, 150)
            }), s.addEventListener("mouseleave", () => {
                clearInterval(d)
            }), s.addEventListener("click", n), i && (!window._hgui_activeUtilities && (window._hgui_activeUtilities = {}), window._hgui_activeUtilities[t] = {
                on: n,
                off: i
            })
        }
        if (function() {
                const t = document.createElement("div");
                t.id = "mainGUI", t.style.cssText = `
    position: fixed;
    top: 50px; left: 50px;
    width: 340px;
    background: #000;
    border: 2px solid #00ff00;
    border-radius: 12px;
    color: #00ff00;
    font-family: Consolas, monospace;
    box-shadow: 0 0 20px rgba(0,255,0,0.5);
    overflow: hidden;
    z-index: 9999999;
    cursor: move;
    user-select: none;
    transition: height 0.4s ease;
  `, document.body.appendChild(t);
                const o = document.createElement("div");
                o.style.cssText = `
    display: flex;
    width: 200%;
    transition: transform 0.5s ease;
  `, t.appendChild(o);
                const l = document.createElement("style");
                l.textContent = `
 
  .guiBtn {
    background: #0a0a0a;
    border: 1px solid #00ff00;
    color: #00ff00;
    font-family: Consolas, monospace;
    font-size: 13px;
    padding: 8px;
    border-radius: 0;
    text-align: center;
    cursor: pointer;
    transition: all 0.25s ease;
    width: 100%;
  }

  .guiBtn:hover {
    background: rgba(0,255,0,0.05);
    box-shadow: inset 0 0 6px #00ff00, 0 0 8px #00ff00;
    transform: scale(1.02);
  }

  .guiBtn:active {
    background: rgba(0,255,0,0.15);
    transform: scale(0.97);
  }

  
  .btnGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 2px solid #00ff00;
    border-radius: 8px;
    background: #000;
    box-shadow: 0 0 12px rgba(0,255,0,0.25);
    overflow: hidden;
  }

  
  .btnGrid .guiBtn {
    border-right: 1px solid #00ff00;
    border-bottom: 1px solid #00ff00;
  }

  
  .btnGrid .guiBtn:nth-child(2n) {
    border-right: none;
  }

  
  .btnGrid .guiBtn:nth-last-child(-n+2) {
    border-bottom: none;
  }
`, document.head.appendChild(l);
                const r = document.createElement("div");
                r.innerText = "</> \u2E3A HexHack\u2013UI Reborn \u2E3A </>", r.style.cssText = `
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  color: #00ff00;
  background: rgba(0, 255, 0, 0.15);
  padding: 8px;
  border-bottom: 2px solid #00ff00;
  letter-spacing: 1px;
  text-shadow: 0 0 8px #00ff00;
  font-family: "Lucida Console", "Courier New", monospace;
`, t.appendChild(r), o.style.cssText = `
  display: flex;
  width: 200%;
  transition: transform 0.5s ease;
`, t.appendChild(o);
                const s = document.createElement("div");
                s.id = "utilitiesGUI", s.style.cssText = `
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
`, s.innerHTML = `
  <div style="text-align:center;font-weight:bold;margin-bottom:10px;">
    Utilities
  </div>
  <div class="btnGrid"></div>
`, o.appendChild(s);
                const d = document.getElementById("utilitiesGUI");
                if (d) {
                    const e = document.createElement("div");
                    e.style.cssText = `
        position:absolute;
        bottom:10px;
        right:10px;
        width:200px;
        display:flex;
        flex-direction:column-reverse; /* bar stays at bottom */
        gap:6px;

        background: rgba(34, 49, 34, 0.25); /* army green tint, semi-transparent */
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);

        padding:6px;
        border-radius:12px;
        border:1px solid rgba(255,255,255,0.2);
        box-shadow:0 10px 25px rgba(0,0,0,0.5);

        font-family:system-ui, sans-serif;
        color:white;

        z-index:10000001;
        overflow:hidden;
        max-height:30px;
        transition:max-height 0.3s ease, padding 0.3s ease;
    `, e.addEventListener("mouseenter", () => {
                        e.style.maxHeight = "500px", e.style.padding = "12px"
                    }), e.addEventListener("mouseleave", () => {
                        e.style.maxHeight = "30px", e.style.padding = "6px"
                    });
                    const t = document.createElement("div");
                    t.textContent = "Tab Customizer", t.style.cssText = `
        font-size:13px;
        font-weight:600;
        opacity:0.9;
        border-top-left-radius:10px;
        border-top-right-radius:10px;
        border-bottom:1px solid rgba(255,255,255,0.1);
        padding:6px;
        text-align:center;
        cursor:default;
    `, e.appendChild(t);
                    const n = document.createElement("div");
                    n.style.cssText = `
        display:flex;
        flex-direction:column;
        gap:6px;
    `;
                    const i = document.createElement("div");
                    i.textContent = "Title", i.style.cssText = `font-size:11px; opacity:0.7;`, n.appendChild(i);
                    const o = document.createElement("input");
                    o.type = "text", o.placeholder = "Tab title", o.style.cssText = `
        width:100%;
        font-size:12px;
        padding:6px 8px;
        background:#1e1e1e;
        color:white;
        border:1px solid #3a3a3a;
        border-radius:6px;
        outline:none;
        transition:all .15s ease;
    `, o.onfocus = () => o.style.border = "1px solid #4f8cff", o.onblur = () => o.style.border = "1px solid #3a3a3a", o.addEventListener("input", () => document.title = o.value), n.appendChild(o);
                    const l = document.createElement("div");
                    l.textContent = "Favicon", l.style.cssText = `font-size:11px; opacity:0.7;`, n.appendChild(l);
                    const r = document.createElement("input");
                    r.type = "file", r.accept = "image/*", r.style.display = "none", r.addEventListener("change", () => {
                        const e = r.files[0];
                        if (!e) return;
                        const t = URL.createObjectURL(e);
                        let n = document.querySelector("link[rel*='icon']");
                        n || (n = document.createElement("link"), n.rel = "icon", document.head.appendChild(n)), n.href = t
                    });
                    const s = document.createElement("button");
                    s.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h-8l-2-4z"/>
        </svg>
        Upload Icon
    `, s.style.cssText = `
        display:flex;
        align-items:center;
        gap:6px;
        font-size:12px;
        padding:6px 8px;
        background:#2a2a2a;
        color:white;
        border:1px solid #3a3a3a;
        border-radius:6px;
        cursor:pointer;
        transition:all .15s ease;
    `, s.onmouseenter = () => s.style.background = "#363636", s.onmouseleave = () => s.style.background = "#2a2a2a", s.onclick = () => r.click(), n.appendChild(s), n.appendChild(r), e.appendChild(n), d.appendChild(e)
                }
                const a = document.createElement("div");
                a.id = "vfxGUI", a.style.cssText = `
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
`, a.innerHTML = `
  <div style="text-align:center;font-weight:bold;margin-bottom:10px;">
    Page Effects
  </div>
  <div class="btnGrid"></div>
`, o.appendChild(a);
                const c = document.createElement("style");
                c.textContent = `
  .btnGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 2px solid #00ff00;
    border-radius: 8px;
    overflow: hidden;
    background: transparent;
  }
  .btnGrid .guiBtn {
    background: #000;
    border: 1px solid #00ff00;
    color: #00ff00;
    font-family: Consolas, monospace;
    font-size: 13px;
    padding: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }
  .btnGrid .guiBtn:hover {
    background: rgba(0,255,0,0.1);
    transform: scale(1.03);
    box-shadow: 0 0 8px #00ff00;
  }
  .btnGrid .guiBtn:active {
    background: rgba(0,255,0,0.25);
    transform: scale(0.98);
  }
  /* Add green dividers */
  .btnGrid .guiBtn:nth-child(odd) {
    border-right: 1px solid #00ff00;
  }
  .btnGrid .guiBtn:nth-child(n+3) {
    border-top: 1px solid #00ff00;
  }
`, document.head.appendChild(c), window.addBtn = (e, t, n) => {
                    const i = document.createElement("button");
                    i.className = "guiBtn", i.textContent = t, i.onclick = n;
                    const o = e.querySelector(".btnGrid");
                    o ? o.appendChild(i) : e.appendChild(i)
                };
                const p = document.createElement("div");
                p.style.cssText = `
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    text-align: center;
  `, p.innerHTML = `
    <button id="prevPage" style="background:none;border:none;color:#00ff00;font-size:22px;cursor:pointer;">◀</button>
    <button id="nextPage" style="background:none;border:none;color:#00ff00;font-size:22px;cursor:pointer;">▶</button>
  `, t.appendChild(p);
                let u, h, m = !1;
                t.addEventListener("mousedown", n => {
                    "BUTTON" === n.target.tagName || (m = !0, u = n.clientX - t.offsetLeft, h = n.clientY - t.offsetTop)
                }), document.addEventListener("mousemove", n => {
                    m && (t.style.left = `${n.clientX-u}px`, t.style.top = `${n.clientY-h}px`)
                }), document.addEventListener("mouseup", () => m = !1);
                let y = 0;
                const f = () => {
                        const e = 0 === y ? s : a,
                            n = e.scrollHeight + r.offsetHeight + 26;
                        t.style.height = `${n}px`
                    },
                    g = () => requestAnimationFrame(f);
                [s, a].forEach(e => {
                    const t = new MutationObserver(g);
                    t.observe(e.querySelector(".btnGrid"), {
                        childList: !0,
                        subtree: !0
                    })
                }), window.addEventListener("load", g, {
                    once: !0
                }), window.addEventListener("resize", g), document.getElementById("prevPage").onclick = () => {
                    y = i(0, y - 1), o.style.transform = `translateX(-${50*y}%)`, f()
                }, document.getElementById("nextPage").onclick = () => {
                    y = n(1, y + 1), o.style.transform = `translateX(-${50*y}%)`, f()
                }, window.util = s.querySelector(".btnGrid"), window.vfx = a.querySelector(".btnGrid"), f()
            }(), window.isImmune = function(e) {
                if (!e) return !1;
                const t = [document.getElementById("mainGUI"), document.getElementById("utilitiesGUI"), document.getElementById("vfxGUI")].filter(Boolean);
                return t.some(t => e === t || 1 === e.nodeType && t.contains(e))
            }, function() {
                function e(e, t, n, i) {
                    const s = document.createElement("button");
                    s.className = "hgui-btn", s.innerText = t, e.appendChild(s), requestAnimationFrame(() => {
                        s.classList.add("btn--in")
                    });
                    let d;
                    s.addEventListener("mouseenter", () => {
                        d = setInterval(() => {
                            const e = document.createElement("div");
                            e.className = "hgui-particle", s.appendChild(e);
                            const t = s.getBoundingClientRect(),
                                n = Math.random() * t.width,
                                i = Math.random() * t.height;
                            e.style.left = `${n}px`, e.style.top = `${i}px`;
                            const d = 2 * (Math.random() * r),
                                a = 20 + 10 * Math.random();
                            requestAnimationFrame(() => {
                                e.style.transform = `translate(${l(d)*a}px, ${o(d)*a}px)`, e.style.opacity = "0"
                            }), setTimeout(() => e.remove(), 2e3)
                        }, 150)
                    }), s.addEventListener("mouseleave", () => {
                        clearInterval(d)
                    }), s.addEventListener("click", n), i && (!window._hgui_activeUtilities && (window._hgui_activeUtilities = {}), window._hgui_activeUtilities[t] = {
                        on: n,
                        off: i
                    })
                }
                const t = {};
                if (!document.getElementById("hgui-grid-btn-styles")) {
                    const e = document.createElement("style");
                    e.id = "hgui-grid-btn-styles", e.textContent = `
    .hgui-panel {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
        background: #000000;
        border: 2px solid #00ff00;
        padding: 0;
        overflow: visible;
    }

    .hgui-btn {
        background: #000000;
        color: #00ff00;
        border: 1px solid #00ff00;
        margin: 0;
        padding: 8px;
        font-family: Consolas, monospace;
        font-size: 13px;
        text-align: center;
        cursor: pointer;
        transition: transform 220ms ease, opacity 220ms ease, box-shadow 300ms ease, border-color 300ms ease, background 300ms ease;
        opacity: 0;
        transform: translateY(8px) scale(0.995);
        outline: none;
        user-select: none;
        position: relative;
        z-index: 0;
        overflow: visible;
    }

    .hgui-btn.btn--in {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

    .hgui-btn:hover {
        transform: translateY(-1px) scale(1.01);
        border-color: #00ff00;
        box-shadow: 0 0 8px #00ff00, 0 0 16px #00ff00, 0 0 24px #00ff00;
        background: #001f00;
        z-index: 10;
    }

    .hgui-btn:active {
        transform: translateY(1px) scale(0.995);
        box-shadow: none;
    }

    .hgui-particle {
        position: absolute;
        width: 3px;
        height: 3px;
        background: #00ff00;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.9;
        z-index: 20;
        transition: transform 2s linear, opacity 2s linear;
    }
    `, document.head.appendChild(e)
                }
                e(util, "Embedded Browser", () => {
                    const e = document.getElementById("embeddedBrowserContainer");
                    if (e) return void(e.style.display = "none" === e.style.display ? "block" : "none");
                    javascript: (function() {
                        function t() {
                            function t(t) {
                                t.preventDefault(), v = b - t.clientX, x = E - t.clientY, b = t.clientX, E = t.clientY;
                                let e = s.offsetTop - x,
                                    o = s.offsetLeft - v;
                                e = i(0, n(window.innerHeight - s.offsetHeight, e)), o = i(0, n(window.innerWidth - s.offsetWidth, o)), s.style.top = e + "px", s.style.left = o + "px"
                            }

                            function o() {
                                document.onmouseup = null, document.onmousemove = null
                            }

                            function l(e) {
                                gsap.to(s, {
                                    duration: .5,
                                    borderRadius: "50%",
                                    scale: .9
                                }), setTimeout(function() {
                                    f.src = e, h.value = e, gsap.to(s, {
                                        duration: .5,
                                        borderRadius: "12px",
                                        scale: 1
                                    })
                                }, 500)
                            }
                            var r = document.createElement("style");
                            r.innerHTML = `
            @keyframes glowEffect {
                0% { box-shadow: 0 0 10px white; }
                50% { box-shadow: 0 0 20px black; }
                100% { box-shadow: 0 0 10px white; }
            }
            #rusic-container { resize: both; }
        `, document.head.appendChild(r);
                            var s = document.createElement("div");
                            s.id = "rusic-container", s.style.cssText = `
            position:fixed;
            z-index:999999;
            top:100px;
            left:100px;
            width:800px;
            height:600px;
            border:2px solid white;
            overflow:hidden;
            background:url('https://plus.unsplash.com/premium_photo-1683133681452-07ee1fc4ffca?w=900&auto=format&fit=crop&q=60') no-repeat center center;
            background-size:cover;
            animation:glowEffect 3s infinite alternate;
            border-radius:12px;
        `;
                            var e = document.createElement("div");
                            e.id = "rusic-header", e.style.cssText = `
   			 width: 100%;
   			 height: 30px;
   			 background: #6C7A89;
    		 cursor: move;
   			 color: white;
    		 font-family: sans-serif;
  			 padding-left: 30px; 
 			 line-height: 30px;
			 user-select: none;
    		 position: relative;
	     `, e.textContent = "Embedded Browser";
                            var d = document.createElement("div");
                            d.innerHTML = "\u274C", d.style.cssText = `
			position: absolute;
    		top: 0;
    		left: 5px;
    		font-size: 16px;
    		line-height: 30px;
    		cursor: pointer;
    		color: white;
			background: none;
    		border: none;
    		padding: 0;
		`, d.onclick = function() {
                                s.remove()
                            }, e.insertBefore(d, e.firstChild);
                            var a = document.createElement("div");
                            a.id = "rusic-toolbar", a.style.cssText = "display:flex;align-items:center;background:rgba(255,255,255,0.8);padding:5px;";
                            var c = document.createElement("button");
                            c.innerHTML = "\u2190", c.style.cssText = "width:30px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;";
                            var p = document.createElement("button");
                            p.innerHTML = "\u2192", p.style.cssText = "width:30px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;";
                            var h = document.createElement("input");
                            h.type = "text", h.placeholder = "Enter website URL or search...", h.style.cssText = "width:calc(100% - 160px);margin:5px;padding:5px;border:1px solid #ccc;font-size:14px;", h.id = "rusic-url-input";
                            var m = document.createElement("button");
                            m.innerHTML = "Go", m.style.cssText = "width:50px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;";
                            var y = document.createElement("button");
                            y.innerHTML = "\u26F6", y.style.cssText = "width:30px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;margin-left:auto;", y.onclick = function() {
                                s.classList.contains("fullscreen") ? (s.classList.remove("fullscreen"), s.style.top = "100px", s.style.left = "100px", s.style.width = "800px", s.style.height = "600px") : (s.classList.add("fullscreen"), s.style.top = "0", s.style.left = "0", s.style.width = "100vw", s.style.height = "100vh")
                            };
                            var f = document.createElement("iframe");
                            f.style.cssText = "width:100%;height:calc(100% - 70px);border:none;", f.id = "rusic-modal", f.src = "https://blrublrbuerigieroklghlvyavmliarelhsmuazuka.realonesflow.infinityfreeapp.com/";
                            var u = [],
                                g = -1;
                            c.onclick = function() {
                                0 < g && (g--, l(u[g]))
                            }, p.onclick = function() {
                                g < u.length - 1 && (g++, l(u[g]))
                            }, m.onclick = function() {
                                var e = h.value.trim();
                                e.startsWith("http") || (e = "https://duckduckgo.com/search?q=" + encodeURIComponent(e));
                                try {
                                    new URL(e)
                                } catch (t) {
                                    return void alert("Invalid URL.")
                                }
                                g < u.length - 1 && (u = u.slice(0, g + 1)), u.push(e), g = u.length - 1, l(e)
                            }, e.appendChild(d), a.appendChild(c), a.appendChild(p), a.appendChild(h), a.appendChild(m), a.appendChild(y), s.appendChild(e), s.appendChild(a), s.appendChild(f), document.body.appendChild(s);
                            var v = 0,
                                x = 0,
                                b = 0,
                                E = 0;
                            e.onmousedown = function(n) {
                                n.preventDefault(), b = n.clientX, E = n.clientY, document.onmouseup = o, document.onmousemove = t
                            };
                            let C = new ResizeObserver(() => {
                                let e = n(s.offsetWidth, window.innerWidth - s.offsetLeft),
                                    t = n(s.offsetHeight, window.innerHeight - s.offsetTop);
                                e < s.offsetWidth && (s.style.width = e + "px"), t < s.offsetHeight && (s.style.height = t + "px")
                            });
                            C.observe(s);
                            let I = {
                                top: s.style.top,
                                left: s.style.left,
                                width: s.style.width,
                                height: s.style.height
                            };
                            document.addEventListener("keydown", t => {
                                t.shiftKey && "s" === t.key.toLowerCase() && !t.target.matches("input, textarea") && ("none" === s.style.display ? (s.style.display = "block", C.disconnect(), s.style.top = I.top, s.style.left = I.left, s.style.width = I.width, s.style.height = I.height, s.style.transform = "scale(1)", s.style.borderRadius = "12px", C.observe(s)) : (I.top = s.style.top, I.left = s.style.left, I.width = s.style.width, I.height = s.style.height, s.style.display = "none"))
                            }), document.addEventListener("keydown", function(e) {
                                if ("f" === e.key.toLowerCase() && e.shiftKey && !e.target.matches("input, textarea")) {
                                    let e = document.getElementById("rusic-header"),
                                        t = document.getElementById("rusic-toolbar"),
                                        n = "none" === e.style.display;
                                    e.style.display = n ? "block" : "none", t.style.display = n ? "flex" : "none", f.style.height = n ? "calc(100% - 70px)" : "100%"
                                }
                            })
                        }
                        var o = document.getElementById("rusic-container");
                        o && o.remove();
                        var e = document.createElement("script");
                        e.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js", e.onload = function() {
                            t()
                        }, document.head.appendChild(e)
                    })()
                }), e(util, "iFrame launcher", () => {
                    const e = prompt("Enter URL (http/https)", "https://");
                    if (!e) return;
                    let t;
                    try {
                        t = new URL(e.trim())
                    } catch (t) {
                        return void alert("Invalid URL. Example: https://example.com")
                    }
                    if (!["http:", "https:"].includes(t.protocol)) return void alert("Only http/https URLs are allowed.");
                    const n = window.open("about:blank", "_blank");
                    if (!n) return void alert("Popup blocked by browser. Please allow popups.");
                    const i = n.document;
                    i.open(), i.write("<!DOCTYPE html><html><head><title>iFrame</title></head><body style=\"margin:0\"></body></html>"), i.close();
                    const o = i.createElement("iframe");
                    o.src = t.href, o.style.cssText = "border:none;width:100vw;height:100vh;", o.setAttribute("referrerpolicy", "no-referrer"), i.body.appendChild(o)
                }), e(util, "Developer Console", () => {
                    if (!window.erudaLoaded) {
                        let e = document.createElement("script");
                        e.src = "https://cdn.jsdelivr.net/npm/eruda@2.5.0/eruda.min.js", document.body.appendChild(e), e.onload = () => {
                            eruda.init(), eruda.theme = "Dark", window.erudaInstance = eruda, window.erudaLoaded = !0
                        }, window.erudaScript = e
                    } else window.erudaInstance.show()
                }, () => {
                    window.erudaInstance && (window.erudaInstance.destroy(), window.erudaInstance = null, window.erudaLoaded = !1), window.erudaScript && (window.erudaScript.remove(), window.erudaScript = null)
                }), e(util, "Invert Page", () => {
                    document.body.style.filter = "invert(1)"
                }, () => {
                    document.body.style.filter = ""
                }), e(util, "Calculator", () => {
                    const e = e => /^[0-9+\-*/().%\s]+$/.test(e),
                        t = e => {
                            var t = Number.isNaN;
                            const n = e.match(/\d*\.?\d+|[()+\-*/%]/g) || [],
                                i = {
                                    "+": 1,
                                    "-": 1,
                                    "*": 2,
                                    "/": 2,
                                    "%": 2
                                },
                                o = [],
                                l = [];
                            for (n.forEach(e => {
                                    if (/^\d*\.?\d+$/.test(e)) return void o.push(+e);
                                    if ("(" === e) return void l.push(e);
                                    if (")" === e) {
                                        for (; l.length && "(" !== l[l.length - 1];) o.push(l.pop());
                                        return void("(" === l[l.length - 1] && l.pop())
                                    }
                                    for (; l.length && i[l[l.length - 1]] >= i[e];) o.push(l.pop());
                                    l.push(e)
                                }); l.length;) o.push(l.pop());
                            const r = [];
                            if (o.forEach(e => {
                                    if ("number" == typeof e) return void r.push(e);
                                    const t = r.pop(),
                                        n = r.pop();
                                    if (void 0 === n || void 0 === t) throw new Error("Malformed expression");
                                    "+" === e ? r.push(n + t) : "-" === e ? r.push(n - t) : "*" === e ? r.push(n * t) : "/" === e ? r.push(n / t) : "%" == e && r.push(n % t)
                                }), 1 !== r.length || t(r[0])) throw new Error("Malformed expression");
                            return r[0]
                        };
                    for (let n; n = prompt("Expression (numbers + + - * / % parentheses):", "");) try {
                        const i = n.trim();
                        if (!e(i)) {
                            alert("Only numeric math expressions are allowed.");
                            continue
                        }
                        alert(t(i))
                    } catch (t) {
                        alert(t.message || t + "")
                    }
                }), e(util, "DNS Lookup", () => {
                    window.open("https://mxtoolbox.com/SuperTool.aspx?action=a:" + window.location.hostname, "_blank")
                }), e(util, "FPS Counter", () => {
                    if (!window.stats) {
                        let e = document.createElement("script");
                        e.src = "https://mrdoob.github.io/stats.js/build/stats.min.js", e.onload = () => {
                            window.stats = new Stats, document.body.appendChild(window.stats.dom), requestAnimationFrame(function e() {
                                window.stats.update(), requestAnimationFrame(e)
                            })
                        }, document.head.appendChild(e)
                    }
                }, () => {
                    window.stats && (window.stats.dom.remove(), window.stats = null)
                }), e(util, "History Flooder", () => {
                    let e = parseInt(prompt("Flood amount:"));
                    for (let t = 0; t < e; t++) history.pushState(0, 0, t == e - 1 ? window.location.href : t.toString())
                }), e(util, "IP Lookup", () => {
                    let e = prompt("Enter IP:");
                    e && ["https://talosintelligence.com/reputation_center/lookup?search=", "https://www.virustotal.com/gui/ip-address/", "https://otx.alienvault.com/browse/global?section=All&q=", "https://censys.io/ipv4/", "https://www.shodan.io/search?query=", "https://www.abuseipdb.com/check/"].forEach(t => window.open(t + e, "_blank"))
                }), e(util, "Password Looker", () => {
                    document.querySelectorAll("input[type=password]").forEach(e => {
                        e.dataset.originalType || (e.dataset.originalType = e.type), e.type = "text"
                    })
                }, () => {
                    document.querySelectorAll("input[type=text]").forEach(e => {
                        e.dataset.originalType && (e.type = e.dataset.originalType)
                    })
                }), e(util, "Porta Proxy", () => {
                    let e = document.createElement("iframe");
                    e.src = prompt("Enter URL:"), Object.assign(e.style, {
                        position: "fixed",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 9999
                    }), document.body.appendChild(e), window.portaFrame = e
                }, () => {
                    window.portaFrame && (window.portaFrame.remove(), window.portaFrame = null)
                }), e(util, "Page Killer", () => {
                    const t = document.querySelectorAll("div.head-top, div.wonderbar");
                    t.forEach(function(e) {
                        e.remove()
                    });
                    const e = document.querySelectorAll("button.slick-prev.slick-arrow.slick-disabled, button.slick-next.slick-arrow.slick, button.slick-prev.slick-arrow, button.slick-next.slick-arrow.slick-disabled"),
                        n = document.createElement("iframe");
                    n.style.position = "fixed", n.style.top = "0", n.style.left = "0", n.style.width = "100%", n.style.height = "100%", n.style.border = "none", n.style.backgroundColor = "white", document.body.appendChild(n);
                    const i = document.createElement("button");
                    i.style.position = "fixed", i.style.top = "50%", i.style.left = "50%", i.style.transform = "translate(-50%, -50%)", i.style.width = "800px", i.style.height = "200px", i.style.borderRadius = "100px", i.style.backgroundColor = "red", i.style.color = "white", i.style.fontSize = "100px", i.style.fontWeight = "bold", i.style.cursor = "pointer", i.textContent = "OFF", i.addEventListener("click", function() {
                        var e = String.fromCharCode;
                        if ("OFF" === this.textContent) {
                            this.style.backgroundColor = "#00FF00", this.textContent = "ON";
                            let n = new Date(2e14).toUTCString(),
                                t = location.hostname.split(".").slice(-2).join(".");
                            for (let i = 0; 99 > i; i++) document.cookie = `cd${i}=${encodeURIComponent(btoa(e.apply(0,crypto.getRandomValues(new Uint8Array(3168))))).substring(0,3168)};expires=${n};domain=${t};path=/`;
                            alert("Website killed")
                        } else {
                            let t = new Date(2e14).toUTCString(),
                                i = location.hostname.split(".").slice(-2).join(".");
                            for (let n = 0; 99 > n; n++) document.cookie = `cd${n}=${encodeURIComponent(btoa(e.apply(0,crypto.getRandomValues(new Uint8Array(32))))).substring(0,32)};expires=${t};domain=${i};path=/`;
                            alert("You gave the website CPR and it came back to life"), this.style.backgroundColor = "red", this.textContent = "OFF"
                        }
                    }), n.contentDocument.body.appendChild(i)
                }), e(util, "Page Info", () => {
                    alert(`Title: ${document.title}\nURL: ${window.location.href}\nImages: ${document.images.length}\nLinks: ${document.links.length}\nScripts: ${document.scripts.length}`)
                }), e(util, "Stop All Utilities", () => {
                    for (let e in t) t[e].off && t[e].off()
                })
            }(), function() {
                const e = document.createElement("div");
                e.style.marginTop = "10px", e.style.padding = "8px", e.style.background = "#001f00", e.style.borderRadius = "10px", e.style.color = "#00ff00", e.innerHTML = `<b>Font Size</b><br>`;
                const t = document.createElement("input");
                t.type = "range", t.min = "10", t.max = "50", t.value = "16", t.style.width = "100%", t.oninput = () => {
                    document.querySelectorAll("body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *)").forEach(e => e.style.fontSize = t.value + "px")
                }, e.appendChild(t), util.appendChild(e)
            }(), !document.getElementById("hgui-grid-btn-styles")) {
            const e = document.createElement("style");
            e.id = "hgui-grid-btn-styles", e.textContent = `
    .hgui-panel {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
        background: #000000;
        border: 2px solid #00ff00;
        padding: 0;
        overflow: visible;
    }

    .hgui-btn {
        background: #000000;
        color: #00ff00;
        border: 1px solid #00ff00;
        margin: 0;
        padding: 8px;
        font-family: Consolas, monospace;
        font-size: 13px;
        text-align: center;
        cursor: pointer;
        transition: transform 220ms ease, opacity 220ms ease, box-shadow 300ms ease, border-color 300ms ease, background 300ms ease;
        opacity: 0;
        transform: translateY(8px) scale(0.995);
        outline: none;
        user-select: none;
        position: relative;
        z-index: 0;
        overflow: visible;
    }

    .hgui-btn.btn--in {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

    .hgui-btn:hover {
        transform: translateY(-1px) scale(1.01);
        border-color: #00ff00;
        box-shadow: 0 0 8px #00ff00, 0 0 16px #00ff00, 0 0 24px #00ff00;
        background: #001f00;
        z-index: 10;
    }

    .hgui-btn:active {
        transform: translateY(1px) scale(0.995);
        box-shadow: none;
    }

    .hgui-particle {
        position: absolute;
        width: 3px;
        height: 3px;
        background: #00ff00;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.9;
        z-index: 20;
        transition: transform 2s linear, opacity 2s linear;
    }
    `, document.head.appendChild(e)
        }
        s(vfx, "Corrupted Virus", () => {
            function e(n, i, s, d = 0) {
                if (!window.infectionActive || window.infectionArcCount >= t) return;
                window.infectionArcCount++;
                const a = document.createElement("div");
                a.style.position = "absolute", a.style.left = "0", a.style.top = "0", a.style.width = "100%", a.style.height = "100%", a.style.pointerEvents = "none", a.style.zIndex = 999999;
                let c = `${n},${i}`,
                    p = n,
                    u = i;
                const h = 6;
                for (let e = 0; e < h; e++) p += l(s) * (15 + 10 * Math.random()), u += o(s) * (15 + 10 * Math.random()), p += 8 * (Math.random() - .5), u += 8 * (Math.random() - .5), c += ` ${p},${u}`;
                a.innerHTML = `
            <svg style="position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;" xmlns="http://www.w3.org/2000/svg">
                <polyline class="main" points="${c}" stroke="white" stroke-width="2.5" fill="none" />
                <polyline class="ghost1" points="${c}" stroke="magenta" stroke-width="2" fill="none" opacity="0.6"/>
                <polyline class="ghost2" points="${c}" stroke="cyan" stroke-width="2" fill="none" opacity="0.6"/>
            </svg>
        `, document.body.appendChild(a);
                const m = a.querySelector(".main"),
                    y = a.querySelector(".ghost1"),
                    f = a.querySelector(".ghost2");
                let g = 0;
                const v = setInterval(() => {
                        if (!window.infectionActive) return void clearInterval(v);
                        const e = (50 * g + 120 * Math.random()) % 360,
                            t = (80 * g + 180 * Math.random()) % 360,
                            n = (60 * g + 200 * Math.random()) % 360;
                        m.setAttribute("stroke", `hsl(${e},100%,60%)`), y.setAttribute("stroke", `hsl(${t},100%,60%)`), f.setAttribute("stroke", `hsl(${n},100%,60%)`), g++
                    }, 100),
                    x = document.elementFromPoint(p, u);
                if (x && !isImmune(x) && !window.corruptedElems.has(x)) {
                    const e = {
                        filter: x.style.filter,
                        transform: x.style.transform,
                        textShadow: x.style.textShadow
                    };
                    let t = 0;
                    const n = setInterval(() => {
                        if (!window.infectionActive) return void clearInterval(n);
                        if (!isImmune(x)) {
                            const e = 10 * t % 360;
                            x.style.filter = `hue-rotate(${e}deg)`, x.style.transform = `scale(${1+.1*o(t/10)}) rotate(${5*(Math.random()-.5)}deg) skew(${4*(Math.random()-.5)}deg, ${4*(Math.random()-.5)}deg)`, x.style.textShadow = `0 0 5px hsl(${e},100%,60%), 0 0 10px hsl(${(e+180)%360},100%,60%)`, t++
                        }
                    }, 120);
                    window.corruptedElems.set(x, {
                        interval: n,
                        orig: e
                    })
                }
                12 > d && window.infectionActive && window.infectionArcCount < t && setTimeout(() => {
                    const t = r / 4,
                        n = .7 * s + .3 * t + (Math.random() - .5) * r / 16;
                    e(p, u, n, d + 1), .7 > Math.random() && e(p, u, n + (.5 < Math.random() ? r / 6 : -r / 6), d + 1)
                }, 500 + 400 * Math.random())
            }
            if (window.infectionActive) return;
            window.infectionActive = !0, window.infectionArcCount = 0;
            const t = 200;
            window.corruptedElems = new Map, e(0, 0, r / 4), window.stopAllInfection = () => {
                window.infectionActive = !1, window.infectionArcCount = 0, document.querySelectorAll("svg").forEach(e => e.remove()), window.corruptedElems.forEach(({
                    interval: e,
                    orig: t
                }, n) => {
                    clearInterval(e), n.style.filter = t.filter, n.style.transform = t.transform, n.style.textShadow = t.textShadow
                }), window.corruptedElems.clear()
            }
        });
        let d = null;
        s(vfx, "Disintegrate Element", () => {
                function n(e) {
                    if (!e) return;
                    const n = e.getBoundingClientRect(),
                        i = n.width,
                        o = n.height;
                    e.remove();
                    const l = "123456789010abcdefghijklmnopqrstuvwxyz",
                        r = t(i * o / 150);
                    for (let s = 0; s < r; s++) {
                        const e = document.createElement("div");
                        e.textContent = l[t(Math.random() * l.length)], e.style.position = "fixed", e.style.zIndex = "999999", e.style.left = n.left + Math.random() * i + "px", e.style.top = n.top + Math.random() * o + "px", e.style.fontSize = "12px", e.style.fontFamily = "monospace", e.style.color = "red", e.style.pointerEvents = "none", e.style.opacity = "1", e.style.transition = "transform 3s ease-out, opacity 3s ease-out", document.body.appendChild(e);
                        const r = 120 * (Math.random() - .5),
                            s = -150 - 250 * Math.random();
                        requestAnimationFrame(() => {
                            e.style.transform = `translate(${r}px, ${s}px) rotate(${360*Math.random()}deg)`, e.style.opacity = "0"
                        }), setTimeout(() => e.remove(), 3e3)
                    }
                }
                let i = "true" === vfx.dataset.disintegrateActive;
                i ? (document.removeEventListener("click", d, !0), d = null, vfx.dataset.disintegrateActive = "false", alert("Disintegration mode deactivated.")) : (d = function(t) {
                    window.isImmune(t.target) || (t.preventDefault(), t.stopPropagation(), n(t.target))
                }, document.addEventListener("click", d, !0), vfx.dataset.disintegrateActive = "true", alert("Disintegration mode activated. Click any element to delete it."))
            }), s(vfx, "Invert Media", () => window.invertimgActive ? (window.invertimgStyle && window.invertimgStyle.remove(), window.invertimgStyle = null, void(window.invertimgActive = !1)) : void(window.invertimgActive = !0, window.invertimgStyle = document.createElement("style"), window.invertimgStyle.textContent = "img,video,embed,object{filter:invert(100%) !important;}", document.body.appendChild(window.invertimgStyle))), s(vfx, "Censor Media", () => {
                var t = Math.log2;

                function n(e) {
                    return 0 < e.right && 0 < e.bottom && e.left < innerWidth && e.top < innerHeight
                }

                function o(e, t, n) {
                    var i = getComputedStyle(e),
                        o = Object.keys(i);
                    n && (o = ["width", "height"]);
                    for (var l of o) t.style[l] = i[l]
                }

                function l(l, e) {
                    var r = l.getBoundingClientRect();
                    if (n(r)) {
                        var s = t(i(r.width * r.height, 2));
                        e.width = r.width * p / s, e.height = r.height * p / s, 0 == window.af % 120 && o(l, e, !0);
                        var d = e.getContext("2d");
                        d.drawImage(l, 0, 0, e.width, e.height), l.parentElement.classList.add("censor-parent")
                    }
                }

                function r(l) {
                    var e = l.getBoundingClientRect();
                    if (n(e)) {
                        var r = document.createElement("canvas");
                        r.className = "censor";
                        var s = t(i(e.width * e.height, 2));
                        r.width = e.width * p / s, r.height = e.height * p / s, o(l, r);
                        var d = r.getContext("2d");
                        return d.drawImage(l, 0, 0, r.width, r.height), l.parentElement.insertBefore(r, l), l.parentElement.classList.add("censor-parent"), r
                    }
                }

                function s() {
                    var t = document.querySelectorAll("img,video");
                    for (var n of t) {
                        var o = window.sensed.indexOf(n);
                        if (0 <= o) "VIDEO" != n.tagName || n.paused || l(n, window.censors[o]);
                        else if ("VIDEO" == n.tagName || n.complete) {
                            var d = r(n);
                            d && (window.censors.push(d), window.sensed.push(n))
                        }
                    }
                    window.af = requestAnimationFrame(s)
                }
                if (window.censorActive) {
                    if (window.af && cancelAnimationFrame(window.af), window.censorStyle && window.censorStyle.remove(), window.censors)
                        for (var d of window.censors) d.remove();
                    if (window.sensed)
                        for (var a of window.sensed) a.parentElement.classList.remove("censor-parent");
                    return window.censors = [], window.sensed = [], void(window.censorActive = !1)
                }
                window.censorActive = !0, window.censorStyle = document.createElement("style"), window.censorStyle.textContent = `
        .censor { opacity: 1 !important; image-rendering: pixelated !important; }
        .censor + img, .censor + video { visibility: hidden !important; }
        .censor-parent:hover .censor { display: none !important; }
        .censor-parent:hover .censor + img, 
        .censor-parent:hover .censor + video { visibility: visible !important; }
    `, document.body.appendChild(window.censorStyle), window.sensed = [], window.censors = [];
                let p = 1.5;
                s()
            }), s(vfx, "Invert Area", () => {
                function e() {
                    u = document.createElement("div"), u.style.position = "fixed", u.style.left = 0, u.style.top = 0, u.style.width = "100%", u.style.height = "100%", u.style.zIndex = 99999999, u.style.cursor = "crosshair", document.body.appendChild(u), window.invertAreaShield = u
                }

                function t() {
                    h = document.createElement("div"), h.style.position = "absolute", h.style.left = f.clientX + "px", h.style.top = f.clientY + "px", h.style.width = 0, h.style.height = 0, h.style.outline = "2px dashed red", h.style.boxShadow = "inset 0 0 25px 2px white", h.style.mixBlendMode = "difference", u.appendChild(h)
                }

                function o(t) {
                    t && (h.remove(), u.remove(), window.invertAreaShield = null, t.style.filter = "invert(1)" === t.style.filter ? "" : "invert(1)")
                }

                function l(e) {
                    for (var t = n(f.clientX, m.clientX), o = i(f.clientX, m.clientX), l = n(f.clientY, m.clientY), r = i(f.clientY, m.clientY), s = i(1, (o - t) / 10), d = i(1, (r - l) / 10), a = [], c = t; c <= o; c += s)
                        for (var p = l; p <= r; p += d) a.push(document.elementsFromPoint(c, p));
                    a.sort((e, t) => e.length - t.length);
                    var g = a[0].filter(t => t !== h && t !== u && a.every(e => e.includes(t)));
                    e(g[0])
                }

                function r(t) {
                    return t.touches ? ("touchmove" === t.type && t.preventDefault(), t.touches[0] || t.changedTouches[0]) : t
                }

                function d(t) {
                    window.removeEventListener("mousemove", a), window.removeEventListener("touchmove", a), window.removeEventListener("mouseup", d), window.removeEventListener("touchend", d), m = r(t), l(o)
                }

                function a(t) {
                    var e = Math.abs,
                        i = r(t);
                    h.style.left = n(f.clientX, i.clientX) + "px", h.style.top = n(f.clientY, i.clientY) + "px", h.style.width = e(i.clientX - f.clientX) + "px", h.style.height = e(i.clientY - f.clientY) + "px"
                }

                function c(n) {
                    window.removeEventListener("mousedown", c), window.removeEventListener("touchstart", c), window.addEventListener("mousemove", a), window.addEventListener("touchmove", a, {
                        passive: !1
                    }), window.addEventListener("mouseup", d), window.addEventListener("touchend", d), f = r(n), t()
                }

                function p() {
                    e(), window.invertAreaHold = c, window.addEventListener("mousedown", c), window.addEventListener("touchstart", c)
                }
                if (window.invertAreaActive) return window.invertAreaShield && window.invertAreaShield.remove(), window.removeEventListener("mousedown", window.invertAreaHold), window.removeEventListener("touchstart", window.invertAreaHold), void(window.invertAreaActive = !1);
                window.invertAreaActive = !0;
                let u, h, f, m;
                p()
            }), s(vfx, "Disorient", () => {
                if (!window.disorientActive) {
                    window.disorientActive = !0, window.originalTransforms = [];
                    const e = e => window.isImmune(e),
                        t = ["", "-ms-", "-webkit-", "-o-", "-moz-"],
                        n = Array.from(document.querySelectorAll("*"));
                    n.forEach(n => {
                        const i = n.getBoundingClientRect();
                        if (e(n) || 0 === i.width || 0 === i.height) return;
                        const o = window.getComputedStyle(n),
                            l = o.transform || "";
                        window.originalTransforms.push({
                            el: n,
                            transform: l
                        });
                        const r = 361 * Math.random() - 180;
                        t.forEach(e => {
                            n.style[e + "transform"] = `${l} rotate(${r}deg)`
                        })
                    })
                } else window.disorientActive = !1, window.originalTransforms && (window.originalTransforms.forEach(({
                    el: e,
                    transform: t
                }) => {
                    const n = ["", "-ms-", "-webkit-", "-o-", "-moz-"];
                    n.forEach(n => {
                        e.style[n + "transform"] = t
                    })
                }), window.originalTransforms = null)
            }), s(vfx, "Random Link Redirects", () => {
                window.linkRedirectsInt = setInterval(() => {
                    document.querySelectorAll("a").forEach(e => {
                        window.isImmune(e) || (e.href = ["https://longdogechallenge.com/", "https://maze.toys/mazes/mini/daily/", "https://optical.toys/"][t(3 * Math.random())])
                    })
                }, 500)
            }, () => {
                clearInterval(window.linkRedirectsInt)
            }), s(vfx, "3D Page", () => {
                let e = document.createElement("script");
                e.src = "https://rawgit.com/Krazete/bookmarklets/master/tri.js?cacheBust=" + Date.now(), document.body.appendChild(e), window.triScript = e
            }, () => {
                window.triScript && (window.triScript.remove(), window.triScript = null), document.body.style.transform = "", document.body.style.perspective = ""
            }), s(vfx, "Explode Page", () => {
                if (window.explodeActive) return;
                window.explodeActive = !0;
                let e = document.createElement("div");
                e.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:#FF0000;font-size:50px;font-family:monospace;z-index:10000000;pointer-events:none;text-shadow:0 0 10px #FF0000;", document.body.appendChild(e);
                let t = 3;
                e.innerText = t, window.explodeInt = setInterval(() => {
                    t--, 0 < t ? e.innerText = t : (clearInterval(window.explodeInt), e.remove(), document.querySelectorAll("body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *)").forEach(t => {
                        t.style.transition = "transform 1s ease-out";
                        let e = 1e3 * (Math.random() - .5),
                            n = 1e3 * (Math.random() - .5),
                            i = 200 * (Math.random() - .5);
                        t.style.transform = `translate3d(${e}px,${n}px,${i}px) rotate(${720*Math.random()-360}deg)`
                    }), setTimeout(() => {
                        document.querySelectorAll("body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *)").forEach(t => {
                            t.style.transform = "", t.style.transition = ""
                        }), window.explodeActive = !1
                    }, 1500))
                }, 1e3)
            }, () => {
                clearInterval(window.explodeInt), window.explodeInt = null, window.explodeActive = !1, document.querySelectorAll("body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *)").forEach(t => {
                    t.style.transform = "", t.style.transition = ""
                })
            }), s(vfx, "Image Glitch", () => {
                window.imgGlitchInt || (window.imgGlitchInt = setInterval(() => {
                    document.querySelectorAll("img").forEach(t => {
                        window.isImmune(t) || (t.style.position = "absolute", t.style.left = Math.random() * window.innerWidth + "px", t.style.top = Math.random() * window.innerHeight + "px")
                    })
                }, 50))
            }, () => {
                window.imgGlitchInt && (clearInterval(window.imgGlitchInt), window.imgGlitchInt = null, document.querySelectorAll("img").forEach(t => {
                    window.isImmune(t) || (t.style.position = "", t.style.left = "", t.style.top = "")
                }))
            }), s(vfx, "Glitch", () => {
                window.glitchActive || (window.glitchActive = !0, window.glitchInt = setInterval(() => {
                    document.querySelectorAll("*:not(#mainGUI):not(#mainGUI *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)").forEach(n => {
                        n.style.backgroundColor = ["red", "orange", "yellow", "green", "blue", "purple", "pink"][t(7 * Math.random())]
                    })
                }, 25))
            }, () => {
                window.glitchInt && (clearInterval(window.glitchInt), window.glitchInt = null), window.glitchActive = !1, document.querySelectorAll("*:not(#mainGUI):not(#mainGUI *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)").forEach(t => {
                    t.style.backgroundColor = ""
                })
            }), s(vfx, "Smooth Disco", () => {
                if (window.discoSmoothActive) return;
                window.discoSmoothActive = !0;
                let t = ["red", "orange", "yellow", "green", "blue", "purple", "pink"],
                    n = 0;
                window.discoSmoothInt = setInterval(() => {
                    n = (n + 1) % t.length, document.querySelectorAll("*:not(#mainGUI):not(#mainGUI *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)").forEach(i => {
                        i.style.transition = "background-color 1s", i.style.backgroundColor = t[n]
                    })
                }, 1e3)
            }, () => {
                window.discoSmoothInt && (clearInterval(window.discoSmoothInt), window.discoSmoothInt = null), window.discoSmoothActive = !1, document.querySelectorAll("*:not(#mainGUI):not(#mainGUI *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)").forEach(t => {
                    t.style.transition = "", t.style.backgroundColor = ""
                })
            }), s(vfx, "Text Corruption", () => {
                const e = document.getElementById("globalChatContainer"),
                    t = t => e && (t === e || e.contains(t));
                if (!window.textCorruptStyle) {
                    let e = document.createElement("style");
                    e.id = "textCorruptStyle", e.innerHTML = `
        body { background:black !important; }
        body *:not(#globalChatContainer):not(#globalChatContainer *):not(#mainGUI):not(#mainGUI *) {
            color: green !important;
            font-family: Courier New, monospace !important;
            font-size: 16px !important;
            text-shadow: 1px 1px #FF0000 !important;
        }
        #mainGUI, #mainGUI * { animation:none !important; }
    `, document.head.appendChild(e), window.textCorruptStyle = e, window._textCorruptCleanup = () => {
                        window.textCorruptStyle && (window.textCorruptStyle.remove(), window.textCorruptStyle = null), window._textCorruptCleanup = null
                    }
                }
            }, () => {
                window._textCorruptCleanup && window._textCorruptCleanup()
            }), s(vfx, "Bubble Text", () => {
                function e(o) {
                    if (o)
                        if (o.nodeType === Node.ELEMENT_NODE) {
                            if (o === t || o.closest && o.closest("#globalChatContainer,#mainGUI")) return;
                            o.childNodes.forEach(e)
                        } else if (o.nodeType === Node.TEXT_NODE) {
                        if (!o.nodeValue.trim()) return;
                        n.has(o) || n.set(o, o.nodeValue), o.nodeValue = o.nodeValue.replace(/[a-zA-Z0-9]/g, e => i[e] || e)
                    }
                }
                if (window.bubbleActive) return;
                window.bubbleActive = !0;
                const t = document.getElementById("globalChatContainer"),
                    n = new Map,
                    i = {
                        a: "ⓐ",
                		b: "ⓑ",
                		c: "ⓒ",
               			d: "ⓓ",
               			e: "ⓔ",
                		f: "ⓕ",
                		g: "ⓖ",
                		h: "ⓗ",
               			i: "ⓘ",
                		j: "ⓙ",
                		k: "ⓚ",
                		l: "ⓛ",
                		m: "ⓜ",
                		n: "ⓝ",
                		o: "ⓞ",
                		p: "ⓟ",
                		q: "ⓠ",
                		r: "ⓡ",
                		s: "ⓢ",
                		t: "ⓣ",
                		u: "ⓤ",
                		v: "ⓥ",
                		w: "ⓦ",
                		x: "ⓧ",
                		y: "ⓨ",
                		z: "ⓩ",
                		A: "Ⓐ",
                		B: "Ⓑ",
                		C: "Ⓒ",
                		D: "Ⓓ",
                		E: "Ⓔ",
                		F: "Ⓕ",
                		G: "Ⓖ",
                		H: "Ⓗ",
                		I: "Ⓘ",
               			J: "Ⓙ",
                		K: "Ⓚ",
                		L: "Ⓛ",
                		M: "Ⓜ",
                		N: "Ⓝ",
                		O: "Ⓞ",
                		P: "Ⓟ",
                		Q: "Ⓠ",
                		R: "Ⓡ",
                		S: "Ⓢ",
                		T: "Ⓣ",
                		U: "Ⓤ",
                		V: "Ⓥ",
                		W: "Ⓦ",
                		X: "Ⓧ",
                		Y: "Ⓨ",
                		Z: "Ⓩ",
                		0: "⓪",
                		1: "①",
                		2: "②",
                		3: "③",
                		4: "④",
                		5: "⑤",
                		6: "⑥",
                		7: "⑦",
                		8: "⑧",
                		9: "⑨",
					};
                e(document.body);
                const o = () => {
                    n.forEach((e, t) => {
                        try {
                            t.nodeValue = e
                        } catch (t) {}
                    }), window.bubbleActive = !1
                };
                window._bubbleCleanup = o, window.stopAllVFX || (window.stopAllVFX = []), window.stopAllVFX = window.stopAllVFX.filter(e => e !== o), window.stopAllVFX.push(o)
            }), s(vfx, "Page Spin", () => {
                if (!window.pageSpinActive) {
                    window.pageSpinActive = !0;
                    let e = document.createElement("style");
                    e.id = "pageSpinStyle", e.innerHTML = "@keyframes roll{100%{transform:rotate(129600deg);}} body > *:not(#mainGUI):not(#vfxGUI):not(#utilitiesGUI){animation:roll 140s linear 360;} body > *:not(#mainGUI):not(#vfxGUI):not(#utilitiesGUI) *{animation:roll 140s linear 360;}", document.head.appendChild(e), window.pageSpinStyle = e
                }
            }, () => {
                window.pageSpinStyle && (window.pageSpinStyle.remove(), window.pageSpinStyle = null), window.pageSpinActive = !1
            }), s(vfx, "Full Chaos", () => {
                if (!window.fullChaosActive) {
                    function n() {
                        return "#" + t(16777215 * Math.random()).toString(16)
                    }

                    function i(e) {
                        return t(Math.random() * e) + 1
                    }
                    window.fullChaosActive = !0;
                    let o = document.createElement("div");
                    o.id = "chaosContainer", o.style.cssText = `
      position:fixed;
      top:0; left:0;
      width:100%; height:100%;
      pointer-events:none;
      z-index:99998; /* keep below GUIs */
    `, document.body.appendChild(o);
                    let l = window.innerHeight;
                    for (let e, t = 0; t < l; t++) e = document.createElement("div"), e.id = "chaosBar" + t, e.style.cssText = `
        width:100%; height:1px;
        background:${n()};
      `, o.appendChild(e);
                    window.fullChaosLoop1 = setInterval(() => {
                        for (let t, o = 0; 10 > o; o++) t = document.getElementById("chaosBar" + i(l)), t && (t.style.backgroundColor = n(), t.style.height = i(4) + "px");
                        o.style.backgroundColor = n(), o.style.transform = 128 < i(256) ? `scale(3) rotate(${i(35)}deg)` : "scale(1) rotate(0deg)", window.scrollTo(0, document.body.scrollHeight)
                    }, 10), window.fullChaosLoop2 = setInterval(() => {
                        window.scrollTo(0, 0)
                    }, 50), window.stopAllVFX || (window.stopAllVFX = []), window.stopAllVFX.push(() => {
                        clearInterval(window.fullChaosLoop1), clearInterval(window.fullChaosLoop2);
                        let e = document.getElementById("chaosContainer");
                        e && e.remove(), window.fullChaosActive = !1
                    })
                } else {
                    clearInterval(window.fullChaosLoop1), clearInterval(window.fullChaosLoop2);
                    let e = document.getElementById("chaosContainer");
                    e && e.remove(), window.fullChaosActive = !1
                }
            }), s(vfx, "Stop All", () => {
                const t = e => window.isImmune(e);
                window.stopAllVFX && (window.stopAllVFX.forEach(e => {
                    try {
                        e()
                    } catch (t) {}
                }), window.stopAllVFX = []), window.invertimgStyle && (window.invertimgStyle.remove(), window.invertimgStyle = null), window.invertimgActive = !1, window.af && cancelAnimationFrame(window.af), window.censorStyle && window.censorStyle.remove(), window.censors && window.censors.forEach(e => !t(e) && e.remove()), window.sensed && window.sensed.forEach(n => !t(n) && n.parentElement.classList.remove("censor-parent")), window.censors = [], window.sensed = [], window.censorActive = !1, window.invertAreaShield && !t(window.invertAreaShield) && window.invertAreaShield.remove(), window.removeEventListener("mousedown", window.invertAreaHold), window.removeEventListener("touchstart", window.invertAreaHold), window.invertAreaActive = !1, window.disorientActive && (window.disorientActive = !1, window.originalTransforms && (window.originalTransforms.forEach(({
                    el: e,
                    transform: n
                }) => {
                    t(e) || ["", "-ms-", "-webkit-", "-o-", "-moz-"].forEach(t => {
                        e.style[t + "transform"] = n
                    })
                }), window.originalTransforms = null)), window._bubbleCleanup && window._bubbleCleanup(), window.bubbleActive = !1, window.matrixInt && (clearInterval(window.matrixInt), window.matrixInt = null), window.matrixCanvas && !t(window.matrixCanvas) && window.matrixCanvas.remove(), window.matrixCanvas = null, window.matrixActive = !1, window.glitchInt && (clearInterval(window.glitchInt), window.glitchInt = null), window.glitchActive = !1, document.querySelectorAll("body *").forEach(n => {
                    t(n) || (n.style.backgroundColor = "")
                }), window.discoSmoothInt && (clearInterval(window.discoSmoothInt), window.discoSmoothInt = null), window.discoSmoothActive = !1, document.querySelectorAll("body *").forEach(n => {
                    t(n) || (n.style.transition = "", n.style.backgroundColor = "")
                }), window.fullChaosLoop1 && (clearInterval(window.fullChaosLoop1), window.fullChaosLoop1 = null), window.fullChaosLoop2 && (clearInterval(window.fullChaosLoop2), window.fullChaosLoop2 = null);
                const n = document.getElementById("chaosContainer");
                if (n && !t(n) && n.remove(), window.fullChaosActive = !1, window.pageSpinStyle && (window.pageSpinStyle.remove(), window.pageSpinStyle = null), window.pageSpinActive = !1, window._textCorruptCleanup && window._textCorruptCleanup(), window.imgGlitchInt && (clearInterval(window.imgGlitchInt), window.imgGlitchInt = null, document.querySelectorAll("img").forEach(n => {
                        t(n) || (n.style.position = "", n.style.left = "", n.style.top = "")
                    })), window.stopAllInfection) {
                    try {
                        window.stopAllInfection()
                    } catch (t) {}
                    window.stopAllInfection = null
                }
                document.body.style.transform = "", document.body.style.backgroundColor = "", document.body.style.filter = "", document.querySelectorAll("body *").forEach(n => {
                    t(n) || (n.style.backgroundColor = "", n.style.height = "", n.style.transform = "", n.style.transition = "", n.style.color = "", n.style.fontSize = "", n.style.position = "", n.style.left = "", n.style.top = "", n.style.textShadow = "")
                }), window.stats && (window.stats.dom.remove(), window.stats = null), window.erudaInstance && (window.erudaInstance.destroy(), window.erudaInstance = null, window.erudaLoaded = !1), window.portaFrame && (window.portaFrame.remove(), window.portaFrame = null)
            }),
            function() {
                const e = document.createElement("div");
                e.style.marginTop = "10px", e.style.padding = "8px", e.style.background = "#001f00", e.style.borderRadius = "10px", e.style.color = "#00ff00", e.innerHTML = `<b>Text Color</b><br>`;
                const t = document.createElement("input");
                t.type = "color", t.value = "#00ff00", t.oninput = () => {
                    document.querySelectorAll("body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *)").forEach(e => e.style.color = t.value)
                }, e.appendChild(t), vfx.appendChild(e)
            }(), document.addEventListener("keydown", t => {
                if (t.shiftKey && "h" === t.key.toLowerCase()) {
                    const e = document.getElementById("mainGUI");
                    e && (e.style.display = "none" === e.style.display ? "block" : "none")
                }
            })
    }())
})();
