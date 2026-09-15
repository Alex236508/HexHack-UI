(() => {
    if (window.hackerLoaded) return;

    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("UI.js");

    script.onload = () => {
        script.remove();
    };

    (document.head || document.documentElement).appendChild(script);
})();
