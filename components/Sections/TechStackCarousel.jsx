import { motion } from "framer-motion";
import { SiJavascript, SiReact, SiTailwindcss, SiHtml5, SiPostgresql, SiPython, SiRedux, SiDocker, SiGithub, SiPostman, SiWordpress, SiWebflow, SiJira, SiFramer } from "react-icons/si";

const TechStackCarousel = () => {
  const techStack = [
    { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" size={48} /> },
    { name: "HTML5", icon: <SiHtml5 className="text-orange-500" size={48} /> },
    { name: "SQL", icon: <SiPostgresql className="text-blue-600" size={48} /> },
    { name: "Python", icon: <SiPython className="text-blue-500" size={48} /> },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" size={48} /> },
    { name: "React", icon: <SiReact className="text-blue-400" size={48} /> },
    { name: "Redux", icon: <SiRedux className="text-purple-500" size={48} /> },
    { name: "Docker", icon: <SiDocker className="text-blue-400" size={48} /> },
    { name: "GitHub", icon: <SiGithub className="text-gray-800" size={48} /> },
    { name: "Postman", icon: <SiPostman className="text-orange-500" size={48} /> },
    { name: "WordPress", icon: <SiWordpress className="text-blue-700" size={48} /> },
    { name: "Webflow", icon: <SiWebflow className="text-blue-400" size={48} /> },
    { name: "Jira", icon: <SiJira className="text-blue-400"   size={48}/> },
    { name: "Framer Motion", icon: <SiFramer className="text-blue-400"   size={48}/> },

  ];

  // Duplicate the array to create seamless looping
  const duplicatedStack = [...techStack, ...techStack];

  return (
    <div className="relative w-full overflow-hidden py-12 bg-gray-50">
      <motion.div
        className="flex"
        animate={{
          x: ["0%", "-100%"],
          transition: {
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          },
        }}
      >
        {duplicatedStack.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex flex-col items-center justify-center mx-8 min-w-[120px]"
          >
            <div className="p-4 bg-white rounded-xl shadow-md flex items-center justify-center">
              {tech.icon}
            </div>
            <span className="mt-3 text-sm font-medium text-gray-600">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
      
      {/* Gradient fade effects */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gray-50 to-transparent z-10" />
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gray-50 to-transparent z-10" />
    </div>
  );
};

export default TechStackCarousel;