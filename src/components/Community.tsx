import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Crown, 
  Camera, 
  Video,
  Image,
  Send,
  Settings,
  Bell,
  MoreHorizontal,
  Bookmark,
  Play,
  MapPin,
  Gift,
  Plus,
  CheckCircle,
  ShoppingBag,
  Activity,
  BarChart3,
  Hash,
  Ticket,
  Vote,
  DollarSign
} from 'lucide-react';
import { useTheme } from './ThemeContext';
import useIsMobile from '../hooks/useIsMobile';
import Merchandise from './Merchandise';
import { friends } from '../data/friends';
import { communityPosts, type CommunityPost } from '../data/community';

// Helper function to create new posts
const createNewPost = (content: string, media?: { type: 'image' | 'video' | 'poll'; url?: string; thumbnail?: string; pollOptions?: string[]; pollResults?: number[] }): CommunityPost => {
  return {
    id: Date.now().toString(),
    userId: 'current_user',
    userName: 'You',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    userVerified: true,
    userFollowers: 1234,
    content,
    media,
    likes: 0,
    comments: 0,
    shares: 0,
    views: 0,
    timestamp: new Date().toISOString(),
    tags: [],
    trending: false,
    sponsored: false,
    category: 'general'
  };
};

const Community: React.FC = () => {
  const [selectedCircle, setSelectedCircle] = useState<string>('pathaan-circle');
  const [activeTab, setActiveTab] = useState<'feed' | 'channels' | 'friends' | 'media' | 'perks' | 'merch'>('feed');
  const [newPost, setNewPost] = useState('');
  const [postImage, setPostImage] = useState<File | null>(null);
  const [postVideo, setPostVideo] = useState<File | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [selectedChannel, setSelectedChannel] = useState<string>('announcements');
  const friendsList = friends.map(friend => ({
    id: friend.id,
    name: friend.name,
    avatar: friend.avatar,
    online: friend.isOnline
  }));
  const [selectedFriend, setSelectedFriend] = useState<string>(friendsList[0].id);
  const [friendChats, setFriendChats] = useState<Record<string, {user:string; message:string; time:string; avatar:string}[]>>({
    [friendsList[0].id]: [
      { user: friendsList[0].name, message: 'Hey! Excited for the project?', time: '2:45 PM', avatar: friendsList[0].avatar }
    ]
  });
  const [previewFriend, setPreviewFriend] = useState<string | null>(null);
  const previewTimeout = useRef<number | null>(null);
  const [friendInput, setFriendInput] = useState('');
  const [friendTyping, setFriendTyping] = useState(false);
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  // Add channelMessages state for realistic channel chat
  const initialChannelMessages: Record<string, {user: string; avatar: string; message: string; time: string; type: 'text' | 'image' | 'video'; mediaUrl?: string}[]> = {
    announcements: [
      { user: 'Bollywood Insider', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', message: 'Welcome to the Announcements channel! 🎉', time: '10:00 AM', type: 'text' },
      { user: 'Film Critic Pro', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', message: 'New project launch: Pathaan 2!', time: '10:05 AM', type: 'text' },
      { user: 'Cinema Lover', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', message: 'Check out this poster!', time: '10:10 AM', type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=600&fit=crop' }
    ],
    'investor-hall': [
      { user: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', message: 'How are the returns on Animal?', time: '11:00 AM', type: 'text' },
      { user: 'Rahul Verma', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', message: 'Pretty solid! 15% so far.', time: '11:02 AM', type: 'text' }
    ],
    'creator-talks': [
      { user: 'Siddharth Anand', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', message: 'Ask me anything about directing!', time: '12:00 PM', type: 'text' }
    ],
    'fan-zone': [
      { user: 'Fan Art Creator', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', message: 'Check out my new SRK fan art!', time: '1:00 PM', type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&h=600&fit=crop' }
    ],
    polls: [
      { user: 'Bollywood Updates', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', message: 'Who should star in the next big project?', time: '2:00 PM', type: 'text' }
    ],
    'behind-scenes': [
      { user: 'Movie Buff', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', message: 'Behind the scenes from Pathaan 2!', time: '3:00 PM', type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1489599832522-3ea1d11d9e11?w=800&h=600&fit=crop' }
    ]
  };
  const [channelMessages, setChannelMessages] = useState(initialChannelMessages);
  const [channelInput, setChannelInput] = useState('');



  // Send message to selected friend
  const sendFriendMessage = () => {
    if (!friendInput.trim()) return;
    try { 
      navigator.vibrate?.(30); 
    } catch {
      // Vibration not supported or failed
    }
    const msg = {
      user: 'You',
      message: friendInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50'
    };
    setFriendChats(prev => ({
      ...prev,
      [selectedFriend]: [...(prev[selectedFriend] || []), msg]
    }));
    setFriendInput('');
    setFriendTyping(true);
    setTimeout(() => {
      const friend = friendsList.find(f => f.id === selectedFriend);
      if (friend) {
        const reply = {
          user: friend.name,
          message: 'Auto reply!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: friend.avatar
        };
        setFriendChats(prev => ({
          ...prev,
          [selectedFriend]: [...(prev[selectedFriend] || []), reply]
        }));
      }
      setFriendTyping(false);
    }, 2000);
  };

  const startPreview = (
    id: string,
    setter: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    if (previewTimeout.current) clearTimeout(previewTimeout.current);
    previewTimeout.current = setTimeout(() => setter(id), 500);
  };

  const endPreview = (
    setter: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    if (previewTimeout.current) {
      clearTimeout(previewTimeout.current);
      previewTimeout.current = null;
    }
    setter(null);
  };

  // Mock circles data with key people and detailed info
  const myCircles = [
    {
      id: 'srk-circle',
      name: 'Shah Rukh Khan',
      type: 'actor',
      category: 'Bollywood',
      members: 120000,
      activeMembers: 18000,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      cover: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=600&fit=crop',
      description: 'The King of Bollywood. Actor, producer, and global icon. Known for Pathaan, Jawan, DDLJ, and more.',
      keyPeople: [
        { name: 'Shah Rukh Khan', role: 'Actor', verified: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
        { name: 'Atlee Kumar', role: 'Director', verified: true, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }
      ],
      movieInfo: {
        budget: '₹300 Crores',
        releaseDate: 'September 7, 2023',
        boxOffice: '₹1100 Crores',
        topProjects: ['Jawan', 'Pathaan', 'Chennai Express', 'DDLJ']
      }
    },
    {
      id: 'salman-circle',
      name: 'Salman Khan',
      type: 'actor',
      category: 'Bollywood',
      members: 95000,
      activeMembers: 12000,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      cover: 'https://images.unsplash.com/photo-1489599832522-3ea1d11d9e11?w=800&h=600&fit=crop',
      description: 'Superstar of Bollywood. Known for Tiger, Bajrangi Bhaijaan, Sultan, and more.',
      keyPeople: [
        { name: 'Salman Khan', role: 'Actor', verified: true, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' }
      ],
      movieInfo: {
        budget: '₹200 Crores',
        releaseDate: 'April 21, 2023',
        boxOffice: '₹900 Crores',
        topProjects: ['Tiger 3', 'Bajrangi Bhaijaan', 'Sultan', 'Kick']
      }
    },
    {
      id: 'taylor-circle',
      name: 'Taylor Swift',
      type: 'artist',
      category: 'Hollywood',
      members: 200000,
      activeMembers: 35000,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      description: 'Global pop icon, singer-songwriter, and record-breaking performer. Known for The Eras Tour, 1989, Folklore, and more.',
      keyPeople: [
        { name: 'Taylor Swift', role: 'Artist', verified: true, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' }
      ],
      movieInfo: {
        budget: '$100M',
        releaseDate: 'October 13, 2023',
        boxOffice: '$250M',
        topProjects: ['The Eras Tour', '1989', 'Folklore', 'Lover']
      }
    },
    {
      id: 'cameron-circle',
      name: 'James Cameron',
      type: 'director',
      category: 'Hollywood',
      members: 80000,
      activeMembers: 9000,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      cover: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=600&fit=crop',
      description: 'Legendary director of Avatar, Titanic, Terminator, and more.',
      keyPeople: [
        { name: 'James Cameron', role: 'Director', verified: true, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }
      ],
      movieInfo: {
        budget: '$250M',
        releaseDate: 'December 16, 2022',
        boxOffice: '$2.3B',
        topProjects: ['Avatar', 'Titanic', 'Terminator 2', 'Aliens']
      }
    },
    {
      id: 'katy-circle',
      name: 'Katy Perry',
      type: 'artist',
      category: 'Hollywood',
      members: 65000,
      activeMembers: 7000,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&h=600&fit=crop',
      description: 'Pop superstar, known for hits like Roar, Firework, and Teenage Dream.',
      keyPeople: [
        { name: 'Katy Perry', role: 'Artist', verified: true, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' }
      ],
      movieInfo: {
        budget: '$50M',
        releaseDate: 'August 28, 2020',
        boxOffice: '$100M',
        topProjects: ['Smile', 'Teenage Dream', 'Prism', 'Witness']
      }
    },
    {
      id: 'nolan-circle',
      name: 'Christopher Nolan',
      type: 'director',
      category: 'Hollywood',
      members: 90000,
      activeMembers: 12000,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      description: 'Visionary director of Oppenheimer, Inception, The Dark Knight, Interstellar, and more.',
      keyPeople: [
        { name: 'Christopher Nolan', role: 'Director', verified: true, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' }
      ],
      movieInfo: {
        budget: '$100M',
        releaseDate: 'July 21, 2023',
        boxOffice: '$950M',
        topProjects: ['Oppenheimer', 'Inception', 'The Dark Knight', 'Interstellar']
      }
    },
    {
      id: 'margot-circle',
      name: 'Margot Robbie',
      type: 'actor',
      category: 'Hollywood',
      members: 70000,
      activeMembers: 8000,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      cover: 'https://images.unsplash.com/photo-1489599832522-3ea1d11d9e11?w=800&h=600&fit=crop',
      description: 'Oscar-nominated actress, known for Barbie, I, Tonya, and The Wolf of Wall Street.',
      keyPeople: [
        { name: 'Margot Robbie', role: 'Actress', verified: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' }
      ],
      movieInfo: {
        budget: '$145M',
        releaseDate: 'July 21, 2023',
        boxOffice: '$1.4B',
        topProjects: ['Barbie', 'I, Tonya', 'The Wolf of Wall Street', 'Birds of Prey']
      }
    }
  ];

  const channels = [
    { id: 'announcements', name: 'announcements', icon: '📢', unread: 3 },
    { id: 'investor-hall', name: 'investor-hall', icon: '💰', unread: 8 },
    { id: 'creator-talks', name: 'creator-talks', icon: '🎬', unread: 2 },
    { id: 'fan-zone', name: 'fan-zone', icon: '🎉', unread: 15 },
    { id: 'polls', name: 'polls', icon: '📊', unread: 1 },
    { id: 'behind-scenes', name: 'behind-the-scenes', icon: '🎭', unread: 5 }
  ];

  // Use the rich community posts data
  const [feedPosts, setFeedPosts] = useState<CommunityPost[]>(communityPosts);

  const currentCircle = myCircles.find(circle => circle.id === selectedCircle) || myCircles[0];

  const tabs = [
    { id: 'feed', label: 'Feed', icon: Activity },
    { id: 'channels', label: 'Channels', icon: Hash },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'perks', label: 'Perks', icon: Gift },
    { id: 'merch', label: 'Merch', icon: ShoppingBag }
  ];



  return (
    <div
      className={`relative min-h-screen pt-16 pb-[100px] ${
        theme === 'light'
          ? 'bg-gradient-to-br from-gray-50 via-white to-purple-50'
          : 'bg-gradient-to-br from-black via-gray-900 to-purple-900'
      }`}
    >
      {/* Light theme background orbs */}
      {theme === 'light' && (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="light-gradient-orb-1 top-1/4 left-1/4" />
          <div className="light-gradient-orb-2 bottom-1/3 right-1/4" />
          <div className="light-gradient-orb-3 top-2/3 left-1/2" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-2 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Community
          </h1>
          <p className={`text-base sm:text-lg ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Instagram + Discord for entertainment fans and investors
          </p>
        </motion.div>

        {/* Circle Selector - Instagram Stories Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {myCircles.map((circle, index) => (
              <motion.button
                key={circle.id}
                onClick={() => setSelectedCircle(circle.id)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 transition-all duration-300 snap-center ${
                  selectedCircle === circle.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                    : 'bg-gray-600'
                }`}
              >
                <img 
                  src={circle.avatar}
                  alt={circle.name}
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2">
                  <span className={`text-xs font-medium px-1 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                    theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
                  }`}>
                    {circle.name.split(' ')[0]}
                  </span>
                </div>
              </motion.button>
            ))}
            
            {/* Join More Circles Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: myCircles.length * 0.1 }}
              className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-300 snap-center ${
                theme === 'light'
                  ? 'border-gray-300 text-gray-600 hover:border-purple-400 hover:text-purple-600'
                  : 'border-gray-600 text-gray-400 hover:border-purple-400 hover:text-purple-400'
              }`}
            >
              <Plus className="w-6 h-6 sm:w-8 sm:h-8" />
            </motion.button>
          </div>
        </motion.div>

        {/* Current Circle Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`relative overflow-hidden rounded-2xl backdrop-blur-xl border mb-6 sm:mb-8 ${
            theme === 'light'
              ? 'light-glass-header'
              : 'bg-white/10 border-white/20'
          }`}
        >
          {/* Cover Image */}
          <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
            <img 
              src={currentCircle.cover}
              alt={currentCircle.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Circle Info Overlay */}
            <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6">
              <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                <img 
                  src={currentCircle.avatar}
                  alt={currentCircle.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 sm:border-4 border-white/30"
                />
                <div>
                  <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-1">{currentCircle.name}</h2>
                  <p className="text-gray-300 text-sm sm:text-base">{currentCircle.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{currentCircle.members.toLocaleString()} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  <span>{currentCircle.activeMembers.toLocaleString()} active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key People & Project Info */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Key People */}
              <div>
                <h3 className={`font-bold text-base sm:text-lg mb-3 sm:mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Key People
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {currentCircle.keyPeople.map((person, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3">
                      <div className="relative">
                        <img 
                          src={person.avatar}
                          alt={person.name}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                        />
                        {person.verified && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className={`font-medium text-sm sm:text-base ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          {person.name}
                        </div>
                        <div className={`text-xs sm:text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {person.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div>
                <h3 className={`font-bold text-base sm:text-lg mb-3 sm:mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Project Info
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {Object.entries(currentCircle.movieInfo).map(([key, value], index) => (
                    <div key={index} className="flex justify-between">
                      <span className={`text-xs sm:text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                      </span>
                      <span className={`text-xs sm:text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`flex items-center gap-1 sm:gap-2 p-2 rounded-2xl backdrop-blur-xl border mb-6 sm:mb-8 overflow-x-auto justify-around md:justify-start ${
            theme === 'light'
              ? 'light-glass-header'
              : 'bg-white/10 border-white/20'
          }`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'feed' | 'channels' | 'friends' | 'media' | 'perks' | 'merch')}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : `${theme === 'light' ? 'text-gray-700 hover:bg-white/50 hover:text-gray-900' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`
              }`}
            >
              <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden md:inline text-sm sm:text-base">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
                      {/* Feed Tab */}
            {activeTab === 'feed' && (
              <motion.div
                key="feed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4 sm:space-y-6"
              >
              {/* Create Post */}
              <div className={`p-4 sm:p-6 rounded-2xl backdrop-blur-xl border ${
                theme === 'light'
                  ? 'light-glass-header'
                  : 'bg-white/10 border-white/20'
              }`}>
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <img 
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50"
                    alt="Your avatar"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                  <input
                    type="text"
                    placeholder="Share your thoughts with the community..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border focus:outline-none focus:border-purple-500/50 text-sm sm:text-base ${
                      theme === 'light'
                        ? 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                        : 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                    }`}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-4 flex-wrap">
                    <button
                      onClick={() => photoInputRef.current?.click()}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                        theme === 'light'
                          ? 'text-gray-600 hover:bg-white/50'
                          : 'text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Image className="w-5 h-5" />
                      Photo
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={photoInputRef}
                      onChange={(e) => setPostImage(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <button
                      onClick={() => videoInputRef.current?.click()}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                        theme === 'light'
                          ? 'text-gray-600 hover:bg-white/50'
                          : 'text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Video className="w-5 h-5" />
                      Video
                    </button>
                    <input
                      type="file"
                      accept="video/*"
                      ref={videoInputRef}
                      onChange={(e) => setPostVideo(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <button className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                      theme === 'light'
                        ? 'text-gray-600 hover:bg-white/50'
                        : 'text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}>
                      <BarChart3 className="w-5 h-5" />
                      Poll
                    </button>
                  {postImage && (
                    <img src={URL.createObjectURL(postImage)} alt="preview" className="w-24 h-24 object-cover rounded" />
                  )}
                  {postVideo && (
                    <video src={URL.createObjectURL(postVideo)} className="w-24 h-24 rounded" controls />
                  )}
                  </div>
                  <button
                    onClick={() => {
                      const media = postImage
                        ? { type: 'image' as const, url: URL.createObjectURL(postImage) }
                        : postVideo
                        ? { type: 'video' as const, url: URL.createObjectURL(postVideo) }
                        : undefined;
                      const newEntry = createNewPost(newPost, media);
                      setFeedPosts([newEntry, ...feedPosts]);
                      setNewPost('');
                      setPostImage(null);
                      setPostVideo(null);
                    }}
                    disabled={!newPost.trim()}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-medium hover:from-purple-400 hover:to-blue-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2 sm:mt-0"
                  >
                    Post
                  </button>
                </div>
              </div>

              {/* Feed Posts */}
              <div className="space-y-4 sm:space-y-6">
                {feedPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`p-4 sm:p-6 rounded-2xl backdrop-blur-xl border ${
                      theme === 'light'
                        ? 'light-glass-header hover:shadow-lg hover:shadow-purple-200/50'
                        : 'bg-white/10 border-white/20 hover:border-white/30'
                    } transition-all duration-300`}
                  >
                    {/* Post Header */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <img 
                          src={post.userAvatar}
                          alt={post.userName}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        />
                                                  <div>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <span className={`font-bold text-sm sm:text-base ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {post.userName}
                              </span>
                                                          {post.userVerified && (
                                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                                </div>
                              )}
                              <span className={`px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                              post.category === 'behind-scenes' ? 'bg-purple-500/20 text-purple-400' :
                              post.category === 'news' ? 'bg-yellow-500/20 text-yellow-400' :
                              post.category === 'review' ? 'bg-green-500/20 text-green-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {post.category.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                                                      <div className={`text-xs sm:text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            {new Date(post.timestamp).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                      <button className={`p-2 rounded-lg transition-all duration-300 ${
                        theme === 'light'
                          ? 'text-gray-600 hover:bg-white/50'
                          : 'text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}>
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Post Content */}
                    <div className={`mb-4 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                      {post.content}
                    </div>

                    {/* Media Content */}
                    {post.media && (
                      <div className="mb-4">
                        <div className="relative rounded-xl overflow-hidden">
                          {post.media.type === 'image' && post.media.url && (
                            <img 
                              src={post.media.url}
                              alt="Post media"
                              className="w-full h-64 object-cover"
                            />
                          )}
                          {post.media.type === 'video' && post.media.thumbnail && (
                            <div className="relative">
                              <img 
                                src={post.media.thumbnail}
                                alt="Video thumbnail"
                                className="w-full h-64 object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                                  <Play className="w-8 h-8 text-white ml-1" />
                                </button>
                              </div>
                            </div>
                          )}
                          {post.media.type === 'poll' && post.media.pollOptions && (
                            <div className="p-4 bg-white/10 rounded-xl">
                              <h4 className={`font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                Poll
                              </h4>
                              <div className="space-y-2">
                                {post.media.pollOptions.map((option: string, idx: number) => (
                                  <div key={idx} className="relative">
                                    <div className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer hover:bg-white/10 ${
                                      theme === 'light' ? 'border-gray-200' : 'border-white/20'
                                    }`}>
                                      <span className={`${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                                        {option}
                                      </span>
                                      {post.media?.pollResults && (
                                        <div className="mt-2">
                                          <div className="flex justify-between text-sm text-gray-500 mb-1">
                                            <span>{post.media.pollResults[idx]} votes</span>
                                            <span>{Math.round((post.media.pollResults[idx] / post.media.pollResults.reduce((a: number, b: number) => a + b, 0)) * 100)}%</span>
                                          </div>
                                          <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                                              style={{ width: `${(post.media.pollResults[idx] / post.media.pollResults.reduce((a: number, b: number) => a + b, 0)) * 100}%` }}
                                            />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Engagement Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <span>{post.views.toLocaleString()} views</span>
                      {post.trending && (
                        <span className="flex items-center gap-1 text-orange-500">
                          <Activity className="w-4 h-4" />
                          Trending
                        </span>
                      )}
                      {post.sponsored && (
                        <span className="flex items-center gap-1 text-purple-500">
                          <DollarSign className="w-4 h-4" />
                          Sponsored
                        </span>
                      )}
                    </div>

                    {/* Engagement Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-6">
                        <button className={`flex items-center gap-2 transition-all duration-300 ${
                          theme === 'light'
                            ? 'text-gray-600 hover:text-red-500'
                            : 'text-gray-400 hover:text-red-400'
                        }`}>
                          <Heart className="w-5 h-5" />
                          <span className="text-sm">Like</span>
                        </button>
                        <button className={`flex items-center gap-2 transition-all duration-300 ${
                          theme === 'light'
                            ? 'text-gray-600 hover:text-blue-500'
                            : 'text-gray-400 hover:text-blue-400'
                        }`}>
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm">{post.comments} Comments</span>
                        </button>
                        <button className={`flex items-center gap-2 transition-all duration-300 ${
                          theme === 'light'
                            ? 'text-gray-600 hover:text-green-500'
                            : 'text-gray-400 hover:text-green-400'
                        }`}>
                          <Share2 className="w-5 h-5" />
                          <span className="text-sm">{post.shares} Shares</span>
                        </button>
                      </div>
                      <button className={`transition-all duration-300 ${
                        theme === 'light'
                          ? 'text-gray-600 hover:text-yellow-500'
                          : 'text-gray-400 hover:text-yellow-400'
                      }`}>
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Channels Tab */}
          {activeTab === 'channels' && (
            <motion.div
              key="channels"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {/* Channel List */}
              <div className={`col-span-1 lg:col-span-1 p-6 rounded-2xl backdrop-blur-xl border ${theme === 'light' ? 'light-glass-header' : 'bg-white/10 border-white/20'} hidden md:block`}>
                <h3 className={`font-bold text-lg mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Channels</h3>
                <div className="space-y-2">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${selectedChannel === channel.id ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : `${theme === 'light' ? 'text-gray-700 hover:bg-white/50' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{channel.icon}</span>
                        {!isMobile && <span className="font-medium">#{channel.name}</span>}
                      </div>
                      {channelMessages[channel.id]?.length > 0 && (
                        <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                          {channelMessages[channel.id].length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              {/* Chat Area */}
              <div className={`col-span-1 md:col-span-2 lg:col-span-3 p-6 rounded-2xl backdrop-blur-xl border ${theme === 'light' ? 'light-glass-header' : 'bg-white/10 border-white/20'} ${isMobile ? 'pb-24' : ''}`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`font-bold text-xl ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>#{selectedChannel}</h3>
                  <div className="flex items-center gap-2">
                    <button className={`p-2 rounded-lg transition-all duration-300 ${theme === 'light' ? 'text-gray-600 hover:bg-white/50' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}><Bell className="w-5 h-5" /></button>
                    <button className={`p-2 rounded-lg transition-all duration-300 ${theme === 'light' ? 'text-gray-600 hover:bg-white/50' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}><Settings className="w-5 h-5" /></button>
                  </div>
                </div>
                {/* Channel Chat Messages */}
                <div className="space-y-4 mb-6 h-96 overflow-y-auto">
                  {(channelMessages[selectedChannel] || []).map((msg, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <img src={msg.avatar} alt={msg.user} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{msg.user}</span>
                          <span className="text-xs text-gray-400">{msg.time}</span>
                        </div>
                        {msg.type === 'text' && <div className="bg-white/20 rounded-xl px-4 py-2 mt-1 text-gray-900 dark:text-white">{msg.message}</div>}
                        {msg.type === 'image' && <img src={msg.mediaUrl} alt="sent" className="max-w-[180px] rounded-lg mt-2" />}
                        {msg.type === 'video' && <video src={msg.mediaUrl} controls className="max-w-[180px] rounded-lg mt-2" />}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Channel Message Input */}
                <form className="flex items-center gap-2 mt-auto" onSubmit={e => { e.preventDefault(); if (!channelInput.trim()) return; setChannelMessages(prev => ({ ...prev, [selectedChannel]: [...(prev[selectedChannel] || []), { user: 'You', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', message: channelInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'text' }] })); setChannelInput(''); }}>
                  <input type="text" className="flex-1 px-4 py-2 rounded-full border bg-white/80 text-gray-900" placeholder="Type a message..." value={channelInput} onChange={e => setChannelInput(e.target.value)} />
                  <button type="submit" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-bold">Send</button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Friends Tab */}
          {activeTab === 'friends' && (
            <motion.div
              key="friends"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              <div
                className={`col-span-1 lg:col-span-1 p-6 rounded-2xl backdrop-blur-xl border ${
                  theme === 'light' ? 'light-glass-header' : 'bg-white/10 border-white/20'
                } hidden md:block`}
              >
                <h3 className={`font-bold text-lg mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Friends</h3>
                <div className="space-y-2">
                  {friendsList.map(friend => (
                    <button
                      key={friend.id}
                      onClick={() => setSelectedFriend(friend.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                        selectedFriend === friend.id
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                          : theme === 'light'
                          ? 'text-gray-700 hover:bg-white/50'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <img src={friend.avatar} alt={friend.name} className="w-8 h-8 rounded-full object-cover" />
                      {!isMobile && <span className="font-medium">{friend.name}</span>}
                      {friend.online && <span className="ml-auto w-3 h-3 bg-green-400 rounded-full" />}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`col-span-1 md:col-span-2 lg:col-span-3 p-6 rounded-2xl backdrop-blur-xl border ${
                  theme === 'light' ? 'light-glass-header' : 'bg-white/10 border-white/20'
                } ${isMobile ? 'pb-24' : ''}`}
              >
                {isMobile && (
                  <div className="flex gap-3 overflow-x-auto pb-4 pt-4 -mx-2 px-2 scrollbar-hide snap-x snap-mandatory">
                    {friendsList.map(friend => (
                      <button
                        key={friend.id}
                        onClick={() => setSelectedFriend(friend.id)}
                        onTouchStart={() => startPreview(friend.id, setPreviewFriend)}
                        onTouchEnd={() => endPreview(setPreviewFriend)}
                        onMouseDown={() => startPreview(friend.id, setPreviewFriend)}
                        onMouseUp={() => endPreview(setPreviewFriend)}
                        onMouseLeave={() => endPreview(setPreviewFriend)}
                        className={`relative flex-shrink-0 w-12 h-12 rounded-full overflow-hidden transition-all duration-300 snap-center ${
                          selectedFriend === friend.id ? 'ring-2 ring-purple-500' : ''
                        }`}
                      >
                        <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
                        {previewFriend === friend.id && (
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded bg-black text-white whitespace-nowrap">
                            {friend.name}
                          </div>
                        )}
                        {friend.online && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`font-bold text-xl ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Chat with {friendsList.find(f => f.id === selectedFriend)?.name}</h3>
                </div>
                <AnimatePresence mode="wait" key={selectedFriend}>
                  <motion.div
                    key={selectedFriend}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 mb-6 h-96 overflow-y-auto"
                  >
                    {(friendChats[selectedFriend] || []).map((msg, index) => (
                      <div key={index} className="flex gap-3">
                        <img src={msg.avatar} alt={msg.user} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{msg.user}</span>
                            <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>{msg.time}</span>
                          </div>
                          <div className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{msg.message}</div>
                        </div>
                      </div>
                  ))}
                    {friendTyping && (
                      <div className="flex gap-3">
                        <img src={friendsList.find(f => f.id === selectedFriend)?.avatar} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex items-center text-sm italic text-gray-500">Typing...</div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="flex gap-3 sticky bottom-0 pb-4 bg-inherit">
                  <input
                    type="text"
                    placeholder="Message"
                    value={friendInput}
                    onChange={(e) => setFriendInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        sendFriendMessage();
                      }
                    }}
                    className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:border-purple-500/50 ${
                      theme === 'light'
                        ? 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                        : 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                    }`}
                  />
                  <button
                    onClick={sendFriendMessage}
                    disabled={!friendInput.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-medium hover:from-purple-400 hover:to-blue-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <motion.div
              key="media"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Media Filters */}
              <div className="flex gap-4">
                {['All', 'Photos', 'Videos', 'Audio'].map((filter) => (
                  <button
                    key={filter}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      filter === 'All'
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : `${theme === 'light' ? 'bg-white/50 text-gray-700 hover:bg-white/80' : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'}`
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Masonry Style Media Grid */}
              <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {[
                  // People - Unique images
                  { url: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop&crop=face', height: 'h-64', category: 'People' },
                  { url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop&crop=face', height: 'h-80', category: 'People' },
                  { url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop&crop=face', height: 'h-72', category: 'People' },
                  
                  // Pets
                  { url: 'https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg?auto=compress&cs=tinysrgb&w=800', height: 'h-96', category: 'Pets' },
                  { url: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800', height: 'h-56', category: 'Pets' },
                  { url: 'https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=800', height: 'h-88', category: 'Pets' },
                  
                  // Nature
                  { url: 'https://images.pexels.com/photos/2387866/pexels-photo-2387866.jpeg?auto=compress&cs=tinysrgb&w=800', height: 'h-64', category: 'Nature' },
                  { url: 'https://images.pexels.com/photos/2387869/pexels-photo-2387869.jpeg?auto=compress&cs=tinysrgb&w=800', height: 'h-80', category: 'Nature' },
                  { url: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800', height: 'h-72', category: 'Nature' },
                  
                  // More People - Different unique images
                  { url: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop&crop=face', height: 'h-96', category: 'People' },
                  { url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop&crop=face', height: 'h-56', category: 'People' },
                  { url: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop&crop=face', height: 'h-88', category: 'People' },
                  
                  // More Pets
                  { url: 'https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg?auto=compress&cs=tinysrgb&w=800', height: 'h-64', category: 'Pets' },
                  { url: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800', height: 'h-80', category: 'Pets' },
                  { url: 'https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=800', height: 'h-72', category: 'Pets' },
                  
                  // More Nature
                  { url: 'https://images.pexels.com/photos/2387866/pexels-photo-2387866.jpeg?auto=compress&cs=tinysrgb&w=800', height: 'h-96', category: 'Nature' },
                  { url: 'https://images.pexels.com/photos/2387869/pexels-photo-2387869.jpeg?auto=compress&cs=tinysrgb&w=800', height: 'h-56', category: 'Nature' },
                  { url: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800', height: 'h-88', category: 'Nature' }
                ].map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative ${image.height} rounded-xl overflow-hidden group cursor-pointer bg-gray-800 mb-4 break-inside-avoid`}
                  >
                    <img 
                      src={image.url}
                      alt={`${image.category} ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{
                        filter: 'grayscale(30%) contrast(110%) brightness(90%)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="text-white text-sm font-medium">{image.category} {index + 1}</div>
                      <div className="text-gray-300 text-xs">Aesthetic Collection</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Perks Tab */}
          {activeTab === 'perks' && (
            <motion.div
              key="perks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {[
                { 
                  title: 'Premiere Screening Access', 
                  description: 'VIP access to the movie premiere with red carpet', 
                  status: 'Available', 
                  type: 'exclusive', 
                  icon: Ticket,
                  metadata: {
                    location: 'Mumbai Multiplex',
                    maxParticipants: 100,
                    currentParticipants: 45,
                    virtual: false,
                    requiresVerification: true,
                    estimatedValue: 15000,
                    tags: ['premiere', 'vip', 'red-carpet'],
                    date: '2024-06-10'
                  }
                },
                { 
                  title: 'Signed Poster Collection', 
                  description: 'Limited edition signed posters', 
                  status: 'Claimed', 
                  type: 'limited', 
                  icon: Gift,
                  metadata: {
                    maxParticipants: 50,
                    currentParticipants: 50,
                    virtual: true,
                    requiresVerification: false,
                    estimatedValue: 8000,
                    tags: ['signed', 'limited-edition', 'poster'],
                    date: '2024-02-15'
                  }
                },
                { 
                  title: 'Behind-the-Scenes Footage', 
                  description: 'Exclusive BTS content access', 
                  status: 'Available', 
                  type: 'free', 
                  icon: Camera,
                  metadata: {
                    virtual: true,
                    requiresVerification: false,
                    estimatedValue: 3000,
                    tags: ['bts', 'exclusive', 'content'],
                    date: '2024-03-01'
                  }
                },
                { 
                  title: 'Executive Producer Credit', 
                  description: 'Your name in the end credits', 
                  status: 'Active', 
                  type: 'exclusive', 
                  icon: Crown,
                  metadata: {
                    virtual: false,
                    requiresVerification: true,
                    estimatedValue: 35000,
                    tags: ['credits', 'executive-producer', 'recognition'],
                    date: '2024-03-20'
                  }
                },
                { 
                  title: 'Set Visit Experience', 
                  description: 'Visit the movie set during filming', 
                  status: 'Upcoming', 
                  type: 'exclusive', 
                  icon: MapPin,
                  metadata: {
                    location: 'Film City, Mumbai',
                    maxParticipants: 20,
                    currentParticipants: 12,
                    virtual: false,
                    requiresVerification: true,
                    estimatedValue: 25000,
                    tags: ['set-visit', 'exclusive', 'experience'],
                    date: '2024-05-20'
                  }
                },
                { 
                  title: 'Community Casting Vote', 
                  description: 'Vote on cast members for projects', 
                  status: 'Available', 
                  type: 'voting', 
                  icon: Users,
                  metadata: {
                    maxParticipants: 200,
                    currentParticipants: 78,
                    virtual: true,
                    requiresVerification: true,
                    estimatedValue: 5000,
                    tags: ['voting', 'casting', 'community'],
                    date: '2024-04-15'
                  }
                },
                { 
                  title: 'Fan Voting Board', 
                  description: 'Vote on posters, trailers, and scenes', 
                  status: 'Active', 
                  type: 'voting', 
                  icon: Vote,
                  metadata: {
                    virtual: true,
                    requiresVerification: false,
                    estimatedValue: 3000,
                    tags: ['voting', 'fan-engagement', 'creative-input'],
                    date: '2024-04-10'
                  }
                },
                { 
                  title: 'Virtual Q&A Sessions', 
                  description: 'Direct interaction with cast and crew', 
                  status: 'Upcoming', 
                  type: 'exclusive', 
                  icon: MessageCircle,
                  metadata: {
                    maxParticipants: 50,
                    currentParticipants: 25,
                    virtual: true,
                    requiresVerification: true,
                    estimatedValue: 8000,
                    tags: ['q&a', 'director', 'virtual', 'exclusive'],
                    date: '2024-02-20'
                  }
                }
              ].map((perk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`p-4 sm:p-6 rounded-2xl backdrop-blur-xl border min-h-[240px] sm:min-h-[200px] flex flex-col justify-between ${
                    theme === 'light'
                      ? 'light-glass-header hover:shadow-lg hover:shadow-purple-200/50'
                      : 'bg-white/10 border-white/20 hover:border-white/30'
                  } transition-all duration-300`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="p-3 rounded-xl bg-white/10 flex items-center justify-center self-start">
                      <perk.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className={`font-bold text-lg truncate ${theme === 'light' ? 'text-gray-900' : 'text-white'} flex-1`}>
                          {perk.title}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                          perk.type === 'free' ? 'bg-green-100 text-green-700' :
                          perk.type === 'paid' ? 'bg-blue-100 text-blue-700' :
                          perk.type === 'voting' ? 'bg-purple-100 text-purple-700' :
                          perk.type === 'bidding' ? 'bg-orange-100 text-orange-700' :
                          perk.type === 'exclusive' ? 'bg-pink-100 text-pink-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>{perk.type}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                          perk.status === 'Active' ? 'bg-green-100 text-green-700' :
                          perk.status === 'Available' ? 'bg-blue-100 text-blue-700' :
                          perk.status === 'Claimed' ? 'bg-purple-100 text-purple-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>{perk.status}</span>
                      </div>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-3 sm:mb-2 truncate`}>
                        {perk.description}
                      </p>
                      {/* Metadata Row */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-400 mb-3 sm:mb-2">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-semibold text-white">₹{perk.metadata.estimatedValue?.toLocaleString() || 'N/A'}</span>
                        </div>
                        {perk.metadata.location && !perk.metadata.virtual && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{perk.metadata.location}</span>
                          </div>
                        )}
                        {perk.metadata.maxParticipants && perk.metadata.maxParticipants > 0 && (
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{perk.metadata.currentParticipants || 0}/{perk.metadata.maxParticipants}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          {perk.metadata.virtual ? (
                            <span className="text-blue-400 font-medium">Virtual</span>
                          ) : (
                            <span className="text-green-400 font-medium">In-Person</span>
                          )}
                        </div>
                      </div>
                      {/* Tags */}
                      {perk.metadata.tags && perk.metadata.tags.length > 0 && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                            {perk.metadata.tags[0]}
                          </span>
                          {perk.metadata.tags.length > 1 && (
                            <span className="text-xs text-gray-400 font-medium">
                              +{perk.metadata.tags.length - 1} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-2 border-t border-white/10">
                    <span className="text-xs text-gray-500 font-medium">
                      {perk.metadata.date}
                    </span>
                    {perk.metadata.requiresVerification && (
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full font-semibold">
                        Verification Required
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Merch Tab */}
          {activeTab === 'merch' && (
            <motion.div
              key="merch"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Merchandise />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Community;