"use client";

import { useEffect, useState } from "react";

interface BlogPost {
  id: number;
  title: string;
  published: boolean;
  createdAt: string;
}

interface Tutor {
  id: number;
  name: string;
  specialties: string[];
  grades: string[];
}

interface Booking {
  id: number;
  parentName: string;
  grade: string;
  status: string;
  createdAt: string;
}

interface DashboardSectionProps {
  onNavigate: (section: string) => void;
}

export default function DashboardSection({ onNavigate }: DashboardSectionProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, tutorsRes, bookingsRes] = await Promise.all([
          fetch("/api/blogs?all=true"),
          fetch("/api/tutors"),
          fetch("/api/bookings"),
        ]);

        if (blogsRes.ok) setBlogs(await blogsRes.json());
        if (tutorsRes.ok) setTutors(await tutorsRes.json());
        if (bookingsRes.ok) setBookings(await bookingsRes.json());
      } catch (err) {
        console.error("Failed to load dashboard metrics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter((b) => b.published).length;
  const draftBlogs = totalBlogs - publishedBlogs;

  const totalTutors = tutors.length;
  const uniqueSubjects = tutors
    .flatMap((t) => t.specialties)
    .filter((value, index, self) => self.indexOf(value) === index).length;

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;



  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-brand-muted text-sm">Loading dashboard metrics...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-semibold text-brand-ink">Dashboard</h1>
        <p className="text-brand-muted text-sm mt-1">
          Welcome to the central command hub for Fidel Tutorial.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => onNavigate("bookings")}
          className="bg-white rounded-2xl border border-brand-rule p-5 shadow-sm text-left hover:border-brand-primary/40 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="text-3xl font-bold text-brand-primary group-hover:scale-105 transition-transform origin-left">{totalBookings}</div>
          <div className="text-xs font-semibold text-brand-ink mt-1">Trial Bookings</div>
          <div className="text-[10px] text-brand-muted">{pendingBookings} pending review</div>
        </button>
        <button
          onClick={() => onNavigate("blogs")}
          className="bg-white rounded-2xl border border-brand-rule p-5 shadow-sm text-left hover:border-brand-primary/40 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="text-3xl font-bold text-brand-primary group-hover:scale-105 transition-transform origin-left">{totalBlogs}</div>
          <div className="text-xs font-semibold text-brand-ink mt-1">Blog Posts</div>
          <div className="text-[10px] text-brand-muted">{publishedBlogs} published · {draftBlogs} drafts</div>
        </button>
        <button
          onClick={() => onNavigate("tutors")}
          className="bg-white rounded-2xl border border-brand-rule p-5 shadow-sm text-left hover:border-brand-primary/40 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="text-3xl font-bold text-brand-primary group-hover:scale-105 transition-transform origin-left">{totalTutors}</div>
          <div className="text-xs font-semibold text-brand-ink mt-1">Tutors</div>
          <div className="text-[10px] text-brand-muted">Across {uniqueSubjects} subjects</div>
        </button>
      </div>
    </div>
  );
}
