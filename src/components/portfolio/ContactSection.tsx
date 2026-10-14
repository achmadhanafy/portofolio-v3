"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ContactInfo {
  phone: string;
  email: string;
  portfolio: string;
  location: string;
}

interface ContactSectionProps {
  name: string;
  contact: ContactInfo;
  github: string;
  linkedin: string;
}

export default function ContactSection({
  name,
  contact,
  github,
  linkedin,
}: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sending) return;
    setSending(true);
    // Simulate sending (replace with real endpoint if available)
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setMessage("");
      setTimeout(() => setSent(false), 3500);
    }, 900);
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-24 overflow-hidden border-b"
      style={{ borderColor: "rgba(86,66,57,0.2)" }}
    >
      {/* Bottom radial glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 100%, rgba(255,138,76,0.20) 0%, rgba(255,110,30,0.06) 45%, transparent 75%)",
        }}
      />
      {/* SVG light rays */}
      <svg
        className="absolute inset-0 w-full h-full opacity-55 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 700"
      >
        <defs>
          <linearGradient id="contactRay1" x1="50%" y1="100%" x2="15%" y2="10%">
            <stop offset="0%" stopColor="#ff8a4c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff8a4c" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="contactRay2" x1="50%" y1="100%" x2="85%" y2="10%">
            <stop offset="0%" stopColor="#ff8a4c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff8a4c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M 720 700 L 200 80" stroke="url(#contactRay1)" strokeWidth="1.5" opacity="0.5" />
        <path d="M 720 700 L 1240 80" stroke="url(#contactRay2)" strokeWidth="1.5" opacity="0.5" />
        <path
          d="M 100 680 Q 720 590 1340 680"
          fill="none"
          stroke="#ff8a4c"
          strokeWidth="2"
          opacity="0.6"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: Contact Info */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-between"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
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
                  alternate_email
                </span>
                <span
                  className="text-xs font-medium text-[#ff8a4c]"
                  style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
                >
                  Direct Line
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "#e6e1df", letterSpacing: "-0.02em" }}
              >
                Let&apos;s build something extraordinary.
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "#cdc5be" }}>
                Open to exciting full-time roles, freelance projects, and
                meaningful collaborations. Drop a message!
              </p>

              {/* Email card */}
              <div
                className="rounded-xl p-4 mb-4 flex items-center justify-between"
                style={{
                  background: "#211f1e",
                  border: "1px solid rgba(86,66,57,0.3)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#ff8a4c]">
                    mail
                  </span>
                  <div>
                    <span
                      className="text-[10px] block"
                      style={{
                        color: "#a58b80",
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                      }}
                    >
                      DIRECT EMAIL
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{
                        color: "#e6e1df",
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                      }}
                    >
                      {contact.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-all duration-150 active:scale-95"
                  style={{
                    background: copied ? "rgba(52,199,89,0.1)" : "#2b2a28",
                    border: copied
                      ? "1px solid rgba(52,199,89,0.4)"
                      : "1px solid rgba(86,66,57,0.3)",
                    color: copied ? "#34c759" : "#cdc5be",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                  }}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copied ? "check" : "content_copy"}
                  </span>
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { label: "LOCATION", value: contact.location },
                  { label: "PHONE", value: contact.phone },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-3.5 rounded-lg"
                    style={{
                      background: "#211f1e",
                      border: "1px solid rgba(86,66,57,0.2)",
                    }}
                  >
                    <span
                      className="text-[10px] block mb-1"
                      style={{
                        color: "#a58b80",
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{
                        color: "#e6e1df",
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs transition-colors hover:text-[#ff8a4c]"
                  style={{
                    color: "#cdc5be",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                  }}
                >
                  <span className="material-symbols-outlined text-base">terminal</span>
                  GitHub
                </a>
                <span style={{ color: "#564239" }}>•</span>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs transition-colors hover:text-[#ff8a4c]"
                  style={{
                    color: "#cdc5be",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                  }}
                >
                  <span className="material-symbols-outlined text-base">work</span>
                  LinkedIn
                </a>
                <span style={{ color: "#564239" }}>•</span>
                <a
                  href={contact.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs transition-colors hover:text-[#ff8a4c]"
                  style={{
                    color: "#cdc5be",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                  }}
                >
                  <span className="material-symbols-outlined text-base">language</span>
                  Portfolio
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Message form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div
              className="rounded-xl p-6 shadow-xl"
              style={{
                background: "#211f1e",
                border: "1px solid rgba(86,66,57,0.4)",
              }}
            >
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "#e6e1df" }}
              >
                Send a Message
              </h3>
              <p className="text-sm mb-6" style={{ color: "#cdc5be" }}>
                I&apos;ll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSend} className="space-y-4">
                <div>
                  <label
                    className="block text-[10px] mb-1.5"
                    style={{
                      color: "#a58b80",
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                    }}
                  >
                    YOUR MESSAGE *
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Hi ${name}, I'd love to discuss...`}
                    rows={5}
                    className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-150 resize-none"
                    style={{
                      background: "#0f0e0d",
                      border: "1px solid rgba(86,66,57,0.4)",
                      color: "#e6e1df",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,138,76,0.6)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(86,66,57,0.4)")
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending || !message.trim()}
                  className="w-full py-3.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] glow-orange disabled:opacity-50"
                  style={{
                    background: sent ? "#27c93f" : "#ff8a4c",
                    color: "#141312",
                  }}
                >
                  {sending ? (
                    <>
                      <span className="material-symbols-outlined text-lg animate-spin">
                        sync
                      </span>
                      Sending...
                    </>
                  ) : sent ? (
                    <>
                      <span className="material-symbols-outlined text-lg">
                        check_circle
                      </span>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">
                        send
                      </span>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
