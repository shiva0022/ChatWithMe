'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  staggerChildren?: boolean;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  staggerChildren = false,
  className = ''
}) => {
  const containerVariants = {
    hidden: { 
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: staggerChildren ? 0.1 : 0,
        delayChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {staggerChildren ? (
        React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={childVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={childVariants}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default PageTransition;
