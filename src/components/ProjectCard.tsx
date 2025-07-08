import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { AnimatePresence } from 'framer-motion';
// import { Film, Music, Tv, Star, Clock, Play, Plus, Bookmark, Heart, TrendingUp, ArrowRight } from 'lucide-react';
import PixelCard from './PixelCard';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  compact?: boolean;
  layout?: 'netflix' | 'grid' | 'list';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  featured, 
  compact
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardWidth = featured ? 'w-96' : compact ? 'w-48' : 'w-72';
  // Fixed: Use consistent aspect ratio for all cards
  const aspectRatio = 'aspect-[2/3]';

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
      {/* </motion.div> */}
    </PixelCard>
  );
};

export default ProjectCard;