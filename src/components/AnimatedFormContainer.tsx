'use client';

import React from "react";
import { motion } from 'framer-motion';

interface AnimatedFormContainerProps {
  children: React.ReactNode;
  title: string;
}

const AnimatedFormContainer: React.FC<AnimatedFormContainerProps> = ({ children, title }) => {
  // Animation variants for form elements - simplified to prevent glitches
  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: -10
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 5
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2,
        staggerChildren: 0.05
      }
    }
  };

  return (
    <>
      <motion.h2 
        className="text-3xl font-bold mb-4 text-center text-white relative"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        <span className="bg-gradient-to-r from-[#a970ff] to-[#8a4fff] text-transparent bg-clip-text">
          {title}
        </span>
      </motion.h2>
      
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </>
  );
};

export default AnimatedFormContainer;
