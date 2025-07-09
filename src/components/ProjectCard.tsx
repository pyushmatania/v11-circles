import React, { useState } from 'react';
<<<<<<< Updated upstream
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { motion } from 'framer-motion';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { AnimatePresence } from 'framer-motion';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Film, Music, Tv, Star, Clock, Play, Plus, Bookmark, Heart, TrendingUp, ArrowRight } from 'lucide-react';
=======
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Music, Tv, Star, Clock, Play, TrendingUp, Calendar } from 'lucide-react';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import PixelCard from './PixelCard';
import { Project } from '../types';
import ProjectDetailPage from './ProjectDetailPage';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // urgent?: boolean;
  compact?: boolean;
  layout?: 'netflix' | 'grid' | 'list';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  featured, 
  compact
}) => {
<<<<<<< Updated upstream
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardWidth = featured ? 'w-96' : compact ? 'w-48' : 'w-72';
  // Fixed: Use consistent aspect ratio for all cards
  const aspectRatio = 'aspect-[2/3]';
=======
  const [isHovered, setIsHovered] = useState(false);
  const [showDetailPage, setShowDetailPage] = useState(false);

  const cardWidth = featured ? 'w-96' : compact ? 'w-48' : 'w-72';
  const aspectRatio = featured ? 'aspect-[16/10]' : 'aspect-[2/3]';

  const handleClick = () => {
    setShowDetailPage(true);
    if (onClick) {
      onClick();
    }
  };

  const handleInvestClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onInvestClick) {
      onInvestClick(project);
    }
  };
>>>>>>> Stashed changes

  const handleCloseDetailPage = () => {
    setShowDetailPage(false);
  };

  const handleCloseDetailPage = () => {
    setShowDetailPage(false);
  };

  const handleCloseDetailPage = () => {
    setShowDetailPage(false);
  };

  return (
    <PixelCard
      variant="pink"
      className={`relative flex-shrink-0 ${cardWidth} snap-start`}
    >
      {/* <motion.div
        className="absolute inset-0 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: compact ? 1.02 : 1.05 }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
      > */}
      <div className={`relative ${aspectRatio} rounded-xl overflow-hidden bg-gray-800 shadow-2xl`}>
        {/* Blurred placeholder (shows until imageLoaded) */}
        <img
          src={project.poster}
          alt={project.title}
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 blur-lg scale-105 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
          loading="lazy"
          style={{ filter: 'blur(20px)', pointerEvents: 'none' }}
        />
        {/* Main Poster Image */}
        <img 
          src={project.poster} 
          alt={project.title}
          className={`w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60" />
        
        {/* Premium Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
<<<<<<< Updated upstream
      {/* </motion.div> */}
=======
          
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
              {!featured && project.type.toUpperCase()}
            </div>
            
            {featured && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold shadow-lg">
                <TrendingUp className="w-3 h-3" />
                TRENDING
              </div>
            )}
            
            {urgent && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold shadow-lg animate-pulse">
                <Clock className="w-3 h-3" />
                ENDING SOON
              </div>
            )}
          </div>

          {/* Top Right - Rating and Funding */}
          <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
            {/* Funding Percentage - Subtle */}
            <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full border border-green-400/20">
              <span className="text-green-300 font-medium text-xs">
                {typeof project.fundedPercentage === 'number' && project.fundedPercentage > 0
                  ? `${project.fundedPercentage}%`
                  : '0%'} funded
              </span>
            </div>
            
            {/* Rating */}
            {project.rating && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold border border-yellow-400/30">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                {project.rating}
              </div>
            )}
          </div>

          {/* Bottom Content - Always Visible */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20" style={{ bottom: '12px' }}>
            <div className="space-y-3">
              {/* Title and Basic Info */}
              <div>
                <h3 className={`text-white font-bold leading-tight ${
                  featured ? 'text-xl' : 'text-lg'
                }`}>
                  {project.title}
                </h3>
                {!featured && (
                  <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                    {project.description}
                  </p>
                )}
              </div>

              {/* Created Date */}
              {project.createdAt && (
                <div className="flex items-center gap-1 text-orange-400 font-medium text-xs bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full w-fit">
                  <Calendar className="w-3 h-3" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          {/* Hover Content - Enhanced with Better Readability */}
          <AnimatePresence>
            {isHovered && !featured && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/60 flex flex-col justify-end p-4 z-30 backdrop-blur-sm"
              >
                {/* Funding Details Panel */}
                <div className="mb-4 p-4 rounded-xl border border-green-400/10 bg-black/60 backdrop-blur-md shadow-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-green-300 font-semibold text-sm">{typeof project.fundedPercentage === 'number' && project.fundedPercentage > 0 ? `${project.fundedPercentage}%` : '0%'} funded</span>
                    <span className="text-xs text-gray-300">Target: <span className="font-bold text-blue-300">₹{(project.targetAmount / 100000).toFixed(1)}L</span></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">Raised: <span className="font-bold text-green-300">₹{(project.raisedAmount / 100000).toFixed(1)}L</span></span>
                    {project.createdAt && (
                      <span className="text-xs text-orange-300">Created {new Date(project.createdAt).toLocaleDateString()}</span>
                    )}
                  </div>
                  <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden mt-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${project.fundedPercentage}%` }}
                      transition={{ duration: 0.7, delay: 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-blue-400 shadow"
                    />
                  </div>
                </div>
                {/* Enhanced Title and Info */}
                <div className="space-y-4">
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
                  {onInvestClick && (
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={handleInvestClick}
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-white text-black rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors shadow-lg"
                        aria-label={`Invest in ${project.title}`}
                      >
                        <Play className="w-4 h-4 fill-current" />
                        Invest Now
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      {showDetailPage && (
        <ProjectDetailPage 
          project={project} 
          onClose={handleCloseDetailPage}
          onInvest={onInvestClick}
        />
      )}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    </PixelCard>
  );
};

export default ProjectCard;