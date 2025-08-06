'use client';
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthAnimatedLayout from "@/components/AuthAnimatedLayout";
import AnimatedFormContainer from "@/components/AnimatedFormContainer";
import FormInput from "@/components/FormInput";
import RememberMe from "@/components/RememberMe";
import SubmitButton from "@/components/SubmitButton";
import FormDivider from "@/components/FormDivider";
import GoogleButton from "@/components/GoogleButton";
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Note: For this demo, we're using Google OAuth
      // The form fields are for UI completeness, but actual login
      // should happen via the Google sign-in button
      alert("Please use Google Sign In for authentication");
    } catch (err) {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // This is now handled by the GoogleButton component
  };

  // Animation variants for form elements - simplified to prevent glitches
  const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 8
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <AuthAnimatedLayout>
      <AnimatedFormContainer title="Welcome Back">
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-3 relative"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="space-y-3" variants={itemVariants}>
          <FormInput
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <FormInput
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-sm text-[#a970ff] hover:text-[#8a4fff] focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <RememberMe />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <SubmitButton
            text={loading ? "Signing In..." : "Sign In"}
            disabled={loading}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormDivider text="Or continue with" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <GoogleButton 
            text="Sign in with Google"
            disabled={loading}
          />
        </motion.div>

        <motion.p 
          className="text-center text-gray-400 mt-4"
          variants={itemVariants}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#a970ff] hover:text-[#8a4fff] transition-colors font-medium"
          >
            Sign up
          </Link>
        </motion.p>
      </motion.form>
    </AnimatedFormContainer>
    </AuthAnimatedLayout>
  );
}
