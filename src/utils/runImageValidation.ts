// Script to run image validation on all projects
import { extendedProjects } from '../data/extendedProjects';
import type { Project } from '../types';
import ImageValidator from './imageValidator';

// Run the validation process
async function runImageValidation() {
  console.log('🎬 CIRCLES PROJECT IMAGE VALIDATION SYSTEM');
  console.log('==========================================');
  console.log(`Starting validation of ${extendedProjects.length} projects...`);
  
  const validator = new ImageValidator();
  
  try {
    // Validate all projects
    const results = await validator.validateAllProjects(extendedProjects);
    
    // Generate updated projects
    const updatedProjects = validator.generateUpdatedProjects(extendedProjects, results);
    
    // Show final statistics
    const stats = validator.getValidationStats();
    console.log('\n📈 FINAL STATISTICS:');
    console.log(`Total Projects: ${stats.totalValidated}`);
    console.log(`Valid Originals: ${stats.validOriginals}`);
    console.log(`Found Alternatives: ${stats.foundAlternatives}`);
    console.log(`Using Fallbacks: ${stats.usingFallbacks}`);
    console.log(`Cache Entries: ${stats.cacheSize}`);
    
    // Generate updated file content
    const fileContent = generateUpdatedProjectFile(updatedProjects);
    console.log('\n📄 Updated project file generated successfully!');
    console.log('Copy the content below to update your extendedProjects.ts file:');
    console.log('\n' + '='.repeat(80));
    console.log(fileContent);
    console.log('='.repeat(80));
    
    return updatedProjects;
    
  } catch (error) {
    console.error('❌ Validation failed:', error);
    throw error;
  }
}

// Generate updated project file content
function generateUpdatedProjectFile(projects: Project[]): string {
  return `import { Project } from '../types';

// Updated with validated official posters and alternative sources
// Last updated: ${new Date().toISOString()}
// Validation completed with 10 attempts per image

export const extendedProjects: Project[] = ${JSON.stringify(projects, null, 2)};
`;
}

// Export for use in other files
export { runImageValidation, generateUpdatedProjectFile };

// If running directly, execute the validation
if (typeof window === 'undefined') {
  runImageValidation().catch(console.error);
}