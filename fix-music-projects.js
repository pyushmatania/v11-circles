import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the projects.ts file
const filePath = path.join(__dirname, 'src', 'data', 'projects.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Function to add missing properties to music projects
function addMissingProperties(match) {
  const project = match[0];
  
  // Check if it already has the required properties
  if (project.includes('"status":') && project.includes('"createdAt":') && project.includes('"updatedAt":') && project.includes('"keyPeople":')) {
    return project;
  }
  
  // Add missing properties after the language property
  let updatedProject = project;
  
  // Add status, fundedPercentage, targetAmount, raisedAmount, createdAt, updatedAt after language
  const languageMatch = project.match(/"language":\s*"[^"]*"/);
  if (languageMatch) {
    const insertAfter = languageMatch[0];
    const insertText = `,
  "status": "active",
  "fundedPercentage": 0,
  "targetAmount": 1000000,
  "raisedAmount": 0,
  "createdAt": "2025-07-07T08:56:18.142Z",
  "updatedAt": "2025-07-07T08:56:18.776Z"`;
    
    updatedProject = project.replace(insertAfter, insertAfter + insertText);
  }
  
  // Add keyPeople and featured before disabled
  if (updatedProject.includes('"disabled": false')) {
    updatedProject = updatedProject.replace(
      '"disabled": false',
      `"keyPeople": [],
  "disabled": false,
  "featured": false`
    );
  }
  
  return updatedProject;
}

// Find and fix all music projects (m1 through m15)
for (let i = 1; i <= 15; i++) {
  const projectId = `"m${i}"`;
  const regex = new RegExp(`\\{[^}]*"id":\\s*${projectId}[^}]*\\}`, 'gs');
  
  content = content.replace(regex, (match) => {
    return addMissingProperties(match);
  });
}

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log('Successfully updated all music projects with missing required properties!'); 