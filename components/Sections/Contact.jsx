import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Send, Mail, CheckCircle, User, MessageSquare, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  // ============ AUDIO PLAYER STATE ============
  const [isPlaying, setIsPlaying] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef(null);
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform([x, y], ([latestX, latestY]) => {
    return latestX * 0.1 + latestY * 0.1;
  });

  // ============ CONTACT FORM STATE ============
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // ============ EMAILJS CONFIG ============
  const EMAILJS_SERVICE_ID = 'service_jc3eyia';
  const EMAILJS_TEMPLATE_ID = 'template_izkovye';
  const EMAILJS_PUBLIC_KEY = '4tQiAuI2LKhHZ3KDf';

  // ============ AUDIO INITIALIZATION ============
  useEffect(() => {
    audioRef.current = new Audio();
    
    const audioPaths = ["../../src/assets/music/music.mp3"];
    
    const tryLoadAudio = async (pathIndex = 0) => {
      if (pathIndex >= audioPaths.length) {
        audioRef.current.src = 'https://www.youtube.com/watch?v=rlnOo6jXioU&list=RDrlnOo6jXioU&start_radio=1';
      } else {
        audioRef.current.src = audioPaths[pathIndex];
      }
      
      audioRef.current.load();
      
      audioRef.current.oncanplaythrough = () => {
        console.log("Audio loaded successfully");
        setAudioLoaded(true);
        
        if (audioRef.current) {
          audioRef.current.play().catch(e => {
            console.log("Auto-play blocked:", e);
            setIsPlaying(false);
          });
        }
      };
      
      audioRef.current.onerror = () => {
        console.log(`Failed to load audio, trying next path...`);
        tryLoadAudio(pathIndex + 1);
      };
    };
    
    tryLoadAudio();
    
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // ============ ROTATION & PLAYBACK ============
  useEffect(() => {
    let interval;
    
    if (isPlaying && audioLoaded) {
      interval = setInterval(() => {
        setRotation(prev => (prev + 1) % 360);
      }, 50);
      
      if (audioRef.current) {
        audioRef.current.play().catch(e => {
          console.error("Error playing audio:", e);
          setIsPlaying(false);
        });
      }
    } else {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, audioLoaded]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // ============ CONTACT FORM HANDLERS ============
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (submitStatus.message) {
      setSubmitStatus({ type: '', message: '' });
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) errors.name = 'Required';
    else if (formData.name.length < 2) errors.name = 'Too short';
    
    if (!formData.email.trim()) errors.email = 'Required';
    else if (!emailRegex.test(formData.email)) errors.email = 'Invalid';
    
    if (!formData.message.trim()) errors.message = 'Required';
    else if (formData.message.length < 10) errors.message = 'Min 10 chars';

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      e.target.classList.add('shake');
      setTimeout(() => e.target.classList.remove('shake'), 500);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_name: 'Melody',
        message: formData.message,
        reply_to: formData.email,
        date: new Date().toLocaleString()
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (result.status === 200) {
        setFormData({ name: '', email: '', message: '' });
        setFormErrors({});
        setIsSubmitted(true);
        setSubmitStatus({
          type: 'success',
          message: 'Message sent!'
        });
        
        setTimeout(() => {
          setIsSubmitted(false);
          setSubmitStatus({ type: '', message: '' });
        }, 4000);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send. Try again.'
      });
      setFormErrors({ submit: 'Failed to send.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setFormErrors({});
    setIsSubmitted(false);
    setSubmitStatus({ type: '', message: '' });
  };

  return (
    <footer className="relative bg-gray-50 dark:bg-gray-900 py-12 md:py-16 px-4 overflow-hidden transition-colors duration-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
        
        {/* Floating notes animation when playing */}
        {isPlaying && audioLoaded && (
          <>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: -100, opacity: 0.5 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 text-2xl text-gray-400 dark:text-gray-600"
            >
              ♫
            </motion.div>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: -100, opacity: 0.5 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
              className="absolute top-1/3 right-1/4 text-2xl text-gray-400 dark:text-gray-600"
            >
              ♪
            </motion.div>
          </>
        )}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-block mb-3"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">🎵</span>
            </div>
          </motion.div>
          
          <p className="text-xl md:text-2xl font-bold mb-1 dark:text-white">
            Let's connect with good vibes
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {audioLoaded 
              ? (isPlaying ? "🎶 Music is playing" : "⏸️ Music paused") 
              : "⏳ Loading audio..."}
          </p>
        </motion.div>

        {/* Main Content - 2 Column Layout */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-start">
          
          {/* ============ LEFT COLUMN - VINYL PLAYER ============ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
          >
            <div ref={constraintsRef} className="relative h-64 md:h-72 flex flex-col items-center justify-center">
              {/* Vinyl Record */}
              <motion.div
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                style={{ x, y, rotate }}
                className="relative cursor-grab active:cursor-grabbing"
                whileTap={{ scale: 0.95 }}
              >
                <div 
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 border-8 border-gray-700 dark:border-gray-600 flex items-center justify-center relative overflow-hidden shadow-2xl"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {/* Record grooves */}
                  <div className="absolute inset-6 rounded-full border-2 border-gray-600/30"></div>
                  <div className="absolute inset-10 rounded-full border-2 border-gray-600/30"></div>
                  <div className="absolute inset-14 rounded-full border-2 border-gray-600/30"></div>
                  <div className="absolute inset-18 rounded-full border-2 border-gray-600/30"></div>
                  
                  {/* Center label */}
                  <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    </div>
                  </div>

                  {/* Play/Pause Button */}
                  <motion.button
                    onClick={handlePlayPause}
                    className="absolute inset-0 w-full h-full rounded-full flex items-center justify-center z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isPlaying ? 'bg-red-500/20' : 'bg-green-500/20'
                    }`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isPlaying ? 'bg-red-500' : audioLoaded ? 'bg-green-500' : 'bg-gray-400'
                      } text-white shadow-lg`}>
                        {isPlaying ? (
                          <div className="flex gap-1">
                            <div className="w-1 h-3 bg-white"></div>
                            <div className="w-1 h-3 bg-white"></div>
                          </div>
                        ) : (
                          <div className="ml-1">
                            <div className="w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-white border-b-4 border-b-transparent"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                </div>
              </motion.div>

              {/* Now Playing Info */}
              {audioLoaded && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center"
                >
                  <motion.div
                    animate={isPlaying ? { y: [0, -3, 0] } : {}}
                    transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
                    className="inline-block px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <p className="text-xs font-bold text-gray-900 dark:text-white">
                      {isPlaying ? "Now Playing" : "Paused"}
                    </p>
                    <p className="text-[10px] text-gray-600 dark:text-gray-300">Clairo - Add Up My Love</p>
                  </motion.div>
                </motion.div>
              )}

              {/* Floating music notes */}
              {isPlaying && audioLoaded && (
                <>
                  <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-0 left-4 text-xl text-blue-500"
                  >
                    ♫
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -30, 0], rotate: [0, -360] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    className="absolute bottom-4 right-4 text-xl text-purple-500"
                  >
                    ♪
                  </motion.div>
                </>
              )}
            </div>

            {/* Volume Control */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 dark:text-gray-400">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="30"
                  onChange={(e) => {
                    if (audioRef.current) {
                      audioRef.current.volume = e.target.value / 100;
                    }
                  }}
                  className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">30%</span>
              </div>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 text-center">
                Drag the vinyl to spin it! 🎵
              </p>
            </div>
          </motion.div>

          {/* ============ RIGHT COLUMN - CONTACT FORM ============ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-5 md:p-6 shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700"
          >
            {/* Compact Header */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="p-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg shadow-md"
              >
                <Mail size={16} className="text-white" />
              </motion.div>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                  Let's Connect
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Quick response within 24h
                </p>
              </div>
            </div>

            {/* Compact Email Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-4 pb-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">📧</span>
              <a 
                href="mailto:melodyang13@gmail.com"
                className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors truncate max-w-[180px] sm:max-w-none"
              >
                melodyang13@gmail.com
              </a>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full ml-auto">
                ✓ active
              </span>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center py-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center justify-center p-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-3"
                  >
                    <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
                  </motion.div>
                  <h3 className="text-base font-bold mb-1 dark:text-white">Message Sent! 🎉</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                    Thanks! I'll reply within 24h
                  </p>
                  <button
                    onClick={resetForm}
                    className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-medium rounded-lg hover:shadow-md transition-all"
                  >
                    New Message
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Status Message */}
                  <AnimatePresence>
                    {submitStatus.message && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`mb-3 p-2 rounded-lg flex items-center gap-2 text-xs ${
                          submitStatus.type === 'success'
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                        }`}
                      >
                        {submitStatus.type === 'success' ? (
                          <CheckCircle size={14} />
                        ) : (
                          <AlertCircle size={14} />
                        )}
                        <span>{submitStatus.message}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Ultra Compact Form */}
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
                    {/* Name & Email - Side by side */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <div className="relative">
                          <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className={`w-full bg-gray-50 dark:bg-gray-700/50 border pl-7 pr-2 py-2 rounded-lg outline-none text-xs dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                              formErrors.name
                                ? 'border-red-400 focus:border-red-500'
                                : 'border-gray-200 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400'
                            }`}
                          />
                        </div>
                        {formErrors.name && (
                          <p className="text-red-500 dark:text-red-400 text-[10px] pl-1">
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="relative">
                          <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className={`w-full bg-gray-50 dark:bg-gray-700/50 border pl-7 pr-2 py-2 rounded-lg outline-none text-xs dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                              formErrors.email
                                ? 'border-red-400 focus:border-red-500'
                                : 'border-gray-200 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400'
                            }`}
                          />
                        </div>
                        {formErrors.email && (
                          <p className="text-red-500 dark:text-red-400 text-[10px] pl-1">
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-1">
                      <div className="relative">
                        <MessageSquare className="absolute left-2.5 top-2.5 text-gray-400 dark:text-gray-500" size={14} />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your message..."
                          rows={2}
                          className={`w-full bg-gray-50 dark:bg-gray-700/50 border pl-7 pr-2 py-2 rounded-lg outline-none text-xs dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none ${
                            formErrors.message
                              ? 'border-red-400 focus:border-red-500'
                              : 'border-gray-200 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400'
                          }`}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        {formErrors.message ? (
                          <p className="text-red-500 dark:text-red-400 text-[10px] pl-1">
                            {formErrors.message}
                          </p>
                        ) : (
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 pl-1">
                            {formData.message.length}/500
                          </p>
                        )}
                        <span className="text-[10px] text-gray-400 dark:text-gray-500">
                          Min. 10 chars
                        </span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className={`w-full py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                        isSubmitting
                          ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                          : 'bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-3 h-3 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={14} />
                        </>
                      )}
                    </motion.button>

                    {/* Privacy Note */}
                    <p className="text-[10px] text-center text-gray-400 dark:text-gray-500">
                      🔒 Secure • No spam • Reply guaranteed
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-6 text-center border-t border-gray-200 dark:border-gray-800"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Melody Ang. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
            Built with React, Framer Motion & EmailJS • 🎵 Music adds good vibes
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        input[type=range]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border: none;
        }
        .dark input[type=range]::-webkit-slider-thumb {
          background: #34d399;
        }
      `}</style>
    </footer>
  );
};

export default Contact;