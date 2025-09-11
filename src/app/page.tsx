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

// --- SECTION COMPONENTS ---

const HomeSection = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-4">
    <img
      src="https://placehold.co/160x160/1f2937/a78bfa?text=AH"
      alt="Jane Doe"
      className="w-40 h-40 rounded-full object-cover border-4 border-purple-400 shadow-lg mb-6"
    />
    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
      Hi, I&apos;m <span className="text-purple-400">{profileJson?.name}</span>
    </h1>
    <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
      {profileJson?.about}
    </p>
    <div className="flex space-x-6 mt-8">
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
    </div>
  </div>
);

const ExperienceSection = () => (
  <div className="flex flex-col items-center justify-center h-full p-4 md:p-8">
    <h2 className="text-2xl md:text-4xl font-bold text-white mb-12">
      Work Experience
    </h2>
    <div className="w-full max-w-3xl relative">
      {/* Timeline Line */}
      <div className="absolute left-4/12 md:left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-600"></div>

      {/* Experience Items */}
      <div className="space-y-12">
        {/* Item 1 */}
        {profileJson?.work_experience?.map((item) => (
          <div key={item.role} className="flex items-center w-full">
            <div className="w-4/12 md:w-1/2 pr-4 md:pr-8 text-right">
              <h3 className="text-xs md:text-xl font-bold text-purple-400">
                {item.role}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm mt-2">
                {item.company}
              </p>
              <p className="text-xs md:text-sm text-gray-500 mt-2">
                {item.date}
              </p>
            </div>
            <div className="left-4/12 -translate-x-1/2 md:-translate-x-0 md:left-0 absolute md:relative md:mr-0 w-4 h-4 md:w-12 md:h-12 rounded-full bg-purple-500 border-4 border-gray-800 flex-shrink-0 z-10"></div>
            <div className="w-8/12 md:w-1/2 pl-4 md:pl-8">
              {item.responsibilities.map((text, i) => (
                <li key={i} className="text-gray-300 text-xs md:text-sm">
                  {text}
                </li>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SkillsSection = () => (
  <div className="flex flex-col items-center justify-center h-full p-4 md:p-8">
    <h2 className="text-4xl font-bold text-white mb-12">
      Skills & Technologies
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {profileJson.skills.map((skill) => (
        <div
          key={skill.name}
          className="flex flex-col items-center justify-center p-6 bg-gray-800/50 rounded-lg transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
        >
          <img src={skill.icon} alt={skill.name} className="h-16 w-16 mb-4" />
          <p className="text-white font-semibold">{skill.name}</p>
        </div>
      ))}
    </div>
  </div>
);

const ProjectsSection = () => (
  <div className="flex flex-col items-center justify-center h-full p-4 md:p-8">
    <h2 className="text-4xl font-bold text-white mb-12">My Projects</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {profileJson.projects.map((project) => (
        <div
          key={project.name}
          className="bg-gray-800/60 rounded-lg overflow-hidden group transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30"
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
              <span
                key={project.tech}
                className="bg-gray-700 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full"
              >
                {project.tech}
              </span>
            </div>
            <div className="flex items-center justify-end space-x-4">
             {project.url && (
               <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-1"
              >
                <LinkIcon />
              </a>
             )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContactSection = () => {
  const [message, setMessage] = useState("")
  return (
  <div className="flex flex-col items-center justify-center h-full p-4 md:p-8">
    <h2 className="text-4xl font-bold text-white mb-8">Get In Touch</h2>
    <p className="text-gray-300 mb-12 text-center max-w-xl">
      I&apos;m currently open to new opportunities. If you have a project in
      mind or just want to say hi, feel free to reach out!
    </p>
    <div className="w-full max-w-lg bg-gray-800/50 p-8 rounded-lg shadow-lg">
      <form onSubmit={()=>{
        window.location.href = `mailto:achmadhanafy@gmail.com?subject=${encodeURIComponent("Get In Touch")}&body=${message}`;
      }}>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-purple-300 text-sm font-bold mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className="text-xs md:text-sm w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>
        <div className="flex items-center justify-center gap-5">
          <div className="text-center">
          <button
            type="submit"
            className="bg-purple-600 text-xs md:text-sm text-white font-bold py-2 md:py-3 px-3 md:px-8 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Send Email
          </button>
        </div>
        <div className="text-center">
          <a
            target="_blank"
            href={`https://wa.me/6289635019520?text=${message}`}
            className="text-xs md:text-sm bg-purple-600 text-white font-bold py-2 md:py-3 px-3 md:px-8 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Send Whatsapp
          </a>
        </div>
        </div>
      </form>
    </div>
  </div>
)
}

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
      <main className="relative w-full h-screen">
        {sections.map((section, index) => {
          const offset = (index - activeIndex) * 100;
          return (
            <div
              key={section.id}
              className="absolute top-0 left-0 w-full h-full overflow-y-auto transition-transform duration-700 ease-in-out pt-8 md:pt-24"
              style={{ transform: `translateX(${offset}%)` }}
            >
              <div className="pt-20 md:pt-0 w-full min-h-full flex items-center justify-center">
                {section.component}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
