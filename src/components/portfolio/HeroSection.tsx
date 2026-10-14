"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroSectionProps {
  name: string;
  title: string;
  about: string;
  profileImg: string;
  github: string;
  linkedin: string;
  contact: {
    location: string;
    email: string;
  };
}

const ANIM = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: "easeOut" as const },
});

export default function HeroSection({
  name,
  title,
  about,
  profileImg,
  github,
  linkedin,
  contact,
}: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacityVal = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-[90vh] flex items-center overflow-hidden border-b"
      style={{ borderColor: "rgba(86,66,57,0.2)" }}
    >
      {/* ── Parallax Atmospheric Background ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 72% 28%, rgba(255,138,76,0.18) 0%, rgba(255,110,30,0.06) 35%, transparent 65%), radial-gradient(circle at 20% 48%, rgba(255,182,147,0.07) 0%, transparent 50%)",
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 800"
        >
          <defs>
            <linearGradient
              id="heroStreak1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ff8a4c" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffb693" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ff5600" stopOpacity="0" />
            </linearGradient>
            <filter id="heroGlow">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 400 -50 C 750 200, 1100 150, 1500 500"
            fill="none"
            stroke="url(#heroStreak1)"
            strokeWidth="2"
            filter="url(#heroGlow)"
          />
          <path
            d="M 700 120 C 920 260, 1150 280, 1450 350"
            fill="none"
            stroke="#ffb693"
            strokeWidth="1"
            opacity="0.4"
          />
          <circle cx="1050" cy="280" r="2" fill="#ffdbcb" opacity="0.8" />
          <circle cx="1160" cy="340" r="2.5" fill="#ff8a4c" opacity="0.5" />
        </svg>
      </motion.div>

      {/* ── Main Content ── */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 py-20 md:py-24"
        style={{ y: textY, opacity: opacityVal }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Left: Bio */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Location chip */}
            <motion.div
              {...ANIM(0)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit"
              style={{
                background: "#211f1e",
                border: "1px solid rgba(86,66,57,0.35)",
              }}
            >
              <span className="material-symbols-outlined text-[14px] text-[#ff8a4c]">
                location_on
              </span>
              <span
                className="text-xs text-[#cdc5be]"
                style={{ fontFamily: "var(--font-jetbrains-mono),monospace" }}
              >
                {contact.location}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span
                className="text-[10px] text-[#a58b80]"
                style={{ fontFamily: "var(--font-jetbrains-mono),monospace" }}
              >
                Available
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...ANIM(0.12)}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-none"
              style={{ color: "#e6e1df", letterSpacing: "-0.03em" }}
            >
              Building{" "}
              <span
                className="underline decoration-[#ff8a4c]/30 underline-offset-8"
                style={{ color: "#ff8a4c" }}
              >
                remarkable
              </span>{" "}
              apps for mobile &amp; web.
            </motion.h1>

            {/* About */}
            <motion.p
              {...ANIM(0.24)}
              className="text-base leading-relaxed max-w-2xl"
              style={{ color: "#cdc5be" }}
            >
              {about}
            </motion.p>

            {/* Badges */}
            <motion.div
              {...ANIM(0.36)}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              {[
                { label: "4+ Yrs Exp", sub: "Mobile & Web" },
                { label: "Multi-platform", sub: "iOS, Android, Web" },
                { label: "React Native", sub: "Flutter · Swift · Next.js" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="p-3 rounded-lg flex flex-col"
                  style={{
                    background: "#211f1e",
                    border: "1px solid rgba(86,66,57,0.3)",
                  }}
                >
                  <span
                    className="text-xs font-semibold"
                    style={{
                      color: "#ff8a4c",
                      fontFamily: "var(--font-jetbrains-mono),monospace",
                    }}
                  >
                    {b.label}
                  </span>
                  <span
                    className="text-[10px] mt-1"
                    style={{
                      color: "#a58b80",
                      fontFamily: "var(--font-jetbrains-mono),monospace",
                    }}
                  >
                    {b.sub}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              {...ANIM(0.48)}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="#experience"
                className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1.5"
                style={{
                  border: "1px solid rgba(86,66,57,0.4)",
                  color: "#cdc5be",
                }}
              >
                View Experience
                <span className="material-symbols-outlined text-[14px]">
                  arrow_downward
                </span>
              </a>

              <div className="flex items-center gap-2">
                {/* GitHub */}
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-150 hover:border-[#ff8a4c] hover:text-[#ff8a4c]"
                  style={{
                    background: "#211f1e",
                    border: "1px solid rgba(86,66,57,0.4)",
                    color: "#cdc5be",
                  }}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-150 hover:border-[#ff8a4c] hover:text-[#ff8a4c]"
                  style={{
                    background: "#211f1e",
                    border: "1px solid rgba(86,66,57,0.4)",
                    color: "#cdc5be",
                  }}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: Profile card with parallax */}
          <motion.div
            className="lg:col-span-5"
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          >
            <div
              className="relative rounded-xl overflow-hidden group transition-all duration-300"
              style={{
                background: "#211f1e",
                border: "1px solid rgba(86,66,57,0.4)",
              }}
            >
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src={profileImg}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                  unoptimized
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, #211f1e 0%, transparent 50%)",
                    opacity: 0.85,
                  }}
                />
              </div>

              <div className="p-4 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span
                    className="font-semibold text-base"
                    style={{ color: "#e6e1df" }}
                  >
                    {name}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-medium"
                    style={{
                      background: "#2b2a28",
                      border: "1px solid rgba(86,66,57,0.3)",
                      color: "#ff8a4c",
                      fontFamily: "var(--font-jetbrains-mono),monospace",
                    }}
                  >
                    {contact.location}
                  </span>
                </div>
                <p
                  className="text-xs"
                  style={{
                    color: "#cdc5be",
                    fontFamily: "var(--font-jetbrains-mono),monospace",
                  }}
                >
                  {title}
                </p>
                <div
                  className="flex items-center justify-between pt-2 mt-1 text-[10px]"
                  style={{
                    borderTop: "1px solid rgba(86,66,57,0.2)",
                    color: "#a58b80",
                    fontFamily: "var(--font-jetbrains-mono),monospace",
                  }}
                >
                  <span>React Native • Flutter • Next.js</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Open to work
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
