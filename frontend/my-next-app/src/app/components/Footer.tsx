import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GitHubIcon from '@/app/components/icons/GitHubIcon';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative w-full py-12 text-center text-gray-300 dark:text-gray-200 border-t border-gray-200/60 dark:border-gray-700/50 mt-8 md:mt-12 rounded-t-3xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 30%, rgba(15,23,42,0.95) 70%, rgba(0,0,0,0.98) 100%)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(34,197,94,0.3)",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-cyan-400/10 to-purple-400/10"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(6,182,212,0.1) 50%, rgba(168,85,247,0.1) 100%)",
            "linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(168,85,247,0.1) 50%, rgba(34,197,94,0.1) 100%)",
            "linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(34,197,94,0.1) 50%, rgba(6,182,212,0.1) 100%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <motion.div className="relative z-10">
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 mb-2 drop-shadow-lg">
        GAIA
        </h3>

        <div className="flex items-center justify-center gap-3 mb-1">
        <p className="text-lg font-medium text-gray-200">Your Green AI Assistant</p>
        <Link href="https://github.com/guilhermegranchopro/Eco-AI.ly" target="_blank" className="hover:scale-110 transition-transform">
            <GitHubIcon />
        </Link>
        </div>

                {/* Contact emails */}
        <div className="text-sm text-gray-400 mb-2">
          <p>
            <a href="mailto:d.alexandrino2010@gmail.com" className="underline hover:text-green-400">d.alexandrino2010@gmail.com</a>
            {" "} | {" "}
            <a href="mailto:guilhermegranchopro@gmail.com" className="underline hover:text-green-400">guilhermegranchopro@gmail.com</a>
          </p>
        </div>

        <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} GAIA. All rights reserved.</p>
        <p 
          className="text-xs mt-2 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500"
          style={{ backgroundSize: "300% auto", animation: "pulse 8s linear infinite" }}
        >
          Powered by AI • Built for Sustainability • Designed for the Future
        </p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;