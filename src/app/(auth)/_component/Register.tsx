"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; 

const Register: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
//   const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isEmailValid = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validate = () => {
    if (!username.trim()) {
      setError("Please enter your username.");
      return false;
    }
    if (!email.trim() || !isEmailValid(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    // if (!acceptTerms) {
    //   setError("Please accept the terms and conditions.");
    //   return false;
    // }

    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5173/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      Cookies.set("token", data.token, {
        expires: 3, 
      });

      router.push("/dashboard");
    } catch (err) {
      setError("Network error — try again");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 text-white">
      <div className="max-w-md w-full bg-black/70 backdrop-blur-md shadow-md rounded-lg p-8 border border-white/20">
        <div className="text-center mb-6 text-white">
          <h1 className="text-2xl font-semibold">Create an account</h1>
          <p className="text-sm text-white/80 mt-1">
            Sign up and start managing your tasks
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="bg-red-600 border border-red-600 text-white p-3 rounded mb-4"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/90">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-white/30 bg-white/5 text-white p-2"
              placeholder="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-white/30 bg-white/5 text-white p-2"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-white/30 bg-white/5 text-white p-2 pr-10"
                placeholder="Create a password"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute inset-y-0 right-0 pr-3 text-white/70"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-white/30 bg-white/5 text-white p-2"
              placeholder="Repeat your password"
            />
          </div>

          {/* Terms */}
          {/* <div className="flex items-center">
            <label className="flex items-center text-sm text-white/80">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-white/30 rounded"
              />
              <span className="ml-2">I agree to the terms and conditions</span>
            </label>
          </div> */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 font-semibold hover:bg-indigo-700"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/80">
          Already have an account?{" "}
          <a href="/login" className="text-white/90 underline-offset-2 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
