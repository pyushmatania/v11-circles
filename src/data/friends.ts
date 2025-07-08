export interface Friend {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
  mutualCircles: string[];
  investmentCount: number;
  totalInvested: number;
  verified: boolean;
}

export const friends: Friend[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
    mutualCircles: ['Classic Cinema Circle', 'Romance Films Circle'],
    investmentCount: 12,
    totalInvested: 450000,
    verified: true
  },
  {
    id: '2',
    name: 'Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    isOnline: false,
    lastSeen: '2 hours ago',
    mutualCircles: ['Comedy Drama Circle', 'Sports Drama Circle'],
    investmentCount: 8,
    totalInvested: 320000,
    verified: true
  },
  {
    id: '3',
    name: 'Anjali Patel',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
    mutualCircles: ['Classic Cinema Circle', 'Thriller Films Circle'],
    investmentCount: 15,
    totalInvested: 680000,
    verified: true
  },
  {
    id: '4',
    name: 'Vikram Singh',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
    mutualCircles: ['Music Films Circle', 'Friendship Films Circle'],
    investmentCount: 6,
    totalInvested: 280000,
    verified: false
  },
  {
    id: '5',
    name: 'Meera Reddy',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    isOnline: false,
    lastSeen: '1 day ago',
    mutualCircles: ['Classic Cinema Circle', 'Comedy Drama Circle'],
    investmentCount: 10,
    totalInvested: 520000,
    verified: true
  },
  {
    id: '6',
    name: 'Arjun Kapoor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
    mutualCircles: ['Sports Drama Circle'],
    investmentCount: 4,
    totalInvested: 180000,
    verified: false
  },
  {
    id: '7',
    name: 'Sneha Iyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    isOnline: false,
    lastSeen: '30 minutes ago',
    mutualCircles: ['Music Films Circle', 'Thriller Films Circle'],
    investmentCount: 9,
    totalInvested: 410000,
    verified: true
  },
  {
    id: '8',
    name: 'Karan Malhotra',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
    mutualCircles: ['Classic Cinema Circle', 'Romance Films Circle', 'Comedy Drama Circle'],
    investmentCount: 18,
    totalInvested: 890000,
    verified: true
  }
]; 