import { Project, Testimonial } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Pathaan 2',
    type: 'film',
    poster: 'https://m.media-amazon.com/images/M/MV5BOGY4NWNlM2QtMzVjYy00OGY1LWI4N2UtZDNlYWE2ZThjYmRmXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_FMjpg_UX1000_.jpg',
    fundedPercentage: 85,
    targetAmount: 15000000,
    raisedAmount: 12750000,
    timeLeft: '8 days',
    tags: ['Action', 'Thriller', 'Shah Rukh Khan'],
    description: 'The much-awaited sequel to the blockbuster Pathaan',
    director: 'Siddharth Anand',
    genre: 'Action Thriller',
    perks: ['Credits', 'Premiere Invite', 'Signed Poster', 'Behind-the-scenes'],
    category: 'Bollywood',
    language: 'Hindi',
    rating: 4.9
    ,
    trailer: 'https://www.youtube.com/watch?v=bK6ldnjE3Y0'
  },
  {
    id: '2',
    title: 'A.R. Rahman: Symphony of India',
    type: 'music',
    poster: 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ac',
    fundedPercentage: 95,
    targetAmount: 5000000,
    raisedAmount: 4750000,
    timeLeft: '2 days',
    tags: ['Classical Fusion', 'Orchestra', 'A.R. Rahman'],
    description: 'A.R. Rahman\'s symphonic tribute to Indian classical music',
    artist: 'A.R. Rahman',
    genre: 'Classical Fusion',
    perks: ['Studio Session', 'Orchestra Performance', 'Signed Vinyl', 'Music Masterclass'],
    category: 'Bollywood',
    language: 'Hindi',
    rating: 4.9
    ,
    trailer: 'https://www.youtube.com/watch?v=pBk4NYhWNMM'
  },
  {
    id: '3',
    title: 'RRR 2',
    type: 'film',
    poster: 'https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg',
    fundedPercentage: 91,
    targetAmount: 35000000,
    raisedAmount: 31850000,
    timeLeft: '4 days',
    tags: ['Epic', 'Action', 'Ram Charan', 'Jr NTR'],
    description: 'The epic sequel to the Oscar-winning RRR',
    director: 'S.S. Rajamouli',
    genre: 'Epic Action',
    perks: ['Epic Set Visit', 'VFX Studio Tour', 'Historical Props', 'International Premiere'],
    category: 'Regional',
    language: 'Telugu',
    rating: 4.9
    ,
    trailer: 'https://www.youtube.com/watch?v=d9MyW72ELq0'
  }
];

export const testimonials: Testimonial[] = [
  {
    name: 'Rahul Krishnan',
    role: 'Film Enthusiast',
    content: 'I invested ₹50K in "Pathaan 2" and got to meet Shah Rukh Khan on set. The experience was worth more than the returns!',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    project: 'Pathaan 2'
  },
  {
    name: 'Shreya Patel',
    role: 'Music Producer',
    content: 'A.R. Rahman personally thanked me for supporting his symphony project. Circles made my dream come true!',
    avatar: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150',
    project: 'Symphony of India'
  },
  {
    name: 'Dev Malhotra',
    role: 'Tech Investor',
    content: 'Got 18% returns on KGF Chapter 3 plus attended the gold mine location shoot. Best investment ever!',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    project: 'KGF Chapter 3'
  },
  {
    name: 'Priya Sharma',
    role: 'Bollywood Fan',
    content: 'From being a fan to becoming an associate producer on Jawan sequel - Circles changed my life!',
    avatar: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150',
    project: 'Jawan: The Return'
  },
  {
    name: 'Arjun Reddy',
    role: 'Regional Cinema Lover',
    content: 'Invested in Vikram 2 and got to train with the stunt team. Lokesh Kanagaraj even signed my poster!',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    project: 'Vikram 2'
  },
  {
    name: 'Kavya Nair',
    role: 'Music Enthusiast',
    content: 'Attended Arijit Singh\'s private acoustic session. His voice live is pure magic - worth every rupee!',
    avatar: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150',
    project: 'Unplugged Sessions'
  }
];