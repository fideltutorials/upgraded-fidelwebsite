"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function AdminLogin() {
  const { authenticated, loading, checkAuth } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && authenticated) {
      router.push("/admin");
    }
  }, [authenticated, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        await checkAuth();
        router.push("/admin");
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-paper text-brand-ink flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink font-sans antialiased flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-primary flex items-center justify-center text-brand-secondary font-serif font-bold text-3xl mx-auto shadow-lg shadow-brand-primary/20 mb-4">
            ፊ
          </div>
          <h1 className="font-serif text-2xl font-semibold text-brand-ink">
            Fidel Admin
          </h1>
          <p className="text-brand-muted text-sm mt-1">
            Sign in to manage your content
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-brand-ink mb-1.5 uppercase tracking-wider"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/50 text-brand-ink text-sm placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-brand-ink mb-1.5 uppercase tracking-wider"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/50 text-brand-ink text-sm placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
              placeholder="Enter password"
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-brand-primary text-brand-paper font-semibold text-sm hover:bg-brand-primary-deep transition-colors shadow-md shadow-brand-primary/20 mt-2 disabled:opacity-50"
          >
            {submitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-brand-muted mt-6">
          <a href="/" className="hover:text-brand-primary transition-colors">
            ← Back to Fidel Tutorial
          </a>
        </p>
      </div>
    </div>
  );
}
