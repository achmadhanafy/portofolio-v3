"use client";
import ContactIcon from "@/components/icon-components/ContactIcon";
import ExperienceIcon from "@/components/icon-components/ExperienceIcon";
import GithubIcon from "@/components/icon-components/GithubIcon";
import HomeIcon from "@/components/icon-components/HomeIcon";
import LinkedInIcon from "@/components/icon-components/LinkedInIcon";
import LinkIcon from "@/components/icon-components/LinkIcon";
import ProjectsIcon from "@/components/icon-components/ProjectsIcon";
import SkillsIcon from "@/components/icon-components/SkillsIcon";
import React, { useState } from "react";
import profileJson from "../mock/profile.json";
import Image from "next/image";
import Speech, { useSpeech } from "react-text-to-speech";
import { motion, AnimatePresence, Variants } from "framer-motion";
import DribbleHoverAnimation from "@/components/icon-components/animated/DribbleHoverAnimation";
import Title from "@/components/icon-components/Text/Title";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- SECTION COMPONENTS ---

const HomeSection = () => (
  <motion.div
    id="home"
    className="flex flex-col items-center justify-center h-full text-center px-4 pt-12 md:pt-8 pb-8"
    variants={sectionVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.div
      className="w-40 h-40 rounded-full border-4 border-purple-400 shadow-lg mb-6 relative"
      variants={itemVariants}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Image
        alt="Profile image"
        src={profileJson.profile_img}
        fill
        className="object-cover rounded-full"
      />
    </motion.div>
    <motion.h1
      variants={itemVariants}
      className="text-4xl md:text-6xl font-extrabold text-white tracking-tight"
    >
      Hi, I&apos;m <span className="text-purple-400">{profileJson?.name}</span>
    </motion.h1>
    <motion.p
      variants={itemVariants}
      className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl"
    >
      {profileJson?.about}
    </motion.p>
    <motion.div variants={itemVariants} className="flex space-x-6 mt-8">
      <a
        href="https://github.com/achmadhanafy"
        className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
        target="_blank"
      >
        <GithubIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/achmad-hanafy/"
        className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
        target="_blank"
      >
        <LinkedInIcon />
      </a>
    </motion.div>
  </motion.div>
);

const ExperienceSection = () => (
  <motion.div
    id="experiences"
    className="flex flex-col items-center justify-center h-full p-4 md:p-8"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <Title>Work Experience</Title>
    <div className="w-full max-w-3xl relative mt-5">
      <motion.div
        className="hidden md:block md:absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-600"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      ></motion.div>

      <div className="space-y-12">
        {profileJson?.work_experience?.map((job, index) => {
          const isLeft = index % 2 === 0;
          return (
            // Mobile Version
            <motion.div key={index}>
              <motion.div
                className="block md:hidden"
                custom={index}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="bg-gray-800/60 rounded-md p-4 relative pt-20">
                  <DribbleHoverAnimation className="absolute left-1/2 top-[-30px] -translate-x-1/2 w-24 h-24 rounded-full bg-purple-500 border-4 border-gray-800 flex-shrink-0 z-10">
                    <Image
                      alt={job.company}
                      src={job.img}
                      fill
                      className="object-cover rounded-full"
                    />
                  </DribbleHoverAnimation>
                  <div className="text-purple-400 font-bold">{job.role}</div>
                  <div className="text-sm text-gray-400">{job.company}</div>
                  <div className="text-xs mb-3 text-gray-500">{job.date}</div>
                  <div>
                    {job.responsibilities.map((text, i) => (
                      <ul
                        key={i}
                        className="text-gray-300 text-xs md:text-sm mb-2"
                      >
                        {text}
                      </ul>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Dekstop */}
              <motion.div
                className="hidden md:flex items-center w-full"
                custom={index}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {isLeft ? (
                  <>
                    <div className="w-1/2 pr-8 text-right">
                      <h3 className="text-xl font-bold text-purple-400">
                        {job.role}
                      </h3>
                      <p className="text-gray-400">{job.company}</p>
                      <p className="text-sm text-gray-500 mb-2">{job.date}</p>
                      <div>
                        {job.responsibilities.map((text, i) => (
                          <ul
                            key={i}
                            className="text-gray-300 text-xs md:text-sm"
                          >
                            <div className="bg-white w-full h-[1px] my-2" />
                            {text}
                          </ul>
                        ))}
                      </div>
                    </div>
                    <a target="_blank" href={job.url}>
                      <DribbleHoverAnimation className="w-24 h-24 relative rounded-full border-4 border-purple-500 flex-shrink-0 z-10">
                        <Image
                          alt={job.company}
                          src={job.img}
                          fill
                          className="object-cover rounded-full"
                        />
                      </DribbleHoverAnimation>
                    </a>
                    <div className="w-1/2 pl-8"></div>
                  </>
                ) : (
                  <>
                    <div className="w-1/2 pr-8"></div>
                    <a target="_blank" href={job.url}>
                      <DribbleHoverAnimation className="w-24 h-24 relative rounded-full border-4 border-purple-500 flex-shrink-0 z-10">
                        <Image
                          alt={job.company}
                          src={job.img}
                          fill
                          className="object-cover rounded-full"
                        />
                      </DribbleHoverAnimation>
                    </a>
                    <div className="w-1/2 pl-8 text-left">
                      <h3 className="text-xl font-bold text-purple-400">
                        {job.role}
                      </h3>
                      <p className="text-gray-400">{job.company}</p>
                      <p className="text-sm text-gray-500 mb-2">{job.date}</p>
                      <div>
                        {job.responsibilities.map((text, i) => (
                          <ul
                            key={i}
                            className="text-gray-300 text-xs md:text-sm"
                          >
                            <div className="bg-white w-full h-[1px] my-2" />
                            {text}
                          </ul>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </motion.div>
);

const SkillsSection = () => (
  <motion.div
    id="skills"
    className="flex flex-col items-center justify-center h-full p-4 md:p-8"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <Title>Skills & Technologies</Title>
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-8"
      variants={sectionVariants}
    >
      {profileJson.skills.map((skill) => (
        <motion.div
          key={skill.name}
          className="flex flex-col items-center justify-center p-6 bg-gray-800/50 rounded-lg"
          variants={itemVariants}
          whileHover={{
            scale: 1.1,
            y: -10,
            boxShadow: "0px 10px 30px rgba(167, 139, 250, 0.3)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img src={skill.icon} alt={skill.name} className="h-16 w-16 mb-4" />
          <p className="text-white font-semibold">{skill.name}</p>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

const ProjectsSection = () => {
  return (
    <motion.div
      id="projects"
      className="flex flex-col items-center justify-center h-full p-4 md:p-8"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Title>Enterprise Projects Contribution</Title>
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:px-32"
        variants={sectionVariants}
      >
        {profileJson.projects.map((project) => (
          <motion.div
            key={project.name}
            // onClick={() => onProjectSelect(project)}
            className="bg-gray-800/60 rounded-lg overflow-hidden group cursor-pointer"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: "0px 15px 30px rgba(167, 139, 250, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="relative w-full h-48">
              <Image
                alt={project.name}
                src={project.img}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-purple-400 mb-2">
                {project.name}
              </h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-700 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {project.tech}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-4 relative">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-1"
                >
                  View Site <LinkIcon />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const ContactSection = () => {
  const [message, setMessage] = useState("");

  return (
    <motion.div
      id="contact"
      className="flex flex-col items-center justify-center h-full p-4 md:p-8"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        variants={itemVariants}
        className="text-4xl font-bold text-white mb-8"
      >
        Get In Touch
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-gray-300 mb-12 text-center max-w-xl"
      >
        I&apos;m currently open to new opportunities. If you have a project in
        mind or just want to say hi, feel free to reach out!
      </motion.p>
      <motion.div
        variants={itemVariants}
        className="w-full max-w-lg bg-gray-800/50 p-8 rounded-lg shadow-lg"
      >
        <form
          onSubmit={() => {
            window.location.href = `mailto:achmadhanafy@gmail.com?subject=${encodeURIComponent(
              "Get In Touch"
            )}&body=${message}`;
          }}
        >
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-purple-300 text-sm font-bold mb-2"
            >
              Message
            </label>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              id="message"
              rows={4}
              className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
          <div className="text-center flex flex-col md:flex-row gap-4">
            <motion.button
              type="submit"
              className="w-full md:w-1/2 bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg"
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 0px 20px rgba(116, 114, 119, 1)",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Send Email
            </motion.button>
            <motion.a
              target="_blank"
              href={`https://wa.me/6289635019520?text=${message}`}
              className="w-full md:w-1/2 bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg"
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 0px 20px rgb(168, 85, 247)",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Send Message
            </motion.a>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// wa link https://wa.me/6289635019520?text=${message}`

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    {
      id: "home",
      title: "Home",
      icon: <HomeIcon />,
      component: <HomeSection />,
    },
    {
      id: "experience",
      title: "Experience",
      icon: <ExperienceIcon />,
      component: <ExperienceSection />,
    },
    {
      id: "skills",
      title: "Skills",
      icon: <SkillsIcon />,
      component: <SkillsSection />,
    },
    {
      id: "projects",
      title: "Projects",
      icon: <ProjectsIcon />,
      component: <ProjectsSection />,
    },
    {
      id: "contact",
      title: "Contact",
      icon: <ContactIcon />,
      component: <ContactSection />,
    },
  ];

  const activeIndex = sections.findIndex((s) => s.id === activeSection);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    if (isMobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-gray-900 font-sans min-h-screen w-full text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900/40"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full filter blur-3xl animate-blob opacity-30"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full filter blur-3xl animate-blob animation-delay-4000 opacity-30"></div>

      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-gray-900/30 backdrop-blur-sm">
        <div className="text-2xl font-bold text-purple-400">AH.</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-2 bg-gray-800/50 p-2 rounded-full">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2 ${
                activeSection === section.id
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-700/80"
              }`}
            >
              {section.icon}
              <span>{section.title}</span>
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 text-white"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16m-7 6h7"
              }
            />
          </svg>
        </button>
      </header>

      {/* Mobile Nav */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-900/90 backdrop-blur-lg z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={`text-2xl font-bold transition-colors duration-300 ${
                activeSection === section.id
                  ? "text-purple-400"
                  : "text-gray-300"
              }`}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="relative w-full pb-8">
        {sections.map((section, index) => {
          const offset = (index - activeIndex) * 100;
          const isActive = index === activeIndex;

          return (
            <motion.div key={section.id}>
              {isActive && (
                <div className="pt-16 md:pt-32 md:pt-0 w-full flex items-center justify-center">
                  {section.component}
                </div>
              )}
            </motion.div>
          );
        })}
      </main>
    </div>
  );
}
