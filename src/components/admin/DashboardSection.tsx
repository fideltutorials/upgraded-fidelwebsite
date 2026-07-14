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

  const recentBlogs = [...blogs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
  const recentTutors = [...tutors].reverse().slice(0, 3);
  const recentBookings = [...bookings].reverse().slice(0, 3);

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

      {/* Recent activity cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl border border-brand-rule shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-brand-rule bg-brand-cream-warm/10">
            <h3 className="font-serif text-base font-bold text-brand-ink">Recent Bookings</h3>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              {recentBookings.length === 0 ? (
                <p className="text-brand-muted text-sm my-4 text-center">No bookings yet.</p>
              ) : (
                <ul className="divide-y divide-brand-rule/40">
                  {recentBookings.map((b) => (
                    <li key={b.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                      <span className="text-sm font-semibold text-brand-ink truncate max-w-[140px]">
                        {b.parentName}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-brand-muted">{b.grade}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          b.status === "pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-100"
                            : b.status === "confirmed"
                              ? "bg-blue-50 text-blue-700 border border-blue-100"
                              : b.status === "completed"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : "bg-red-50 text-red-700 border border-red-100"
                        }`}>
                          {b.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={() => onNavigate("bookings")}
              className="mt-5 w-full text-center bg-brand-primary hover:bg-brand-primary-deep text-brand-paper py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Manage Bookings
            </button>
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="bg-white rounded-2xl border border-brand-rule shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-brand-rule bg-brand-cream-warm/10">
            <h3 className="font-serif text-base font-bold text-brand-ink">Recent Posts</h3>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              {recentBlogs.length === 0 ? (
                <p className="text-brand-muted text-sm my-4 text-center">No posts yet.</p>
              ) : (
                <ul className="divide-y divide-brand-rule/40">
                  {recentBlogs.map((b) => (
                    <li key={b.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                      <span className="text-sm font-semibold text-brand-ink truncate max-w-[150px]">
                        {b.title}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        b.published ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}>
                        {b.published ? "Published" : "Draft"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={() => onNavigate("blogs")}
              className="mt-5 w-full text-center bg-brand-primary hover:bg-brand-primary-deep text-brand-paper py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Manage Blogs
            </button>
          </div>
        </div>

        {/* Recent Tutors */}
        <div className="bg-white rounded-2xl border border-brand-rule shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-brand-rule bg-brand-cream-warm/10">
            <h3 className="font-serif text-base font-bold text-brand-ink">Recent Tutors</h3>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              {recentTutors.length === 0 ? (
                <p className="text-brand-muted text-sm my-4 text-center">No tutors yet.</p>
              ) : (
                <ul className="divide-y divide-brand-rule/40">
                  {recentTutors.map((t) => (
                    <li key={t.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                      <span className="text-sm font-semibold text-brand-ink truncate max-w-[150px]">
                        {t.name}
                      </span>
                      <span className="text-xs text-brand-muted truncate max-w-[140px]">
                        {t.specialties.join(", ")}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={() => onNavigate("tutors")}
              className="mt-5 w-full text-center bg-brand-primary hover:bg-brand-primary-deep text-brand-paper py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Manage Tutors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
