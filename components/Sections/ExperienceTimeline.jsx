import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    company: "iEminence Inc.",
    role: "Full Stack Web Developer Intern ",
    period: "Jan-May 2025",
    desc: "Built frontend and backend features for HRIS services using React, Redux, Node.js, and Docker. Deployed updates, resolved Jira tickets, and ensured timely delivery of tasks",
    color: "bg-yellow-400"
  },
   {
    company: "TJBroz Laundry Shop",
    role: "Front End Developer and UI Designer",
    period: "July 2024 - August 2024",
    desc: "Built a loyalty point system web application with Figma and React",
    color: "bg-cyan-400"
  },
  {
    company: "G&C Real Estate Corp.",
    role: " Freelance UI Designer",
    period: "June 2024",
    desc: "Designed a Real Estate Booking Website with Figma ",
    color: "bg-green-400"
  },
 
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

const ExperienceTimeline = () => {
  return (
    <section id="experience" className="py-24 bg-[#FAFAFA] dark:bg-gray-900 relative transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ type: "spring", stiffness: 100, damping: 20 }}
           className="mb-16 flex items-center gap-4"
        >
          <div className="p-3 bg-black dark:bg-white text-white dark:text-black rounded-xl">
            <Briefcase size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white">Experience</h2>
        </motion.div>

        <motion.div 
          className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-4 md:ml-6 space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experiences.map((exp, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="relative pl-8 md:pl-10 group"
            >
              
              <div className="absolute -left-[9px] top-6">
                <motion.span 
                  className={`block w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 ${exp.color} ring-4 ring-gray-50 dark:ring-gray-800`}
                  whileHover={{ scale: 1.5, rotate: 90 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                />
              </div>
              
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group-hover:border-black/5 dark:group-hover:border-white/10"
                whileHover={{ x: 10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.company}</h3>
                  <span className="text-sm font-medium text-gray-400 bg-gray-50 dark:bg-white/5 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">{exp.period}</span>
                </div>
                <h4 className="text-lg text-emerald-600 dark:text-green-400 font-medium mb-3">{exp.role}</h4>
                <p className="text-gray-600 dark:text-gray-400">{exp.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;