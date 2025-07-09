import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  PieChart, 
  LineChart, 
  TrendingUp, 
  TrendingDown,
  Calendar, 
  DollarSign,
  ArrowUpRight,
  ChevronDown,
  Filter,
  Download,
<<<<<<< Updated upstream
  Zap
=======
  Zap,
  ChevronRight,
  MapPin,
  Globe,
  Film,
  Music,
  Star
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
} from 'lucide-react';
import { useTheme } from './ThemeContext';

// Mock data for portfolio analytics
const mockPortfolioData = {
  totalInvested: 450000,
  totalReturns: 537500,
  totalProfit: 87500,
  roi: 19.44,
  investmentsByCategory: [
    { category: 'Film', amount: 250000, percentage: 55.6 },
    { category: 'Music', amount: 120000, percentage: 26.7 },
    { category: 'Web Series', amount: 80000, percentage: 17.7 }
  ],
  investmentsByGenre: [
    { genre: 'Action', amount: 180000, percentage: 40 },
    { genre: 'Drama', amount: 100000, percentage: 22.2 },
    { genre: 'Thriller', amount: 60000, percentage: 13.3 },
    { genre: 'Romance', amount: 50000, percentage: 11.1 },
    { genre: 'Comedy', amount: 40000, percentage: 8.9 },
    { genre: 'Others', amount: 20000, percentage: 4.5 }
  ],
  monthlyReturns: [
    { month: 'Jan', returns: 5600 },
    { month: 'Feb', returns: 7200 },
    { month: 'Mar', returns: 8900 },
    { month: 'Apr', returns: 7500 },
    { month: 'May', returns: 9200 },
    { month: 'Jun', returns: 11500 },
    { month: 'Jul', returns: 10800 },
    { month: 'Aug', returns: 12300 },
    { month: 'Sep', returns: 14500 },
    { month: 'Oct', returns: 18700 },
    { month: 'Nov', returns: 21000 },
    { month: 'Dec', returns: 26000 }
  ],
  topPerformingProjects: [
    { id: '1', title: 'Pushpa 3', amount: 50000, returns: 65000, roi: 30, trend: 'up', riskLevel: 'medium' },
    { id: '2', title: 'A.R. Rahman: Symphony', amount: 25000, returns: 31250, roi: 25, trend: 'up', riskLevel: 'low' },
    { id: '3', title: 'RRR 2', amount: 75000, returns: 90000, roi: 20, trend: 'up', riskLevel: 'high' },
    { id: '4', title: 'Vikram 2', amount: 60000, returns: 69000, roi: 15, trend: 'up', riskLevel: 'medium' },
    { id: '5', title: 'Sacred Games 3', amount: 35000, returns: 38500, roi: 10, trend: 'up', riskLevel: 'low' }
  ],
  underperformingProjects: [
    { id: '6', title: 'Urban Beats', amount: 20000, returns: 18000, roi: -10, trend: 'down', riskLevel: 'high' },
    { id: '7', title: 'Midnight Express', amount: 15000, returns: 14250, roi: -5, trend: 'down', riskLevel: 'medium' }
  ],
  projectionsNextQuarter: {
    expectedReturns: 62000,
    projectedROI: 5.5,
    confidenceLevel: 'high'
  }
};

type PortfolioAnalyticsProps = object;

