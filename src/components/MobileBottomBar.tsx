import React from 'react';
import { motion } from 'framer-motion';
import { Home, BarChart3, Film, Users } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useAuth } from './auth/useAuth';

interface MobileBottomBarProps {
  currentView: 'home' | 'dashboard' | 'projects' | 'community' | 'merch' | 'profile' | 'admin' | 'portfolio' | 'compare' | 'news' | 'notifications' | 'search' | 'project-detail';
  setCurrentView: (view: 'home' | 'dashboard' | 'projects' | 'community' | 'merch' | 'profile' | 'admin' | 'portfolio' | 'compare' | 'news' | 'notifications' | 'search' | 'project-detail') => void;
  onAuthRequired: (mode?: 'login' | 'register') => boolean;
}

const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ currentView, setCurrentView, onAuthRequired }) => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Home, requiresAuth: false },
    { id: 'projects', label: 'Browse', icon: Film, requiresAuth: false },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, requiresAuth: false },
    { id: 'community', label: 'Community', icon: Users, requiresAuth: false }
  ];

  const handleItemClick = (itemId: string) => {
    if (itemId === 'theme') {
      toggleTheme();
    } else if (['home', 'projects', 'dashboard', 'community', 'merch', 'profile', 'admin', 'portfolio', 'compare', 'news', 'notifications', 'search', 'project-detail'].includes(itemId)) {
      const item = mainNavItems.find(nav => nav.id === itemId);
      if (item?.requiresAuth && !isAuthenticated) {
      onAuthRequired('login');
      return;
    }
      setCurrentView(itemId as 'home' | 'dashboard' | 'projects' | 'community' | 'merch' | 'profile' | 'admin' | 'portfolio' | 'compare' | 'news' | 'notifications' | 'search' | 'project-detail');
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className={`flex items-center justify-between px-6 py-4 backdrop-blur-xl border-t ${
        theme === 'light'
          ? 'bg-white/90 border-gray-200'
          : 'bg-gray-900/90 border-white/20'
      }`}>
        {mainNavItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`relative p-2 rounded-lg transition-all duration-[3000ms] ${
              currentView === item.id
                ? `${theme === 'light' 
                    ? 'text-purple-600' 
                    : 'text-cyan-400'
                  }`
                : `${theme === 'light' 
                    ? 'text-gray-600 hover:text-gray-900' 
                    : 'text-gray-300 hover:text-white'
                  }`
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <item.icon className="w-6 h-6" />
            {item.requiresAuth && !isAuthenticated && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomBar;
