'use client';

import { motion } from 'framer-motion';

interface AuthAnimatedLayoutProps {
  children: React.ReactNode;
}

const AuthAnimatedLayout: React.FC<AuthAnimatedLayoutProps> = ({ children }) => {
  // Container animation for the main form - simplified to prevent glitches
  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 20,        // Reduced movement
      scale: 0.99   // Minimal scale to prevent visual glitches
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6, // Balanced timing
        ease: [0.25, 0.46, 0.45, 0.94], // Smoother easing
        staggerChildren: 0.1, // Simplified stagger
        delayChildren: 0.1    // Reduced delay
      }
    }
  };

  // Animation for form elements - simplified
  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 10        // Reduced movement
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Faster, smoother
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a0f1f] to-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background elements with staggered animations - removed grid for cleaner look */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#a970ff]/5 via-transparent to-[#a970ff]/5"
        variants={itemVariants}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"
        variants={itemVariants}
      />
      
      {/* Main form container */}
      <motion.div 
        className="bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-full max-w-lg border border-[#a970ff]/10 relative z-10 transform hover:scale-[1.01] transition-all duration-300"
        variants={itemVariants}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#a970ff]/5 via-transparent to-[#8a4fff]/5 rounded-2xl"
          variants={itemVariants}
        />
        
        {children}
      </motion.div>
    </motion.div>
  );
};

export default AuthAnimatedLayout;
