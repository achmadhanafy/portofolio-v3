"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", href: "#about", icon: "person" },
  { label: "Assistant", href: "#assistant", icon: "smart_toy" },
  { label: "Experience", href: "#experience", icon: "timeline" },
  { label: "Projects", href: "#projects", icon: "code_blocks" },
  { label: "Skills", href: "#skills", icon: "memory" },
  { label: "Contact", href: "#contact", icon: "mail" },
];

interface NavbarProps {
  name: string;
  title: string;
}

export default function Navbar({ name, title }: NavbarProps) {
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // update active section
      const sections = navItems.map((n) => n.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Desktop / Mobile Top Header ── */}
      <motion.header
        className="sticky top-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          background: scrolled
            ? "rgba(20,19,18,0.92)"
            : "rgba(20,19,18,0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(86,66,57,0.2)",
          boxShadow: scrolled
            ? "0 8px 32px -8px rgba(0,0,0,0.6)"
            : undefined,
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-5 md:px-12 py-3 flex items-center justify-between">
          {/* Brand */}
          <a href="#about" className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-200"
              style={{
                background: "#2b2a28",
                border: "1px solid rgba(86,66,57,0.4)",
                color: "#ff8a4c",
                fontFamily: "var(--font-jetbrains-mono), monospace",
              }}
            >
              {initials}
            </div>
            <div className="hidden sm:flex flex-col">
              <span
                className="font-semibold text-sm leading-none"
                style={{ color: "#e6e1df" }}
              >
                {name.toUpperCase()}
              </span>
              <span
                className="text-[10px] mt-0.5 tracking-wider"
                style={{
                  color: "#a58b80",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                }}
              >
                {title}
              </span>
            </div>
          </a>

          {/* Desktop Nav Pills */}
          <nav
            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(15,14,13,0.7)",
              border: "1px solid rgba(86,66,57,0.2)",
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActive(item.href.slice(1))}
                className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  color:
                    active === item.href.slice(1) ? "#ff8a4c" : "#cdc5be",
                  background:
                    active === item.href.slice(1)
                      ? "rgba(255,138,76,0.1)"
                      : "transparent",
                  borderBottom:
                    active === item.href.slice(1)
                      ? "1px solid rgba(255,138,76,0.5)"
                      : "1px solid transparent",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-150 glow-orange"
            style={{
              background: "#ff8a4c",
              color: "#141312",
            }}
          >
            Get in Touch
            <span className="material-symbols-outlined text-[14px]">
              arrow_outward
            </span>
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "#cdc5be" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-xl">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile Chip Rail */}
        <div
          className="md:hidden border-t overflow-x-auto no-scrollbar flex items-center gap-2 px-5 py-2"
          style={{ borderColor: "rgba(86,66,57,0.2)" }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActive(item.href.slice(1))}
              className="whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-semibold transition-all duration-150 active:scale-95 flex items-center gap-1"
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                background:
                  active === item.href.slice(1)
                    ? "rgba(255,138,76,0.15)"
                    : "#1c1b1a",
                color:
                  active === item.href.slice(1) ? "#ff8a4c" : "#a58b80",
                border:
                  active === item.href.slice(1)
                    ? "1px solid rgba(255,138,76,0.4)"
                    : "1px solid rgba(86,66,57,0.3)",
              }}
            >
              {item.label === "Assistant" && (
                <span className="material-symbols-outlined text-[10px]">
                  smart_toy
                </span>
              )}
              {item.label}
            </a>
          ))}
        </div>
      </motion.header>

      {/* ── Mobile Bottom Tab Bar ── */}
      <div
        className="fixed bottom-0 left-0 w-full z-50 md:hidden flex justify-around items-center px-2 py-1 no-scrollbar"
        style={{
          background: "rgba(33,31,30,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(86,66,57,0.25)",
          boxShadow: "0 -12px 32px -8px rgba(0,0,0,0.65)",
        }}
      >
        {navItems.map((item) => {
          const isActive = active === item.href.slice(1);
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActive(item.href.slice(1))}
              className="flex flex-col items-center justify-center py-1 px-2 active:scale-90 transition-transform duration-150"
            >
              <span
                className="material-symbols-outlined text-xl mb-0.5 transition-colors"
                style={{
                  color: isActive ? "#ff8a4c" : "#a58b80",
                  fontVariationSettings: isActive
                    ? "'FILL' 1, 'wght' 500"
                    : "'FILL' 0, 'wght' 400",
                }}
              >
                {item.icon}
              </span>
              <span
                className="text-[9px] font-medium transition-colors"
                style={{
                  color: isActive ? "#ff8a4c" : "#a58b80",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                }}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </>
  );
}
