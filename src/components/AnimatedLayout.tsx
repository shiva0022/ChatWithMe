'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedLayoutProps {
  children: React.ReactNode;
}

const AnimatedLayout: React.FC<AnimatedLayoutProps> = ({ children }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // Slightly increased for more satisfying feel
        delayChildren: 0.08,   // Slightly increased
        duration: 0.4
      }
    }
  };

  // Different entrance directions for each component - balanced timing
  const getItemVariants = (index: number) => {
    switch (index) {
      case 0: // Navbar - from top
        return {
          hidden: { 
            opacity: 0, 
            y: -40,     
            scale: 0.98, 
            filter: 'blur(2px)'
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
              duration: 0.65, // Increased for more satisfaction
              ease: [0.22, 1, 0.36, 1]
            }
          }
        };
      case 1: // Sidebar and Hero container - will handle individually
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.18, // Increased stagger
              delayChildren: 0.22    // Increased delay
            }
          }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  // Variants for sidebar and hero within the flex container - balanced timing
  const sidebarVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,      
      scale: 0.96,  
      filter: 'blur(2px)'
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7, // Increased for more satisfaction
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const heroVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,       
      scale: 0.98, 
      filter: 'blur(2px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7, // Increased for more satisfaction
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      {React.Children.map(children, (child, index) => {
        // Handle the flex container with Sidebar and Hero specially
        if (index === 1 && React.isValidElement(child)) {
          return (
            <motion.div
              key={index}
              variants={getItemVariants(index)}
              className="relative"
            >
              <div className="flex px-4 pb-4 pt-2 gap-4 relative">
                <motion.div variants={sidebarVariants}>
                  {React.Children.toArray(child.props.children)[0]}
                </motion.div>
                <motion.div variants={heroVariants}>
                  {React.Children.toArray(child.props.children)[1]}
                </motion.div>
              </div>
            </motion.div>
          );
        }
        
        // Handle other components normally
        return (
          <motion.div
            key={index}
            variants={getItemVariants(index)}
            className="relative"
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default AnimatedLayout;
