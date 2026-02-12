import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Trophy, Code2, Zap, Smartphone, Monitor, Image as ImageIcon } from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  // Default to portrait if videoSrc exists, otherwise landscape
  const [viewMode, setViewMode] = useState('portrait');
  const [hasVideoError, setHasVideoError] = useState({ portrait: false, landscape: false });
  
  useEffect(() => {
    // Reset errors when project changes
    setHasVideoError({ portrait: false, landscape: false });
    
    // If project has no videoSrc, default to landscape view
    if (project && !project.videoSrc) {
      setViewMode('landscape');
    } else {
      setViewMode('portrait');
    }
  }, [project]);

  if (!project) return null;

  const shouldShowPortrait = project.videoSrc;
  const hasLandscapeSupport = project.videoLandscapeSrc || project.supportsLandscape || !project.videoSrc;

  const handleVideoError = (type) => {
    setHasVideoError(prev => ({ ...prev, [type]: true }));
  };

  const renderPortraitContent = () => {
    if (project.videoSrc && !hasVideoError.portrait) {
      return (
        <video 
          src={project.videoSrc} 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover"
          onError={() => handleVideoError('portrait')}
        />
      );
    }
    
    if (project.imagePlaceHolder) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={project.imagePlaceHolder} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Smartphone className="w-16 h-16 md:w-20 md:h-20 text-white/20 mb-4" />
        <span className="text-white/40 text-sm">Project Preview</span>
      </div>
    );
  };

  const renderLandscapeContent = () => {
    if (project.videoLandscapeSrc && !hasVideoError.landscape) {
      return (
        <video 
          src={project.videoLandscapeSrc} 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover"
          onError={() => handleVideoError('landscape')}
        />
      );
    }
    
    if (project.imagePlaceHolder) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={project.imagePlaceHolder} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    
    if (project.videoSrc && !hasVideoError.portrait) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <video 
            src={project.videoSrc} 
            autoPlay 
            loop 
            muted 
            className="h-full object-cover"
          />
        </div>
      );
    }
    
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Monitor className="w-16 h-16 md:w-20 md:h-20 text-white/20 mb-4" />
        <span className="text-white/40 text-sm">Landscape View</span>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0  backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 w-full max-w-6xl max-h-[95vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row relative"
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-3 bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black rounded-full transition-colors backdrop-blur-md shadow-lg"
              >
                <X className="w-6 h-6 text-gray-800 dark:text-white" />
              </button>

              {/* Left Side: Media - Centered container */}
              <div className={`lg:w-[60%] relative ${project.videoPlaceholderColor || 'bg-gradient-to-br from-blue-500 to-purple-600'} min-h-[400px] lg:min-h-full p-6 lg:p-10 flex items-center justify-center`}>
                {/* View Mode Toggle (only show if both modes are available) */}
                {hasLandscapeSupport && project.videoSrc && (
                  <div className="absolute top-6 left-6 z-20 flex gap-2 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-full p-1.5">
                    <button
                      onClick={() => setViewMode('portrait')}
                      className={`p-2.5 rounded-full transition-all ${viewMode === 'portrait' ? 'bg-white dark:bg-black text-blue-600 dark:text-blue-400 shadow-md' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                      title="Portrait View"
                    >
                      <Smartphone className="w-5 h-5 lg:w-6 lg:h-6" />
                    </button>
                    <button
                      onClick={() => setViewMode('landscape')}
                      className={`p-2.5 rounded-full transition-all ${viewMode === 'landscape' ? 'bg-white dark:bg-black text-blue-600 dark:text-blue-400 shadow-md' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                      title="Landscape View"
                    >
                      <Monitor className="w-5 h-5 lg:w-6 lg:h-6" />
                    </button>
                  </div>
                )}

                {/* Decorative Circle */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-80 lg:h-80 opacity-40 blur-3xl rounded-full`}
                      style={{ backgroundColor: project.color || '#3B82F6' }}>
                </div>
                
                {/* Single Container that changes based on viewMode */}
                <div className="relative z-10 w-full flex items-center justify-center">
                  {/* Portrait View */}
                  <div className={`transition-all duration-300 ${
                    viewMode === 'portrait' 
                      ? 'opacity-100 scale-100 visible' 
                      : 'opacity-0 scale-95 invisible absolute'
                  }`}>
                    <div className="max-w-[280px] lg:max-w-[300px] aspect-[9/16] bg-gray-900 rounded-[2rem] lg:rounded-[3rem] border-8 lg:border-10 border-gray-800 shadow-2xl overflow-hidden">
                      {/* Phone screen with camera notch */}
                      <div className="relative w-full h-6 bg-black rounded-t-[1.5rem] lg:rounded-t-[2.5rem] flex items-center justify-center">
                        <div className="w-24 h-3 bg-black rounded-b-xl"></div>
                      </div>
                      <div className="w-full h-[calc(100%-1.5rem)] bg-gray-800">
                        {renderPortraitContent()}
                      </div>
                    </div>
                  </div>

                  {/* Landscape View */}
                  <div className={`transition-all duration-300 ${
                    viewMode === 'landscape' 
                      ? 'opacity-100 scale-100 visible' 
                      : 'opacity-0 scale-95 invisible absolute'
                  }`}>
                    <div className="max-w-[500px] lg:max-w-[600px] aspect-video bg-gray-900 rounded-2xl lg:rounded-3xl border-8 lg:border-10 border-gray-800 shadow-2xl overflow-hidden">
                      {/* Monitor/laptop screen */}
                      <div className="relative w-full h-6 bg-gray-700 rounded-t-xl lg:rounded-t-2xl flex items-center justify-center">
                        <div className="w-32 h-2 bg-gray-600 rounded-full"></div>
                      </div>
                      <div className="w-full h-[calc(100%-1.5rem)] bg-gray-800">
                        {renderLandscapeContent()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Mode Indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm py-2 px-4 rounded-full backdrop-blur-sm shadow-md">
                  {viewMode === 'portrait' ? 'Portrait View' : 'Landscape View'}
                </div>

                {/* Video Error Indicator */}
                {(hasVideoError.portrait || hasVideoError.landscape) && (
                  <div className="absolute top-6 right-6 bg-red-500/30 text-red-200 text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                    Video error - showing fallback
                  </div>
                )}
              </div>

              {/* Right Side: Content */}
              <div className="lg:w-[40%] p-6 lg:p-10 overflow-y-auto custom-scrollbar bg-white dark:bg-gray-800">
                <div className="mb-4">
                  <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gray-900 mb-6`}
                        style={{ backgroundColor: project.color || '#3B82F6' }}>
                    Featured Project
                  </span>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">{project.title || "Project Title"}</h2>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {project.description || "Project description"}
                </p>

                {project.details && (
                    <div className="mb-8 p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10">
                        <p className="text-gray-700 dark:text-gray-300 text-base lg:text-lg leading-relaxed">{project.details}</p>
                    </div>
                )}

                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-3">
                        <Trophy className="w-6 h-6 text-yellow-500" /> Key Achievements
                    </h3>
                    <ul className="space-y-4">
                        {project.achievements && project.achievements.length > 0 ? (
                          project.achievements.map((item, i) => (
                            <li key={i} className="flex items-start gap-4 text-gray-600 dark:text-gray-400 text-base lg:text-lg">
                                <span className="w-2 h-2 rounded-full bg-gray-400 mt-3 flex-shrink-0"></span>
                                <span>{item}</span>
                            </li>
                          ))
                        ) : (
                            <li className="text-gray-400 italic">No specific achievements listed.</li>
                        )}
                    </ul>
                </div>

                <div className="mb-10">
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-3">
                        <Code2 className="w-6 h-6 text-green-400" /> Tech Stack
                    </h3>
                   <div className="flex flex-wrap gap-3">
                      {project.tags && project.tags.map ? 
                        project.tags.map((tag, i) => (
                          <span key={i} className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-base font-medium shadow-sm">
                            {tag}
                          </span>
                        ))
                        :
                        <span className="text-gray-400 italic">No tech stack specified.</span>
                      }
                   </div>
                </div>

                {/* <div className="flex gap-4 flex-col lg:flex-row">
                  <button className="flex-1 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-opacity text-lg shadow-lg hover:shadow-xl">
                    <ExternalLink size={20} /> Live Demo
                  </button>
                  <button className="flex-1 py-4 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-lg">
                    <Github size={20} /> Source Code
                  </button>
                </div> */}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;