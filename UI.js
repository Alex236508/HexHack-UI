(function () {
	if (window.hackerLoaded) return;
	window.hackerLoaded = true;

	spawnGUIs();

	function spawnGUIs() {
		// -------------------- Multi Page GUI --------------------
		(function () {
			// Main container
			const gui = document.createElement("div");
			gui.id = "mainGUI";
			gui.style.cssText = `
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
  `;
			document.body.appendChild(gui);

			// Inner slider to hold both pages
			const slider = document.createElement("div");
			slider.style.cssText = `
    display: flex;
    width: 200%;
    transition: transform 0.5s ease;
  `;
			gui.appendChild(slider);

			// Button style (injected once globally)
			const btnStyle = document.createElement("style");
			btnStyle.textContent = `
 
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
`;
			document.head.appendChild(btnStyle);
			// Master Title
			const masterTitle = document.createElement("div");
			masterTitle.innerText = "</> ⸺ HexHack–UI Reborn ⸺ </>";
			masterTitle.style.cssText = `
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
`;
			gui.appendChild(masterTitle);

			slider.style.cssText = `
  display: flex;
  width: 200%;
  transition: transform 0.5s ease;
`;
			gui.appendChild(slider);

			// Create Utilities Page
			const util = document.createElement("div");
			util.id = "utilitiesGUI";
			util.style.cssText = `
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
`;
			util.innerHTML = `
  <div style="text-align:center;font-weight:bold;margin-bottom:10px;">
    Utilities
  </div>
  <div class="btnGrid"></div>
`;
			slider.appendChild(util);

			// Create VFX Page
			const vfx = document.createElement("div");
			vfx.id = "vfxGUI";
			vfx.style.cssText = `
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
`;
			vfx.innerHTML = `
  <div style="text-align:center;font-weight:bold;margin-bottom:10px;">
    Page Effects
  </div>
  <div class="btnGrid"></div>
`;
			slider.appendChild(vfx);

			// --- Grid & Button Styling ---
			const style = document.createElement("style");
			style.textContent = `
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
`;
			document.head.appendChild(style);

			// --- Add Button Helper ---
			window.addBtn = (parent, name, callback) => {
				const btn = document.createElement("button");
				btn.className = "guiBtn";
				btn.textContent = name;
				btn.onclick = callback;

				const grid = parent.querySelector(".btnGrid");
				if (grid) grid.appendChild(btn);
				else parent.appendChild(btn);
			};

			// Navigation arrows
			const nav = document.createElement("div");
			nav.style.cssText = `
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    text-align: center;
  `;
			nav.innerHTML = `
    <button id="prevPage" style="background:none;border:none;color:#00ff00;font-size:22px;cursor:pointer;">◀</button>
    <button id="nextPage" style="background:none;border:none;color:#00ff00;font-size:22px;cursor:pointer;">▶</button>
  `;
			gui.appendChild(nav);

			// Drag behavior
			let offsetX,
				offsetY,
				dragging = false;
			gui.addEventListener("mousedown", (e) => {
				if (e.target.tagName === "BUTTON") return;
				dragging = true;
				offsetX = e.clientX - gui.offsetLeft;
				offsetY = e.clientY - gui.offsetTop;
			});
			document.addEventListener("mousemove", (e) => {
				if (dragging) {
					gui.style.left = `${e.clientX - offsetX}px`;
					gui.style.top = `${e.clientY - offsetY}px`;
				}
			});
			document.addEventListener("mouseup", () => (dragging = false));

			// Page switching
			let page = 0;
			const resizeToContent = () => {
				const activePage = page === 0 ? util : vfx;
				const contentHeight =
					activePage.scrollHeight + masterTitle.offsetHeight + 26;
				gui.style.height = `${contentHeight}px`;
			};

			const queueResize = () => requestAnimationFrame(resizeToContent);

			[util, vfx].forEach((panel) => {
				const observer = new MutationObserver(queueResize);
				observer.observe(panel.querySelector(".btnGrid"), {
					childList: true,
					subtree: true,
				});
			});

			window.addEventListener("load", queueResize, { once: true });
			window.addEventListener("resize", queueResize);

			document.getElementById("prevPage").onclick = () => {
				page = Math.max(0, page - 1);
				slider.style.transform = `translateX(-${page * 50}%)`;
				resizeToContent();
			};
			document.getElementById("nextPage").onclick = () => {
				page = Math.min(1, page + 1);
				slider.style.transform = `translateX(-${page * 50}%)`;
				resizeToContent();
			};

			window.util = util.querySelector(".btnGrid");
			window.vfx = vfx.querySelector(".btnGrid");

			resizeToContent();
		})();

		// -------------------- IMMUNITY HELPER --------------------
		window.isImmune = function (el) {
			if (!el) return false;
			const protectedRoots = [
				document.getElementById("mainGUI"),
				document.getElementById("utilitiesGUI"),
				document.getElementById("vfxGUI"),
			].filter(Boolean);

			return protectedRoots.some(
				(root) => el === root || (el.nodeType === 1 && root.contains(el)),
			);
		};

		// ---------- UTILITIES BUTTONS ----------
		(function () {
			const activeUtilities = {};

			// ---------- BUTTON CSS ----------
			if (!document.getElementById("hgui-grid-btn-styles")) {
				const s = document.createElement("style");
				s.id = "hgui-grid-btn-styles";
				s.textContent = `
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
    `;
				document.head.appendChild(s);
			}

			// ---------- addBtn helper ----------
			function addBtn(container, name, on, off) {
				const b = document.createElement("button");
				b.className = "hgui-btn";
				b.innerText = name;
				container.appendChild(b);

				requestAnimationFrame(() => {
					b.classList.add("btn--in");
				});

				let particleInterval;

				// Start emitting particles on hover
				b.addEventListener("mouseenter", () => {
					particleInterval = setInterval(() => {
						const p = document.createElement("div");
						p.className = "hgui-particle";
						b.appendChild(p);

						// Random start position inside the button
						const rect = b.getBoundingClientRect();
						const x0 = Math.random() * rect.width;
						const y0 = Math.random() * rect.height;
						p.style.left = `${x0}px`;
						p.style.top = `${y0}px`;

						// Random direction and distance
						const angle = Math.random() * Math.PI * 2;
						const distance = 20 + Math.random() * 10;

						// Trigger transition
						requestAnimationFrame(() => {
							p.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
							p.style.opacity = "0";
						});

						// Remove particle after transition
						setTimeout(() => p.remove(), 2000);
					}, 150); // emit particle every 150ms
				});

				// Stop emitting when mouse leaves
				b.addEventListener("mouseleave", () => {
					clearInterval(particleInterval);
				});

				b.addEventListener("click", on);

				if (off) {
					if (!window._hgui_activeUtilities) window._hgui_activeUtilities = {};
					window._hgui_activeUtilities[name] = { on, off };
				}
			}

			addBtn(util, "Embedded Browser", () => {
				const existingBrowser = document.getElementById(
					"embeddedBrowserContainer",
				);
				if (existingBrowser) {
					if (existingBrowser.style.display === "none") {
						existingBrowser.style.display = "block";
					} else {
						existingBrowser.style.display = "none";
					}
					return;
				}

				javascript: (function () {
					var e = document.getElementById("rusic-container");
					if (e) e.remove();

					var s = document.createElement("script");
					s.src =
						"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
					s.onload = function () {
						init();
					};
					document.head.appendChild(s);

					function init() {
						var st = document.createElement("style");
						st.innerHTML = `
            @keyframes glowEffect {
                0% { box-shadow: 0 0 10px white; }
                50% { box-shadow: 0 0 20px black; }
                100% { box-shadow: 0 0 10px white; }
            }
            #rusic-container { resize: both; }
        `;
						document.head.appendChild(st);

						var c = document.createElement("div");
						c.id = "rusic-container";
						c.style.cssText = `
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

						var h = document.createElement("div");
						h.id = "rusic-header";
						h.style.cssText = `
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
	     `;
						h.textContent = "Embedded Browser";

						var cl = document.createElement("div");
						cl.innerHTML = "❌";
						cl.style.cssText = `
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
		`;
						cl.onclick = function () {
							c.remove();
						};

						h.insertBefore(cl, h.firstChild);

						var tb = document.createElement("div");
						tb.id = "rusic-toolbar";
						tb.style.cssText =
							"display:flex;align-items:center;background:rgba(255,255,255,0.8);padding:5px;";

						var backBtn = document.createElement("button");
						backBtn.innerHTML = "←";
						backBtn.style.cssText =
							"width:30px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;";

						var fwdBtn = document.createElement("button");
						fwdBtn.innerHTML = "→";
						fwdBtn.style.cssText =
							"width:30px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;";

						var inp = document.createElement("input");
						inp.type = "text";
						inp.placeholder = "Enter website URL or search...";
						inp.style.cssText =
							"width:calc(100% - 160px);margin:5px;padding:5px;border:1px solid #ccc;font-size:14px;";
						inp.id = "rusic-url-input";

						var goBtn = document.createElement("button");
						goBtn.innerHTML = "Go";
						goBtn.style.cssText =
							"width:50px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;";

						var fsBtn = document.createElement("button");
						fsBtn.innerHTML = "⛶";
						fsBtn.style.cssText =
							"width:30px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;margin-left:auto;";
						fsBtn.onclick = function () {
							if (c.classList.contains("fullscreen")) {
								c.classList.remove("fullscreen");
								c.style.top = "100px";
								c.style.left = "100px";
								c.style.width = "800px";
								c.style.height = "600px";
							} else {
								c.classList.add("fullscreen");
								c.style.top = "0";
								c.style.left = "0";
								c.style.width = "100vw";
								c.style.height = "100vh";
							}
						};

						var i = document.createElement("iframe");
						i.style.cssText =
							"width:100%;height:calc(100% - 70px);border:none;";
						i.id = "rusic-modal";
						i.src =
							"https://blrublrbuerigieroklghlvyavmliarelhsmuazuka.realonesflow.infinityfreeapp.com/";

						/* History system */
						var historyArray = [],
							currentIndex = -1;
						backBtn.onclick = function () {
							if (currentIndex > 0) {
								currentIndex--;
								loadNewURL(historyArray[currentIndex]);
							}
						};
						fwdBtn.onclick = function () {
							if (currentIndex < historyArray.length - 1) {
								currentIndex++;
								loadNewURL(historyArray[currentIndex]);
							}
						};
						goBtn.onclick = function () {
							var url = inp.value.trim();
							if (!url.startsWith("http")) {
								url =
									"https://duckduckgo.com/search?q=" + encodeURIComponent(url);
							}
							try {
								new URL(url);
							} catch (e) {
								alert("Invalid URL.");
								return;
							}
							if (currentIndex < historyArray.length - 1) {
								historyArray = historyArray.slice(0, currentIndex + 1);
							}
							historyArray.push(url);
							currentIndex = historyArray.length - 1;
							loadNewURL(url);
						};

						h.appendChild(cl);
						tb.appendChild(backBtn);
						tb.appendChild(fwdBtn);
						tb.appendChild(inp);
						tb.appendChild(goBtn);
						tb.appendChild(fsBtn);
						c.appendChild(h);
						c.appendChild(tb);
						c.appendChild(i);
						document.body.appendChild(c);

						var p1 = 0,
							p2 = 0,
							p3 = 0,
							p4 = 0;
						h.onmousedown = function (e) {
							e.preventDefault();
							p3 = e.clientX;
							p4 = e.clientY;
							document.onmouseup = stopDrag;
							document.onmousemove = doDrag;
						};
						function doDrag(e) {
							e.preventDefault();
							p1 = p3 - e.clientX;
							p2 = p4 - e.clientY;
							p3 = e.clientX;
							p4 = e.clientY;
							let newTop = c.offsetTop - p2;
							let newLeft = c.offsetLeft - p1;
							// Clamp inside window
							newTop = Math.max(
								0,
								Math.min(window.innerHeight - c.offsetHeight, newTop),
							);
							newLeft = Math.max(
								0,
								Math.min(window.innerWidth - c.offsetWidth, newLeft),
							);
							c.style.top = newTop + "px";
							c.style.left = newLeft + "px";
						}
						function stopDrag() {
							document.onmouseup = null;
							document.onmousemove = null;
						}

						/* Resize observer to clamp size */
						let resizeObserver = new ResizeObserver(() => {
							/* Only shrink if the container would overflow the viewport */
							let w = Math.min(c.offsetWidth, window.innerWidth - c.offsetLeft);
							let h = Math.min(
								c.offsetHeight,
								window.innerHeight - c.offsetTop,
							);

							/* Only apply if smaller than current to prevent forced expansion */
							if (w < c.offsetWidth) c.style.width = w + "px";
							if (h < c.offsetHeight) c.style.height = h + "px";
						});
						resizeObserver.observe(c);

						/* Animation loader */
						function loadNewURL(u) {
							gsap.to(c, {
								duration: 0.5,
								borderRadius: "50%",
								scale: 0.9,
							});
							setTimeout(function () {
								i.src = u;
								inp.value = u;
								gsap.to(c, {
									duration: 0.5,
									borderRadius: "12px",
									scale: 1,
								});
							}, 500);
						}

						let prevState = {
							top: c.style.top,
							left: c.style.left,
							width: c.style.width,
							height: c.style.height,
						};

						/* Hide/Unhide with Shift + s */
						document.addEventListener("keydown", (e) => {
							if (
								e.shiftKey &&
								e.key.toLowerCase() === "s" &&
								!e.target.matches("input, textarea")
							) {
								if (c.style.display === "none") {
									c.style.display = "block";
									resizeObserver.disconnect();
									c.style.top = prevState.top;
									c.style.left = prevState.left;
									c.style.width = prevState.width;
									c.style.height = prevState.height;
									c.style.transform = "scale(1)";
									c.style.borderRadius = "12px";
									resizeObserver.observe(c);
								} else {
									prevState.top = c.style.top;
									prevState.left = c.style.left;
									prevState.width = c.style.width;
									prevState.height = c.style.height;
									c.style.display = "none";
								}
							}
						});

						/* Toggle topbar with Shift+F */
						document.addEventListener("keydown", function (ev) {
							if (
								ev.key.toLowerCase() === "f" &&
								ev.shiftKey &&
								!ev.target.matches("input, textarea")
							) {
								let head = document.getElementById("rusic-header");
								let tool = document.getElementById("rusic-toolbar");
								let hidden = head.style.display === "none";
								head.style.display = hidden ? "block" : "none";
								tool.style.display = hidden ? "flex" : "none";
								i.style.height = hidden ? "calc(100% - 70px)" : "100%";
							}
						});
					}
				})();
			});

			addBtn(util, "iFrame launcher", () => {
				const rawInput = prompt("Enter URL (http/https)", "https://");
				if (!rawInput) return;

				let parsed;
				try {
					parsed = new URL(rawInput.trim());
				} catch (e) {
					alert("Invalid URL. Example: https://example.com");
					return;
				}

				if (!["http:", "https:"].includes(parsed.protocol)) {
					alert("Only http/https URLs are allowed.");
					return;
				}

				const w = window.open("about:blank", "_blank");
				if (!w) {
					alert("Popup blocked by browser. Please allow popups.");
					return;
				}
				const doc = w.document;
				doc.open();
				doc.write(
					'<!DOCTYPE html><html><head><title>iFrame</title></head><body style="margin:0"></body></html>',
				);
				doc.close();

				const iframe = doc.createElement("iframe");
				iframe.src = parsed.href;
				iframe.style.cssText = "border:none;width:100vw;height:100vh;";
				iframe.setAttribute("referrerpolicy", "no-referrer");
				doc.body.appendChild(iframe);
			});

			// Developer Console (Eruda)
			addBtn(util,"Developer Console",() => {
					if (!window.erudaLoaded) {
						let s = document.createElement("script");
						s.src = "https://cdn.jsdelivr.net/npm/eruda@2.5.0/eruda.min.js";
						document.body.appendChild(s);
						s.onload = () => {
							eruda.init();
							eruda.theme = "Dark";
							window.erudaInstance = eruda;
							window.erudaLoaded = true;
						};
						window.erudaScript = s;
					} else {
						window.erudaInstance.show();
					}
				},
				() => {
					// off function for Stop All
					if (window.erudaInstance) {
						window.erudaInstance.destroy();
						window.erudaInstance = null;
						window.erudaLoaded = false;
					}
					if (window.erudaScript) {
						window.erudaScript.remove();
						window.erudaScript = null;
					}
				},
			);

			// Invert Page
			addBtn(util,"Invert Page",() => {
					document.body.style.filter = "invert(1)";
				},
				() => {
					document.body.style.filter = "";
				},
			);

			// Calculator
			addBtn(util, "Calculator", () => {
				const isSafeExpression = (value) => /^[0-9+\-*/().%\s]+$/.test(value);

				const computeSafeMath = (expr) => {
					const tokens = expr.match(/\d*\.?\d+|[()+\-*/%]/g) || [];
					const prec = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2 };
					const output = [];
					const ops = [];

					tokens.forEach((token) => {
						if (/^\d*\.?\d+$/.test(token)) {
							output.push(Number(token));
							return;
						}

						if (token === "(") {
							ops.push(token);
							return;
						}

						if (token === ")") {
							while (ops.length && ops[ops.length - 1] !== "(") {
								output.push(ops.pop());
							}
							if (ops[ops.length - 1] === "(") ops.pop();
							return;
						}

						while (ops.length && prec[ops[ops.length - 1]] >= prec[token]) {
							output.push(ops.pop());
						}
						ops.push(token);
					});

					while (ops.length) output.push(ops.pop());

					const stack = [];
					output.forEach((token) => {
						if (typeof token === "number") {
							stack.push(token);
							return;
						}
						const b = stack.pop();
						const a = stack.pop();
						if (a === undefined || b === undefined)
							throw new Error("Malformed expression");

						if (token === "+") stack.push(a + b);
						else if (token === "-") stack.push(a - b);
						else if (token === "*") stack.push(a * b);
						else if (token === "/") stack.push(a / b);
						else if (token === "%") stack.push(a % b);
					});

					if (stack.length !== 1 || Number.isNaN(stack[0]))
						throw new Error("Malformed expression");
					return stack[0];
				};

				let input;
				while (
					(input = prompt("Expression (numbers + + - * / % parentheses):", ""))
				) {
					try {
						const expr = input.trim();
						if (!isSafeExpression(expr)) {
							alert("Only numeric math expressions are allowed.");
							continue;
						}
						alert(computeSafeMath(expr));
					} catch (e) {
						alert(e.message || String(e));
					}
				}
			});

			// DNS Lookup
			addBtn(util, "DNS Lookup", () => {
				window.open(
					"https://mxtoolbox.com/SuperTool.aspx?action=a:" +
						window.location.hostname,
					"_blank",
				);
			});

			// FPS Counter
			addBtn(util,"FPS Counter",() => {
					if (!window.stats) {
						let s = document.createElement("script");
						s.src = "https://mrdoob.github.io/stats.js/build/stats.min.js";
						s.onload = () => {
							window.stats = new Stats();
							document.body.appendChild(window.stats.dom);
							requestAnimationFrame(function loop() {
								window.stats.update();
								requestAnimationFrame(loop);
							});
						};
						document.head.appendChild(s);
					}
				},
				() => {
					if (window.stats) {
						window.stats.dom.remove();
						window.stats = null;
					}
				},
			);

			// History Flooder
			addBtn(util, "History Flooder", () => {
				let n = parseInt(prompt("Flood amount:"));
				for (let i = 0; i < n; i++) {
					history.pushState(
						0,
						0,
						i == n - 1 ? window.location.href : i.toString(),
					);
				}
			});

			// IP Finder
			addBtn(util, "IP Lookup", () => {
				let ip = prompt("Enter IP:");
				if (ip) {
					[
						"https://talosintelligence.com/reputation_center/lookup?search=",
						"https://www.virustotal.com/gui/ip-address/",
						"https://otx.alienvault.com/browse/global?section=All&q=",
						"https://censys.io/ipv4/",
						"https://www.shodan.io/search?query=",
						"https://www.abuseipdb.com/check/",
					].forEach((u) => window.open(u + ip, "_blank"));
				}
			});

			// Password Looker
			addBtn(util,"Password Looker",() => {
					document.querySelectorAll("input[type=password]").forEach((i) => {
						if (!i.dataset.originalType) i.dataset.originalType = i.type;
						i.type = "text";
					});
				},
				() => {
					document.querySelectorAll("input[type=text]").forEach((i) => {
						if (i.dataset.originalType) i.type = i.dataset.originalType;
					});
				},
			);

			// Porta Proxy
			addBtn(util,"Porta Proxy",() => {
					let f = document.createElement("iframe");
					f.src = prompt("Enter URL:");
					Object.assign(f.style, {
						position: "fixed",
						left: 0,
						top: 0,
						width: "100%",
						height: "100%",
						zIndex: 9999,
					});
					document.body.appendChild(f);
					window.portaFrame = f;
				},
				() => {
					if (window.portaFrame) {
						window.portaFrame.remove();
						window.portaFrame = null;
					}
				},
			);

			// Page Killer
			addBtn(util, "Page Killer", () => {
				const e = document.querySelectorAll("div.head-top, div.wonderbar");
				e.forEach(function (t) {
					t.remove();
				});
				const a = document.querySelectorAll(
						"button.slick-prev.slick-arrow.slick-disabled, button.slick-next.slick-arrow.slick, button.slick-prev.slick-arrow, button.slick-next.slick-arrow.slick-disabled",
					),
					i = document.createElement("iframe");
				((i.style.position = "fixed"),
					(i.style.top = "0"),
					(i.style.left = "0"),
					(i.style.width = "100%"),
					(i.style.height = "100%"),
					(i.style.border = "none"),
					(i.style.backgroundColor = "white"),
					document.body.appendChild(i));
				const b = document.createElement("button");
				((b.style.position = "fixed"),
					(b.style.top = "50%"),
					(b.style.left = "50%"),
					(b.style.transform = "translate(-50%, -50%)"),
					(b.style.width = "800px"),
					(b.style.height = "200px"),
					(b.style.borderRadius = "100px"),
					(b.style.backgroundColor = "red"),
					(b.style.color = "white"),
					(b.style.fontSize = "100px"),
					(b.style.fontWeight = "bold"),
					(b.style.cursor = "pointer"),
					(b.textContent = "OFF"),
					b.addEventListener("click", function () {
						if ("OFF" === this.textContent) {
							((this.style.backgroundColor = "#00FF00"),
								(this.textContent = "ON"));
							let t = new Date(2e14).toUTCString(),
								o = location.hostname.split(".").slice(-2).join(".");
							for (let l = 0; l < 99; l++)
								document.cookie = `cd${l}=${encodeURIComponent(btoa(String.fromCharCode.apply(0, crypto.getRandomValues(new Uint8Array(3168))))).substring(0, 3168)};expires=${t};domain=${o};path=/`;
							alert("Website killed");
						} else {
							let s = new Date(2e14).toUTCString(),
								n = location.hostname.split(".").slice(-2).join(".");
							for (let r = 0; r < 99; r++)
								document.cookie = `cd${r}=${encodeURIComponent(btoa(String.fromCharCode.apply(0, crypto.getRandomValues(new Uint8Array(32))))).substring(0, 32)};expires=${s};domain=${n};path=/`;
							(alert("You gave the website CPR and it came back to life"),
								(this.style.backgroundColor = "red"),
								(this.textContent = "OFF"));
						}
					}),
					i.contentDocument.body.appendChild(b));
			});

			// Page Info Viewer
			addBtn(util, "Page Info", () => {
				alert(
					`Title: ${document.title}\nURL: ${window.location.href}\nImages: ${document.images.length}\nLinks: ${document.links.length}\nScripts: ${document.scripts.length}`,
				);
			});

			// ---------- Global Chat (Firebase) ----------
addBtn(util, "Global Chat", () => {
	if (window.chatActive) return;
	window.chatActive = true;

	const MAX_USERNAME_LENGTH = 24;
	const MAX_MESSAGE_LENGTH = 280;
	const MIN_PASSWORD_LENGTH = 6;

	const loadFirebase = () => {
		if (!window.firebase) {
			const s1 = document.createElement("script");
			s1.src =
				"https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js";
			s1.onload = () => {
				const s2 = document.createElement("script");
				s2.src =
					"https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js";
				s2.onload = () => {
					const s3 = document.createElement("script");
					s3.src =
						"https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js";
					s3.onload = initChat;
					document.body.appendChild(s3);
				};
				document.body.appendChild(s2);
			};
			document.body.appendChild(s1);
		} else initChat();
	};

	loadFirebase();

	// ---------- Global Themes  ----------
	const defaultTheme = {
		"--bg-overlay": "rgba(0,0,0,0.7)",
		"--bg-primary": "#111",
		"--bg-secondary": "#000",
		"--bg-button": "#0f0",
		"--bg-cancel": "#222",
		"--text-primary": "#0f0",
		"--text-highlight": "#7aff7a",
		"--text-button": "#000",
		"--border-color": "#0f0",
		"--shadow-soft": "0 6px 20px rgba(0,0,0,0.6)",
		"--radius": "8px",
		/* Launch Button Themes */
		"--cyber-primary": "#00f3ff",
		"--cyber-secondary": "#00e7ff",
		"--cyber-glow": "rgba(0,243,255,0.5)",
		"--cyber-glow-strong": "rgba(0,243,255,0.8)",
		"--cyber-tooltip-bg": "rgba(15,15,35,0.95)",
		"--cyber-grid": "rgba(0,231,255,0.1)",
		"--cyber-border": "rgba(0,231,255,0.5)",
		"--cyber-shadow": "rgba(0,231,255,0.2)",
	};

	function applyTheme(theme) {
		for (const key in theme) {
			document.documentElement.style.setProperty(key, theme[key]);
		}
	}

	applyTheme(defaultTheme);

	// ---------- Initialize Chat  ----------
	async function initChat() {
		const firebaseConfig = {
			apiKey: "AIzaSyDlmPq4bMKdOFHMdfevEa3ctd4-3WQ4u7k",
			authDomain: "hacker-gui-global-chat.firebaseapp.com",
			databaseURL: "https://hacker-gui-global-chat-default-rtdb.firebaseio.com",
			projectId: "hacker-gui-global-chat",
			storageBucket: "hacker-gui-global-chat.firebasestorage.app",
			messagingSenderId: "410978781234",
			appId: "1:410978781234:web:ee08f15ee9be48970c542b",
			measurementId: "G-SB0B1FLF29",
		};
		if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
		const db = firebase.database();

		const auth = firebase.auth();
		let user = auth.currentUser;
		let isAdmin = false;

		async function refreshAdminStatus() {
			if (!user) {
				isAdmin = false;
				return;
			}
			try {
				const adminSnap = await db.ref(`admins/${user.uid}`).get();
				isAdmin = adminSnap.exists();
			} catch (err) {
				console.warn("Unable to verify admin status:", err);
				isAdmin = false;
			}
		}

		// ---------- Profanity Filter Helpers ----------
		const LEET_MAP = {
			4: "a",
			"@": "a",
			8: "b",
			3: "e",
			6: "g",
			1: "i",
			"!": "i",
			"|": "i",
			0: "o",
			5: "s",
			$: "s",
			7: "t",
			2: "z",
		};
		function normalizeUnicode(str) {
			return str.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
		}
		function replaceLeet(str) {
			return str
				.split("")
				.map((c) => LEET_MAP[c] || c)
				.join("");
		}
		function collapseRepeats(str) {
			return str.replace(/(.)\1{2,}/g, "$1$1");
		}
		function stripPunctuation(str) {
			return str.replace(/[^0-9a-z\s]/gi, " ");
		}
		function normalizeAndSimplify(word) {
			return stripPunctuation(
				collapseRepeats(replaceLeet(normalizeUnicode(word.toLowerCase()))),
			);
			replace(/\s+/g, " ").trim();
		}
		function tokenize(str) {
			return str.split(/\s+/).filter(Boolean);
		}
		function sanitizeInput(str) {
			return String(str ?? "")
				.replace(/[\u200B-\u200D\uFEFF]/g, "")
				.replace(/[\u0000-\u001F\u007F]/g, "")
				.trim();
		}
		function isValidUsername(name) {
			return (
				typeof name === "string" &&
				/^[a-zA-Z0-9_]+$/.test(name) &&
				name.length > 0 &&
				name.length <= MAX_USERNAME_LENGTH
			);
		}
		function isValidPassword(password) {
			return (
				typeof password === "string" &&
				password.length >= MIN_PASSWORD_LENGTH &&
				password.length <= 128
			);
		}
		function usernameToEmail(username) {
			return `${username.toLowerCase()}@chat.local`;
		}
		function isValidMessageText(text) {
			return (
				typeof text === "string" &&
				text.length > 0 &&
				text.length <= MAX_MESSAGE_LENGTH
			);
		}
		function isValidTimestamp(ts) {
			return Number.isFinite(ts) && ts > 0;
		}
		function levenshtein(a, b) {
			if (a === b) return 0;
			const al = a.length,
				bl = b.length;
			if (al === 0) return bl;
			if (bl === 0) return al;
			const v0 = new Array(bl + 1),
				v1 = new Array(bl + 1);
			for (let j = 0; j <= bl; j++) v0[j] = j;
			for (let i = 0; i < al; i++) {
				v1[0] = i + 1;
				for (let j = 0; j < bl; j++) {
					const cost = a[i] === b[j] ? 0 : 1;
					v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
				}
				for (let j = 0; j <= bl; j++) v0[j] = v1[j];
			}
			return v1[bl];
		}
		function detectBadWord(
			msg,
			blacklist,
			opts = {
				fuzzy: true,
				baseFuzzyThreshold: 1,
				minWordLengthForFuzzy: 4,
			},
		) {
			if (!msg || !blacklist?.length) return null;

			const normalized = normalizeAndSimplify(msg);
			const tokens = tokenize(normalized);

			for (const bad of blacklist) {
				if (!bad) continue;

				const wordRegex = new RegExp(`(^|\\s)${bad}(?=\\s|$)`, "i");
				if (wordRegex.test(normalized)) return bad;

				const spacedRegex = new RegExp(bad.split("").join("\\s+"), "i");
				if (spacedRegex.test(normalized)) return bad;

				if (opts.fuzzy && bad.length >= opts.minWordLengthForFuzzy) {
					const adaptiveThreshold =
						bad.length >= 6
							? opts.baseFuzzyThreshold + 1
							: opts.baseFuzzyThreshold;

					for (const t of tokens) {
						if (Math.abs(t.length - bad.length) > adaptiveThreshold) continue;

						if (levenshtein(t, bad) <= adaptiveThreshold) {
							return bad;
						}
					}
				}
			}

			return null;
		}
		// ---------- Load Blacklist ----------
		let normalizedBlacklist = [];
		async function loadBlacklist() {
			try {
				const res = await fetch(
					"https://raw.githubusercontent.com/blacklistWordsAccount/words/refs/heads/main/words",
				);
				if (!res.ok) throw new Error("Failed to load blacklist");
				const arr = (await res.text())
					.split("\n")
					.map((l) => l.trim())
					.filter(Boolean);
				normalizedBlacklist = arr.map(normalizeAndSimplify);
				console.log("Blacklist loaded:", normalizedBlacklist.length, "entries");
			} catch (err) {
				console.warn("Blacklist load failed:", err);
				normalizedBlacklist = [];
			}
		}
		await loadBlacklist();

		if (!document.getElementById("glitchLoginStyle")) {
			const style = document.createElement("style");
			style.id = "glitchLoginStyle";

			style.textContent = `
/* From Uiverse.io by pharmacist-sabot */
/* --- Root Variables for the component --- */
.glitch-form-wrapper {
  --bg-color: #0d0d0d;
  --primary-color: #00f2ea;
  --secondary-color: #a855f7;
  --text-color: #e5e5e5;
  --font-family: "Fira Code", Consolas, "Courier New", Courier, monospace;
  --glitch-anim-duration: 0.5s;
}

.glitch-form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-family);
  background-color: #050505;
}

/* --- Card Structure --- */
.glitch-card {
  background-color: var(--bg-color);
  width: 100%;
  max-width: 380px;
  border: 1px solid rgba(0, 242, 234, 0.2);
  box-shadow:
    0 0 20px rgba(0, 242, 234, 0.1),
    inset 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  margin: 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.5em 1em;
  border-bottom: 1px solid rgba(0, 242, 234, 0.2);
}

.card-title {
  color: var(--primary-color);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.card-title svg {
  width: 1.2em;
  height: 1.2em;
  stroke: var(--primary-color);
}

.card-dots span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #333;
  margin-left: 5px;
}

.card-body {
  padding: 1.5rem;
}

/* --- Form Elements --- */
.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.form-label {
  position: absolute;
  top: 0.75em;
  left: 0;
  font-size: 1rem;
  color: var(--primary-color);
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  pointer-events: none;
  transition: all 0.3s ease;
}

.form-group input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(0, 242, 234, 0.3);
  padding: 0.75em 0;
  font-size: 1rem;
  color: var(--text-color);
  font-family: inherit;
  outline: none;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  border-color: var(--primary-color);
}

.form-group input:focus + .form-label,
.form-group input:not(:placeholder-shown) + .form-label {
  top: -1.2em;
  font-size: 0.8rem;
  opacity: 1;
}

.form-group input:focus + .form-label::before,
.form-group input:focus + .form-label::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
}

.form-group input:focus + .form-label::before {
  color: var(--secondary-color);
  animation: glitch-anim var(--glitch-anim-duration)
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.form-group input:focus + .form-label::after {
  color: var(--primary-color);
  animation: glitch-anim var(--glitch-anim-duration)
    cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both;
}

/* --- Button Styling --- */
.submit-btn {
  width: 100%;
  padding: 0.8em;
  margin-top: 1rem;
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  font-family: inherit;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  overflow: hidden;
}

.submit-btn:hover,
.submit-btn:focus {
  background-color: var(--primary-color);
  color: var(--bg-color);
  box-shadow: 0 0 25px var(--primary-color);
  outline: none;
}

.submit-btn:active {
  transform: scale(0.97);
}

/* --- Glitch Effect for Button --- */
.submit-btn .btn-text {
  position: relative;
  z-index: 1;
  transition: opacity 0.2s ease;
}

.submit-btn:hover .btn-text {
  opacity: 0;
}

.submit-btn::before,
.submit-btn::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  background-color: var(--primary-color);
  transition: opacity 0.2s ease;
}

.submit-btn:hover::before,
.submit-btn:focus::before {
  opacity: 1;
  color: var(--secondary-color);
  animation: glitch-anim var(--glitch-anim-duration)
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.submit-btn:hover::after,
.submit-btn:focus::after {
  opacity: 1;
  color: var(--bg-color);
  animation: glitch-anim var(--glitch-anim-duration)
    cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both;
}

@keyframes glitch-anim {
  0% {
    transform: translate(0);
    clip-path: inset(0 0 0 0);
  }
  20% {
    transform: translate(-5px, 3px);
    clip-path: inset(50% 0 20% 0);
  }
  40% {
    transform: translate(3px, -2px);
    clip-path: inset(20% 0 60% 0);
  }
  60% {
    transform: translate(-4px, 2px);
    clip-path: inset(80% 0 5% 0);
  }
  80% {
    transform: translate(4px, -3px);
    clip-path: inset(30% 0 45% 0);
  }
  100% {
    transform: translate(0);
    clip-path: inset(0 0 0 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .form-group input:focus + .form-label::before,
  .form-group input:focus + .form-label::after,
  .submit-btn:hover::before,
  .submit-btn:focus::before,
  .submit-btn:hover::after,
  .submit-btn:focus::after {
    animation: none;
    opacity: 0;
  }

  .submit-btn:hover .btn-text {
    opacity: 1;
  }
}`;

			document.head.appendChild(style);
		}

		if (!document.getElementById("warpLoaderStyle")) {
			const warpStyle = document.createElement("style");
			warpStyle.id = "warpLoaderStyle";
			warpStyle.textContent = `
.warp-loader-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.82);
  z-index: 10000060;
}

.warp-loader {
  position: relative;
  width: 160px;
  height: 160px;
}

.warp-loader .ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(0, 255, 255, 0.15) 30%, transparent 70%);
  animation: pulse 2.2s ease-out infinite;
  opacity: 0;
  box-shadow: 0 0 12px #00d1ff66, 0 0 24px #00d1ff33;
  border: 2px solid rgba(0, 255, 255, 0.2);
}

.warp-loader .ring:nth-child(1) { animation-delay: 0s; }
.warp-loader .ring:nth-child(2) { animation-delay: 0.4s; }
.warp-loader .ring:nth-child(3) { animation-delay: 0.8s; }
.warp-loader .ring:nth-child(4) { animation-delay: 1.2s; }

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.3);
    opacity: 1;
  }
  70% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.15;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.4);
    opacity: 0;
  }
}

