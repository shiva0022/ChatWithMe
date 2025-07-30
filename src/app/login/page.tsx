'use client';
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormContainer from "@/components/FormContainer";
import FormInput from "@/components/FormInput";
import RememberMe from "@/components/RememberMe";
import SubmitButton from "@/components/SubmitButton";
import FormDivider from "@/components/FormDivider";
import GoogleButton from "@/components/GoogleButton";

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
      // TODO: Implement actual login logic with NextAuth
      // For now, just simulate a login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert("Login successful!");
      localStorage.setItem("token", "demo-token");
      router.push("/");
    } catch (err) {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // This is now handled by the GoogleButton component
  };

  return (
    <FormContainer title="Welcome Back">
      <form onSubmit={handleSubmit} className="space-y-3 relative">
        <div className="space-y-3">
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
        </div>

        <RememberMe />
        <SubmitButton
          text={loading ? "Signing In..." : "Sign In"}
          disabled={loading}
        />

        <FormDivider text="Or continue with" />

        <GoogleButton 
          text="Sign in with Google"
          disabled={loading}
        />

        <p className="text-center text-gray-400 mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#a970ff] hover:text-[#8a4fff] transition-colors font-medium"
          >
            Sign up
          </Link>
        </p>
      </form>
    </FormContainer>
  );
}
