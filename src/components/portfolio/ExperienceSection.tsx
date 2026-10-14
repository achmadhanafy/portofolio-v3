"use client";

import { motion } from "framer-motion";

interface WorkExperience {
  role: string;
  company: string;
  location: string;
  date: string;
  responsibilities: string;
  contribution: {
    name: string;
    img: string;
    year: number;
    tech: string;
    description: string;
    url: string | null;
  }[];
  img: string;
  url: string;
}

interface ExperienceSectionProps {
  experiences: WorkExperience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="relative py-20 md:py-24 overflow-hidden border-b"
      style={{ borderColor: "rgba(86,66,57,0.2)" }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 60% at 16% 45%, rgba(255,138,76,0.12) 0%, rgba(255,110,30,0.03) 40%, transparent 65%)",
        }}
      />
      {/* SVG decorative line */}
      <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 900">
        <defs>
          <linearGradient id="timelineGlow" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#ff8a4c" stopOpacity="0" />
            <stop offset="40%"  stopColor="#ff8a4c" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ff8a4c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M 1400 100 C 950 250, 400 350, 120 700" fill="none" stroke="url(#timelineGlow)" strokeWidth="1.5" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
              style={{ background: "#211f1e", border: "1px solid rgba(86,66,57,0.3)" }}
            >
              <span className="material-symbols-outlined text-[14px] text-[#ff8a4c]">work_history</span>
              <span className="text-xs font-medium text-[#ff8a4c]" style={{ fontFamily: "var(--font-jetbrains-mono),monospace" }}>
                Track Record
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#e6e1df", letterSpacing: "-0.02em" }}>
              Career Timeline
            </h2>
          </div>
          <p className="text-sm max-w-sm" style={{ color: "#cdc5be" }}>
            A progressive journey through impactful engineering roles across mobile and web.
          </p>
        </motion.div>

        {/* Timeline */}
        <div
          className="relative pl-6 md:pl-10 border-l space-y-12"
          style={{ borderColor: "rgba(86,66,57,0.3)" }}
        >
          {experiences.map((exp, idx) => {
            const isFirst = idx === 0;
            return (
              <motion.div
                key={exp.company}
                className="relative group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
              >
                {/* Timeline node */}
                <div
                  className="absolute transition-transform duration-200 group-hover:scale-125"
                  style={{
                    left: "-31px",
                    top: "6px",
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: isFirst ? "#ff8a4c" : "#4b4640",
                    border: `4px solid #141312`,
                    boxShadow: isFirst ? "0 0 0 4px rgba(255,138,76,0.2)" : undefined,
                  }}
                />

                {/* Card */}
                <motion.div
                  className="rounded-xl p-6 transition-colors duration-200 shadow-lg"
                  style={{ background: "#211f1e", border: "1px solid rgba(86,66,57,0.3)" }}
                  whileHover={{ borderColor: "rgba(255,138,76,0.4)", boxShadow: "0 8px 32px -8px rgba(255,138,76,0.15)" }}
                >
                  {/* Top row */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4"
                    style={{ borderBottom: "1px solid rgba(86,66,57,0.2)" }}
                  >
                    <div>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: isFirst ? "#ff8a4c" : "#a58b80", fontFamily: "var(--font-jetbrains-mono),monospace" }}
                      >
                        {exp.date.toUpperCase()}
                      </span>
                      <h3 className="text-lg font-bold mt-1" style={{ color: "#e6e1df" }}>{exp.role}</h3>
                      <p className="text-sm" style={{ color: "#cdc5be" }}>
                        {exp.company}{" "}
                        <span style={{ color: "#a58b80" }}>• {exp.location}</span>
                      </p>
                    </div>
                    {isFirst && (
                      <span
                        className="px-3 py-1 rounded-full text-xs w-fit"
                        style={{
                          background: "rgba(255,138,76,0.1)",
                          border: "1px solid rgba(255,138,76,0.3)",
                          color: "#ff8a4c",
                          fontFamily: "var(--font-jetbrains-mono),monospace",
                        }}
                      >
                        Current Role
                      </span>
                    )}
                  </div>

                  {/* Responsibilities */}
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#cdc5be" }}>
                    {exp.responsibilities}
                  </p>

                  {/* Contributions */}
                  {exp.contribution && exp.contribution.length > 0 && (
                    <div className="mb-4">
                      <p className="text-[10px] font-semibold mb-2" style={{ color: "#a58b80", fontFamily: "var(--font-jetbrains-mono),monospace" }}>
                        KEY CONTRIBUTIONS
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.contribution.map((c) => (
                          <a
                            key={c.name}
                            href={c.url || undefined}
                            target={c.url ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-colors"
                            style={{
                              background: "#2b2a28",
                              border: "1px solid rgba(86,66,57,0.3)",
                              color: c.url ? "#ff8a4c" : "#cdc5be",
                              cursor: c.url ? "pointer" : "default",
                              textDecoration: "none",
                            }}
                          >
                            {c.url && <span className="material-symbols-outlined text-[11px]">open_in_new</span>}
                            {c.name}
                            <span className="text-[9px]" style={{ color: "#a58b80", fontFamily: "var(--font-jetbrains-mono),monospace" }}>
                              · {c.tech}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* View company */}
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium transition-colors hover:text-[#ff8a4c]"
                    style={{ color: "#a58b80", fontFamily: "var(--font-jetbrains-mono),monospace" }}
                  >
                    View Company
                    <span className="material-symbols-outlined text-[12px]">arrow_outward</span>
                  </a>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
