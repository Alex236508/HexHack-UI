const fs = require('fs');

const jsFile = fs.readFileSync('bigfile.js', 'utf-8');

const regex = /\.style\.cssText\s*=\s*`([\s\S]*?)`;/g;

let match;
let cssContent = '';
let count = 0;

while ((match = regex.exec(jsFile)) !== null) {
  cssContent += match[1].trim() + '\n\n';
  count++;
}

fs.writeFileSync('styles.css', cssContent, 'utf-8');
console.log(`Extracted CSS from ${count} .cssText blocks into styles.css`);
