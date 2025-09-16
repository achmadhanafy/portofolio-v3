import React from 'react'
import { motion } from "framer-motion";
import { sectionVariants } from '@/config/framer-motion';
import Title from '../Text/Title';
import profileJson from "../../mock/profile.json";
import LinkIcon from '../icon-components/LinkIcon';
import DribbleHoverAnimation from '../animated/DribbleHoverAnimation';
import Image from 'next/image';

function ExperienceSection() {
  return (
  <motion.div
    id="experiences"
    className="flex flex-col items-center justify-center h-full p-4 md:p-8"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <Title>Work Experience</Title>
    <div className="w-full max-w-3xl relative mt-5">
      <motion.div
        className="hidden md:block md:absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-600"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      ></motion.div>

      <div className="space-y-12">
        {profileJson?.work_experience?.map((job, index) => {
          const isLeft = index % 2 === 0;

          const projectContribution = () => {
            return (
              <div className="flex flex-col items-end gap-4 mt-5">
                {job.contribution.map((p) => (
                  <motion.div
                    onClick={() => {
                      if (p.url) window.open(p.url, "_blank");
                    }}
                    key={p.name}
                    className="bg-gray-800/70 p-4 rounded-lg w-full max-w-sm text-left relative"
                    whileHover={
                      p.url
                        ? { scale: 1.05, borderColor: "#a78bfa" }
                        : undefined
                    }
                    style={{ border: "1px solid transparent" }}
                  >
                    <h5 className="font-bold text-white">{p.name}</h5>
                    <p className="text-sm text-gray-400">{p.description}</p>
                    <p className="text-sm text-purple-400 font-semibold mt-3">
                      {p.tech}
                    </p>
                    <div className="flex items-center justify-end space-x-4">
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-4 text-xs right-4 text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-1"
                        >
                          View Site <LinkIcon />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          };

          return (
            // Mobile Version
            <motion.div key={index}>
              <motion.div
                className="block md:hidden"
                custom={index}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="bg-gray-800/60 rounded-md p-4 relative pt-20">
                  <DribbleHoverAnimation className="absolute left-1/2 top-[-30px] -translate-x-1/2 w-24 h-24 rounded-full bg-purple-500 border-4 border-gray-800 flex-shrink-0 z-10">
                    <Image
                      alt={job.company}
                      src={job.img}
                      fill
                      className="object-cover rounded-full"
                    />
                  </DribbleHoverAnimation>
                  <div className="text-purple-400 font-bold">{job.role}</div>
                  <div className="text-sm text-gray-400">{job.company}</div>
                  <div className="text-xs mb-3 text-gray-500">{job.date}</div>
                  <p className="text-gray-300 mt-2">{job.responsibilities}</p>
                  {projectContribution()}
                </div>
              </motion.div>

              {/* Dekstop */}
              <motion.div
                className="hidden md:flex items-center w-full"
                custom={index}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {isLeft ? (
                  <>
                    <div className="w-1/2 pr-8 text-right">
                      <h3 className="text-xl font-bold text-purple-400">
                        {job.role}
                      </h3>
                      <p className="text-gray-400">{job.company}</p>
                      <p className="text-sm text-gray-500 mb-2">{job.date}</p>
                      <p className="text-gray-300 mt-2">
                        {job.responsibilities}
                      </p>
                      {projectContribution()}
                    </div>
                    <a target="_blank" href={job.url}>
                      <DribbleHoverAnimation className="w-24 h-24 relative rounded-full border-4 border-purple-500 flex-shrink-0 z-10">
                        <Image
                          alt={job.company}
                          src={job.img}
                          fill
                          className="object-cover rounded-full"
                        />
                      </DribbleHoverAnimation>
                    </a>
                    <div className="w-1/2 pl-8"></div>
                  </>
                ) : (
                  <>
                    <div className="w-1/2 pr-8"></div>
                    <a target="_blank" href={job.url}>
                      <DribbleHoverAnimation className="w-24 h-24 relative rounded-full border-4 border-purple-500 flex-shrink-0 z-10">
                        <Image
                          alt={job.company}
                          src={job.img}
                          fill
                          className="object-cover rounded-full"
                        />
                      </DribbleHoverAnimation>
                    </a>
                    <div className="w-1/2 pl-8 text-left">
                      <h3 className="text-xl font-bold text-purple-400">
                        {job.role}
                      </h3>
                      <p className="text-gray-400">{job.company}</p>
                      <p className="text-sm text-gray-500 mb-2">{job.date}</p>
                      <p className="text-gray-300 mt-2">
                        {job.responsibilities}
                      </p>
                      {projectContribution()}
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </motion.div>
);
}

export default ExperienceSection