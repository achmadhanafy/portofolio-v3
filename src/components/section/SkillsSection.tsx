import React, { useState } from 'react'
import FrontEndIcon from '../icon-components/FrontEndIcon';
import MobileIcon from '../icon-components/MobileIcon';
import { motion, AnimatePresence } from "framer-motion";
import profileJson from "../../mock/profile.json";
import { itemVariants, sectionVariants } from '@/config/framer-motion';
import OthersIcon from '../icon-components/OthersIcon';

function SkillsSection() {
  const [hoveredCategory, setHoveredCategory] = useState("");

  const techListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const techItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const renderIcon = (skillName: string) => {
    if (skillName === "Frontend Development") return <FrontEndIcon />;
    if (skillName === "Mobile Development") return <MobileIcon />;
    return <OthersIcon />;
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full w-full p-4 md:p-8"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-4xl font-bold text-white mb-12">
        Skills & Technologies
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-8 w-full max-w-5xl">
        {profileJson.skills.map((skillCategory) => (
          <motion.div
            key={skillCategory.name}
            className="relative w-full md:w-1/3 h-110 bg-gray-800/50 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer overflow-hidden border border-transparent hover:border-purple-500 transition-colors"
            onMouseEnter={() => setHoveredCategory(skillCategory.name)}
            onMouseLeave={() => setHoveredCategory("")}
            variants={itemVariants}
          >
            {/* The main category title and icon */}
            <AnimatePresence>
              {hoveredCategory !== skillCategory.name && (
                <motion.div
                  className="text-center justify-center items-center flex flex-col"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderIcon(skillCategory.name)}
                  <h3 className="text-2xl font-semibold text-purple-400 mt-4">
                    {skillCategory.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-3">
                    {skillCategory.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The revealed technologies on hover */}
            <AnimatePresence>
              {hoveredCategory === skillCategory.name && (
                <motion.div
                  className="absolute inset-0 bg-gray-800/95 p-6 flex flex-col justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-2xl font-semibold text-purple-400 mb-6 text-center">
                    {skillCategory.name}
                  </h3>
                  <motion.ul
                    className="space-y-3 text-center"
                    variants={techListVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {skillCategory.tech.map((tech) => (
                      <motion.li
                        key={tech.tech}
                        className="text-gray-200 text-lg"
                        variants={techItemVariants}
                      >
                        <div className="flex flex-row items-center justify-start gap-4">
                          <img
                            src={tech.icon}
                            alt={tech.tech}
                            className="h-6 w-6"
                          />
                          <p className="text-sm">{tech.tech}</p>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default SkillsSection