import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the projects.ts file
const filePath = path.join(__dirname, 'src', 'data', 'projects.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace all instances of "disabled": true with "disabled": false
const updatedContent = content.replace(/"disabled": true/g, '"disabled": false');

// Write the updated content back to the file
fs.writeFileSync(filePath, updatedContent, 'utf8');

console.log('✅ Successfully enabled all projects!');
console.log(`📊 Replaced ${(content.match(/"disabled": true/g) || []).length} instances of "disabled": true with "disabled": false`);

// Verify the changes
const verifyContent = fs.readFileSync(filePath, 'utf8');
const remainingTrue = (verifyContent.match(/"disabled": true/g) || []).length;
const newFalse = (verifyContent.match(/"disabled": false/g) || []).length;

console.log(`🔍 Verification:`);
console.log(`   - Remaining "disabled": true: ${remainingTrue}`);
console.log(`   - New "disabled": false: ${newFalse}`);

if (remainingTrue === 0 && newFalse > 0) {
  console.log('🎉 All projects have been successfully enabled!');
} else {
  console.log('⚠️  Some issues detected. Please check the file manually.');
} 