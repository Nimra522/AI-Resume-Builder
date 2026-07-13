
const fs = require('fs');
const path = require('path');

// Read templates.ts
const templatesPath = path.join(__dirname, 'src/data/templates.ts');
const templatesContent = fs.readFileSync(templatesPath, 'utf8');

// Extract template ids using regex (looking for id: '...',)
const idRegex = /id:\s*'([^']+)'/g;
const ids = [];
let match;
while ((match = idRegex.exec(templatesContent)) !== null) {
  ids.push(match[1]);
}

// Function to convert id to filename (e.g., "warm-professional" -> "WarmProfessionalTemplate.tsx")
function idToFilename(id) {
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Template.tsx';
}

console.log('Template IDs and their filenames:');
ids.forEach(id => {
  console.log(`  ID: "${id}" → File: "${idToFilename(id)}"`);
});
