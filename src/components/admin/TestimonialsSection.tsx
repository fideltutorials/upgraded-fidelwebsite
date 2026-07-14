"use client";

import { useEffect, useState } from "react";
import SlideOver from "./SlideOver";

interface Testimonial {
  id: number;
  authorName: string;
  role: string;
  quote: string;
  category: string;
  initials: string;
  isPublished: boolean;
  createdAt: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Create / Edit slide-over
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);

  // Form fields
  const [authorName, setAuthorName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [category, setCategory] = useState("parents");
  const [initials, setInitials] = useState("");

  const fetchTestimonials = async () => {
    try {
      // Use the admin endpoint that returns all (including unpublished)
      const res = await fetch("/api/testimonials");
      if (res.ok) {
        setTestimonials(await res.json());
      }
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setAuthorName("");
    setRole("");
    setQuote("");
    setCategory("parents");
    setInitials("");
    setEditOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setAuthorName(t.authorName);
    setRole(t.role);
    setQuote(t.quote);
    setCategory(t.category);
    setInitials(t.initials);
    setEditOpen(true);
  };

  const handleSave = async () => {
    if (!authorName || !role || !quote) return;
    setSaving(true);

    try {
      if (editing) {
        const res = await fetch(`/api/testimonials/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ authorName, role, quote, category, initials }),
        });
        if (res.ok) {
          const updated = await res.json();
          setTestimonials(testimonials.map((t) => (t.id === updated.id ? updated : t)));
        }
      } else {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ authorName, role, quote, category, initials }),
        });
        if (res.ok) {
          const created = await res.json();
          setTestimonials([created, ...testimonials]);
        }
      }
      setEditOpen(false);
    } catch (err) {
      console.error("Save testimonial error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (t: Testimonial) => {
    try {
      const res = await fetch(`/api/testimonials/${t.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !t.isPublished }),
      });
      if (res.ok) {
        const updated = await res.json();
        setTestimonials(testimonials.map((item) => (item.id === updated.id ? updated : item)));
      }
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error("Delete testimonial error:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-brand-muted text-sm">Loading testimonials...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-lg font-bold text-brand-ink">Testimonials</h2>
          <p className="text-brand-muted text-xs">{testimonials.length} testimonial{testimonials.length !== 1 ? "s" : ""} total</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
        >
          + Add Testimonial
        </button>
      </div>

      {/* List */}
      {testimonials.length === 0 ? (
        <div className="text-center py-12 bg-brand-cream-warm/20 rounded-xl border border-brand-rule border-dashed">
          <p className="text-brand-muted text-sm">No testimonials yet. Add your first one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="border border-brand-rule rounded-xl p-4 bg-white flex items-start justify-between gap-4 hover:border-brand-primary/20 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <span className="w-9 h-9 rounded-full bg-brand-primary text-brand-secondary flex items-center justify-center font-serif font-bold text-xs flex-shrink-0">
                  {t.initials}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-brand-ink">{t.authorName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      t.isPublished
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : "bg-amber-50 text-amber-700 border border-amber-100"
                    }`}>
                      {t.isPublished ? "Published" : "Draft"}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-brand-cream-warm text-brand-muted border border-brand-rule">
                      {t.category}
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted truncate max-w-md">{t.role}</p>
                  <p className="text-xs text-brand-ink mt-1 line-clamp-2 italic">&quot;{t.quote}&quot;</p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => handleTogglePublish(t)}
                  className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border border-brand-rule hover:bg-brand-cream-warm transition-colors cursor-pointer"
                >
                  {t.isPublished ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => openEdit(t)}
                  className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border border-brand-rule hover:bg-brand-cream-warm transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold text-red-600 border border-red-100 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Slide-over */}
      <SlideOver open={editOpen} onClose={() => setEditOpen(false)} title={editing ? "Edit Testimonial" : "New Testimonial"}>
        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-ink">Author Name *</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. Meron T."
              className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-ink">Role / Description *</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Parent of a Grade-9 student · Bole"
              className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-ink">Quote *</label>
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              rows={4}
              placeholder="The testimonial quote..."
              className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-brand-ink">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
              >
                <option value="parents">Parents</option>
                <option value="diaspora">Diaspora</option>
                <option value="bootcamps">Bootcamps</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-brand-ink">Initials</label>
              <input
                type="text"
                value={initials}
                onChange={(e) => setInitials(e.target.value)}
                placeholder="e.g. MT"
                maxLength={3}
                className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !authorName || !role || !quote}
            className="mt-2 bg-brand-primary text-brand-paper hover:bg-brand-primary-deep py-3 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? "Saving..." : editing ? "Update Testimonial" : "Create Testimonial"}
          </button>
        </div>
      </SlideOver>
    </div>
  );
}
