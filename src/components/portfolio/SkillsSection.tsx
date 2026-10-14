"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface SkillCategory {
  name: string;
  description: string;
  tech: { tech: string; icon: string }[];
}

interface SkillsSectionProps {
  skills: SkillCategory[];
}

const SKILL_ICON: Record<string, string> = {
  "Frontend Development": "web",
  "Mobile Development": "devices",
  Others: "hub",
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section
      id="skills"
      className="relative py-20 md:py-24 overflow-hidden border-b"
      style={{ borderColor: "rgba(86,66,57,0.2)" }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle 320px at 20% 62%, rgba(255,138,76,0.10) 0%, transparent 65%), radial-gradient(circle 340px at 50% 62%, rgba(255,138,76,0.12) 0%, transparent 65%), radial-gradient(circle 320px at 80% 62%, rgba(255,138,76,0.10) 0%, transparent 65%)",
        }}
      />
      {/* SVG orbital */}
      <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 600">
        <defs>
          <linearGradient id="skillsOrb" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%"   stopColor="#ff8a4c" stopOpacity="0" />
            <stop offset="50%"  stopColor="#ffb693" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ff8a4c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M 100 370 Q 720 280 1340 370" fill="none" stroke="url(#skillsOrb)" strokeWidth="1.5" />
        <circle cx="720" cy="305" r="3" fill="#ff8a4c" opacity="0.8" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
            style={{ background: "#211f1e", border: "1px solid rgba(86,66,57,0.3)" }}
          >
            <span className="material-symbols-outlined text-[14px] text-[#ff8a4c]">memory</span>
            <span className="text-xs font-medium text-[#ff8a4c]" style={{ fontFamily: "var(--font-jetbrains-mono),monospace" }}>
              Core Competencies
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#e6e1df", letterSpacing: "-0.02em" }}>
            Toolkit &amp; Stacks
          </h2>
          <p className="text-sm mt-2" style={{ color: "#cdc5be" }}>
            Engineered around performance, cross-platform reach, and clean developer experience.
          </p>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              className="rounded-xl p-6 flex flex-col justify-between shadow-lg"
              style={{ background: "#211f1e", border: "1px solid rgba(86,66,57,0.3)" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.12, duration: 0.6, ease: "easeOut" }}
              whileHover={{ borderColor: "rgba(255,138,76,0.4)", boxShadow: "0 8px 32px -8px rgba(255,138,76,0.18)" }}
            >
              <div>
                {/* Icon box */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-[#ff8a4c] mb-5"
                  style={{ background: "#2b2a28", border: "1px solid rgba(86,66,57,0.35)" }}
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {SKILL_ICON[skill.name] || "code"}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-3" style={{ color: "#e6e1df" }}>{skill.name}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#cdc5be" }}>{skill.description}</p>
              </div>

              {/* Tech badges with icons */}
              <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: "1px solid rgba(86,66,57,0.2)" }}>
                {skill.tech.map((t) => (
                  <motion.div
                    key={t.tech}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                    style={{ background: "#1c1b1a", border: "1px solid rgba(86,66,57,0.3)" }}
                    whileHover={{ borderColor: "rgba(255,138,76,0.4)", background: "rgba(255,138,76,0.05)" }}
                  >
                    <Image
                      src={t.icon}
                      alt={t.tech}
                      width={14}
                      height={14}
                      className="object-contain"
                      unoptimized
                    />
                    <span
                      className="text-[11px]"
                      style={{ color: "#cdc5be", fontFamily: "var(--font-jetbrains-mono),monospace" }}
                    >
                      {t.tech}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
