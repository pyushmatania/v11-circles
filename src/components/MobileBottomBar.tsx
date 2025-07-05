import React from 'react';
import { Home, Film, Users, User, LogIn, BarChart3 } from 'lucide-react';
import { useAuth } from './auth/AuthProvider';

interface Props {
  currentView: 'home' | 'dashboard' | 'projects' | 'community' | 'merch' | 'profile' | 'admin' | 'portfolio' | 'compare' | 'news' | 'notifications' | 'search';
  setCurrentView: (view: Props['currentView']) => void;
  onAuthRequired: (mode?: 'login' | 'register') => boolean;
}

const MobileBottomBar: React.FC<Props> = ({ currentView, setCurrentView, onAuthRequired }) => {
  const { isAuthenticated } = useAuth();

  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'projects' as const, icon: Film, label: 'Browse' },
    { id: 'dashboard' as const, icon: BarChart3, label: 'Dashboard' },
    { id: 'community' as const, icon: Users, label: 'Community' },
    { id: 'profile' as const, icon: User, label: 'Profile', requiresAuth: true }
  ];

  const handleClick = (id: Props['currentView'], requiresAuth?: boolean) => {
    if (requiresAuth && !isAuthenticated) {
      onAuthRequired('login');
      return;
    }
    setCurrentView(id);
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden backdrop-blur-lg bg-white/30 dark:bg-gray-900/40 border-t border-white/20 dark:border-white/10">
      <div className="flex justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id, item.requiresAuth)}
            className={`flex flex-col items-center text-xs px-2 py-2 min-h-[48px] ${
              currentView === item.id ? 'text-cyan-400' : 'text-gray-300'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="leading-none mt-1">{item.label}</span>
          </button>
        ))}
        {!isAuthenticated && (
          <button
            onClick={() => onAuthRequired('login')}
            className="flex flex-col items-center text-xs px-2 py-2 text-gray-300 min-h-[48px]"
          >
            <LogIn className="w-6 h-6" />
            <span className="leading-none mt-1">Sign In</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default MobileBottomBar;
