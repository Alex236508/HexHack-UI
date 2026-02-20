## How to Use

1. **Copy the code below**.
2. right click bookmarks bar → Paste.
3. Click the bookmark whenever you want to launch HexHack-UI.

<details>
<summary> Code</summary>

```javascript
(function () { fetch( "https://raw.githubusercontent.com/Alex236508/HexHack-UI/refs/heads/main/UI.js", ) .then(function (a) { if (!a.ok) throw new Error(a.status); return a.text(); }) .then(function (a) { var c = new Blob([a], { type: "application/javascript" }), b = URL.createObjectURL(c), d = document.createElement("script"); ((d.src = b), (document.head || document.documentElement).appendChild(d)); }) .catch; })();