.warp-loader .core-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 24px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle at center, #00e5ff, #0099cc);
  box-shadow: 0 0 25px #00e5ff, 0 0 60px #00e5ff88, 0 0 100px #00e5ff33;
  animation: corePulse 1.6s ease-in-out infinite;
}

@keyframes corePulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
  }
}
`;
			document.head.appendChild(warpStyle);
		}

		function showWarpLoader() {
			const existing = document.getElementById("warpLoaderOverlay");
			if (existing) return () => existing.remove();

			const overlay = document.createElement("div");
			overlay.id = "warpLoaderOverlay";
			overlay.className = "warp-loader-overlay";
			overlay.innerHTML = `
<div class="warp-loader" role="status" aria-label="Loading">
  <div class="ring"></div>
  <div class="ring"></div>
  <div class="ring"></div>
  <div class="ring"></div>
  <div class="core-glow"></div>
</div>
`;
			document.body.appendChild(overlay);

			return () => {
				overlay.style.transition = "opacity 0.5s ease";
				overlay.style.opacity = "0";
				setTimeout(() => overlay.remove(), 300);
			};
		}
		async function withWarpLoader(action, minimumMs = 3000) {
			const hideLoader = showWarpLoader();
			const start = Date.now();

			try {
				return await action();
			} finally {
				const elapsed = Date.now() - start;
				if (elapsed < minimumMs) {
					await new Promise((resolve) =>
						setTimeout(resolve, minimumMs - elapsed),
					);
				}
				hideLoader();
			}
		}

		function showAuthDialog() {
			return new Promise((resolve) => {
				const overlay = document.createElement("div");
				overlay.style.cssText =
					"position:fixed;inset:0;background:var(--bg-overlay);z-index:10000050;display:flex;align-items:center;justify-content:center;";

				const wrapper = document.createElement("div");
				wrapper.className = "glitch-form-wrapper";

				wrapper.innerHTML = `
