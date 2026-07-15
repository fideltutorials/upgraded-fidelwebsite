"use client";

import { useEffect, useState } from "react";
import SlideOver from "./SlideOver";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add } from "@hugeicons/core-free-icons";

interface Program {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  subtitle: string;
  description: string;
  details: string | null;
  category: string;
  icon: string;
  benefits: string | null;
  pricing: string | null;
  schedule: string | null;
  isPublished: boolean;
  createdAt: string;
}

export default function ProgramsSection() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  // Slide-over state
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<Program | null>(null);
  const [saving, setSaving] = useState(false);

  // Form inputs
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [tagline, setTagline] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("tutoring");
  const [icon, setIcon] = useState("BookUserIcon");
  const [benefitsText, setBenefitsText] = useState(""); // Newline-separated list
  const [pricing, setPricing] = useState("");
  const [schedule, setSchedule] = useState("");

  const fetchPrograms = async () => {
    try {
      const res = await fetch("/api/programs");
      if (res.ok) {
        setPrograms(await res.json());
      }
    } catch (err) {
      console.error("Failed to load programs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setName("");
    setSlug("");
    setTagline("");
    setSubtitle("");
    setDescription("");
    setDetails("");
    setCategory("tutoring");
    setIcon("BookUserIcon");
    setBenefitsText("");
    setPricing("");
    setSchedule("");
    setEditOpen(true);
  };

  const openEdit = (p: Program) => {
    setEditing(p);
    setName(p.name);
    setSlug(p.slug);
    setTagline(p.tagline);
    setSubtitle(p.subtitle);
    setDescription(p.description);
    setDetails(p.details || "");
    setCategory(p.category);
    setIcon(p.icon);
    setPricing(p.pricing || "");
    setSchedule(p.schedule || "");

    // Parse benefits back to newline-separated text
    let benefitsArray: string[] = [];
    if (p.benefits) {
      try {
        benefitsArray = JSON.parse(p.benefits);
      } catch {
        benefitsArray = [];
      }
    }
    setBenefitsText(benefitsArray.join("\n"));

    setEditOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editing) {
      // Auto-generate slug for new programs
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      );
    }
  };

  const handleSave = async () => {
    if (!name || !slug || !description) return;
    setSaving(true);

    const benefits = benefitsText
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean);

    const payload = {
      name,
      slug,
      tagline,
      subtitle,
      description,
      details: details || null,
      category,
      icon,
      benefits,
      pricing: pricing || null,
      schedule: schedule || null,
    };

    try {
      if (editing) {
        const res = await fetch(`/api/programs/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setPrograms(programs.map((p) => (p.id === updated.id ? updated : p)));
        }
      } else {
        const res = await fetch("/api/programs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setPrograms([created, ...programs]);
        }
      }
      setEditOpen(false);
    } catch (err) {
      console.error("Save program error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (p: Program) => {
    try {
      const res = await fetch(`/api/programs/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !p.isPublished }),
      });
      if (res.ok) {
        const updated = await res.json();
        setPrograms(
          programs.map((item) => (item.id === updated.id ? updated : item)),
        );
      }
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this program?")) return;
    try {
      const res = await fetch(`/api/programs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPrograms(programs.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Delete program error:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-brand-muted text-sm">Loading programs...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-lg font-bold text-brand-ink">
            Academic Programs
          </h2>
          <p className="text-brand-muted text-xs">
            {programs.length} program{programs.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-brand-primary text-brand-paper px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand-primary-deep transition-colors shadow-md shadow-brand-primary/15 cursor-pointer"
        >
          <HugeiconsIcon icon={Add} size={18} />
          Add Program
        </button>
      </div>

      {/* List */}
      {programs.length === 0 ? (
        <div className="text-center py-12 bg-brand-cream-warm/20 rounded-xl border border-brand-rule border-dashed">
          <p className="text-brand-muted text-sm">
            No programs configured. Add your first one.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {programs.map((p) => (
            <div
              key={p.id}
              className="border border-brand-rule rounded-xl p-4 bg-white flex items-start justify-between gap-4 hover:border-brand-primary/20 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 items-center mb-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-brand-cream text-brand-muted border border-brand-rule uppercase">
                    {p.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-brand-cream-warm text-brand-ink border border-brand-rule">
                    Icon: {p.icon}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      p.isPublished
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : "bg-amber-50 text-amber-700 border border-amber-100"
                    }`}
                  >
                    {p.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm text-brand-ink mb-0.5">
                  {p.name}
                </h4>
                <p className="text-[10px] text-brand-primary font-bold">
                  Slug: /programs/{p.slug}
                </p>
                <p className="text-xs text-brand-muted mt-1 italic">
                  {p.tagline}
                </p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => handleTogglePublish(p)}
                  className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border border-brand-rule hover:bg-brand-cream-warm transition-colors cursor-pointer"
                >
                  {p.isPublished ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => openEdit(p)}
                  className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border border-brand-rule hover:bg-brand-cream-warm transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
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
      <SlideOver
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title={editing ? "Edit Program" : "New Program"}
      >
        <div className="flex flex-col gap-4 p-6 overflow-y-auto max-h-[85vh]">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-ink">
              Program Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. One-on-One Tutoring"
              className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-ink">
              URL Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. one-on-one"
              className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-brand-ink">
                Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Tagline under the title"
                className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-brand-ink">
                Subtitle
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. KG to University"
                className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-ink">
              Short Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Provide a concise description for lists..."
              className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-ink">
              Overview Details
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              placeholder="Provide a detailed overview of the program..."
              className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-brand-ink">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
              >
                <option value="tutoring">Tutoring</option>
                <option value="bootcamp">Bootcamp</option>
                <option value="camp">Enrichment Camp</option>
                <option value="test-prep">Standardized Test Prep</option>
                <option value="counselling">Admissions Counselling</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-brand-ink">
                Icon Glyph
              </label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
              >
                <option value="BookUserIcon">Person with Book</option>
                <option value="UserGroupIcon">Group of People</option>
                <option value="Book02Icon">Open Book</option>
                <option value="Calendar01Icon">Calendar Date</option>
                <option value="Award01Icon">Award Ribbon</option>
                <option value="GraduationCapIcon">Graduation Hat</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-ink">
              Program Benefits / Included Items (one per line)
            </label>
            <textarea
              value={benefitsText}
              onChange={(e) => setBenefitsText(e.target.value)}
              rows={4}
              placeholder="e.g.&#10;Baseline diagnostics test&#10;Tailored session summaries&#10;Flexible timing calendars"
              className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-brand-ink">
                Pricing Rate
              </label>
              <input
                type="text"
                value={pricing}
                onChange={(e) => setPricing(e.target.value)}
                placeholder="e.g. From 3,500 ETB / month"
                className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-brand-ink">
                Schedule Info
              </label>
              <input
                type="text"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                placeholder="e.g. Flexible 2-5 days/week"
                className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving || !name || !slug || !description}
            className="mt-2 bg-brand-primary text-brand-paper hover:bg-brand-primary-deep py-3.5 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving
              ? "Saving..."
              : editing
                ? "Update Program"
                : "Create Program"}
          </button>
        </div>
      </SlideOver>
    </div>
  );
}
