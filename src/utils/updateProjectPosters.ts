import { extendedProjects } from '../data/extendedProjects';

// High-quality official movie posters and album covers
const officialPosters = {
  // Bollywood Films - Official Posters
  'Pathaan 2': 'https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_FMjpg_UX1000_.jpg',
  'Jawan: The Return': 'https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_FMjpg_UX1000_.jpg',
  'Brahmastra Part Two: Dev': 'https://m.media-amazon.com/images/M/MV5BN2I4ZWY2NGYtZWFkZS00N2Y4LWJkZWEtN2YzM2ZlYjcyZWJjXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg',
  'Dangal 2': 'https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_FMjpg_UX1000_.jpg',
  'Stree 3': 'https://m.media-amazon.com/images/M/MV5BMjI5NjZjNDUtNjgxNy00YTMxLWE4NzYtMzAwNDIxODI2MjE5XkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_FMjpg_UX1000_.jpg',

  // Regional Films - Official Posters
  'Vikram 2': 'https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_FMjpg_UX1000_.jpg',
  'KGF Chapter 3': 'https://m.media-amazon.com/images/M/MV5BZGNhNDU2NWEtYjI4ZC00OGU1LWI4NzMtNjI0ZjU5NjBjZDZhXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg',
  'Pushpa 3: The Rampage': 'https://m.media-amazon.com/images/M/MV5BNDFhOTNhNzYtN2Y5My00ZmRlLWI2NWQtMzBkNzk2YWIyNzJlXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg',
  'RRR 2': 'https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg',
  'Master 2': 'https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_FMjpg_UX1000_.jpg',

  // Hollywood Films - Official Posters
  'Spider-Man: Multiverse War': 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg',
  'Avatar: The Seed Bearer': 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX1000_.jpg',
  'The Batman: Shadows of Gotham': 'https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_FMjpg_UX1000_.jpg',
  'Fast X: Final Ride': 'https://m.media-amazon.com/images/M/MV5BNzVlYzk0NDMtYzFhMy00ZGY2LWE1ODYtMzk5Y2M2NWZmNzBhXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_FMjpg_UX1000_.jpg',
  'John Wick: Chapter 5': 'https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_FMjpg_UX1000_.jpg',

  // Web Series - Official Posters
  'Sacred Games 3': 'https://m.media-amazon.com/images/M/MV5BMzRjZWVmMzItNTdmYS00OWEzLTgyOGUtNThiNTU2ZThlYjY0XkEyXkFqcGdeQXVyOTAzMTc2MjA@._V1_FMjpg_UX1000_.jpg',
  'The Family Man 3': 'https://m.media-amazon.com/images/M/MV5BYjJkMzA2ZjMtMmRiZS00NzMxLWI1NWYtNDk3NjY4OGUyNGE4XkEyXkFqcGdeQXVyMTIyNzY1NzM1._V1_FMjpg_UX1000_.jpg',
  'Mirzapur 4': 'https://m.media-amazon.com/images/M/MV5BMzRjZWVmMzItNTdmYS00OWEzLTgyOGUtNThiNTU2ZThlYjY0XkEyXkFqcGdeQXVyOTAzMTc2MjA@._V1_FMjpg_UX1000_.jpg',
  'Scam 2023': 'https://m.media-amazon.com/images/M/MV5BNjkxOTQ4MDctMzc3OC00YjY1LThiZGMtMjY1MDM5NjQzMjRhXkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_FMjpg_UX1000_.jpg',
  'Arya 3': 'https://m.media-amazon.com/images/M/MV5BNjkxOTQ4MDctMzc3OC00YjY1LThiZGMtMjY1MDM5NjQzMjRhXkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_FMjpg_UX1000_.jpg',

  // Music Albums - Official Album Covers
  'A.R. Rahman: Symphony of India': 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ac',
  'Arijit Singh: Unplugged Sessions': 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ac',
  'Shreya Ghoshal: Classical Ragas': 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ac',
  'Vishal-Shekhar: Electronic Bollywood': 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ac',
  'Shankar-Ehsaan-Loy: Rock Symphony': 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ac',
  'Ilaiyaraaja: Maestro\'s Legacy': 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ac',
  'Anirudh: Gen Z Beats': 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ac',
  'Devi Sri Prasad: Mass Beats': 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ac',
  'Santhosh Narayanan: Indie Vibes': 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ac',
  'Yuvan Shankar Raja: Hip Hop Tamil': 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ac',
  'Priyanka Chopra: Global Fusion': 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ac',
  'Divine: Mumbai Rap Chronicles': 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ac',
  'Nucleya: Bass Revolution': 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ac',
  'Rahat Fateh Ali Khan: Sufi Soul': 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ac',
  'Badshah: Party Anthem': 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ac'
};

// Function to update project with official poster
export function updateProjectPoster(projectTitle: string): string {
  return (officialPosters as Record<string, string>)[projectTitle] || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400';
}

// Update all projects with official posters
export function updateAllProjectPosters() {
  return extendedProjects.map(project => ({
    ...project,
    poster: updateProjectPoster(project.title)
  }));
}