const PortfolioAnalytics: React.FC<PortfolioAnalyticsProps> = () => {
  const { theme } = useTheme();
  const [timeframe, setTimeframe] = useState<'1m' | '3m' | '6m' | '1y' | 'all'>('1y');
  const [showFilters, setShowFilters] = useState(false);
<<<<<<< Updated upstream
=======
  const [sortKey, setSortKey] = useState<
    'investmentDate' | 'projectName' | 'investmentAmount' | 'currentValue' | 'returnPercentage' | 'status' | 'projectType' | 'genre' | 'sector' | 'region' | 'language' | 'returnAmount' | 'maturityDate' | 'risk'
  >('investmentDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedInvestments, setExpandedInvestments] = useState<Set<string>>(new Set());
  const [filterProjectType, setFilterProjectType] = useState<string>('all');
  const [filterGenre, setFilterGenre] = useState<string>('all');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');


  // Sort and filter investments
  const filteredInvestments = userInvestments.filter(inv => {
    const statusMatch = filterStatus === 'all' || inv.status === filterStatus;
    const typeMatch = filterProjectType === 'all' || inv.projectType === filterProjectType;
    const genreMatch = filterGenre === 'all' || inv.genre === filterGenre;
    const regionMatch = filterRegion === 'all' || inv.region === filterRegion;
    const riskMatch = filterRisk === 'all' || inv.risk === filterRisk;
    return statusMatch && typeMatch && genreMatch && regionMatch && riskMatch;
  });
  const sortedInvestments = [...filteredInvestments].sort((a, b) => {
    let aValue = a[sortKey];
    let bValue = b[sortKey];
    if (sortKey === 'investmentDate' || sortKey === 'maturityDate') {
      aValue = new Date((aValue as string) ?? '').getTime();
      bValue = new Date((bValue as string) ?? '').getTime();
    }
    if (aValue == null) aValue = '';
    if (bValue == null) bValue = '';
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // CSV export data
  const csvHeaders = [
    { label: 'Project', key: 'projectName' },
    { label: 'Type', key: 'projectType' },
    { label: 'Genre', key: 'genre' },
    { label: 'Sector', key: 'sector' },
    { label: 'Region', key: 'region' },
    { label: 'Language', key: 'language' },
    { label: 'Invested', key: 'investmentAmount' },
    { label: 'Current Value', key: 'currentValue' },
    { label: 'Returns', key: 'returnAmount' },
    { label: 'ROI (%)', key: 'returnPercentage' },
    { label: 'Status', key: 'status' },
    { label: 'Risk', key: 'risk' },
    { label: 'Investment Date', key: 'investmentDate' },
    { label: 'Maturity Date', key: 'maturityDate' }
  ];
>>>>>>> Stashed changes

  // Portfolio health calculation
  const portfolioHealth = mockPortfolioData.roi > 15 ? 'Excellent' : 
                         mockPortfolioData.roi > 10 ? 'Good' : 
                         mockPortfolioData.roi > 5 ? 'Average' : 'Needs Attention';

  // Mock recommendation based on portfolio analysis
  const recommendation = "Consider diversifying with more Web Series investments to balance your portfolio. Recent trends show higher ROI in Regional content.";

  return (
    <div
      className={`min-h-screen pt-20 pb-[100px] transition-all duration-[3000ms] max-md:h-[calc(100vh-80px)] max-md:overflow-y-auto max-md:scroll-smooth ${
        theme === 'light'
          ? 'bg-gradient-to-br from-gray-50 to-white'
          : 'bg-gradient-to-br from-black via-gray-900 to-purple-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className={`text-4xl md:text-5xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-4`}>
            Portfolio Analytics
          </h1>
          <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Detailed analysis of your investment performance and insights
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div className="flex gap-3">
            <button 
              onClick={() => setTimeframe('1m')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeframe === '1m'
                  ? `${theme === 'light' ? 'bg-purple-500 text-white' : 'bg-purple-600 text-white'}`
                  : `${theme === 'light' ? 'bg-white text-gray-700 border border-gray-300' : 'bg-gray-800 text-gray-300 border border-gray-700'}`
              }`}
            >
              1M
            </button>
            <button 
              onClick={() => setTimeframe('3m')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeframe === '3m'
                  ? `${theme === 'light' ? 'bg-purple-500 text-white' : 'bg-purple-600 text-white'}`
                  : `${theme === 'light' ? 'bg-white text-gray-700 border border-gray-300' : 'bg-gray-800 text-gray-300 border border-gray-700'}`
              }`}
            >
              3M
            </button>
            <button 
              onClick={() => setTimeframe('6m')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeframe === '6m'
                  ? `${theme === 'light' ? 'bg-purple-500 text-white' : 'bg-purple-600 text-white'}`
                  : `${theme === 'light' ? 'bg-white text-gray-700 border border-gray-300' : 'bg-gray-800 text-gray-300 border border-gray-700'}`
              }`}
            >
              6M
            </button>
            <button 
              onClick={() => setTimeframe('1y')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeframe === '1y'
                  ? `${theme === 'light' ? 'bg-purple-500 text-white' : 'bg-purple-600 text-white'}`
                  : `${theme === 'light' ? 'bg-white text-gray-700 border border-gray-300' : 'bg-gray-800 text-gray-300 border border-gray-700'}`
              }`}
            >
              1Y
            </button>
            <button 
              onClick={() => setTimeframe('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeframe === 'all'
                  ? `${theme === 'light' ? 'bg-purple-500 text-white' : 'bg-purple-600 text-white'}`
                  : `${theme === 'light' ? 'bg-white text-gray-700 border border-gray-300' : 'bg-gray-800 text-gray-300 border border-gray-700'}`
              }`}
            >
              All
            </button>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                theme === 'light'
                  ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                theme === 'light'
                  ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
              }`}
            >
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filter Options (conditionally rendered) */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mb-8 p-6 rounded-xl border ${
              theme === 'light'
                ? 'bg-white border-gray-200'
                : 'bg-gray-900/50 border-gray-700'
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Project Type
                </label>
                <select
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'light'
                      ? 'border-gray-300 focus:border-purple-500 bg-white text-gray-900'
                      : 'border-gray-600 focus:border-purple-500 bg-gray-800 text-white'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                >
                  <option>All Types</option>
                  <option>Films</option>
                  <option>Music</option>
                  <option>Web Series</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Genre
                </label>
                <select
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'light'
                      ? 'border-gray-300 focus:border-purple-500 bg-white text-gray-900'
                      : 'border-gray-600 focus:border-purple-500 bg-gray-800 text-white'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                >
                  <option>All Genres</option>
                  <option>Action</option>
                  <option>Drama</option>
                  <option>Thriller</option>
                  <option>Romance</option>
                  <option>Comedy</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Language
                </label>
                <select
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'light'
                      ? 'border-gray-300 focus:border-purple-500 bg-white text-gray-900'
                      : 'border-gray-600 focus:border-purple-500 bg-gray-800 text-white'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                >
                  <option>All Languages</option>
                  <option>Hindi</option>
                  <option>English</option>
                  <option>Tamil</option>
                  <option>Telugu</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Investment Date
                </label>
                <select
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'light'
                      ? 'border-gray-300 focus:border-purple-500 bg-white text-gray-900'
                      : 'border-gray-600 focus:border-purple-500 bg-gray-800 text-white'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                >
                  <option>All Time</option>
                  <option>This Year</option>
                  <option>Last 6 Months</option>
                  <option>Last 3 Months</option>
                  <option>Last Month</option>
                </select>
              </div>
            </div>

<<<<<<< Updated upstream
            <div className="flex justify-end mt-6">
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  theme === 'light'
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                Apply Filters
              </button>
=======
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Sort By
                </label>
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as typeof sortKey)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'light'
                      ? 'border-gray-300 focus:border-purple-500 bg-white text-gray-900'
                      : 'border-gray-600 focus:border-purple-500 bg-gray-800 text-white'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                >
                  <option value="investmentDate">Investment Date</option>
                  <option value="projectName">Project Name</option>
                  <option value="investmentAmount">Investment Amount</option>
                  <option value="currentValue">Current Value</option>
                  <option value="returnPercentage">ROI %</option>
                  <option value="status">Status</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Sort Order
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'light'
                      ? 'border-gray-300 focus:border-purple-500 bg-white text-gray-900'
                      : 'border-gray-600 focus:border-purple-500 bg-gray-800 text-white'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Quick Actions
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setFilterStatus('all');
                      setFilterProjectType('all');
                      setFilterGenre('all');
                      setFilterRegion('all');
                      setFilterRisk('all');
                    }}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      theme === 'light'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => setSortKey('returnPercentage')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      theme === 'light'
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-green-900/30 text-green-400 hover:bg-green-900/50'
                    }`}
                  >
                    Show Best Performers
                  </button>
                  <button
                    onClick={() => setFilterRisk('high')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      theme === 'light'
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                    }`}
                  >
                    High Risk Only
                  </button>
                </div>
              </div>
>>>>>>> Stashed changes
            </div>
          </motion.div>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`p-6 rounded-2xl backdrop-blur-xl border ${
              theme === 'light'
                ? 'bg-white/50 border-white/60 shadow-lg'
                : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-green-500/20">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Total Invested</p>
                  <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    ₹{mockPortfolioData.totalInvested.toLocaleString()}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-800 text-gray-300'
              }`}>
                {timeframe}
              </span>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-green-500 to-green-300 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`p-6 rounded-2xl backdrop-blur-xl border ${
              theme === 'light'
                ? 'bg-white/50 border-white/60 shadow-lg'
                : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-500/20">
                  <DollarSign className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Current Value</p>
                  <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    ₹{mockPortfolioData.totalReturns.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-500">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-xs font-medium">+{mockPortfolioData.roi}%</span>
              </div>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`p-6 rounded-2xl backdrop-blur-xl border ${
              theme === 'light'
                ? 'bg-white/50 border-white/60 shadow-lg'
                : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-500/20">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Total Profit</p>
                  <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    ₹{mockPortfolioData.totalProfit.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-500">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-xs font-medium">+{mockPortfolioData.roi}%</span>
              </div>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-purple-300 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`p-6 rounded-2xl backdrop-blur-xl border ${
              theme === 'light'
                ? 'bg-white/50 border-white/60 shadow-lg'
                : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-yellow-500/20">
                  <Calendar className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Portfolio Health</p>
                  <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {portfolioHealth}
                  </p>
                </div>
              </div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                portfolioHealth === 'Excellent' 
                  ? 'bg-green-500/20 text-green-500' 
                  : portfolioHealth === 'Good' 
                  ? 'bg-blue-500/20 text-blue-500' 
                  : portfolioHealth === 'Average' 
                  ? 'bg-yellow-500/20 text-yellow-500'
                  : 'bg-red-500/20 text-red-500'
              }`}>
                {portfolioHealth === 'Excellent' || portfolioHealth === 'Good' 
                  ? <TrendingUp className="w-5 h-5" /> 
                  : <TrendingDown className="w-5 h-5" />}
              </div>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full" />
          </motion.div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Returns Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`p-6 rounded-2xl backdrop-blur-xl border ${
              theme === 'light'
                ? 'bg-white/50 border-white/60 shadow-lg'
                : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <LineChart className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className={`font-bold text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Returns Over Time</h3>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                theme === 'light' ? 'bg-green-100 text-green-700' : 'bg-green-900/30 text-green-400'
              }`}>
                +{mockPortfolioData.roi}% YTD
              </div>
            </div>
            
            {/* Chart visualization - Simplified for this example */}
            <div className="w-full h-64 relative">
              <div className="absolute bottom-0 left-0 right-0 flex items-end h-48 justify-between">
                {mockPortfolioData.monthlyReturns.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-6 rounded-t-md bg-gradient-to-t from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 transition-all cursor-pointer"
                      style={{ 
                        height: `${(item.returns / 26000) * 100}%`,
                      }}
                    >
                      <div className="relative group">
                        <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-24 text-center p-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity ${
                          theme === 'light' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
                        }`}>
                          ₹{item.returns.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs mt-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Portfolio Allocation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`p-6 rounded-2xl backdrop-blur-xl border ${
              theme === 'light'
                ? 'bg-white/50 border-white/60 shadow-lg'
                : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <PieChart className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className={`font-bold text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Portfolio Allocation</h3>
              </div>
              <button className={`text-xs px-3 py-1 rounded-lg border ${
                theme === 'light' ? 'border-gray-300 text-gray-700 hover:bg-gray-100' : 'border-gray-700 text-gray-300 hover:bg-gray-800'
              }`}>
                By Category ▾
              </button>
            </div>
            
            {/* Pie chart visualization - Simplified for this example */}
            <div className="flex items-center">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Film - 55.6% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="20"
                    strokeDasharray={`${55.6 * 2.51} ${100 * 2.51 - 55.6 * 2.51}`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Music - 26.7% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="20"
                    strokeDasharray={`${26.7 * 2.51} ${100 * 2.51 - 26.7 * 2.51}`}
                    strokeDashoffset={`${-(55.6 * 2.51)}`}
                    transform="rotate(-90 50 50)"
                  />
                  {/* Web Series - 17.7% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="20"
                    strokeDasharray={`${17.7 * 2.51} ${100 * 2.51 - 17.7 * 2.51}`}
                    strokeDashoffset={`${-(55.6 + 26.7) * 2.51}`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Total</span>
                  <span className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    ₹{mockPortfolioData.totalInvested.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-4 pl-4">
                {mockPortfolioData.investmentsByCategory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-purple-500' : index === 1 ? 'bg-blue-500' : 'bg-green-500'
                      }`} />
                      <span className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{item.category}</span>
                    </div>
                    <div className="text-right">
                      <div className={`${theme === 'light' ? 'text-gray-900' : 'text-white'} font-medium`}>
                        ₹{item.amount.toLocaleString()}
                      </div>
                      <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        {item.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Top Performing Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`p-6 rounded-2xl backdrop-blur-xl border mb-8 ${
            theme === 'light'
              ? 'bg-white/50 border-white/60 shadow-lg'
              : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <BarChart className="w-5 h-5 text-green-500" />
              </div>
              <h3 className={`font-bold text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Top Performing Projects</h3>
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              theme === 'light' ? 'bg-green-100 text-green-700' : 'bg-green-900/30 text-green-400'
            }`}>
              {mockPortfolioData.topPerformingProjects.length} Projects
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${theme === 'light' ? 'border-b border-gray-200' : 'border-b border-gray-700'}`}>
                  <th className={`pb-3 text-left font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Project</th>
                  <th className={`pb-3 text-right font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Invested</th>
                  <th className={`pb-3 text-right font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Current Value</th>
                  <th className={`pb-3 text-right font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>ROI</th>
                  <th className={`pb-3 text-center font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Risk</th>
                  <th className={`pb-3 text-right font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockPortfolioData.topPerformingProjects.map((project, index) => (
                  <tr key={index} className={`${
                    theme === 'light' ? 'border-b border-gray-100' : 'border-b border-gray-800'
                  } ${index === mockPortfolioData.topPerformingProjects.length - 1 ? 'border-b-0' : ''}`}>
                    <td className="py-4">
                      <div className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {project.title}
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <div className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        ₹{project.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <div className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        ₹{project.returns.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1 text-green-500">
                        <ArrowUpRight className="w-4 h-4" />
                        <span className="font-medium">{project.roi}%</span>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        project.riskLevel === 'low' 
                          ? 'bg-green-100 text-green-700'
                          : project.riskLevel === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {project.riskLevel.charAt(0).toUpperCase() + project.riskLevel.slice(1)}
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <button className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        theme === 'light'
                          ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                          : 'bg-purple-900/30 text-purple-400 hover:bg-purple-900/50'
                      }`}>
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Underperforming Projects */}
        {mockPortfolioData.underperformingProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={`p-6 rounded-2xl backdrop-blur-xl border mb-8 ${
              theme === 'light'
                ? 'bg-white/50 border-white/60 shadow-lg'
                : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/20">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                </div>
                <h3 className={`font-bold text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Underperforming Projects</h3>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                theme === 'light' ? 'bg-red-100 text-red-700' : 'bg-red-900/30 text-red-400'
              }`}>
                Needs Attention
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`${theme === 'light' ? 'border-b border-gray-200' : 'border-b border-gray-700'}`}>
                    <th className={`pb-3 text-left font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Project</th>
                    <th className={`pb-3 text-right font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Invested</th>
                    <th className={`pb-3 text-right font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Current Value</th>
                    <th className={`pb-3 text-right font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>ROI</th>
                    <th className={`pb-3 text-center font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Risk</th>
                    <th className={`pb-3 text-right font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPortfolioData.underperformingProjects.map((project, index) => (
                    <tr key={index} className={`${
                      theme === 'light' ? 'border-b border-gray-100' : 'border-b border-gray-800'
                    } ${index === mockPortfolioData.underperformingProjects.length - 1 ? 'border-b-0' : ''}`}>
                      <td className="py-4">
                        <div className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          {project.title}
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <div className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                          ₹{project.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <div className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                          ₹{project.returns.toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-1 text-red-500">
                          <TrendingDown className="w-4 h-4" />
                          <span className="font-medium">{Math.abs(project.roi)}%</span>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          project.riskLevel === 'low' 
                            ? 'bg-green-100 text-green-700'
                            : project.riskLevel === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {project.riskLevel.charAt(0).toUpperCase() + project.riskLevel.slice(1)}
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <button className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                          theme === 'light'
                            ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                            : 'bg-purple-900/30 text-purple-400 hover:bg-purple-900/50'
                        }`}>
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Insights and Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`p-6 rounded-2xl backdrop-blur-xl border ${
            theme === 'light'
              ? 'bg-white/50 border-white/60 shadow-lg'
              : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
            <h3 className={`font-bold text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              AI-Powered Insights & Recommendations
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className={`font-medium mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>Next Quarter Projections</h4>
              <div className={`p-4 rounded-xl ${
                theme === 'light' ? 'bg-white/80 border border-gray-200' : 'bg-gray-800/50 border border-gray-700'
              }`}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Expected Returns</span>
                    <span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      ₹{mockPortfolioData.projectionsNextQuarter.expectedReturns.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Projected ROI</span>
                    <span className="font-medium text-green-500">
                      +{mockPortfolioData.projectionsNextQuarter.projectedROI}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Confidence Level</span>
                    <span className={`font-medium capitalize ${
                      mockPortfolioData.projectionsNextQuarter.confidenceLevel === 'high'
                        ? 'text-green-500'
                        : mockPortfolioData.projectionsNextQuarter.confidenceLevel === 'medium'
                        ? 'text-yellow-500'
                        : 'text-red-500'
                    }`}>
                      {mockPortfolioData.projectionsNextQuarter.confidenceLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className={`font-medium mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>Recommendations</h4>
              <div className={`p-4 rounded-xl ${
                theme === 'light' ? 'bg-white/80 border border-gray-200' : 'bg-gray-800/50 border border-gray-700'
              }`}>
                <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-4`}>
                  {recommendation}
                </p>
                <div className="flex justify-end">
                  <button className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                    theme === 'light'
                      ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      : 'bg-purple-900/30 text-purple-400 hover:bg-purple-900/50'
                  }`}>
                    <Zap className="w-4 h-4" />
                    <span>Get Personalized Advice</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioAnalytics;