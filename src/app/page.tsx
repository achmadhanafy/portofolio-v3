"use client";
import ContactIcon from "@/components/icon-components/ContactIcon";
import ExperienceIcon from "@/components/icon-components/ExperienceIcon";
import HomeIcon from "@/components/icon-components/HomeIcon";
import SkillsIcon from "@/components/icon-components/SkillsIcon";
import React, { useState } from "react";
import { motion } from "framer-motion";
import HomeSection from "@/components/section/HomeSection";
import ExperienceSection from "@/components/section/ExperienceSection";
import SkillsSection from "@/components/section/SkillsSection";
import ContactSection from "@/components/section/ContactSection";
import ChatIcon from "@/components/icon-components/ChatIcon";

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
      id: "ai-assistance",
      title: "AI Chatbot",
      icon: <ChatIcon />,
      component: <HomeSection section="ai-chatbot" />,
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

    // To bottom if sectionId == ai-assistance
    if (sectionId === "ai-assistance") {
      const element = document.getElementById("ai-assistance");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
          window.scrollTo(0, 0);
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
              } ${section.id === "ai-assistance" ? "block lg:hidden" : ""}`}
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
