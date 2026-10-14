"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  ts: string;
}

const QUICK_PROMPTS = [
  "What is your main tech stack?",
  "Tell me about your experience",
  "What projects have you built?",
  "Are you open to work?",
];

interface ChatbotSectionProps {
  name: string;
  about: string;
}

export default function ChatbotSection({ name, about }: ChatbotSectionProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: `Hi! I'm **${name}'s AI Assistant**. 🚀\n\nAsk me anything about his **skills**, **projects**, or **experience**!`,
      ts: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const now = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
      ts: now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), conversationId }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.conversationId) setConversationId(data.conversationId);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "_bot",
            role: "bot",
            text: data.response || "I couldn't process that. Please try again!",
            ts: now(),
          },
        ]);
      } else {
        throw new Error("API error");
      }
    } catch {
      // Fallback local response with rich markdown formatting
      const localResponse = buildLocalResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_bot",
          role: "bot",
          text: localResponse,
          ts: now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const buildLocalResponse = (q: string): string => {
    const lower = q.toLowerCase();
    if (lower.includes("stack") || lower.includes("tech") || lower.includes("skill")) {
      return `### 🛠️ Core Technical Stack\n\n**${name}**'s primary architectural toolkit includes:\n\n- 📱 **Mobile Development:** \`React Native\`, \`Flutter\`, \`Swift (UIKit)\`, \`Expo\`\n- 🌐 **Frontend Development:** \`Next.js\`, \`React\`, \`TypeScript\`, \`Tailwind CSS\`, \`Storybook\`\n- ⚙️ **Backend & Tools:** \`Node.js\`, \`Express\`, \`Redux\`, \`Firebase\`, \`Git\`\n\n> Specialized in building scalable architectures, dynamic theming, and native bridges with fluid 120fps animations.`;
    }
    if (lower.includes("experience") || lower.includes("work") || lower.includes("career")) {
      return `### 💼 Professional Journey\n\n**${name}** has **4+ years** of professional experience delivering high-impact software:\n\n1. **CODE Development Indonesia** *(Jul 2023 – Present)*  \n   *Mobile Software Developer* — Cross-platform client apps (React Native, Flutter, Swift), e-commerce and streaming.\n2. **Farmbyte (Malaysia)** *(Oct 2024 – Sep 2025)*  \n   *Mobile Developer (Freelance)* — Marketplace apps, custom \`rn-adaptbyte\` library, and Unistyles integration.\n3. **Paramatech** *(May 2022 – Jul 2023)*  \n   *Frontend Developer* — Life by IFG, administrative portals, Next.js, and React Native.\n4. **ASEAN Fintech Group** *(Mar 2022 – May 2022)*  \n   *Fullstack Developer* — GatsbyJS, TypeORM, REST APIs, and database migrations.`;
    }
    if (lower.includes("project") || lower.includes("app") || lower.includes("build")) {
      return `### 🚀 Featured Production Projects\n\nHere are notable systems built and maintained by **${name}**:\n\n- 📱 **Life by IFG** — Official digital insurance hub with policy subscription management.\n- 🌾 **Farmbyte Grow** — Comprehensive seller center app for Malaysian farmers.\n- 🔧 **Astraotoshop** — Automotive spare parts marketplace by Astra Otoparts.\n- 📦 **RN Adaptbyte** — Custom reusable UI component library published on [NPM](https://www.npmjs.com/package/rn-adaptbyte).\n- 📹 **Nuun** — Smart CCTV device connection and real-time motion detection monitoring.\n\nExplore full details in the [Projects section](#projects) above!`;
    }
    if (lower.includes("available") || lower.includes("open") || lower.includes("hire") || lower.includes("contact")) {
      return `### ✨ Availability & Contact\n\n**${name}** is currently **open to new opportunities** for Mobile & Frontend engineering roles!\n\n- 📧 **Direct Email:** [achmadhanafy@gmail.com](mailto:achmadhanafy@gmail.com)\n- 📍 **Location:** Bogor / Jakarta, Indonesia (Open to Remote & Hybrid)\n- 💬 You can also drop a quick message directly in the [Contact section](#contact) below.`;
    }
    return `${about}\n\nFeel free to ask for specific details about his **tech stack**, **projects**, or **experience**!`;
  };

  return (
    <section
      id="assistant"
      className="relative py-20 md:py-24 overflow-hidden border-b"
      style={{
        background: "rgba(28,27,26,0.4)",
        borderColor: "rgba(86,66,57,0.2)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 55%, rgba(255,138,76,0.13) 0%, rgba(255,138,76,0.03) 45%, transparent 70%)",
        }}
      />
      {/* SVG arc */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 600"
      >
        <defs>
          <linearGradient id="botArc" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ff8a4c" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffb693" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff8a4c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 100 480 Q 720 300 1340 480"
          fill="none"
          stroke="url(#botArc)"
          strokeWidth="2"
        />
        <ellipse
          cx="720"
          cy="350"
          rx="220"
          ry="3"
          fill="#ff8a4c"
          opacity="0.35"
        />
      </svg>

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
            style={{
              background: "#2b2a28",
              border: "1px solid rgba(86,66,57,0.35)",
            }}
          >
            <span className="material-symbols-outlined text-[14px] text-[#ff8a4c]">
              psychology
            </span>
            <span
              className="text-xs font-medium text-[#ff8a4c]"
              style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
            >
              AI Portfolio Assistant
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "#e6e1df", letterSpacing: "-0.02em" }}
          >
            Ask Me Anything
          </h2>
          <p className="text-sm mt-2" style={{ color: "#cdc5be" }}>
            An AI assistant trained on {name}&apos;s experience, projects, and
            skills with full markdown support.
          </p>
        </motion.div>

        {/* Terminal chat window */}
        <motion.div
          className="rounded-xl overflow-hidden shadow-2xl"
          style={{
            background: "#211f1e",
            border: "1px solid rgba(86,66,57,0.4)",
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Title bar */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{
              background: "#2b2a28",
              borderBottom: "1px solid rgba(86,66,57,0.3)",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span
                className="ml-2 text-xs text-[#cdc5be]"
                style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
              >
                {name.toLowerCase().replace(" ", "-")}-ai-assistant.sh
              </span>
            </div>
            <div
              className="flex items-center gap-1.5 text-[10px] text-[#a58b80]"
              style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Online // Markdown Enabled
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="p-5 space-y-4 overflow-y-auto no-scrollbar"
            style={{
              minHeight: 280,
              maxHeight: 440,
              background: "rgba(15,14,13,0.6)",
            }}
          >
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex items-start gap-3 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "bot" && (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm"
                      style={{
                        background: "#ff8a4c",
                        color: "#141312",
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                      }}
                    >
                      {initials}
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                      msg.role === "user"
                        ? "rounded-tr-sm"
                        : "rounded-tl-sm shadow-md"
                    }`}
                    style={{
                      background:
                        msg.role === "user" ? "#2b2a28" : "#211f1e",
                      border: "1px solid rgba(86,66,57,0.4)",
                      color: "#e6e1df",
                    }}
                  >
                    <div className="flex items-center justify-between mb-1.5 gap-4">
                      <span
                        className="text-[10px] font-semibold"
                        style={{
                          color:
                            msg.role === "user" ? "#a58b80" : "#ff8a4c",
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                        }}
                      >
                        {msg.role === "user" ? "YOU" : `${initials} BOT • RAG`}
                      </span>
                      <span
                        className="text-[9px]"
                        style={{
                          color: "#564239",
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                        }}
                      >
                        {msg.ts}
                      </span>
                    </div>

                    {/* Markdown Renderer for Bot and User */}
                    <div className="text-sm leading-relaxed overflow-hidden">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0 leading-relaxed text-[#e6e1df]">
                              {children}
                            </p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-[#ffb693]">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic text-[#cdc5be]">{children}</em>
                          ),
                          h1: ({ children }) => (
                            <h1 className="text-base font-bold text-[#e6e1df] mb-2 mt-3 first:mt-0 pb-1 border-b border-[#564239]/30">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-sm font-bold text-[#e6e1df] mb-1.5 mt-2.5 first:mt-0">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-xs font-semibold text-[#ff8a4c] mb-1 mt-2 first:mt-0">
                              {children}
                            </h3>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-5 mb-2.5 space-y-1 text-sm text-[#cdc5be] marker:text-[#ff8a4c]">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-5 mb-2.5 space-y-1 text-sm text-[#cdc5be] marker:text-[#ff8a4c]">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="leading-relaxed">{children}</li>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-2 border-[#ff8a4c] pl-3 my-2 text-xs italic text-[#cdc5be] bg-[#1c1b1a]/70 py-1.5 rounded-r">
                              {children}
                            </blockquote>
                          ),
                          code: ({ className, children, ...props }) => {
                            const match = /language-(\w+)/.exec(className || "");
                            const isInline = !match && !String(children).includes("\n");
                            if (isInline) {
                              return (
                                <code
                                  className="px-1.5 py-0.5 rounded text-[11px] bg-[#141312] border border-[#564239]/50 text-[#ffb693] font-mono"
                                  style={{
                                    fontFamily:
                                      "var(--font-jetbrains-mono), monospace",
                                  }}
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            }
                            return (
                              <div className="my-2 rounded-lg overflow-hidden border border-[#564239]/40 bg-[#0f0e0d]">
                                {match && (
                                  <div className="px-3 py-1 bg-[#1c1b1a] border-b border-[#564239]/30 text-[10px] text-[#a58b80] font-mono flex items-center justify-between">
                                    <span>{match[1]}</span>
                                  </div>
                                )}
                                <pre className="p-3 overflow-x-auto text-xs text-[#e6e1df] font-mono leading-normal no-scrollbar">
                                  <code
                                    className={className}
                                    style={{
                                      fontFamily:
                                        "var(--font-jetbrains-mono), monospace",
                                    }}
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                </pre>
                              </div>
                            );
                          },
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target={href?.startsWith("#") ? undefined : "_blank"}
                              rel={href?.startsWith("#") ? undefined : "noopener noreferrer"}
                              className="text-[#ff8a4c] underline decoration-[#ff8a4c]/40 hover:decoration-[#ff8a4c] font-medium transition-colors"
                            >
                              {children}
                            </a>
                          ),
                          table: ({ children }) => (
                            <div className="my-2.5 overflow-x-auto rounded border border-[#564239]/40 no-scrollbar">
                              <table className="min-w-full divide-y divide-[#564239]/30 text-xs text-left">
                                {children}
                              </table>
                            </div>
                          ),
                          thead: ({ children }) => (
                            <thead className="bg-[#1c1b1a] text-[#ff8a4c]">
                              {children}
                            </thead>
                          ),
                          th: ({ children }) => (
                            <th className="px-3 py-1.5 font-semibold text-[11px]">
                              {children}
                            </th>
                          ),
                          td: ({ children }) => (
                            <td className="px-3 py-1.5 border-t border-[#564239]/20 text-[#cdc5be]">
                              {children}
                            </td>
                          ),
                          hr: () => (
                            <hr className="my-2.5 border-[#564239]/30" />
                          ),
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                  {msg.role === "user" && (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                      style={{
                        background: "#363433",
                        color: "#a58b80",
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                        border: "1px solid rgba(86,66,57,0.4)",
                      }}
                    >
                      U
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      background: "#ff8a4c",
                      color: "#141312",
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                    }}
                  >
                    {initials}
                  </div>
                  <div
                    className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
                    style={{
                      background: "#211f1e",
                      border: "1px solid rgba(86,66,57,0.4)",
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#ff8a4c]"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.9,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick prompts */}
          <div
            className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar"
            style={{ borderTop: "1px solid rgba(86,66,57,0.2)" }}
          >
            <span
              className="text-[10px] text-[#a58b80] self-center shrink-0"
              style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
            >
              SUGGESTED:
            </span>
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="whitespace-nowrap text-[11px] px-3 py-1.5 rounded-lg transition-all duration-150 active:scale-95 hover:border-[#ff8a4c]/50 hover:text-[#ff8a4c]"
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  background: "#2b2a28",
                  border: "1px solid rgba(86,66,57,0.35)",
                  color: "#cdc5be",
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-3 p-4"
            style={{ borderTop: "1px solid rgba(86,66,57,0.25)" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, projects, or availability..."
              className="flex-1 rounded-lg px-4 py-2.5 text-sm outline-none transition-all duration-150"
              style={{
                background: "#0f0e0d",
                border: "1px solid rgba(86,66,57,0.4)",
                color: "#e6e1df",
                fontFamily: "var(--font-plus-jakarta), sans-serif",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,138,76,0.6)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "rgba(86,66,57,0.4)")
              }
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-150 active:scale-95 glow-orange disabled:opacity-40"
              style={{ background: "#ff8a4c", color: "#141312" }}
            >
              <span className="material-symbols-outlined text-lg font-bold">
                send
              </span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
