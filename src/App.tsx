import React, { useState } from 'react';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import HowItWorks from './components/HowItWorks';
import LiveProjects from './components/LiveProjects';
import WhyThisMatters from './components/WhyThisMatters';
import TechTrust from './components/TechTrust';
import Rewards from './components/Rewards';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Dashboard from './components/Dashboard';
import ProjectCatalog from './components/ProjectCatalog';
import Community from './components/Community';
import Merchandise from './components/Merchandise';
import Navigation from './components/Navigation';
import ProfilePage from './components/profile/ProfilePage';
import AuthModal from './components/auth/AuthModal';
import ToastContainer from './components/auth/ToastNotification';
import AdminDashboard from './components/admin/AdminDashboard';
import PortfolioAnalytics from './components/PortfolioAnalytics';
import ProjectComparison from './components/ProjectComparison';
import NewsAndUpdates from './components/NewsAndUpdates';
import NotificationCenter from './components/NotificationCenter';
import EnhancedSearch from './components/EnhancedSearch';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider, useAuth } from './components/auth/AuthProvider';
import { useToast } from './hooks/useToast';

function AppContent() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'projects' | 'community' | 'merch' | 'profile' | 'admin' | 'portfolio' | 'compare' | 'news' | 'notifications' | 'search'>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const { isAuthenticated } = useAuth();
  const { toasts, toast, removeToast } = useToast();

  const handleAuthRequired = (mode: 'login' | 'register' = 'login') => {
    if (!isAuthenticated) {
      setAuthModalMode(mode);
      setAuthModalOpen(true);
      return false;
    }
    return true;
  };

  const handleViewChange = (view: typeof currentView) => {
    // Check if authentication is required for certain views
    if (['profile', 'portfolio'].includes(view)) {
      if (!handleAuthRequired()) {
        toast.info('Please sign in', 'You need to be logged in to access this page');
        return;
      }
    }
    setCurrentView(view);
  };

  // If admin view is selected, render the admin dashboard
  if (currentView === 'admin') {
    return <AdminDashboard />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'projects':
        return <ProjectCatalog onTrackInvestment={() => handleViewChange('dashboard')} />;
      case 'dashboard':
        // Dashboard is now accessible without login
        return <Dashboard />;
      case 'community':
        return <Community />;
      case 'merch':
        return <Merchandise />;
      case 'profile':
        return isAuthenticated ? <ProfilePage /> : null;
      case 'portfolio':
        return isAuthenticated ? <PortfolioAnalytics /> : null;
      case 'compare':
        return <ProjectComparison onTrackInvestment={() => handleViewChange('dashboard')} setCurrentView={handleViewChange} />;
      case 'news':
        return <NewsAndUpdates />;
      case 'notifications':
        return <NotificationCenter />;
      case 'search':
        return <EnhancedSearch />;
      default:
        return (
          <>
            <Hero setCurrentView={handleViewChange} />
            <ProblemSolution setCurrentView={handleViewChange} />
            <HowItWorks setCurrentView={handleViewChange} />
            <LiveProjects
              onViewAll={() => handleViewChange('projects')}
              onTrackInvestment={() => handleViewChange('dashboard')}
            />
            <WhyThisMatters onJoin={() => handleAuthRequired('register')} />
            <TechTrust />
            <Rewards />
            <Testimonials />
            <CallToAction setCurrentView={handleViewChange} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 overflow-x-hidden">
      <Navigation
        currentView={currentView}
        setCurrentView={handleViewChange}
        onAuthRequired={handleAuthRequired}
      />
      {renderCurrentView()}
      
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
      
      <ToastContainer 
        toasts={toasts}
        onClose={removeToast}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;