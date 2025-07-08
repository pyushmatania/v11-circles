import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Filter, 
  Search, 
  Star, 
  Heart, 
  ShoppingCart, 
  Grid3X3, 
  List, 
  X,
  Shirt,
  Watch,
  Trophy,
  Crown,
  Tag,
  Clock,
  TrendingUp,
  Zap,
  Gift,
  Package
} from 'lucide-react';
import { useTheme } from './ThemeContext';

interface MerchandiseItem {
  id: string;
  title: string;
  category: 'apparel' | 'accessories' | 'collectibles' | 'limited-editions';
  price: number;
  originalPrice?: number;
  priceType: 'fixed' | 'auction' | 'free';
  image: string;
  description: string;
  availability: 'in-stock' | 'limited' | 'sold-out' | 'pre-order';
  rating: number;
  reviews: number;
  tags: string[];
  releaseDate: string;
  popularity: number;
  project?: string;
  isLimited?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
}

const Merchandise: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [selectedPriceType, setSelectedPriceType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Set<string>>(new Set());

  const { theme, currentGradient } = useTheme();

  // Mock merchandise data
  const merchandiseItems: MerchandiseItem[] = [
    {
      id: '1',
      title: 'Pathaan 2 Limited Edition T-Shirt',
      category: 'apparel',
      price: 1299,
      originalPrice: 1599,
      priceType: 'fixed',
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Premium cotton t-shirt with exclusive Pathaan 2 artwork',
      availability: 'limited',
      rating: 4.8,
      reviews: 234,
      tags: ['Bollywood', 'Action', 'Shah Rukh Khan', 'Limited'],
      releaseDate: '2024-01-15',
      popularity: 95,
      project: 'Pathaan 2',
      isLimited: true,
      isTrending: true,
      isNew: true
    },
    {
      id: '2',
      title: 'RRR 2 Collector\'s Watch',
      category: 'accessories',
      price: 4999,
      priceType: 'fixed',
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Luxury watch with RRR 2 themed design and engravings',
      availability: 'in-stock',
      rating: 4.9,
      reviews: 89,
      tags: ['Regional', 'Epic', 'Luxury', 'Collector'],
      releaseDate: '2024-02-01',
      popularity: 88,
      project: 'RRR 2',
      isLimited: true
    },
    {
      id: '3',
      title: 'A.R. Rahman Symphony Vinyl Record',
      category: 'collectibles',
      price: 2499,
      priceType: 'auction',
      image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Limited edition vinyl record signed by A.R. Rahman',
      availability: 'limited',
      rating: 5.0,
      reviews: 156,
      tags: ['Music', 'Vinyl', 'Signed', 'Classical'],
      releaseDate: '2024-01-20',
      popularity: 92,
      project: 'A.R. Rahman: Symphony of India',
      isLimited: true,
      isTrending: true
    },
    {
      id: '4',
      title: 'KGF Chapter 3 Action Figure',
      category: 'collectibles',
      price: 3299,
      priceType: 'fixed',
      image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Detailed action figure of Rocky Bhai from KGF Chapter 3',
      availability: 'pre-order',
      rating: 4.7,
      reviews: 67,
      tags: ['Action Figure', 'KGF', 'Rocky', 'Collectible'],
      releaseDate: '2024-03-15',
      popularity: 85,
      project: 'KGF Chapter 3',
      isNew: true
    },
    {
      id: '5',
      title: 'Circles Investor Hoodie',
      category: 'apparel',
      price: 2199,
      priceType: 'fixed',
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Premium hoodie for Circles platform investors',
      availability: 'in-stock',
      rating: 4.6,
      reviews: 312,
      tags: ['Circles', 'Investor', 'Premium', 'Comfort'],
      releaseDate: '2024-01-01',
      popularity: 78,
      isTrending: true
    },
    {
      id: '6',
      title: 'Sacred Games 3 Poster Set',
      category: 'collectibles',
      price: 0,
      priceType: 'free',
      image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Free poster set for Sacred Games 3 investors',
      availability: 'in-stock',
      rating: 4.4,
      reviews: 445,
      tags: ['Free', 'Poster', 'Sacred Games', 'Netflix'],
      releaseDate: '2024-02-10',
      popularity: 70,
      project: 'Sacred Games 3'
    },
    {
      id: '7',
      title: 'Vikram 2 Tactical Gear Set',
      category: 'accessories',
      price: 5999,
      priceType: 'fixed',
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Tactical accessories inspired by Vikram 2',
      availability: 'limited',
      rating: 4.8,
      reviews: 123,
      tags: ['Tactical', 'Vikram', 'Accessories', 'Action'],
      releaseDate: '2024-02-20',
      popularity: 82,
      project: 'Vikram 2',
      isLimited: true
    },
    {
      id: '8',
      title: 'Pushpa 3 Golden Chain',
      category: 'limited-editions',
      price: 15999,
      priceType: 'auction',
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Limited edition golden chain replica from Pushpa 3',
      availability: 'limited',
      rating: 4.9,
      reviews: 45,
      tags: ['Gold', 'Pushpa', 'Limited', 'Luxury'],
      releaseDate: '2024-03-01',
      popularity: 98,
      project: 'Pushpa 3: The Rampage',
      isLimited: true,
      isTrending: true,
      isNew: true
    },
    {
      id: '9',
      title: 'John Wick 5 Coffee Mug',
      category: 'collectibles',
      price: 799,
      priceType: 'fixed',
      image: 'https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Ceramic mug featuring artwork from John Wick 5',
      availability: 'in-stock',
      rating: 4.5,
      reviews: 58,
      tags: ['Action', 'Keanu Reeves', 'Mug'],
      releaseDate: '2024-03-05',
      popularity: 65,
      project: 'John Wick 5'
    },
    {
      id: '10',
      title: 'Avatar Voyager Backpack',
      category: 'accessories',
      price: 3599,
      priceType: 'fixed',
      image: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Durable backpack inspired by Avatar sequel',
      availability: 'pre-order',
      rating: 4.7,
      reviews: 34,
      tags: ['Avatar', 'Adventure', 'Bag'],
      releaseDate: '2024-04-01',
      popularity: 80,
      project: 'Avatar: The Seed Bearer',
      isNew: true
    },
    {
      id: '11',
      title: 'Mirzapur 4 Keychain',
      category: 'collectibles',
      price: 299,
      priceType: 'fixed',
      image: 'https://images.pexels.com/photos/275783/pexels-photo-275783.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Metal keychain with Mirzapur logo',
      availability: 'in-stock',
      rating: 4.3,
      reviews: 77,
      tags: ['Mirzapur', 'Keychain'],
      releaseDate: '2024-02-25',
      popularity: 60,
      project: 'Mirzapur 4'
    },
    {
      id: '12',
      title: 'Kantara Forest Hat',
      category: 'apparel',
      price: 899,
      priceType: 'fixed',
      image: 'https://images.pexels.com/photos/404168/pexels-photo-404168.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Adventure hat themed after Kantara locations',
      availability: 'in-stock',
      rating: 4.2,
      reviews: 54,
      tags: ['Kantara', 'Adventure'],
      releaseDate: '2024-03-18',
      popularity: 55,
      isNew: true
    },
    {
      id: '13',
      title: 'Marvel Multiverse Poster Pack',
      category: 'collectibles',
      price: 1299,
      priceType: 'fixed',
      image: 'https://images.pexels.com/photos/1307348/pexels-photo-1307348.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Set of high quality posters from upcoming Marvel saga',
      availability: 'pre-order',
      rating: 4.9,
      reviews: 201,
      tags: ['Marvel', 'Poster', 'Limited'],
      releaseDate: '2024-04-15',
      popularity: 99,
      isLimited: true,
      isTrending: true
    },
    {
      id: '14',
      title: 'Game of Thrones Chess Set',
      category: 'limited-editions',
      price: 5999,
      priceType: 'auction',
      image: 'https://images.pexels.com/photos/277092/pexels-photo-277092.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Collector chess set featuring iconic GoT characters',
      availability: 'limited',
      rating: 4.8,
      reviews: 68,
      tags: ['Chess', 'GoT', 'Collector'],
      releaseDate: '2024-05-01',
      popularity: 85,
      project: 'Game of Thrones',
      isLimited: true
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', icon: Package },
    { id: 'apparel', label: 'Apparel', icon: Shirt },
    { id: 'accessories', label: 'Accessories', icon: Watch },
    { id: 'collectibles', label: 'Collectibles', icon: Trophy },
    { id: 'limited-editions', label: 'Limited Editions', icon: Crown }
  ];

  const availabilityOptions = [
    { id: 'all', label: 'All Items' },
    { id: 'in-stock', label: 'In Stock' },
    { id: 'limited', label: 'Limited Stock' },
    { id: 'pre-order', label: 'Pre-Order' },
    { id: 'sold-out', label: 'Sold Out' }
  ];

  const priceTypeOptions = [
    { id: 'all', label: 'All Types' },
    { id: 'fixed', label: 'Fixed Price' },
    { id: 'auction', label: 'Auction' },
    { id: 'free', label: 'Free Items' }
  ];

  const sortOptions = [
    { id: 'popularity', label: 'Most Popular' },
    { id: 'newest', label: 'Newest First' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'trending', label: 'Trending' }
  ];

  // Filter and sort items
  const filteredItems = merchandiseItems.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesAvailability = selectedAvailability === 'all' || item.availability === selectedAvailability;
    const matchesPriceType = selectedPriceType === 'all' || item.priceType === selectedPriceType;
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesAvailability && matchesPriceType && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'trending':
        return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      default: // popularity
        return b.popularity - a.popularity;
    }
  });

  const toggleFavorite = (itemId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavorites(newFavorites);
  };

  const toggleCart = (itemId: string) => {
    const newCart = new Set(cart);
    if (newCart.has(itemId)) {
      newCart.delete(itemId);
    } else {
      newCart.add(itemId);
    }
    setCart(newCart);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedAvailability('all');
    setSelectedPriceType('all');
    setPriceRange([0, 10000]);
    setSortBy('popularity');
    setSearchTerm('');
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in-stock': return 'text-green-400';
      case 'limited': return 'text-yellow-400';
      case 'pre-order': return 'text-blue-400';
      case 'sold-out': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getPriceTypeIcon = (priceType: string) => {
    switch (priceType) {
      case 'auction': return <Clock className="w-4 h-4" />;
      case 'free': return <Gift className="w-4 h-4" />;
      default: return <Tag className="w-4 h-4" />;
    }
  };

  return (
    <div className={`min-h-screen pt-20 pb-[100px] transition-all duration-[3000ms] ${
      theme === 'light'
        ? currentGradient === 0 ? 'bg-gradient-to-br from-green-50 to-emerald-50' :
          currentGradient === 1 ? 'bg-gradient-to-br from-orange-50 to-red-50' :
          currentGradient === 2 ? 'bg-gradient-to-br from-blue-50 to-cyan-50' :
          currentGradient === 3 ? 'bg-gradient-to-br from-emerald-50 to-green-50' :
          'bg-gradient-to-br from-purple-50 to-fuchsia-50'
        : 'bg-gradient-to-br from-black via-gray-900 to-purple-900'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`p-4 rounded-2xl transition-all duration-[3000ms] ${
                theme === 'light' 
                  ? currentGradient === 0 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    currentGradient === 1 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                    currentGradient === 2 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                    currentGradient === 3 ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
                    'bg-gradient-to-r from-purple-500 to-fuchsia-500'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}
            >
              <ShoppingBag className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className={`text-4xl md:text-5xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Exclusive{' '}
                <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-all duration-[3000ms] ${
                  theme === 'light'
                    ? currentGradient === 0 ? 'from-green-600 to-emerald-600' :
                      currentGradient === 1 ? 'from-orange-600 to-red-600' :
                      currentGradient === 2 ? 'from-blue-600 to-cyan-600' :
                      currentGradient === 3 ? 'from-emerald-600 to-green-600' :
                      'from-purple-600 to-fuchsia-600'
                    : 'from-purple-400 to-pink-400'
                }`}>
                  Merchandise
                </span>
              </h1>
              <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                Official merchandise from your favorite projects and exclusive Circles gear
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Package, label: 'Total Items', value: merchandiseItems.length.toString(), color: 'text-blue-400' },
              { icon: Crown, label: 'Limited Editions', value: merchandiseItems.filter(i => i.isLimited).length.toString(), color: 'text-yellow-400' },
              { icon: TrendingUp, label: 'Trending', value: merchandiseItems.filter(i => i.isTrending).length.toString(), color: 'text-green-400' },
              { icon: Zap, label: 'New Arrivals', value: merchandiseItems.filter(i => i.isNew).length.toString(), color: 'text-purple-400' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-4 rounded-xl backdrop-blur-xl border transition-all duration-[3000ms] ${
                  theme === 'light'
                    ? currentGradient === 0 ? 'bg-green-50/50 border-green-200/60' :
                      currentGradient === 1 ? 'bg-orange-50/50 border-orange-200/60' :
                      currentGradient === 2 ? 'bg-blue-50/50 border-blue-200/60' :
                      currentGradient === 3 ? 'bg-emerald-50/50 border-emerald-200/60' :
                      'bg-purple-50/50 border-purple-200/60'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <div>
                    <div className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {stat.value}
                    </div>
                    <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search merchandise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none transition-all duration-[3000ms] ${
                theme === 'light'
                  ? currentGradient === 0 ? 'bg-green-50/50 border-green-200 focus:border-green-500 text-gray-900' :
                    currentGradient === 1 ? 'bg-orange-50/50 border-orange-200 focus:border-orange-500 text-gray-900' :
                    currentGradient === 2 ? 'bg-blue-50/50 border-blue-200 focus:border-blue-500 text-gray-900' :
                    currentGradient === 3 ? 'bg-emerald-50/50 border-emerald-200 focus:border-emerald-500 text-gray-900' :
                    'bg-purple-50/50 border-purple-200 focus:border-purple-500 text-gray-900'
                  : 'bg-gray-900 border-gray-700 focus:border-purple-500 text-white placeholder-gray-400'
              }`}
            />
          </div>

          {/* View Mode Toggle */}
          <div className={`flex items-center gap-2 p-2 rounded-xl transition-all duration-[3000ms] ${
            theme === 'light'
              ? currentGradient === 0 ? 'bg-green-50/50' :
                currentGradient === 1 ? 'bg-orange-50/50' :
                currentGradient === 2 ? 'bg-blue-50/50' :
                currentGradient === 3 ? 'bg-emerald-50/50' :
                'bg-purple-50/50'
              : 'bg-gray-900'
          }`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'grid' 
                  ? `${theme === 'light' 
                      ? currentGradient === 0 ? 'bg-green-600 text-white' :
                        currentGradient === 1 ? 'bg-orange-600 text-white' :
                        currentGradient === 2 ? 'bg-blue-600 text-white' :
                        currentGradient === 3 ? 'bg-emerald-600 text-white' :
                        'bg-purple-600 text-white'
                      : 'bg-purple-600 text-white'
                    }`
                  : `${theme === 'light' ? 'text-gray-700 hover:text-gray-900' : 'text-gray-400 hover:text-white'}`
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'list' 
                  ? `${theme === 'light' 
                      ? currentGradient === 0 ? 'bg-green-600 text-white' :
                        currentGradient === 1 ? 'bg-orange-600 text-white' :
                        currentGradient === 2 ? 'bg-blue-600 text-white' :
                        currentGradient === 3 ? 'bg-emerald-600 text-white' :
                        'bg-purple-600 text-white'
                      : 'bg-purple-600 text-white'
                    }`
                  : `${theme === 'light' ? 'text-gray-700 hover:text-gray-900' : 'text-gray-400 hover:text-white'}`
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-[3000ms] ${
              theme === 'light'
                ? currentGradient === 0 ? 'bg-green-100/50 text-green-700 hover:bg-green-100/80' :
                  currentGradient === 1 ? 'bg-orange-100/50 text-orange-700 hover:bg-orange-100/80' :
                  currentGradient === 2 ? 'bg-blue-100/50 text-blue-700 hover:bg-blue-100/80' :
                  currentGradient === 3 ? 'bg-emerald-100/50 text-emerald-700 hover:bg-emerald-100/80' :
                  'bg-purple-100/50 text-purple-700 hover:bg-purple-100/80'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            <Filter className="w-5 h-5" />
            Filters
            {(selectedCategory !== 'all' || selectedAvailability !== 'all' || selectedPriceType !== 'all') && (
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-8 p-6 rounded-xl border transition-all duration-[3000ms] ${
                theme === 'light'
                  ? currentGradient === 0 ? 'bg-green-50/50 border-green-200' :
                    currentGradient === 1 ? 'bg-orange-50/50 border-orange-200' :
                    currentGradient === 2 ? 'bg-blue-50/50 border-blue-200' :
                    currentGradient === 3 ? 'bg-emerald-50/50 border-emerald-200' :
                    'bg-purple-50/50 border-purple-200'
                  : 'bg-gray-900 border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Advanced Filters
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={clearFilters}
                    className={`${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'} transition-colors`}
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className={`${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'} transition-colors`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className={`block font-medium mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-all duration-[3000ms] ${
                      theme === 'light'
                        ? currentGradient === 0 ? 'bg-green-50 border-green-200 focus:border-green-500 text-gray-900' :
                          currentGradient === 1 ? 'bg-orange-50 border-orange-200 focus:border-orange-500 text-gray-900' :
                          currentGradient === 2 ? 'bg-blue-50 border-blue-200 focus:border-blue-500 text-gray-900' :
                          currentGradient === 3 ? 'bg-emerald-50 border-emerald-200 focus:border-emerald-500 text-gray-900' :
                          'bg-purple-50 border-purple-200 focus:border-purple-500 text-gray-900'
                        : 'bg-gray-800 border-gray-600 focus:border-purple-500 text-white'
                    }`}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className={`block font-medium mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Availability
                  </label>
                  <select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-all duration-[3000ms] ${
                      theme === 'light'
                        ? currentGradient === 0 ? 'bg-green-50 border-green-200 focus:border-green-500 text-gray-900' :
                          currentGradient === 1 ? 'bg-orange-50 border-orange-200 focus:border-orange-500 text-gray-900' :
                          currentGradient === 2 ? 'bg-blue-50 border-blue-200 focus:border-blue-500 text-gray-900' :
                          currentGradient === 3 ? 'bg-emerald-50 border-emerald-200 focus:border-emerald-500 text-gray-900' :
                          'bg-purple-50 border-purple-200 focus:border-purple-500 text-gray-900'
                        : 'bg-gray-800 border-gray-600 focus:border-purple-500 text-white'
                    }`}
                  >
                    {availabilityOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Type Filter */}
                <div>
                  <label className={`block font-medium mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Price Type
                  </label>
                  <select
                    value={selectedPriceType}
                    onChange={(e) => setSelectedPriceType(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-all duration-[3000ms] ${
                      theme === 'light'
                        ? currentGradient === 0 ? 'bg-green-50 border-green-200 focus:border-green-500 text-gray-900' :
                          currentGradient === 1 ? 'bg-orange-50 border-orange-200 focus:border-orange-500 text-gray-900' :
                          currentGradient === 2 ? 'bg-blue-50 border-blue-200 focus:border-blue-500 text-gray-900' :
                          currentGradient === 3 ? 'bg-emerald-50 border-emerald-200 focus:border-emerald-500 text-gray-900' :
                          'bg-purple-50 border-purple-200 focus:border-purple-500 text-gray-900'
                        : 'bg-gray-800 border-gray-600 focus:border-purple-500 text-white'
                    }`}
                  >
                    {priceTypeOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className={`block font-medium mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-all duration-[3000ms] ${
                      theme === 'light'
                        ? currentGradient === 0 ? 'bg-green-50 border-green-200 focus:border-green-500 text-gray-900' :
                          currentGradient === 1 ? 'bg-orange-50 border-orange-200 focus:border-orange-500 text-gray-900' :
                          currentGradient === 2 ? 'bg-blue-50 border-blue-200 focus:border-blue-500 text-gray-900' :
                          currentGradient === 3 ? 'bg-emerald-50 border-emerald-200 focus:border-emerald-500 text-gray-900' :
                          'bg-purple-50 border-purple-200 focus:border-purple-500 text-gray-900'
                        : 'bg-gray-800 border-gray-600 focus:border-purple-500 text-white'
                    }`}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Range */}
              <div className="mt-6">
                <label className={`block font-medium mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="flex-1"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-[3000ms] ${
                selectedCategory === category.id
                  ? `${theme === 'light' 
                      ? currentGradient === 0 ? 'bg-green-600 text-white shadow-lg shadow-green-500/25' :
                        currentGradient === 1 ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25' :
                        currentGradient === 2 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' :
                        currentGradient === 3 ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25' :
                        'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                    }`
                  : `${theme === 'light' 
                      ? currentGradient === 0 ? 'bg-green-50/50 text-green-700 hover:bg-green-100/80' :
                        currentGradient === 1 ? 'bg-orange-50/50 text-orange-700 hover:bg-orange-100/80' :
                        currentGradient === 2 ? 'bg-blue-50/50 text-blue-700 hover:bg-blue-100/80' :
                        currentGradient === 3 ? 'bg-emerald-50/50 text-emerald-700 hover:bg-emerald-100/80' :
                        'bg-purple-50/50 text-purple-700 hover:bg-purple-100/80'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
              }`}
            >
              <category.icon className="w-5 h-5" />
              {category.label}
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {filteredItems.length} Items Found
          </h2>
          <div className="flex items-center gap-4">
            <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Cart: {cart.size} items
            </span>
            <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Favorites: {favorites.size} items
            </span>
          </div>
        </div>

        {/* Merchandise Grid/List */}
        {filteredItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal snap-x md:snap-none pb-2">
            {filteredItems.map(item => (
              <div key={item.id} className="w-full md:block md:w-auto snap-center md:snap-none mr-0 md:mr-0">
                {/* Inline Merchandise Card Start */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex flex-col h-full rounded-2xl shadow-lg border backdrop-blur-xl transition-all duration-[3000ms] overflow-hidden group
                    ${theme === 'light'
                      ? currentGradient === 0 ? 'bg-green-50/80 border-green-200' :
                        currentGradient === 1 ? 'bg-orange-50/80 border-orange-200' :
                        currentGradient === 2 ? 'bg-blue-50/80 border-blue-200' :
                        currentGradient === 3 ? 'bg-emerald-50/80 border-emerald-200' :
                        'bg-purple-50/80 border-purple-200'
                      : 'bg-gray-900 border-gray-700'}
                  `}
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover object-center rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {item.isLimited && (
                      <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded shadow">Limited</span>
                    )}
                    {item.isTrending && (
                      <span className="absolute top-2 right-2 bg-green-500 text-xs font-bold px-2 py-1 rounded shadow text-white">Trending</span>
                    )}
                    {item.isNew && (
                      <span className="absolute bottom-2 left-2 bg-purple-500 text-xs font-bold px-2 py-1 rounded shadow text-white">New</span>
                    )}
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className={`absolute top-2 right-2 md:top-3 md:right-3 z-10 p-1 rounded-full transition-colors ${favorites.has(item.id) ? 'bg-pink-100 text-pink-600' : 'bg-white/80 text-gray-400 hover:text-pink-500'}`}
                      aria-label={favorites.has(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-5 h-5 ${favorites.has(item.id) ? 'fill-pink-500' : ''}`} />
                    </button>
                  </div>
                  <div className="flex-1 flex flex-col p-4 gap-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${theme === 'light' ? 'bg-gray-200 text-gray-700' : 'bg-gray-800 text-gray-200'}`}>{item.category.replace('-', ' ')}</span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${getAvailabilityColor(item.availability)} bg-gray-100 dark:bg-gray-800`}>{item.availability.replace('-', ' ')}</span>
                    </div>
                    <h3 className={`text-lg font-bold line-clamp-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.title}</h3>
                    <p className={`text-sm line-clamp-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{item.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>₹{item.price}</span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-sm line-through text-gray-400">₹{item.originalPrice}</span>
                      )}
                      <span className="ml-2">{getPriceTypeIcon(item.priceType)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium">{item.rating}</span>
                      <span className="text-xs text-gray-400">({item.reviews})</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded px-2 py-0.5">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => toggleCart(item.id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors
                          ${cart.has(item.id)
                            ? 'bg-green-600 text-white shadow-lg'
                            : theme === 'light'
                              ? 'bg-gray-100 text-gray-900 hover:bg-green-100'
                              : 'bg-gray-800 text-white hover:bg-green-700'}
                        `}
                        aria-label={cart.has(item.id) ? 'Remove from cart' : 'Add to cart'}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        {cart.has(item.id) ? 'In Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </motion.div>
                {/* Inline Merchandise Card End */}
              </div>
            ))}
          </div>
        )}
        {/* No merchandise found fallback */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              No merchandise found
            </h3>
            <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={clearFilters}
              className={`px-6 py-3 rounded-lg transition-colors ${
                theme === 'light' 
                  ? currentGradient === 0 ? 'bg-green-600 hover:bg-green-700' :
                    currentGradient === 1 ? 'bg-orange-600 hover:bg-orange-700' :
                    currentGradient === 2 ? 'bg-blue-600 hover:bg-blue-700' :
                    currentGradient === 3 ? 'bg-emerald-600 hover:bg-emerald-700' :
                    'bg-purple-600 hover:bg-purple-700'
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white`}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Merchandise;