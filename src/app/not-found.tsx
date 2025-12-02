"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br
     from-gray-900 via-black to-gray-800 text-white px-6">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >

        <h1 className="text-8xl font-bold bg-clip-text text-transparent 
          bg-linear-to-r from-indigo-400 to-purple-500 drop-shadow-lg">
          404
        </h1>

        <p className="text-xl text-gray-300 mt-3">
          The page you are looking for doesn&apos;t exist.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-block"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600
             hover:bg-indigo-700 transition font-medium shadow-lg"
          >
            <Home size={20} /> Go to Home
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}