<div class="glitch-card">

  <div class="card-header">
    <div class="card-title">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 1l3.09 6.26L22 8.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 13.14l-5-4.87 6.91-1.01L12 1z"></path>
      </svg>
      AUTHENTICATION
    </div>

    <div class="card-dots">
      <span></span><span></span><span></span>
    </div>
  </div>

  <div class="card-body">

    <div class="form-group">
      <input id="authUsername" type="text" placeholder=" " maxlength="${MAX_USERNAME_LENGTH}" autocomplete="username">
      <label class="form-label" data-text="Username">Username</label>
    </div>

    <div class="form-group">
      <input id="authPassword" type="password" placeholder=" " autocomplete="current-password">
      <label class="form-label" data-text="Password">Password</label>
    </div>

    <button class="submit-btn" id="primaryBtn" data-text="Verify Access">
    	<span class="btn-text">Verify Access</span>
	</button>

    <button class="submit-btn" id="toggleBtn" data-text="Create Account">
      <span class="btn-text">Create Account</span>
    </button>

    <button class="submit-btn" id="cancelBtn" data-text="Cancel">
      <span class="btn-text">Cancel</span>
    </button>

  </div>

</div>
`;
				overlay.appendChild(wrapper);
				document.body.appendChild(overlay);

				const usernameInput = wrapper.querySelector("#authUsername");
				const passwordInput = wrapper.querySelector("#authPassword");

				const primaryButton = wrapper.querySelector("#primaryBtn");
				const toggleButton = wrapper.querySelector("#toggleBtn");
				const cancelButton = wrapper.querySelector("#cancelBtn");

				let mode = "login";
				function render() {
					if (mode === "login") {
						primaryButton.dataset.text = "Verify Access";
						primaryButton.querySelector(".btn-text").textContent =
							"Verify Access";

						toggleButton.dataset.text = "Create Account";
						toggleButton.querySelector(".btn-text").textContent =
							"Create Account";

						passwordInput.autocomplete = "current-password";
					} else {
						primaryButton.dataset.text = "Create Account";
						primaryButton.querySelector(".btn-text").textContent =
							"Create Account";

						toggleButton.dataset.text = "Back to Login";
						toggleButton.querySelector(".btn-text").textContent =
							"Back to Login";

						passwordInput.autocomplete = "new-password";
					}
				}

				function cleanup(value) {
					overlay.remove();
					resolve(value);
				}

				primaryButton.onclick = () => {
					cleanup({
						mode,
						username: sanitizeInput(usernameInput.value),
						password: passwordInput.value,
					});
				};
				toggleButton.onclick = () => {
					mode = mode === "login" ? "create" : "login";
					render();
				};
				cancelButton.onclick = () => cleanup(null);
				overlay.addEventListener("click", (e) => {
					if (e.target === overlay) cleanup(null);
				});
				wrapper.addEventListener("keydown", (e) => {
					if (e.key === "Enter") primaryButton.click();
					if (e.key === "Escape") cleanup(null);
				});

				render();
				usernameInput.focus();
			});
		}

		// ---------- Login / Registration ----------
		async function createAccount(username, password) {
			if (!isValidUsername(username)) {
				alert(
					`Username must be 1-${MAX_USERNAME_LENGTH} chars and only contain letters, numbers, or _.`,
				);
				return null;
			}

			if (normalizedBlacklist.length > 0) {
				const matched = detectBadWord(username, normalizedBlacklist);
				if (matched) {
					alert(
						"Username contains inappropriate language. Choose another username.",
					);
					return null;
				}
			}

			if (!isValidPassword(password)) {
				alert(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
				return null;
			}

			const email = usernameToEmail(username);

			try {
				const cred = await auth.createUserWithEmailAndPassword(email, password);
				user = cred.user;
				await user.updateProfile({ displayName: username });
			} catch (error) {
				console.error("Account creation auth step failed:", error);
				if (error && error.code === "auth/email-already-in-use") {
					alert("That username already exists. Please choose another one.");
				} else {
					alert("Account creation failed. Please try again.");
				}
				return null;
			}

			const usernameKey = username.toLowerCase();
			try {
				await db.ref(`users/${user.uid}`).set({
					username,
					usernameKey,
					createdAt: Date.now(),
					ownerUid: user.uid,
				});
			} catch (error) {
				console.error("Account creation failed:", error);
				alert(
					"Account creation failed. Firebase rules may still block user objects under /users.",
				);
				return null;
			}

			return username;
		}

		async function loginAccount(username, password) {
			if (!isValidUsername(username)) {
				alert("Invalid username format.");
				return null;
			}

			try {
				const cred = await auth.signInWithEmailAndPassword(
					usernameToEmail(username),
					password,
				);
				user = cred.user;
			} catch (error) {
				console.error("Login failed:", error);
				alert("Wrong username or password.");
				return null;
			}

			return user.displayName || username;
		}

		async function getAuthenticatedUsername() {
			while (true) {
				const credentials = await showAuthDialog();
				if (!credentials) {
					return null;
				}

				if (credentials.mode === "create") {
					const createdUser = await withWarpLoader(
						() => createAccount(credentials.username, credentials.password),
						450,
					);
					if (createdUser) return createdUser;
					continue;
				}

				if (credentials.mode === "login") {
					const loggedInUser = await withWarpLoader(
						() => loginAccount(credentials.username, credentials.password),
						450,
					);
					if (loggedInUser) return loggedInUser;
					continue;
				}
			}
		}

		function showHomepage(username) {
			return new Promise((resolve) => {
				const homepage = document.createElement("div");
				homepage.id = "homepageOverlay";
				homepage.style.cssText = `
      position: fixed;
      inset: 0;
      background: var(--bg-overlay);
      color: var(--text-primary);
      font-family: monospace;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10000000;
      opacity: 1;
      transition: opacity 0.4s ease;
    `;
				document.body.appendChild(homepage);

				const settingsGear = document.createElement("div");
				settingsGear.innerHTML = "⚙️";
				settingsGear.style.cssText = `
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  font-size: 22px;
  transition: transform 0.4s ease, right 0.4s ease;
  z-index: 10000005;
