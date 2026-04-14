(function() {
    if (window.hackerLoaded) return;
    window.hackerLoaded = true;
    spawnGUIs();

    function spawnGUIs() {
        // -------------------- Multi Page GUI --------------------
        (function() {
            const gui = document.createElement("div");
            // -------------------- CSS Variables --------------------
            gui.style.setProperty("--gui-bg", "#000");
            gui.style.setProperty("--gui-border", "#00ff00");
            gui.style.setProperty("--gui-text", "#00ff00");
            gui.style.setProperty("--btn-bg", "#0a0a0a");
            gui.style.setProperty("--btn-hover-bg", "rgba(0,255,0,0.05)");
            gui.style.setProperty("--btn-hover-shadow", "inset 0 0 6px #00ff00, 0 0 8px #00ff00");
            // -------------------- Create Main GUI Page --------------------
            gui.id = "mainGUI";
            gui.style.cssText = `
    position: fixed;
    top: 50px; left: 50px;
    width: 340px;
    background: #000;
    border: 2px solid --gui-border;
    border-radius: 12px;
    color: --gui-bg;
    font-family: Consolas, monospace;
    box-shadow: 0 0 20px --btn-hover-bg;
    overflow: hidden;
    z-index: 9999999;
    cursor: move;
    user-select: none;
    transition: height 0.4s ease;
	backdrop-filter: blur(12px);
  	-webkit-backdrop-filter: blur(12px);
  	border-radius: 12px; 
  `;
            document.body.appendChild(gui);
            // Inner slider to hold both pages
            const slider = document.createElement("div");
            slider.style.cssText = `
    display: flex;
    width: 300%;
    transition: transform 0.5s ease;
  `;
            gui.appendChild(slider);
            // Button style
            const btnStyle = document.createElement("style");
            btnStyle.textContent = `
.guiBtn {
  background: var(--btn-bg);
  border: none;
  border-right: 1px solid var(--gui-border);
  border-bottom: 1px solid var(--gui-border);
  color: var(--gui-text);
  font-family: Consolas, monospace;
  font-size: 13px;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  width: 100%;
  transition: all 0.25s ease;
}
.guiBtn:hover {
  background: var(--btn-hover-bg);
  box-shadow: var(--btn-hover-shadow);
  transform: scale(1.02);
}
.guiBtn:active {
  transform: scale(0.97);
}
.btnGrid .guiBtn:nth-child(2n) {
  border-right: none;
}
.btnGrid .guiBtn:nth-last-child(-n+2) {
  border-bottom: none;
}`;
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
  border-bottom: 2px solid --gui-border;
  letter-spacing: 1px;
  text-shadow: 0 0 8px #00ff00;
  font-family: "Lucida Console", "Courier New", monospace;
`;
            gui.appendChild(masterTitle);
            slider.style.cssText = `
  display: flex;
  width: 300%;
  transition: transform 0.5s ease;
`;
            gui.appendChild(slider);
            // Create Utilities Page
            const util = document.createElement("div");
            util.id = "utilitiesGUI";
            util.style.cssText = `
  width: 33.3333%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
`;
            util.innerHTML = `
  <div style="text-align:center;font-weight:bold;margin-bottom:10px;color:var(--gui-text);">
    Utilities
  </div>
  <div class="btnGrid"></div>
`;
            slider.appendChild(util);
            // ---------- Tab Title & Favicon Controls on Utilities Page ----------
            const utilContainer = document.getElementById("utilitiesGUI");
            if (utilContainer) {
                const controlsWrapper = document.createElement("div");
                controlsWrapper.style.cssText = `
        position:absolute;
        bottom:10px;
        right:10px;
        width:200px;
        display:flex;
        flex-direction:column-reverse;
        gap:6px;

        background: rgba(34, 49, 34, 0.25);
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
    `;
                // Expand on hover
                controlsWrapper.addEventListener("mouseenter", () => {
                    controlsWrapper.style.maxHeight = "500px";
                    controlsWrapper.style.padding = "12px"
                });
                controlsWrapper.addEventListener("mouseleave", () => {
                    controlsWrapper.style.maxHeight = "30px";
                    controlsWrapper.style.padding = "6px"
                });
                // ---------- Header Bar ----------
                const header = document.createElement("div");
                header.textContent = "Tab Customizer";
                header.style.cssText = `
        font-size:13px;
        font-weight:600;
        opacity:0.9;
        border-top-left-radius:10px;
        border-top-right-radius:10px;
        border-bottom:1px solid rgba(255,255,255,0.1);
        padding:6px;
        text-align:center;
        cursor:default;
    `;
                controlsWrapper.appendChild(header);
                // ---------- Controls Container ----------
                const innerControls = document.createElement("div");
                innerControls.style.cssText = `
        display:flex;
        flex-direction:column;
        gap:6px;
    `;
                // ---------- Title Label & Input ----------
                const titleLabel = document.createElement("div");
                titleLabel.textContent = "Title";
                titleLabel.style.cssText = `font-size:11px; opacity:0.7;`;
                innerControls.appendChild(titleLabel);
                const titleInput = document.createElement("input");
                titleInput.type = "text";
                titleInput.placeholder = "Tab title";
                titleInput.style.cssText = `
        width:100%;
        font-size:12px;
        padding:6px 8px;
        background:#1e1e1e;
        color:white;
        border:1px solid #3a3a3a;
        border-radius:6px;
        outline:none;
        transition:all .15s ease;
    `;
                titleInput.onfocus = () => titleInput.style.border = "1px solid #4f8cff";
                titleInput.onblur = () => titleInput.style.border = "1px solid #3a3a3a";
                titleInput.addEventListener("input", () => document.title = titleInput.value);
                innerControls.appendChild(titleInput);
                // ---------- Favicon Label & Input ----------
                const faviconLabel = document.createElement("div");
                faviconLabel.textContent = "Favicon";
                faviconLabel.style.cssText = `font-size:11px; opacity:0.7;`;
                innerControls.appendChild(faviconLabel);
                const faviconInput = document.createElement("input");
                faviconInput.type = "file";
                faviconInput.accept = "image/*";
                faviconInput.style.display = "none";
                faviconInput.addEventListener("change", () => {
                    const file = faviconInput.files[0];
                    if (!file) return;
                    const url = URL.createObjectURL(file);
                    let link = document.querySelector("link[rel*='icon']");
                    if (!link) {
                        link = document.createElement("link");
                        link.rel = "icon";
                        document.head.appendChild(link)
                    }
                    link.href = url
                });
                const faviconBtn = document.createElement("button");
                faviconBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h-8l-2-4z"/>
        </svg>
        Upload Icon
    `;
                faviconBtn.style.cssText = `
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
    `;
                faviconBtn.onmouseenter = () => faviconBtn.style.background = "#363636";
                faviconBtn.onmouseleave = () => faviconBtn.style.background = "#2a2a2a";
                faviconBtn.onclick = () => faviconInput.click();
                innerControls.appendChild(faviconBtn);
                innerControls.appendChild(faviconInput);
                controlsWrapper.appendChild(innerControls);
                utilContainer.appendChild(controlsWrapper)
            }
            // Create VFX Page
            const vfx = document.createElement("div");
            vfx.id = "vfxGUI";
            vfx.style.cssText = `
  width: 33.3333%;
  padding: 10px;
  box-sizing: border-box;
`;
            vfx.innerHTML = `
  <div style="text-align:center;font-weight:bold;margin-bottom:10px;color:var(--gui-text);">
    Page Effects
  </div>
  <div class="btnGrid"></div>
`;
            slider.appendChild(vfx);
            // Create Themes Page
            const themes = document.createElement("div");
            themes.id = "themesGUI";
            themes.style.cssText = `
  width: 33.3333%;
  padding: 10px;
  box-sizing: border-box;
`;
            themes.innerHTML = `
  <div style="text-align:center;font-weight:bold;margin-bottom:10px;color:var(--gui-text);">
    Themes
  </div>
  <div class="btnGrid"></div>
`;
            slider.appendChild(themes);
            // --- Grid & Button Styling ---
            const style = document.createElement("style");
            style.textContent = `
.btnGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;

  border: 2px solid var(--gui-border);
  border-radius: 8px;

  overflow: hidden;
  background: var(--gui-bg);

  box-shadow: 0 0 12px var(--gui-border);
  transition: box-shadow 0.25s ease;
}

.btnGrid .guiBtn {
  background: var(--btn-bg);
  border: 1px solid var(--gui-border);
  color: var(--gui-text);
  font-family: Consolas, monospace;
  font-size: 13px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}
.btnGrid .guiBtn:hover {
  background: var(--btn-hover-bg);
  transform: scale(1.03);
  box-shadow: var(--btn-hover-shadow);
}
.btnGrid .guiBtn:active {
  background: var(--btn-hover-bg);
  transform: scale(0.98);
}
.btnGrid .themePreviewBtn {
  background: var(--preview-btn-bg);
  color: var(--preview-text);
  border-color: var(--preview-border);
  box-shadow: 0 0 8px var(--preview-shadow);
}
.btnGrid .themePreviewBtn:hover {
  background: var(--preview-btn-hover-bg);
  box-shadow: var(--preview-btn-hover-shadow);
}
.btnGrid .themePreviewBtn:active {
  background: var(--preview-btn-hover-bg);
}
.btnGrid .guiBtn:nth-child(odd) {
  border-right: 1px solid var(--gui-border);
}
.btnGrid .guiBtn:nth-child(n+3) {
  border-top: 1px solid var(--gui-border);
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
                return btn
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
            // -------------------- Themes --------------------
            const themeConfigs = {
                "default": {
                    guiBackground: "#000",
                    borderColor: "#00ff00",
                    textColor: "#00ff00",
                    shadowColor: "rgba(0,255,0,0.5)",
                    titleBackground: "rgba(0, 255, 0, 0.15)",
                    titleTextShadow: "0 0 8px #00ff00",
                    buttonBackground: "#0a0a0a",
                    buttonHoverBackground: "rgba(0,255,0,0.05)",
                    buttonHoverShadow: "inset 0 0 6px #00ff00, 0 0 8px #00ff00",
                    navColor: "#00ff00",
                    fcsBackground: "#001f00"
                },
                inverted: {
                    guiBackground: "#00ff00",
                    borderColor: "#000000",
                    textColor: "#000000",
                    shadowColor: "rgba(0,0,0,0.6)",
                    titleBackground: "rgba(0,0,0,0.18)",
                    titleTextShadow: "none",
                    buttonBackground: "#1aff1a",
                    buttonHoverBackground: "rgba(0,0,0,0.15)",
                    buttonHoverShadow: "inset 0 0 6px rgba(0,0,0,0.4), 0 0 10px rgba(0,0,0,0.45)",
                    navColor: "#000000",
                    fcsBackground: "#33ff33"
                },
                futuristic: {
                    guiBackground: "#05070d",
                    borderColor: "#00e5ff",
                    textColor: "#9bf6ff",
                    shadowColor: "rgba(0,229,255,0.5)",
                    titleBackground: "rgba(0,229,255,0.15)",
                    titleTextShadow: "0 0 12px #00e5ff",
                    buttonBackground: "#0b0f1a",
                    buttonHoverBackground: "rgba(0,229,255,0.12)",
                    buttonHoverShadow: "inset 0 0 8px rgba(0,229,255,0.7), 0 0 14px rgba(0,229,255,0.6)",
                    navColor: "#66f7ff",
                    fcsBackground: "#001a22"
                },
                light: {
                    guiBackground: "#f3f7fb",
                    borderColor: "#4E474B",
                    textColor: "#1c2733",
                    shadowColor: "rgba(58,111,143,0.18)",
                    titleBackground: "rgba(58,111,143,0.08)",
                    titleTextShadow: "0 0 6px rgba(58,111,143,0.25)",
                    buttonBackground: "#ffffff",
                    buttonHoverBackground: "rgba(58,111,143,0.12)",
                    buttonHoverShadow: "inset 0 0 5px rgba(58,111,143,0.20), 0 0 6px rgba(58,111,143,0.20)",
                    navColor: "#2c4e63"
                },
                dark: {
                    guiBackground: "#0b0f14",
                    borderColor: "#b1b8b4",
                    textColor: "#c6d6e2",
                    shadowColor: "rgba(58,111,143,0.28)",
                    titleBackground: "rgba(58,111,143,0.12)",
                    titleTextShadow: "0 0 8px rgba(58,111,143,0.45)",
                    buttonBackground: "#121820",
                    buttonHoverBackground: "rgba(58,111,143,0.10)",
                    buttonHoverShadow: "inset 0 0 5px rgba(58,111,143,0.35), 0 0 8px rgba(58,111,143,0.35)",
                    navColor: "#b8cbd8"
                },
                ocean: {
                    guiBackground: "#0a1f2e",
                    borderColor: "#1ca3ec",
                    textColor: "#cdefff",
                    shadowColor: "rgba(28,163,236,0.45)",
                    titleBackground: "rgba(28,163,236,0.18)",
                    titleTextShadow: "0 0 8px #1ca3ec",
                    buttonBackground: "#0f2c3d",
                    buttonHoverBackground: "rgba(28,163,236,0.15)",
                    buttonHoverShadow: "inset 0 0 6px rgba(28,163,236,0.5), 0 0 10px rgba(28,163,236,0.45)",
                    navColor: "#8ad8ff",
                    fcsBackground: "#061722"
                },
                forest: {
                    guiBackground: "#0b1a12",
                    borderColor: "#3fa34d",
                    textColor: "#b8f5c6",
                    shadowColor: "rgba(63,163,77,0.45)",
                    titleBackground: "rgba(63,163,77,0.18)",
                    titleTextShadow: "0 0 8px #3fa34d",
                    buttonBackground: "#12261a",
                    buttonHoverBackground: "rgba(63,163,77,0.12)",
                    buttonHoverShadow: "inset 0 0 6px rgba(63,163,77,0.5), 0 0 10px rgba(63,163,77,0.5)",
                    navColor: "#8be3a1"
                },
                ember: {
                    guiBackground: "#2b0f0f",
                    borderColor: "#ff7a3c",
                    textColor: "#ffd6b8",
                    shadowColor: "rgba(255,122,60,0.45)",
                    titleBackground: "rgba(255,122,60,0.18)",
                    titleTextShadow: "0 0 8px #ff7a3c",
                    buttonBackground: "#3a1616",
                    buttonHoverBackground: "rgba(255,122,60,0.15)",
                    buttonHoverShadow: "inset 0 0 6px rgba(255,122,60,0.5), 0 0 10px rgba(255,122,60,0.5)",
                    navColor: "#ffb07c"
                },
                dusk: {
                    guiBackground: "#1a1628",
                    borderColor: "#a970ff",
                    textColor: "#e3d6ff",
                    shadowColor: "rgba(169,112,255,0.4)",
                    titleBackground: "rgba(169,112,255,0.18)",
                    titleTextShadow: "0 0 10px #a970ff",
                    buttonBackground: "#231c36",
                    buttonHoverBackground: "rgba(169,112,255,0.15)",
                    buttonHoverShadow: "inset 0 0 6px rgba(169,112,255,0.5), 0 0 10px rgba(169,112,255,0.5)",
                    navColor: "#caa7ff"
                },
                dawn: {
                    guiBackground: "#fff4e6",
                    borderColor: "#ff9a5c",
                    textColor: "#5a3b1f",
                    shadowColor: "rgba(255,154,92,0.35)",
                    titleBackground: "rgba(255,154,92,0.18)",
                    titleTextShadow: "none",
                    buttonBackground: "#ffffff",
                    buttonHoverBackground: "rgba(255,154,92,0.18)",
                    buttonHoverShadow: "inset 0 0 6px rgba(255,154,92,0.35), 0 0 8px rgba(255,154,92,0.35)",
                    navColor: "#8a4f2a"
                },
                glass: {
                    guiBackground: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.35)",
                    textColor: "#ffffff",
                    shadowColor: "rgba(0,0,0,0.35)",
                    titleBackground: "rgba(255,255,255,0.12)",
                    titleTextShadow: "0 0 6px rgba(255,255,255,0.5)",
                    buttonBackground: "rgba(255,255,255,0.08)",
                    buttonHoverBackground: "rgba(255,255,255,0.18)",
                    buttonHoverShadow: "inset 0 0 6px rgba(255,255,255,0.4), 0 0 10px rgba(255,255,255,0.25)",
                    navColor: "#ffffff",
                    fcsBackground: "rgba(255,255,255,0.06)",
                    fontFamily: "inherit"
                },
                synthwave: {
                    guiBackground: "#0a001a",
                    borderColor: "#00fff9",
                    textColor: "#ff00ff",
                    shadowColor: "rgba(0,255,255,0.85)",
                    titleBackground: "rgb(127,17,224,0.35)",
                    titleTextShadow: "0 0 20px #ff00ff, 0 0 30px #00fff9, 0 0 50px #ff00ff",
                    buttonBackground: "#1a001a",
                    buttonHoverBackground: "rgba(255,0,255,0.25)",
                    buttonHoverShadow: "inset 0 0 10px rgba(0,255,255,1), 0 0 25px rgba(255,255,0,1), 0 0 40px #ff00ff",
                    navColor: "#ff33ff",
                    fcsBackground: "#000022"
                },
                cyberpunk: {
                    guiBackground: "#0a0c14",
                    borderColor: "#00ffe0",
                    textColor: "#f0ff4d",
                    shadowColor: "rgba(0,255,224,0.4)",
                    titleBackground: "linear-gradient(90deg, rgba(0,255,224,0.15), rgba(255,255,77,0.15))",
                    titleTextShadow: "0 0 5px #00ffe0, 0 0 10px #f0ff4d, 0 0 20px rgba(255,255,77,0.7)",
                    buttonBackground: "#11121a",
                    buttonHoverBackground: "linear-gradient(90deg, rgba(0,255,224,0.2), rgba(255,255,77,0.2))",
                    buttonHoverShadow: "inset 0 0 8px rgba(0,255,224,0.6), 0 0 12px rgba(255,255,77,0.7), 0 0 20px rgba(0,255,224,0.5)",
                    navColor: "linear-gradient(90deg, #00ffe0, #f0ff4d)"
                },

				Jamaica: {
    				guiBackground: 'url("https://www.transparenttextures.com/patterns/subtle-grunge.png"), radial-gradient(circle at 20% 30%, rgba(0,0,0,0.08) 1px, transparent 2px), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.06) 1px, transparent 2px), linear-gradient(to bottom, #d91f1f 0%, #f4d03f 50%, #0b8f3a 100%)',
    				borderColor: "#f4d03f",
    				textColor: "#fff8dc",
    				shadowColor: "rgba(244,208,63,0.7)",
    				titleBackground: "linear-gradient(90deg, #b22222 0%, #f4d03f 50%, #0b8f3a 100%)",
    				titleTextShadow: "0 0 6px rgba(244,208,63,0.8), 0 0 12px rgba(11,143,58,0.6)",
    				buttonBackground: "transparent",
    				buttonBorder: "3px solid #111",
    				buttonHoverBackground: "rgba(0,0,0,0.33)",
    				buttonHoverShadow: "0 0 10px rgba(255,255,0,0.6)",
    				navColor: "linear-gradient(90deg, #b22222, #f4d03f, #0b8f3a)"
				}
            };
            const applyTheme = themeName => {
                const theme = themeConfigs[themeName] || themeConfigs["default"];
                gui.style.setProperty("--gui-bg", theme.guiBackground);
                gui.style.setProperty("--gui-border", theme.borderColor);
                gui.style.setProperty("--gui-text", theme.textColor);
                gui.style.setProperty("--btn-bg", theme.buttonBackground);
                gui.style.setProperty("--btn-hover-bg", theme.buttonHoverBackground);
                gui.style.setProperty("--btn-hover-shadow", theme.buttonHoverShadow);
                gui.style.background = theme.guiBackground;
                gui.style.boxShadow = `0 0 20px ${theme.shadowColor}`;
                masterTitle.style.background = theme.titleBackground;
                masterTitle.style.color = theme.textColor;
                masterTitle.style.textShadow = theme.titleTextShadow;
                document.querySelectorAll("#prevPage, #nextPage").forEach(btn => {
                    btn.style.color = theme.navColor
                })
            };
            // Drag behavior
            let offsetX, offsetY, dragging = false;
            gui.addEventListener("mousedown", e => {
                if (e.target.tagName === "BUTTON") return;
                dragging = true;
                offsetX = e.clientX - gui.offsetLeft;
                offsetY = e.clientY - gui.offsetTop
            });
            document.addEventListener("mousemove", e => {
                if (dragging) {
                    gui.style.left = `${e.clientX-offsetX}px`;
                    gui.style.top = `${e.clientY-offsetY}px`
                }
            });
            document.addEventListener("mouseup", () => dragging = false);
            // Page switching
            let page = 0;
            const totalPages = 3;
            const pageStep = 100 / totalPages;
            const resizeToContent = () => {
                const pages = [util, vfx, themes];
                const activePage = pages[page] || util;
                const contentHeight = activePage.scrollHeight + masterTitle.offsetHeight + 26;
                gui.style.height = `${contentHeight}px`
            };
            const queueResize = () => requestAnimationFrame(resizeToContent);
            [util, vfx, themes].forEach(panel => {
                const observer = new MutationObserver(queueResize);
                observer.observe(panel.querySelector(".btnGrid"), {
                    childList: true,
                    subtree: true
                })
            });
            window.addEventListener("load", queueResize, {
                once: true
            });
            window.addEventListener("resize", queueResize);
            document.getElementById("prevPage").onclick = () => {
                page = Math.max(0, page - 1);
                slider.style.transform = `translateX(-${page*pageStep}%)`;
                resizeToContent()
            };
            document.getElementById("nextPage").onclick = () => {
                page = Math.min(totalPages - 1, page + 1);
                slider.style.transform = `translateX(-${page*pageStep}%)`;
                resizeToContent()
            };
            window.util = util.querySelector(".btnGrid");
            window.vfx = vfx.querySelector(".btnGrid");
            window.themes = themes.querySelector(".btnGrid");
            Object.keys(themeConfigs).forEach(themeName => {
                const displayName = themeName.charAt(0).toUpperCase() + themeName.slice(1);
                const theme = themeConfigs[themeName];
                const themeBtn = window.addBtn(themes, displayName, () => applyTheme(themeName));
                themeBtn.classList.add("themePreviewBtn");
                themeBtn.style.setProperty("--preview-btn-bg", theme.buttonBackground);
                themeBtn.style.setProperty("--preview-btn-hover-bg", theme.buttonHoverBackground || theme.buttonBackground);
                themeBtn.style.setProperty("--preview-btn-hover-shadow", theme.buttonHoverShadow || `0 0 8px ${theme.shadowColor}`);
                themeBtn.style.setProperty("--preview-border", theme.borderColor);
                themeBtn.style.setProperty("--preview-text", theme.textColor);
                themeBtn.style.setProperty("--preview-shadow", theme.shadowColor || theme.borderColor)
            });
            applyTheme("default");
            resizeToContent()
        })();
        // -------------------- IMMUNITY HELPER --------------------
        window.isImmune = function(el) {
            if (!el) return false;
            const protectedRoots = [document.getElementById("mainGUI"), document.getElementById("utilitiesGUI"), document.getElementById("vfxGUI"), document.getElementById("themesGUI")].filter(Boolean);
            return protectedRoots.some(root => el === root || el.nodeType === 1 && root.contains(el))
        };
        // ---------- UTILITIES BUTTONS ----------
        (function() {
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
    background: var(--gui-bg);
    border: 2px solid var(--gui-border);
    padding: 0;
    overflow: visible;
    box-shadow: 0 0 12px var(--gui-border);
}

.hgui-btn {
    background: var(--btn-bg);
    color: var(--gui-text);
    border: 1px solid var(--gui-border);
    margin: 0;
    padding: 8px;
    font-family: Consolas, monospace;
    font-size: 13px;
    text-align: center;
    cursor: pointer;

    transition:
        transform 220ms ease,
        opacity 220ms ease,
        box-shadow 300ms ease,
        border-color 300ms ease,
        background 300ms ease;
		
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
    border-color: var(--gui-border);
    background: var(--btn-hover-bg);
    box-shadow: var(--btn-hover-shadow);
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
    background: var(--gui-border);
    border-radius: 50%;
    pointer-events: none;
    opacity: 0.9;
    z-index: 20;
    transition:
        transform 2s linear,
        opacity 2s linear;
}
    `;
                document.head.appendChild(s)
            }
            // ---------- addBtn helper ----------
            function addBtn(container, name, on, off) {
                const b = document.createElement("button");
                b.className = "hgui-btn";
                b.innerText = name;
                container.appendChild(b);
                requestAnimationFrame(() => {
                    b.classList.add("btn--in")
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
                            p.style.transform = `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px)`;
                            p.style.opacity = "0"
                        });
                        // Remove particle after transition
                        setTimeout(() => p.remove(), 2e3)
                    }, 150); // emit particle every 150ms
                });
                // Stop emitting when mouse leaves
                b.addEventListener("mouseleave", () => {
                    clearInterval(particleInterval)
                });
                b.addEventListener("click", on);
                if (off) {
                    if (!window._hgui_activeUtilities) window._hgui_activeUtilities = {};
                    window._hgui_activeUtilities[name] = {
                        on: on,
                        off: off
                    }
                }
            }
            addBtn(util, "Embedded Browser", () => {
                const existingBrowser = document.getElementById("embeddedBrowserContainer");
                if (existingBrowser) {
                    if (existingBrowser.style.display === "none") {
                        existingBrowser.style.display = "block"
                    } else {
                        existingBrowser.style.display = "none"
                    }
                    return
                }
                javascript: (function() {
                    var e = document.getElementById("rusic-container");
                    if (e) e.remove();
                    var s = document.createElement("script");
                    s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
                    s.onload = function() {
                        init()
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
                        cl.onclick = function() {
                            c.remove()
                        };
                        h.insertBefore(cl, h.firstChild);
                        var tb = document.createElement("div");
                        tb.id = "rusic-toolbar";
                        tb.style.cssText = "display:flex;align-items:center;background:rgba(255,255,255,0.8);padding:5px;";
                        var backBtn = document.createElement("button");
                        backBtn.innerHTML = "←";
                        backBtn.style.cssText = "width:30px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;";
                        var fwdBtn = document.createElement("button");
                        fwdBtn.innerHTML = "→";
                        fwdBtn.style.cssText = "width:30px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;";
                        var inp = document.createElement("input");
                        inp.type = "text";
                        inp.placeholder = "Enter website URL or search...";
                        inp.style.cssText = "width:calc(100% - 160px);margin:5px;padding:5px;border:1px solid #ccc;font-size:14px;";
                        inp.id = "rusic-url-input";
                        var goBtn = document.createElement("button");
                        goBtn.innerHTML = "Go";
                        goBtn.style.cssText = "width:50px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;";
                        var fsBtn = document.createElement("button");
                        fsBtn.innerHTML = "⛶";
                        fsBtn.style.cssText = "width:30px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;margin-left:auto;";
                        fsBtn.onclick = function() {
                            if (c.classList.contains("fullscreen")) {
                                c.classList.remove("fullscreen");
                                c.style.top = "100px";
                                c.style.left = "100px";
                                c.style.width = "800px";
                                c.style.height = "600px"
                            } else {
                                c.classList.add("fullscreen");
                                c.style.top = "0";
                                c.style.left = "0";
                                c.style.width = "100vw";
                                c.style.height = "100vh"
                            }
                        };
                        var i = document.createElement("iframe");
                        i.style.cssText = "width:100%;height:calc(100% - 70px);border:none;";
                        i.id = "rusic-modal";
                        i.src = "https://blrublrbuerigieroklghlvyavmliarelhsmuazuka.realonesflow.infinityfreeapp.com/";
                        /* History system */
                        var historyArray = [],
                            currentIndex = -1;
                        backBtn.onclick = function() {
                            if (currentIndex > 0) {
                                currentIndex--;
                                loadNewURL(historyArray[currentIndex])
                            }
                        };
                        fwdBtn.onclick = function() {
                            if (currentIndex < historyArray.length - 1) {
                                currentIndex++;
                                loadNewURL(historyArray[currentIndex])
                            }
                        };
                        goBtn.onclick = function() {
                            var url = inp.value.trim();
                            if (!url.startsWith("http")) {
                                url = "https://duckduckgo.com/search?q=" + encodeURIComponent(url)
                            }
                            try {
                                new URL(url)
                            } catch (e) {
                                alert("Invalid URL.");
                                return
                            }
                            if (currentIndex < historyArray.length - 1) {
                                historyArray = historyArray.slice(0, currentIndex + 1)
                            }
                            historyArray.push(url);
                            currentIndex = historyArray.length - 1;
                            loadNewURL(url)
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
                        h.onmousedown = function(e) {
                            e.preventDefault();
                            p3 = e.clientX;
                            p4 = e.clientY;
                            document.onmouseup = stopDrag;
                            document.onmousemove = doDrag
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
                            newTop = Math.max(0, Math.min(window.innerHeight - c.offsetHeight, newTop));
                            newLeft = Math.max(0, Math.min(window.innerWidth - c.offsetWidth, newLeft));
                            c.style.top = newTop + "px";
                            c.style.left = newLeft + "px"
                        }

                        function stopDrag() {
                            document.onmouseup = null;
                            document.onmousemove = null
                        }
                        /* Resize observer to clamp size */
                        let resizeObserver = new ResizeObserver(() => {
                            /* Only shrink if the container would overflow the viewport */
                            let w = Math.min(c.offsetWidth, window.innerWidth - c.offsetLeft);
                            let h = Math.min(c.offsetHeight, window.innerHeight - c.offsetTop);
                            /* Only apply if smaller than current to prevent forced expansion */
                            if (w < c.offsetWidth) c.style.width = w + "px";
                            if (h < c.offsetHeight) c.style.height = h + "px"
                        });
                        resizeObserver.observe(c);
                        /* Animation loader */
                        function loadNewURL(u) {
                            gsap.to(c, {
                                duration: .5,
                                borderRadius: "50%",
                                scale: .9
                            });
                            setTimeout(function() {
                                i.src = u;
                                inp.value = u;
                                gsap.to(c, {
                                    duration: .5,
                                    borderRadius: "12px",
                                    scale: 1
                                })
                            }, 500)
                        }
                        let prevState = {
                            top: c.style.top,
                            left: c.style.left,
                            width: c.style.width,
                            height: c.style.height
                        };
                        /* Hide/Unhide with Shift + s */
                        document.addEventListener("keydown", e => {
                            if (e.shiftKey && e.key.toLowerCase() === "s" && !e.target.matches("input, textarea")) {
                                if (c.style.display === "none") {
                                    c.style.display = "block";
                                    resizeObserver.disconnect();
                                    c.style.top = prevState.top;
                                    c.style.left = prevState.left;
                                    c.style.width = prevState.width;
                                    c.style.height = prevState.height;
                                    c.style.transform = "scale(1)";
                                    c.style.borderRadius = "12px";
                                    resizeObserver.observe(c)
                                } else {
                                    prevState.top = c.style.top;
                                    prevState.left = c.style.left;
                                    prevState.width = c.style.width;
                                    prevState.height = c.style.height;
                                    c.style.display = "none"
                                }
                            }
                        });
                        /* Toggle topbar with Shift+F */
                        document.addEventListener("keydown", function(ev) {
                            if (ev.key.toLowerCase() === "f" && ev.shiftKey && !ev.target.matches("input, textarea")) {
                                let head = document.getElementById("rusic-header");
                                let tool = document.getElementById("rusic-toolbar");
                                let hidden = head.style.display === "none";
                                head.style.display = hidden ? "block" : "none";
                                tool.style.display = hidden ? "flex" : "none";
                                i.style.height = hidden ? "calc(100% - 70px)" : "100%"
                            }
                        })
                    }
                })()
            });
            addBtn(util, "iFrame launcher", () => {
                const rawInput = prompt("Enter URL (http/https)", "https://");
                if (!rawInput) return;
                let parsed;
                try {
                    parsed = new URL(rawInput.trim())
                } catch (e) {
                    alert("Invalid URL. Example: https://example.com");
                    return
                }
                if (!["http:", "https:"].includes(parsed.protocol)) {
                    alert("Only http/https URLs are allowed.");
                    return
                }
                const w = window.open("about:blank", "_blank");
                if (!w) {
                    alert("Popup blocked by browser. Please allow popups.");
                    return
                }
                const doc = w.document;
                doc.open();
                doc.write('<!DOCTYPE html><html><head><title>iFrame</title></head><body style="margin:0"></body></html>');
                doc.close();
                const iframe = doc.createElement("iframe");
                iframe.src = parsed.href;
                iframe.style.cssText = "border:none;width:100vw;height:100vh;";
                iframe.setAttribute("referrerpolicy", "no-referrer");
                doc.body.appendChild(iframe)
            });
            // Developer Console (Eruda)
            addBtn(util, "Developer Console", () => {
                if (!window.erudaLoaded) {
                    let s = document.createElement("script");
                    s.src = "https://cdn.jsdelivr.net/npm/eruda@2.5.0/eruda.min.js";
                    document.body.appendChild(s);
                    s.onload = () => {
                        eruda.init();
                        eruda.theme = "Dark";
                        window.erudaInstance = eruda;
                        window.erudaLoaded = true
                    };
                    window.erudaScript = s
                } else {
                    window.erudaInstance.show()
                }
            }, () => {
                // off function for Stop All
                if (window.erudaInstance) {
                    window.erudaInstance.destroy();
                    window.erudaInstance = null;
                    window.erudaLoaded = false
                }
                if (window.erudaScript) {
                    window.erudaScript.remove();
                    window.erudaScript = null
                }
            });
            // Invert Page
            addBtn(util, "Invert Page", () => {
                document.body.style.filter = "invert(1)"
            }, () => {
                document.body.style.filter = ""
            });
            // Calculator
            addBtn(util, "Calculator", () => {
                const isSafeExpression = value => /^[0-9+\-*/().%\s]+$/.test(value);
                const computeSafeMath = expr => {
                    const tokens = expr.match(/\d*\.?\d+|[()+\-*/%]/g) || [];
                    const prec = {
                        "+": 1,
                        "-": 1,
                        "*": 2,
                        "/": 2,
                        "%": 2
                    };
                    const output = [];
                    const ops = [];
                    tokens.forEach(token => {
                        if (/^\d*\.?\d+$/.test(token)) {
                            output.push(Number(token));
                            return
                        }
                        if (token === "(") {
                            ops.push(token);
                            return
                        }
                        if (token === ")") {
                            while (ops.length && ops[ops.length - 1] !== "(") {
                                output.push(ops.pop())
                            }
                            if (ops[ops.length - 1] === "(") ops.pop();
                            return
                        }
                        while (ops.length && prec[ops[ops.length - 1]] >= prec[token]) {
                            output.push(ops.pop())
                        }
                        ops.push(token)
                    });
                    while (ops.length) output.push(ops.pop());
                    const stack = [];
                    output.forEach(token => {
                        if (typeof token === "number") {
                            stack.push(token);
                            return
                        }
                        const b = stack.pop();
                        const a = stack.pop();
                        if (a === undefined || b === undefined) throw new Error("Malformed expression");
                        if (token === "+") stack.push(a + b);
                        else if (token === "-") stack.push(a - b);
                        else if (token === "*") stack.push(a * b);
                        else if (token === "/") stack.push(a / b);
                        else if (token === "%") stack.push(a % b)
                    });
                    if (stack.length !== 1 || Number.isNaN(stack[0])) throw new Error("Malformed expression");
                    return stack[0]
                };
                let input;
                while (input = prompt("Expression (numbers + + - * / % parentheses):", "")) {
                    try {
                        const expr = input.trim();
                        if (!isSafeExpression(expr)) {
                            alert("Only numeric math expressions are allowed.");
                            continue
                        }
                        alert(computeSafeMath(expr))
                    } catch (e) {
                        alert(e.message || String(e))
                    }
                }
            });
            // DNS Lookup
            addBtn(util, "DNS Lookup", () => {
                window.open("https://mxtoolbox.com/SuperTool.aspx?action=a:" + window.location.hostname, "_blank")
            });
            // FPS Counter
            addBtn(util, "FPS Counter", () => {
                if (!window.stats) {
                    let s = document.createElement("script");
                    s.src = "https://mrdoob.github.io/stats.js/build/stats.min.js";
                    s.onload = () => {
                        window.stats = new Stats;
                        document.body.appendChild(window.stats.dom);
                        requestAnimationFrame(function loop() {
                            window.stats.update();
                            requestAnimationFrame(loop)
                        })
                    };
                    document.head.appendChild(s)
                }
            }, () => {
                if (window.stats) {
                    window.stats.dom.remove();
                    window.stats = null
                }
            });
            // History Flooder
            addBtn(util, "History Flooder", () => {
                let n = parseInt(prompt("Flood amount:"));
                for (let i = 0; i < n; i++) {
                    history.pushState(0, 0, i == n - 1 ? window.location.href : i.toString())
                }
            });
            // IP Finder
            addBtn(util, "IP Lookup", () => {
                let ip = prompt("Enter IP:");
                if (ip) {
                    ["https://talosintelligence.com/reputation_center/lookup?search=", "https://www.virustotal.com/gui/ip-address/", "https://otx.alienvault.com/browse/global?section=All&q=", "https://censys.io/ipv4/", "https://www.shodan.io/search?query=", "https://www.abuseipdb.com/check/"].forEach(u => window.open(u + ip, "_blank"))
                }
            });
            // Password Looker
            addBtn(util, "Password Looker", () => {
                document.querySelectorAll("input[type=password]").forEach(i => {
                    if (!i.dataset.originalType) i.dataset.originalType = i.type;
                    i.type = "text"
                })
            }, () => {
                document.querySelectorAll("input[type=text]").forEach(i => {
                    if (i.dataset.originalType) i.type = i.dataset.originalType
                })
            });
            // Porta Proxy
            addBtn(util, "Porta Proxy", () => {
                let f = document.createElement("iframe");
                f.src = prompt("Enter URL:");
                Object.assign(f.style, {
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 9999
                });
                document.body.appendChild(f);
                window.portaFrame = f
            }, () => {
                if (window.portaFrame) {
                    window.portaFrame.remove();
                    window.portaFrame = null
                }
            });
            // Page Killer
            addBtn(util, "Page Killer", () => {
                const e = document.querySelectorAll("div.head-top, div.wonderbar");
                e.forEach(function(t) {
                    t.remove()
                });
                const a = document.querySelectorAll("button.slick-prev.slick-arrow.slick-disabled, button.slick-next.slick-arrow.slick, button.slick-prev.slick-arrow, button.slick-next.slick-arrow.slick-disabled"),
                    i = document.createElement("iframe");
                i.style.position = "fixed", i.style.top = "0", i.style.left = "0", i.style.width = "100%", i.style.height = "100%", i.style.border = "none", i.style.backgroundColor = "white", document.body.appendChild(i);
                const b = document.createElement("button");
                b.style.position = "fixed", b.style.top = "50%", b.style.left = "50%", b.style.transform = "translate(-50%, -50%)", b.style.width = "800px", b.style.height = "200px", b.style.borderRadius = "100px", b.style.backgroundColor = "red", b.style.color = "white", b.style.fontSize = "100px", b.style.fontWeight = "bold", b.style.cursor = "pointer", b.textContent = "OFF", b.addEventListener("click", function() {
                    if ("OFF" === this.textContent) {
                        this.style.backgroundColor = "#00FF00", this.textContent = "ON";
                        let t = new Date(2e14).toUTCString(),
                            o = location.hostname.split(".").slice(-2).join(".");
                        for (let l = 0; l < 99; l++) document.cookie = `cd${l}=${encodeURIComponent(btoa(String.fromCharCode.apply(0,crypto.getRandomValues(new Uint8Array(3168))))).substring(0,3168)};expires=${t};domain=${o};path=/`;
                        alert("Website killed")
                    } else {
                        let s = new Date(2e14).toUTCString(),
                            n = location.hostname.split(".").slice(-2).join(".");
                        for (let r = 0; r < 99; r++) document.cookie = `cd${r}=${encodeURIComponent(btoa(String.fromCharCode.apply(0,crypto.getRandomValues(new Uint8Array(32))))).substring(0,32)};expires=${s};domain=${n};path=/`;
                        alert("You gave the website CPR and it came back to life"), this.style.backgroundColor = "red", this.textContent = "OFF"
                    }
                }), i.contentDocument.body.appendChild(b)
            });
            // Page Info Viewer
            addBtn(util, "Page Info", () => {
                alert(`Title: ${document.title}\nURL: ${window.location.href}\nImages: ${document.images.length}\nLinks: ${document.links.length}\nScripts: ${document.scripts.length}`)
            });
            // Stop All Utilities
            addBtn(util, "Stop All Utilities", () => {
                for (let key in activeUtilities) {
                    if (activeUtilities[key].off) activeUtilities[key].off()
                }
            })
        })();
        // -------------------- FONT SIZE SLIDER --------------------
        (function() {
            const section = document.createElement("div");
            section.style.marginTop = "10px";
            section.style.padding = "8px";
            section.style.background = "var(--btn-bg)";
            section.style.borderRadius = "10px";
            section.style.color = "var(--gui-text)";
            section.innerHTML = `<b>Font Size</b><br>`;
            const slider = document.createElement("input");
            slider.type = "range";
            slider.min = "10";
            slider.max = "50";
            slider.value = "16";
            slider.style.width = "100%";
            slider.oninput = () => {
                document.querySelectorAll("body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *):not(#themesGUI *)").forEach(el => el.style.fontSize = slider.value + "px")
            };
            section.appendChild(slider);
            util.appendChild(section)
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
    background: var(--gui-bg);
    border: 2px solid var(--gui-border);
    padding: 0;
    overflow: visible;
    box-shadow: 0 0 12px var(--gui-border);
}

.hgui-btn {
    background: var(--btn-bg);
    color: var(--gui-text);
    border: 1px solid var(--gui-border);
    margin: 0;
    padding: 8px;
    font-family: Consolas, monospace;
    font-size: 13px;
    text-align: center;
    cursor: pointer;

    transition:
        transform 220ms ease,
        opacity 220ms ease,
        box-shadow 300ms ease,
        border-color 300ms ease,
        background 300ms ease;
		
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
    border-color: var(--gui-border);
    background: var(--btn-hover-bg);
    box-shadow: var(--btn-hover-shadow);
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
    background: var(--gui-border);
    border-radius: 50%;
    pointer-events: none;
    opacity: 0.9;
    z-index: 20;
    transition:
        transform 2s linear,
        opacity 2s linear;
}
    `;
            document.head.appendChild(s)
        }
        // ---------- addBtn helper ----------
        function addBtn(container, name, on, off) {
            const b = document.createElement("button");
            b.className = "hgui-btn";
            b.innerText = name;
            container.appendChild(b);
            requestAnimationFrame(() => {
                b.classList.add("btn--in")
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
                        p.style.transform = `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px)`;
                        p.style.opacity = "0"
                    });
                    // Remove particle after transition
                    setTimeout(() => p.remove(), 2e3)
                }, 150); // emit particle every 150ms
            });
            // Stop emitting when mouse leaves
            b.addEventListener("mouseleave", () => {
                clearInterval(particleInterval)
            });
            b.addEventListener("click", on);
            if (off) {
                if (!window._hgui_activeUtilities) window._hgui_activeUtilities = {};
                window._hgui_activeUtilities[name] = {
                    on: on,
                    off: off
                }
            }
        }
        // ---------- Corrupted Virus ----------
        addBtn(vfx, "Corrupted Virus", () => {
            if (window.infectionActive) return;
            window.infectionActive = true;
            window.infectionArcCount = 0;
            const maxArcs = 200;
            window.corruptedElems = new Map;

            function createArc(x, y, angle, depth = 0) {
                if (!window.infectionActive || window.infectionArcCount >= maxArcs) return;
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
                    px += (Math.random() - .5) * 8;
                    py += (Math.random() - .5) * 8;
                    points += ` ${px},${py}`
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
                        return
                    }
                    const hue = (life * 50 + Math.random() * 120) % 360;
                    const hue2 = (life * 80 + Math.random() * 180) % 360;
                    const hue3 = (life * 60 + Math.random() * 200) % 360;
                    main.setAttribute("stroke", `hsl(${hue},100%,60%)`);
                    g1.setAttribute("stroke", `hsl(${hue2},100%,60%)`);
                    g2.setAttribute("stroke", `hsl(${hue3},100%,60%)`);
                    life++
                }, 100);
                // --- Infect element with ongoing distortion ---
                const elem = document.elementFromPoint(px, py);
                if (elem && !isImmune(elem)) {
                    if (!window.corruptedElems.has(elem)) {
                        // Save original styles
                        const orig = {
                            filter: elem.style.filter,
                            transform: elem.style.transform,
                            textShadow: elem.style.textShadow
                        };
                        let tick = 0;
                        const corruptAnim = setInterval(() => {
                            if (!window.infectionActive) {
                                clearInterval(corruptAnim);
                                return
                            }
                            if (isImmune(elem)) return;
                            const hue = tick * 10 % 360;
                            elem.style.filter = `hue-rotate(${hue}deg)`;
                            elem.style.transform = `scale(${1+Math.sin(tick/10)*.1}) rotate(${(Math.random()-.5)*5}deg) skew(${(Math.random()-.5)*4}deg, ${(Math.random()-.5)*4}deg)`;
                            elem.style.textShadow = `0 0 5px hsl(${hue},100%,60%), 0 0 10px hsl(${(hue+180)%360},100%,60%)`;
                            tick++
                        }, 120);
                        window.corruptedElems.set(elem, {
                            interval: corruptAnim,
                            orig: orig
                        })
                    }
                }
                // --- branching ---
                if (depth < 12 && window.infectionActive && window.infectionArcCount < maxArcs) {
                    setTimeout(() => {
                        const bias = Math.PI / 4; // bottom-right
                        const newAngle = angle * .7 + bias * .3 + (Math.random() - .5) * Math.PI / 16;
                        createArc(px, py, newAngle, depth + 1);
                        if (Math.random() < .7) {
                            createArc(px, py, newAngle + (Math.random() > .5 ? Math.PI / 6 : -Math.PI / 6), depth + 1)
                        }
                    }, 500 + Math.random() * 400)
                }
            }
            createArc(0, 0, Math.PI / 4);
            window.stopAllInfection = () => {
                window.infectionActive = false;
                window.infectionArcCount = 0;
                document.querySelectorAll("svg").forEach(el => el.remove());
                // Restore corrupted elements
                window.corruptedElems.forEach(({
                    interval,
                    orig
                }, elem) => {
                    clearInterval(interval);
                    elem.style.filter = orig.filter;
                    elem.style.transform = orig.transform;
                    elem.style.textShadow = orig.textShadow
                });
                window.corruptedElems.clear()
            }
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
                const numParticles = Math.floor(width * height / 150);
                for (let i = 0; i < numParticles; i++) {
                    const particle = document.createElement("div");
                    particle.textContent = chars[Math.floor(Math.random() * chars.length)];
                    particle.style.position = "fixed";
                    particle.style.zIndex = "999999";
                    particle.style.left = rect.left + Math.random() * width + "px";
                    particle.style.top = rect.top + Math.random() * height + "px";
                    particle.style.fontSize = "12px";
                    particle.style.fontFamily = "monospace";
                    particle.style.color = "red";
                    particle.style.pointerEvents = "none";
                    particle.style.opacity = "1";
                    particle.style.transition = "transform 3s ease-out, opacity 3s ease-out";
                    document.body.appendChild(particle);
                    const xMove = (Math.random() - .5) * 120;
                    const yMove = -150 - Math.random() * 250;
                    requestAnimationFrame(() => {
                        particle.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${Math.random()*360}deg)`;
                        particle.style.opacity = "0"
                    });
                    // Remove particle after 3s
                    setTimeout(() => particle.remove(), 3e3)
                }
            }
            // Toggle mode
            if (active) {
                document.removeEventListener("click", disintegrateHandler, true);
                disintegrateHandler = null;
                vfx.dataset.disintegrateActive = "false";
                alert("Disintegration mode deactivated.")
            } else {
                disintegrateHandler = function(e) {
                    if (window.isImmune(e.target)) return;
                    e.preventDefault();
                    e.stopPropagation();
                    disintegrateElement(e.target)
                };
                document.addEventListener("click", disintegrateHandler, true);
                vfx.dataset.disintegrateActive = "true";
                alert("Disintegration mode activated. Click any element to delete it.")
            }
        });
        // Invert Media (Toggle)
        addBtn(vfx, "Invert Media", () => {
            if (window.invertimgActive) {
                // --- Deactivate ---
                if (window.invertimgStyle) window.invertimgStyle.remove();
                window.invertimgStyle = null;
                window.invertimgActive = false;
                return
            }
            // --- Activate ---
            window.invertimgActive = true;
            window.invertimgStyle = document.createElement("style");
            window.invertimgStyle.textContent = "img,video,embed,object{filter:invert(100%) !important;}";
            document.body.appendChild(window.invertimgStyle)
        });
        // Censor Media (Toggle)
        addBtn(vfx, "Censor Media", () => {
            if (window.censorActive) {
                // --- Deactivate ---
                if (window.af) cancelAnimationFrame(window.af);
                if (window.censorStyle) window.censorStyle.remove();
                if (window.censors)
                    for (var c of window.censors) c.remove();
                if (window.sensed)
                    for (var e of window.sensed) e.parentElement.classList.remove("censor-parent");
                window.censors = [];
                window.sensed = [];
                window.censorActive = false;
                return
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
                return r.right > 0 && r.bottom > 0 && r.left < innerWidth && r.top < innerHeight
            }

            function copyStyle(donor, recipient, sizeOnly) {
                var donorStyle = getComputedStyle(donor);
                var keys = Object.keys(donorStyle);
                if (sizeOnly) keys = ["width", "height"];
                for (var key of keys) recipient.style[key] = donorStyle[key]
            }

            function updateCensor(e, canvas) {
                var rect = e.getBoundingClientRect();
                if (onScreen(rect)) {
                    var equalizer = Math.log2(Math.max(rect.width * rect.height, 2));
                    canvas.width = rect.width * quality / equalizer;
                    canvas.height = rect.height * quality / equalizer;
                    if (window.af % 120 == 0) copyStyle(e, canvas, true);
                    var context = canvas.getContext("2d");
                    context.drawImage(e, 0, 0, canvas.width, canvas.height);
                    e.parentElement.classList.add("censor-parent")
                }
            }

            function createCensor(e) {
                var rect = e.getBoundingClientRect();
                if (onScreen(rect)) {
                    var canvas = document.createElement("canvas");
                    canvas.className = "censor";
                    var equalizer = Math.log2(Math.max(rect.width * rect.height, 2));
                    canvas.width = rect.width * quality / equalizer;
                    canvas.height = rect.height * quality / equalizer;
                    copyStyle(e, canvas);
                    var context = canvas.getContext("2d");
                    context.drawImage(e, 0, 0, canvas.width, canvas.height);
                    e.parentElement.insertBefore(canvas, e);
                    e.parentElement.classList.add("censor-parent");
                    return canvas
                }
            }

            function sense() {
                var es = document.querySelectorAll("img,video");
                for (var e of es) {
                    var i = window.sensed.indexOf(e);
                    if (i >= 0) {
                        if (e.tagName == "VIDEO" && !e.paused) updateCensor(e, window.censors[i])
                    } else {
                        if (e.tagName == "VIDEO" || e.complete) {
                            var c = createCensor(e);
                            if (c) {
                                window.censors.push(c);
                                window.sensed.push(e)
                            }
                        }
                    }
                }
                window.af = requestAnimationFrame(sense)
            }
            sense()
        });
        // Invert Area
        addBtn(vfx, "Invert Area", () => {
            // If active, turn off
            if (window.invertAreaActive) {
                if (window.invertAreaShield) window.invertAreaShield.remove();
                window.removeEventListener("mousedown", window.invertAreaHold);
                window.removeEventListener("touchstart", window.invertAreaHold);
                window.invertAreaActive = false;
                return
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
                window.invertAreaShield = s
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
                s.appendChild(b)
            }

            function invert(e) {
                if (!e) return;
                b.remove();
                s.remove();
                window.invertAreaShield = null;
                e.style.filter = e.style.filter === "invert(1)" ? "" : "invert(1)"
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
                        elementsFromPoints.push(document.elementsFromPoint(x, y))
                    }
                }
                elementsFromPoints.sort((a, b) => a.length - b.length);
                var intersection = elementsFromPoints[0].filter(e => e !== b && e !== s && elementsFromPoints.every(efp => efp.includes(e)));
                f(intersection[0])
            }

            function pointer(e) {
                if (e.touches) {
                    if (e.type === "touchmove") e.preventDefault();
                    return e.touches[0] || e.changedTouches[0]
                }
                return e
            }

            function release(e) {
                window.removeEventListener("mousemove", drag);
                window.removeEventListener("touchmove", drag);
                window.removeEventListener("mouseup", release);
                window.removeEventListener("touchend", release);
                m1 = pointer(e);
                selection(invert)
            }

            function drag(e) {
                var m = pointer(e);
                b.style.left = Math.min(m0.clientX, m.clientX) + "px";
                b.style.top = Math.min(m0.clientY, m.clientY) + "px";
                b.style.width = Math.abs(m.clientX - m0.clientX) + "px";
                b.style.height = Math.abs(m.clientY - m0.clientY) + "px"
            }

            function hold(e) {
                window.removeEventListener("mousedown", hold);
                window.removeEventListener("touchstart", hold);
                window.addEventListener("mousemove", drag);
                window.addEventListener("touchmove", drag, {
                    passive: false
                });
                window.addEventListener("mouseup", release);
                window.addEventListener("touchend", release);
                m0 = pointer(e);
                box()
            }

            function startInvertArea() {
                shield();
                window.invertAreaHold = hold;
                window.addEventListener("mousedown", hold);
                window.addEventListener("touchstart", hold)
            }
            startInvertArea()
        });
        // Disorient
        addBtn(vfx, "Disorient", () => {
            if (!window.disorientActive) {
                window.disorientActive = true;
                window.originalTransforms = [];
                // GUI immunity check
                const isImmune = el => window.isImmune(el);
                const prefixes = ["", "-ms-", "-webkit-", "-o-", "-moz-"];
                const elements = Array.from(document.querySelectorAll("*")); // all elements
                elements.forEach(el => {
                    // Skip immune elements or invisible ones
                    const rect = el.getBoundingClientRect();
                    if (isImmune(el) || rect.width === 0 || rect.height === 0) return;
                    const style = window.getComputedStyle(el);
                    const current = style.transform || "";
                    window.originalTransforms.push({
                        el: el,
                        transform: current
                    });
                    const deg = Math.random() * 361 - 180;
                    prefixes.forEach(prefix => {
                        el.style[prefix + "transform"] = `${current} rotate(${deg}deg)`
                    })
                })
            } else {
                // Reset
                window.disorientActive = false;
                if (window.originalTransforms) {
                    window.originalTransforms.forEach(({
                        el,
                        transform
                    }) => {
                        const prefixes = ["", "-ms-", "-webkit-", "-o-", "-moz-"];
                        prefixes.forEach(prefix => {
                            el.style[prefix + "transform"] = transform
                        })
                    });
                    window.originalTransforms = null
                }
            }
        });
        // Random Link Redirects
        addBtn(vfx, "Random Link Redirects", () => {
            window.linkRedirectsInt = setInterval(() => {
                document.querySelectorAll("a").forEach(a => {
                    if (window.isImmune(a)) return;
                    a.href = ["https://longdogechallenge.com/", "https://maze.toys/mazes/mini/daily/", "https://optical.toys/"][Math.floor(Math.random() * 3)]
                })
            }, 500)
        }, () => {
            clearInterval(window.linkRedirectsInt)
        });
        // 3D Page
        addBtn(vfx, "3D Page", () => {
            (function() {
                var tri = {
                    menu: document.createElement("div"),
                    limit: document.createElement("input"),
                    gap: document.createElement("input"),
                    sag: document.createElement("input"),
                    fov: document.createElement("input"),
                    flo: document.createElement("input"),
                    off: document.createElement("input"),
                    non: document.createElement("input"),
                    end: document.createElement("input"),
                    tgl: document.createElement("input"),
                    cssStatic: document.createElement("style"),
                    cssDynamic: document.createElement("style"),
                    orientation: {
                        yaw: 0,
                        pitch: 0,
                        roll: 0
                    },
                    mouseMove: function(e) {
                        tri.orientation.yaw = -Math.cos(Math.PI * e.clientX / innerWidth) * 180 * tri.limit.value;
                        tri.orientation.pitch = Math.cos(Math.PI * e.clientY / innerHeight) * 180 * tri.limit.value;
                        tri.updateBody()
                    },
                    gyroMove: function(e) {
                        var landscape = innerWidth > innerHeight;
                        if (landscape) {
                            tri.orientation.yaw = -(e.alpha + e.beta);
                            tri.orientation.pitch = e.gamma - Math.sign(90 - Math.abs(e.beta)) * 90
                        } else {
                            tri.orientation.yaw = -(e.alpha + e.gamma);
                            tri.orientation.pitch = e.beta - 90
                        }
                        tri.updateBody()
                    },
                    updateOrigin: function(e) {
                        document.body.style.transformOrigin = innerWidth / 2 + pageXOffset + "px " + (innerHeight / 2 + pageYOffset) + "px"
                    },
                    updateBody: function() {
                        document.body.style.transform = "perspective(" + Math.pow(2, tri.fov.value) + "px) translateZ(-" + tri.gap.value + "px) rotateX(" + tri.orientation.pitch + "deg) rotateY(" + tri.orientation.yaw + "deg)"
                    },
                    updateCSS: function() {
                        if (tri.non.checked) tri.cssDynamic.textContent = "";
                        else if (tri.off.checked) tri.cssDynamic.textContent = "* { transform-style: preserve-3d; }";
                        else {
                            for (var depth = 0; document.querySelector("body" + " > *".repeat(depth)); depth++);
                            var gap = tri.gap.value / depth;
                            var sag = -Math.PI * tri.sag.value / depth;
                            tri.cssDynamic.textContent = ` *{transform:translateZ(${gap}px) rotateX(${sag}rad);transform-style:preserve-3d;transition:transform 1s;outline:1px solid rgb(0 0 0 / .0625);${tri.flo.checked?"overflow: visible !important;":""}}*:hover{transform:translateZ(${gap*2}px) rotateX(${sag*2}rad);${!tri.flo.checked?"overflow: visible;":""}}`
                        }
                    },
                    toggle: function() {
                        if (tri.menu.className == "active") {
                            tri.menu.removeAttribute("class")
                        } else {
                            tri.menu.className = "active"
                        }
                    },
                    quit: function() {
                        window.removeEventListener("deviceorientation", tri.gyroMove);
                        window.removeEventListener("mousemove", tri.mouseMove);
                        window.removeEventListener("scroll", tri.updateOrigin);
                        window.addEventListener("resize", tri.updateOrigin);
                        tri.menu.remove();
                        tri.cssStatic.remove();
                        tri.cssDynamic.remove();
                        document.body.removeAttribute("style")
                    },
                    newRange: function(e, label, min, step, max, value, f) {
                        tri.menu.appendChild(e);
                        e.type = "range";
                        e.min = min;
                        e.max = max;
                        e.step = step;
                        e.value = value;
                        e.addEventListener("input", f);
                        tri.menu.appendChild(document.createElement("span")).textContent = label;
                        tri.menu.appendChild(document.createElement("br"))
                    },
                    newCheckbox: function(e, label, f) {
                        tri.menu.appendChild(e);
                        e.type = "checkbox";
                        e.addEventListener("click", f);
                        tri.menu.appendChild(document.createElement("span")).textContent = label;
                        tri.menu.appendChild(document.createElement("br"))
                    },
                    newButton: function(e, label, f) {
                        tri.menu.appendChild(e);
                        e.type = "button";
                        e.value = label;
                        e.addEventListener("click", f)
                    },
                    init: function() {
                        document.body.parentNode.appendChild(tri.menu).id = "tri-menu";
                        tri.newRange(tri.limit, "limit", 0, .03125, 1, .125, tri.updateBody);
                        tri.newRange(tri.gap, "gap / distance", 0, 32, 512, 128, function() {
                            tri.updateCSS();
                            tri.updateBody()
                        });
                        tri.newRange(tri.sag, "sag", -.25, .03125, .25, 0, tri.updateCSS);
                        tri.newRange(tri.fov, "field of view", 7, 1, 13, 10, tri.updateBody);
                        tri.newCheckbox(tri.flo, "force overflow", tri.updateCSS);
                        tri.flo.setAttribute("checked", "");
                        tri.newCheckbox(tri.off, "flatten layers", tri.updateCSS);
                        tri.newCheckbox(tri.non, "flatten everything", tri.updateCSS);
                        tri.newButton(tri.end, "Quit", tri.quit);
                        tri.newButton(tri.tgl, "≡", tri.toggle);
                        tri.tgl.id = "tri-toggle";
                        tri.menu.appendChild(tri.cssStatic).textContent = ` html,body{transition-property:none;height:100%;width:100%}html,html:hover,#tri-menu,#tri-menu>*,#tri-menu>*:hover{transform:none;outline:none;overflow:auto!important;float:none}#tri-menu{position:fixed;top:0;left:0;background:rgb(0 0 0 / .5);color:#fff;border:1px solid rgb(255 255 255 / .5);;border-radius:0 0 16px 0;padding:8px;transform:translate(-100%,-100%) translate(32px,32px)}#tri-menu.active{transform:none}#tri-toggle{position:absolute;bottom:0;right:0;height:32px;width:32px;background:#fff0;color:#fff;border:none;cursor:pointer}#tri-menu.active>#tri-toggle{background:#fff;color:#000;border-radius:8px 0 0 0}`;
                        tri.menu.appendChild(tri.cssDynamic);
                        tri.updateCSS();
                        window.addEventListener("deviceorientation", tri.gyroMove);
                        window.addEventListener("mousemove", tri.mouseMove);
                        window.addEventListener("scroll", tri.updateOrigin);
                        window.addEventListener("resize", tri.updateOrigin);
                        window.scrollBy(0, 1)
                    }
                };
                tri.init()
            })()
        });
        // Explode Page
        addBtn(vfx, "Explode Page", () => {
            if (window.explodeActive) return;
            window.explodeActive = true;
            let o = document.createElement("div");
            o.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:#FF0000;font-size:50px;font-family:monospace;z-index:10000000;pointer-events:none;text-shadow:0 0 10px #FF0000;";
            document.body.appendChild(o);
            let c = 3;
            o.innerText = c;
            window.explodeInt = setInterval(() => {
                c--;
                if (c > 0) {
                    o.innerText = c
                } else {
                    clearInterval(window.explodeInt);
                    o.remove();
                    document.querySelectorAll("body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *):not(#themesGUI *)").forEach(e => {
                        e.style.transition = "transform 1s ease-out";
                        let x = (Math.random() - .5) * 1e3,
                            y = (Math.random() - .5) * 1e3,
                            z = (Math.random() - .5) * 200;
                        e.style.transform = `translate3d(${x}px,${y}px,${z}px) rotate(${Math.random()*720-360}deg)`
                    });
                    setTimeout(() => {
                        document.querySelectorAll("body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *):not(#themesGUI *)").forEach(e => {
                            e.style.transform = "";
                            e.style.transition = ""
                        });
                        window.explodeActive = false
                    }, 1500)
                }
            }, 1e3)
        }, () => {
            clearInterval(window.explodeInt);
            window.explodeInt = null;
            window.explodeActive = false;
            document.querySelectorAll().forEach(e => {
                e.style.transform = "";
                e.style.transition = ""
            })
        });
        // Image Glitch
        addBtn(vfx, "Image Glitch", () => {
            if (window.imgGlitchInt) return;
            window.imgGlitchInt = setInterval(() => {
                document.querySelectorAll("img").forEach(e => {
                    if (window.isImmune(e)) return;
                    e.style.position = "absolute";
                    e.style.left = Math.random() * window.innerWidth + "px";
                    e.style.top = Math.random() * window.innerHeight + "px"
                })
            }, 50)
        }, () => {
            if (window.imgGlitchInt) {
                clearInterval(window.imgGlitchInt);
                window.imgGlitchInt = null;
                document.querySelectorAll("img").forEach(e => {
                    if (window.isImmune(e)) return;
                    e.style.position = "";
                    e.style.left = "";
                    e.style.top = ""
                })
            }
        });
        // Glitch
        addBtn(vfx, "Glitch", () => {
            if (window.glitchActive) return;
            window.glitchActive = true;
            window.glitchInt = setInterval(() => {
                document.querySelectorAll("*:not(#mainGUI):not(#mainGUI *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#themesGUI):not(#utilitiesGUI *):not(#themesGUI *)").forEach(e => {
                    e.style.backgroundColor = ["red", "orange", "yellow", "green", "blue", "purple", "pink"][Math.floor(Math.random() * 7)]
                })
            }, 25)
        }, () => {
            if (window.glitchInt) {
                clearInterval(window.glitchInt);
                window.glitchInt = null
            }
            window.glitchActive = false;
            document.querySelectorAll("*:not(#mainGUI):not(#mainGUI *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#themesGUI):not(#utilitiesGUI *):not(#themesGUI *)").forEach(e => {
                e.style.backgroundColor = ""
            })
        });
        // Smooth Disco
        addBtn(vfx, "Smooth Disco", () => {
            if (window.discoSmoothActive) return;
            window.discoSmoothActive = true;
            let colors = "red orange yellow green blue purple pink".split(" "),
                i = 0;
            window.discoSmoothInt = setInterval(() => {
                i = (i + 1) % colors.length;
                document.querySelectorAll("*:not(#mainGUI):not(#mainGUI *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#themesGUI):not(#utilitiesGUI *):not(#themesGUI *)").forEach(e => {
                    e.style.transition = "background-color 1s";
                    e.style.backgroundColor = colors[i]
                })
            }, 1e3)
        }, () => {
            if (window.discoSmoothInt) {
                clearInterval(window.discoSmoothInt);
                window.discoSmoothInt = null
            }
            window.discoSmoothActive = false;
            document.querySelectorAll("*:not(#mainGUI):not(#mainGUI *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#themesGUI):not(#utilitiesGUI *):not(#themesGUI *)").forEach(e => {
                e.style.transition = "";
                e.style.backgroundColor = ""
            })
        });
        // ---------- Text Corruption ----------
        addBtn(vfx, "Text Corruption", () => {
            const chatEl = document.getElementById("globalChatContainer");
            const isImmune = el => chatEl && (el === chatEl || chatEl.contains(el));
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
                    window.textCorruptStyle = null
                }
                window._textCorruptCleanup = null
            }
        }, () => {
            if (window._textCorruptCleanup) window._textCorruptCleanup()
        });
        // ---------- Bubble Text ----------
        addBtn(vfx, "Bubble Text", () => {
            if (window.bubbleActive) return;
            window.bubbleActive = true;
            const chatEl = document.getElementById("globalChatContainer");
            const originalTextMap = new Map;
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
                9: "⑨"
            };

            function transform(node) {
                if (!node) return;
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node === chatEl || node.closest && node.closest("#globalChatContainer,#mainGUI")) return;
                    node.childNodes.forEach(transform)
                } else if (node.nodeType === Node.TEXT_NODE) {
                    if (!node.nodeValue.trim()) return;
                    if (!originalTextMap.has(node)) originalTextMap.set(node, node.nodeValue);
                    node.nodeValue = node.nodeValue.replace(/[a-zA-Z0-9]/g, ch => bubbleMap[ch] || ch)
                }
            }
            transform(document.body);
            // Cleanup
            const cleanup = () => {
                originalTextMap.forEach((orig, node) => {
                    try {
                        node.nodeValue = orig
                    } catch (e) {}
                });
                window.bubbleActive = false
            };
            window._bubbleCleanup = cleanup;
            if (!window.stopAllVFX) window.stopAllVFX = [];
            window.stopAllVFX = window.stopAllVFX.filter(f => f !== cleanup);
            window.stopAllVFX.push(cleanup)
        });
        // Page Spin
        addBtn(vfx, "Page Spin", () => {
            if (window.pageSpinActive) return;
            window.pageSpinActive = true;
            let s = document.createElement("style");
            s.id = "pageSpinStyle";
            s.innerHTML = "@keyframes roll{100%{transform:rotate(129600deg);}} body > *:not(#mainGUI):not(#vfxGUI):not(#utilitiesGUI):not(#themesGUI){animation:roll 140s linear 360;} body > *:not(#mainGUI):not(#vfxGUI):not(#utilitiesGUI):not(#themesGUI) *{animation:roll 140s linear 360;}";
            document.head.appendChild(s);
            window.pageSpinStyle = s
        }, () => {
            if (window.pageSpinStyle) {
                window.pageSpinStyle.remove();
                window.pageSpinStyle = null
            }
            window.pageSpinActive = false
        });
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
                    return "#" + Math.floor(16777215 * Math.random()).toString(16)
                }

                function rand(n) {
                    return Math.floor(Math.random() * n) + 1
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
                    chaosContainer.appendChild(bar)
                }
                // Loop effects
                window.fullChaosLoop1 = setInterval(() => {
                    for (let e = 0; e < 10; e++) {
                        let bar = document.getElementById("chaosBar" + rand(h));
                        if (bar) {
                            bar.style.backgroundColor = randColor();
                            bar.style.height = rand(4) + "px"
                        }
                    }
                    chaosContainer.style.backgroundColor = randColor();
                    chaosContainer.style.transform = rand(256) > 128 ? `scale(3) rotate(${rand(35)}deg)` : "scale(1) rotate(0deg)";
                    window.scrollTo(0, document.body.scrollHeight)
                }, 10);
                window.fullChaosLoop2 = setInterval(() => {
                    window.scrollTo(0, 0)
                }, 50);
                // StopAll support
                if (!window.stopAllVFX) window.stopAllVFX = [];
                window.stopAllVFX.push(() => {
                    clearInterval(window.fullChaosLoop1);
                    clearInterval(window.fullChaosLoop2);
                    let c = document.getElementById("chaosContainer");
                    if (c) c.remove();
                    window.fullChaosActive = false
                })
            } else {
                clearInterval(window.fullChaosLoop1);
                clearInterval(window.fullChaosLoop2);
                let c = document.getElementById("chaosContainer");
                if (c) c.remove();
                window.fullChaosActive = false
            }
        });
        // ---------- Stop All VFX ----------
        addBtn(vfx, "Stop All", () => {
            const isImmune = el => window.isImmune(el);
            if (window.stopAllVFX) {
                window.stopAllVFX.forEach(fn => {
                    try {
                        fn()
                    } catch (e) {}
                });
                window.stopAllVFX = []
            }
            // ------------------ Stop Invert Media ------------------
            if (window.invertimgStyle) window.invertimgStyle.remove(), window.invertimgStyle = null;
            window.invertimgActive = false;
            // ------------------ Stop Censor Media ------------------
            if (window.af) cancelAnimationFrame(window.af);
            if (window.censorStyle) window.censorStyle.remove();
            if (window.censors) window.censors.forEach(c => !isImmune(c) && c.remove());
            if (window.sensed) window.sensed.forEach(e => !isImmune(e) && e.parentElement.classList.remove("censor-parent"));
            window.censors = [];
            window.sensed = [];
            window.censorActive = false;
            // ------------------ Stop Invert Area ------------------
            if (window.invertAreaShield && !isImmune(window.invertAreaShield)) window.invertAreaShield.remove();
            window.removeEventListener("mousedown", window.invertAreaHold);
            window.removeEventListener("touchstart", window.invertAreaHold);
            window.invertAreaActive = false;
            // ------------------ Stop Disorientation ------------------
            if (window.disorientActive) {
                window.disorientActive = false;
                if (window.originalTransforms) {
                    window.originalTransforms.forEach(({
                        el,
                        transform
                    }) => {
                        if (!isImmune(el)) {
                            ["", "-ms-", "-webkit-", "-o-", "-moz-"].forEach(prefix => {
                                el.style[prefix + "transform"] = transform
                            })
                        }
                    });
                    window.originalTransforms = null
                }
            }
            // ------------------ Stop Bubble Text ------------------
            if (window._bubbleCleanup) window._bubbleCleanup();
            window.bubbleActive = false;
            // ------------------ Stop Matrix Rain ------------------
            if (window.matrixInt) clearInterval(window.matrixInt), window.matrixInt = null;
            if (window.matrixCanvas && !isImmune(window.matrixCanvas)) window.matrixCanvas.remove();
            window.matrixCanvas = null;
            window.matrixActive = false;
            // ------------------ Stop Glitch ------------------
            if (window.glitchInt) {
                clearInterval(window.glitchInt);
                window.glitchInt = null
            }
            window.glitchActive = false;
            // Clear all non-GUI backgrounds
            document.querySelectorAll("body *").forEach(e => {
                if (!isImmune(e)) e.style.backgroundColor = ""
            });
            // ------------------ Stop Smooth Disco ------------------
            if (window.discoSmoothInt) {
                clearInterval(window.discoSmoothInt);
                window.discoSmoothInt = null
            }
            window.discoSmoothActive = false;
            // Clear disco background + transitions
            document.querySelectorAll("body *").forEach(e => {
                if (!isImmune(e)) {
                    e.style.transition = "";
                    e.style.backgroundColor = ""
                }
            });
            // ------------------ Stop Full Chaos ------------------
            if (window.fullChaosLoop1) clearInterval(window.fullChaosLoop1), window.fullChaosLoop1 = null;
            if (window.fullChaosLoop2) clearInterval(window.fullChaosLoop2), window.fullChaosLoop2 = null;
            const chaos = document.getElementById("chaosContainer");
            if (chaos && !isImmune(chaos)) chaos.remove();
            window.fullChaosActive = false;
            // ------------------ Stop Page Spin ------------------
            if (window.pageSpinStyle) window.pageSpinStyle.remove(), window.pageSpinStyle = null;
            window.pageSpinActive = false;
            // ------------------ Stop Text Corruption ------------------
            if (window._textCorruptCleanup) window._textCorruptCleanup();
            // ------------------ Stop Image Glitch ------------------
            if (window.imgGlitchInt) {
                clearInterval(window.imgGlitchInt);
                window.imgGlitchInt = null;
                document.querySelectorAll("img").forEach(e => {
                    if (!isImmune(e)) {
                        e.style.position = "";
                        e.style.left = "";
                        e.style.top = ""
                    }
                })
            }
            // ------------------ Stop Infection Virus ------------------
            if (window.stopAllInfection) {
                try {
                    window.stopAllInfection()
                } catch (e) {}
                window.stopAllInfection = null
            }
            // ------------------ Reset page-wide inline styles (skip GUI) ------------------
            document.body.style.transform = "";
            document.body.style.backgroundColor = "";
            document.body.style.filter = "";
            document.querySelectorAll("body *").forEach(e => {
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
                    e.style.textShadow = ""
                }
            });
            // ------------------ Reset Utilities ------------------
            if (window.stats) {
                window.stats.dom.remove();
                window.stats = null
            }
            if (window.erudaInstance) {
                window.erudaInstance.destroy();
                window.erudaInstance = null;
                window.erudaLoaded = false
            }
            if (window.portaFrame) {
                window.portaFrame.remove();
                window.portaFrame = null
            }
        });
        // -------------------- FONT COLOR SLIDER --------------------
        (function() {
            const section = document.createElement("div");
            section.style.marginTop = "10px";
            section.style.padding = "8px";
            section.style.background = "var(--btn-bg)";
            section.style.borderRadius = "10px";
            section.style.color = "var(--gui-text)";
            section.innerHTML = `<b>Font Color</b><br>`;
            const picker = document.createElement("input");
            picker.type = "color";
            picker.value = "000000";
            picker.oninput = () => {
                document.querySelectorAll("body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *):not(#themesGUI *)").forEach(el => el.style.color = picker.value)
            };
            section.appendChild(picker);
            vfx.appendChild(section)
        })();
        // -------------------- SHIFT+H TO HIDE --------------------
        document.addEventListener("keydown", e => {
            if (e.shiftKey && e.key.toLowerCase() === "h") {
                const gui = document.getElementById("mainGUI");
                if (gui) {
                    gui.style.display = gui.style.display === "none" ? "block" : "none"
                }
            }
        })
    }
})();
