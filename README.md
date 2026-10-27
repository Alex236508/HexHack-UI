# HexHack-UI

**HexHack-UI is a customizable, hacker-themed browser bookmarklet that adds an interactive control panel directly to your current webpage.** Built with vanilla JavaScript, it injects a neon-green, terminal-inspired interface into the page, providing a collection of utilities, visual effects, themes, and customization options without requiring a traditional browser extension.

The interface features a movable control panel with multiple sections, a built-in console interface, and tools for modifying the appearance of the current webpage. Users can personalize the page's tab title and favicon, explore visual effects, and switch between available interface themes.

Designed with a hacker themed aesthetic, HexHack-UI combines a distinctive terminal-inspired design with interactive browser-based customization in a lightweight, bookmarklet-based format.

### Key Features

- **Interactive UI:** A movable, multi-section control panel injected directly into the current webpage.
- **Utilities:** Built-in tools for customizing aspects of the current page.
- **Page Effects:** Visual effects for changing the appearance of a webpage.
- **Theme Customization:** A dedicated section for exploring and applying interface themes.
- **Tab Customization:** Change the current page's browser tab title and upload a custom favicon.
- **Console Interface:** A terminal-inspired interface integrated into the control panel.
- **Vanilla JavaScript:** Built primarily with JavaScript without requiring a separate extension installation.
- **Bookmarklet-Based:** Launch the interface from a browser bookmark on supported webpages.

### How It Works

HexHack-UI uses a JavaScript bookmarklet to load its main interface script from the project's GitHub repository. When activated, it injects the UI into the current webpage, allowing its available features to interact with that page.

---

# Bookmarklet
```javascript
javascript:(function(){fetch("https://raw.githubusercontent.com/Alex236508/HexHack-UI/refs/heads/main/UI.js").then(function(a){if(!a.ok)throw new Error(a.status);return a.text()}).then(function(a){var c=new Blob([a],{type:"application/javascript"}),b=URL.createObjectURL(c),d=document.createElement("script");d.src=b;(document.head||document.documentElement).appendChild(d)})})();
```
## Bookmarklet 2
###### Try this if other bookmarklet doesn't work
[bookmarklet.js](https://github.com/Alex236508/HexHack-UI/blob/main/assets/bookmarklet.js)
