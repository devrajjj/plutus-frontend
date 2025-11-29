'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AbstractShapes from './components/AbstractShapes';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-stone-50 to-amber-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 overflow-hidden">
      <AbstractShapes />
      <div className="relative z-10 container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-stone-900 dark:text-white mb-6"
          >
            Welcome to Plutus
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-stone-700 dark:text-blue-100 mb-8"
          >
            Modern solutions for your business needs
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View Dashboard
            </Link>
            <a
              href="https://www.linkedin.com/in/debraj-maity/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-stone-50 dark:bg-white/10 dark:backdrop-blur-sm text-stone-900 dark:text-white rounded-lg border border-stone-200 dark:border-white/20 hover:bg-stone-100 dark:hover:bg-white/20 transition-colors font-medium"
            >
              Learn More About Author
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
