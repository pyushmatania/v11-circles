/**
 * Script to update project images with official posters
 * Run this to replace placeholder images with real ones
 */

import ImageManager from './ImageManager.js';
import { extendedProjects } from '../data/extendedProjects.js';

const imageManager = new ImageManager();

// Mapping of project titles to search terms for better API results
const projectMappings = {
  // Bollywood Films
  'Pathaan 2': { title: 'Pathaan', year: 2023, type: 'movie' },
  'Jawan: The Return': { title: 'Jawan', year: 2023, type: 'movie' },
  'Brahmastra Part Two: Dev': { title: 'Brahmastra', year: 2022, type: 'movie' },
  'Dangal 2': { title: 'Dangal', year: 2016, type: 'movie' },
  'Stree 3': { title: 'Stree', year: 2018, type: 'movie' },
  
  // Regional Films
  'Vikram 2': { title: 'Vikram', year: 2022, type: 'movie' },
  'KGF Chapter 3': { title: 'KGF Chapter 2', year: 2022, type: 'movie' },
  'Pushpa 3: The Rampage': { title: 'Pushpa', year: 2021, type: 'movie' },
  'RRR 2': { title: 'RRR', year: 2022, type: 'movie' },
  'Master 2': { title: 'Master', year: 2021, type: 'movie' },
  
  // Hollywood Films
  'Spider-Man: Multiverse War': { title: 'Spider-Man: No Way Home', year: 2021, type: 'movie' },
  'Avatar: The Seed Bearer': { title: 'Avatar: The Way of Water', year: 2022, type: 'movie' },
  'The Batman: Shadows of Gotham': { title: 'The Batman', year: 2022, type: 'movie' },
  'Fast X: Final Ride': { title: 'Fast X', year: 2023, type: 'movie' },
  'John Wick: Chapter 5': { title: 'John Wick: Chapter 4', year: 2023, type: 'movie' },
  
  // Web Series
  'Sacred Games 3': { title: 'Sacred Games', year: 2018, type: 'movie' },
  'The Family Man 3': { title: 'The Family Man', year: 2019, type: 'movie' },
  'Mirzapur 4': { title: 'Mirzapur', year: 2018, type: 'movie' },
  'Scam 2023': { title: 'Scam 1992', year: 2020, type: 'movie' },
  'Arya 3': { title: 'Arya', year: 2020, type: 'movie' },
  
  // Music Projects
  'A.R. Rahman: Symphony of India': { artist: 'A.R. Rahman', album: 'Roja', type: 'music' },
  'Arijit Singh: Unplugged Sessions': { artist: 'Arijit Singh', album: 'Aashiqui 2', type: 'music' },
  'Shreya Ghoshal: Classical Ragas': { artist: 'Shreya Ghoshal', album: 'Devdas', type: 'music' },
  'Vishal-Shekhar: Electronic Bollywood': { artist: 'Vishal-Shekhar', album: 'Om Shanti Om', type: 'music' },
  'Shankar-Ehsaan-Loy: Rock Symphony': { artist: 'Shankar-Ehsaan-Loy', album: 'Dil Chahta Hai', type: 'music' },
  'Ilaiyaraaja: Maestro\'s Legacy': { artist: 'Ilaiyaraaja', album: 'Mouna Ragam', type: 'music' },
  'Anirudh: Gen Z Beats': { artist: 'Anirudh Ravichander', album: 'Kolaveri Di', type: 'music' },
  'Devi Sri Prasad: Mass Beats': { artist: 'Devi Sri Prasad', album: 'Arya', type: 'music' },
  'Santhosh Narayanan: Indie Vibes': { artist: 'Santhosh Narayanan', album: 'Pizza', type: 'music' },
  'Yuvan Shankar Raja: Hip Hop Tamil': { artist: 'Yuvan Shankar Raja', album: 'Pudhupettai', type: 'music' }
};

/**
 * Update all project images
 */
async function updateAllProjectImages() {
  console.log('Starting image update process...');
  
  const updatedProjects = [];
  
  for (const project of extendedProjects) {
    console.log(`Processing: ${project.title}`);
    
    const mapping = projectMappings[project.title];
    if (!mapping) {
      console.log(`No mapping found for ${project.title}, skipping...`);
      updatedProjects.push(project);
      continue;
    }
    
    try {
      let imageData;
      
      if (mapping.type === 'movie') {
        imageData = await imageManager.getMovieData(
          mapping.title, 
          mapping.year, 
          project.language === 'Hindi' ? 'hi' : 'en'
        );
      } else if (mapping.type === 'music') {
        imageData = await imageManager.getAlbumCover(
          mapping.artist, 
          mapping.album
        );
      }
      
      if (imageData && imageData.url) {
        console.log(`✅ Found image for ${project.title}: ${imageData.url}`);
        updatedProjects.push({
          ...project,
          poster: imageData.url,
          imageAttribution: imageData.attribution,
          imageCopyright: imageData.copyright
        });
      } else {
        console.log(`❌ No image found for ${project.title}`);
        updatedProjects.push(project);
      }
      
      // Rate limiting
      await imageManager.delay(200);
      
    } catch (error) {
      console.error(`Error processing ${project.title}:`, error);
      updatedProjects.push(project);
    }
  }
  
  console.log('Image update process completed!');
  console.log(`Updated ${updatedProjects.filter(p => p.imageAttribution).length} out of ${extendedProjects.length} projects`);
  
  return updatedProjects;
}

/**
 * Generate updated project file
 */
async function generateUpdatedProjectFile() {
  const updatedProjects = await updateAllProjectImages();
  
  const fileContent = `import { Project } from '../types';

// Updated with official posters from TMDb and Spotify APIs
// Attribution: This product uses the TMDB API but is not endorsed or certified by TMDB
// Spotify content used under Spotify Developer Terms of Service

export const extendedProjects: Project[] = ${JSON.stringify(updatedProjects, null, 2)};
`;

  console.log('\n--- Updated Project File Content ---');
  console.log(fileContent);
  
  return fileContent;
}

// Export functions for use
export { updateAllProjectImages, generateUpdatedProjectFile, imageManager };

// If running directly, execute the update
if (import.meta.url === `file://${process.argv[1]}`) {
  generateUpdatedProjectFile().catch(console.error);
}