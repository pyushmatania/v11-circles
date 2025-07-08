export interface Superstar {
  id: string;
  name: string;
  type: 'actor' | 'actress' | 'director' | 'producer' | 'music';
  category: string;
  avatar: string;
  cover: string;
  description: string;
  followers: number;
  verified: boolean;
  recentProjects: string[];
  totalBoxOffice: string;
  awards: string[];
  socialMedia: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

export const superstars: Superstar[] = [
  {
    id: 'shah-rukh-khan',
    name: 'Shah Rukh Khan',
    type: 'actor',
    category: 'Bollywood',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Shah_Rukh_Khan_grace_the_launch_of_the_new_Tag_Heuer_Carrera_watch_%28cropped%29.jpg',
    cover: 'https://m.media-amazon.com/images/M/MV5BMjA2YjYwYzUtYjQwZi00YjQwLTg2YjMtYjQwYzYwYzYwYzYwXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_FMjpg_UX1000_.jpg',
    description: 'The King of Bollywood. Actor, producer, and global icon.',
    followers: 45000000,
    verified: true,
    recentProjects: ['Pathaan', 'Jawan', 'Dunki'],
    totalBoxOffice: '₹10,000 Crores',
    awards: ['Padma Shri', 'Legion of Honour', 'Multiple Filmfare Awards'],
    socialMedia: {
      instagram: '@iamsrk',
      twitter: '@iamsrk'
    }
  },
  {
    id: 'salman-khan',
    name: 'Salman Khan',
    type: 'actor',
    category: 'Bollywood',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Salman_Khan_at_the_launch_of_Bigg_Boss_Season_12.jpg',
    cover: 'https://m.media-amazon.com/images/M/MV5BMTYwYjYwYzUtYjQwZi00YjQwLTg2YjMtYjQwYzYwYzYwYzYwXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_FMjpg_UX1000_.jpg',
    description: 'Superstar of Bollywood. Known for action and family entertainers.',
    followers: 38000000,
    verified: true,
    recentProjects: ['Tiger 3', 'Kisi Ka Bhai Kisi Ki Jaan'],
    totalBoxOffice: '₹8,500 Crores',
    awards: ['Padma Shri', 'Multiple Filmfare Awards'],
    socialMedia: {
      instagram: '@beingsalmankhan'
    }
  },
  {
    id: 'a-r-rahman',
    name: 'A.R. Rahman',
    type: 'music',
    category: 'Music',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/A.R._Rahman_at_the_launch_of_his_music_school.jpg',
    cover: 'https://upload.wikimedia.org/wikipedia/en/9/9e/A.R._Rahman_-_Vande_Mataram.jpg',
    description: 'Oscar-winning composer and music director.',
    followers: 12000000,
    verified: true,
    recentProjects: ['Ponniyin Selvan', 'Cobra', 'Pathaan'],
    totalBoxOffice: '₹5,000 Crores',
    awards: ['Oscar', 'Grammy', 'Padma Bhushan', 'Padma Shri'],
    socialMedia: {
      instagram: '@arrahman',
      twitter: '@arrahman'
    }
  },
  {
    id: 'priyanka-chopra',
    name: 'Priyanka Chopra',
    type: 'actress',
    category: 'Bollywood',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Priyanka_Chopra_at_the_2017_Met_Gala.jpg',
    cover: 'https://m.media-amazon.com/images/M/MV5BMjA2YjYwYzUtYjQwZi00YjQwLTg2YjMtYjQwYzYwYzYwYzYwXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_FMjpg_UX1000_.jpg',
    description: 'Global actress, producer, and philanthropist.',
    followers: 25000000,
    verified: true,
    recentProjects: ['Citadel', 'The White Tiger', 'Baywatch'],
    totalBoxOffice: '₹3,500 Crores',
    awards: ['Padma Shri', 'National Film Award', 'Multiple Filmfare Awards'],
    socialMedia: {
      instagram: '@priyankachopra',
      twitter: '@priyankachopra'
    }
  }
]; 