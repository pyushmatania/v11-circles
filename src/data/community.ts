export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userVerified: boolean;
  userFollowers: number;
  content: string;
  media?: {
    type: 'image' | 'video' | 'poll';
    url?: string;
    thumbnail?: string;
    pollOptions?: string[];
    pollResults?: number[];
  };
  likes: number;
  comments: number;
  shares: number;
  views: number;
  timestamp: string;
  tags: string[];
  trending: boolean;
  sponsored: boolean;
  category: 'general' | 'investment' | 'perks' | 'news' | 'fan-art' | 'behind-scenes' | 'review';
}

export const communityPosts: CommunityPost[] = [
  {
    id: '1',
    userId: 'classic_cinema_lover',
    userName: 'Classic Cinema Lover',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    userVerified: true,
    userFollowers: 45000,
    content: 'Just invested in Sholay! 🎬 The classic that defined Indian cinema. Can\'t wait to be part of this legendary project. Who else is backing this masterpiece? #Sholay #ClassicCinema #Investment',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1489599832522-3ea1d11d9e11?w=800&h=600&fit=crop'
    },
    likes: 1247,
    comments: 89,
    shares: 234,
    views: 15600,
    timestamp: '2024-03-15T10:30:00Z',
    tags: ['sholay', 'classic', 'investment', 'excited'],
    trending: true,
    sponsored: false,
    category: 'investment'
  },
  {
    id: '2',
    userId: 'bollywood_insider',
    userName: 'Bollywood Insider',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    userVerified: true,
    userFollowers: 89000,
    content: 'BREAKING: Dangal sequel in the works! Aamir Khan to return with even bigger budget. Early investors, you\'re in for a treat! 🏆',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=600&fit=crop'
    },
    likes: 3456,
    comments: 234,
    shares: 567,
    views: 89000,
    timestamp: '2024-03-15T09:15:00Z',
    tags: ['dangal', 'aamir', 'sequel', 'breaking'],
    trending: true,
    sponsored: false,
    category: 'news'
  },
  {
    id: '3',
    userId: 'music_lover',
    userName: 'Music Lover',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    userVerified: false,
    userFollowers: 1200,
    content: 'Gully Boy soundtrack is pure magic! 🎵 Invested in this project and it\'s already showing great returns. The music never disappoints! #GullyBoy #Music #Investment',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop'
    },
    likes: 567,
    comments: 45,
    shares: 78,
    views: 8900,
    timestamp: '2024-03-15T08:45:00Z',
    tags: ['gullyboy', 'music', 'soundtrack', 'returns'],
    trending: false,
    sponsored: false,
    category: 'investment'
  },
  {
    id: '4',
    userId: 'perk_collector',
    userName: 'Perk Collector',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    userVerified: true,
    userFollowers: 23000,
    content: 'Just received my VIP premiere access for Dilwale Dulhania Le Jayenge! The experience was incredible. This is why I love investing in classic films. The perks are unmatched! 🎬✨',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=600&fit=crop'
    },
    likes: 1890,
    comments: 156,
    shares: 289,
    views: 23400,
    timestamp: '2024-03-14T20:30:00Z',
    tags: ['ddlj', 'premiere', 'vip', 'perks'],
    trending: true,
    sponsored: false,
    category: 'perks'
  },
  {
    id: '5',
    userId: 'fan_artist',
    userName: 'Fan Artist',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    userVerified: false,
    userFollowers: 3400,
    content: 'My latest 3 Idiots fan art! Spent 3 days on this one. What do you think? #FanArt #3Idiots #AamirKhan',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&h=600&fit=crop'
    },
    likes: 234,
    comments: 23,
    shares: 12,
    views: 3400,
    timestamp: '2024-03-14T18:20:00Z',
    tags: ['fanart', '3idiots', 'aamirkhan'],
    trending: false,
    sponsored: false,
    category: 'fan-art'
  },
  {
    id: '6',
    userId: 'investment_guru',
    userName: 'Investment Guru',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    userVerified: true,
    userFollowers: 67000,
    content: '📊 Portfolio Update: My Bollywood investments are up 32% this quarter! Key performers: 3 Idiots (+42%), DDLJ (+40%), Andhadhun (+28%). Diversification is key! 💰',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
    },
    likes: 2890,
    comments: 189,
    shares: 456,
    views: 45600,
    timestamp: '2024-03-14T16:45:00Z',
    tags: ['portfolio', 'investment', 'returns', 'bollywood'],
    trending: true,
    sponsored: false,
    category: 'investment'
  },
  {
    id: '7',
    userId: 'movie_buff',
    userName: 'Movie Buff',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    userVerified: false,
    userFollowers: 8900,
    content: 'Behind the scenes from Zindagi Na Milegi Dobara! The friendship chemistry is going to be mind-blowing! 🌟💫',
    media: {
      type: 'video',
      url: 'https://images.unsplash.com/photo-1489599832522-3ea1d11d9e11?w=800&h=600&fit=crop'
    },
    likes: 1234,
    comments: 67,
    shares: 123,
    views: 15600,
    timestamp: '2024-03-14T14:30:00Z',
    tags: ['znmd', 'friendship', 'bts', 'chemistry'],
    trending: false,
    sponsored: false,
    category: 'general'
  },
  {
    id: '8',
    userId: 'circle_admin',
    userName: 'Circle Admin',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    userVerified: true,
    userFollowers: 12000,
    content: '🎉 Welcome to all new members joining the Classic Cinema Circle! We\'re now 50K+ strong! Let\'s make this the most vibrant classic film investment community! #ClassicCinema',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=600&fit=crop'
    },
    likes: 890,
    comments: 45,
    shares: 67,
    views: 12300,
    timestamp: '2024-03-14T12:00:00Z',
    tags: ['classiccinema', 'welcome', 'community', 'members'],
    trending: false,
    sponsored: true,
    category: 'general'
  },
  {
    id: '9',
    userId: 'thriller_fan',
    userName: 'Thriller Fan',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    userVerified: true,
    userFollowers: 18000,
    content: 'Andhadhun is a masterpiece! 🎭 The suspense and music are perfectly crafted. My investment is already showing 28% returns. Sriram Raghavan never disappoints! #Andhadhun #Thriller',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1489599832522-3ea1d11d9e11?w=800&h=600&fit=crop'
    },
    likes: 1456,
    comments: 78,
    shares: 156,
    views: 18900,
    timestamp: '2024-03-14T10:15:00Z',
    tags: ['andhadhun', 'thriller', 'sriram', 'returns'],
    trending: false,
    sponsored: false,
    category: 'review'
  },
  {
    id: '10',
    userId: 'hollywood_watcher',
    userName: 'Hollywood Watcher',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    userVerified: true,
    userFollowers: 34000,
    content: 'Oppenheimer is a cinematic triumph! 🎬 Christopher Nolan\'s masterpiece is breaking records. My investment is up 45% already! #Oppenheimer #Nolan #Cinema',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=600&fit=crop'
    },
    likes: 2345,
    comments: 167,
    shares: 345,
    views: 45600,
    timestamp: '2024-03-14T08:30:00Z',
    tags: ['oppenheimer', 'nolan', 'hollywood', 'cinema'],
    trending: true,
    sponsored: false,
    category: 'review'
  },
  {
    id: '11',
    userId: 'music_producer',
    userName: 'Music Producer',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    userVerified: true,
    userFollowers: 28000,
    content: 'The Barbie soundtrack is pure gold! 🎵 Every song is a hit. My investment in the music rights is paying off big time! #Barbie #Music #Soundtrack',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop'
    },
    likes: 1789,
    comments: 123,
    shares: 234,
    views: 28900,
    timestamp: '2024-03-14T06:45:00Z',
    tags: ['barbie', 'music', 'soundtrack', 'investment'],
    trending: false,
    sponsored: false,
    category: 'investment'
  },
  {
    id: '12',
    userId: 'behind_scenes',
    userName: 'Behind the Scenes',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    userVerified: true,
    userFollowers: 45000,
    content: 'Exclusive: Behind the scenes of Avatar 3! 🎬 The technology is mind-blowing. James Cameron is pushing boundaries again! #Avatar3 #BehindTheScenes #Cameron',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1489599832522-3ea1d11d9e11?w=800&h=600&fit=crop'
    },
    likes: 3456,
    comments: 234,
    shares: 567,
    views: 67800,
    timestamp: '2024-03-14T04:20:00Z',
    tags: ['avatar3', 'bts', 'cameron', 'technology'],
    trending: true,
    sponsored: false,
    category: 'behind-scenes'
  },
  {
    id: '13',
    userId: 'fan_creator',
    userName: 'Fan Creator',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    userVerified: false,
    userFollowers: 5600,
    content: 'My latest Pathaan fan art! 🔥 SRK looking absolutely stunning! #Pathaan #SRK #FanArt',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&h=600&fit=crop'
    },
    likes: 890,
    comments: 67,
    shares: 123,
    views: 12300,
    timestamp: '2024-03-14T02:15:00Z',
    tags: ['pathaan', 'srk', 'fanart', 'bollywood'],
    trending: false,
    sponsored: false,
    category: 'fan-art'
  },
  {
    id: '14',
    userId: 'investment_analyst',
    userName: 'Investment Analyst',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    userVerified: true,
    userFollowers: 78000,
    content: '📈 Market Analysis: Bollywood films showing 25% average returns this year! Top performers: Pathaan, Jawan, Animal. Time to diversify your portfolio! 💰',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
    },
    likes: 4567,
    comments: 289,
    shares: 678,
    views: 89000,
    timestamp: '2024-03-14T00:30:00Z',
    tags: ['analysis', 'returns', 'bollywood', 'portfolio'],
    trending: true,
    sponsored: false,
    category: 'investment'
  },
  {
    id: '15',
    userId: 'premiere_access',
    userName: 'Premiere Access',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    userVerified: true,
    userFollowers: 15000,
    content: 'VIP premiere access for Animal! 🎬 The experience was absolutely incredible. Ranbir Kapoor was amazing! This is why I invest in films! #Animal #Premiere #VIP',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=600&fit=crop'
    },
    likes: 2345,
    comments: 178,
    shares: 345,
    views: 34500,
    timestamp: '2024-03-13T22:45:00Z',
    tags: ['animal', 'premiere', 'vip', 'ranbir'],
    trending: true,
    sponsored: false,
    category: 'perks'
  }
]; 