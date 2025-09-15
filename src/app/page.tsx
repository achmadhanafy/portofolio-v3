"use client";
import ContactIcon from "@/components/icon-components/ContactIcon";
import ExperienceIcon from "@/components/icon-components/ExperienceIcon";
import GithubIcon from "@/components/icon-components/GithubIcon";
import HomeIcon from "@/components/icon-components/HomeIcon";
import LinkedInIcon from "@/components/icon-components/LinkedInIcon";
import LinkIcon from "@/components/icon-components/LinkIcon";
import ProjectsIcon from "@/components/icon-components/ProjectsIcon";
import SkillsIcon from "@/components/icon-components/SkillsIcon";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import profileJson from "../mock/profile.json";
import Image from "next/image";
import Speech, { useSpeech } from "react-text-to-speech";
import { motion, AnimatePresence, Variants } from "framer-motion";
import DribbleHoverAnimation from "@/components/icon-components/animated/DribbleHoverAnimation";
import Title from "@/components/icon-components/Text/Title";
import MicrophoneIcon from "@/components/icon-components/MicrophoneIcon";
import SendIcon from "@/components/icon-components/SendIcon";
import FrontEndIcon from "@/components/icon-components/FrontEndIcon";
import MobileIcon from "@/components/icon-components/MobileIcon";
import OthersIcon from "@/components/icon-components/OthersIcon";

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

const HomeSection = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm Jane's AI assistant. Feel free to ask me anything about her skills, experience, or projects.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  // const { speak } = useSpeech(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (text === "") return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response with generative text effect
    setTimeout(() => {
      const sampleResponse =
        "Jane is a highly skilled developer with expertise in the MERN stack. She recently completed 'Project Alpha,' a full-featured project management tool. Would you like to know more about her specific skills or another project?";
      setMessages((prev) => [...prev, { sender: "ai", text: sampleResponse }]);
      setIsTyping(false);
    }, 2000);
  };

  const handleMicPress = () => {
    setIsRecording(true);
    // In a real app, you'd start voice recognition here.
    setTimeout(() => {
      setIsRecording(false);
      setInputValue("Tell me about your projects.");
    }, 2000); // Simulate a 2-second recording
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full text-center px-4 w-full"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full max-w-6xl">
        {/* Left Side: Personal Info */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-center"
          variants={itemVariants}
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
            Hi, I&apos;m{" "}
            <span className="text-purple-400">{profileJson.name}</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl"
          >
            {profileJson.about}
          </motion.p>
          <motion.div variants={itemVariants} className="flex space-x-6 mt-8">
            <a
              href="#"
              className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
            >
              <GithubIcon />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
            >
              <LinkedInIcon />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Chatbot */}
        <motion.div
          className="w-full lg:w-1/2 h-[60vh] max-h-[700px] flex flex-col bg-gray-800/50 rounded-2xl shadow-2xl shadow-purple-500/10 border border-gray-700"
          variants={itemVariants}
        >
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">
              AI Personal Assistant
            </h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-gray-700 text-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm text-left">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-gray-700 text-gray-200 rounded-2xl rounded-bl-none px-4 py-2 flex items-center space-x-1">
                  <motion.span
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-gray-700 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask something..."
              className="w-full bg-gray-700 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <motion.button
              type="button"
              onClick={handleMicPress}
              className="p-2 rounded-full text-white bg-gray-700 hover:bg-purple-600 transition-colors"
              animate={{ scale: isRecording ? [1, 1.2, 1] : 1 }}
              transition={
                isRecording
                  ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
                  : {}
              }
            >
              <MicrophoneIcon />
            </motion.button>
            <button
              type="submit"
              className="p-2 rounded-full text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              <SendIcon />
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

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

          const projectContribution = () => {
            return (
              <div className="flex flex-col items-end gap-4 mt-5">
                {job.contribution.map((p) => (
                  <motion.div
                    onClick={() => {
                      if (p.url) window.open(p.url, "_blank");
                    }}
                    key={p.name}
                    className="bg-gray-800/70 p-4 rounded-lg w-full max-w-sm text-left relative"
                    whileHover={
                      p.url
                        ? { scale: 1.05, borderColor: "#a78bfa" }
                        : undefined
                    }
                    style={{ border: "1px solid transparent" }}
                  >
                    <h5 className="font-bold text-white">{p.name}</h5>
                    <p className="text-sm text-gray-400">{p.description}</p>
                    <p className="text-sm text-purple-400 font-semibold mt-3">
                      {p.tech}
                    </p>
                    <div className="flex items-center justify-end space-x-4">
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-4 text-xs right-4 text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-1"
                        >
                          View Site <LinkIcon />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          };

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
                  <p className="text-gray-300 mt-2">{job.responsibilities}</p>
                  {projectContribution()}
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
                      <p className="text-gray-300 mt-2">
                        {job.responsibilities}
                      </p>
                      {projectContribution()}
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
                      <p className="text-gray-300 mt-2">
                        {job.responsibilities}
                      </p>
                      {projectContribution()}
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
const SkillsSection = () => {
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
};

// const ProjectsSection = () => {
//   return (
//     <motion.div
//       id="projects"
//       className="flex flex-col items-center justify-center h-full p-4 md:p-8"
//       variants={sectionVariants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.1 }}
//     >
//       <Title>Enterprise Projects Contribution</Title>
//       <motion.div
//         className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:px-32"
//         variants={sectionVariants}
//       >
//         {profileJson.projects.map((project) => (
//           <motion.div
//             key={project.name}
//             // onClick={() => onProjectSelect(project)}
//             className="bg-gray-800/60 rounded-lg overflow-hidden group cursor-pointer relative"
//             variants={itemVariants}
//             whileHover={{
//               scale: 1.05,
//               y: -5,
//               boxShadow: "0px 15px 30px rgba(167, 139, 250, 0.2)",
//             }}
//             transition={{ type: "spring", stiffness: 200, damping: 15 }}
//           >
//             <div className="relative w-full h-48">
//               <Image
//                 alt={project.name}
//                 src={project.img}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <div className="p-6">
//               <h3 className="text-2xl font-bold text-purple-400 mb-2">
//                 {project.name}
//               </h3>
//               <p className="text-gray-300 mb-4">{project.description}</p>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 <span className="bg-gray-700 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full">
//                   {project.tech}
//                 </span>
//               </div>
//             </div>
//             <div className="flex items-center justify-end space-x-4">
//               {project.url && (
//                 <a
//                   href={project.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="absolute bottom-4 text-xs right-4 text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-1"
//                 >
//                   View Site <LinkIcon />
//                 </a>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// };

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
    // {
    //   id: "projects",
    //   title: "Projects",
    //   icon: <ProjectsIcon />,
    //   component: <ProjectsSection />,
    // },
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
