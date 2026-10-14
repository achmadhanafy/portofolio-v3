"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      text: `Hi! I'm ${name}'s AI Assistant. Ask me anything about his skills, projects, or experience!`,
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
            text: data.response || "I couldn't process that. Try again!",
            ts: now(),
          },
        ]);
      } else {
        throw new Error("API error");
      }
    } catch {
      // Fallback local response
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
    if (lower.includes("stack") || lower.includes("tech")) {
      return `${name}'s core stack: React Native, Flutter (mobile), Next.js / TypeScript (web), Swift UIKit (iOS), and Node.js / Express (backend). He's also proficient in Redux, Firebase, and Git workflows.`;
    }
    if (lower.includes("experience") || lower.includes("work")) {
      return `${name} has 4+ years of professional experience as a Mobile & Frontend Developer at companies like CODE Development Indonesia, Farmbyte (Malaysia), Paramatech, and ASEAN Fintech Group.`;
    }
    if (lower.includes("project")) {
      return `Notable projects include Life by IFG, Farmbyte Grow, One by IFG, Astraotoshop, and a custom React Native library called RN Adaptbyte published on NPM!`;
    }
    if (lower.includes("available") || lower.includes("open") || lower.includes("hire")) {
      return `${name} is currently open to new opportunities! Feel free to reach out via the contact section below or directly at achmadhanafy@gmail.com.`;
    }
    return `${about} Feel free to ask more specific questions about his skills, projects, or experience!`;
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
            skills. Ask away!
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
            <div className="flex items-center gap-1.5 text-[10px] text-[#a58b80]"
              style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Online
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="p-5 space-y-4 overflow-y-auto no-scrollbar"
            style={{
              minHeight: 260,
              maxHeight: 420,
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
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
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
                    className={`max-w-[82%] px-4 py-3 rounded-2xl ${
                      msg.role === "user"
                        ? "rounded-tr-sm"
                        : "rounded-tl-sm shadow-md"
                    }`}
                    style={{
                      background:
                        msg.role === "user" ? "#2b2a28" : "#211f1e",
                      border:
                        msg.role === "user"
                          ? "1px solid rgba(86,66,57,0.4)"
                          : "1px solid rgba(86,66,57,0.4)",
                      color: "#e6e1df",
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-[10px] font-semibold"
                        style={{
                          color:
                            msg.role === "user" ? "#a58b80" : "#ff8a4c",
                          fontFamily:
                            "var(--font-jetbrains-mono), monospace",
                        }}
                      >
                        {msg.role === "user" ? "YOU" : `${initials} BOT`}
                      </span>
                      <span
                        className="text-[9px]"
                        style={{
                          color: "#564239",
                          fontFamily:
                            "var(--font-jetbrains-mono), monospace",
                        }}
                      >
                        {msg.ts}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#e6e1df" }}>
                      {msg.text}
                    </p>
                  </div>
                  {msg.role === "user" && (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
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
