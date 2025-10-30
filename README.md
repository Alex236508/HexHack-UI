[Drag this to your bookmarks](javascript:(function()%7Bvar%20u%3D'https%3A%2F%2Fraw.githubusercontent.com%2FAlex236508%2FHackerGUI-Reborn%2Frefs%2Fheads%2Fmain%2FGUI%2520Reborn.js'%3Bfunction%20inject(code)%7Bvar%20b%3Dnew%20Blob(%5Bcode%5D%2C%7Btype%3A'application%2Fjavascript'%7D)%3Bvar%20url%3DURL.createObjectURL(b)%3Bvar%20s%3Ddocument.createElement('script')%3Bs.src%3Durl%3Bs.onload%3Dfunction()%7BURL.revokeObjectURL(url)%3Bconsole.log('Blob%20script%20loaded')%3B%7D%3Bs.onerror%3Dfunction()%7Balert('Failed%20to%20execute%20blob%20script')%3B%7D%3B(document.head%7C%7Cdocument.documentElement).appendChild(s)%3B%7Dfetch(u).then(function(r)%7Bif(!r.ok)throw%20new%20Error(r.status)%3Breturn%20r.text()%7D).then(inject).catch(function(e)%7Balert('Load%20failed%3A%20'%2Be)%3B%7D)%3B%7D)())




## Notes:

#### Shift+h to hide

#### Shift + f to hide topbar on embedded browser

#### Shift + s to hide embedded browser
