import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BarChart3, Film, Users, Bell, Search, User, LogIn, LogOut, LayoutDashboard, ShoppingBag, ChevronDown, ChevronUp, BarChart, GitCompareArrows as ArrowsCompare, Newspaper, MoreHorizontal, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useAuth } from './auth/AuthProvider';
import SearchBar from './SearchBar';
import NotificationDropdown from './NotificationDropdown';
import ProjectDetailModal from './ProjectDetailModal';
import { Project } from '../types';
import MobileBottomBar from './MobileBottomBar';

interface NavigationProps {
  currentView: 'home' | 'dashboard' | 'projects' | 'community' | 'merch' | 'profile' | 'admin' | 'portfolio' | 'compare' | 'news' | 'notifications' | 'search';
  setCurrentView: (view: 'home' | 'dashboard' | 'projects' | 'community' | 'merch' | 'profile' | 'admin' | 'portfolio' | 'compare' | 'news' | 'notifications' | 'search') => void;
  onAuthRequired: (mode?: 'login' | 'register') => boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setCurrentView, onAuthRequired }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<'overview' | 'invest'>('overview');
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Browse', icon: Film },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'community', label: 'Community', icon: Users }
  ];

  const moreNavItems = [
    { id: 'merch', label: 'Merch', icon: ShoppingBag },
    { id: 'portfolio', label: 'Portfolio', icon: BarChart, requiresAuth: true },
    { id: 'compare', label: 'Compare', icon: ArrowsCompare },
    { id: 'news', label: 'News', icon: Newspaper }
  ];

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (itemId: string) => {
    if (itemId === 'theme') {
      toggleTheme();
    } else if (['home', 'projects', 'dashboard', 'community', 'merch', 'profile', 'admin', 'portfolio', 'compare', 'news', 'notifications', 'search'].includes(itemId)) {
      const item = [...mainNavItems, ...moreNavItems].find(nav => nav.id === itemId);
      if (item?.requiresAuth && !isAuthenticated) {
        onAuthRequired('login');
        return;
      }
      setCurrentView(itemId as any);
      setShowMoreMenu(false);
    }
  };

  const handleAuthClick = (mode: 'login' | 'register') => {
    onAuthRequired(mode);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const handleProjectSelect = (project: Project, tab: 'overview' | 'invest' = 'overview') => {
    setSelectedProject(project);
    setInitialTab(tab);
    setIsProjectModalOpen(true);
  };

  return (
    <>
      {/* Top Navigation - Clean floating buttons */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.nav
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50"
          >
            <div className="max-w-7xl mx-auto px-8 py-6">
              <div className="relative flex items-center justify-between">
                {/* Logo - Much bigger size, no animations */}
                <div className="hidden md:flex items-center gap-4">
                  <div className="w-24 h-24 flex items-center justify-center">
                    <img 
                      src="/Improved Logo-01.png" 
                      alt="Circles Logo" 
                      className="w-24 h-24 object-contain drop-shadow-lg"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'block';
                      }}
                    />
                    <span className={`font-bold text-4xl hidden drop-shadow-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      C
                    </span>
                  </div>
                  <span className={`font-bold text-4xl drop-shadow-lg transition-all duration-[3000ms] ${
                    theme === 'light' 
                      ? 'text-gray-900'
                      : 'text-white'
                  }`}>
                    Circles
                  </span>
                </div>

                {/* Navigation Items - Clean buttons */}
                <div className="hidden md:flex items-center gap-12">
                  {mainNavItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-[3000ms] relative ${
                        currentView === item.id
                          ? `${theme === 'light' 
                              ? 'text-purple-600' 
                              : 'text-cyan-400'
                            }`
                          : `${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <item.icon className="w-5 h-5 drop-shadow-lg" />
                      <span className="font-medium text-base drop-shadow-lg">
                        {item.label}
                      </span>
                      {item.requiresAuth && !isAuthenticated && (
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                      )}
                    </motion.button>
                  ))}
                  
                  {/* More Menu Dropdown */}
                  <div className="relative hidden md:block">
                    <motion.button
                      onClick={() => setShowMoreMenu(!showMoreMenu)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-[3000ms] ${
                        moreNavItems.some(item => item.id === currentView)
                          ? `${theme === 'light' 
                              ? 'text-purple-600' 
                              : 'text-cyan-400'
                            }`
                          : `${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MoreHorizontal className="w-5 h-5 drop-shadow-lg" />
                      <span className="font-medium text-base drop-shadow-lg">
                        More
                      </span>
                      {showMoreMenu ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      }
                    </motion.button>
                    
                    <AnimatePresence>
                      {showMoreMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute right-0 mt-2 w-48 rounded-xl border overflow-hidden z-50 ${
                            theme === 'light'
                              ? 'bg-white border-gray-200 shadow-lg'
                              : 'bg-gray-900 border-white/20 shadow-lg shadow-black/20'
                          }`}
                        >
                          <div className="py-2">
                            {moreNavItems.map((item) => (
                              <button
                                key={item.id}
                                onClick={() => handleItemClick(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-2 transition-colors ${
                                  currentView === item.id
                                    ? theme === 'light'
                                      ? 'bg-purple-50 text-purple-600'
                                      : 'bg-purple-900/20 text-purple-400'
                                    : theme === 'light'
                                      ? 'text-gray-700 hover:bg-gray-100'
                                      : 'text-gray-300 hover:bg-gray-800'
                                }`}
                              >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                                {item.requiresAuth && !isAuthenticated && (
                                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse ml-auto" />
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right Side Actions */}
                <div className="hidden md:flex items-center gap-4">
                  {/* Search Button */}
                  <div className="relative hidden md:block">
                    <SearchBar
                      onSelectProject={handleProjectSelect}
                      onViewAllResults={() => {
                        setCurrentView('search');
                      }}
                    />
                  </div>
                  
                  <NotificationDropdown
                    onViewAll={() => setCurrentView('notifications')}
                  />

                  {/* Theme Toggle Button */}
                  <motion.button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-all duration-[3000ms] ${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {theme === 'light' ? (
                      <Moon className="w-5 h-5 drop-shadow-lg" />
                    ) : (
                      <Sun className="w-5 h-5 drop-shadow-lg" />
                    )}
                  </motion.button>

                  {/* Admin Button */}
                  <motion.button 
                    onClick={() => setCurrentView('admin')}
                    className={`p-2 rounded-lg transition-all duration-[3000ms] ${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <LayoutDashboard className="w-5 h-5 drop-shadow-lg" />
                  </motion.button>

                  {/* User Menu */}
                  {isAuthenticated ? (
                    <div className="relative">
                      <motion.button 
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-[3000ms] ${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <img 
                          src={user?.avatar} 
                          alt={user?.name}
                          className="w-8 h-8 rounded-full object-cover border-2 border-purple-500/30"
                        />
                      </motion.button>

                      <AnimatePresence>
                        {showUserMenu && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -10 }}
                            className={`absolute right-0 top-12 w-48 rounded-xl border backdrop-blur-xl shadow-2xl z-50 ${
                              theme === 'light'
                                ? 'bg-white/90 border-gray-200'
                                : 'bg-gray-900/90 border-white/20'
                            }`}
                          >
                            <div className="p-2">
                              <button
                                onClick={() => {
                                  setCurrentView('profile');
                                  setShowUserMenu(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                  theme === 'light' ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/10 text-gray-300'
                                }`}
                              >
                                <User className="w-4 h-4" />
                                Profile
                              </button>
                              <button
                                onClick={handleLogout}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                  theme === 'light' ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/10 text-gray-300'
                                }`}
                              >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <motion.button 
                        onClick={() => handleAuthClick('login')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-[3000ms] ${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <LogIn className="w-4 h-4 drop-shadow-lg" />
                        <span className="font-medium drop-shadow-lg">Sign In</span>
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
                  {mainNavItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`p-2 rounded-lg transition-all duration-[3000ms] relative ${
                        currentView === item.id
                          ? 'text-cyan-400'
                          : `${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <item.icon className="w-5 h-5 drop-shadow-lg" />
                      {item.requiresAuth && !isAuthenticated && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                      )}
                    </motion.button>
                  ))}
                  
                {/* Mobile Admin Button */}
                <motion.button
                  onClick={() => setCurrentView('admin')}
                  className={`p-2 rounded-lg transition-all duration-[3000ms] ${
                    currentView === 'admin'
                      ? 'text-cyan-400'
                      : `${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <LayoutDashboard className="w-5 h-5 drop-shadow-lg" />
                </motion.button>

                {/* Notifications */}
                <div className="relative">
                  <NotificationDropdown
                    onViewAll={() => setCurrentView('notifications')}
                    maxItems={3}
                  />
                </div>

                {/* Theme Toggle */}
                <motion.button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition-all duration-[3000ms] ${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {theme === 'light' ? (
                      <motion.span
                        key="moon"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Moon className="w-5 h-5 drop-shadow-lg" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="sun"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Sun className="w-5 h-5 drop-shadow-lg" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Sidebar - Clean icon column only */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="hidden md:flex fixed left-6 top-0 bottom-0 z-50 items-center"
          >
            {/* Sidebar Container - Clean icon column only */}
            <div className="flex flex-col items-center space-y-6 w-16 py-8 group">
              
              {/* Logo - Much bigger size, no animations */}
              <div className="w-24 h-24 flex items-center justify-center mb-4 relative">
                <img 
                  src="/Improved Logo-01.png" 
                  alt="Circles Logo" 
                  className="w-24 h-24 object-contain drop-shadow-lg"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <span className={`font-bold text-2xl hidden drop-shadow-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  C
                </span>
              </div>

              {/* Main Navigation Icons */}
              <div className="flex flex-col items-center space-y-3">
                {mainNavItems.map((item, index) => (
                  <div key={item.id} className="relative">
                    <motion.button
                      onClick={() => handleItemClick(item.id)}
                      className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-[3000ms] ${
                        currentView === item.id
                          ? `${theme === 'light' 
                              ? 'text-purple-600 bg-purple-100/50 shadow-lg shadow-purple-400/25' 
                              : 'text-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/25'
                            }`
                          : `${theme === 'light' 
                              ? 'text-gray-700 hover:text-gray-900 hover:bg-white/50' 
                              : 'text-gray-400 hover:text-white hover:bg-white/10'
                            }`
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <item.icon className="w-6 h-6" />
                      {item.requiresAuth && !isAuthenticated && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                      )}

                      {/* Active Indicator */}
                      {currentView === item.id && (
                        <motion.div
                          layoutId="activeIndicator"
                          className={`absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-[3000ms] ${
                            theme === 'light' 
                              ? 'bg-gradient-to-b from-purple-400 to-purple-500'
                              : 'bg-gradient-to-b from-cyan-400 to-blue-500'
                          }`}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                    
                    {/* Hover Text */}
                    <span className={`absolute left-16 top-1/2 transform -translate-y-1/2 whitespace-nowrap px-2 py-1 text-sm font-light opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none select-none group-hover:translate-x-0 translate-x-[-10px] ${
                      currentView === item.id
                        ? theme === 'light'
                          ? 'text-purple-600'
                          : 'text-cyan-400'
                        : theme === 'light'
                          ? 'text-gray-700'
                          : 'text-gray-400'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                ))}

                {/* More Menu Button */}
                <div className="relative hidden md:block">
                  <motion.button
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-[3000ms] ${
                      moreNavItems.some(item => item.id === currentView)
                        ? `${theme === 'light' 
                            ? 'text-purple-600 bg-purple-100/50 shadow-lg shadow-purple-400/25' 
                            : 'text-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/25'
                          }`
                        : `${theme === 'light' 
                            ? 'text-gray-700 hover:text-gray-900 hover:bg-white/50' 
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                          }`
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MoreHorizontal className="w-6 h-6" />
                    
                    {/* Active Indicator for any "more" item */}
                    {moreNavItems.some(item => item.id === currentView) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className={`absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-[3000ms] ${
                          theme === 'light' 
                            ? 'bg-gradient-to-b from-purple-400 to-purple-500'
                            : 'bg-gradient-to-b from-cyan-400 to-blue-500'
                        }`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                  
                  {/* Hover Text */}
                  <span className={`absolute left-16 top-1/2 transform -translate-y-1/2 whitespace-nowrap px-2 py-1 text-sm font-light opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none select-none group-hover:translate-x-0 translate-x-[-10px] ${
                    moreNavItems.some(item => item.id === currentView)
                      ? theme === 'light'
                        ? 'text-purple-600'
                        : 'text-cyan-400'
                      : theme === 'light'
                        ? 'text-gray-700'
                        : 'text-gray-400'
                  }`}>
                    More
                  </span>
                  
                  {/* More Menu Dropdown */}
                  <AnimatePresence>
                    {showMoreMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute left-16 top-0 w-48 rounded-xl border backdrop-blur-xl shadow-xl z-50 ${
                          theme === 'light'
                            ? 'bg-white/90 border-gray-200'
                            : 'bg-gray-900/90 border-white/20'
                        }`}
                      >
                        <div className="py-2">
                          {moreNavItems.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleItemClick(item.id)}
                              className={`w-full flex items-center gap-3 px-4 py-2 transition-colors ${
                                currentView === item.id
                                  ? theme === 'light'
                                    ? 'bg-purple-50 text-purple-600'
                                    : 'bg-purple-900/20 text-purple-400'
                                  : theme === 'light'
                                    ? 'text-gray-700 hover:bg-gray-100'
                                    : 'text-gray-300 hover:bg-gray-800'
                              }`}
                            >
                              <item.icon className="w-5 h-5" />
                              <span>{item.label}</span>
                              {item.requiresAuth && !isAuthenticated && (
                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse ml-auto" />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Notification Button */}
                <div className="relative hidden md:block">
                  <motion.button
                      onClick={() => setCurrentView('notifications')}
                      className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-[3000ms] ${
                        currentView === 'notifications'
                          ? `${theme === 'light'
                              ? 'text-purple-600 bg-purple-100/50 shadow-lg shadow-purple-400/25'
                              : 'text-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/25'
                            }`
                          : `${theme === 'light'
                              ? 'text-gray-700 hover:text-gray-900 hover:bg-white/50'
                              : 'text-gray-400 hover:text-white hover:bg-white/10'
                            }`
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bell className="w-6 h-6" />
                      <motion.div 
                        className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-current"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />

                      {/* Active Indicator */}
                      {currentView === 'notifications' && (
                        <motion.div
                          layoutId="activeIndicator"
                          className={`absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-[3000ms] ${
                            theme === 'light' 
                              ? 'bg-gradient-to-b from-purple-400 to-purple-500'
                              : 'bg-gradient-to-b from-cyan-400 to-blue-500'
                          }`}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                    
                    {/* Hover Text */}
                    <span className={`absolute left-16 top-1/2 transform -translate-y-1/2 whitespace-nowrap px-2 py-1 text-sm font-light opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none select-none group-hover:translate-x-0 translate-x-[-10px] ${
                      currentView === 'notifications'
                        ? theme === 'light'
                          ? 'text-purple-600'
                          : 'text-cyan-400'
                        : theme === 'light'
                          ? 'text-gray-700'
                          : 'text-gray-400'
                    }`}>
                      Notifications
                    </span>
                </div>

                {/* Profile Button */}
                {isAuthenticated && (
                  <div className="relative">
                    <motion.button
                      onClick={() => handleItemClick('profile')}
                      className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-[3000ms] ${
                        currentView === 'profile'
                          ? `${theme === 'light' 
                              ? 'text-purple-600 bg-purple-100/50 shadow-lg shadow-purple-400/25' 
                              : 'text-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/25'
                            }`
                          : `${theme === 'light' 
                              ? 'text-gray-700 hover:text-gray-900 hover:bg-white/50' 
                              : 'text-gray-400 hover:text-white hover:bg-white/10'
                            }`
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img 
                          src={user?.avatar} 
                          alt={user?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Active Indicator */}
                      {currentView === 'profile' && (
                        <motion.div
                          layoutId="activeIndicator"
                          className={`absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-[3000ms] ${
                            theme === 'light' 
                              ? 'bg-gradient-to-b from-purple-400 to-purple-500'
                              : 'bg-gradient-to-b from-cyan-400 to-blue-500'
                          }`}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                    
                    {/* Hover Text */}
                    <span className={`absolute left-16 top-1/2 transform -translate-y-1/2 whitespace-nowrap px-2 py-1 text-sm font-light opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none select-none group-hover:translate-x-0 translate-x-[-10px] ${
                      currentView === 'profile'
                        ? theme === 'light'
                          ? 'text-purple-600'
                          : 'text-cyan-400'
                        : theme === 'light'
                          ? 'text-gray-700'
                          : 'text-gray-400'
                    }`}>
                      Profile
                    </span>
                  </div>
                )}

                {/* Auth Buttons for Sidebar */}
                {!isAuthenticated && (
                  <div className="relative">
                    <motion.button
                      onClick={() => onAuthRequired('login')}
                      className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-[3000ms] ${
                        theme === 'light' 
                          ? 'text-gray-700 hover:text-gray-900 hover:bg-white/50' 
                          : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <LogIn className="w-6 h-6" />
                    </motion.button>
                    
                    {/* Hover Text */}
                    <span className={`absolute left-16 top-1/2 transform -translate-y-1/2 whitespace-nowrap px-2 py-1 text-sm font-light opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none select-none group-hover:translate-x-0 translate-x-[-10px] ${
                      theme === 'light'
                        ? 'text-gray-700'
                        : 'text-gray-400'
                    }`}>
                      Sign In
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setSelectedProject(null);
          setInitialTab('overview');
        }}
        initialTab={initialTab}
        onTrackInvestment={() => setCurrentView('dashboard')}
      />
      <MobileBottomBar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onAuthRequired={onAuthRequired}
      />
    </>
  );
};

export default Navigation;