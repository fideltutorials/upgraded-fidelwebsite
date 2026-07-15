"use client";

import React, { useState } from "react";

export default function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          source: "contact",
          honeypot,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-brand-cream-warm/50 border border-brand-rule p-8 rounded-2xl text-center flex flex-col items-center gap-4">
        <span className="w-12 h-12 rounded-full bg-brand-primary text-brand-secondary flex items-center justify-center font-bold text-lg border border-brand-primary/10">
          ✓
        </span>
        <h3 className="font-serif text-xl font-bold text-brand-ink">Inquiry Submitted</h3>
        <p className="text-brand-muted text-xs max-w-sm leading-relaxed">
          Thank you for your message. One of our support representatives will email you at <strong className="text-brand-ink">{email}</strong> within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setName("");
            setEmail("");
            setMessage("");
          }}
          className="mt-2 text-xs font-bold text-brand-primary border-b border-brand-primary pb-0.5"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-brand-rule p-8 rounded-2xl shadow-xl shadow-brand-primary-deep/5 flex flex-col gap-5 text-sm text-brand-ink">
      <div>
        <h3 className="font-serif text-2xl font-bold text-brand-ink mb-1.5">Inquiry Form</h3>
        <p className="text-brand-muted text-xs leading-relaxed">
          Have general questions? Send us a quick message and we'll get back to you shortly.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Honeypot field — hidden from real users, bots fill it in */}
      <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="website_url">Website</label>
        <input
          type="text"
          id="website_url"
          name="website_url"
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="inquiry-name" className="font-semibold text-xs text-brand-ink">Full Name</label>
        <input
          type="text"
          id="inquiry-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Hanna Kebede"
          className="w-full px-4 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/15 text-brand-ink placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="inquiry-phone" className="font-semibold text-xs text-brand-ink">Phone Number</label>
        <input
          type="tel"
          id="inquiry-phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+251 979 795 154"
          className="w-full px-4 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/15 text-brand-ink placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="inquiry-email" className="font-semibold text-xs text-brand-ink">Email Address</label>
        <input
          type="email"
          id="inquiry-email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/15 text-brand-ink placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="inquiry-message" className="font-semibold text-xs text-brand-ink">Message</label>
        <textarea
          id="inquiry-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What would you like to ask us?"
          className="w-full px-4 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/15 text-brand-ink placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep w-full py-3.5 rounded-xl font-semibold text-xs transition-all shadow-md shadow-brand-primary/10 disabled:opacity-50 mt-1 cursor-pointer"
      >
        {submitting ? "Sending..." : "Submit Inquiry"}
      </button>
    </form>
  );
}