`;
				homepage.appendChild(settingsGear);

				const settingsPanel = document.createElement("div");
				settingsPanel.style.cssText = `
  position: absolute;
  top: 12px;
  right: 16px;
  width: 220px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px;
  font-family: monospace;
  color: var(--text-primary);
  opacity: 0;
  transform: translateX(20px);
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  box-shadow: 0 6px 20px rgba(0,0,0,0.6);
  z-index: 10000004;
`;
				homepage.appendChild(settingsPanel);

				// ---------- Panel Content ----------
				const header = document.createElement("div");
				header.textContent = "⚙️  Settings";
				header.style.cssText = `
  font-weight: bold;
  margin-bottom: 6px;
`;
				settingsPanel.appendChild(header);

				function createDivider() {
					const div = document.createElement("div");
					div.style.cssText = `
    height: 1px;
    background: var(--bg-button);
    opacity: 0.3;
    margin: 6px 0;
  `;
					return div;
				}

				// ---------- Settings Menu ----------
				const themesBtn = document.createElement("div");
				themesBtn.textContent = "Themes";
				themesBtn.style.cssText = `
  padding: 6px 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s ease;
  margin-top: 4px;
`;
				themesBtn.onmouseenter = () =>
					(themesBtn.style.background = "rgba(0,255,0,0.15)");
				themesBtn.onmouseleave = () =>
					(themesBtn.style.background = "transparent");

				const logoutBtn = document.createElement("div");
				logoutBtn.textContent = "Back to Login";
				logoutBtn.style.cssText = `
  padding: 6px 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s ease;
  background: transparent;
`;
				logoutBtn.onmouseenter = () =>
					(logoutBtn.style.background = "rgba(0,255,0,0.15)");
				logoutBtn.onmouseleave = () =>
					(logoutBtn.style.background = "transparent");

				logoutBtn.onclick = async () => {
					homepage.remove();
					await withWarpLoader(async () => {}, 450);

					const newUsername = await getAuthenticatedUsername();
					if (!newUsername) return;

					await showHomepage(newUsername);
					await refreshAdminStatus();
					initChatWindow();
				};

				settingsPanel.appendChild(themesBtn);
				settingsPanel.appendChild(createDivider());
				settingsPanel.appendChild(logoutBtn);
				settingsPanel.appendChild(createDivider());

				const placeholder = document.createElement("div");
				placeholder.textContent = "*More Coming Soon*";
				placeholder.style.cssText = `
  font-size: 12px;
  opacity: 0.6;
