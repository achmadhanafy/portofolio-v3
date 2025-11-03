import { sectionVariants } from "@/config/framer-motion";
import React from "react";
import { motion } from "framer-motion";
import profileJson from "../../mock/profile.json";
import Image from "next/image";
import BrowserIcon from "../icon-components/BrowserIcon";
import AndroidIcon from "../icon-components/AndroidIcon";
import AppleIcon from "../icon-components/AppleIcon";
import DribbleHoverAnimation from "../animated/DribbleHoverAnimation";
import NpmIcon from "../icon-components/NpmIcon";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

function ProjectSection() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full w-full p-4 md:p-8"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Projects Showcase
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore portfolio of successful projects that demonstrate expertise
            and commitment to excellence
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {profileJson.projects.map((project, i) => (
            <DribbleHoverAnimation scale={1.03} key={i} className="h-full rounded-xl border border-purple-500">
              <motion.div
                variants={itemVariants}
                className="flex flex-col h-full group"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <div className="w-full h-full bg-gray-100 rounded-t-xl">
                    <Image
                      src={project.img}
                      loading="eager"
                      alt={project.name}
                      className="w-full h-full object-contain"
                      fill
                    />
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 grow flex flex-col">
                  <p className="text-sm text-gray-500 font-medium mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-xl font-bold mb-2 text-purple-500">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  {/* Bottom */}
                  <div className="grow flex flex-col justify-end">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tag, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 border border-purple-500 text-primary text-xs rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Open Site */}
                    <div className="mt-5">
                      <div className="flex flex-wrap gap-3">
                        {project.webUrl && (
                          <div
                            className="flex p-2 hover:bg-purple-500 hover:text-white border-purple-500 border-1 items-center rounded-md cursor-pointer"
                            onClick={() =>
                              window.open(project.webUrl, "_blank")
                            }
                          >
                            <BrowserIcon />
                            <span className="text-xs ml-2 font-bold">Web</span>
                          </div>
                        )}
                        {project.androidUrl && (
                          <div
                            className="flex p-2 hover:bg-purple-500 hover:text-white border-purple-500 border-1 items-center rounded-md cursor-pointer"
                            onClick={() =>
                              window.open(project.androidUrl, "_blank")
                            }
                          >
                            <AndroidIcon />
                            <span className="text-xs ml-2 font-bold">
                              Android
                            </span>
                          </div>
                        )}
                        {project.iosUrl && (
                          <div
                            className="flex p-2 hover:bg-purple-500 hover:text-white border-purple-500 border-1 items-center rounded-md cursor-pointer"
                            onClick={() =>
                              window.open(project.iosUrl, "_blank")
                            }
                          >
                            <AppleIcon />
                            <span className="text-xs ml-2 font-bold">iOS</span>
                          </div>
                        )}
                        {project.npmUrl && (
                          <div
                            className="flex p-2 hover:bg-purple-500 hover:text-white border-purple-500 border-1 items-center rounded-md cursor-pointer"
                            onClick={() =>
                              window.open(project.npmUrl, "_blank")
                            }
                          >
                            <NpmIcon />
                            <span className="text-xs ml-2 font-bold">NPM</span>
                          </div>
                        )}
                        {project.underDevelopment && (
                          <div
                            className="flex p-2 text-primary border-purple-500 border-1 items-center rounded-md"
                            onClick={() =>
                              window.open(project.iosUrl, "_blank")
                            }
                          >
                            <span className="text-xs ml-2 font-bold">
                              Not deployed yet
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </DribbleHoverAnimation>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProjectSection;
