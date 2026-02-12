import React from "react";
import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { SiCardano } from "react-icons/si";
import Figma from "../../src/assets/figma.png";
import Header from "../Layout/Header";
import stamp from "../../src/assets/hero-stamp.svg"
import framer from "../../src/assets/framer.svg";
import ui from "../../src/assets/hero-ui.png";
import Navigation from "../Layout/Navigation";

export default function HeroSection() {
  const floatAnim = {
    hover: { scale: 1.15 },
    tap: { scale: 0.95 },
  };

  const draggableAnim = {
    drag: true,
    dragElastic: 0.2,
    dragConstraints: { top: 0, bottom: 0, left: 0, right: 0 },
    onDragEnd: (event, info) => {},
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      {/* Dotted Background - Dark mode version */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.12)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:18px_18px] dark:bg-[length:18px_18px]"></div>
      {/* <Header/> */}
      <Navigation/>
    

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 p-6">
        {/* Phone Mockup */}
        <motion.img
          src={ui}
          alt="mockup"
          className="w-60 md:w-72 drop-shadow-xl rounded-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Title */}
        <div className="text-center md:text-left">
          <h1 className="text-9xl font-extrabold leading-tight dark:text-white">

             <div className="flex items-center justify-center md:justify-start gap-1 text-9xl">
            <motion.div
             className="text-pink-500 dark:text-pink-400"
              animate={{ y: [0, -5, 0], transition: { duration: 3, repeat: Infinity } }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              drag
              dragElastic={0.2}
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            >
              <img src={framer} className="w-10" alt="Framer Motion Logo"/>

            </motion.div>
            <span className="text-xl font-semibold block mb-1 opacity-80 dark:opacity-90 dark:text-gray-300"> 
              elody's
            </span>

            </div>

            {/* PORT */}
            <div className="flex items-center justify-center md:justify-start gap-1 text-9xl text-black dark:text-white">
              <span>P</span>
               {/* React O */}
              <motion.div
              className="text-blue-500 dark:text-blue-400"
               animate={{ y: [0, -5, 0], transition: { duration: 3, repeat: Infinity } }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              drag
              dragElastic={0.2}
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              >
              <FaReact />
              </motion.div>
           
              <span>RT</span>

                    {/* Stamp */}
              <motion.img
                src={stamp}
                alt="stamp"
                animate={{ y: [0, -7, 0], transition: { duration: 3, repeat: Infinity } }}
                className="absolute top-30 left-180 right-1 bottom-20 w-24 rotate-12 dark:filter "
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                drag
                dragElastic={0.2}
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              />
            </div>

            {/* O (React) + FOLIO */}
            <div className="flex items-center justify-center md:justify-start mt-1 text-9xl text-black dark:text-white">
                 {/* Figma Icon as F */}
              <motion.img
              src={Figma}
              className="w-25 h-25 "
              alt="Figma Logo"
              animate={{ y: [0, -5, 0], transition: { duration: 3, repeat: Infinity } }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              drag
              dragElastic={0.2} 
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              />
             

              <span className="font-extrabold">OLIO</span>
            </div>
          </h1>

          <p className="mt-4 text-xl tracking-wide font-medium dark:text-gray-300">
            REACT WEB DEVELOPER<br />  AI PRODUCT ENGINEER
          </p>
        </div>
      </div>

      {/* Floating Tech Badges - Dark mode compatible */}


      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-10 h-16 rounded-full border-2 border-gray-300 dark:border-gray-600 flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
}