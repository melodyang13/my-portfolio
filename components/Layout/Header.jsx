import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import cat from "../../src/assets/hdr-cat.png"; 

export default function FloatingHeader() {
  const items = [
    { id: 1, icon: <img src={cat} className="w-6 h-6" />, label: "About" },
    { id: 2, icon: <span className="text-orange-500 text-xl">{`</>`}</span>, label: "Projects" },
    { id: 3, icon: <FaLinkedin className="text-blue-500 text-xl" />, label: "Links" },
    { id: 4, icon: <span className="text-black text-xl">◎</span>, label: "Resume" },
  ];

  return (
    <motion.div
      className="
        fixed top-6 right-6 
        bg-white shadow-md 
        px-5 py-2 rounded-full 
        flex items-center gap-4
        z-50
      "
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {items.map((item) => (
        <HoverIcon key={item.id} icon={item.icon} label={item.label} />
      ))}
    </motion.div>
  );
}

function HoverIcon({ icon, label }) {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.div
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.2 }
        }}
        className="p-2 rounded-full cursor-pointer"
      >
        {icon}
      </motion.div>

      <motion.div
        variants={{
          rest: { opacity: 0, y: 0 },
          hover: { opacity: 1, y: -6 }
        }}
        transition={{ type: "spring", stiffness: 250 }}
        className="
          absolute top-12
          px-2 py-1 
          text-xs text-white 
          bg-black rounded-md shadow 
          pointer-events-none
        "
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
