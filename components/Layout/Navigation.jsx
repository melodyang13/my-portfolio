import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Smile, User, Linkedin, Github, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../src/ThemeContext';

const NavItem = ({ icon: Icon, label, href }) => {
  const [isHovered, setIsHovered] = useState(false);
  

  return (
    <a 
      href={href}
      className="relative p-2 md:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap z-50 pointer-events-none hidden md:block"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
};

const Navigation = () => {
  // Add debugging
  useEffect(() => {
    console.log('Navigation: Checking theme system...');
    console.log('HTML class:', document.documentElement.className);
    console.log('LocalStorage theme:', localStorage.getItem('theme'));
  }, []);

  const { theme, toggleTheme } = useTheme();

  // Add more debugging
  console.log('Navigation: Current theme is', theme);
  
  const handleToggle = () => {
    console.log('Toggling theme from', theme, 'to', theme === 'light' ? 'dark' : 'light');
    toggleTheme();
    
    // Check after toggle
    setTimeout(() => {
      console.log('After toggle - HTML class:', document.documentElement.className);
      console.log('After toggle - LocalStorage:', localStorage.getItem('theme'));
    }, 100);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
    >
      {/* Approach 1: Hide scrollbar with custom CSS */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-lg px-3 py-2 md:px-4 md:py-2 rounded-full flex items-center gap-0 md:gap-1 pointer-events-auto max-w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
        <NavItem icon={PenTool} label="Projects" href="#projects" />
        <NavItem icon={User} label="About" href="#experience" />
        <NavItem icon={Smile} label="Contact" href="#about" />
        <div className="w-px h-5 md:h-6 bg-gray-200 dark:bg-gray-600 mx-1 md:mx-2 flex-shrink-0"></div>
        <NavItem icon={Linkedin} label="LinkedIn" href="https://www.linkedin.com/in/melody-ang-3b4407327/" />
        <NavItem icon={Github} label="GitHub" href="https://github.com/melodyang13/" />
        
        <button 
          onClick={handleToggle} // Use the debug handler
          className="p-2 md:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-1 flex-shrink-0"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />
          ) : (
            <Sun className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />
          )}
        </button>
      </div>
    </motion.header>
  );
};

export default Navigation;