"use client";

import React, { useState } from "react";

export default function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
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

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="font-semibold text-xs text-brand-ink">Full Name</label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Hanna Kebede"
          className="w-full px-4 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/15 text-brand-ink placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-semibold text-xs text-brand-ink">Email Address</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/15 text-brand-ink placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-semibold text-xs text-brand-ink">Message</label>
        <textarea
          id="message"
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