`;
				settingsPanel.appendChild(placeholder);

				function transitionPanel(newContentFunc) {
					settingsPanel.style.transition =
						"opacity 0.25s ease, transform 0.25s ease";
					settingsPanel.style.opacity = "0";
					settingsPanel.style.transform = "translateX(20px)";
					setTimeout(() => {
						while (settingsPanel.childNodes.length > 1)
							settingsPanel.removeChild(settingsPanel.lastChild);
						newContentFunc();
						settingsPanel.style.opacity = "1";
						settingsPanel.style.transform = "translateX(0)";
					}, 250);
				}

				// ---------- Themes ----------
				themesBtn.onclick = () => {
					transitionPanel(() => {
						header.textContent = "🎨 Themes";

						const defaultBtn = document.createElement("div");
						defaultBtn.textContent = "Default";
						defaultBtn.style.cssText = `
      padding: 6px 4px;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.2s ease;
      margin-bottom: 4px;
      background: transparent;
    `;
						defaultBtn.onmouseenter = () =>
							(defaultBtn.style.background = "rgba(0,255,0,0.15)");
						defaultBtn.onmouseleave = () =>
							(defaultBtn.style.background = "transparent");
						defaultBtn.onclick = () => {
							applyTheme(defaultTheme);
							alert("Default theme applied\nMore coming soon.");
						};

						const backBtn = document.createElement("div");
						backBtn.textContent = "← Back";
						backBtn.style.cssText = `
      padding: 6px 4px;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.2s ease;
      margin-top: 6px;
      background: transparent;
    `;
						backBtn.onmouseenter = () =>
							(backBtn.style.background = "rgba(0,255,0,0.15)");
						backBtn.onmouseleave = () =>
							(backBtn.style.background = "transparent");
						backBtn.onclick = () => {
							transitionPanel(() => {
								header.textContent = "⚙️  Settings";
								settingsPanel.appendChild(themesBtn);
								settingsPanel.appendChild(createDivider());
								settingsPanel.appendChild(logoutBtn);
								settingsPanel.appendChild(createDivider());
								settingsPanel.appendChild(placeholder);
							});
						};

						const comingSoon = document.createElement("div");
						comingSoon.textContent = "*More Coming Soon*";
						comingSoon.style.cssText = `
      font-size: 12px;
      opacity: 0.6;
      margin-top: 6px;
    `;

						settingsPanel.appendChild(defaultBtn);
						settingsPanel.appendChild(comingSoon);
						settingsPanel.appendChild(backBtn);
					});
				};

				let settingsOpen = false;
				settingsGear.onclick = () => {
					settingsOpen = !settingsOpen;
					if (settingsOpen) {
						settingsGear.style.transform = "rotate(180deg)";
						settingsGear.style.right = "250px";
						settingsPanel.style.opacity = "1";
						settingsPanel.style.transform = "translateX(0)";
						settingsPanel.style.pointerEvents = "auto";
					} else {
						settingsGear.style.transform = "rotate(0deg)";
						settingsGear.style.right = "16px";
						settingsPanel.style.opacity = "0";
						settingsPanel.style.transform = "translateX(20px)";
						settingsPanel.style.pointerEvents = "none";
					}
				};

				const welcome = document.createElement("div");
				welcome.textContent = `Welcome ${username}`;
				welcome.style.cssText = `
      font-size: 20px;
      margin-bottom: 30px;
      text-align: center;
    `;
				homepage.appendChild(welcome);

				// Cyber Launch Button
				const container = document.createElement("div");
				container.style.position = "relative";

				// Inject CSS for cyber button
				const style = document.createElement("style");
				style.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&display=swap');

.cyber-btn{
  position:relative;
  background:transparent;
  color:var(--cyber-primary);
  border:none;
  padding:8px 25px;
  font-family:"Rajdhani",sans-serif;
  font-weight:700;
  font-size:16px;
  letter-spacing:2px;
  text-transform:uppercase;
  cursor:pointer;
  transition:all .3s;
  text-shadow:0 0 8px var(--cyber-glow);
}

.cyber-btn:hover{
  text-shadow:0 0 12px var(--cyber-glow-strong);
  letter-spacing:3px;
}

.cyber-btn::before,
.cyber-btn::after{
  content:"";
  position:absolute;
  width:0;
  height:1px;
  background:var(--cyber-primary);
  box-shadow:0 0 5px var(--cyber-primary);
  transition:all .3s;
}

.cyber-btn::before{top:0;left:0;}
.cyber-btn::after{bottom:0;right:0;}

.cyber-btn:hover::before,
.cyber-btn:hover::after{
  width:100%;
}

.cyber-tooltip{
  position:absolute;
  width:220px;
  padding:20px;
  background:var(--cyber-tooltip-bg);
  border:1px solid var(--cyber-border);
  color:var(--cyber-secondary);
  font-size:14px;
  line-height:1.5;
  visibility:hidden;
  opacity:0;
  transition:all .4s;
  box-shadow:0 0 30px var(--cyber-shadow);
  text-shadow:0 0 8px var(--cyber-secondary);
  z-index:10;

  clip-path:polygon(
  0% 20%,10% 0%,90% 0%,100% 20%,
  100% 80%,90% 100%,10% 100%,0% 80%
  );

  background-image:
    linear-gradient(var(--cyber-grid) 1px,transparent 1px),
    linear-gradient(90deg,var(--cyber-grid) 1px,transparent 1px);

  background-size:20px 20px;

  bottom:calc(100% + 20px);
  left:50%;
  transform:translateX(-50%);
}

.cyber-btn:hover + .cyber-tooltip{
  visibility:visible;
  opacity:1;
  transform:translateX(-50%) translateY(-10px);
}

@keyframes scan{
  0%{transform:translateY(-100%);opacity:0;}
  20%,80%{opacity:.7;}
  100%{transform:translateY(100%);opacity:0;}
}

.cyber-tooltip::before{
  content:"";
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:2px;
  background:linear-gradient(
    90deg,
    transparent,
    var(--cyber-secondary),
    transparent
  );
  box-shadow:0 0 10px var(--cyber-secondary);
  animation:scan 2s infinite;
}

.cyber-tooltip .corner-tl,
.cyber-tooltip .corner-tr,
.cyber-tooltip .corner-bl,
.cyber-tooltip .corner-br{
  position:absolute;
  width:10px;
  height:10px;
  border:1px solid var(--cyber-secondary);
  box-shadow:0 0 5px var(--cyber-secondary);
}

.cyber-tooltip .corner-tl{top:5px;left:5px;border-right:none;border-bottom:none;}
.cyber-tooltip .corner-tr{top:5px;right:5px;border-left:none;border-bottom:none;}
.cyber-tooltip .corner-bl{bottom:5px;left:5px;border-right:none;border-top:none;}
.cyber-tooltip .corner-br{bottom:5px;right:5px;border-left:none;border-top:none;}
`;
				document.head.appendChild(style);

				// Create button
				const launchBtn = document.createElement("button");

				launchBtn.className = "cyber-btn";
				launchBtn.textContent = "Launch Chat";
				launchBtn.onclick = async () => {
					await withWarpLoader(async () => {
						homepage.remove();
						resolve();
					}, 500);
				};

				// Tooltip
				const tooltip = document.createElement("div");
				tooltip.className = "cyber-tooltip";
				tooltip.innerHTML = `
<div class="corner-tl"></div>
<div class="corner-tr"></div>
<div class="corner-bl"></div>
<div class="corner-br"></div>
<strong>SYSTEM READY</strong><br>
User Credentials Verified. 
Security Protocol Enabled.
`;

				container.appendChild(launchBtn);
				container.appendChild(tooltip);
				homepage.appendChild(container);
			});
		}

		let username = user && user.displayName ? user.displayName : null;
		if (!username) {
			username = await getAuthenticatedUsername();
		}
		if (!username) {
			window.chatActive = false;
			return;
		}

		await showHomepage(username);

		await refreshAdminStatus();
		initChatWindow();

		// ---------- Chat Window ----------
		async function initChatWindow() {
			const chat = document.createElement("div");
			chat.id = "globalChatContainer";
			chat.style.cssText =
				"position:fixed; bottom:50px; right:50px; width:300px; height:400px; background:rgba(0,0,0,0.90); color: var(--text-primary); font-family:monospace; border-radius:8px; z-index:10000000; display:flex; flex-direction:column; user-select:none; overflow:hidden;";
			document.body.appendChild(chat);

			// Rainbow Border Animation
			const style = document.createElement("style");
			style.id = "rainbowGlowStyle";
			style.innerHTML = `
            #globalChatContainer{
                position:relative;
                border-radius:8px;
                border:4px solid;
                padding:2px;
                background-clip:padding-wrapper;
                animation: rainbowBorder 6s linear infinite, rainbowGlow 6s ease-in-out infinite alternate;
                border-image-slice:1;
            }
            @keyframes rainbowBorder{
                0%{border-image-source:linear-gradient(90deg, red,orange,yellow,green,blue,purple);}
                20%{border-image-source:linear-gradient(90deg, orange,yellow,green,blue,purple,red);}
                40%{border-image-source:linear-gradient(90deg, yellow,green,blue,purple,red,orange);}
                60%{border-image-source:linear-gradient(90deg, green,blue,purple,red,orange,yellow);}
                80%{border-image-source:linear-gradient(90deg, blue,purple,red,orange,yellow,green);}
                100%{border-image-source:linear-gradient(90deg, red,orange,yellow,green,blue,purple);}
            }
            @keyframes rainbowGlow{
                0%{box-shadow:0 0 10px red,0 0 20px red;}
                16%{box-shadow:0 0 15px orange,0 0 30px orange;}
                33%{box-shadow:0 0 20px yellow,0 0 40px yellow;}
                50%{box-shadow:0 0 25px green,0 0 50px green;}
                66%{box-shadow:0 0 30px blue,0 0 60px blue;}
                83%{box-shadow:0 0 25px purple,0 0 50px purple;}
                100%{box-shadow:0 0 10px red,0 0 20px red;}
            }
        `;
			document.head.appendChild(style);

			// Messages and Input
			const messagesDiv = document.createElement("div");
			messagesDiv.style.cssText = `
    flex: 1;
    overflow-y: scroll; /* keep scrollable */
    padding: 5px;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
`;
			chat.appendChild(messagesDiv);

			const inputRow = document.createElement("div");
			inputRow.style.cssText =
				"display:flex;align-items:center;gap:6px;padding:5px;background:black;";
			chat.appendChild(inputRow);

			const input = document.createElement("input");
			input.type = "text";
			input.maxLength = MAX_MESSAGE_LENGTH;
			input.placeholder = "Type a message...";
			input.style.cssText =
				"flex:1;border:none;outline:none;padding:5px;background:black;color: var(--text-primary);";
			inputRow.appendChild(input);

			async function uploadToCloudinary(file) {
				const formData = new FormData();
				formData.append("file", file);
				formData.append("upload_preset", "files_preset");
				const cloudName = "dmxq5bvyq";

				const res = await fetch(
					`https://api.cloudinary.com/v1_1/${cloudName}/upload`,
					{
						method: "POST",
						body: formData,
					},
				);

				if (!res.ok) throw new Error("Upload failed: " + res.statusText);

				return await res.json();
			}

			const uploadBtn = document.createElement("button");
			uploadBtn.textContent = "📁";
			uploadBtn.style.cssText =
				"padding:0 2px;background:transparent;color: var(--text-primary);border:none;cursor:pointer;font-size:18px;line-height:1;";
			inputRow.appendChild(uploadBtn);

			uploadBtn.onclick = () => {
				const fileInput = document.createElement("input");
				fileInput.type = "file";
				fileInput.accept = "image/*,video/*,audio/*,.gif";

				fileInput.onchange = async () => {
					const file = fileInput.files[0];
					if (!file) return;

					if (file.size > 50 * 1024 * 1024) {
						alert("File too large! Maximum size is 50MB.");
						return;
					}
					const allowedTypes = [
						"image/jpeg",
						"image/png",
						"image/gif",
						"video/mp4",
						"video/webm",
						"audio/mp3",
						"audio/mpeg",
					];
					if (!allowedTypes.includes(file.type)) {
						alert("Unsupported file type.");
						return;
					}

					try {
						const result = await uploadToCloudinary(file);

						await db.ref("media").push({
							uid: user.uid,
							username,
							fileUrl: result.secure_url,
							fileType: file.type,
							timestamp: Date.now(),
						});
					} catch (err) {
						console.error("Upload failed:", err);
						alert("Upload failed. Check console.");
					}
				};
				fileInput.click();
			};

			// Close button
			const closeBtn = document.createElement("div");
			closeBtn.innerText = "✖";
			closeBtn.style.cssText =
				"position:absolute; top:5px; right:5px; cursor:pointer; font-weight:bold; font-size:16px; z-index:10000002;";
			chat.appendChild(closeBtn);

			// Resize handle
			const resizeHandle = document.createElement("div");
			resizeHandle.style.cssText =
				"width:10px; height:10px; background:#00ff00; position:absolute; bottom:2px; right:2px; cursor:se-resize; z-index:10000003;";
			chat.appendChild(resizeHandle);
			resizeHandle.addEventListener("mousedown", (e) => {
				e.preventDefault();
				const startWidth = chat.offsetWidth,
					startHeight = chat.offsetHeight;
				const startX = e.clientX,
					startY = e.clientY;
				function move(e) {
					chat.style.width = startWidth + (e.clientX - startX) + "px";
					chat.style.height = startHeight + (e.clientY - startY) + "px";
				}
				function up() {
					document.removeEventListener("mousemove", move);
					document.removeEventListener("mouseup", up);
				}
				document.addEventListener("mousemove", move);
				document.addEventListener("mouseup", up);
			});

			// Dragging
			function makeDraggable(g, ignore = []) {
				g.addEventListener("mousedown", (e) => {
					if (ignore.some((el) => el.contains(e.target))) return;
					let ox = e.clientX - g.getBoundingClientRect().left;
					let oy = e.clientY - g.getBoundingClientRect().top;
					function move(e) {
						let x = e.clientX - ox;
						let y = e.clientY - oy;
						x = Math.max(0, Math.min(window.innerWidth - g.offsetWidth, x));
						y = Math.max(0, Math.min(window.innerHeight - g.offsetHeight, y));
						g.style.left = x + "px";
						g.style.top = y + "px";
						g.style.right = "auto";
						g.style.bottom = "auto";
					}
					function up() {
						document.removeEventListener("mousemove", move);
						document.removeEventListener("mouseup", up);
					}
					document.addEventListener("mousemove", move);
					document.addEventListener("mouseup", up);
				});
			}
			makeDraggable(chat, [resizeHandle]);

			// ---------- Firebase Messaging ----------
			function getUserColor(user) {
				if (user.toLowerCase() === username.toLowerCase()) return "#00ff00";
				const colors = [
					"#00ffff",
					"#ffff00",
					"#ff00ff",
					"#ff4500",
					"#1e90ff",
					"#FF0000",
					"#ff1493",
					"#7fff00",
					"#FF5F1F",
					"#7FFFD4",
					"#8B0000",
				];
				let hash = 0;
				for (let i = 0; i < user.length; i++)
					hash = user.charCodeAt(i) + ((hash << 5) - hash);
				return colors[Math.abs(hash) % colors.length];
			}
			function sortMessagesByTimestamp() {
				const nodes = Array.from(messagesDiv.children);
				nodes
					.sort(
						(a, b) =>
							Number(a.dataset.timestamp || 0) -
							Number(b.dataset.timestamp || 0),
					)
					.forEach((node) => messagesDiv.appendChild(node));
			}

			function displayMedia(data, messageId) {
				const msgDiv = document.createElement("div");
				msgDiv.style.marginBottom = "8px";
				msgDiv.dataset.timestamp = String(data.timestamp || 0);

				const mediaFrameStyle =
					"display:block;margin-top:6px;max-width:220px;border:1px solid rgba(0,255,0,0.4);border-radius:12px;overflow:hidden;background:rgba(0,0,0,0.25);box-shadow:0 6px 16px rgba(0,0,0,0.35);";
				const time = new Date(data.timestamp).toLocaleTimeString([], {
					hour: "numeric",
					minute: "2-digit",
				});
				const timeSpan = document.createElement("span");
				timeSpan.style.color = "#888";
				timeSpan.style.opacity = "0.6";
				timeSpan.style.marginRight = "6px";
				timeSpan.style.fontSize = "0.8em";
				timeSpan.textContent = time;
				msgDiv.appendChild(timeSpan);

				const userSpan = document.createElement("span");
				userSpan.style.color = getUserColor(data.username);
				userSpan.textContent = data.username + ": ";
				msgDiv.appendChild(userSpan);

				let mediaEl;
				if (data.fileType.startsWith("image/")) {
					mediaEl = document.createElement("img");
					mediaEl.style.maxWidth = "200px";
					mediaEl.style.display = "block";
					mediaEl.style.marginTop = "4px";
				} else if (data.fileType.startsWith("video/")) {
					mediaEl = document.createElement("video");
					mediaEl.controls = true;
					mediaEl.style.maxWidth = "200px";
					mediaEl.style.display = "block";
					mediaEl.style.marginTop = "4px";
				} else if (data.fileType.startsWith("audio/")) {
					mediaEl = document.createElement("audio");
					mediaEl.controls = true;
					mediaEl.style.display = "block";
					mediaEl.style.marginTop = "4px";
				} else {
					mediaEl = document.createElement("a");
					mediaEl.href = data.fileUrl;
					mediaEl.textContent = "Download file";
					mediaEl.target = "_blank";
					mediaEl.style.display = "block";
					mediaEl.style.marginTop = "4px";
				}

				mediaEl.src = data.fileUrl;
				msgDiv.appendChild(mediaEl);

				addAdminActions(msgDiv, {
					collection: "media",
					messageId,
					data,
					isMedia: true,
				});

				messagesDiv.appendChild(msgDiv);
				sortMessagesByTimestamp();

				requestAnimationFrame(() => {
					messagesDiv.scrollTop = messagesDiv.scrollHeight;
				});
			}

			function appendMessage(data) {
				if (
					!isValidUsername(data.username) ||
					!isValidMessageText(data.text) ||
					!isValidTimestamp(data.timestamp)
				)
					return;

				const msgDiv = document.createElement("div");
				msgDiv.style.position = "relative";
				msgDiv.dataset.timestamp = String(data.timestamp || 0);
				msgDiv.style.marginBottom = "10px";
				msgDiv.style.wordWrap = "break-word";
				msgDiv.style.whiteSpace = "normal";

				const headerDiv = document.createElement("div");
				headerDiv.style.display = "flex";
				headerDiv.style.alignItems = "center";
				headerDiv.style.gap = "10px";

				const timeSpan = document.createElement("span");
				timeSpan.style.color = "#888";
				timeSpan.style.opacity = "0.6";
				timeSpan.style.fontSize = "0.8em";
				timeSpan.textContent = new Date(data.timestamp).toLocaleTimeString([], {
					hour: "numeric",
					minute: "2-digit",
				});

				const userSpan = document.createElement("span");
				userSpan.style.color = getUserColor(data.username);
				userSpan.style.fontWeight = "bold";
				userSpan.textContent = data.username + ":";

				headerDiv.appendChild(timeSpan);
				headerDiv.appendChild(userSpan);
				msgDiv.appendChild(headerDiv);

				const textDiv = document.createElement("div");
				textDiv.style.color = getUserColor(data.username);
				textDiv.style.whiteSpace = "normal";
				textDiv.style.wordBreak = "break-word";
				textDiv.style.marginTop = "2px";
				textDiv.textContent = data.text;

				msgDiv.appendChild(textDiv);

				addAdminActions(msgDiv, {
					collection: "messages",
					messageId: data.id,
					data,
					isMedia: false,
				});

				messagesDiv.appendChild(msgDiv);
				sortMessagesByTimestamp();

				requestAnimationFrame(() => {
					messagesDiv.scrollTop = messagesDiv.scrollHeight;
				});
			}
			const mediaRef = db.ref("media").limitToLast(50);
			const mediaDomMap = new Map();
			const messageDomMap = new Map();

			function createAdminActionsMenu(onEdit, onDelete) {
				const wrapper = document.createElement("div");
				wrapper.style.cssText =
					"position:absolute;top:-12px;right:0;display:flex;align-items:center;z-index:2;";

				const mark = document.createElement("span");
				mark.textContent = "✦";
				mark.title = "delete or edit";
				mark.style.cssText =
					"font-size:10px;color:#00ff00;cursor:pointer;user-select:none;line-height:1;";

				const menu = document.createElement("div");
				menu.style.cssText =
					"display:none;gap:4px;margin-left:6px;background: var(--bg-primary);border: 1px solid var(--border-color);border-radius:4px;padding:2px;";

				const editBtn = document.createElement("button");
				editBtn.textContent = "edit";
				editBtn.style.cssText =
					"background:transparent;border:none;color: var(--text-primary);cursor:pointer;font-size:11px;padding:0 2px;";
				editBtn.onclick = onEdit;

				const deleteBtn = document.createElement("button");
				deleteBtn.textContent = "delete";
				deleteBtn.style.cssText =
					"background:transparent;border:none;color:#f55;cursor:pointer;font-size:11px;padding:0 2px;";
				deleteBtn.onclick = onDelete;

				menu.appendChild(editBtn);
				menu.appendChild(deleteBtn);

				wrapper.addEventListener("mouseenter", () => {
					menu.style.display = "flex";
				});
				wrapper.addEventListener("mouseleave", () => {
					menu.style.display = "none";
				});

				wrapper.appendChild(mark);
				wrapper.appendChild(menu);
				return wrapper;
			}

			function addAdminActions(
				container,
				{ collection, messageId, data, isMedia },
			) {
				if (!isAdmin || !messageId) return;
				container.style.position = "relative";

				const actionsMenu = createAdminActionsMenu(
					async () => {
						try {
							if (isMedia) {
								const nextUrl = prompt("Edit media URL", data.fileUrl || "");
								if (!nextUrl || nextUrl === data.fileUrl) return;
								await db.ref(`${collection}/${messageId}`).update({
									fileUrl: sanitizeInput(nextUrl),
								});
							} else {
								const nextText = prompt("Edit message", data.text || "");
								if (!nextText || nextText === data.text) return;
								const cleanText = sanitizeInput(nextText);
								if (!isValidMessageText(cleanText)) {
									alert(`Message must be 1-${MAX_MESSAGE_LENGTH} characters.`);
									return;
								}
								const matched = detectBadWord(cleanText, normalizedBlacklist);
								if (matched) {
									alert("Edited message contains inappropriate language.");
									return;
								}
								await db.ref(`${collection}/${messageId}`).update({
									text: cleanText,
								});
							}
						} catch (err) {
							console.error("Edit failed:", err);
							alert(
								"Edit failed. Check your Firebase write rules for admin edits.",
							);
						}
					},
					async () => {
						if (!confirm("Delete this message?")) return;
						try {
							await db.ref(`${collection}/${messageId}`).remove();
						} catch (err) {
							console.error("Delete failed:", err);
							alert(
								"Delete failed. Check your Firebase write rules for admin deletes.",
							);
						}
					},
				);

				container.appendChild(actionsMenu);
			}

			mediaRef.on("child_added", (snapshot) => {
				const data = snapshot.val();
				if (!data || typeof data !== "object") return;
				displayMedia(data, snapshot.key);
				mediaDomMap.set(snapshot.key, messagesDiv.lastElementChild);
			});

			mediaRef.on("child_changed", (snapshot) => {
				const existing = mediaDomMap.get(snapshot.key);
				if (existing) existing.remove();
				const data = snapshot.val();
				if (!data || typeof data !== "object") return;
				displayMedia(data, snapshot.key);
				mediaDomMap.set(snapshot.key, messagesDiv.lastElementChild);
			});

			mediaRef.on("child_removed", (snapshot) => {
				const existing = mediaDomMap.get(snapshot.key);
				if (existing) existing.remove();
				mediaDomMap.delete(snapshot.key);
			});

			const messagesRef = db.ref("messages").limitToLast(50);

			// Listen for messages
			messagesRef.on("child_added", (snapshot) => {
				const data = snapshot.val();
				if (!data || typeof data !== "object") return;
				appendMessage({ ...data, id: snapshot.key });
				messageDomMap.set(snapshot.key, messagesDiv.lastElementChild);
			});

			messagesRef.on("child_changed", (snapshot) => {
				const existing = messageDomMap.get(snapshot.key);
				if (existing) existing.remove();
				const data = snapshot.val();
				if (!data || typeof data !== "object") return;
				appendMessage({ ...data, id: snapshot.key });
				messageDomMap.set(snapshot.key, messagesDiv.lastElementChild);
			});

			messagesRef.on("child_removed", (snapshot) => {
				const existing = messageDomMap.get(snapshot.key);
				if (existing) existing.remove();
				messageDomMap.delete(snapshot.key);
			});

			closeBtn.onclick = async () => {
   			 await withWarpLoader(async () => {
        			chat.remove();
   			 }, 500);

 			   const username = user?.displayName || username;
 			   if (!username) return;

  			  await showHomepage(username);
			};

			// Send messages
			input.addEventListener("keydown", (e) => {
				if (e.key === "Enter" && input.value.trim()) {
					const msg = sanitizeInput(input.value);
					if (!isValidMessageText(msg)) {
						alert(`Message must be 1-${MAX_MESSAGE_LENGTH} characters.`);
						input.value = "";
						return;
					}
					const matched = detectBadWord(msg, normalizedBlacklist);
					if (matched) {
						alert(
							"Your message contains inappropriate language and cannot be sent.",
						);
						input.value = "";
						return;
					}
					db.ref("messages").push({
						uid: user.uid,
						username,
						text: msg,
						timestamp: Date.now(),
					});
					input.value = "";
				}
			});
		}
	}
});

