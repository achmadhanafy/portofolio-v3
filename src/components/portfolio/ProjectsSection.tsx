"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Project {
  name: string;
  category: string;
  img: string;
  year: number;
  tech: string[];
  description: string;
  webUrl?: string;
  androidUrl?: string;
  iosUrl?: string;
  npmUrl?: string;
  url?: string | null;
  underDevelopment?: boolean;
  company: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    railRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      className="relative py-20 md:py-24 overflow-hidden border-b"
      style={{
        background: "rgba(28,27,26,0.3)",
        borderColor: "rgba(86,66,57,0.2)",
      }}
    >
      {/* Ambient glow at bottom */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 42% at 50% 92%, rgba(255,138,76,0.15) 0%, rgba(255,138,76,0.04) 42%, transparent 72%)",
        }}
      />
      {/* SVG arcs */}
      <svg
        className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 650"
      >
        <defs>
          <linearGradient id="projArc" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff8a4c" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffb693" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ff8a4c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M -80 620 Q 720 420 1520 620"
          fill="none"
          stroke="url(#projArc)"
          strokeWidth="2"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
              style={{
                background: "#211f1e",
                border: "1px solid rgba(86,66,57,0.3)",
              }}
            >
              <span className="material-symbols-outlined text-[14px] text-[#ff8a4c]">
                layers
              </span>
              <span
                className="text-xs font-medium text-[#ff8a4c]"
                style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
              >
                Selected Works
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#e6e1df", letterSpacing: "-0.02em" }}
            >
              Production Projects
            </h2>
          </div>
          {/* Desktop scroll controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-150 hover:border-[#ff8a4c] hover:text-[#ff8a4c]"
              style={{
                background: "#211f1e",
                border: "1px solid rgba(86,66,57,0.3)",
                color: "#cdc5be",
              }}
            >
              <span className="material-symbols-outlined text-xl">
                chevron_left
              </span>
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next"
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-150 hover:border-[#ff8a4c] hover:text-[#ff8a4c]"
              style={{
                background: "#211f1e",
                border: "1px solid rgba(86,66,57,0.3)",
                color: "#cdc5be",
              }}
            >
              <span className="material-symbols-outlined text-xl">
                chevron_right
              </span>
            </button>
          </div>
        </motion.div>

        {/* Horizontal Rail */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            ref={railRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 -mx-5 px-5 md:mx-0 md:px-0"
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: Math.min(i * 0.08, 0.4),
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="w-[82vw] sm:w-[340px] md:w-[380px] flex-shrink-0 snap-start flex flex-col justify-between rounded-xl p-5 transition-all duration-200 shadow-xl group"
                style={{
                  background: "#211f1e",
                  border: "1px solid rgba(86,66,57,0.3)",
                }}
                whileHover={{
                  borderColor: "rgba(255,138,76,0.5)",
                  boxShadow: "0 8px 40px -8px rgba(255,138,76,0.2)",
                }}
              >
                {/* Image */}
                <div>
                  <div
                    className="w-full h-40 rounded-lg overflow-hidden mb-4 relative"
                    style={{ border: "1px solid rgba(86,66,57,0.2)" }}
                  >
                    <Image
                      src={project.img}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, #211f1e 0%, transparent 60%)",
                        opacity: 0.8,
                      }}
                    />
                    {/* Category badge */}
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <span
                        className="text-[10px] px-2.5 py-1 rounded"
                        style={{
                          background: "rgba(20,19,18,0.8)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,138,76,0.3)",
                          color: "#ff8a4c",
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                        }}
                      >
                        {project.category}
                      </span>
                      {project.underDevelopment && (
                        <span
                          className="text-[10px] px-2.5 py-1 rounded"
                          style={{
                            background: "rgba(20,19,18,0.8)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(86,66,57,0.4)",
                            color: "#a58b80",
                            fontFamily: "var(--font-jetbrains-mono), monospace",
                          }}
                        >
                          In Dev
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[11px]"
                      style={{
                        color: "#a58b80",
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                      }}
                    >
                      {project.company}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{
                        color: "#564239",
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                      }}
                    >
                      {project.year}
                    </span>
                  </div>

                  <h3
                    className="text-base font-bold mb-2 transition-colors group-hover:text-[#ff8a4c]"
                    style={{ color: "#e6e1df" }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "#cdc5be" }}>
                    {project.description}
                  </p>
                </div>

                {/* Footer */}
                <div>
                  {/* Tech stack */}
                  <div
                    className="flex flex-wrap gap-1.5 mb-4 pt-3"
                    style={{ borderTop: "1px solid rgba(86,66,57,0.2)" }}
                  >
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded"
                        style={{
                          background: "#2b2a28",
                          color: "#a58b80",
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {project.webUrl && (
                      <a
                        href={project.webUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs transition-colors hover:text-[#ff8a4c]"
                        style={{
                          color: "#a58b80",
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                        }}
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          language
                        </span>
                        Web
                      </a>
                    )}
                    {project.androidUrl && (
                      <a
                        href={project.androidUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs transition-colors hover:text-[#ff8a4c]"
                        style={{
                          color: "#a58b80",
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                        }}
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          android
                        </span>
                        Android
                      </a>
                    )}
                    {project.iosUrl && (
                      <a
                        href={project.iosUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs transition-colors hover:text-[#ff8a4c]"
                        style={{
                          color: "#a58b80",
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                        }}
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          phone_iphone
                        </span>
                        iOS
                      </a>
                    )}
                    {project.npmUrl && (
                      <a
                        href={project.npmUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs transition-colors hover:text-[#ff8a4c]"
                        style={{
                          color: "#a58b80",
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                        }}
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          package_2
                        </span>
                        NPM
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile hint */}
        <motion.p
          className="text-center text-[11px] mt-4 sm:hidden"
          style={{
            color: "#564239",
            fontFamily: "var(--font-jetbrains-mono), monospace",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          ← Swipe to explore →
        </motion.p>
      </div>
    </section>
  );
}
