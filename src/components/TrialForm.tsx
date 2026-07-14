"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TrialForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    email: "",
    grade: "Grade 9-12",
    format: "In-Home Tutoring",
    subjects: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API Submission
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="bg-brand-cream-warm/50 border border-brand-rule p-8 rounded-2xl text-center flex flex-col items-center gap-4">
        <span className="w-16 h-16 rounded-full bg-brand-primary text-brand-secondary flex items-center justify-center font-serif text-3xl font-bold">
          ✓
        </span>
        <h3 className="font-serif text-2xl font-bold text-brand-ink">Trial Requested Successfully!</h3>
        <p className="text-brand-muted text-sm max-w-sm leading-relaxed">
          Thank you for requesting a free trial. One of our educational advisors will call you at <strong className="text-brand-ink">{formData.phone}</strong> within 24 to 48 hours to confirm scheduling and matching.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 text-xs font-bold text-brand-primary border-b border-brand-primary pb-0.5"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-brand-paper border border-brand-rule p-6 md:p-10 rounded-2xl shadow-xl shadow-brand-primary-deep/5 flex flex-col gap-6 font-sans text-sm text-brand-ink">
      <div>
        <h3 className="font-serif text-2xl font-bold text-brand-ink mb-2">Book Your Free Trial</h3>
        <p className="text-brand-muted text-xs leading-relaxed">
          Tell us about your student's goals. The first 1-hour assessment session is completely on us.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="studentName" className="font-semibold text-xs text-brand-muted">Student Full Name</label>
          <input
            type="text"
            id="studentName"
            required
            placeholder="e.g. Almaz Kebede"
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            className="px-4 py-3 rounded-lg border border-brand-rule bg-brand-cream-warm/20 focus:outline-none focus:border-brand-primary transition-colors text-brand-ink"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="parentName" className="font-semibold text-xs text-brand-muted">Parent / Sponsor Name</label>
          <input
            type="text"
            id="parentName"
            required
            placeholder="e.g. Kebede Abebe"
            value={formData.parentName}
            onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
            className="px-4 py-3 rounded-lg border border-brand-rule bg-brand-cream-warm/20 focus:outline-none focus:border-brand-primary transition-colors text-brand-ink"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="font-semibold text-xs text-brand-muted">Phone Number</label>
          <input
            type="tel"
            id="phone"
            required
            placeholder="e.g. +251 979 795..."
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="px-4 py-3 rounded-lg border border-brand-rule bg-brand-cream-warm/20 focus:outline-none focus:border-brand-primary transition-colors text-brand-ink"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-semibold text-xs text-brand-muted">Email Address (Optional)</label>
          <input
            type="email"
            id="email"
            placeholder="e.g. hello@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="px-4 py-3 rounded-lg border border-brand-rule bg-brand-cream-warm/20 focus:outline-none focus:border-brand-primary transition-colors text-brand-ink"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="grade" className="font-semibold text-xs text-brand-muted">Grade Level</label>
          <select
            id="grade"
            value={formData.grade}
            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            className="px-4 py-3 rounded-lg border border-brand-rule bg-brand-paper hover:bg-brand-cream focus:outline-none focus:border-brand-primary transition-colors text-brand-ink"
          >
            <option>KG to Grade 5</option>
            <option>Grade 6-8</option>
            <option>Grade 9-12</option>
            <option>University Level</option>
            <option>SAT / TOEFL Prep</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="format" className="font-semibold text-xs text-brand-muted">Tutoring Format</label>
          <select
            id="format"
            value={formData.format}
            onChange={(e) => setFormData({ ...formData, format: e.target.value })}
            className="px-4 py-3 rounded-lg border border-brand-rule bg-brand-paper hover:bg-brand-cream focus:outline-none focus:border-brand-primary transition-colors text-brand-ink"
          >
            <option>In-Home Tutoring</option>
            <option>Online Tutoring</option>
            <option>Group Classes / Bootcamps</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="subjects" className="font-semibold text-xs text-brand-muted">Subject(s) of Interest</label>
        <input
          type="text"
          id="subjects"
          required
          placeholder="e.g. Mathematics, Biology, Chemistry"
          value={formData.subjects}
          onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
          className="px-4 py-3 rounded-lg border border-brand-rule bg-brand-cream-warm/20 focus:outline-none focus:border-brand-primary transition-colors text-brand-ink"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-semibold text-xs text-brand-muted">Additional Information / Target Goal</label>
        <textarea
          id="message"
          rows={3}
          placeholder="e.g. Preparing for EHEECE exams, aiming for college scholarship..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="px-4 py-3 rounded-lg border border-brand-rule bg-brand-cream-warm/20 focus:outline-none focus:border-brand-primary transition-colors text-brand-ink resize-none"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full py-6 rounded-lg font-bold mt-2"
      >
        Submit Free Trial Request →
      </Button>
    </form>
  );
}