document.addEventListener("keydown", (e) => {
	const target = e.target;
	if (
		target.tagName === "INPUT" ||
		target.tagName === "TEXTAREA" ||
		target.isContentEditable
	)
		return;
	if (e.shiftKey && e.key.toLowerCase() === "b") {
		const chat = document.getElementById("globalChatContainer");
		if (!chat) return;
		chat.style.display = chat.style.display === "none" ? "flex" : "none";
	}
});

			// Stop All Utilities
			addBtn(util, "Stop All Utilities", () => {
				for (let key in activeUtilities) {
					if (activeUtilities[key].off) activeUtilities[key].off();
				}
			});
		})();

		// ---------- Tab Title & Favicon Controls ----------
		const vfxContainer = document.getElementById("vfxGUI");
		if (vfxContainer) {
			const controlsWrapper = document.createElement("div");
			controlsWrapper.style.cssText = `
position:absolute;
bottom:12px;
right:12px;
display:flex;
gap:8px;
align-items:center;

background:rgba(20,20,20,0.75);
backdrop-filter: blur(6px);

padding:8px 10px;
border-radius:10px;
border:1px solid rgba(255,255,255,0.08);

box-shadow:0 6px 16px rgba(0,0,0,0.4);

z-index:10000001;
font-family: system-ui, sans-serif;
`;

			// Hidden file input for favicon
			const faviconInput = document.createElement("input");
			faviconInput.type = "file";
			faviconInput.accept = "image/*";
			faviconInput.style.display = "none";
			faviconInput.addEventListener("change", () => {
				const file = faviconInput.files[0];
				if (!file) return;
				const url = URL.createObjectURL(file);

				// Find or create favicon <link>
				let link = document.querySelector("link[rel*='icon']");
				if (!link) {
					link = document.createElement("link");
					link.rel = "icon";
					document.head.appendChild(link);
				}
				link.href = url;
			});

			// Visible folder button
			const faviconBtn = document.createElement("button");
			faviconBtn.innerHTML = `
<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
<path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h-8l-2-4z"/>
</svg>
`;
			faviconBtn.style.cssText = `
display:flex;
align-items:center;
justify-content:center;

width:28px;
height:28px;

background:#2a2a2a;
border:1px solid #3a3a3a;
border-radius:6px;

cursor:pointer;
color:white;

font-size:16px;
padding:4px 6px;
cursor:pointer;

background:#2a2a2a;
border:1px solid #3a3a3a;
border-radius:6px;

color:white;

transition:all 0.15s ease;
`;

			faviconBtn.onmouseenter = () => {
				faviconBtn.style.background = "#3a3a3a";
				faviconBtn.style.transform = "scale(1.08)";
			};

			faviconBtn.onmouseleave = () => {
				faviconBtn.style.background = "#2a2a2a";
				faviconBtn.style.transform = "scale(1)";
			};
			faviconBtn.onclick = () => faviconInput.click();

			// Tab title input
			const titleInput = document.createElement("input");
			titleInput.type = "text";
			titleInput.placeholder = "Tab title";
			titleInput.style.cssText = `
width:120px;
font-size:12px;
padding:4px 6px;

background:#1e1e1e;
color:white;

border:1px solid #3a3a3a;
border-radius:6px;

outline:none;

transition:border 0.15s ease, box-shadow 0.15s ease;
`;
			titleInput.onfocus = () => {
				titleInput.style.border = "1px solid #4f8cff";
				titleInput.style.boxShadow = "0 0 4px rgba(79,140,255,0.6)";
			};

			titleInput.onblur = () => {
				titleInput.style.border = "1px solid #3a3a3a";
				titleInput.style.boxShadow = "none";
			};

			titleInput.addEventListener("input", () => {
				document.title = titleInput.value;
			});

			// Add everything
			controlsWrapper.appendChild(faviconBtn);
			controlsWrapper.appendChild(faviconInput);
			controlsWrapper.appendChild(titleInput);
			vfxContainer.appendChild(controlsWrapper);
		}

		// -------------------- FONT SIZE SLIDER --------------------
		(function () {
			const section = document.createElement("div");
			section.style.marginTop = "10px";
			section.style.padding = "8px";
			section.style.background = "#001f00";
			section.style.borderRadius = "10px";
			section.style.color = "#00ff00";
			section.innerHTML = `<b>Font Size</b><br>`;
			const slider = document.createElement("input");
			slider.type = "range";
			slider.min = "10";
			slider.max = "50";
			slider.value = "16";
			slider.style.width = "100%";
			slider.oninput = () => {
				document
					.querySelectorAll(
						"body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *)",
					)
					.forEach((el) => (el.style.fontSize = slider.value + "px"));
			};
			section.appendChild(slider);
			util.appendChild(section);
		})();

		/* -------------------- VFX Buttons -------------------- */
		// ---------- BUTTON CSS ----------
		if (!document.getElementById("hgui-grid-btn-styles")) {
			const s = document.createElement("style");
			s.id = "hgui-grid-btn-styles";
			s.textContent = `
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
    `;
			document.head.appendChild(s);
		}

		// ---------- addBtn helper ----------
		function addBtn(container, name, on, off) {
			const b = document.createElement("button");
			b.className = "hgui-btn";
			b.innerText = name;
			container.appendChild(b);

			requestAnimationFrame(() => {
				b.classList.add("btn--in");
			});

			let particleInterval;

			// Start emitting particles on hover
			b.addEventListener("mouseenter", () => {
				particleInterval = setInterval(() => {
					const p = document.createElement("div");
					p.className = "hgui-particle";
					b.appendChild(p);

					// Random start position inside the button
					const rect = b.getBoundingClientRect();
					const x0 = Math.random() * rect.width;
					const y0 = Math.random() * rect.height;
					p.style.left = `${x0}px`;
					p.style.top = `${y0}px`;

					// Random direction and distance
					const angle = Math.random() * Math.PI * 2;
					const distance = 20 + Math.random() * 10;

					// Trigger transition
					requestAnimationFrame(() => {
						p.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
						p.style.opacity = "0";
					});

					// Remove particle after transition
					setTimeout(() => p.remove(), 2000);
				}, 150); // emit particle every 150ms
			});

			// Stop emitting when mouse leaves
			b.addEventListener("mouseleave", () => {
				clearInterval(particleInterval);
			});

			b.addEventListener("click", on);

			if (off) {
				if (!window._hgui_activeUtilities) window._hgui_activeUtilities = {};
				window._hgui_activeUtilities[name] = { on, off };
			}
		}

		// ---------- Corrupted Virus ----------
		addBtn(vfx, "Corrupted Virus", () => {
			if (window.infectionActive) return;
			window.infectionActive = true;

			window.infectionArcCount = 0;
			const maxArcs = 200;
			window.corruptedElems = new Map();

			function createArc(x, y, angle, depth = 0) {
				if (!window.infectionActive || window.infectionArcCount >= maxArcs)
					return;
				window.infectionArcCount++;

				const arc = document.createElement("div");
				arc.style.position = "absolute";
				arc.style.left = "0";
				arc.style.top = "0";
				arc.style.width = "100%";
				arc.style.height = "100%";
				arc.style.pointerEvents = "none";
				arc.style.zIndex = 999999;

				let points = `${x},${y}`;
				let px = x,
					py = y;
				const segs = 6;

				for (let i = 0; i < segs; i++) {
					px += Math.cos(angle) * (15 + Math.random() * 10);
					py += Math.sin(angle) * (15 + Math.random() * 10);
					px += (Math.random() - 0.5) * 8;
					py += (Math.random() - 0.5) * 8;
					points += ` ${px},${py}`;
				}

				arc.innerHTML = `
            <svg style="position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;" xmlns="http://www.w3.org/2000/svg">
                <polyline class="main" points="${points}" stroke="white" stroke-width="2.5" fill="none" />
                <polyline class="ghost1" points="${points}" stroke="magenta" stroke-width="2" fill="none" opacity="0.6"/>
                <polyline class="ghost2" points="${points}" stroke="cyan" stroke-width="2" fill="none" opacity="0.6"/>
            </svg>
        `;
				document.body.appendChild(arc);

				const main = arc.querySelector(".main");
				const g1 = arc.querySelector(".ghost1");
				const g2 = arc.querySelector(".ghost2");

				let life = 0;
				const anim = setInterval(() => {
					if (!window.infectionActive) {
						clearInterval(anim);
						return;
					}
					const hue = (life * 50 + Math.random() * 120) % 360;
					const hue2 = (life * 80 + Math.random() * 180) % 360;
					const hue3 = (life * 60 + Math.random() * 200) % 360;
					main.setAttribute("stroke", `hsl(${hue},100%,60%)`);
					g1.setAttribute("stroke", `hsl(${hue2},100%,60%)`);
					g2.setAttribute("stroke", `hsl(${hue3},100%,60%)`);
					life++;
				}, 100);

				// --- Infect element with ongoing distortion ---
				const elem = document.elementFromPoint(px, py);
				if (elem && !isImmune(elem)) {
					if (!window.corruptedElems.has(elem)) {
						// Save original styles
						const orig = {
							filter: elem.style.filter,
							transform: elem.style.transform,
							textShadow: elem.style.textShadow,
						};

						let tick = 0;
						const corruptAnim = setInterval(() => {
							if (!window.infectionActive) {
								clearInterval(corruptAnim);
								return;
							}
							if (isImmune(elem)) return;
							const hue = (tick * 10) % 360;
							elem.style.filter = `hue-rotate(${hue}deg)`;
							elem.style.transform = `scale(${1 + Math.sin(tick / 10) * 0.1}) rotate(${(Math.random() - 0.5) * 5}deg) skew(${(Math.random() - 0.5) * 4}deg, ${(Math.random() - 0.5) * 4}deg)`;
							elem.style.textShadow = `0 0 5px hsl(${hue},100%,60%), 0 0 10px hsl(${(hue + 180) % 360},100%,60%)`;
							tick++;
						}, 120);

						window.corruptedElems.set(elem, {
							interval: corruptAnim,
							orig,
						});
					}
				}

				// --- branching ---
				if (
					depth < 12 &&
					window.infectionActive &&
					window.infectionArcCount < maxArcs
				) {
					setTimeout(
						() => {
							const bias = Math.PI / 4; // bottom-right
							const newAngle =
								angle * 0.7 +
								bias * 0.3 +
								((Math.random() - 0.5) * Math.PI) / 16;
							createArc(px, py, newAngle, depth + 1);
							if (Math.random() < 0.7) {
								createArc(
									px,
									py,
									newAngle + (Math.random() > 0.5 ? Math.PI / 6 : -Math.PI / 6),
									depth + 1,
								);
							}
						},
						500 + Math.random() * 400,
					);
				}
			}

			createArc(0, 0, Math.PI / 4);

			window.stopAllInfection = () => {
				window.infectionActive = false;
				window.infectionArcCount = 0;
				document.querySelectorAll("svg").forEach((el) => el.remove());

				// Restore corrupted elements
				window.corruptedElems.forEach(({ interval, orig }, elem) => {
					clearInterval(interval);
					elem.style.filter = orig.filter;
					elem.style.transform = orig.transform;
					elem.style.textShadow = orig.textShadow;
				});
				window.corruptedElems.clear();
			};
		});

		// ---------- Disintegrate Element ----------
		let disintegrateHandler = null;

		addBtn(vfx, "Disintegrate Element", () => {
			let active = vfx.dataset.disintegrateActive === "true";

			function disintegrateElement(el) {
				if (!el) return;

				const rect = el.getBoundingClientRect();
				const width = rect.width;
				const height = rect.height;

				el.remove();

				const chars = "123456789010abcdefghijklmnopqrstuvwxyz";

				const numParticles = Math.floor((width * height) / 150);
				for (let i = 0; i < numParticles; i++) {
					const particle = document.createElement("div");
					particle.textContent =
						chars[Math.floor(Math.random() * chars.length)];
					particle.style.position = "fixed";
					particle.style.zIndex = "999999";
					particle.style.left = rect.left + Math.random() * width + "px";
					particle.style.top = rect.top + Math.random() * height + "px";
					particle.style.fontSize = "12px";
					particle.style.fontFamily = "monospace";
					particle.style.color = "red";
					particle.style.pointerEvents = "none";
					particle.style.opacity = "1";
					particle.style.transition =
						"transform 3s ease-out, opacity 3s ease-out";
					document.body.appendChild(particle);

					const xMove = (Math.random() - 0.5) * 120;
					const yMove = -150 - Math.random() * 250;

					requestAnimationFrame(() => {
						particle.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${Math.random() * 360}deg)`;
						particle.style.opacity = "0";
					});

					// Remove particle after 3s
					setTimeout(() => particle.remove(), 3000);
				}
			}

			// Toggle mode
			if (active) {
				document.removeEventListener("click", disintegrateHandler, true);
				disintegrateHandler = null;
				vfx.dataset.disintegrateActive = "false";
				alert("Disintegration mode deactivated.");
			} else {
				disintegrateHandler = function (e) {
					if (window.isImmune(e.target)) return;
					e.preventDefault();
					e.stopPropagation();
					disintegrateElement(e.target);
				};

				document.addEventListener("click", disintegrateHandler, true);
				vfx.dataset.disintegrateActive = "true";
				alert("Disintegration mode activated. Click any element to delete it.");
			}
		});

		// Invert Media (Toggle)
		addBtn(vfx, "Invert Media", () => {
			if (window.invertimgActive) {
				// --- Deactivate ---
				if (window.invertimgStyle) window.invertimgStyle.remove();
				window.invertimgStyle = null;
				window.invertimgActive = false;
				return;
			}
			// --- Activate ---
			window.invertimgActive = true;
			window.invertimgStyle = document.createElement("style");
			window.invertimgStyle.textContent =
				"img,video,embed,object{filter:invert(100%) !important;}";
			document.body.appendChild(window.invertimgStyle);
		});

		// Censor Media (Toggle)
		addBtn(vfx, "Censor Media", () => {
			if (window.censorActive) {
				// --- Deactivate ---
				if (window.af) cancelAnimationFrame(window.af);
				if (window.censorStyle) window.censorStyle.remove();
				if (window.censors) for (var c of window.censors) c.remove();
				if (window.sensed)
					for (var e of window.sensed)
						e.parentElement.classList.remove("censor-parent");
				window.censors = [];
				window.sensed = [];
				window.censorActive = false;
				return;
			}

			// --- Activate ---
			window.censorActive = true;
			window.censorStyle = document.createElement("style");
			window.censorStyle.textContent = `
        .censor { opacity: 1 !important; image-rendering: pixelated !important; }
        .censor + img, .censor + video { visibility: hidden !important; }
        .censor-parent:hover .censor { display: none !important; }
        .censor-parent:hover .censor + img, 
        .censor-parent:hover .censor + video { visibility: visible !important; }
    `;
			document.body.appendChild(window.censorStyle);

			window.sensed = [];
			window.censors = [];
			let quality = 1.5;

			function onScreen(r) {
				return (
					r.right > 0 &&
					r.bottom > 0 &&
					r.left < innerWidth &&
					r.top < innerHeight
				);
			}

			function copyStyle(donor, recipient, sizeOnly) {
				var donorStyle = getComputedStyle(donor);
				var keys = Object.keys(donorStyle);
				if (sizeOnly) keys = ["width", "height"];
				for (var key of keys) recipient.style[key] = donorStyle[key];
			}

			function updateCensor(e, canvas) {
				var rect = e.getBoundingClientRect();
				if (onScreen(rect)) {
					var equalizer = Math.log2(Math.max(rect.width * rect.height, 2));
					canvas.width = (rect.width * quality) / equalizer;
					canvas.height = (rect.height * quality) / equalizer;
					if (window.af % 120 == 0) copyStyle(e, canvas, true);
					var context = canvas.getContext("2d");
					context.drawImage(e, 0, 0, canvas.width, canvas.height);
					e.parentElement.classList.add("censor-parent");
				}
			}

			function createCensor(e) {
				var rect = e.getBoundingClientRect();
				if (onScreen(rect)) {
					var canvas = document.createElement("canvas");
					canvas.className = "censor";
					var equalizer = Math.log2(Math.max(rect.width * rect.height, 2));
					canvas.width = (rect.width * quality) / equalizer;
					canvas.height = (rect.height * quality) / equalizer;
					copyStyle(e, canvas);
					var context = canvas.getContext("2d");
					context.drawImage(e, 0, 0, canvas.width, canvas.height);
					e.parentElement.insertBefore(canvas, e);
					e.parentElement.classList.add("censor-parent");
					return canvas;
				}
			}

			function sense() {
				var es = document.querySelectorAll("img,video");
				for (var e of es) {
					var i = window.sensed.indexOf(e);
					if (i >= 0) {
						if (e.tagName == "VIDEO" && !e.paused)
							updateCensor(e, window.censors[i]);
					} else {
						if (e.tagName == "VIDEO" || e.complete) {
							var c = createCensor(e);
							if (c) {
								window.censors.push(c);
								window.sensed.push(e);
							}
						}
					}
				}
				window.af = requestAnimationFrame(sense);
			}

			sense();
		});

		// Invert Area
		addBtn(vfx, "Invert Area", () => {
			// If active, turn off
			if (window.invertAreaActive) {
				if (window.invertAreaShield) window.invertAreaShield.remove();
				window.removeEventListener("mousedown", window.invertAreaHold);
				window.removeEventListener("touchstart", window.invertAreaHold);
				window.invertAreaActive = false;
				return;
			}

			// --- Activate ---
			window.invertAreaActive = true;

			let s, b, m0, m1;

			function shield() {
				s = document.createElement("div");
				s.style.position = "fixed";
				s.style.left = 0;
				s.style.top = 0;
				s.style.width = "100%";
				s.style.height = "100%";
				s.style.zIndex = 99999999; // high layer
				s.style.cursor = "crosshair";
				document.body.appendChild(s);
				window.invertAreaShield = s;
			}

			function box() {
				b = document.createElement("div");
				b.style.position = "absolute";
				b.style.left = m0.clientX + "px";
				b.style.top = m0.clientY + "px";
				b.style.width = 0;
				b.style.height = 0;
				b.style.outline = "2px dashed red";
				b.style.boxShadow = "inset 0 0 25px 2px white";
				b.style.mixBlendMode = "difference";
				s.appendChild(b);
			}

			function invert(e) {
				if (!e) return;
				b.remove();
				s.remove();
				window.invertAreaShield = null;
				e.style.filter = e.style.filter === "invert(1)" ? "" : "invert(1)";
			}

			function selection(f) {
				var x0 = Math.min(m0.clientX, m1.clientX);
				var x1 = Math.max(m0.clientX, m1.clientX);
				var y0 = Math.min(m0.clientY, m1.clientY);
				var y1 = Math.max(m0.clientY, m1.clientY);
				var dx = Math.max(1, (x1 - x0) / 10);
				var dy = Math.max(1, (y1 - y0) / 10);
				var elementsFromPoints = [];

				for (var x = x0; x <= x1; x += dx) {
					for (var y = y0; y <= y1; y += dy) {
						elementsFromPoints.push(document.elementsFromPoint(x, y));
					}
				}

				elementsFromPoints.sort((a, b) => a.length - b.length);
				var intersection = elementsFromPoints[0].filter(
					(e) =>
						e !== b &&
						e !== s &&
						elementsFromPoints.every((efp) => efp.includes(e)),
				);

				f(intersection[0]);
			}

			function pointer(e) {
				if (e.touches) {
					if (e.type === "touchmove") e.preventDefault();
					return e.touches[0] || e.changedTouches[0];
				}
				return e;
			}

			function release(e) {
				window.removeEventListener("mousemove", drag);
				window.removeEventListener("touchmove", drag);
				window.removeEventListener("mouseup", release);
				window.removeEventListener("touchend", release);
				m1 = pointer(e);
				selection(invert);
			}

			function drag(e) {
				var m = pointer(e);
				b.style.left = Math.min(m0.clientX, m.clientX) + "px";
				b.style.top = Math.min(m0.clientY, m.clientY) + "px";
				b.style.width = Math.abs(m.clientX - m0.clientX) + "px";
				b.style.height = Math.abs(m.clientY - m0.clientY) + "px";
			}

			function hold(e) {
				window.removeEventListener("mousedown", hold);
				window.removeEventListener("touchstart", hold);
				window.addEventListener("mousemove", drag);
				window.addEventListener("touchmove", drag, {
					passive: false,
				});
				window.addEventListener("mouseup", release);
				window.addEventListener("touchend", release);
				m0 = pointer(e);
				box();
			}

			function startInvertArea() {
				shield();
				window.invertAreaHold = hold;
				window.addEventListener("mousedown", hold);
				window.addEventListener("touchstart", hold);
			}

			startInvertArea();
		});

		// Disorient
		addBtn(vfx, "Disorient", () => {
			if (!window.disorientActive) {
				window.disorientActive = true;
				window.originalTransforms = [];

				// GUI immunity check
				const isImmune = (el) => window.isImmune(el);

				const prefixes = ["", "-ms-", "-webkit-", "-o-", "-moz-"];
				const elements = Array.from(document.querySelectorAll("*")); // all elements

				elements.forEach((el) => {
					// Skip immune elements or invisible ones
					const rect = el.getBoundingClientRect();
					if (isImmune(el) || rect.width === 0 || rect.height === 0) return;

					const style = window.getComputedStyle(el);
					const current = style.transform || "";
					window.originalTransforms.push({
						el,
						transform: current,
					});

					const deg = Math.random() * 361 - 180;
					prefixes.forEach((prefix) => {
						el.style[prefix + "transform"] = `${current} rotate(${deg}deg)`;
					});
				});
			} else {
				// Reset
				window.disorientActive = false;
				if (window.originalTransforms) {
					window.originalTransforms.forEach(({ el, transform }) => {
						const prefixes = ["", "-ms-", "-webkit-", "-o-", "-moz-"];
						prefixes.forEach((prefix) => {
							el.style[prefix + "transform"] = transform;
						});
					});
					window.originalTransforms = null;
				}
			}
		});

		// Random Link Redirects
		addBtn(vfx,"Random Link Redirects",() => {
				window.linkRedirectsInt = setInterval(() => {
					document.querySelectorAll("a").forEach((a) => {
						if (window.isImmune(a)) return;
						a.href = [
							"https://longdogechallenge.com/",
							"https://maze.toys/mazes/mini/daily/",
							"https://optical.toys/",
						][Math.floor(Math.random() * 3)];
					});
				}, 500);
			},
			() => {
				clearInterval(window.linkRedirectsInt);
			},
		);

		// 3D Page
		addBtn(vfx,"3D Page",() => {
				let s = document.createElement("script");
				s.src =
					"https://rawgit.com/Krazete/bookmarklets/master/tri.js?cacheBust=" +
					Date.now();
				document.body.appendChild(s);
				window.triScript = s;
			},
			() => {
				if (window.triScript) {
					window.triScript.remove();
					window.triScript = null;
				}
				// reset transforms to normal
				document.body.style.transform = "";
				document.body.style.perspective = "";
			},
		);

		// Explode Page
		addBtn(vfx,"Explode Page",() => {
				if (window.explodeActive) return;
				window.explodeActive = true;
				let o = document.createElement("div");
				o.style.cssText =
					"position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:#FF0000;font-size:50px;font-family:monospace;z-index:10000000;pointer-events:none;text-shadow:0 0 10px #FF0000;";
				document.body.appendChild(o);
				let c = 3;
				o.innerText = c;
				window.explodeInt = setInterval(() => {
					c--;
					if (c > 0) {
						o.innerText = c;
					} else {
						clearInterval(window.explodeInt);
						o.remove();
						document
							.querySelectorAll(
								"body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *)",
							)
							.forEach((e) => {
								e.style.transition = "transform 1s ease-out";
								let x = (Math.random() - 0.5) * 1000,
									y = (Math.random() - 0.5) * 1000,
									z = (Math.random() - 0.5) * 200;
								e.style.transform = `translate3d(${x}px,${y}px,${z}px) rotate(${Math.random() * 720 - 360}deg)`;
							});
						setTimeout(() => {
							document
								.querySelectorAll(
									"body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *)",
								)
								.forEach((e) => {
									e.style.transform = "";
									e.style.transition = "";
								});
							window.explodeActive = false;
						}, 1500);
					}
				}, 1000);
			},
			() => {
				clearInterval(window.explodeInt);
				window.explodeInt = null;
				window.explodeActive = false;
				document
					.querySelectorAll(
						"body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *)",
					)
					.forEach((e) => {
						e.style.transform = "";
						e.style.transition = "";
					});
			},
		);

		// Image Glitch
		addBtn(vfx,"Image Glitch",() => {
				if (window.imgGlitchInt) return;
				window.imgGlitchInt = setInterval(() => {
					document.querySelectorAll("img").forEach((e) => {
						if (window.isImmune(e)) return;
						e.style.position = "absolute";
						e.style.left = Math.random() * window.innerWidth + "px";
						e.style.top = Math.random() * window.innerHeight + "px";
					});
				}, 50);
			},
			() => {
				if (window.imgGlitchInt) {
					clearInterval(window.imgGlitchInt);
					window.imgGlitchInt = null;
					document.querySelectorAll("img").forEach((e) => {
						if (window.isImmune(e)) return;
						e.style.position = "";
						e.style.left = "";
						e.style.top = "";
					});
				}
			},
		);

		// Glitch
		addBtn(vfx,"Glitch",() => {
				if (window.glitchActive) return;
				window.glitchActive = true;
				window.glitchInt = setInterval(() => {
					document
						.querySelectorAll(
							"*:not(#mainGUI):not(#mainGUI *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)",
						)
						.forEach((e) => {
							e.style.backgroundColor = [
								"red",
								"orange",
								"yellow",
								"green",
								"blue",
								"purple",
								"pink",
							][Math.floor(Math.random() * 7)];
						});
				}, 25);
			},
			() => {
				if (window.glitchInt) {
					clearInterval(window.glitchInt);
					window.glitchInt = null;
				}
				window.glitchActive = false;

				document
					.querySelectorAll(
						"*:not(#mainGUI):not(#mainGUI *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)",
					)
					.forEach((e) => {
						e.style.backgroundColor = "";
					});
			},
		);

		// Smooth Disco
		addBtn(vfx,"Smooth Disco",() => {
				if (window.discoSmoothActive) return;
				window.discoSmoothActive = true;
				let colors = "red orange yellow green blue purple pink".split(" "),
					i = 0;
				window.discoSmoothInt = setInterval(() => {
					i = (i + 1) % colors.length;
					document
						.querySelectorAll(
							"*:not(#mainGUI):not(#mainGUI *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)",
						)
						.forEach((e) => {
							e.style.transition = "background-color 1s";
							e.style.backgroundColor = colors[i];
						});
				}, 1000);
			},
			() => {
				if (window.discoSmoothInt) {
					clearInterval(window.discoSmoothInt);
					window.discoSmoothInt = null;
				}
				window.discoSmoothActive = false;

				document
					.querySelectorAll(
						"*:not(#mainGUI):not(#mainGUI *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)",
					)
					.forEach((e) => {
						e.style.transition = "";
						e.style.backgroundColor = "";
					});
			},
		);

		// ---------- Text Corruption ----------
		addBtn(vfx,"Text Corruption",() => {
				const chatEl = document.getElementById("globalChatContainer");
				const isImmune = (el) =>
					chatEl && (el === chatEl || chatEl.contains(el));

				if (window.textCorruptStyle) return;

				// Create style element
				let s = document.createElement("style");
				s.id = "textCorruptStyle";
				s.innerHTML = `
        body { background:black !important; }
        body *:not(#globalChatContainer):not(#globalChatContainer *):not(#mainGUI):not(#mainGUI *) {
            color: green !important;
            font-family: Courier New, monospace !important;
            font-size: 16px !important;
            text-shadow: 1px 1px #FF0000 !important;
        }
        #mainGUI, #mainGUI * { animation:none !important; }
    `;
				document.head.appendChild(s);
				window.textCorruptStyle = s;

				// Cleanup function
				window._textCorruptCleanup = () => {
					if (window.textCorruptStyle) {
						window.textCorruptStyle.remove();
						window.textCorruptStyle = null;
					}
					window._textCorruptCleanup = null;
				};
			},
			() => {
				if (window._textCorruptCleanup) window._textCorruptCleanup();
			},
		);

		// ---------- Bubble Text ----------
		addBtn(vfx, "Bubble Text", () => {
			if (window.bubbleActive) return;
			window.bubbleActive = true;

			const chatEl = document.getElementById("globalChatContainer");
			const originalTextMap = new Map();

			const bubbleMap = {
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

			function transform(node) {
				if (!node) return;
				if (node.nodeType === Node.ELEMENT_NODE) {
					if (
						node === chatEl ||
						(node.closest && node.closest("#globalChatContainer,#mainGUI"))
					)
						return;
					node.childNodes.forEach(transform);
				} else if (node.nodeType === Node.TEXT_NODE) {
					if (!node.nodeValue.trim()) return;
					if (!originalTextMap.has(node))
						originalTextMap.set(node, node.nodeValue);
					node.nodeValue = node.nodeValue.replace(
						/[a-zA-Z0-9]/g,
						(ch) => bubbleMap[ch] || ch,
					);
				}
			}

			transform(document.body);

			// Cleanup
			const cleanup = () => {
				originalTextMap.forEach((orig, node) => {
					try {
						node.nodeValue = orig;
					} catch (e) {}
				});
				window.bubbleActive = false;
			};

			window._bubbleCleanup = cleanup;
			if (!window.stopAllVFX) window.stopAllVFX = [];
			window.stopAllVFX = window.stopAllVFX.filter((f) => f !== cleanup);
			window.stopAllVFX.push(cleanup);
		});

		// Page Spin
		addBtn(vfx,"Page Spin",() => {
				if (window.pageSpinActive) return;
				window.pageSpinActive = true;
				let s = document.createElement("style");
				s.id = "pageSpinStyle";
				s.innerHTML =
					"@keyframes roll{100%{transform:rotate(129600deg);}} body > *:not(#mainGUI):not(#vfxGUI):not(#utilitiesGUI){animation:roll 140s linear 360;} body > *:not(#mainGUI):not(#vfxGUI):not(#utilitiesGUI) *{animation:roll 140s linear 360;}";
				document.head.appendChild(s);
				window.pageSpinStyle = s;
			},
			() => {
				if (window.pageSpinStyle) {
					window.pageSpinStyle.remove();
					window.pageSpinStyle = null;
				}
				window.pageSpinActive = false;
			},
		);

		// Full chaos
		addBtn(vfx, "Full Chaos", () => {
			if (!window.fullChaosActive) {
				window.fullChaosActive = true;

				// Container just for chaos layers
				let chaosContainer = document.createElement("div");
				chaosContainer.id = "chaosContainer";
				chaosContainer.style.cssText = `
      position:fixed;
      top:0; left:0;
      width:100%; height:100%;
      pointer-events:none;
      z-index:99998; /* keep below GUIs */
    `;
				document.body.appendChild(chaosContainer);

				function randColor() {
					return "#" + Math.floor(16777215 * Math.random()).toString(16);
				}

				function rand(n) {
					return Math.floor(Math.random() * n) + 1;
				}

				// Build chaos bars
				let h = window.innerHeight;
				for (let i = 0; i < h; i++) {
					let bar = document.createElement("div");
					bar.id = "chaosBar" + i;
					bar.style.cssText = `
        width:100%; height:1px;
        background:${randColor()};
      `;
					chaosContainer.appendChild(bar);
				}

				// Loop effects
				window.fullChaosLoop1 = setInterval(() => {
					for (let e = 0; e < 10; e++) {
						let bar = document.getElementById("chaosBar" + rand(h));
						if (bar) {
							bar.style.backgroundColor = randColor();
							bar.style.height = rand(4) + "px";
						}
					}
					chaosContainer.style.backgroundColor = randColor();
					chaosContainer.style.transform =
						rand(256) > 128
							? `scale(3) rotate(${rand(35)}deg)`
							: "scale(1) rotate(0deg)";
					window.scrollTo(0, document.body.scrollHeight);
				}, 10);

				window.fullChaosLoop2 = setInterval(() => {
					window.scrollTo(0, 0);
				}, 50);

				// StopAll support
				if (!window.stopAllVFX) window.stopAllVFX = [];
				window.stopAllVFX.push(() => {
					clearInterval(window.fullChaosLoop1);
					clearInterval(window.fullChaosLoop2);
					let c = document.getElementById("chaosContainer");
					if (c) c.remove();
					window.fullChaosActive = false;
				});
			} else {
				clearInterval(window.fullChaosLoop1);
				clearInterval(window.fullChaosLoop2);
				let c = document.getElementById("chaosContainer");
				if (c) c.remove();
				window.fullChaosActive = false;
			}
		});

		// ---------- Stop All VFX ----------
		addBtn(vfx, "Stop All", () => {
			const isImmune = (el) => window.isImmune(el);
			if (window.stopAllVFX) {
				window.stopAllVFX.forEach((fn) => {
					try {
						fn();
					} catch (e) {}
				});
				window.stopAllVFX = [];
			}

			// ------------------ Stop Invert Media ------------------
			if (window.invertimgStyle)
				(window.invertimgStyle.remove(), (window.invertimgStyle = null));
			window.invertimgActive = false;

			// ------------------ Stop Censor Media ------------------
			if (window.af) cancelAnimationFrame(window.af);
			if (window.censorStyle) window.censorStyle.remove();
			if (window.censors)
				window.censors.forEach((c) => !isImmune(c) && c.remove());
			if (window.sensed)
				window.sensed.forEach(
					(e) =>
						!isImmune(e) && e.parentElement.classList.remove("censor-parent"),
				);
			window.censors = [];
			window.sensed = [];
			window.censorActive = false;

			// ------------------ Stop Invert Area ------------------
			if (window.invertAreaShield && !isImmune(window.invertAreaShield))
				window.invertAreaShield.remove();
			window.removeEventListener("mousedown", window.invertAreaHold);
			window.removeEventListener("touchstart", window.invertAreaHold);
			window.invertAreaActive = false;

			// ------------------ Stop Disorientation ------------------
			if (window.disorientActive) {
				window.disorientActive = false;
				if (window.originalTransforms) {
					window.originalTransforms.forEach(({ el, transform }) => {
						if (!isImmune(el)) {
							["", "-ms-", "-webkit-", "-o-", "-moz-"].forEach((prefix) => {
								el.style[prefix + "transform"] = transform;
							});
						}
					});
					window.originalTransforms = null;
				}
			}

			// ------------------ Stop Bubble Text ------------------
			if (window._bubbleCleanup) window._bubbleCleanup();
			window.bubbleActive = false;

			// ------------------ Stop Matrix Rain ------------------
			if (window.matrixInt)
				(clearInterval(window.matrixInt), (window.matrixInt = null));
			if (window.matrixCanvas && !isImmune(window.matrixCanvas))
				window.matrixCanvas.remove();
			window.matrixCanvas = null;
			window.matrixActive = false;

			// ------------------ Stop Glitch ------------------
			if (window.glitchInt) {
				clearInterval(window.glitchInt);
				window.glitchInt = null;
			}
			window.glitchActive = false;

			// Clear all non-GUI backgrounds
			document.querySelectorAll("body *").forEach((e) => {
				if (!isImmune(e)) e.style.backgroundColor = "";
			});

			// ------------------ Stop Smooth Disco ------------------
			if (window.discoSmoothInt) {
				clearInterval(window.discoSmoothInt);
				window.discoSmoothInt = null;
			}
			window.discoSmoothActive = false;

			// Clear disco background + transitions
			document.querySelectorAll("body *").forEach((e) => {
				if (!isImmune(e)) {
					e.style.transition = "";
					e.style.backgroundColor = "";
				}
			});

			// ------------------ Stop Full Chaos ------------------
			if (window.fullChaosLoop1)
				(clearInterval(window.fullChaosLoop1), (window.fullChaosLoop1 = null));
			if (window.fullChaosLoop2)
				(clearInterval(window.fullChaosLoop2), (window.fullChaosLoop2 = null));
			const chaos = document.getElementById("chaosContainer");
			if (chaos && !isImmune(chaos)) chaos.remove();
			window.fullChaosActive = false;

			// ------------------ Stop Page Spin ------------------
			if (window.pageSpinStyle)
				(window.pageSpinStyle.remove(), (window.pageSpinStyle = null));
			window.pageSpinActive = false;

			// ------------------ Stop Text Corruption ------------------
			if (window._textCorruptCleanup) window._textCorruptCleanup();

			// ------------------ Stop Image Glitch ------------------
			if (window.imgGlitchInt) {
				clearInterval(window.imgGlitchInt);
				window.imgGlitchInt = null;
				document.querySelectorAll("img").forEach((e) => {
					if (!isImmune(e)) {
						e.style.position = "";
						e.style.left = "";
						e.style.top = "";
					}
				});
			}

			// ------------------ Stop Infection Virus ------------------
			if (window.stopAllInfection) {
				try {
					window.stopAllInfection();
				} catch (e) {}
				window.stopAllInfection = null;
			}

			// ------------------ Reset page-wide inline styles (skip GUI) ------------------
			document.body.style.transform = "";
			document.body.style.backgroundColor = "";
			document.body.style.filter = "";

			document.querySelectorAll("body *").forEach((e) => {
				if (!isImmune(e)) {
					e.style.backgroundColor = "";
					e.style.height = "";
					e.style.transform = "";
					e.style.transition = "";
					e.style.color = "";
					e.style.fontSize = "";
					e.style.position = "";
					e.style.left = "";
					e.style.top = "";
					e.style.textShadow = "";
				}
			});

			// ------------------ Reset Utilities ------------------
			if (window.stats) {
				window.stats.dom.remove();
				window.stats = null;
			}
			if (window.erudaInstance) {
				window.erudaInstance.destroy();
				window.erudaInstance = null;
				window.erudaLoaded = false;
			}
			if (window.portaFrame) {
				window.portaFrame.remove();
				window.portaFrame = null;
			}
		});

		// -------------------- FONT COLOR SLIDER --------------------
		(function () {
			const section = document.createElement("div");
			section.style.marginTop = "10px";
			section.style.padding = "8px";
			section.style.background = "#001f00";
			section.style.borderRadius = "10px";
			section.style.color = "#00ff00";
			section.innerHTML = `<b>Text Color</b><br>`;
			const picker = document.createElement("input");
			picker.type = "color";
			picker.value = "#00ff00";
			picker.oninput = () => {
				document
					.querySelectorAll(
						"body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *)",
					)
					.forEach((el) => (el.style.color = picker.value));
			};
			section.appendChild(picker);
			vfx.appendChild(section);
		})();
		// -------------------- SHIFT+H TO HIDE --------------------
		document.addEventListener("keydown", (e) => {
			if (e.shiftKey && e.key.toLowerCase() === "h") {
				const gui = document.getElementById("mainGUI");
				if (gui) {
					gui.style.display = gui.style.display === "none" ? "block" : "none";
				}
			}
		});
	}
})();
