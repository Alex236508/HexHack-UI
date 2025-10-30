## How to Use

1. **Copy the code below**.
2. Create a new bookmark in your browser (right-click the bookmarks bar → “Add Page” or “Add Bookmark”).
3. Paste the code into the **URL** field of the bookmark.
4. Click the bookmark whenever you want to launch HackerGUI Reborn.

<details>
<summary>📋 Bookmarklet Code (click to expand)</summary>

```javascript
javascript:(function(){
    var u='https://raw.githubusercontent.com/Alex236508/HackerGUI-Reborn/refs/heads/main/GUI%20Reborn.js';
    function inject(code){
        var b=new Blob([code],{type:'application/javascript'});
        var url=URL.createObjectURL(b);
        var s=document.createElement('script');
        s.src=url;
        s.onload=function(){URL.revokeObjectURL(url); console.log('Blob script loaded');};
        s.onerror=function(){alert('Failed to execute blob script');};
        (document.head||document.documentElement).appendChild(s);
    }
    fetch(u)
      .then(function(r){if(!r.ok)throw new Error(r.status); return r.text();})
      .then(inject)
      .catch(function(e){alert('Load failed: '+e);});
})();
