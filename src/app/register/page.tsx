'use client';
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormContainer from "@/components/FormContainer";
import FormInput from "@/components/FormInput";
import GoogleButton from "@/components/GoogleButton";
import FormDivider from "@/components/FormDivider";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement actual registration logic
      // For now, just simulate a registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (err) {
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // This is now handled by the GoogleButton component
  };

  return (
    <FormContainer title="Create Account">
      <form
        onSubmit={handleSubmit}
        className="space-y-3 relative"
      >
        <div className="space-y-3">
          <FormInput
            label="Full Name"
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormInput
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormInput
            label="Password"
            id="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormInput
            label="Confirm Password"
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 rounded border-[#a970ff]/10 bg-[#0a0a0a] text-[#a970ff] focus:ring-[#a970ff] transition-all duration-200"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-400">
            I agree to the{" "}
            <a
              href="#"
              className="text-[#a970ff] hover:text-[#8a4fff] transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-[#a970ff] hover:text-[#8a4fff] transition-colors"
            >
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          className="w-full py-2 px-4 bg-gradient-to-r from-[#a970ff] to-[#8a4fff] hover:from-[#8a4fff] hover:to-[#a970ff] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#a970ff] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] shadow-lg hover:shadow-[#a970ff]/20 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <FormDivider text="Or continue with" />

        <GoogleButton 
          text="Sign up with Google"
          disabled={loading}
        />

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#a970ff] hover:text-[#8a4fff] transition-colors font-medium"
          >
            Sign in
          </Link>
        </p>
      </form>
    </FormContainer>
  );
}
