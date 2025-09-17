import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { itemVariants, sectionVariants } from "@/config/framer-motion";
import Image from "next/image";
import profileJson from "../../mock/profile.json";
import GithubIcon from "../icon-components/GithubIcon";
import LinkedInIcon from "../icon-components/LinkedInIcon";
import SendIcon from "../icon-components/SendIcon";
import { useChatbotMutation } from "@/lib/services/chatApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  section?: 'home' | 'ai-chatbot'
}

function HomeSection({section}:Props) {
  // ChatBot API
  const [fetchChatbot, resultChatbot] = useChatbotMutation();

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm Hanafy's AI assistant. Feel free to ask me anything about him skills, experience, or projects.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(section === 'ai-chatbot'){
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  },[section])

  useEffect(() => {
    if(resultChatbot.isUninitialized){
      return;
    }
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, resultChatbot.isLoading, resultChatbot.isUninitialized]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (text === "") return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");

    fetchChatbot({
      message: text,
    })
      .then((res) => {
        const sampleResponse = res.data?.response;
        if (sampleResponse) {
          setMessages((prev) => [
            ...prev,
            { sender: "ai", text: sampleResponse },
          ]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch chatbot response:", err);
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Oops! Something went wrong. Please try again later.",
          },
        ]);
      });
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full text-center px-4 w-full"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full max-w-6xl">
        {/* Left Side: Personal Info */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-center"
          variants={itemVariants}
        >
          <motion.div
            className="w-40 h-40 rounded-full border-4 border-purple-400 shadow-lg mb-6 relative"
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              alt="Profile image"
              src={profileJson.profile_img}
              fill
              className="object-cover rounded-full"
            />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight"
          >
            Hi, I&apos;m{" "}
            <span className="text-purple-400">{profileJson.name}</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl"
          >
            {profileJson.about}
          </motion.p>
          <motion.div variants={itemVariants} className="flex space-x-6 mt-8">
            <a
              href="#"
              className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
            >
              <GithubIcon />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
            >
              <LinkedInIcon />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Chatbot */}
        <motion.div
          id="ai-assistance"
          className="w-full lg:w-1/2 h-[60vh] max-h-[700px] flex flex-col bg-gray-800/50 rounded-2xl shadow-2xl shadow-purple-500/10 border border-gray-700"
          variants={itemVariants}
        >
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">
              AI Personal Assistant
            </h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div
                    className={`max-w-xs text-left md:max-w-md px-4 py-2 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-gray-700 text-gray-200 rounded-bl-none"
                    }`}
                  >
                     <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {resultChatbot.isLoading && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-gray-700 text-gray-200 rounded-2xl rounded-bl-none px-4 py-2 flex items-center space-x-1">
                  <motion.span
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-gray-700 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask something..."
              className="w-full bg-gray-700 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="p-2 rounded-full text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              <SendIcon />
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default HomeSection;
