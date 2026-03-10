// remove-css.js
const fs = require('fs');

// === CONFIG ===
const inputFile = 'UI.js';   // Your main JS file
const outputFile = 'GUI.js'; // File after CSS removal
const elementName = 'gui';        // The element whose CSS was removed

// Read the original JS file
let jsContent = fs.readFileSync(inputFile, 'utf-8');

// Regex to match all `.style.cssText = `...`;` blocks
const cssRegex = /\.style\.cssText\s*=\s*`[\s\S]*?`;/g;

// Count matches for logging
const matches = jsContent.match(cssRegex);
const count = matches ? matches.length : 0;

// Remove all CSS-in-JS blocks
jsContent = jsContent.replace(cssRegex, `// CSS removed by remove-css.js`);

// Optionally, assign a class or id to the element so CSS applies
// Assumes your element is declared as `const gui = document.createElement('div');` or similar
const assignRegex = new RegExp(`(\\b${elementName}\\b)`, 'g');
jsContent = jsContent.replace(assignRegex, `${elementName}.classList.add('${newClassOrId}');\n$1`);

// Save the cleaned JS to a new file
fs.writeFileSync(outputFile, jsContent, 'utf-8');

console.log(`Removed ${count} .cssText blocks.`);
console.log(`Cleaned JS saved to: ${outputFile}`);
