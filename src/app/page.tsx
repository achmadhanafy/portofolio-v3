import profile from "@/mock/profile.json";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import ChatbotSection from "@/components/portfolio/ChatbotSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ContactSection from "@/components/portfolio/ContactSection";

export default function App() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#141312", color: "#e6e1df" }}
    >
      {/* Material Symbols font */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
      />

      <Navbar name={profile.name} title={profile.title} />

      <main className="flex-1 pb-16 md:pb-0">
        <HeroSection
          name={profile.name}
          title={profile.title}
          about={profile.about}
          profileImg={profile.profile_img}
          github={profile.github}
          linkedin={profile.linkedin}
          contact={profile.contact}
        />

        <ChatbotSection name={profile.name} about={profile.about} />

        <ExperienceSection experiences={profile.work_experience} />

        <ProjectsSection projects={profile.projects} />

        <SkillsSection skills={profile.skills} />

        <ContactSection
          name={profile.name}
          contact={profile.contact}
          github={profile.github}
          linkedin={profile.linkedin}
        />
      </main>

      {/* Footer */}
      <footer
        className="border-t py-8"
        style={{
          background: "#0f0e0d",
          borderColor: "rgba(86,66,57,0.2)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <span
              className="font-semibold text-sm"
              style={{ color: "#e6e1df" }}
            >
              {profile.name.toUpperCase()}
            </span>
            <span className="hidden md:inline" style={{ color: "#564239" }}>
              |
            </span>
            <span
              className="text-[11px] text-center md:text-left"
              style={{
                color: "#a58b80",
                fontFamily: "var(--font-jetbrains-mono), monospace",
              }}
            >
              © {new Date().getFullYear()} {profile.name}. Obsidian & Burnt
              Orange Design.
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {[
              { label: "About", href: "#about" },
              { label: "Experience", href: "#experience" },
              { label: "Projects", href: "#projects" },
              { label: "Contact", href: "#contact" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[11px] transition-colors hover:text-[#ff8a4c]"
                style={{
                  color: "#a58b80",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#about"
            className="flex items-center gap-1 text-xs transition-colors hover:text-[#ff8a4c]"
            style={{
              color: "#cdc5be",
              fontFamily: "var(--font-jetbrains-mono), monospace",
            }}
          >
            Back to Top
            <span className="material-symbols-outlined text-[14px]">
              arrow_upward
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}
