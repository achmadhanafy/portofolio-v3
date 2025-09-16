import React, { useState } from 'react'
import { motion } from "framer-motion";
import { itemVariants, sectionVariants } from '@/config/framer-motion';

function ContactSection() {
  const [message, setMessage] = useState("");

  return (
    <motion.div
      id="contact"
      className="flex flex-col items-center justify-center h-full p-4 md:p-8"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        variants={itemVariants}
        className="text-4xl font-bold text-white mb-8"
      >
        Get In Touch
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-gray-300 mb-12 text-center max-w-xl"
      >
        I&apos;m currently open to new opportunities. If you have a project in
        mind or just want to say hi, feel free to reach out!
      </motion.p>
      <motion.div
        variants={itemVariants}
        className="w-full max-w-lg bg-gray-800/50 p-8 rounded-lg shadow-lg"
      >
        <form
          onSubmit={() => {
            window.location.href = `mailto:achmadhanafy@gmail.com?subject=${encodeURIComponent(
              "Get In Touch"
            )}&body=${message}`;
          }}
        >
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-purple-300 text-sm font-bold mb-2"
            >
              Message
            </label>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              id="message"
              rows={4}
              className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
          <div className="text-center flex flex-col md:flex-row gap-4">
            <motion.button
              type="submit"
              className="w-full md:w-1/2 bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg"
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 0px 20px rgba(116, 114, 119, 1)",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Send Email
            </motion.button>
            <motion.a
              target="_blank"
              href={`https://wa.me/6289635019520?text=${message}`}
              className="w-full md:w-1/2 bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg"
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 0px 20px rgb(168, 85, 247)",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Send Message
            </motion.a>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default ContactSection