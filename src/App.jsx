// src/App.js
import React, { useState } from 'react';
import Hero from "../components/Sections/Hero";
import TechStackCarousel from "../components/Sections/TechStackCarousel";
import ProjectCard from "../components/Sections/ProjectCard";
import ProjectModal from "../components/Sections/ProjectModal";
import About from "../components/Sections/About";

import "../src/App.css";
import { ThemeProvider } from "./ThemeContext"; 
import ExperienceTimeline from "../components/Sections/ExperienceTimeline";
import Navigation from '../components/Layout/Navigation';
import Contact from '../components/Sections/Contact';
import WordyVideo from "../src/assets/videos/WordyVideo.mp4";
import PathoraWide from "../src/assets/videos/pathora-landscape.mp4";
import PathoraVid from "../src/assets/videos/pathora-portrait.mp4";
import PathoraPlaceholder from "../src/assets/pathora-mb-default.png";
import WordyDefault from "../src/assets/wordy-default.png";
import phHitsPlaceholder from "../src/assets/phHitsDefault.png";
import phHitsVid from "../src/assets/videos/phHitsVid.mp4";
import ATLVid from "../src/assets/videos/A&T-LVid.mp4";
import ATPVid from "../src/assets/videos/A&T-PVid.mp4";
import ATDefault from "../src/assets/ATDefault.png";
import FlashVid from "../src/assets/videos/Flash-Vid.mp4";
import FlashDefault from "../src/assets/FlashDefault.png";
const projects = [
  {
    id: 1,
    title: "Pathora.AI",
    description: "A Progressive Web Application for Classifying Microscopic Skin Cancer Images using YOLOv8 , developed using MERN Stack",
    details: "Pathora.AI allows pathologists to picture skin cancer biopsies throught the microscope and predict which type skin cancer it is, assisting pathologists in their diagnosis.",
    achievements: [
       "Finalist in the  Baguio Smart City Challenge 2025",
       "Integrated OpenAI GPT-4 API for generating personalized career advice in real-time.",
        "Built a custom React Flow node engine supporting drag-and-drop roadmap planning.",
       
    ],
    tags: ["React", "Node JS", "Tailwind", "MongoDB",  "YoloV8"],
    color: "bg-creativeMint",
    videoLandscapeSrc: PathoraWide,
    videoSrc: PathoraVid,
    supportsLandscape: true,
    supportPortrait: true,
    videoPlaceholderColor: "bg-purple-900",
    imagePlaceholder:PathoraPlaceholder,
  },
  {
    id: 2,
    title: "Wordy Game",
    description: "A multi-player spelling game using Python and Java , where the player with the longest word win",
    details: "Wordy is a competitive word puzzle game designed for speed and interactivity. The core challenge was synchronizing game state across multiple clients ",
    achievements: [
        "Implemented a custom WebSocket event architecture for real-time multiplayer synchronization.",
        "First Game Development Experience!",
      
    ],
    tags: ["Java", "Python", "CORBA", "Canva"],
    color: "bg-creativeYellow",
    videoLandscapeSrc: WordyVideo, 
    supportsLandscape: true,
    supportPortrait: true,
    imagePlaceholder: WordyDefault, 
    videoPlaceholderColor: "bg-violet-900"
  },
  {
    id: 3,
    title: "闪记喵",
    description: "A Mandarin learning flashcard application featuring Xiao Shan, the Jellyfish Cat. Supports uploads, multiple review modes, and Dictionary Search",
    details: " ",
    achievements: [
        "My First Experiment with Google AI Studio",
        "Built a robust RBAC (Role-Based Access Control) system for different staff levels.",
        "Automated inventory low-stock alerts via email and SMS integrations."
    ],
    tags: ["Google AI Studio", "Typescript"],
    color: "bg-creativeCyan",
    videoPlaceholderColor: "bg-teal-900",
    supportsLandscape: true,
    supportPortrait: true,
    videoSrc:FlashVid,
    imagePlaceholder: FlashDefault, 
  
  },
  {
    id: 4,
    title: "A&T Accounting Application",
    description: "A specialized Progressive Web App (PWA) designed for civil engineering firms to track multi-project cash flows, labor costs, and material expenses in real-time using Google Workspace as a serverless backend.",
    details: "The application solves the disconnect between construction sites and the back office. It features a dual-interface system: a mobile-optimized portal for site employees to log expenses with digital receipt proof, and a comprehensive Admin dashboard. The system performs automated variance analysis by comparing real-time site costs against engineering budgets, providing a visual 'health check' for every active project.",
    achievements: [
        "Developed complex logic to calculate Project Cash Position and Variance by aggregating data across Expenses, Payroll, and Budget sheets.",
        "Integrated a Google Drive-backed image upload system allowing site workers to provide instant 'proof of expense'",
        "Built an intelligent monitoring system that triggers visual warnings and status changes when actual project costs exceed the allocated budget."
    ],
    tags: ["Google AI Studio", "Typescript", "Google Apps Script"],
    color: "bg-creativeMint",
    videoPlaceholderColor: "bg-red-900",
    supportsLandscape: true,
    supportPortrait: true,
    videoLandscapeSrc:ATLVid,
    videoSrc:ATPVid,
    imagePlaceholder: ATDefault ,
  
  },
   {
    id: 5,
    title: "VS Rentals",
    description: " A full-stack, cloud-based Property Management System (PMS) designed to streamline building operations, tenant billing, and maintenance tracking. ",
    details: "This Progressive Web App (PWA) serves as a centralized hub for landlords and tenants, replacing manual spreadsheet tracking with an automated, role-based digital interface..",
    achievements: [
        
    ],
    tags: ["Google AI Studio", "Typescript", "Google Apps Script"],
    color: "bg-creativeMint",
    videoPlaceholderColor: "bg-green-900",
    supportsLandscape: true,
    supportPortrait: true,
    videoLandscapeSrc:WordyVideo,
    videoSrc:WordyVideo,
  
  },
  {
    id: 6,
    title: " phHits",
    description: "A comprehensive video streaming and management platform designed to facilitate live broadcasting, content scheduling, and interactive viewer experiences.",
    details: " phHITS is a video streaming platform that allows users to upload their videos for scheduled broadcast and live streaming. It features a robust system where content managers can upload various media files (including mp4 and mp3), manage a content queue with swap and delete capabilities, and broadcast live streams to viewers anytime. The platform includes a dedicated viewer interface for watching current streams, a history feature to preview past broadcasts, and an administrative dashboard for managing user accounts and system access through full CRUD functionalities. ",
    achievements: [
        "Made use of Figma to design the interface  ",
        "HTML, CSS , and JS to create the front-end module",
        "1st Web application"
    ],
    tags: ["HTML", "CSS", "Node JS", "PHP", "JavaScript", "SQL", "JSON"],
    color: "bg-creativeCyan",
     videoLandscapeSrc: phHitsVid, 
    supportsLandscape: true,
    supportPortrait: true,
    imagePlaceholder: phHitsPlaceholder, 
    videoPlaceholderColor: "bg-indigo-900"
  },



];

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
      setSelectedProject(project);
      document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
      setSelectedProject(null);
      document.body.style.overflow = 'unset';
  };

  return (
    <ThemeProvider>
      <div className="App poppins-medium bg-[#FAFAFA] dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 selection:bg-green-400 transition-colors duration-300">
        
        {/* Add Navigation here */}
        <Navigation />
        
        <Hero/>
        {/* <TechStackCarousel/> */}
      
        <section id="projects" className="relative pt-24 pb-12">
          <div className="container mx-auto px-6 text-center mb-12">
            <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase">Selected Works</h2>
          </div>
          
          <div className="space-y-0">
            {projects.map((project, index) => (
                <ProjectCard 
                  key={project.id}
                  index={index}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  color={project.color}
                  videoPlaceholderColor={project.videoPlaceholderColor}
                  onOpenModal={() => openModal(project)}
                   imagePlaceholder={project.imagePlaceholder} 
                />
            ))}
          </div>
        </section>
        
        <ExperienceTimeline/>
        <About/>
        <Contact/>
 
        
        {/* Add ProjectModal */}
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={closeModal}
        />

      </div>
    </ThemeProvider>
  );
}

export default App;