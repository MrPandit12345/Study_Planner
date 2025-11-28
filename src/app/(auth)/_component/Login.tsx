"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!identifier.trim()) {
      setError("Please enter your email or username.");
      return false;
    }
    if (!password) {
      setError("Please enter your password.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError(null);

    try {
      // Example: POST to your backend auth route (update the URL to match your API)
      // const res = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ identifier, password, remember }),
      // })
      // const data = await res.json()
      // if (!res.ok) throw new Error(data.message || 'Login failed')

      // For now, we'll simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 700));
      // On success, redirect to a secure page (update as needed)
      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Login failed — please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 text-white">
      <div className="max-w-md w-full bg-black/70 backdrop-blur-md shadow-md rounded-lg p-8 border border-white/20">
        <div className="text-center mb-6 text-white">
          <h1 className="text-2xl font-semibold">Sign in to your account</h1>
          <p className="text-sm text-white/80 mt-1">
            Enter your credentials to continue
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

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          aria-label="Login form"
        >
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-white/90"
            >
              Email or Username
            </label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="mt-1 block w-full rounded-md border-white/30 bg-white/5 text-white placeholder-white/60 shadow-sm focus:border-indigo-400 focus:ring-indigo-400 p-2"
              placeholder="you@example.com or username"
              autoComplete="username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white/90"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-white/30 bg-white/5 text-white placeholder-white/60 shadow-sm focus:border-indigo-400 focus:ring-indigo-400 p-2 pr-10"
                placeholder="Your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-white/80">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-white/30 rounded"
              />
              <span className="ml-2">Remember me</span>
            </label>

            <a
              href="#"
              className="text-sm text-white underline-offset-2 hover:underline text-opacity-90"
            >
              Forgot password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center rounded-md bg-indigo-600 text-white px-4 py-2 font-semibold hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-white/80">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-white/90 underline-offset-2 hover:underline"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
