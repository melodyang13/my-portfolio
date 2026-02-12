import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLinkedin, FiGithub, FiCode, FiCoffee, FiCamera, FiGlobe, FiTrendingUp, FiX, FiChevronLeft, FiChevronRight, FiAward, FiExternalLink } from "react-icons/fi";
import { FaReact, FaFigma, FaGamepad, FaNodeJs, FaPython, FaDatabase, FaAws, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { SiTailwindcss, SiFramer, SiNextdotjs, SiMongodb, SiPostgresql, SiFirebase, SiDocker, SiKubernetes, SiGraphql, SiTypescript, SiJavascript, SiRedux, SiNodedotjs, SiVercel, SiCoursera, SiUdemy, SiFreecodecamp, SiDatacamp, } from "react-icons/si";
import { BsChatLeftQuoteFill, BsLightbulb, BsMusicNoteBeamed, BsClock, BsTools, BsPatchCheckFill } from "react-icons/bs";
import { TbBrandVscode, TbCertificate } from "react-icons/tb";

import cook from "../../src/assets/girl-cook.png";
import series from "../../src/assets/series.png";
import travel from "../../src/assets/cat-luggage.png";
import photography from "../../src/assets/girl-picture.png";
import aboutme from "../../src/assets/girl-laptop.png";
import gal1 from "../../src/assets/gal1.JPG";
import gal2 from "../../src/assets/gal2.JPG";
import gal3 from "../../src/assets/gal3.JPG";
import gal4 from "../../src/assets/gal4.JPG";

export default function About() {
  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  
  const galleryImages = [
    { id: 1, src: gal1, alt: "Gallery image 1" },
    { id: 2, src: gal2, alt: "Gallery image 2" },
    { id: 3, src: gal3, alt: "Gallery image 3" },
    { id: 4, src: gal4, alt: "Gallery image 4" },
  ];

  // Certification data
  const certifications = [
    {
      id: 1,
      name: "Web Development BootCamp",
      issuer: "Udemy",
      date: "2022",
      icon: <SiUdemy />,
      color: "from-blue-500 to-cyan-400",
      link: "https://www.udemy.com/certificate/UC-cf3e87af-83ce-459d-84bb-e85c73a86394/"
    },
    {
      id: 2,
       name: "Google AI Essentials",
      issuer: "Google",
      date: "2026",
      icon: <FaGoogle />,
      color: "from-green-500 to-emerald-400",
      link: "https://www.coursera.org/account/accomplishments/specialization/FOKRC937H4DQ"
    },
 

  ];


  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="about" className="w-full py-16 px-4 md:px-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <BsLightbulb className="text-blue-600 dark:text-blue-400 text-sm" />
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Get to know me</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
            About Me
          </h1>
        </motion.div>

        {/* Compact Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          
          {/* Profile & Contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Image with social buttons underneath */}
              <div className="flex flex-col items-center">
                <motion.img
                  src={aboutme}
                  alt="Melody"
                  className="w-32 h-32 rounded-xl object-cover border-4 border-white dark:border-gray-700 shadow-md mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring" }}
                />
                
                {/* GitHub buttons moved here under the image */}
                <div className="flex gap-3 mb-4">
                  <motion.a 
                    href="#" 
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiGithub className="text-gray-700 dark:text-gray-300 text-lg" />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiLinkedin className="text-gray-700 dark:text-gray-300 text-lg" />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiMail className="text-gray-700 dark:text-gray-300 text-lg" />
                  </motion.a>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Melody Ang</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">React Developer & AI Product Engineer</p>
                <p className="text-gray-600 dark:text-gray-300 text-m mb-6">
                  I bridge the gap between LLMs and the end-user by combining 'vibe coding' with Chain-of-Thought frameworks. Whether I'm prototyping in Google AI Studio or analyzing data in Python, I'm dedicated to building intelligent and reliable web apps.
                </p>

                {/* Currently Learning Section - Under About part */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                      <BsClock className="text-blue-600 dark:text-blue-400 text-lg" />
                    </div>
                    <h4 className="text-lg font-bold dark:text-white">Currently Learning</h4>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">Focus:</span>
                    <span className="text-gray-700 dark:text-gray-200 font-medium text-sm">
                      LLM Orchestration and RAG (Retrieval-Augmented Generation)
                    </span>
                  </div>
                  <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">
                    Exploring advanced AI techniques to build more intelligent and context-aware applications.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack - Expanded */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                <BsTools className="text-blue-600 dark:text-blue-400 text-lg" />
              </div>
              <h3 className="text-lg font-bold dark:text-white">Tech Stack</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              <TechBubble icon={<FaReact />} label="React" bubble="⚛️ My go-to!" />
              <TechBubble icon={<SiTailwindcss />} label="Tailwind" bubble="🎨 Utility first!" />
              <TechBubble icon={<SiFramer />} label="Framer" bubble="✨ Animations!" />
              <TechBubble icon={<FaNodeJs />} label="Node.js" bubble="🌐 Backend!" />
              <TechBubble icon={<SiRedux />} label="Redux" bubble="🔄 State mgmt!" />
              <TechBubble icon={<FaPython />} label="Python" bubble="🐍 AI/ML!" />
              <TechBubble icon={<SiMongodb />} label="MongoDB" bubble="🍃 NoSQL!" />
              <TechBubble icon={<SiPostgresql />} label="PostgreSQL" bubble="🐘 SQL DB!" />
              <TechBubble icon={<SiDocker />} label="Docker" bubble="🐳 Containers!" />
              <TechBubble icon={<TbBrandVscode />} label="VS Code" bubble="💻 Editor!" />
              <TechBubble icon={<FaGoogle />} label="AI Studio" bubble="🤖 AI!" />
              <TechBubble icon={<SiVercel/>} label="Vercel" bubble="Deployment"/>
            </div>
            
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <FiTrendingUp className="text-blue-600 dark:text-blue-400 text-sm" />
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Always Learning...</span>
            </div>
          </motion.div>

          {/* Hobbies Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold mb-4 dark:text-white">Beyond Code</h3>
             <div className="mt-4 text-gray-600 dark:text-gray-300 text-sm mb-4" >
              <p>When I'm not coding, I enjoy exploring new recipes, traveling to different places, and capturing moments through photography.</p>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <ImageBubble img={cook} text="👩‍🍳 Cooking" />
              <ImageBubble img={series} text="💻 Watch Series" />
              <ImageBubble img={travel} text="✈️ Travel" />
              <ImageBubble img={photography} text="📷 Photography" />
            </div>
           
          </motion.div>

          {/* Photo Gallery - Fixed with specific sizes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold mb-4 dark:text-white flex items-center gap-2">
              <FiCamera className="text-amber-600 dark:text-amber-400" />
              My Photos
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((image, index) => (
                <GalleryImage 
                  key={image.id}
                  src={image.src}
                  alt={image.alt}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>


         {/* Certifications Section - Full Width at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-6 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-xl">
              <TbCertificate className="text-amber-600 dark:text-amber-400 text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
                Certifications & Achievements
                <span className="text-xs font-normal text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded-full">
                  {certifications.length} earned
                </span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Professional certifications and specialized training
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <CertificationCard key={cert.id} cert={cert} index={index} />
            ))}
          </div>
{/*           
          <div className="mt-6 flex justify-center">
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiExternalLink /> View All Credentials
            </motion.a>
          </div> */}
        </motion.div>
      </div>


      

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <GalleryModal
            images={galleryImages}
            currentIndex={selectedImageIndex}
            onClose={handleCloseModal}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// Gallery Image Component - Fixed size
function GalleryImage({ src, alt, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative group cursor-pointer overflow-hidden rounded-lg"
      onClick={onClick}
    >
      <div className="aspect-square w-full">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-white text-sm font-medium bg-black/60 px-3 py-1.5 rounded-full">
          View
        </span>
      </div>
    </motion.div>
  );
}

// Gallery Modal Component
function GalleryModal({ images, currentIndex, onClose, onPrevious, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
    >
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
      >
        <FiX className="w-6 h-6 text-white" />
      </button>

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl flex flex-col items-center"
      >
        {/* Current image */}
        <div className="relative w-full flex items-center justify-center">
          {/* Navigation buttons */}
          <button
            onClick={onPrevious}
            className="absolute left-0 md:-left-16 z-40 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md text-white"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          <div className="w-full max-w-3xl aspect-video bg-black/50 rounded-xl overflow-hidden">
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-full object-contain"
            />
          </div>

          <button
            onClick={onNext}
            className="absolute right-0 md:-right-16 z-40 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md text-white"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Image counter */}
        <div className="mt-6 text-white/80 text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Thumbnail navigation */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 max-w-full">
          {images.map((image, index) => (
            <motion.button
              key={image.id}
              onClick={() => onPrevious()} // This needs to be handled properly
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex 
                  ? 'border-white scale-110' 
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function TechBubble({ icon, label, bubble }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring" }}
    >
      <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm cursor-pointer">
        <div className="text-xl text-blue-500 dark:text-blue-400 mb-1">{icon}</div>
        <span className="text-xs font-medium dark:text-gray-200">{label}</span>
      </div>
      
      {/* Message Bubble */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap z-50"
          >
            {bubble}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ImageBubble({ img, text }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring" }}
    >
      <img
        src={img}
        alt={text}
        className="w-full rounded-lg"
      />
      
      {/* Message Bubble */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs px-2 py-1 rounded-lg shadow-lg whitespace-nowrap z-50 border border-gray-200 dark:border-gray-700"
          >
            {text}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Certification Card Component
function CertificationCard({ cert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white dark:bg-gray-800/50 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-4">
        {/* Icon with gradient background */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} p-0.5 flex-shrink-0`}>
          <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[10px] flex items-center justify-center">
            <div className="text-2xl text-gray-700 dark:text-gray-200">
              {cert.icon}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-base mb-1 pr-6">
                {cert.name}
              </h4>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">{cert.issuer}</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="text-gray-500 dark:text-gray-500">{cert.date}</span>
              </div>
            </div>
            
            {/* Verified badge */}
            <div className="flex-shrink-0">
              <BsPatchCheckFill className="text-blue-500 text-lg" />
            </div>
          </div>
          
          {/* Link to view credential */}
          <motion.a
            href={cert.link}
            className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group-hover:gap-2"
            whileHover={{ x: 2 }}
          >
            View Credential <FiExternalLink className="text-xs" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
