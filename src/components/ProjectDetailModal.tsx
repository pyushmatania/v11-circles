import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Play, 
  Star, 
  Clock, 
  Users, 
  Film, 
  Music, 
  Tv,
  Calendar,
  MapPin,
  Award,
  Gift,
  Crown,
  Camera,
  Heart,
  Share2,
  Download,
  Eye,
  TrendingUp,
  DollarSign,
  Shield,
  CheckCircle,
  Gem,
  Badge
} from 'lucide-react';
import { Project } from '../types';
import { useTheme } from './ThemeContext';
import useIsMobile from '../hooks/useIsMobile';
import { useToast } from '../hooks/useToast';
import confetti from 'canvas-confetti';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'overview' | 'script' | 'cast' | 'perks' | 'invest';
  onTrackInvestment?: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose, initialTab = 'overview', onTrackInvestment: _onTrackInvestment }) => {
  void _onTrackInvestment;
  const [activeTab, setActiveTab] = useState<'overview' | 'script' | 'cast' | 'perks' | 'invest'>(initialTab);
  const [selectedPerkTier, setSelectedPerkTier] = useState<string>('supporter');
  const [investmentAmount, setInvestmentAmount] = useState<number>(25000);
  const [investStatus, setInvestStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showMobileInvest, setShowMobileInvest] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'netbanking' | 'card'>('upi');
  const [upiId, setUpiId] = useState('');
  const [bankName, setBankName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const { theme } = useTheme();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [showTrailer, setShowTrailer] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoIdMatch = (project?.trailer || '').match(/(?:watch\?v=|embed\/)([^&]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : '';

  const handleInvest = () => {
    if (investStatus !== 'idle') return;
    try {
      navigator.vibrate?.(50);
    } catch {
      /* ignore */
    }
    setInvestStatus('loading');
    setTimeout(() => {
      setInvestStatus('success');
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
      try {
        localStorage.setItem('lastInvestment', JSON.stringify({ project: project?.title, amount: investmentAmount }));
      } catch {
        /* ignore */
      }
      toast.success('Investment Confirmed', `You invested ₹${investmentAmount.toLocaleString()}`, 2500);
      setTimeout(() => {
        setInvestStatus('idle');
        setShowMobileInvest(false);
      }, 2500);
    }, 2000);
  };

  // Prevent background scrolling and reset tab when modal is open
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setShowTrailer(false);
      setVideoLoaded(false);
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialTab, project]);

  if (!project) return null;

  // Detailed data for the project
  const projectDetails = {
    trailer: project.trailer
      ? project.trailer.replace('watch?v=', 'embed/')
      : 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    script: `FADE IN:

EXT. MUMBAI SKYLINE - NIGHT

The year is 2045. Neon lights pierce through the monsoon rain, casting electric blues and purples across the glass towers of New Mumbai. Flying cars weave between holographic advertisements in multiple languages.

ARJUN (25), a cyber-detective with neural implants glowing softly at his temples, stands on a rooftop overlooking the sprawling metropolis.

ARJUN
(into his neural comm)
The data trail leads here. If we're right about the conspiracy, everything changes tonight.

A holographic message materializes in front of him - a cryptic symbol pulsing with dangerous energy.

ARJUN (CONT'D)
(whispers)
The Neon Nights have begun.

CUT TO:

INT. UNDERGROUND TECH LAB - CONTINUOUS

MAYA (23), a brilliant hacker with cybernetic arms, types at lightning speed across multiple holographic interfaces. Code streams across her augmented reality contact lenses.

MAYA
Arjun, I'm detecting massive data corruption in the city's neural network. Someone's trying to rewrite reality itself.

The lab's lights flicker ominously as an AI voice echoes through the space.

AI VOICE
Unauthorized access detected. Initiating lockdown protocol.

Maya's eyes widen in terror as the walls begin to close in...

FADE TO BLACK.

TITLE CARD: "NEON NIGHTS"`,
    
    cast: [
      {
        name: "Rajkummar Rao",
        role: "Arjun - Cyber Detective",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200",
        bio: "National Award-winning actor known for versatile performances in Newton, Stree, and The White Tiger."
      },
      {
        name: "Taapsee Pannu",
        role: "Maya - Elite Hacker",
        image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=200",
        bio: "Acclaimed actress from Pink, Thappad, and Haseen Dillruba, known for strong female characters."
      },
      {
        name: "Nawazuddin Siddiqui",
        role: "The Architect - AI Mastermind",
        image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200",
        bio: "Internationally recognized actor from Sacred Games, Gangs of Wasseypur, and The Lunchbox."
      },
      {
        name: "Radhika Apte",
        role: "Dr. Priya - Neural Scientist",
        image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=200",
        bio: "Versatile performer known for Andhadhun, Sacred Games, and international projects."
      }
    ],

    crew: [
      { name: "Arjun Menon", role: "Director", experience: "Tumhari Sulu, Helicopter Eela" },
      { name: "Ritesh Shah", role: "Writer", experience: "Pink, Airlift, Raid" },
      { name: "Amit Trivedi", role: "Music Director", experience: "Dev.D, Queen, Andhadhun" },
      { name: "Anil Mehta", role: "Cinematographer", experience: "Lagaan, Taare Zameen Par" }
    ],

    productionDetails: {
      budget: "₹50 Crores",
      shootingLocations: ["Mumbai", "Pune", "Goa", "London"],
      shootingSchedule: "March 2024 - August 2024",
      postProduction: "September 2024 - December 2024",
      releaseDate: "January 2025",
      distributors: ["PVR Pictures", "Netflix India"],
      certifications: ["U/A", "CBFC Approved"]
    },

    perkTiers: [
      {
        id: 'supporter',
        name: '🎟️ Supporter',
        minAmount: 10000,
        color: 'from-gray-500 to-gray-600',
        icon: <Star className="w-6 h-6" />,
        perks: [
          'Digital certificate of investment',
          'Early access to trailer (2 weeks before public)',
          'Exclusive project updates via email',
          'Digital poster collection (5 exclusive designs)',
          'Behind-the-scenes photo gallery',
          'Custom wallpaper pack',
          'Access to investor-only community forum',
          'Personalized thank-you video from cast'
        ],
        estimatedValue: '₹2,500'
      },
      {
        id: 'backer',
        name: '🎬 Backer',
        minAmount: 25000,
        color: 'from-blue-500 to-cyan-500',
        icon: <Gift className="w-6 h-6" />,
        perks: [
          'All Supporter perks',
          'Name in credits',
          'Community casting vote',
          'Fan voting board (poster, trailer, scenes)',
          'Early access to new project listings',
          'Animated sticker & GIF pack',
          'Q&A with director or cast (virtual)',
          'Early access to interactive storyboard',
          'Virtual photobook and concept art gallery'
        ],
        estimatedValue: '₹8,000',
        popular: true
      },
      {
        id: 'producer',
        name: '📽️ Producer',
        minAmount: 75000,
        color: 'from-purple-500 to-pink-500',
        icon: <Gem className="w-6 h-6" />,
        perks: [
          'All Backer perks',
          'Leaderboard shoutout',
          'Limited edition signed digital art',
          'Backstage Pass NFT for creator livestreams',
          'Free access to concert or music launch',
          'Access to creator workshops',
          'Invite to co-watch party',
          'Red carpet shadow access',
          'Attend private wrap party or shoot-day experience'
        ],
        estimatedValue: '₹15,000'
      },
      {
        id: 'executive',
        name: '🌟 Executive Producer',
        minAmount: 150000,
        color: 'from-yellow-500 to-orange-500',
        icon: <Badge className="w-6 h-6" />,
        perks: [
          'All Producer perks',
          'Trip with the stars (paid tier access)',
          '1-on-1 coffee/meeting with cast or creator',
          'VIP set visit with crew',
          'Premiere invite + post-screening afterparty',
          'Exclusive influence over future story arcs',
          'Gamified XP system unlocking ultra-rare perks',
          'Special mention as Executive Producer in public credits',
          'First access to upcoming flagship campaigns'
        ],
        estimatedValue: '₹35,000'
      }
    ],

    investmentDetails: {
      minimumInvestment: 10000,
      maximumInvestment: 1000000,
      expectedReturns: '12-18%',
      paymentMethods: ['UPI', 'Net Banking', 'Credit Card', 'Debit Card'],
      investmentProtection: 'SEBI Registered',
      taxBenefits: 'Section 80C eligible',
      lockInPeriod: '18 months'
    },

    riskFactors: [
      'Film industry investments carry market risks',
      'Returns depend on box office performance',
      'Release dates may be subject to change',
      'Regulatory approvals required'
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'script', label: 'Script Preview', icon: Film },
    { id: 'cast', label: 'Cast & Crew', icon: Users },
    { id: 'perks', label: 'Perks & Rewards', icon: Gift },
    { id: 'invest', label: 'Investment', icon: TrendingUp }
  ];

  const selectedPerk = projectDetails.perkTiers.find(tier => tier.id === selectedPerkTier);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`absolute inset-0 ${
              theme === 'light' 
                ? 'bg-white/80 backdrop-blur-sm' 
                : 'bg-black/80 backdrop-blur-sm'
            }`}
          />

          {/* Modal */}
          <motion.div
            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.9, y: 50 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`relative w-full ${
              isMobile ? 'fixed bottom-0 inset-x-0 h-[90vh] rounded-t-2xl' : 'max-w-7xl max-h-[90vh] mx-auto mt-[5vh] rounded-2xl'
            } border overflow-y-auto touch-pan-y ${
              theme === 'light'
                ? 'light-glass-header'
                : 'bg-gradient-to-br from-gray-900 to-black border-white/20'
            }`}
          >
            {/* Header */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={project.poster} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 pointer-events-none ${
                  theme === 'light'
                    ? 'bg-gradient-to-t from-white via-white/50 to-transparent'
                    : 'bg-gradient-to-t from-black via-black/50 to-transparent'
                }`}
              />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${
                  theme === 'light'
                    ? 'bg-white/50 text-gray-700 hover:bg-white/70'
                    : 'bg-black/50 text-white hover:bg-black/70'
                }`}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Project Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md ${
                    project.type === 'film' ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300' :
                    project.type === 'music' ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300' :
                    'bg-green-500/20 border border-green-500/30 text-green-300'
                  }`}>
                    {project.type === 'film' ? <Film className="w-4 h-4" /> :
                     project.type === 'music' ? <Music className="w-4 h-4" /> :
                     <Tv className="w-4 h-4" />}
                    <span className="text-sm font-medium uppercase">{project.type}</span>
                  </div>
                  
                  {project.rating && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-md bg-yellow-500/20 border border-yellow-500/30">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-300 text-sm font-medium">{project.rating}</span>
                    </div>
                  )}
                </div>

                <h1 className={`text-4xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {project.title}
                </h1>
                <p className={`text-lg mb-4 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  {project.description}
                </p>
                
                <div className={`flex items-center gap-6 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  <span>by {project.director || project.artist}</span>
                  <span>•</span>
                  <span>{project.genre}</span>
                  <span>•</span>
                  <span>{project.language}</span>
                </div>

                {!isMobile && (
                  <button
                    onClick={handleInvest}
                    disabled={investStatus !== 'idle'}
                    className="mt-4 w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 transition-all"
                  >
                    Invest Now
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
              <div className="flex">
              {/* Scrollable Sidebar Navigation */}
              <div
                className={`${
                  isMobile
                    ? 'w-16 items-center sticky top-0 h-full'
                    : 'w-80'
                } border-r flex flex-col ${
                  theme === 'light'
                    ? 'bg-white/30 border-gray-200'
                    : 'bg-black/30 border-white/10'
                }`}
              >
                {/* Sidebar Header */}
                {!isMobile && (
                <div className="p-4 border-b border-current/10">
                  <h3 className={`font-semibold text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Project Details
                  </h3>
                </div>
                )}

                {/* Scrollable Content Container */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-300">
                  <div className="p-4 space-y-6">
                    {/* Navigation Tabs */}
                    <div className="space-y-2">
                      {!isMobile && (
                        <h4 className={`text-sm font-medium uppercase tracking-wide ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          Navigation
                        </h4>
                      )}
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as typeof activeTab)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 text-left ${
                            activeTab === tab.id
                              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                              : `${theme === 'light' ? 'text-gray-700 hover:bg-white/50 hover:text-gray-900' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`
                          } ${isMobile ? 'justify-center min-h-12' : ''}`}
                        >
                          <tab.icon className="w-5 h-5 flex-shrink-0" />
                          {!isMobile && <span>{tab.label}</span>}
                        </button>
                      ))}
                    </div>

                    {/* Quick Stats */}
                    {!isMobile && (
                    <div className={`p-4 rounded-xl border ${
                      theme === 'light'
                        ? 'bg-white/50 border-gray-200'
                        : 'bg-white/5 border-white/10'
                    }`}>
                      <h4 className={`font-semibold mb-3 text-sm uppercase tracking-wide ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Quick Stats
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Funded</span>
                          <div className="flex items-center gap-2">
                            <div className={`w-16 h-2 rounded-full ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}>
                              <div 
                                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                                style={{ width: `${project.fundedPercentage}%` }}
                              />
                            </div>
                            <span className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                              {project.fundedPercentage}%
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Raised</span>
                          <span className="text-green-400 font-semibold">₹{(project.raisedAmount / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Target</span>
                          <span className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} font-semibold`}>
                            ₹{(project.targetAmount / 100000).toFixed(1)}L
                          </span>
                        </div>
                        {project.timeLeft && (
                          <div className="flex justify-between">
                            <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Time Left</span>
                            <span className="text-orange-400 font-semibold">{project.timeLeft}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    )}

                    {/* Investment Tiers Preview */}
                    {!isMobile && (
                    <div className={`p-4 rounded-xl border ${
                      theme === 'light'
                        ? 'bg-white/50 border-gray-200'
                        : 'bg-white/5 border-white/10'
                    }`}>
                      <h4 className={`font-semibold mb-3 text-sm uppercase tracking-wide ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Investment Tiers
                      </h4>
                      <div className="space-y-2">
                        {projectDetails.perkTiers.slice(0, 3).map((tier) => (
                          <div key={tier.id} className="flex items-center justify-between text-sm">
                            <span className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                              {tier.name}
                            </span>
                            <span className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                              ₹{tier.minAmount.toLocaleString()}+
                            </span>
                          </div>
                        ))}
                        <button
                          onClick={() => setActiveTab('perks')}
                          className="w-full mt-2 py-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          View All Tiers →
                        </button>
                      </div>
                    </div>
                    )}

                    {/* Project Tags */}
                    {!isMobile && (
                    <div>
                      <h4 className={`font-semibold mb-3 text-sm uppercase tracking-wide ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 6).map((tag, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${
                              theme === 'light'
                                ? 'bg-white/50 text-gray-700 border-gray-300'
                                : 'bg-white/10 text-gray-300 border-white/20'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    )}

                    {/* Action Buttons */}
                    {!isMobile && (
                      <div className="space-y-3 pt-4">
                        <div className="flex gap-2">
                          <button
                            className={`flex-1 py-2 px-3 rounded-lg border transition-colors ${
                              theme === 'light'
                                ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                : 'border-white/20 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <Heart className="w-4 h-4 mx-auto" />
                          </button>
                          <button
                            className={`flex-1 py-2 px-3 rounded-lg border transition-colors ${
                              theme === 'light'
                                ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                : 'border-white/20 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <Share2 className="w-4 h-4 mx-auto" />
                          </button>
                          <button
                            className={`flex-1 py-2 px-3 rounded-lg border transition-colors ${
                              theme === 'light'
                                ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                : 'border-white/20 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <Download className="w-4 h-4 mx-auto" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Content - Fixed height with scroll */}
              <div className="flex-1 modal-content">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-6 space-y-8"
                  >
                    {/* Trailer */}
                    <div>
                      <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        Official Trailer
                      </h2>
                    <div
                      className={`relative aspect-video rounded-xl overflow-hidden ${
                        theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'
                      }`}
                    >
        {(!showTrailer || !videoLoaded) && (
          <>
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt="Trailer thumbnail"
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              onClick={() => { setShowTrailer(true); setVideoLoaded(false); }}
            />
            {!showTrailer && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => { setShowTrailer(true); setVideoLoaded(false); }}
                  aria-label="Play trailer"
                  className="w-16 h-16 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm"
                >
                  <Play className="w-8 h-8" />
                </button>
              </div>
            )}
            {/* Spinner overlay while loading trailer */}
            {showTrailer && !videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60">
                <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              </div>
            )}
          </>
        )}
        {showTrailer && (
          <iframe
            src={`${projectDetails.trailer}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={`absolute inset-0 w-full h-full transition-opacity ${videoLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setVideoLoaded(true)}
          />
        )}
                    </div>
                    </div>

                    {/* Detailed Funding Information with Graphics */}
                    <div>
                      <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        Funding Progress
                      </h2>
                      <div className="grid lg:grid-cols-2 gap-8">
                        {/* Main Progress Visualization */}
                        <div className={`p-6 rounded-xl border ${
                          theme === 'light'
                            ? 'bg-white/50 border-gray-200'
                            : 'bg-black/50 border-white/10'
                        }`}>
                          <div className="space-y-6">
                            {/* Large Progress Bar */}
                            <div>
                              <div className="flex justify-between items-center mb-3">
                                <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                  Funding Progress
                                </h3>
                                <span className={`text-2xl font-bold ${
                                  project.fundedPercentage >= 75 ? 'text-green-400' :
                                  project.fundedPercentage >= 50 ? 'text-yellow-400' : 'text-gray-400'
                                }`}>
                                  {project.fundedPercentage}%
                                </span>
                              </div>
                              <div className={`w-full h-4 rounded-full overflow-hidden ${
                                theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
                              }`}>
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${project.fundedPercentage}%` }}
                                  transition={{ duration: 1.5, delay: 0.3 }}
                                  className={`h-full rounded-full ${
                                    project.fundedPercentage >= 75 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                    project.fundedPercentage >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                    'bg-gradient-to-r from-purple-500 to-blue-500'
                                  } shadow-lg`}
                                />
                              </div>
                            </div>

                            {/* Funding Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className={`p-4 rounded-lg border ${
                                theme === 'light' ? 'bg-green-50 border-green-200' : 'bg-green-500/10 border-green-500/20'
                              }`}>
                                <div className="flex items-center gap-2 mb-2">
                                  <TrendingUp className="w-4 h-4 text-green-500" />
                                  <span className={`text-sm font-medium ${theme === 'light' ? 'text-green-700' : 'text-green-300'}`}>
                                    Raised
                                  </span>
                                </div>
                                <p className={`text-xl font-bold ${theme === 'light' ? 'text-green-900' : 'text-green-400'}`}>
                                  ₹{(project.raisedAmount / 100000).toFixed(1)}L
                                </p>
                                <p className={`text-xs ${theme === 'light' ? 'text-green-600' : 'text-green-300'}`}>
                                  {project.raisedAmount.toLocaleString()} total
                                </p>
                              </div>

                              <div className={`p-4 rounded-lg border ${
                                theme === 'light' ? 'bg-blue-50 border-blue-200' : 'bg-blue-500/10 border-blue-500/20'
                              }`}>
                                <div className="flex items-center gap-2 mb-2">
                                  <DollarSign className="w-4 h-4 text-blue-500" />
                                  <span className={`text-sm font-medium ${theme === 'light' ? 'text-blue-700' : 'text-blue-300'}`}>
                                    Target
                                  </span>
                                </div>
                                <p className={`text-xl font-bold ${theme === 'light' ? 'text-blue-900' : 'text-blue-400'}`}>
                                  ₹{(project.targetAmount / 100000).toFixed(1)}L
                                </p>
                                <p className={`text-xs ${theme === 'light' ? 'text-blue-600' : 'text-blue-300'}`}>
                                  Goal amount
                                </p>
                              </div>
                            </div>

                            {/* Time Remaining */}
                            {project.timeLeft && (
                              <div className={`p-4 rounded-lg border ${
                                theme === 'light' ? 'bg-orange-50 border-orange-200' : 'bg-orange-500/10 border-orange-500/20'
                              }`}>
                                <div className="flex items-center gap-2 mb-2">
                                  <Clock className="w-4 h-4 text-orange-500" />
                                  <span className={`text-sm font-medium ${theme === 'light' ? 'text-orange-700' : 'text-orange-300'}`}>
                                    Time Remaining
                                  </span>
                                </div>
                                <p className={`text-xl font-bold ${theme === 'light' ? 'text-orange-900' : 'text-orange-400'}`}>
                                  {project.timeLeft}
                                </p>
                                <p className={`text-xs ${theme === 'light' ? 'text-orange-600' : 'text-orange-300'}`}>
                                  Campaign ends soon
                                </p>
                              </div>
                            )}
                            {/* Days Left and Created Date */}
                            <div className="flex items-center gap-4 mt-2">
                              {project.timeLeft && (
                                <span className="text-xs text-orange-400 font-semibold">
                                  {project.timeLeft} days left
                                </span>
                              )}
                              {project.createdAt && (
                                <span className="text-xs text-gray-400 font-semibold">
                                  Created: {new Date(project.createdAt).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Funding Breakdown & Analytics */}
                        <div className={`p-6 rounded-xl border ${
                          theme === 'light'
                            ? 'bg-white/50 border-gray-200'
                            : 'bg-black/50 border-white/10'
                        }`}>
                          <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            Funding Analytics
                          </h3>
                          <div className="space-y-4">
                            {/* Progress Milestones */}
                            <div>
                              <h4 className={`text-sm font-medium mb-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                Progress Milestones
                              </h4>
                              <div className="space-y-2">
                                {[25, 50, 75, 100].map((milestone) => (
                                  <div key={milestone} className="flex items-center justify-between">
                                    <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                      {milestone}% - ₹{(project.targetAmount * milestone / 100 / 100000).toFixed(1)}L
                                    </span>
                                    <div className={`w-2 h-2 rounded-full ${
                                      project.fundedPercentage >= milestone 
                                        ? 'bg-green-500' 
                                        : theme === 'light' ? 'bg-gray-300' : 'bg-gray-600'
                                    }`} />
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Funding Rate */}
                            <div>
                              <h4 className={`text-sm font-medium mb-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                Funding Rate
                              </h4>
                              <div className="flex items-center gap-3">
                                <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${
                                  project.fundedPercentage >= 75 ? 'border-green-500' :
                                  project.fundedPercentage >= 50 ? 'border-yellow-500' : 'border-purple-500'
                                }`}>
                                  <span className={`text-sm font-bold ${
                                    project.fundedPercentage >= 75 ? 'text-green-500' :
                                    project.fundedPercentage >= 50 ? 'text-yellow-500' : 'text-purple-500'
                                  }`}>
                                    {project.fundedPercentage}%
                                  </span>
                                </div>
                                <div>
                                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {project.fundedPercentage >= 75 ? 'Excellent Progress' :
                                     project.fundedPercentage >= 50 ? 'Good Progress' : 'Early Stage'}
                                  </p>
                                  <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
                                    {project.fundedPercentage >= 75 ? 'Nearly funded!' :
                                     project.fundedPercentage >= 50 ? 'Halfway there!' : 'Just getting started'}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Remaining Amount */}
                            <div className={`p-3 rounded-lg ${
                              theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/50'
                            }`}>
                              <div className="flex justify-between items-center">
                                <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                  Still needed
                                </span>
                                <span className={`font-bold ${
                                  theme === 'light' ? 'text-gray-900' : 'text-white'
                                }`}>
                                  ₹{((project.targetAmount - project.raisedAmount) / 100000).toFixed(1)}L
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Production Details */}
                    <div>
                      <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        Production Details
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <DollarSign className="w-5 h-5 text-green-400" />
                            <div>
                              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Budget</p>
                              <p className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {projectDetails.productionDetails.budget}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-blue-400" />
                            <div>
                              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Release Date</p>
                              <p className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {projectDetails.productionDetails.releaseDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-purple-400" />
                            <div>
                              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Shooting Locations</p>
                              <p className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {projectDetails.productionDetails.shootingLocations.join(', ')}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Camera className="w-5 h-5 text-yellow-400" />
                            <div>
                              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Shooting Schedule</p>
                              <p className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {projectDetails.productionDetails.shootingSchedule}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-green-400" />
                            <div>
                              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Certifications</p>
                              <p className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {projectDetails.productionDetails.certifications.join(', ')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Tv className="w-5 h-5 text-cyan-400" />
                            <div>
                              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Distributors</p>
                              <p className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {projectDetails.productionDetails.distributors.join(', ')}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        Tags
                      </h2>
                      <div className="flex flex-wrap gap-3">
                        {project.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className={`px-4 py-2 rounded-full text-sm font-medium border ${
                              theme === 'light'
                                ? 'bg-white/50 text-gray-700 border-gray-300'
                                : 'bg-white/10 text-gray-300 border-white/20'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Script Tab */}
                {activeTab === 'script' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-6"
                  >
                    <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      Script Preview
                    </h2>
                    <div className={`rounded-xl p-6 border ${
                      theme === 'light'
                        ? 'bg-white/50 border-gray-200'
                        : 'bg-black/50 border-white/10'
                    }`}>
                      <div className={`font-mono text-sm leading-relaxed whitespace-pre-line ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        {projectDetails.script}
                      </div>
                      <div className={`mt-6 p-4 rounded-lg border ${
                        theme === 'light'
                          ? 'bg-purple-50 border-purple-200'
                          : 'bg-purple-500/10 border-purple-500/20'
                      }`}>
                        <p className={`text-sm ${
                          theme === 'light' ? 'text-purple-700' : 'text-purple-300'
                        }`}>
                          <strong>Note:</strong> This is a preview excerpt. Full script access available to Producer tier investors and above.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Cast & Crew Tab */}
                {activeTab === 'cast' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-6 space-y-8"
                  >
                    {/* Cast */}
                    <div>
                      <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        Main Cast
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        {projectDetails.cast.map((actor, index) => (
                          <div key={index} className={`flex gap-4 p-4 rounded-xl border ${
                            theme === 'light'
                              ? 'bg-white/50 border-gray-200'
                              : 'bg-white/5 border-white/10'
                          }`}>
                            <img 
                              src={actor.image} 
                              alt={actor.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <h3 className={`font-bold text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {actor.name}
                              </h3>
                              <p className="text-purple-400 font-medium mb-2">{actor.role}</p>
                              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                                {actor.bio}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Crew */}
                    <div>
                      <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        Key Crew
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {projectDetails.crew.map((member, index) => (
                          <div key={index} className={`flex justify-between items-center p-4 rounded-xl border ${
                            theme === 'light'
                              ? 'bg-white/50 border-gray-200'
                              : 'bg-white/5 border-white/10'
                          }`}>
                            <div>
                              <h3 className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {member.name}
                              </h3>
                              <p className="text-blue-400 text-sm">{member.role}</p>
                            </div>
                            <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                              {member.experience}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Perks Tab */}
                {activeTab === 'perks' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-6"
                  >
                    <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      Investment Tiers & Perks
                    </h2>
                    
                    {/* Tier Selection */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      {projectDetails.perkTiers.map((tier) => (
                        <button
                          key={tier.id}
                          onClick={() => setSelectedPerkTier(tier.id)}
                          className={`relative p-4 rounded-xl border transition-all duration-300 ${
                            selectedPerkTier === tier.id
                              ? `${theme === 'light' ? 'border-purple-400 bg-purple-50' : 'border-white/40 bg-white/10'}`
                              : `${theme === 'light' ? 'border-gray-200 bg-white/50 hover:border-gray-300' : 'border-white/20 bg-white/5 hover:border-white/30'}`
                          } ${tier.popular ? 'ring-2 ring-yellow-500/50' : ''}`}
                        >
                          {tier.popular && (
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                              <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                                POPULAR
                              </span>
                            </div>
                          )}
                          
                          <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${tier.color} bg-opacity-20 mb-3`}>
                            <div className={`bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                              {tier.icon}
                            </div>
                          </div>
                          
                          <h3 className={`font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            {tier.name}
                          </h3>
                          <p className={`text-lg font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                            ₹{tier.minAmount.toLocaleString()}+
                          </p>
                          <p className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            Value: {tier.estimatedValue}
                          </p>
                        </button>
                      ))}
                    </div>

                    {/* Selected Tier Details */}
                    {selectedPerk && (
                      <div className={`p-6 rounded-xl border ${
                        theme === 'light'
                          ? 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200'
                          : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20'
                      }`}>
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedPerk.color}`}>
                            <div className="text-white">
                              {selectedPerk.icon}
                            </div>
                          </div>
                          <div>
                            <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                              {selectedPerk.name}
                            </h3>
                            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                              Minimum Investment: ₹{selectedPerk.minAmount.toLocaleString()}
                            </p>
                            <p className="text-green-400 font-semibold">
                              Estimated Perk Value: {selectedPerk.estimatedValue}
                            </p>
                          </div>
                        </div>

                        <h4 className={`font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          What You Get:
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {selectedPerk.perks.map((perk, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                {perk}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Investment Tab */}
                {activeTab === 'invest' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-6 space-y-8"
                  >
                    <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      Investment Details
                    </h2>
                    
                    {/* Investment Calculator */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className={`block font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            Investment Amount
                          </label>
                          <div className="relative">
                            <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                              ₹
                            </span>
                            <input
                              type="number"
                              value={investmentAmount}
                              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                              min={projectDetails.investmentDetails.minimumInvestment}
                              max={projectDetails.investmentDetails.maximumInvestment}
                              className={`w-full pl-8 pr-4 py-3 rounded-xl border focus:outline-none focus:border-purple-500/50 ${
                                theme === 'light'
                                  ? 'bg-white/50 border-gray-300 text-gray-900'
                                  : 'bg-white/10 border-white/20 text-white'
                              }`}
                            />
                          </div>
                          <div className={`flex justify-between text-sm mt-2 ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            <span>Min: ₹{projectDetails.investmentDetails.minimumInvestment.toLocaleString()}</span>
                            <span>Max: ₹{projectDetails.investmentDetails.maximumInvestment.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className={`p-4 rounded-xl border ${
                          theme === 'light'
                            ? 'bg-green-50 border-green-200'
                            : 'bg-green-500/10 border-green-500/20'
                        }`}>
                          <h4 className="text-green-400 font-semibold mb-2">Estimated Returns</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                Expected Return Rate:
                              </span>
                              <span className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {projectDetails.investmentDetails.expectedReturns}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                Potential Return (15%):
                              </span>
                              <span className="text-green-400 font-semibold">
                                ₹{(investmentAmount * 0.15).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                Total Value:
                              </span>
                              <span className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                ₹{(investmentAmount * 1.15).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className={`font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            Payment Methods
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {projectDetails.investmentDetails.paymentMethods.map((method, index) => (
                              <div key={index} className={`p-3 rounded-lg border text-center ${
                                theme === 'light'
                                  ? 'bg-white/50 border-gray-200'
                                  : 'bg-white/5 border-white/10'
                              }`}>
                                <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                  {method}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className={`p-4 rounded-xl border ${
                          theme === 'light'
                            ? 'bg-blue-50 border-blue-200'
                            : 'bg-blue-500/10 border-blue-500/20'
                        }`}>
                          <h4 className="text-blue-400 font-semibold mb-3">Investment Protection</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-green-400" />
                              <span className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                {projectDetails.investmentDetails.investmentProtection}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                {projectDetails.investmentDetails.taxBenefits}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-yellow-400" />
                              <span className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                Lock-in: {projectDetails.investmentDetails.lockInPeriod}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className={`p-4 rounded-xl border ${
                          theme === 'light'
                            ? 'bg-orange-50 border-orange-200'
                            : 'bg-orange-500/10 border-orange-500/20'
                        }`}>
                          <h4 className="text-orange-400 font-semibold mb-3">Risk Factors</h4>
                          <ul className="space-y-1 text-sm">
                            {projectDetails.riskFactors.map((risk, index) => (
                              <li key={index} className={`flex items-start gap-2 ${
                                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                              }`}>
                                <span className="text-orange-400 mt-1">•</span>
                                {risk}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          onClick={handleInvest}
                          className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold text-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105"
                        >
                          Invest ₹{investmentAmount.toLocaleString()}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
        )}
        {isMobile && (
          <motion.button
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => {
              try { navigator.vibrate?.(50); } catch {
                /* ignore */
              }
              setShowMobileInvest(true);
            }}
            className="fixed bottom-4 left-4 right-4 z-[9998] px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold"
          >
            Invest Now
          </motion.button>
        )}

        {isMobile && showMobileInvest && (
          <AnimatePresence>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm p-4 flex flex-col"
            >
              {investStatus === 'success' ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                  <CheckCircle className="w-16 h-16 text-green-400" />
                  <p className="text-white text-lg">Investment Successful!</p>
                  <button
                    onClick={() => setShowMobileInvest(false)}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <button
                    onClick={() => setShowMobileInvest(false)}
                    className="self-end text-white mb-4"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <h3 className="text-white text-lg font-semibold mb-4">Enter Amount</h3>
                  <input
                    type="number"
                    min={500}
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white mb-6"
                  />
                  <h4 className="text-white text-lg font-semibold mb-2">Payment Method</h4>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as 'upi' | 'netbanking' | 'card')}
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white mb-4"
                  >
                    <option value="upi">UPI</option>
                    <option value="netbanking">Net Banking</option>
                    <option value="card">Credit/Debit Card</option>
                  </select>
                  {paymentMethod === 'upi' ? (
                    <input
                      type="text"
                      placeholder="UPI ID"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white mb-4"
                    />
                  ) : paymentMethod === 'netbanking' ? (
                    <input
                      type="text"
                      placeholder="Bank Name"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white mb-4"
                    />
                  ) : (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white"
                      />
                      <div className="flex gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="flex-1 px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white"
                        />
                        <input
                          type="text"
                        placeholder="CVV"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-20 px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white"
                      />
                    </div>
                  </div>
                  )}
                  <div className="mt-4 space-y-2 text-sm text-white/80">
                    <div className="flex justify-between">
                      <span>Estimated Returns (15%):</span>
                      <span className="text-green-400 font-semibold">₹{(investmentAmount * 0.15).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span>SEBI Registered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Section 80C eligible</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span>Lock-in: {projectDetails.investmentDetails.lockInPeriod}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-300">
                      {projectDetails.riskFactors[0]}
                    </div>
                  </div>
                  <button
                    onClick={handleInvest}
                    disabled={investStatus === 'loading'}
                    className="mt-auto w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg"
                  >
                    Pay
                  </button>
                </div>
              )}

              {investStatus === 'loading' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
        <AnimatePresence>
          {investStatus === 'loading' && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] px-4 py-3 rounded-xl bg-gray-900 text-white flex items-center gap-3"
            >
              <div className="w-6 h-6 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {investStatus === 'success' && (
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] px-4 py-3 rounded-xl bg-gray-900 text-white flex items-center gap-2"
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <CheckCircle className="w-6 h-6 text-green-400" />
              </motion.div>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                Your investment is confirmed!
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>
  );
};

export default ProjectDetailModal;
