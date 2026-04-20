# Bookmarklet
```javascript
javascript:(function(){fetch("https://raw.githubusercontent.com/Alex236508/HexHack-UI/refs/heads/main/UI.js").then(function(a){if(!a.ok)throw new Error(a.status);return a.text()}).then(function(a){var c=new Blob([a],{type:"application/javascript"}),b=URL.createObjectURL(c),d=document.createElement("script");d.src=b;(document.head||document.documentElement).appendChild(d)})})();
```

---

## others
Head over [here](https://github.com/Alex236508/HexHack-UI/blob/main/obfuscated.js) for a unique obfuscated version
just add `javascript:` before the code and it will work as a bookmarklets, or paste it directly into your console

Head over [here](https://github.com/Alex236508/HexHack-UI/blob/main/bookmarklet.js) for the raw bookmarklet, this
can bypass stuff like CORS policy
