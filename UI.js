(function () {
  if (window.hackerLoaded) return;
  window.hackerLoaded = true;
  spawnGUIs();

  function spawnGUIs() {
    // -------------------- Multi Page GUI --------------------
    (function () {
      const gui = document.createElement("div");
      // -------------------- CSS Variables --------------------
      gui.style.setProperty("--gui-bg", "#000");
      gui.style.setProperty("--gui-border", "#00ff00");
      gui.style.setProperty("--gui-text", "#00ff00");
      gui.style.setProperty("--console-bg", "#000");
      gui.style.setProperty("--console-text", "#00ff00");
      gui.style.setProperty("--btn-bg", "#0a0a0a");
      gui.style.setProperty("--btn-hover-bg", "rgba(0,255,0,0.05)");
      gui.style.setProperty(
        "--btn-hover-shadow",
        "inset 0 0 6px #00ff00, 0 0 8px #00ff00",
      );
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
      width: 100%;
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
   width: 100%;
   transition: transform 0.5s ease;
   `;
      gui.appendChild(slider);
      // Create Utilities Page
      const util = document.createElement("div");
      util.id = "utilitiesGUI";
      util.style.cssText = `
   width: 100%;
   flex: 0 0 100%;
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
          controlsWrapper.style.padding = "12px";
        });
        controlsWrapper.addEventListener("mouseleave", () => {
          controlsWrapper.style.maxHeight = "30px";
          controlsWrapper.style.padding = "6px";
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
        titleInput.onfocus = () =>
          (titleInput.style.border = "1px solid #4f8cff");
        titleInput.onblur = () =>
          (titleInput.style.border = "1px solid #3a3a3a");
        titleInput.addEventListener(
          "input",
          () => (document.title = titleInput.value),
        );
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
            document.head.appendChild(link);
          }
          link.href = url;
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
        faviconBtn.onmouseenter = () =>
          (faviconBtn.style.background = "#363636");
        faviconBtn.onmouseleave = () =>
          (faviconBtn.style.background = "#2a2a2a");
        faviconBtn.onclick = () => faviconInput.click();
        innerControls.appendChild(faviconBtn);
        innerControls.appendChild(faviconInput);
        controlsWrapper.appendChild(innerControls);
        utilContainer.appendChild(controlsWrapper);
      }
      // Create VFX Page
      const vfx = document.createElement("div");
      vfx.id = "vfxGUI";
      vfx.style.cssText = `
   width: 100%;
   flex: 0 0 100%;
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
   width: 100%;
   flex: 0 0 100%;
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

      // Console CSS
      const consoleStyles = document.createElement("style");
      consoleStyles.id = "hexhack-console-styles";

      consoleStyles.textContent = `
    #consoleGUI {
        width: 100%;
        flex: 0 0 100%;
        min-height: 220px;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
    }

    .hgui-console-frame,
    .hgui-console-window {
        --term-bg: #080b0f;
        --term-bg-alt: #0c1117;
        --term-border: rgba(255, 255, 255, 0.10);
        --term-border-bright: rgba(255, 255, 255, 0.16);
        --term-text: #d7dee7;
        --term-dim: #687483;
        --term-muted: #8a96a5;
        --term-accent: #79c8ff;
        --term-accent-2: #a78bfa;
        --term-success: #7ee787;
        --term-warning: #e3b341;
        --term-error: #ff7b72;
        --term-prompt: #77ddaa;
        --term-number: #f2cc60;

        color: var(--term-text);
        font-family:
            "Cascadia Code",
            "Cascadia Mono",
            "JetBrains Mono",
            "SFMono-Regular",
            Consolas,
            "Liberation Mono",
            monospace;
        font-size: 13px;
        line-height: 1.55;
    }

    .hgui-console-frame {
        width: 100%;
        min-height: 220px;
        display: flex;
        flex-direction: column;
        min-width: 0;
        overflow: hidden;

        background:
            radial-gradient(
                circle at top right,
                rgba(121, 200, 255, 0.045),
                transparent 28%
            ),
            var(--term-bg);

        border: 1px solid var(--term-border);
        border-radius: 9px;

        box-shadow:
            0 12px 35px rgba(0, 0, 0, 0.22),
            inset 0 1px rgba(255, 255, 255, 0.025);
    }

    .hgui-console-titlebar {
        min-height: 38px;
        height: 38px;
        box-sizing: border-box;

        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;

        padding: 0 10px;

        background:
            linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.035),
                rgba(255, 255, 255, 0.012)
            ),
            var(--term-bg-alt);

        border-bottom: 1px solid var(--term-border);

        user-select: none;
    }

    .hgui-console-titlegroup {
        min-width: 0;

        display: flex;
        align-items: center;
        gap: 10px;
    }

    .hgui-console-lights {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .hgui-console-lights span {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        display: block;

        background: #4d5662;
        box-shadow: 0 0 7px rgba(255, 255, 255, 0.035);
    }

    .hgui-console-lights span:nth-child(1) {
        background: #ff6b6b;
    }

    .hgui-console-lights span:nth-child(2) {
        background: #e5bd55;
    }

    .hgui-console-lights span:nth-child(3) {
        background: #63c174;
    }

    .hgui-console-titletext {
        min-width: 0;

        display: flex;
        align-items: baseline;
        gap: 8px;

        white-space: nowrap;
    }

    .hgui-console-titletext strong {
        color: #e7edf4;
        font-size: 11px;
        letter-spacing: 0.11em;
        font-weight: 700;
    }

    .hgui-console-titletext span {
        color: var(--term-dim);
        font-size: 10px;
        letter-spacing: 0.10em;
    }

    .hgui-console-title-actions {
        display: flex;
        align-items: center;
        gap: 9px;
    }

    .hgui-console-mode {
        color: var(--term-dim);
        font-size: 9px;
        letter-spacing: 0.12em;
    }

    .hgui-console-launch {
        width: 28px;
        height: 28px;
        padding: 0;

        display: grid;
        place-items: center;

        appearance: none;
        border: 1px solid transparent;
        border-radius: 5px;

        background: transparent;
        color: var(--term-muted);

        cursor: pointer;

        transition:
            background 120ms ease,
            color 120ms ease,
            border-color 120ms ease,
            transform 120ms ease;
    }

    .hgui-console-launch:hover {
        color: var(--term-accent);
        background: rgba(121, 200, 255, 0.07);
        border-color: rgba(121, 200, 255, 0.13);
    }

    .hgui-console-launch:active {
        transform: translateY(1px);
    }

    .hgui-console-launch:focus-visible {
        outline: 1px solid var(--term-accent);
        outline-offset: 1px;
    }

    .hgui-console-launch svg {
        width: 15px;
        height: 15px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.6;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .hgui-console-content {
        min-height: 0;
        flex: 1;

        display: flex;
        flex-direction: column;

        background:
            linear-gradient(
                rgba(255, 255, 255, 0.008) 50%,
                transparent 50%
            );
        background-size: 100% 4px;
    }

    .hgui-console-log {
        flex: 1;
        min-height: 0;

        overflow-x: hidden;
        overflow-y: auto;

        padding: 13px 15px 10px;

        box-sizing: border-box;

        overscroll-behavior: contain;
        scrollbar-gutter: stable;

        scrollbar-width: thin;
        scrollbar-color: rgba(255,255,255,0.14) transparent;
    }

    .hgui-console-log::-webkit-scrollbar {
        width: 8px;
    }

    .hgui-console-log::-webkit-scrollbar-track {
        background: transparent;
    }

    .hgui-console-log::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.13);
        border-radius: 20px;
    }

    .hgui-console-log::-webkit-scrollbar-thumb:hover {
        background: rgba(255,255,255,0.20);
    }

    .hgui-console-line {
        min-height: 1.55em;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
    }

    .hgui-console-command-line {
        color: #dce6f0;
    }

    .hgui-console-command-prompt {
        color: var(--term-prompt);
    }

    .hgui-console-command-text {
        color: #f0f4f8;
    }

    .hgui-console-output {
        color: var(--term-text);
    }

    .hgui-console-system {
        color: var(--term-accent);
    }

    .hgui-console-success {
        color: var(--term-success);
    }

    .hgui-console-warning {
        color: var(--term-warning);
    }

    .hgui-console-error {
        color: var(--term-error);
    }

    .hgui-console-dim {
        color: var(--term-dim);
    }

    .hgui-console-input-row {
        display: flex;
        align-items: center;

        min-height: 40px;
        box-sizing: border-box;

        padding: 6px 15px 9px;

        border-top: 1px solid rgba(255,255,255,0.045);

        background: rgba(0,0,0,0.10);
    }

    .hgui-console-prompt {
        flex: none;

        margin-right: 10px;

        color: var(--term-prompt);
        font-weight: 600;
        white-space: nowrap;
    }

    .hgui-console-editor {
        position: relative;
        flex: 1;
        min-width: 0;
        height: 23px;
        overflow: hidden;
    }

    .hgui-console-highlight,
    .hgui-console-input {
        position: absolute;

        inset: 0;

        width: 100%;
        height: 100%;

        box-sizing: border-box;

        padding: 0;
        margin: 0;

        font: inherit;
        line-height: 23px;
        white-space: pre;
        overflow: hidden;
    }

    .hgui-console-highlight {
        z-index: 1;
        pointer-events: none;
        color: transparent;
    }

    .hgui-console-input {
        z-index: 2;

        appearance: none;
        border: 0;
        outline: 0;

        background: transparent;

        color: transparent;
        caret-color: #edf4fb;

        text-overflow: clip;
    }

    .hgui-console-input::selection {
        background: rgba(121, 200, 255, 0.20);
        color: transparent;
    }

    .hgui-console-input:focus {
        outline: none;
    }

    /* Syntax colors */

    .syntax-command {
        color: var(--term-accent);
    }

    .syntax-flag {
        color: var(--term-accent-2);
    }

    .syntax-keyword {
        color: #67d4c4;
    }

    .syntax-argument {
        color: #e5eaf0;
    }

    .syntax-number {
        color: var(--term-number);
    }

    .syntax-invalid {
        color: var(--term-error);
    }

    .hgui-console-status {
        min-height: 23px;
        box-sizing: border-box;

        display: flex;
        align-items: center;
        justify-content: space-between;

        gap: 12px;

        padding: 0 15px;

        border-top: 1px solid rgba(255,255,255,0.045);

        color: var(--term-dim);

        font-size: 9px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .hgui-console-status-left {
        display: flex;
        align-items: center;
        gap: 7px;
    }

    .hgui-console-status-left i {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        display: block;

        background: var(--term-success);
        box-shadow: 0 0 8px rgba(126, 231, 135, 0.42);
    }

    .hgui-console-status-left b {
        font-weight: 700;
    }

    .hgui-console-status-right {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    /* Detached terminal */

    .hgui-console-window {
        position: fixed;

        left: 50%;
        top: 50%;

        width: 780px;
        height: 480px;

        min-width: 420px;
        min-height: 260px;

        max-width: calc(100vw - 20px);
        max-height: calc(100vh - 20px);

        transform: none;

        display: flex;
        flex-direction: column;
        min-height: 0;

        z-index: 999999;

        overflow: hidden;
        resize: both;

        border: 1px solid var(--term-border-bright);
        border-radius: 9px;

        background: var(--term-bg);

        box-shadow:
            0 24px 80px rgba(0,0,0,0.52),
            0 4px 18px rgba(0,0,0,0.28),
            inset 0 1px rgba(255,255,255,0.03);
    }

    .hgui-console-window .hgui-console-content {
        flex: 1;
        min-height: 0;
    }

    .hgui-console-titlebar-detached {
        cursor: move;
    }

    @media (max-width: 700px) {
        .hgui-console-frame {
            border-radius: 6px;
        }

        .hgui-console-titletext span,
        .hgui-console-mode {
            display: none;
        }

        .hgui-console-prompt {
            margin-right: 7px;
        }

        .hgui-console-input-row,
        .hgui-console-log {
            padding-left: 10px;
            padding-right: 10px;
        }

        .hgui-console-window {
            min-width: 0;
            width: calc(100vw - 20px);
            height: calc(100vh - 20px);
        }
    }
    `;

      document.head.appendChild(consoleStyles);

      // Create Console Page
      const consolePage = document.createElement("div");
      consolePage.id = "consoleGUI";
      consolePage.className = "hgui-console-panel";

      consolePage.innerHTML = `
    <div class="hgui-console-frame">

        <div class="hgui-console-titlebar">
            <div class="hgui-console-titlegroup">
                <div class="hgui-console-lights" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div class="hgui-console-titletext">
                    <strong>HEXHACK</strong>
                    <span>WEB TERMINAL</span>
                </div>
            </div>

            <div class="hgui-console-title-actions">
                <span class="hgui-console-mode">ATTACHED</span>

                <button
                    class="hgui-console-launch"
                    type="button"
                    aria-label="Detach console"
                    title="Detach console"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M14 3h7v7M21 3 12 12M18 13v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h5"/>
                    </svg>
                </button>
            </div>
        </div>

        <div class="hgui-console-content"></div>

    </div>
`;

      slider.appendChild(consolePage);

      const consoleContent = consolePage.querySelector(".hgui-console-content");

      consoleContent.innerHTML = `
    <div
        class="hgui-console-log"
        role="log"
        aria-live="polite"
        aria-label="Console output"
    ></div>

    <div class="hgui-console-input-row">
        <span class="hgui-console-prompt" aria-hidden="true">
            hexhack@web:~$
        </span>

        <div class="hgui-console-editor">
            <div
                class="hgui-console-highlight"
                aria-hidden="true"
            ></div>

            <input
                class="hgui-console-input"
                type="text"
                autocomplete="off"
                autocapitalize="off"
                spellcheck="false"
                aria-label="Console command"
            >
        </div>
    </div>

    <div class="hgui-console-status">
        <span class="hgui-console-status-left">
            <i></i>
            <b>READY</b>
        </span>

        <span class="hgui-console-status-right">
            SCROLLBACK 0 • HISTORY 0
        </span>
    </div>
`;

      const consoleLog = consoleContent.querySelector(".hgui-console-log");

      const consoleInput = consoleContent.querySelector(".hgui-console-input");

      const consoleHighlight = consoleContent.querySelector(
        ".hgui-console-highlight",
      );

      const consoleLaunch = consolePage.querySelector(".hgui-console-launch");

      const consoleMode = consolePage.querySelector(".hgui-console-mode");

      const consoleWindow = document.createElement("div");

      consoleWindow.id = "consoleWindowGUI";
      consoleWindow.className = "hgui-console-window";
      consoleWindow.style.display = "none";

      consoleWindow.innerHTML = `
    <div class="hgui-console-titlebar hgui-console-titlebar-detached">

        <div class="hgui-console-titlegroup">
            <div class="hgui-console-lights" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div class="hgui-console-titletext">
                <strong>HEXHACK</strong>
                <span>WEB TERMINAL</span>
            </div>
        </div>

        <div class="hgui-console-title-actions">
            <span class="hgui-console-mode">DETACHED</span>

            <button
                class="hgui-console-launch"
                type="button"
                aria-label="Return console to GUI"
                title="Return console to GUI"
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 3h7v7M21 3 12 12M18 13v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h5"/>
                </svg>
            </button>
        </div>

    </div>
`;

      document.body.appendChild(consoleWindow);

      const detachedTitle = consoleWindow.querySelector(
        ".hgui-console-titlebar",
      );

      const detachedLaunch = consoleWindow.querySelector(
        ".hgui-console-launch",
      );

      consoleWindow.appendChild(consoleContent);

      let consoleDetached = false;
      let consoleWindowPositioned = false;

      const consoleHistory = [];
      let consoleHistoryIndex = 0;

      const MAX_SCROLLBACK = 750;

      window.HGUI_REGISTRY = window.HGUI_REGISTRY || {
        util: {},
        vfx: {},
      };

      window.HGUI_ACTIVE_TIMERS = window.HGUI_ACTIVE_TIMERS || {
        util: {},
        vfx: {},
      };

      const escapeConsoleHtml = (value) =>
        String(value).replace(
          /[&<>"']/g,
          (character) =>
            ({
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
            })[character],
        );

      const isLogNearBottom = () =>
        consoleLog.scrollHeight -
          consoleLog.scrollTop -
          consoleLog.clientHeight <
        36;

      const updateConsoleStatus = (state = "READY") => {
        const stateText = consoleContent.querySelector(
          ".hgui-console-status-left b",
        );

        const metaText = consoleContent.querySelector(
          ".hgui-console-status-right",
        );

        if (stateText) {
          stateText.textContent = state;
        }

        if (metaText) {
          metaText.textContent = `SCROLLBACK ${consoleLog.childElementCount} • HISTORY ${consoleHistory.length}`;
        }
      };

      const logConsole = (message, type = "output") => {
        const stickToBottom = isLogNearBottom();

        const lines = String(message).split("\n");

        lines.forEach((part) => {
          const line = document.createElement("div");

          line.className = `hgui-console-line hgui-console-${type}`;

          line.textContent = part;

          consoleLog.appendChild(line);
        });

        while (consoleLog.childElementCount > MAX_SCROLLBACK) {
          consoleLog.firstElementChild?.remove();
        }

        if (stickToBottom) {
          consoleLog.scrollTop = consoleLog.scrollHeight;
        }

        updateConsoleStatus();
      };

      const writeConsoleCommand = (raw) => {
        const line = document.createElement("div");

        line.className = "hgui-console-line hgui-console-command-line";

        const prompt = document.createElement("span");

        prompt.className = "hgui-console-command-prompt";

        prompt.textContent = "hexhack@web:~$";

        const command = document.createElement("span");

        command.className = "hgui-console-command-text";

        command.textContent = ` ${raw}`;

        line.append(prompt, command);

        consoleLog.appendChild(line);

        consoleLog.scrollTop = consoleLog.scrollHeight;

        updateConsoleStatus();
      };

      const clearConsoleOutput = () => {
        consoleLog.replaceChildren();

        updateConsoleStatus();
      };

      const updateConsoleHighlight = () => {
        const value = consoleInput.value;

        if (!value) {
          consoleHighlight.innerHTML = "";
          return;
        }

        const tokens = value.split(/(\s+)/);

        let tokenIndex = 0;
        let previousToken = "";

        consoleHighlight.innerHTML = tokens
          .map((token) => {
            if (/^\s+$/.test(token)) {
              return escapeConsoleHtml(token);
            }

            const lower = token.toLowerCase();

            let className = "syntax-argument";

            if (tokenIndex === 0) {
              const validCommands = [
                "help",
                "list",
                "stop",
                "clear",
                "cls",
                "history",
                "util",
                "vfx",
              ];

              className = validCommands.includes(lower)
                ? "syntax-command"
                : "syntax-invalid";
            } else if (lower === "t" || lower === "time") {
              className = "syntax-flag";
            } else if (lower === "util" || lower === "vfx" || lower === "all") {
              className = "syntax-keyword";
            } else if (
              /^-?\d+(?:\.\d+)?$/.test(token) &&
              (previousToken === "t" || previousToken === "time")
            ) {
              className = "syntax-number";
            } else if (token.startsWith("-")) {
              className = "syntax-argument";
            }

            previousToken = lower;
            tokenIndex++;

            return `
                <span class="${className}">
                    ${escapeConsoleHtml(token)}
                </span>
            `;
          })
          .join("");
      };

      consoleInput.addEventListener("scroll", () => {
        consoleHighlight.scrollLeft = consoleInput.scrollLeft;
      });

      const clearConsoleTimers = (pageKey) => {
        const timers = window.HGUI_ACTIVE_TIMERS[pageKey] || {};

        Object.values(timers).forEach((timerId) => clearTimeout(timerId));

        window.HGUI_ACTIVE_TIMERS[pageKey] = {};
      };

      const trackConsoleTimer = (pageKey, slug, timerId) => {
        const timers =
          window.HGUI_ACTIVE_TIMERS[pageKey] ||
          (window.HGUI_ACTIVE_TIMERS[pageKey] = {});

        if (timers[slug]) {
          clearTimeout(timers[slug]);
        }

        timers[slug] = timerId;
      };

      const pageStopSlug = (pageKey) =>
        pageKey === "vfx" ? "stopall" : "stopallutilities";

      const stopConsolePage = (pageKey) => {
        clearConsoleTimers(pageKey);

        const stopEntry =
          window.HGUI_REGISTRY[pageKey]?.[pageStopSlug(pageKey)];

        if (stopEntry) {
          stopEntry.on();
        }
      };

      const runConsoleCommand = (pageKey, slug, seconds) => {
        const entry = window.HGUI_REGISTRY[pageKey]?.[slug];

        if (!entry) {
          logConsole(
            `Unknown command "${slug}" on ${pageKey}. Try 'list ${pageKey}'.`,
            "error",
          );

          return;
        }

        entry.on();

        logConsole(
          `executed ${entry.label} on ${pageKey}` +
            (seconds !== undefined ? ` • timeout ${seconds}s` : ""),
          "success",
        );

        if (seconds === undefined) {
          return;
        }

        if (!entry.off && pageKey !== "vfx") {
          logConsole(
            `${entry.label} has no auto-revert; action remains active.`,
            "warning",
          );

          return;
        }

        const timerId = setTimeout(() => {
          delete window.HGUI_ACTIVE_TIMERS[pageKey][slug];

          if (entry.off) {
            entry.off();
          } else {
            stopConsolePage(pageKey);
          }

          logConsole(`${entry.label} reverted • ${seconds}s elapsed`, "output");
        }, seconds * 1000);

        trackConsoleTimer(pageKey, slug, timerId);
      };

      const listConsoleSlugs = (pageKey) => {
        const slugs = Object.keys(window.HGUI_REGISTRY[pageKey] || {}).filter(
          (slug) => !slug.startsWith("stopall"),
        );

        return slugs.join(", ") || "(none)";
      };

      const printHelp = () => {
        logConsole("HexHack Web Terminal", "system");

        logConsole("help                 show this help", "output");

        logConsole("list [util|vfx]      list available commands", "output");

        logConsole("util -<command>      run a utility effect", "output");

        logConsole("vfx -<command>       run a visual effect", "output");

        logConsole(
          "  t -<seconds>       automatically revert when supported",
          "output",
        );

        logConsole("stop [util|vfx|all]  stop active effects/timers", "output");

        logConsole("history              show command history", "output");

        logConsole("clear / cls          clear scrollback", "output");

        logConsole("Tab                  autocomplete commands", "output");

        logConsole(
          "Ctrl+L               clear scrollback   •   Ctrl+C cancel line",
          "output",
        );

        logConsole("Example: vfx -glitch t -20", "system");
      };

      const printHistory = () => {
        if (!consoleHistory.length) {
          logConsole("No commands in history.", "warning");

          return;
        }

        consoleHistory.forEach((commandText, index) => {
          logConsole(
            `${String(index + 1).padStart(3, " ")}  ${commandText}`,
            "output",
          );
        });
      };

      const completeConsoleInput = () => {
        const value = consoleInput.value;

        if (consoleInput.selectionStart !== value.length) {
          return false;
        }

        if (/\s$/.test(value)) {
          return false;
        }

        const parts = value.trimStart().split(/\s+/);

        const partial = parts[parts.length - 1] || "";

        let candidates = [
          "help",
          "list",
          "stop",
          "clear",
          "cls",
          "history",
          "util",
          "vfx",
        ];

        if (
          parts.length >= 2 &&
          (parts[0].toLowerCase() === "util" ||
            parts[0].toLowerCase() === "vfx")
        ) {
          const pageKey = parts[0].toLowerCase();

          candidates = Object.keys(window.HGUI_REGISTRY[pageKey] || {})
            .filter((slug) => !slug.startsWith("stopall"))
            .map((slug) => `-${slug}`);
        }

        const matches = candidates.filter((candidate) =>
          candidate.toLowerCase().startsWith(partial.toLowerCase()),
        );

        if (matches.length !== 1) {
          if (matches.length > 1) {
            logConsole(matches.join("    "), "dim");
          }

          return false;
        }

        const replacement = matches[0];

        const prefix = value.slice(0, value.length - partial.length);

        consoleInput.value = prefix + replacement + " ";

        updateConsoleHighlight();

        return true;
      };

      const parseAndRun = (rawString) => {
        const raw = rawString.trim();

        if (!raw) {
          return;
        }

        writeConsoleCommand(raw);

        const tokens = raw.split(/\s+/);

        const command = tokens[0].toLowerCase();

        /* clear / cls */

        if (command === "cls" || command === "clear") {
          clearConsoleOutput();
          return;
        }

        /* help */

        if (command === "help") {
          printHelp();
          return;
        }

        /* history */

        if (command === "history") {
          printHistory();
          return;
        }

        /* list */

        if (command === "list") {
          const requestedPage = tokens[1]?.toLowerCase();

          if (requestedPage && !["util", "vfx"].includes(requestedPage)) {
            logConsole(`Unknown page "${tokens[1]}". Try: util, vfx`, "error");

            return;
          }

          (requestedPage ? [requestedPage] : ["util", "vfx"]).forEach(
            (pageKey) => {
              logConsole(`${pageKey}: ${listConsoleSlugs(pageKey)}`, "output");
            },
          );

          return;
        }

        /* stop */

        if (command === "stop") {
          const requestedPage = tokens[1]?.toLowerCase();

          if (requestedPage === "all" || !requestedPage) {
            ["util", "vfx"].forEach(stopConsolePage);
          } else if (["util", "vfx"].includes(requestedPage)) {
            stopConsolePage(requestedPage);
          } else {
            logConsole(
              `Unknown page "${tokens[1]}". Try: util, vfx, all`,
              "error",
            );

            return;
          }

          logConsole("stop complete", "success");

          return;
        }

        /* page command */

        const pageKey = command;

        if (!["util", "vfx"].includes(pageKey)) {
          logConsole(`Unknown command "${tokens[0]}". Try 'help'.`, "error");

          return;
        }

        /* effect slug */

        const slug = (tokens[1] || "")
          .replace(/^-+/, "")
          .toLowerCase()
          .replace(/[\s-]+/g, "");

        if (!slug || !window.HGUI_REGISTRY[pageKey]?.[slug]) {
          logConsole(
            `Unknown command "${tokens[1] || ""}" on ${pageKey}. Try 'list ${pageKey}'.`,
            "error",
          );

          return;
        }

        /* optional timer */

        let seconds;

        if (
          tokens[2]?.toLowerCase() === "t" ||
          tokens[2]?.toLowerCase() === "time"
        ) {
          const value = Number((tokens[3] || "").replace(/^-+/, ""));

          if (!Number.isFinite(value) || value < 0) {
            logConsole("Expected a non-negative number after 't'.", "error");

            return;
          }

          seconds = value;
        }

        runConsoleCommand(pageKey, slug, seconds);
      };

      const clampConsoleWindow = () => {
        if (consoleWindow.style.display === "none") {
          return;
        }

        const margin = 10;

        const width = consoleWindow.offsetWidth;

        const height = consoleWindow.offsetHeight;

        const maxLeft = Math.max(margin, innerWidth - width - margin);

        const maxTop = Math.max(margin, innerHeight - height - margin);

        const left = Math.max(
          margin,
          Math.min(parseFloat(consoleWindow.style.left) || margin, maxLeft),
        );

        const top = Math.max(
          margin,
          Math.min(parseFloat(consoleWindow.style.top) || margin, maxTop),
        );

        consoleWindow.style.left = `${left}px`;

        consoleWindow.style.top = `${top}px`;
      };

      const setConsoleDetached = (detached) => {
        consoleDetached = detached;

        if (detached) {
          if (!consoleWindowPositioned) {
            const width = Math.min(780, innerWidth - 20);

            const height = Math.min(480, innerHeight - 20);

            consoleWindow.style.width = `${width}px`;

            consoleWindow.style.height = `${height}px`;

            consoleWindow.style.left = `${Math.max(
              10,
              (innerWidth - width) / 2,
            )}px`;

            consoleWindow.style.top = `${Math.max(
              10,
              (innerHeight - height) / 2,
            )}px`;

            consoleWindowPositioned = true;
          }

          consoleWindow.appendChild(consoleContent);

          consoleWindow.style.display = "flex";

          consoleMode.textContent = "ATTACHED";

          consoleWindow.querySelector(".hgui-console-mode").textContent =
            "DETACHED";

          consoleLaunch.title = "Return console to GUI";

          consoleLaunch.setAttribute("aria-label", "Return console to GUI");

          clampConsoleWindow();

          requestAnimationFrame(() => consoleInput.focus());
        } else {
          const frame = consolePage.querySelector(".hgui-console-frame");

          frame.appendChild(consoleContent);

          consoleWindow.style.display = "none";

          consoleMode.textContent = "ATTACHED";

          consoleLaunch.title = "Detach console";

          consoleLaunch.setAttribute("aria-label", "Detach console");

          if (page === 3) {
            requestAnimationFrame(() => consoleInput.focus());
          }
        }

        updateConsoleStatus();

        resizeToContent();
      };

      consoleLaunch.addEventListener("click", () => setConsoleDetached(true));

      detachedLaunch.addEventListener("click", () => setConsoleDetached(false));

      let dragX = 0;
      let dragY = 0;

      detachedTitle.addEventListener("pointerdown", (event) => {
        if (event.target.closest("button")) {
          return;
        }

        const rect = consoleWindow.getBoundingClientRect();

        dragX = event.clientX - rect.left;

        dragY = event.clientY - rect.top;

        const drag = (moveEvent) => {
          consoleWindow.style.left = `${moveEvent.clientX - dragX}px`;

          consoleWindow.style.top = `${moveEvent.clientY - dragY}px`;

          clampConsoleWindow();
        };

        const stop = () => {
          document.removeEventListener("pointermove", drag);

          document.removeEventListener("pointerup", stop);
        };

        document.addEventListener("pointermove", drag);

        document.addEventListener("pointerup", stop, { once: true });
      });

      window.addEventListener("resize", clampConsoleWindow);

      if (window.ResizeObserver) {
        new ResizeObserver(clampConsoleWindow).observe(consoleWindow);
      }

      consoleInput.addEventListener("keydown", (event) => {
        /* ENTER */

        if (event.key === "Enter") {
          const value = consoleInput.value;

          if (value.trim()) {
            consoleHistory.push(value);

            consoleHistoryIndex = consoleHistory.length;
          }

          parseAndRun(value);

          consoleInput.value = "";

          updateConsoleHighlight();

          return;
        }

        /* TAB AUTOCOMPLETE */

        if (event.key === "Tab") {
          event.preventDefault();

          completeConsoleInput();

          return;
        }

        /* HISTORY UP */

        if (event.key === "ArrowUp" && consoleHistoryIndex > 0) {
          event.preventDefault();

          consoleInput.value = consoleHistory[--consoleHistoryIndex];

          updateConsoleHighlight();

          requestAnimationFrame(() => {
            consoleInput.setSelectionRange(
              consoleInput.value.length,
              consoleInput.value.length,
            );
          });

          return;
        }

        /* HISTORY DOWN */

        if (event.key === "ArrowDown") {
          event.preventDefault();

          consoleHistoryIndex = Math.min(
            consoleHistory.length,
            consoleHistoryIndex + 1,
          );

          consoleInput.value = consoleHistory[consoleHistoryIndex] || "";

          updateConsoleHighlight();

          requestAnimationFrame(() => {
            consoleInput.setSelectionRange(
              consoleInput.value.length,
              consoleInput.value.length,
            );
          });

          return;
        }

        /* CTRL + L */

        if (event.ctrlKey && event.key.toLowerCase() === "l") {
          event.preventDefault();

          clearConsoleOutput();

          return;
        }

        /* CTRL + C */

        if (event.ctrlKey && event.key.toLowerCase() === "c") {
          event.preventDefault();

          if (consoleInput.value) {
            writeConsoleCommand(`${consoleInput.value}^C`);

            consoleInput.value = "";

            updateConsoleHighlight();
          } else {
            logConsole("^C", "dim");
          }

          return;
        }

        /* PAGE UP */

        if (event.key === "PageUp") {
          event.preventDefault();

          consoleLog.scrollTop -= consoleLog.clientHeight * 0.85;

          return;
        }

        /* PAGE DOWN */

        if (event.key === "PageDown") {
          event.preventDefault();

          consoleLog.scrollTop += consoleLog.clientHeight * 0.85;
        }
      });

      consoleInput.addEventListener("input", updateConsoleHighlight);

      consoleContent.addEventListener("pointerdown", (event) => {
        if (!event.target.closest("button") && event.target !== consoleInput) {
          requestAnimationFrame(() => consoleInput.focus());
        }
      });

      const focusConsole = () => {
        if (page === 3 && !consoleDetached) {
          consoleInput.focus();
        }
      };

      updateConsoleHighlight();
      updateConsoleStatus();

      logConsole("HexHack Console ready. Type 'help' for commands.", "system");
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
   .hgui-console-log {
   flex: 1;
   min-height: 130px;
   overflow-y: auto;
   padding: 8px;
    background: var(--console-bg);
   border: 1px solid var(--gui-border);
   color: var(--console-text);
   font: 12px/1.45 Consolas, monospace;
   white-space: pre-wrap;
   overflow-wrap: anywhere;
   }
   .hgui-console-input-row {
   display: flex;
   align-items: center;
   gap: 6px;
   margin-top: 8px;
  position: relative;
   color: var(--console-text);
   font: 13px Consolas, monospace;
   }
  .hgui-console-highlight {
  position: absolute;
  left: 18px;
  right: 0;
  top: 1px;
  bottom: 1px;
  padding: 6px;
  box-sizing: border-box;
  overflow: hidden;
  white-space: pre;
  pointer-events: none;
  font: 13px Consolas, monospace;
  line-height: normal;
  }
  .hgui-console-highlight .syntax-command {
  color: var(--console-command);
  }
  .hgui-console-highlight .syntax-argument {
  color: var(--console-secondary);
  }
   .hgui-console-input {
   flex: 1;
   min-width: 0;
   box-sizing: border-box;
   padding: 6px;
  background: transparent;
   border: 1px solid var(--gui-border);
  color: transparent;
   caret-color: var(--gui-border);
   outline: none;
   font: 13px Consolas, monospace;
  position: relative;
  z-index: 1;
   }
   .hgui-console-input:focus {
   outline: 1px solid var(--gui-border);
   }
   .hgui-console-error {
   color: #ff9b9b;
   }
   .hgui-console-title {
   display: flex;
   align-items: center;
   justify-content: center;
   position: relative;
   }
   .hgui-console-launch {
   position: absolute;
   right: 0;
   top: -4px;
   width: 24px;
   height: 24px;
   padding: 2px;
   border: 1px solid var(--gui-border);
   border-radius: 4px;
   background: var(--btn-bg);
   color: var(--console-text);
   cursor: pointer;
   }
   .hgui-console-launch svg {
   display: block;
   width: 100%;
   height: 100%;
   }
   .hgui-console-window {
   position: fixed;
   top: 90px;
   left: 420px;
   z-index: 10000000;
   display: flex;
   flex-direction: column;
   width: 360px;
  min-width: 260px;
   min-height: 260px;
  max-width: calc(100vw - 20px);
  max-height: calc(100vh - 20px);
  resize: both;
  overflow: hidden;
   padding: 10px;
   box-sizing: border-box;
   background: var(--gui-bg);
   border: 2px solid var(--gui-border);
   border-radius: 10px;
   color: var(--console-text);
   font-family: Consolas, monospace;
   box-shadow: 0 0 20px var(--gui-border);
   }
   .hgui-console-window .hgui-console-title {
   cursor: move;
   margin-bottom: 10px;
   }
   .hgui-console-window .hgui-console-log {
   min-height: 190px;
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
        return btn;
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
        default: {
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
          fcsBackground: "#001f00",
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
          buttonHoverShadow:
            "inset 0 0 6px rgba(0,0,0,0.4), 0 0 10px rgba(0,0,0,0.45)",
          navColor: "#000000",
          fcsBackground: "#33ff33",
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
          buttonHoverShadow:
            "inset 0 0 8px rgba(0,229,255,0.7), 0 0 14px rgba(0,229,255,0.6)",
          navColor: "#66f7ff",
          fcsBackground: "#001a22",
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
          buttonHoverShadow:
            "inset 0 0 5px rgba(58,111,143,0.20), 0 0 6px rgba(58,111,143,0.20)",
          navColor: "#2c4e63",
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
          buttonHoverShadow:
            "inset 0 0 5px rgba(58,111,143,0.35), 0 0 8px rgba(58,111,143,0.35)",
          navColor: "#b8cbd8",
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
          buttonHoverShadow:
            "inset 0 0 6px rgba(28,163,236,0.5), 0 0 10px rgba(28,163,236,0.45)",
          navColor: "#8ad8ff",
          fcsBackground: "#061722",
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
          buttonHoverShadow:
            "inset 0 0 6px rgba(63,163,77,0.5), 0 0 10px rgba(63,163,77,0.5)",
          navColor: "#8be3a1",
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
          buttonHoverShadow:
            "inset 0 0 6px rgba(255,122,60,0.5), 0 0 10px rgba(255,122,60,0.5)",
          navColor: "#ffb07c",
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
          buttonHoverShadow:
            "inset 0 0 6px rgba(169,112,255,0.5), 0 0 10px rgba(169,112,255,0.5)",
          navColor: "#caa7ff",
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
          buttonHoverShadow:
            "inset 0 0 6px rgba(255,154,92,0.35), 0 0 8px rgba(255,154,92,0.35)",
          navColor: "#8a4f2a",
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
          buttonHoverShadow:
            "inset 0 0 6px rgba(255,255,255,0.4), 0 0 10px rgba(255,255,255,0.25)",
          navColor: "#ffffff",
          fcsBackground: "rgba(255,255,255,0.06)",
          fontFamily: "inherit",
        },
        synthwave: {
          guiBackground: "#0a001a",
          borderColor: "#00fff9",
          textColor: "#ff00ff",
          shadowColor: "rgba(0,255,255,0.85)",
          titleBackground: "rgb(127,17,224,0.35)",
          titleTextShadow:
            "0 0 20px #ff00ff, 0 0 30px #00fff9, 0 0 50px #ff00ff",
          buttonBackground: "#1a001a",
          buttonHoverBackground: "rgba(255,0,255,0.25)",
          buttonHoverShadow:
            "inset 0 0 10px rgba(0,255,255,1), 0 0 25px rgba(255,255,0,1), 0 0 40px #ff00ff",
          navColor: "#ff33ff",
          fcsBackground: "#000022",
        },
        cyberpunk: {
          guiBackground: "#0a0c14",
          borderColor: "#00ffe0",
          textColor: "#f0ff4d",
          shadowColor: "rgba(0,255,224,0.4)",
          titleBackground:
            "linear-gradient(90deg, rgba(0,255,224,0.15), rgba(255,255,77,0.15))",
          titleTextShadow:
            "0 0 5px #00ffe0, 0 0 10px #f0ff4d, 0 0 20px rgba(255,255,77,0.7)",
          buttonBackground: "#11121a",
          buttonHoverBackground:
            "linear-gradient(90deg, rgba(0,255,224,0.2), rgba(255,255,77,0.2))",
          buttonHoverShadow:
            "inset 0 0 8px rgba(0,255,224,0.6), 0 0 12px rgba(255,255,77,0.7), 0 0 20px rgba(0,255,224,0.5)",
          navColor: "linear-gradient(90deg, #00ffe0, #f0ff4d)",
        },
      };
      const applyTheme = (themeName) => {
        const theme = themeConfigs[themeName] || themeConfigs["default"];
        gui.style.setProperty("--gui-bg", theme.guiBackground);
        gui.style.setProperty("--gui-border", theme.borderColor);
        gui.style.setProperty("--gui-text", theme.textColor);
        gui.style.setProperty(
          "--console-bg",
          themeName === "light"
            ? "#26343d"
            : themeName === "inverted"
              ? "#052005"
              : "#000",
        );
        gui.style.setProperty(
          "--console-text",
          themeName === "light" || themeName === "inverted"
            ? "#f4fbff"
            : theme.textColor,
        );
        consoleWindow.style.setProperty("--gui-bg", theme.guiBackground);
        consoleWindow.style.setProperty("--gui-border", theme.borderColor);
        consoleWindow.style.setProperty(
          "--console-bg",
          themeName === "light"
            ? "#26343d"
            : themeName === "inverted"
              ? "#052005"
              : "#000",
        );
        consoleWindow.style.setProperty(
          "--console-text",
          themeName === "light" || themeName === "inverted"
            ? "#f4fbff"
            : theme.textColor,
        );
        const consoleSecondary =
          themeName === "default"
            ? "#8ab4f8"
            : themeName === "light"
              ? "#2c4e63"
              : theme.borderColor;
        gui.style.setProperty("--console-command", theme.textColor);
        gui.style.setProperty("--console-secondary", consoleSecondary);
        consoleWindow.style.setProperty("--console-command", theme.textColor);
        consoleWindow.style.setProperty(
          "--console-secondary",
          consoleSecondary,
        );
        consoleWindow.style.setProperty("--btn-bg", theme.buttonBackground);
        gui.style.setProperty("--btn-bg", theme.buttonBackground);
        gui.style.setProperty("--btn-hover-bg", theme.buttonHoverBackground);
        gui.style.setProperty("--btn-hover-shadow", theme.buttonHoverShadow);
        gui.style.background = theme.guiBackground;
        gui.style.boxShadow = `0 0 20px ${theme.shadowColor}`;
        masterTitle.style.background = theme.titleBackground;
        masterTitle.style.color = theme.textColor;
        masterTitle.style.textShadow = theme.titleTextShadow;
        document.querySelectorAll("#prevPage, #nextPage").forEach((btn) => {
          btn.style.color = theme.navColor;
        });
      };
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
      const totalPages = 4;
      const moveToPage = () => {
        slider.style.transform = `translate3d(-${page * gui.clientWidth}px, 0, 0)`;
        resizeToContent();
        focusConsole();
      };
      const resizeToContent = () => {
        const pages = [util, vfx, themes, consolePage];
        const activePage = pages[page] || util;
        const contentHeight =
          activePage.scrollHeight + masterTitle.offsetHeight + 26;
        gui.style.height = `${contentHeight}px`;
      };
      const queueResize = () => requestAnimationFrame(resizeToContent);
      [util, vfx, themes, consolePage].forEach((panel) => {
        const observer = new MutationObserver(queueResize);
        observer.observe(panel.querySelector(".btnGrid") || panel, {
          childList: true,
          subtree: true,
        });
      });
      window.addEventListener("load", queueResize, {
        once: true,
      });
      window.addEventListener("resize", queueResize);
      document.getElementById("prevPage").onclick = () => {
        page = Math.max(0, page - 1);
        moveToPage();
      };
      document.getElementById("nextPage").onclick = () => {
        page = Math.min(totalPages - 1, page + 1);
        moveToPage();
      };
      window.util = util.querySelector(".btnGrid");
      window.vfx = vfx.querySelector(".btnGrid");
      window.themes = themes.querySelector(".btnGrid");
      Object.keys(themeConfigs).forEach((themeName) => {
        const displayName =
          themeName.charAt(0).toUpperCase() + themeName.slice(1);
        const theme = themeConfigs[themeName];
        const themeBtn = window.addBtn(themes, displayName, () =>
          applyTheme(themeName),
        );
        themeBtn.classList.add("themePreviewBtn");
        themeBtn.style.setProperty("--preview-btn-bg", theme.buttonBackground);
        themeBtn.style.setProperty(
          "--preview-btn-hover-bg",
          theme.buttonHoverBackground || theme.buttonBackground,
        );
        themeBtn.style.setProperty(
          "--preview-btn-hover-shadow",
          theme.buttonHoverShadow || `0 0 8px ${theme.shadowColor}`,
        );
        themeBtn.style.setProperty("--preview-border", theme.borderColor);
        themeBtn.style.setProperty("--preview-text", theme.textColor);
        themeBtn.style.setProperty(
          "--preview-shadow",
          theme.shadowColor || theme.borderColor,
        );
      });
      applyTheme("default");
      resizeToContent();
      moveToPage();
    })();
    // -------------------- IMMUNITY HELPER --------------------
    window.isImmune = function (el) {
      if (!el) return false;
      const protectedRoots = [
        document.getElementById("mainGUI"),
        document.getElementById("utilitiesGUI"),
        document.getElementById("vfxGUI"),
        document.getElementById("themesGUI"),
        document.getElementById("consoleGUI"),
        document.getElementById("consoleWindowGUI"),
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
        document.head.appendChild(s);
      }
      // ---------- addBtn helper ----------
      function addBtn(container, name, on, off) {
        const b = document.createElement("button");
        b.className = "hgui-btn";
        b.innerText = name;
        container.appendChild(b);
        if (!window.HGUI_REGISTRY)
          window.HGUI_REGISTRY = {
            util: {},
            vfx: {},
          };
        const slug = name.toLowerCase().replace(/[\s-]+/g, "");
        window.HGUI_REGISTRY.util[slug] = {
          label: name,
          on,
          off,
          el: b,
        };
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
            setTimeout(() => p.remove(), 2e3);
          }, 150); // emit particle every 150ms
        });
        // Stop emitting when mouse leaves
        b.addEventListener("mouseleave", () => {
          clearInterval(particleInterval);
        });
        b.addEventListener("click", on);
        if (off) {
          if (!window._hgui_activeUtilities) window._hgui_activeUtilities = {};
          window._hgui_activeUtilities[name] = {
            on: on,
            off: off,
          };
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
      addBtn(
        util,
        "Developer Console",
        () => {
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
      addBtn(
        util,
        "Invert Page",
        () => {
          document.body.style.filter = "invert(1)";
        },
        () => {
          document.body.style.filter = "";
        },
      );
      // Calculator
      addBtn(util, "Calculator", () => {
        // From my other project "MathLab": https://github.com/Alex236508/Math-Lab
        (function () {
          if (document.getElementById("mathLab")) return;
          let functions2D = [];
          let offsetX = 0;
          let offsetY = 0;
          const GRAPH_MIN = -10;
          const GRAPH_MAX = 10;
          const GRAPH3D_MIN = -10;
          const GRAPH3D_MAX = 10;
          const style = document.createElement("style");
          style.textContent = `
         #mathLab{
         position:fixed;
         top:120px;
         left:120px;
         width:420px;
         background:#1e1e1e;
         border-radius:12px;
         font-family:Arial;
         box-shadow:0 20px 40px rgba(0,0,0,.5);
         resize:both;
         overflow:hidden;
         z-index:999999;
         }
         #graphLab{
         position:fixed;
         top:120px;
         left:560px;
         width:420px;
         background:#1e1e1e;
         border-radius:12px;
         font-family:Arial;
         box-shadow:0 20px 40px rgba(0,0,0,.5);
         resize:both;
         overflow:hidden;
         z-index:999998;
         display:none;
         }
         #graphLab.open{display:block;}
         #header{
         background:#2a2a2a;
         color:white;
         padding:10px;
         text-align:center;
         cursor:move;
         font-weight:bold;
         }
         #graphHeader{
         background:#2a2a2a;
         color:white;
         padding:10px;
         text-align:center;
         cursor:move;
         font-weight:bold;
         }
         #graphControls{
         display:flex;
         gap:8px;
         padding:8px;
         background:#1a1a1a;
         }
         .graphBtn{
         flex:1;
         padding:8px;
         border:none;
         border-radius:6px;
         background:#2c2c2c;
         color:white;
         cursor:pointer;
         }
         .graphBtn.active,
         .graphBtn:hover{background:#3f3f3f}
         .graphBtn.warn{background:#5a2d2d}
         .graphBtn.warn:hover{background:#7a3b3b}
         #display{
         width:calc(100% - 20px);
         margin:10px;
         padding:12px;
         font-size:20px;
         background:#111;
         color:#00ff9d;
         border:none;
         border-radius:6px;
         outline:none;
         text-align:right;
         }
         #buttons{
         display:grid;
         grid-template-columns:repeat(6,1fr);
         gap:6px;
         padding:10px;
         }
         .btn{
         padding:10px;
         border:none;
         border-radius:6px;
         background:#333;
         color:white;
         cursor:pointer;
         font-size:14px;
         }
         .btn:hover{background:#555;}
         #sidebar{
         position:absolute;
         top:0;
         left:-130px;
         width:130px;
         height:100%;
         background:#151515;
         transition:left .35s ease;
         display:flex;
         flex-direction:column;
         padding-top:40px;
         z-index:1000000;
         }
         #mathLab.sidebar-open #sidebar{
         left:0;
         }
         #sidebarHandle{
         position:absolute;
         top:0;
         left:0;
         width:12px;
         height:100%;
         background:#151515;
         cursor:ew-resize;
         z-index:1000002;
         border-top-left-radius:12px;
         border-bottom-left-radius:12px;
         }
         #sidebarHandle:after{
         content:'';
         position:absolute;
         top:50%;
         left:50%;
         width:4px;
         height:56px;
         transform:translate(-50%,-50%);
         background:#2a2a2a;
         border-radius:3px;
         opacity:.9;
         }
         #mathLab.sidebar-open #sidebarHandle{
         background:#2a2a2a;
         }
         .sidebtn{
         margin:6px;
         padding:10px;
         border:none;
         border-radius:6px;
         background:#2c2c2c;
         color:white;
         cursor:pointer;
         }
         .sidebtn:hover{background:#444}
         .graphArea{
         display:none;
         }
         .graphArea.open{
         display:block;
         }
         canvas{
         background:white;
         width:100%;
         height:260px;
         display:block;
         }
         #history{
         max-height:120px;
         overflow:auto;
         background:#111;
         color:#aaa;
         font-size:12px;
         padding:8px;
         }
         `;
          document.head.appendChild(style);
          const calc = document.createElement("div");
          calc.id = "mathLab";
          calc.innerHTML = `
         <div id="sidebar">
         <button class="sidebtn" id="sciBtn">Scientific</button>
         <button class="sidebtn" id="g2Btn">2D Graph</button>
         <button class="sidebtn" id="g3Btn">3D Graph</button>
         </div>
         <div id="sidebarHandle" title="Open sidebar"></div>
         <div id="header">Math Lab</div>
         <input id="display">
         <div id="buttons"></div>
         <div id="history"></div>
         </div>
         <div id="graphLab">
         <div id="graphHeader">Graph Lab</div>
         <div id="graphControls">
         <button class="graphBtn" id="show2D">2D</button>
         <button class="graphBtn" id="show3D">3D</button>
         <button class="graphBtn" id="undo2D">Undo 2D</button>
         <button class="graphBtn warn" id="clear2D">Clear 2D</button>
         <button class="graphBtn" id="hideGraph">Close</button>
         </div>
         <div id="graph2D" class="graphArea">
         <canvas id="canvas2D"></canvas>
         </div>
         <div id="graph3D" class="graphArea">
         <canvas id="canvas3D"></canvas>
         </div>
         `;
          document.body.appendChild(calc);
          const display = document.getElementById("display");
          const canvas2D = document.getElementById("canvas2D");
          const ctx2D = canvas2D.getContext("2d");
          const canvas3D = document.getElementById("canvas3D");
          let threePromise = null;
          let threeReady = false;
          let threeRenderer = null;
          let threeScene = null;
          let threeCamera = null;
          let threeSurfaceMesh = null;
          let threeSurfaceMaterial = null;
          const orbitState = {
            theta: 0.7,
            phi: 1.05,
            radius: 30,
          };
          let orbitDragging = false;
          let orbitStartX = 0;
          let orbitStartY = 0;
          const graphLab = document.getElementById("graphLab");
          const graph2D = document.getElementById("graph2D");
          const graph3D = document.getElementById("graph3D");
          const show2DButton = document.getElementById("show2D");
          const show3DButton = document.getElementById("show3D");
          const clear2DButton = document.getElementById("clear2D");
          const undo2DButton = document.getElementById("undo2D");
          const sidebarEl = document.getElementById("sidebar");
          const sidebarHandle = document.getElementById("sidebarHandle");
          const historyBox = document.getElementById("history");
          const layout = [
            "7",
            "8",
            "9",
            "/",
            "sin",
            "cos",
            "4",
            "5",
            "6",
            "*",
            "tan",
            "log",
            "1",
            "2",
            "3",
            "-",
            "ln",
            "√",
            "0",
            ".",
            "π",
            "+",
            "^",
            "x²",
            "(",
            ")",
            "!",
            "graph",
            "C",
            "=",
          ];
          layout.forEach((k) => {
            const b = document.createElement("button");
            b.textContent = k;
            b.className = "btn";
            document.getElementById("buttons").appendChild(b);
            b.onclick = () => handle(k);
          });

          function factorial(n) {
            let r = 1;
            for (let i = 1; i <= n; i++) r *= i;
            return r;
          }

          function insertImplicitMultiplication(expr) {
            return expr
              .replace(/(\d)([a-zA-Z])/g, "$1*$2")
              .replace(/([a-zA-Z])(\d)/g, "$1*$2")
              .replace(/(\))(\()/g, "$1*$2")
              .replace(/(\d)\(/g, "$1*(")
              .replace(/\)([a-zA-Z])/g, ")*$1")
              .replace(/([a-zA-Z])\(/g, "$1*(");
          }

          function parse(expr) {
            expr = insertImplicitMultiplication(expr);
            return expr
              .replace(/π/g, "Math.PI")
              .replace(/√/g, "Math.sqrt")
              .replace(/sin/g, "Math.sin")
              .replace(/cos/g, "Math.cos")
              .replace(/tan/g, "Math.tan")
              .replace(/log/g, "Math.log10")
              .replace(/ln/g, "Math.log")
              .replace(/\^/g, "**")
              .replace(/(\d+)!/g, (m, n) => factorial(Number(n)));
          }

          function normalizeGraphExpression(expr, variableName) {
            const text = String(expr || "").trim();
            if (!text) return "";
            const assignment = new RegExp(
              "^\\s*" + variableName + "\\s*=",
              "i",
            );
            return text.replace(assignment, "").trim();
          }

          function evaluate(expr) {
            try {
              return Function("return " + parse(expr))();
            } catch {
              return "Error";
            }
          }

          function activateGraph(mode) {
            show2DButton.classList.toggle("active", mode === "2d");
            show3DButton.classList.toggle("active", mode === "3d");
          }

          function open2D() {
            graphLab.classList.add("open");
            graph3D.classList.remove("open");
            graph2D.classList.add("open");
            activateGraph("2d");
            draw2D();
          }

          function open3D() {
            graphLab.classList.add("open");
            graph2D.classList.remove("open");
            graph3D.classList.add("open");
            activateGraph("3d");
            draw3D(display.value).catch(() => {});
          }

          function closeGraphs() {
            graphLab.classList.remove("open");
            graph2D.classList.remove("open");
            graph3D.classList.remove("open");
            activateGraph();
          }

          function drawGrid() {
            canvas2D.width = canvas2D.clientWidth;
            canvas2D.height = 260;
            ctx2D.clearRect(0, 0, canvas2D.width, canvas2D.height);
            ctx2D.fillStyle = "#fff";
            ctx2D.fillRect(0, 0, canvas2D.width, canvas2D.height);
            const marginLeft = 42;
            const marginRight = 14;
            const marginTop = 14;
            const marginBottom = 28;
            const plotLeft = marginLeft;
            const plotTop = marginTop;
            const plotWidth = canvas2D.width - marginLeft - marginRight;
            const plotHeight = canvas2D.height - marginTop - marginBottom;
            const plotRight = plotLeft + plotWidth;
            const plotBottom = plotTop + plotHeight;
            const xSpan = GRAPH_MAX - GRAPH_MIN;
            const ySpan = GRAPH_MAX - GRAPH_MIN;
            const pixelsPerUnitX = plotWidth / xSpan;
            const pixelsPerUnitY = plotHeight / ySpan;
            const centerX = (plotLeft + plotRight) / 2 + offsetX;
            const centerY = (plotTop + plotBottom) / 2 + offsetY;

            function toScreenX(x) {
              return centerX + x * pixelsPerUnitX;
            }

            function toScreenY(y) {
              return centerY - y * pixelsPerUnitY;
            }

            function toMathX(px) {
              return (px - centerX) / pixelsPerUnitX;
            }

            function toMathY(py) {
              return (centerY - py) / pixelsPerUnitY;
            }
            // Bounded plotting rectangle.
            ctx2D.strokeStyle = "#c8c8c8";
            ctx2D.lineWidth = 1;
            ctx2D.strokeRect(plotLeft, plotTop, plotWidth, plotHeight);
            // Integer grid lines in the current visible bounded window.
            const minGridX = Math.ceil(toMathX(plotLeft));
            const maxGridX = Math.floor(toMathX(plotRight));
            const minGridY = Math.ceil(toMathY(plotBottom));
            const maxGridY = Math.floor(toMathY(plotTop));
            ctx2D.strokeStyle = "#ececec";
            for (let x = minGridX; x <= maxGridX; x++) {
              const sx = toScreenX(x);
              ctx2D.beginPath();
              ctx2D.moveTo(sx, plotTop);
              ctx2D.lineTo(sx, plotBottom);
              ctx2D.stroke();
            }
            for (let y = minGridY; y <= maxGridY; y++) {
              const sy = toScreenY(y);
              ctx2D.beginPath();
              ctx2D.moveTo(plotLeft, sy);
              ctx2D.lineTo(plotRight, sy);
              ctx2D.stroke();
            }
            // Axes.
            const axisX = toScreenX(0);
            const axisY = toScreenY(0);
            const axisXVisible = axisX >= plotLeft && axisX <= plotRight;
            const axisYVisible = axisY >= plotTop && axisY <= plotBottom;
            ctx2D.strokeStyle = "#444";
            ctx2D.lineWidth = 1.5;
            if (axisXVisible) {
              ctx2D.beginPath();
              ctx2D.moveTo(axisX, plotTop);
              ctx2D.lineTo(axisX, plotBottom);
              ctx2D.stroke();
            }
            if (axisYVisible) {
              ctx2D.beginPath();
              ctx2D.moveTo(plotLeft, axisY);
              ctx2D.lineTo(plotRight, axisY);
              ctx2D.stroke();
            }
            // Tick marks and labels on visible axes.
            ctx2D.fillStyle = "#333";
            ctx2D.font = "11px Arial";
            ctx2D.textAlign = "center";
            ctx2D.textBaseline = "top";
            if (axisYVisible) {
              for (let x = minGridX; x <= maxGridX; x++) {
                if (x === 0) continue;
                const sx = toScreenX(x);
                ctx2D.beginPath();
                ctx2D.moveTo(sx, axisY - 4);
                ctx2D.lineTo(sx, axisY + 4);
                ctx2D.stroke();
                ctx2D.fillText(String(x), sx, axisY + 6);
              }
            }
            if (axisXVisible) {
              ctx2D.textAlign = "left";
              ctx2D.textBaseline = "middle";
              for (let y = minGridY; y <= maxGridY; y++) {
                if (y === 0) continue;
                const sy = toScreenY(y);
                ctx2D.beginPath();
                ctx2D.moveTo(axisX - 4, sy);
                ctx2D.lineTo(axisX + 4, sy);
                ctx2D.stroke();
                ctx2D.fillText(String(y), axisX + 6, sy);
              }
            }
            // Axis labels.
            ctx2D.fillStyle = "#222";
            ctx2D.font = "bold 12px Arial";
            if (axisYVisible) {
              ctx2D.textAlign = "right";
              ctx2D.textBaseline = "bottom";
              ctx2D.fillText("x", plotRight - 4, axisY - 4);
            }
            if (axisXVisible) {
              ctx2D.textAlign = "left";
              ctx2D.textBaseline = "top";
              ctx2D.fillText("y", axisX + 6, plotTop + 4);
            }
            return {
              plotLeft,
              plotTop,
              plotRight,
              plotBottom,
              plotHeight,
              toMathX,
              toScreenY,
            };
          }

          function draw2D() {
            const view = drawGrid();
            const discontinuityPx = view.plotHeight * 0.75;
            ctx2D.save();
            ctx2D.beginPath();
            ctx2D.rect(
              view.plotLeft,
              view.plotTop,
              view.plotRight - view.plotLeft,
              view.plotBottom - view.plotTop,
            );
            ctx2D.clip();
            functions2D.forEach((fn) => {
              ctx2D.beginPath();
              let lastValid = false;
              let lastPy = 0;
              const parsedFn = parse(fn);
              for (
                let px = Math.floor(view.plotLeft);
                px <= Math.ceil(view.plotRight);
                px++
              ) {
                let x = view.toMathX(px);
                let expr = parsedFn.replace(/\bx\b/g, "(" + x + ")");
                let y;
                try {
                  y = Function("return " + expr)();
                } catch {
                  lastValid = false;
                  continue;
                }
                y = Number(y);
                if (!Number.isFinite(y)) {
                  lastValid = false;
                  continue;
                }
                let py = view.toScreenY(y);
                if (!Number.isFinite(py)) {
                  lastValid = false;
                  continue;
                }
                if (!lastValid) {
                  ctx2D.moveTo(px, py);
                } else if (Math.abs(py - lastPy) > discontinuityPx) {
                  // Likely discontinuity/asymptote: start a new segment.
                  ctx2D.moveTo(px, py);
                } else {
                  ctx2D.lineTo(px, py);
                }
                lastPy = py;
                lastValid = true;
              }
              ctx2D.strokeStyle = "red";
              ctx2D.lineWidth = 2;
              ctx2D.stroke();
            });
            ctx2D.restore();
          }

          function loadThree() {
            // If already loaded, return it
            if (window.THREE) return Promise.resolve(window.THREE);
            if (threePromise) return threePromise;
            // Dynamically import the module
            threePromise =
              import("https://cdn.jsdelivr.net/npm/three@0.162.0/build/three.module.js")
                .then((mod) => {
                  window.THREE = mod;
                  return mod;
                })
                .catch(() => {
                  throw new Error("Failed to load Three.js module");
                });
            return threePromise;
          }

          function updateThreeCamera() {
            if (!threeCamera) return;
            const sinPhi = Math.sin(orbitState.phi);
            const cosPhi = Math.cos(orbitState.phi);
            const sinTheta = Math.sin(orbitState.theta);
            const cosTheta = Math.cos(orbitState.theta);
            threeCamera.position.set(
              orbitState.radius * sinPhi * cosTheta,
              orbitState.radius * cosPhi,
              orbitState.radius * sinPhi * sinTheta,
            );
            threeCamera.lookAt(0, 0, 0);
          }

          function render3D() {
            if (!threeRenderer || !threeScene || !threeCamera) return;
            const w = canvas3D.clientWidth;
            const h = canvas3D.clientHeight || 260;
            threeRenderer.setSize(w, h, false);
            threeCamera.aspect = w / h;
            threeCamera.updateProjectionMatrix();
            threeRenderer.render(threeScene, threeCamera);
          }
          async function ensureThreeScene() {
            if (threeReady) return;
            const THREE = await loadThree();
            threeRenderer = new THREE.WebGLRenderer({
              canvas: canvas3D,
              antialias: true,
            });
            threeRenderer.setPixelRatio(
              Math.min(window.devicePixelRatio || 1, 2),
            );
            threeRenderer.setClearColor(0x101418, 1);
            threeScene = new THREE.Scene();
            threeScene.fog = new THREE.Fog(0x101418, 35, 90);
            threeCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 500);
            updateThreeCamera();
            threeScene.add(new THREE.AmbientLight(0xffffff, 0.38));
            const dirLight = new THREE.DirectionalLight(0xffffff, 1.05);
            dirLight.position.set(15, 20, 10);
            threeScene.add(dirLight);
            const fillLight = new THREE.DirectionalLight(0x9db4ff, 0.4);
            fillLight.position.set(-12, 8, -10);
            threeScene.add(fillLight);
            const span = GRAPH3D_MAX - GRAPH3D_MIN;
            const center = (GRAPH3D_MAX + GRAPH3D_MIN) / 2;
            const box = new THREE.Box3Helper(
              new THREE.Box3(
                new THREE.Vector3(GRAPH3D_MIN, GRAPH3D_MIN, GRAPH3D_MIN),
                new THREE.Vector3(GRAPH3D_MAX, GRAPH3D_MAX, GRAPH3D_MAX),
              ),
              0xb3b3b3,
            );
            threeScene.add(box);
            const xAxis = new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(GRAPH3D_MIN, 0, 0),
              new THREE.Vector3(GRAPH3D_MAX, 0, 0),
            ]);
            const yAxis = new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(0, GRAPH3D_MIN, 0),
              new THREE.Vector3(0, GRAPH3D_MAX, 0),
            ]);
            const zAxis = new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(0, 0, GRAPH3D_MIN),
              new THREE.Vector3(0, 0, GRAPH3D_MAX),
            ]);
            threeScene.add(
              new THREE.Line(
                xAxis,
                new THREE.LineBasicMaterial({
                  color: 0xe53935,
                }),
              ),
            );
            threeScene.add(
              new THREE.Line(
                yAxis,
                new THREE.LineBasicMaterial({
                  color: 0x43a047,
                }),
              ),
            );
            threeScene.add(
              new THREE.Line(
                zAxis,
                new THREE.LineBasicMaterial({
                  color: 0x1e88e5,
                }),
              ),
            );
            const step = 2;
            const tickSize = 0.25;
            const tickMaterial = new THREE.LineBasicMaterial({
              color: 0x777777,
            });
            for (let t = GRAPH3D_MIN; t <= GRAPH3D_MAX; t += step) {
              if (t === 0) continue;
              const xTick = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(t, -tickSize, 0),
                new THREE.Vector3(t, tickSize, 0),
              ]);
              const yTick = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(-tickSize, t, 0),
                new THREE.Vector3(tickSize, t, 0),
              ]);
              const zTick = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, -tickSize, t),
                new THREE.Vector3(0, tickSize, t),
              ]);
              threeScene.add(new THREE.Line(xTick, tickMaterial));
              threeScene.add(new THREE.Line(yTick, tickMaterial));
              threeScene.add(new THREE.Line(zTick, tickMaterial));
            }
            const grid = new THREE.GridHelper(
              GRAPH3D_MAX - GRAPH3D_MIN,
              (GRAPH3D_MAX - GRAPH3D_MIN) / step,
              0x6a6a6a,
              0x3a3a3a,
            );
            threeScene.add(grid);
            const planeGeom = new THREE.PlaneGeometry(span, span, 10, 10);
            const planeMat = new THREE.MeshBasicMaterial({
              color: 0xdedede,
              wireframe: true,
              transparent: true,
              opacity: 0.25,
            });
            const plane = new THREE.Mesh(planeGeom, planeMat);
            plane.rotation.x = -Math.PI / 2;
            plane.position.set(center, 0, center);
            threeScene.add(plane);
            threeSurfaceMaterial = new THREE.MeshPhongMaterial({
              color: 0x4da6ff,
              side: THREE.DoubleSide,
              shininess: 55,
              transparent: true,
              opacity: 0.92,
            });
            canvas3D.addEventListener("mousedown", (e) => {
              orbitDragging = true;
              orbitStartX = e.clientX;
              orbitStartY = e.clientY;
            });
            window.addEventListener("mousemove", (e) => {
              if (!orbitDragging) return;
              orbitState.theta -= (e.clientX - orbitStartX) * 0.01;
              orbitState.phi += (e.clientY - orbitStartY) * 0.01;
              orbitState.phi = Math.max(
                0.2,
                Math.min(Math.PI - 0.2, orbitState.phi),
              );
              orbitStartX = e.clientX;
              orbitStartY = e.clientY;
              updateThreeCamera();
              render3D();
            });
            window.addEventListener("mouseup", () => {
              orbitDragging = false;
            });
            threeReady = true;
            render3D();
          }
          async function draw3D(expr) {
            await ensureThreeScene();
            const THREE = window.THREE || (await loadThree());
            if (!THREE || !threeScene) return;
            if (threeSurfaceMesh) {
              threeScene.remove(threeSurfaceMesh);
              threeSurfaceMesh.geometry.dispose();
              threeSurfaceMesh = null;
            }
            const segments = 120;
            const size = segments + 1;
            const cleanExpr = normalizeGraphExpression(expr, "z");
            const parsed = parse(cleanExpr || "0");
            const samples = [];
            let zMin = Infinity;
            let zMax = -Infinity;
            // ---------- PASS 1 ----------
            // Evaluate function and find actual z range.
            for (let iy = 0; iy <= segments; iy++) {
              const y =
                GRAPH3D_MIN + (iy / segments) * (GRAPH3D_MAX - GRAPH3D_MIN);
              for (let ix = 0; ix <= segments; ix++) {
                const x =
                  GRAPH3D_MIN + (ix / segments) * (GRAPH3D_MAX - GRAPH3D_MIN);
                let z = NaN;
                try {
                  const e = parsed
                    .replace(/\bx\b/g, `(${x})`)
                    .replace(/\by\b/g, `(${y})`);
                  z = Number(Function("return " + e)());
                } catch {}
                if (Number.isFinite(z)) {
                  zMin = Math.min(zMin, z);
                  zMax = Math.max(zMax, z);
                }
                samples.push({
                  x,
                  y,
                  z,
                });
              }
            }
            if (!Number.isFinite(zMin) || !Number.isFinite(zMax)) {
              render3D();
              return;
            }
            // Prevent divide-by-zero.
            if (Math.abs(zMax - zMin) < 1e-8) {
              zMax += 1;
              zMin -= 1;
            }
            const targetHeight = 20;
            const scaleY = targetHeight / (zMax - zMin);
            const zCenter = (zMin + zMax) * 0.5;
            // ---------- PASS 2 ----------
            // Build geometry.
            const positions = new Float32Array(size * size * 3);
            const indices = [];
            let p = 0;
            for (const point of samples) {
              let h = NaN;
              if (Number.isFinite(point.z)) {
                h = (point.z - zCenter) * scaleY;
              }
              positions[p++] = point.x;
              positions[p++] = h;
              positions[p++] = point.y;
            }

            function valid(i) {
              return Number.isFinite(positions[i * 3 + 1]);
            }
            for (let iy = 0; iy < segments; iy++) {
              for (let ix = 0; ix < segments; ix++) {
                const a = iy * size + ix;
                const b = a + 1;
                const c = a + size;
                const d = c + 1;
                if (valid(a) && valid(b) && valid(c)) {
                  indices.push(a, c, b);
                }
                if (valid(b) && valid(c) && valid(d)) {
                  indices.push(b, c, d);
                }
              }
            }
            const geom = new THREE.BufferGeometry();
            geom.setAttribute(
              "position",
              new THREE.BufferAttribute(positions, 3),
            );
            geom.setIndex(indices);
            geom.computeVertexNormals();
            threeSurfaceMesh = new THREE.Mesh(geom, threeSurfaceMaterial);
            threeScene.add(threeSurfaceMesh);
            // Optional wireframe.
            const wire = new THREE.LineSegments(
              new THREE.WireframeGeometry(geom),
              new THREE.LineBasicMaterial({
                color: 0x0f4b7a,
                transparent: true,
                opacity: 0.15,
              }),
            );
            threeSurfaceMesh.add(wire);
            render3D();
          }

          function handle(k) {
            if (k === "C") {
              display.value = "";
              closeGraphs();
              return;
            }
            if (k === "=") {
              let r = evaluate(display.value);
              addHistory(display.value, r);
              display.value = r;
              return;
            }
            if (k === "graph") {
              const cleanExpr = normalizeGraphExpression(display.value, "y");
              if (!cleanExpr) return;
              functions2D.push(cleanExpr);
              open2D();
              return;
            }
            if (k === "π") {
              display.value += "π";
              return;
            }
            if (k === "x²") {
              display.value += "**2";
              return;
            }
            if (k === "√") {
              display.value += "√(";
              return;
            }
            if (["sin", "cos", "tan", "log", "ln"].includes(k)) {
              display.value += k + "(";
              return;
            }
            display.value += k;
          }

          function addHistory(e, r) {
            let d = document.createElement("div");
            d.textContent = e + " = " + r;
            historyBox.prepend(d);
          }
          document.getElementById("sciBtn").onclick = closeGraphs;
          document.getElementById("g2Btn").onclick = open2D;
          document.getElementById("g3Btn").onclick = () => open3D();
          document.getElementById("show2D").onclick = open2D;
          document.getElementById("show3D").onclick = open3D;
          clear2DButton.onclick = () => {
            functions2D = [];
            draw2D();
          };
          undo2DButton.onclick = () => {
            functions2D.pop();
            draw2D();
          };
          document.getElementById("hideGraph").onclick = closeGraphs;

          function setSidebarOpen(open) {
            calc.classList.toggle("sidebar-open", open);
          }
          sidebarHandle.addEventListener("mouseenter", () =>
            setSidebarOpen(true),
          );
          sidebarEl.addEventListener("mouseenter", () => setSidebarOpen(true));
          sidebarHandle.addEventListener("mouseleave", (e) => {
            const t = e.relatedTarget;
            if (t && (sidebarEl.contains(t) || sidebarHandle.contains(t)))
              return;
            setSidebarOpen(false);
          });
          sidebarEl.addEventListener("mouseleave", (e) => {
            const t = e.relatedTarget;
            if (t && (sidebarEl.contains(t) || sidebarHandle.contains(t)))
              return;
            setSidebarOpen(false);
          });
          canvas2D.addEventListener(
            "wheel",
            (e) => {
              e.preventDefault();
            },
            {
              passive: false,
            },
          );
          let dragging = false,
            startX,
            startY;
          canvas2D.onmousedown = (e) => {
            dragging = true;
            startX = e.clientX;
            startY = e.clientY;
          };
          window.onmouseup = () => (dragging = false);
          window.onmousemove = (e) => {
            if (!dragging) return;
            offsetX += e.clientX - startX;
            offsetY += e.clientY - startY;
            startX = e.clientX;
            startY = e.clientY;
            draw2D();
          };
          const header = document.getElementById("header");
          const graphHeader = document.getElementById("graphHeader");
          let drag = false,
            ox,
            oy;
          header.onmousedown = (e) => {
            drag = true;
            ox = e.clientX - calc.offsetLeft;
            oy = e.clientY - calc.offsetTop;
          };
          document.onmousemove = (e) => {
            if (!drag) return;
            calc.style.left = e.clientX - ox + "px";
            calc.style.top = e.clientY - oy + "px";
          };
          document.onmouseup = () => (drag = false);
          let graphDrag = false,
            graphOffsetX,
            graphOffsetY;
          graphHeader.onmousedown = (e) => {
            graphDrag = true;
            graphOffsetX = e.clientX - graphLab.offsetLeft;
            graphOffsetY = e.clientY - graphLab.offsetTop;
          };
          window.addEventListener("mousemove", (e) => {
            if (!graphDrag) return;
            graphLab.style.left = e.clientX - graphOffsetX + "px";
            graphLab.style.top = e.clientY - graphOffsetY + "px";
          });
          window.addEventListener("mouseup", () => (graphDrag = false));
        })();
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
      addBtn(
        util,
        "FPS Counter",
        () => {
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
      addBtn(
        util,
        "Password Looker",
        () => {
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
      addBtn(
        util,
        "Porta Proxy",
        () => {
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
      // Stop All Utilities
      addBtn(util, "Stop All Utilities", () => {
        if (window.HGUI_ACTIVE_TIMERS?.util) {
          Object.keys(window.HGUI_ACTIVE_TIMERS.util).forEach((slug) =>
            clearTimeout(window.HGUI_ACTIVE_TIMERS.util[slug]),
          );
          window.HGUI_ACTIVE_TIMERS.util = {};
        }
        for (let key in activeUtilities) {
          if (activeUtilities[key].off) activeUtilities[key].off();
        }
      });
    })();
    // -------------------- FONT SIZE SLIDER --------------------
    (function () {
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
        document
          .querySelectorAll(
            "body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *):not(#themesGUI *)",
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
      document.head.appendChild(s);
    }
    // ---------- addBtn helper ----------
    function addBtn(container, name, on, off) {
      const b = document.createElement("button");
      b.className = "hgui-btn";
      b.innerText = name;
      container.appendChild(b);
      if (!window.HGUI_REGISTRY)
        window.HGUI_REGISTRY = {
          util: {},
          vfx: {},
        };
      const slug = name.toLowerCase().replace(/[\s-]+/g, "");
      window.HGUI_REGISTRY.vfx[slug] = {
        label: name,
        on,
        off,
        el: b,
      };
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
          setTimeout(() => p.remove(), 2e3);
        }, 150); // emit particle every 150ms
      });
      // Stop emitting when mouse leaves
      b.addEventListener("mouseleave", () => {
        clearInterval(particleInterval);
      });
      b.addEventListener("click", on);
      if (off) {
        if (!window._hgui_activeUtilities) window._hgui_activeUtilities = {};
        window._hgui_activeUtilities[name] = {
          on: on,
          off: off,
        };
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
              orig: orig,
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
          setTimeout(() => particle.remove(), 3e3);
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
            el: el,
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
    addBtn(
      vfx,
      "Random Link Redirects",
      () => {
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
    addBtn(vfx, "3D Page", () => {
      (function () {
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
            roll: 0,
          },
          mouseMove: function (e) {
            tri.orientation.yaw =
              -Math.cos((Math.PI * e.clientX) / innerWidth) *
              180 *
              tri.limit.value;
            tri.orientation.pitch =
              Math.cos((Math.PI * e.clientY) / innerHeight) *
              180 *
              tri.limit.value;
            tri.updateBody();
          },
          gyroMove: function (e) {
            var landscape = innerWidth > innerHeight;
            if (landscape) {
              tri.orientation.yaw = -(e.alpha + e.beta);
              tri.orientation.pitch =
                e.gamma - Math.sign(90 - Math.abs(e.beta)) * 90;
            } else {
              tri.orientation.yaw = -(e.alpha + e.gamma);
              tri.orientation.pitch = e.beta - 90;
            }
            tri.updateBody();
          },
          updateOrigin: function (e) {
            document.body.style.transformOrigin =
              innerWidth / 2 +
              pageXOffset +
              "px " +
              (innerHeight / 2 + pageYOffset) +
              "px";
          },
          updateBody: function () {
            document.body.style.transform =
              "perspective(" +
              Math.pow(2, tri.fov.value) +
              "px) translateZ(-" +
              tri.gap.value +
              "px) rotateX(" +
              tri.orientation.pitch +
              "deg) rotateY(" +
              tri.orientation.yaw +
              "deg)";
          },
          updateCSS: function () {
            if (tri.non.checked) tri.cssDynamic.textContent = "";
            else if (tri.off.checked)
              tri.cssDynamic.textContent =
                "* { transform-style: preserve-3d; }";
            else {
              for (
                var depth = 0;
                document.querySelector("body" + " > *".repeat(depth));
                depth++
              );
              var gap = tri.gap.value / depth;
              var sag = (-Math.PI * tri.sag.value) / depth;
              tri.cssDynamic.textContent = ` *{transform:translateZ(${gap}px) rotateX(${sag}rad);transform-style:preserve-3d;transition:transform 1s;outline:1px solid rgb(0 0 0 / .0625);${tri.flo.checked ? "overflow: visible !important;" : ""}}*:hover{transform:translateZ(${gap * 2}px) rotateX(${sag * 2}rad);${!tri.flo.checked ? "overflow: visible;" : ""}}`;
            }
          },
          toggle: function () {
            if (tri.menu.className == "active") {
              tri.menu.removeAttribute("class");
            } else {
              tri.menu.className = "active";
            }
          },
          quit: function () {
            window.removeEventListener("deviceorientation", tri.gyroMove);
            window.removeEventListener("mousemove", tri.mouseMove);
            window.removeEventListener("scroll", tri.updateOrigin);
            window.addEventListener("resize", tri.updateOrigin);
            tri.menu.remove();
            tri.cssStatic.remove();
            tri.cssDynamic.remove();
            document.body.removeAttribute("style");
          },
          newRange: function (e, label, min, step, max, value, f) {
            tri.menu.appendChild(e);
            e.type = "range";
            e.min = min;
            e.max = max;
            e.step = step;
            e.value = value;
            e.addEventListener("input", f);
            tri.menu.appendChild(document.createElement("span")).textContent =
              label;
            tri.menu.appendChild(document.createElement("br"));
          },
          newCheckbox: function (e, label, f) {
            tri.menu.appendChild(e);
            e.type = "checkbox";
            e.addEventListener("click", f);
            tri.menu.appendChild(document.createElement("span")).textContent =
              label;
            tri.menu.appendChild(document.createElement("br"));
          },
          newButton: function (e, label, f) {
            tri.menu.appendChild(e);
            e.type = "button";
            e.value = label;
            e.addEventListener("click", f);
          },
          init: function () {
            document.body.parentNode.appendChild(tri.menu).id = "tri-menu";
            tri.newRange(
              tri.limit,
              "limit",
              0,
              0.03125,
              1,
              0.125,
              tri.updateBody,
            );
            tri.newRange(
              tri.gap,
              "gap / distance",
              0,
              32,
              512,
              128,
              function () {
                tri.updateCSS();
                tri.updateBody();
              },
            );
            tri.newRange(
              tri.sag,
              "sag",
              -0.25,
              0.03125,
              0.25,
              0,
              tri.updateCSS,
            );
            tri.newRange(
              tri.fov,
              "field of view",
              7,
              1,
              13,
              10,
              tri.updateBody,
            );
            tri.newCheckbox(tri.flo, "force overflow", tri.updateCSS);
            tri.flo.setAttribute("checked", "");
            tri.newCheckbox(tri.off, "flatten layers", tri.updateCSS);
            tri.newCheckbox(tri.non, "flatten everything", tri.updateCSS);
            tri.newButton(tri.end, "Quit", tri.quit);
            tri.newButton(tri.tgl, "≡", tri.toggle);
            tri.tgl.id = "tri-toggle";
            tri.menu.appendChild(tri.cssStatic).textContent =
              ` html,body{transition-property:none;height:100%;width:100%}html,html:hover,#tri-menu,#tri-menu>*,#tri-menu>*:hover{transform:none;outline:none;overflow:auto!important;float:none}#tri-menu{position:fixed;top:0;left:0;background:rgb(0 0 0 / .5);color:#fff;border:1px solid rgb(255 255 255 / .5);;border-radius:0 0 16px 0;padding:8px;transform:translate(-100%,-100%) translate(32px,32px)}#tri-menu.active{transform:none}#tri-toggle{position:absolute;bottom:0;right:0;height:32px;width:32px;background:#fff0;color:#fff;border:none;cursor:pointer}#tri-menu.active>#tri-toggle{background:#fff;color:#000;border-radius:8px 0 0 0}`;
            tri.menu.appendChild(tri.cssDynamic);
            tri.updateCSS();
            window.addEventListener("deviceorientation", tri.gyroMove);
            window.addEventListener("mousemove", tri.mouseMove);
            window.addEventListener("scroll", tri.updateOrigin);
            window.addEventListener("resize", tri.updateOrigin);
            window.scrollBy(0, 1);
          },
        };
        tri.init();
      })();
    });
    // Explode Page
    addBtn(
      vfx,
      "Explode Page",
      () => {
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
                "body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *):not(#themesGUI *)",
              )
              .forEach((e) => {
                e.style.transition = "transform 1s ease-out";
                let x = (Math.random() - 0.5) * 1e3,
                  y = (Math.random() - 0.5) * 1e3,
                  z = (Math.random() - 0.5) * 200;
                e.style.transform = `translate3d(${x}px,${y}px,${z}px) rotate(${Math.random() * 720 - 360}deg)`;
              });
            setTimeout(() => {
              document
                .querySelectorAll(
                  "body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *):not(#themesGUI *)",
                )
                .forEach((e) => {
                  e.style.transform = "";
                  e.style.transition = "";
                });
              window.explodeActive = false;
            }, 1500);
          }
        }, 1e3);
      },
      () => {
        clearInterval(window.explodeInt);
        window.explodeInt = null;
        window.explodeActive = false;
        document.querySelectorAll().forEach((e) => {
          e.style.transform = "";
          e.style.transition = "";
        });
      },
    );
    // Image Glitch
    addBtn(
      vfx,
      "Image Glitch",
      () => {
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
    addBtn(
      vfx,
      "Glitch",
      () => {
        if (window.glitchActive) return;
        window.glitchActive = true;
        window.glitchInt = setInterval(() => {
          document
            .querySelectorAll(
              "*:not(#mainGUI):not(#mainGUI *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#themesGUI):not(#utilitiesGUI *):not(#themesGUI *)",
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
            "*:not(#mainGUI):not(#mainGUI *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#themesGUI):not(#utilitiesGUI *):not(#themesGUI *)",
          )
          .forEach((e) => {
            e.style.backgroundColor = "";
          });
      },
    );
    // Smooth Disco
    addBtn(
      vfx,
      "Smooth Disco",
      () => {
        if (window.discoSmoothActive) return;
        window.discoSmoothActive = true;
        let colors = "red orange yellow green blue purple pink".split(" "),
          i = 0;
        window.discoSmoothInt = setInterval(() => {
          i = (i + 1) % colors.length;
          document
            .querySelectorAll(
              "*:not(#mainGUI):not(#mainGUI *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#themesGUI):not(#utilitiesGUI *):not(#themesGUI *)",
            )
            .forEach((e) => {
              e.style.transition = "background-color 1s";
              e.style.backgroundColor = colors[i];
            });
        }, 1e3);
      },
      () => {
        if (window.discoSmoothInt) {
          clearInterval(window.discoSmoothInt);
          window.discoSmoothInt = null;
        }
        window.discoSmoothActive = false;
        document
          .querySelectorAll(
            "*:not(#mainGUI):not(#mainGUI *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#themesGUI):not(#utilitiesGUI *):not(#themesGUI *)",
          )
          .forEach((e) => {
            e.style.transition = "";
            e.style.backgroundColor = "";
          });
      },
    );
    // ---------- Text Corruption ----------
    addBtn(
      vfx,
      "Text Corruption",
      () => {
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
    addBtn(
      vfx,
      "Page Spin",
      () => {
        if (window.pageSpinActive) return;
        window.pageSpinActive = true;
        let s = document.createElement("style");
        s.id = "pageSpinStyle";
        s.innerHTML =
          "@keyframes roll{100%{transform:rotate(129600deg);}} body > *:not(#mainGUI):not(#vfxGUI):not(#utilitiesGUI):not(#themesGUI){animation:roll 140s linear 360;} body > *:not(#mainGUI):not(#vfxGUI):not(#utilitiesGUI):not(#themesGUI) *{animation:roll 140s linear 360;}";
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
      if (window.HGUI_ACTIVE_TIMERS?.vfx) {
        Object.keys(window.HGUI_ACTIVE_TIMERS.vfx).forEach((slug) =>
          clearTimeout(window.HGUI_ACTIVE_TIMERS.vfx[slug]),
        );
        window.HGUI_ACTIVE_TIMERS.vfx = {};
      }
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
      section.style.background = "var(--btn-bg)";
      section.style.borderRadius = "10px";
      section.style.color = "var(--gui-text)";
      section.innerHTML = `<b>Font Color</b><br>`;
      const picker = document.createElement("input");
      picker.type = "color";
      picker.value = "000000";
      picker.oninput = () => {
        document
          .querySelectorAll(
            "body *:not(#mainGUI *):not(#vfxGUI *):not(#utilitiesGUI *):not(#themesGUI *)",
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
