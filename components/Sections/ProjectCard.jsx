import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ExternalLink, Github, Zap, Eye } from 'lucide-react';

const ProjectCard = ({ 
  index, 
  title, 
  description, 
  tags, 
  color, 
  videoPlaceholderColor, 
  imagePlaceholder,
  onOpenModal 
}) => {
  const ref = useRef(null);
  const [hasImageError, setHasImageError] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });

  console.log('ProjectCard rendering:', {
    title,
    imagePlaceholder,
    hasImageError,
    videoPlaceholderColor
  });

  const handleImageError = () => {
    console.log('Image error triggered for:', title);
    console.log('Image URL that failed:', imagePlaceholder);
    setHasImageError(true);
  };

  // Refined Spring Physics for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const xPos = (e.clientX - left) / width - 0.5;
    const yPos = (e.clientY - top) / height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);

  // Entrance animations
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const renderContent = () => {
    console.log('renderContent called for:', title, {
      hasImagePlaceholder: !!imagePlaceholder,
      hasImageError,
      shouldShowImage: imagePlaceholder && !hasImageError
    });

    // Show image placeholder if available and no error
    if (imagePlaceholder && !hasImageError) {
      console.log('Attempting to render image for:', title, 'URL:', imagePlaceholder);
      return (
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={imagePlaceholder} 
            alt={title}
            className="w-full h-full object-cover"
            onError={handleImageError}
            onLoad={() => console.log('Image loaded successfully:', title, imagePlaceholder)}
          />
        </div>
      );
    }
    

    
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
          <Zap className="w-8 h-8 md:w-10 md:h-10 text-white/50" />
        </div>
        <span className="text-white/60 text-sm md:text-base text-center">
          {imagePlaceholder && hasImageError ? 'Image failed to load' : 'Project Preview'}
        </span>
        {imagePlaceholder && hasImageError && (
          <div className="mt-2 text-white/40 text-xs">
            URL: {imagePlaceholder.substring(0, 50)}...
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div 
      ref={ref}
      style={{ scale, opacity, zIndex: index + 1 }}
      className="min-h-[85vh] md:min-h-screen flex items-center justify-center py-12 md:py-20 sticky top-0 overflow-hidden bg-[#FAFAFA] dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        
        {/* Interactive Mockup - Left Column */}
        <div className="order-1 md:order-1 flex justify-center perspective-1000 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            onClick={onOpenModal}
            className="relative w-full max-w-[260px] md:max-w-[300px] h-[400px] md:h-[600px] bg-gray-900 rounded-[2rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl border-4 border-gray-800 cursor-pointer active:cursor-grabbing group hover:scale-[1.02] transition-transform duration-300"
          >

            {/* Phone Frame Details - Always show phone frame for consistency */}
            <>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 md:w-32 h-4 md:h-6 bg-black rounded-b-2xl z-20"></div>
              <div className="absolute -right-[2px] top-24 w-[2px] h-12 bg-gray-700 rounded-r-md"></div>
              <div className="absolute -left-[2px] top-24 w-[2px] h-8 bg-gray-700 rounded-l-md"></div>
              <div className="absolute -left-[2px] top-36 w-[2px] h-12 bg-gray-700 rounded-l-md"></div>
            </>

            {/* Screen Content */}
            <div 
              className={`w-full h-full ${videoPlaceholderColor || 'bg-gradient-to-br from-blue-500 to-purple-600'} rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden relative`}
            >
              {renderContent()}
            </div>

            {/* Click Indicator */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full">
                Click for details
              </div>
            </div>

            {/* Image Error Indicator */}
           

           

            {/* Floating Stamps on Hover (Desktop only) */}
            <motion.div 
              className="absolute -top-10 -right-12 z-30 pointer-events-none hidden md:block"
              initial={{ scale: 0, rotate: 0 }}
              whileHover={{ scale: 1, rotate: 15 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className={`px-4 py-2 rounded-lg shadow-lg border-2 border-white transform rotate-12 text-sm font-bold text-gray-800`}
                style={{ backgroundColor: color }}>
                Pixel Perfect
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-5 -left-10 z-30 pointer-events-none hidden md:block"
              initial={{ scale: 0, rotate: 0 }}
              whileHover={{ scale: 1, rotate: -15 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            >
              <div className="bg-white px-4 py-2 rounded-lg shadow-lg border-2 border-gray-100 transform -rotate-6 text-sm font-bold text-gray-800">
                User Approved
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Text Content - Right Column */}
        <div className="order-2 md:order-2 relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.4 }}
            className="w-full max-w-lg"
          >
            <div className="flex items-baseline justify-center md:justify-start gap-4 mb-4 md:mb-6">
              <span className="text-5xl md:text-8xl font-bold text-gray-200 dark:text-gray-800 font-sans tracking-tighter select-none transition-colors">
                0{index + 1}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white transition-colors">{title}</h2>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 leading-relaxed transition-colors">
              {description}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8 md:mb-10">
              {tags.map((tag, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1), type: "spring" }}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 shadow-sm transition-colors"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <div className="flex gap-4 justify-center md:justify-start">
              <MagneticButton>
                <button 
                  onClick={onOpenModal}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium transition-transform active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <Eye size={18} /> View Details
                </button>
              </MagneticButton>
              {/* <MagneticButton>
                <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors active:scale-95">
                  <Github size={18} /> Code
                </button>
              </MagneticButton> */}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const MagneticButton = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return { height: 0, width: 0, left: 0, top: 0 };
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default ProjectCard;