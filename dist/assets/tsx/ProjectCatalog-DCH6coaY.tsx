import React, { useState, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelCard from './PixelCard';
import { Film, Music, Tv, Search, Star, Clock, Users, TrendingUp, ChevronLeft, ChevronRight, Play, Plus, Info, Siren as Fire, Award, Globe, Filter, Grid3X3, List, SlidersHorizontal, X, Calendar, DollarSign, MapPin, Heart, Share2, Bookmark, ArrowRight, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { extendedProjects } from '../data/extendedProjects';
import ProjectDetailModal from './ProjectDetailModal';
import { Project } from '../types';
import useIsMobile from '../hooks/useIsMobile';

interface ProjectCatalogProps {
  onTrackInvestment?: () => void;
}

// Memoized filter options to prevent recreation on every render
const FILTER_OPTIONS = {
  categories: [
    { id: 'all', label: 'All Categories' },
    { id: 'bollywood', label: 'Bollywood' },
    { id: 'hollywood', label: 'Hollywood' },
    { id: 'regional', label: 'Regional' },
    { id: 'independent', label: 'Independent' }
  ],
  types: [
    { id: 'all', label: 'All Types' },
    { id: 'film', label: 'Films' },
    { id: 'webseries', label: 'Web Series' },
    { id: 'music', label: 'Music' }
  ],
  languages: [
    { id: 'all', label: 'All Languages' },
    { id: 'hindi', label: 'Hindi' },
    { id: 'english', label: 'English' },
    { id: 'tamil', label: 'Tamil' },
    { id: 'telugu', label: 'Telugu' },
    { id: 'kannada', label: 'Kannada' },
    { id: 'malayalam', label: 'Malayalam' }
  ],
  genres: [
    { id: 'all', label: 'All Genres' },
    { id: 'action', label: 'Action' },
    { id: 'drama', label: 'Drama' },
    { id: 'comedy', label: 'Comedy' },
    { id: 'thriller', label: 'Thriller' },
    { id: 'romance', label: 'Romance' },
    { id: 'horror', label: 'Horror' },
    { id: 'sci-fi', label: 'Sci-Fi' },
    { id: 'fantasy', label: 'Fantasy' },
    { id: 'documentary', label: 'Documentary' }
  ],
  sortOptions: [
    { id: 'trending', label: 'Trending' },
    { id: 'newest', label: 'Newest First' },
    { id: 'funding-high', label: 'Highest Funded' },
    { id: 'funding-low', label: 'Lowest Funded' },
    { id: 'ending-soon', label: 'Ending Soon' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'amount-high', label: 'Highest Target' },
    { id: 'amount-low', label: 'Lowest Target' }
  ]
} as const;

const ProjectCatalog: React.FC<ProjectCatalogProps> = ({ onTrackInvestment }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<'overview' | 'invest'>('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'cards'>('cards');
  const [showFilters, setShowFilters] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState<string | null>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const isMobile = useIsMobile();
  
  // Auto-sliding hero carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const autoSlideRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [fundingRange, setFundingRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState<string>('trending');

  // Memoized callback functions to prevent unnecessary re-renders
  const handleProjectClick = useCallback((project: Project, tab: 'overview' | 'invest' = 'overview') => {
    setSelectedProject(project);
    setInitialTab(tab);
    setIsModalOpen(true);
  }, []);

  const handleInvestClick = useCallback((project: Project) => {
    confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
    handleProjectClick(project, 'invest');
  }, [handleProjectClick]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setInitialTab('overview');
  }, []);

  // Memoized filtered and sorted projects
  const filteredProjects = useMemo(() => {
    return extendedProjects.filter(project => {
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.director && project.director.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (project.artist && project.artist.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || 
        project.category.toLowerCase().includes(selectedCategory);
      
      const matchesType = selectedType === 'all' || project.type === selectedType;
      
      const matchesLanguage = selectedLanguage === 'all' || 
        project.language.toLowerCase() === selectedLanguage;
      
      const matchesGenre = selectedGenre === 'all' || 
        project.genre.toLowerCase().includes(selectedGenre) ||
        project.tags.some((tag: string) => tag.toLowerCase().includes(selectedGenre));
      
      const matchesFunding = project.fundedPercentage >= fundingRange[0] && 
        project.fundedPercentage <= fundingRange[1];

      return matchesSearch && matchesCategory && matchesType && 
             matchesLanguage && matchesGenre && matchesFunding;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'funding-high':
          return b.fundedPercentage - a.fundedPercentage;
        case 'funding-low':
          return a.fundedPercentage - b.fundedPercentage;
        case 'ending-soon':
          const aTime = a.timeLeft ? parseInt(a.timeLeft) : 999;
          const bTime = b.timeLeft ? parseInt(b.timeLeft) : 999;
          return aTime - bTime;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'amount-high':
          return b.targetAmount - a.targetAmount;
        case 'amount-low':
          return a.targetAmount - b.targetAmount;
        case 'newest':
          return b.id.localeCompare(a.id);
        default: // trending
          return b.fundedPercentage - a.fundedPercentage;
      }
    });
  }, [searchTerm, selectedCategory, selectedType, selectedLanguage, selectedGenre, fundingRange, sortBy]);

  // Memoized categorized projects for Netflix-style layout
  const categorizedProjects = useMemo(() => {
    const trendingProjects = extendedProjects
      .filter(p => p.fundedPercentage > 70)
      .sort((a, b) => b.fundedPercentage - a.fundedPercentage)
      .slice(0, 10);

    const bollywoodFilms = extendedProjects
      .filter(p => p.type === 'film' && p.category === 'Bollywood')
      .slice(0, 10);

    const regionalContent = extendedProjects
      .filter(p => p.category === 'Regional')
      .slice(0, 10);

    const musicProjects = extendedProjects
      .filter(p => p.type === 'music')
      .slice(0, 10);

    const webSeries = extendedProjects
      .filter(p => p.type === 'webseries')
      .slice(0, 10);

    const hollywoodProjects = extendedProjects
      .filter(p => p.category === 'Hollywood')
      .slice(0, 10);

    const newReleases = extendedProjects
      .filter(p => p.timeLeft && parseInt(p.timeLeft) < 15)
      .slice(0, 10);

    const highRatedProjects = extendedProjects
      .filter(p => p.rating && p.rating >= 4.5)
      .slice(0, 10);

    const endingSoon = extendedProjects
      .filter(p => p.timeLeft && parseInt(p.timeLeft) <= 7)
      .slice(0, 10);

    const featuredProjects = extendedProjects
      .sort((a, b) => b.fundedPercentage - a.fundedPercentage)
      .slice(0, 7);

    return {
      trendingProjects,
      bollywoodFilms,
      regionalContent,
      musicProjects,
      webSeries,
      hollywoodProjects,
      newReleases,
      highRatedProjects,
      endingSoon,
      featuredProjects
    };
  }, []);

  // Memoized callback functions for carousel controls
  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % categorizedProjects.featuredProjects.length);
  }, [categorizedProjects.featuredProjects.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => prev === 0 ? categorizedProjects.featuredProjects.length - 1 : prev - 1);
  }, [categorizedProjects.featuredProjects.length]);

  const clearFilters = useCallback(() => {
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedLanguage('all');
    setSelectedGenre('all');
    setFundingRange([0, 100]);
    setSortBy('trending');
    setSearchTerm('');
  }, []);

  const handleSectionClick = useCallback((sectionType: string) => {
    setShowAllProjects(sectionType);
    setSearchTerm('');
    setShowFilters(false);

    // Set appropriate filters based on section
    switch (sectionType) {
      case 'trending':
        setSortBy('trending');
        setSelectedCategory('all');
        setSelectedType('all');
        break;
      case 'ending-soon':
        setSortBy('ending-soon');
        setSelectedCategory('all');
        setSelectedType('all');
        break;
      case 'bollywood':
        setSelectedCategory('bollywood');
        setSelectedType('film');
        break;
      case 'music':
        setSelectedType('music');
        setSelectedCategory('all');
        break;
      case 'webseries':
        setSelectedType('webseries');
        setSelectedCategory('all');
        break;
      case 'regional':
        setSelectedCategory('regional');
        setSelectedType('all');
        break;
      case 'hollywood':
        setSelectedCategory('hollywood');
        setSelectedType('film');
        break;
      case 'high-rated':
        setSortBy('rating');
        setSelectedCategory('all');
        setSelectedType('all');
        break;
      case 'new-releases':
        setSortBy('newest');
        setSelectedCategory('all');
        setSelectedType('all');
        break;
      default:
        break;
    }
  }, []);

  // Auto-slide functionality
  React.useEffect(() => {
    if (isAutoPlaying && !isPaused) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % categorizedProjects.featuredProjects.length);
      }, 2500);
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isAutoPlaying, isPaused, categorizedProjects.featuredProjects.length]);

  // Filter options
  const categories = FILTER_OPTIONS.categories;
  const types = FILTER_OPTIONS.types;
  const languages = FILTER_OPTIONS.languages;
  const genres = FILTER_OPTIONS.genres;
  const sortOptions = FILTER_OPTIONS.sortOptions;

  // Organize projects by categories for Netflix-style layout
  const trendingProjects = categorizedProjects.trendingProjects;
  const bollywoodFilms = categorizedProjects.bollywoodFilms;
  const regionalContent = categorizedProjects.regionalContent;
  const musicProjects = categorizedProjects.musicProjects;
  const webSeries = categorizedProjects.webSeries;
  const hollywoodProjects = categorizedProjects.hollywoodProjects;
  const newReleases = categorizedProjects.newReleases;
  const highRatedProjects = categorizedProjects.highRatedProjects;
  const endingSoon = categorizedProjects.endingSoon;
  const featuredProjects = categorizedProjects.featuredProjects;

  return (
    <div className="min-h-screen bg-black pb-[100px]">
      {/* Mobile Hero Carousel */}
      {!searchTerm && !showAllProjects && (
        <div
          className="md:hidden relative h-72 overflow-hidden"
          onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const diff = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(diff) > 50) diff > 0 ? prevSlide() : nextSlide();
          }}
          onClick={() => handleProjectClick(featuredProjects[currentSlide])}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={`m-${currentSlide}`}
              src={featuredProjects[currentSlide]?.poster}
              alt={featuredProjects[currentSlide]?.title}
              initial={{ x: 150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -150, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute bottom-12 left-0 w-full p-3 text-center flex flex-col items-center bg-gradient-to-t from-black/70 via-black/40 to-transparent">
            <h3 className="text-white text-base font-semibold">
              {featuredProjects[currentSlide]?.title}
            </h3>
            <span className="text-xs text-gray-300">
              {featuredProjects[currentSlide]?.genre}
            </span>
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {featuredProjects.map((_, index) => (
              <button
                key={`md-${index}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSlideChange(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      )}
      {/* Full-Screen Auto-Sliding Hero Carousel */}
      {!searchTerm && !showAllProjects && (
        <div className="hidden md:block relative h-screen overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <img 
                src={featuredProjects[currentSlide]?.poster} 
                alt={featuredProjects[currentSlide]?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="hidden sm:flex absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-black/60 hover:bg-black/80 rounded-full items-center justify-center text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden sm:flex absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-black/60 hover:bg-black/80 rounded-full items-center justify-center text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center z-10 pt-16">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-2xl">
                <motion.div
                  key={`content-${currentSlide}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md ${
                      featuredProjects[currentSlide]?.type === 'film' ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300' :
                      featuredProjects[currentSlide]?.type === 'music' ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300' :
                      'bg-green-500/20 border border-green-500/30 text-green-300'
                    }`}>
                      {featuredProjects[currentSlide]?.type === 'film' ? <Film className="w-4 h-4" /> :
                       featuredProjects[currentSlide]?.type === 'music' ? <Music className="w-4 h-4" /> :
                       <Tv className="w-4 h-4" />}
                      <span className="text-sm font-medium uppercase">{featuredProjects[currentSlide]?.type}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 border border-red-500/30">
                      <Fire className="w-4 h-4 text-red-400" />
                      <span className="text-red-300 text-sm font-medium">Trending #{currentSlide + 1}</span>
                    </div>
                  </div>

                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
                    {featuredProjects[currentSlide]?.title}
                  </h1>
                  
                  <p className="text-base sm:text-xl text-gray-300 mb-6 leading-relaxed">
                    {featuredProjects[currentSlide]?.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{featuredProjects[currentSlide]?.rating || '4.8'}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-300">{featuredProjects[currentSlide]?.language}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-300">{featuredProjects[currentSlide]?.genre}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-green-400 font-semibold">{featuredProjects[currentSlide]?.fundedPercentage}% Funded</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <button
                      onClick={() => handleInvestClick(featuredProjects[currentSlide])}
                      className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-lg font-semibold text-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105"
                    >
                      <Play className="w-6 h-6 fill-current" />
                      Invest Now
                    </button>
                    
                    <button 
                      onClick={() => handleProjectClick(featuredProjects[currentSlide])}
                      className="flex items-center gap-3 px-8 py-4 bg-gray-600/80 text-white rounded-lg font-semibold text-lg hover:bg-gray-600 transition-all duration-300"
                    >
                      <Info className="w-6 h-6" />
                      More Info
                    </button>

                    <button className="p-4 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300">
                      <Heart className="w-6 h-6" />
                    </button>

                    <button className="p-4 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300">
                      <Share2 className="w-6 h-6" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex items-center gap-3">
              {/* Play/Pause Button */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-all duration-300 backdrop-blur-sm"
              >
                {isAutoPlaying && !isPaused ? (
                  <div className="w-4 h-4 flex gap-1">
                    <div className="w-1 h-4 bg-white"></div>
                    <div className="w-1 h-4 bg-white"></div>
                  </div>
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {featuredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlideChange(index)}
                    className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                    }`}
                  >
                    {index === currentSlide && isAutoPlaying && !isPaused && (
                      <div className="absolute inset-0 rounded-full border-2 border-white animate-ping"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Counter */}
              <span className="text-white text-sm font-medium bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                {currentSlide + 1}/{featuredProjects.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {isMobile && (
            <div className="flex justify-between md:hidden">
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="p-2 rounded-lg bg-gray-900 text-white"
              >
                <Search className="w-6 h-6" />
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="relative p-2 rounded-lg bg-gray-900 text-white"
              >
                <Filter className="w-6 h-6" />
                {(selectedCategory !== 'all' || selectedType !== 'all' || selectedLanguage !== 'all' || selectedGenre !== 'all') && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
            </div>
          )}

          {/* Search Bar */}
          <div className={`relative flex-1 ${isMobile ? (showMobileSearch ? 'block' : 'hidden') : 'hidden md:block'}`}>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for films, music, web series, directors, artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-4 py-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-gray-800 transition-all duration-300 text-lg"
            />
          </div>

          {/* View Mode Toggle */}
          <div className={`flex items-center gap-2 bg-gray-900 rounded-xl p-2 ${isMobile ? 'hidden' : ''}`}>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'cards' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-6 h-6 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-6 h-6 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-6 h-6 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 ${isMobile ? 'hidden' : ''}`}
          >
            <Filter className="w-5 h-5" />
            Filters
            {(selectedCategory !== 'all' || selectedType !== 'all' || selectedLanguage !== 'all' || selectedGenre !== 'all') && (
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
              className="mb-8 p-6 bg-gray-900 rounded-xl border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold">Advanced Filters</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={clearFilters}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-white font-medium mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-white font-medium mb-2">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                  >
                    {types.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Language Filter */}
                <div>
                  <label className="block text-white font-medium mb-2">Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                  >
                    {languages.map((language) => (
                      <option key={language.id} value={language.id}>
                        {language.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Genre Filter */}
                <div>
                  <label className="block text-white font-medium mb-2">Genre</label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                  >
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {/* Funding Range */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Funding Progress: {fundingRange[0]}% - {fundingRange[1]}%
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={fundingRange[0]}
                      onChange={(e) => setFundingRange([Number(e.target.value), fundingRange[1]])}
                      className="flex-1"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={fundingRange[1]}
                      onChange={(e) => setFundingRange([fundingRange[0], Number(e.target.value)])}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-white font-medium mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Results or Netflix-style Sections */}
        {searchTerm || showFilters || showAllProjects ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {showAllProjects ? `${showAllProjects.charAt(0).toUpperCase() + showAllProjects.slice(1).replace('-', ' ')} Projects` :
                 searchTerm ? `Search Results for "${searchTerm}"` : 'Filtered Results'}
                <span className="text-gray-400 text-lg ml-2">({filteredProjects.length})</span>
              </h2>
              {showAllProjects && (
                <button
                  onClick={() => setShowAllProjects(null)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Back to Browse
                </button>
              )}
            </div>

            {filteredProjects.length > 0 ? (
              <div className={`${
                viewMode === 'list' ? 'space-y-4' :
                viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4' :
                'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              }`}>
                {filteredProjects.map((project) => (
                  viewMode === 'list' ? (
                    <ListProjectCard 
                      key={project.id} 
                      project={project} 
                      onClick={() => handleProjectClick(project)}
                      onInvestClick={handleInvestClick}
                    />
                  ) : (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onClick={() => handleProjectClick(project)}
                      onInvestClick={handleInvestClick}
                      compact={viewMode === 'grid'}
                    />
                  )
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-white text-2xl font-bold mb-4">No results found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search terms or filters</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {/* Netflix-style Sections with Clickable Headers */}
            <ProjectRow
              title="🔥 Trending Now"
              projects={trendingProjects}
              onProjectClick={handleProjectClick}
              onInvestClick={handleInvestClick}
              onHeaderClick={() => handleSectionClick('trending')}
            />
            
            {endingSoon.length > 0 && (
              <ProjectRow 
                title="⏰ Ending Soon - Last Chance!" 
                projects={endingSoon} 
                onProjectClick={handleProjectClick}
                onInvestClick={handleInvestClick}
                onHeaderClick={() => handleSectionClick('ending-soon')}
                urgent
              />
            )}
            
            <ProjectRow 
              title="🎬 Bollywood Blockbusters" 
              projects={bollywoodFilms} 
              onProjectClick={handleProjectClick}
              onInvestClick={handleInvestClick}
              onHeaderClick={() => handleSectionClick('bollywood')}
            />
            
            <ProjectRow 
              title="🎵 Music & Albums" 
              projects={musicProjects} 
              onProjectClick={handleProjectClick}
              onInvestClick={handleInvestClick}
              onHeaderClick={() => handleSectionClick('music')}
            />
            
            <ProjectRow 
              title="📺 Binge-Worthy Web Series" 
              projects={webSeries} 
              onProjectClick={handleProjectClick}
              onInvestClick={handleInvestClick}
              onHeaderClick={() => handleSectionClick('webseries')}
            />
            
            <ProjectRow 
              title="🌍 Regional Cinema Gems" 
              projects={regionalContent} 
              onProjectClick={handleProjectClick}
              onInvestClick={handleInvestClick}
              onHeaderClick={() => handleSectionClick('regional')}
            />
            
            <ProjectRow 
              title="🏆 Highly Rated Projects" 
              projects={highRatedProjects} 
              onProjectClick={handleProjectClick}
              onInvestClick={handleInvestClick}
              onHeaderClick={() => handleSectionClick('high-rated')}
            />
            
            <ProjectRow 
              title="🆕 Fresh Releases" 
              projects={newReleases} 
              onProjectClick={handleProjectClick}
              onInvestClick={handleInvestClick}
              onHeaderClick={() => handleSectionClick('new-releases')}
            />
            
            {hollywoodProjects.length > 0 && (
              <ProjectRow 
                title="🌟 Hollywood International" 
                projects={hollywoodProjects} 
                onProjectClick={handleProjectClick}
                onInvestClick={handleInvestClick}
                onHeaderClick={() => handleSectionClick('hollywood')}
              />
            )}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
        initialTab={initialTab}
        onTrackInvestment={onTrackInvestment}
      />
    </div>
  );
};

// Project Row Component (Netflix-style) with Clickable Headers
interface ProjectRowProps {
  title: string;
  projects: Project[];
  onProjectClick: (project: Project, tab?: 'overview' | 'invest') => void;
  onInvestClick: (project: Project) => void;
  onHeaderClick?: () => void;
  featured?: boolean;
  urgent?: boolean;
}

const ProjectRow: React.FC<ProjectRowProps> = ({ title, projects, onProjectClick, onInvestClick, onHeaderClick, featured, urgent }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = featured ? 400 : 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (projects.length === 0) return null;

  return (
    <div className="relative group">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onHeaderClick}
          className={`font-bold text-white hover:text-gray-300 transition-colors duration-300 flex items-center gap-3 group/header ${
            featured ? 'text-3xl' : 'text-2xl'
          } ${urgent ? 'text-red-400 hover:text-red-300' : ''}`}
        >
          {title}
          <ArrowRight className="w-6 h-6 opacity-0 group-hover/header:opacity-100 transition-opacity duration-300" />
        </button>
        {urgent && (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full">
            <Clock className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-sm font-medium">Limited Time</span>
          </div>
        )}
      </div>
      
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll('left')}
        className="hidden sm:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/80 rounded-full items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={() => scroll('right')}
        className="hidden sm:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/80 rounded-full items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Projects Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id} 
            project={project} 
            onClick={() => onProjectClick(project)}
            onInvestClick={onInvestClick}
            featured={featured && index === 0}
            urgent={urgent}
          />
        ))}
      </div>
    </div>
  );
};

// Enhanced Project Card Component with Blur Background on Hover
interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onInvestClick: (project: Project) => void;
  featured?: boolean;
  urgent?: boolean;
  compact?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, onInvestClick, featured, urgent, compact }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardWidth = featured ? 'w-96' : compact ? 'w-48' : 'w-72';
  const aspectRatio = featured ? 'aspect-[16/10]' : 'aspect-[2/3]';

  return (
    <PixelCard variant="pink" className={`relative flex-shrink-0 ${cardWidth}`}> 
      <motion.div
        className="absolute inset-0 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: compact ? 1.02 : 1.05 }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
      >
      <div className={`relative ${aspectRatio} rounded-xl overflow-hidden bg-gray-800 shadow-2xl`}>
        {/* Main Poster Image with Blur Effect on Hover */}
        <div className="relative w-full h-full">
          <img 
            src={project.poster} 
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110 blur-sm brightness-50' : 'scale-100 blur-0 brightness-100'
            }`}
            loading="lazy"
          />

          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60" />
          
          {/* Premium Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${
            project.type === 'film' ? 'bg-purple-500/80 border-purple-400/50 text-white shadow-lg shadow-purple-500/25' :
            project.type === 'music' ? 'bg-blue-500/80 border-blue-400/50 text-white shadow-lg shadow-blue-500/25' :
            'bg-green-500/80 border-green-400/50 text-white shadow-lg shadow-green-500/25'
          }`}>
            {project.type === 'film' ? <Film className="w-3 h-3" /> :
             project.type === 'music' ? <Music className="w-3 h-3" /> :
             <Tv className="w-3 h-3" />}
            {!compact && project.type.toUpperCase()}
          </div>
          
          {featured && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold shadow-lg">
              <TrendingUp className="w-3 h-3" />
              {!compact && 'TRENDING'}
            </div>
          )}
          
          {urgent && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold shadow-lg animate-pulse">
              <Clock className="w-3 h-3" />
              {!compact && 'ENDING SOON'}
            </div>
          )}
        </div>

        {/* Top Right - Rating */}
        {project.rating && (
          <div className="absolute top-3 right-3 z-20">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold border border-yellow-400/30">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              {project.rating}
            </div>
          </div>
        )}

        {/* Bottom Content - Always Visible */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <div className="space-y-3">
            {/* Title and Basic Info */}
            <div>
              <h3 className={`text-white font-bold leading-tight ${
                compact ? 'text-sm' : featured ? 'text-xl' : 'text-lg'
              }`}>
                {project.title}
              </h3>
              {!compact && (
                <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                  {project.description}
                </p>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Funded</span>
                <span className={`font-bold ${
                  project.fundedPercentage >= 75 ? 'text-green-400' : 
                  project.fundedPercentage >= 50 ? 'text-yellow-400' : 'text-gray-300'
                }`}>
                  {project.fundedPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${project.fundedPercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`h-full rounded-full ${
                    project.type === 'film'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : project.type === 'music'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500'
                  } shadow-lg`}
                />
              </div>
            </div>

            {/* Funding Details */}
            {!compact && (
              <div className="flex items-center justify-between text-xs">
                <div className="text-gray-400">
                  ₹{(project.raisedAmount / 100000).toFixed(1)}L raised
                </div>
                {project.timeLeft && (
                  <div className="flex items-center gap-1 text-orange-400 font-medium">
                    <Clock className="w-3 h-3" />
                    {project.timeLeft}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Hover Content - Enhanced with Better Readability */}
        <AnimatePresence>
          {isHovered && !compact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/60 flex flex-col justify-end p-4 z-30 backdrop-blur-sm"
            >
              <div className="space-y-4">
                {/* Enhanced Title and Info */}
                <div>
                  <h3 className="text-white font-bold text-xl mb-2 drop-shadow-lg">{project.title}</h3>
                  <p className="text-gray-200 text-sm leading-relaxed line-clamp-3 drop-shadow-md">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-white/30 text-white backdrop-blur-md border border-white/20 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-black/40 p-2 rounded-lg backdrop-blur-sm">
                    <span className="text-gray-300">Target</span>
                    <div className="text-white font-semibold">
                      ₹{(project.targetAmount / 100000).toFixed(1)}L
                    </div>
                  </div>
                  <div className="bg-black/40 p-2 rounded-lg backdrop-blur-sm">
                    <span className="text-gray-300">Language</span>
                    <div className="text-white font-semibold">{project.language}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => onInvestClick(project)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-white text-black rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors shadow-lg"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Invest Now
                  </button>
                  <button className="p-2 bg-gray-800/80 text-white rounded-lg hover:bg-gray-700 transition-colors backdrop-blur-sm">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-800/80 text-white rounded-lg hover:bg-gray-700 transition-colors backdrop-blur-sm">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-800/80 text-white rounded-lg hover:bg-gray-700 transition-colors backdrop-blur-sm">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Border Effect */}
        <div className="absolute inset-0 rounded-xl border border-white/10 group-hover:border-white/30 transition-colors duration-500 pointer-events-none" />
        
        {/* Cinematic Glow */}
        <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
          project.type === 'film' ? 'shadow-2xl shadow-purple-500/20' :
          project.type === 'music' ? 'shadow-2xl shadow-blue-500/20' :
          'shadow-2xl shadow-green-500/20'
        }`} />
      </div>
    </motion.div>
    </PixelCard>
  );
};

// List View Project Card
interface ListProjectCardProps {
  project: Project;
  onClick: () => void;
  onInvestClick: (project: Project) => void;
}

const ListProjectCard: React.FC<ListProjectCardProps> = ({ project, onClick, onInvestClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex gap-4 p-4 bg-gray-900 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={project.poster} 
        alt={project.title}
        className="w-24 h-36 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-white font-bold text-xl mb-1">{project.title}</h3>
            <p className="text-gray-400 text-sm">
              by {project.director || project.artist} • {project.genre} • {project.language}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {project.rating && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-yellow-300 text-sm">{project.rating}</span>
              </div>
            )}
            
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
              project.type === 'film' ? 'bg-purple-500/20 text-purple-300' :
              project.type === 'music' ? 'bg-blue-500/20 text-blue-300' :
              'bg-green-500/20 text-green-300'
            }`}>
              {project.type === 'film' ? <Film className="w-4 h-4" /> :
               project.type === 'music' ? <Music className="w-4 h-4" /> :
               <Tv className="w-4 h-4" />}
              <span className="text-sm font-medium">{project.type.toUpperCase()}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-gray-400 text-xs">Funded</p>
              <p className="text-white font-semibold">{project.fundedPercentage}%</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Raised</p>
              <p className="text-green-400 font-semibold">₹{(project.raisedAmount / 100000).toFixed(1)}L</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Target</p>
              <p className="text-gray-300">₹{(project.targetAmount / 100000).toFixed(1)}L</p>
            </div>
            {project.timeLeft && (
              <div>
                <p className="text-gray-400 text-xs">Time Left</p>
                <p className="text-orange-400 font-semibold">{project.timeLeft}</p>
              </div>
            )}
          </div>
          
          <button
            onClick={() => onInvestClick(project)}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
          >
            Invest Now
          </button>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-full rounded-full ${
              project.type === 'film' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
              project.type === 'music' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
              'bg-gradient-to-r from-green-500 to-emerald-500'
            }`}
            style={{ width: `${project.fundedPercentage}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCatalog;