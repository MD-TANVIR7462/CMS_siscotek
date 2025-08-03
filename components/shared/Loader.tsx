"use client";

import { motion } from "framer-motion";

const  CMSLoader=() =>{
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
      <motion.div className="flex gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="w-3 h-3 rounded-full bg-blue-600"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
export default CMSLoader