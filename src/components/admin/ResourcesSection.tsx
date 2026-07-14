"use client";

import { useEffect, useState } from "react";
import SlideOver from "./SlideOver";

interface Resource {
  id: number;
  title: string;
  file: string | null;
  grade: string | null;
  year: string | null;
  category: string;
  isGated: boolean;
  isPublished: boolean;
  createdAt: string;
}

export default function ResourcesSection() {
  const [items, setItems] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  // Slide-over states
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<Resource | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [grade, setGrade] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("past-paper");
  const [isGated, setIsGated] = useState(false);

  const fetchResources = async () => {
    try {
      const res = await fetch("/api/resources");
      if (res.ok) {
        setItems(await res.json());
      }
    } catch (err) {
      console.error("Failed to load resources:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setTitle("");
    setFileUrl("");
    setGrade("");
    setYear("");
    setCategory("past-paper");
    setIsGated(false);
    setEditOpen(true);
  };

  const openEdit = (item: Resource) => {
    setEditing(item);
    setTitle(item.title);
    setFileUrl(item.file || "");
    setGrade(item.grade || "");
    setYear(item.year || "");
    setCategory(item.category);
    setIsGated(item.isGated);
    setEditOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setFileUrl(data.url);
      } else {
        alert("Upload failed. Make sure the file is valid.");
      }
    } catch (err) {
      console.error("File upload error:", err);
      alert("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!title || !fileUrl) return;
    setSaving(true);

    try {
      const payload = {
        title,
        file: fileUrl,
        grade: grade || null,
        year: year || null,
        category,
        isGated,
      };

      if (editing) {
        const res = await fetch(`/api/resources/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setItems(items.map((i) => (i.id === updated.id ? updated : i)));
        }
      } else {
        const res = await fetch("/api/resources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setItems([created, ...items]);
        }
      }
      setEditOpen(false);
    } catch (err) {
      console.error("Save resource error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (item: Resource) => {
    try {
      const res = await fetch(`/api/resources/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !item.isPublished }),
      });
      if (res.ok) {
        const updated = await res.json();
        setItems(items.map((i) => (i.id === updated.id ? updated : i)));
      }
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    try {
      const res = await fetch(`/api/resources/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems(items.filter((i) => i.id !== id));
      }
    } catch (err) {
      console.error("Delete resource error:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-brand-muted text-sm">Loading resources...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-lg font-bold text-brand-ink">Downloadable Resources</h2>
          <p className="text-brand-muted text-xs">{items.length} resource{items.length !== 1 ? "s" : ""} total</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
        >
          + Add Resource
        </button>
      </div>

      {/* List */}
      {items.length === 0 ? (
        <div className="text-center py-12 bg-brand-cream-warm/20 rounded-xl border border-brand-rule border-dashed">
          <p className="text-brand-muted text-sm">No resources uploaded yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-brand-rule rounded-xl p-4 bg-white flex items-start justify-between gap-4 hover:border-brand-primary/20 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 items-center mb-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-brand-cream text-brand-muted border border-brand-rule uppercase">
                    {item.category}
                  </span>
                  {item.grade && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-brand-cream-warm text-brand-ink border border-brand-rule">
                      {item.grade}
                    </span>
                  )}
                  {item.year && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-white text-brand-muted border border-brand-rule">
                      {item.year}
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    item.isPublished
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "bg-amber-50 text-amber-700 border border-amber-100"
                  }`}>
                    {item.isPublished ? "Published" : "Draft"}
                  </span>
                  {item.isGated && (
                    <span className="bg-amber-50 text-amber-700 border border-amber-150 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      🔒 Gated Download
                    </span>
                  )}
                </div>
                <h4 className="font-serif font-bold text-sm text-brand-ink mb-1">{item.title}</h4>
                {item.file && (
                  <a
                    href={item.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-brand-primary font-semibold hover:underline block break-all mt-1"
                  >
                    Asset link: {item.file}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => handleTogglePublish(item)}
                  className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border border-brand-rule hover:bg-brand-cream-warm transition-colors cursor-pointer"
                >
                  {item.isPublished ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => openEdit(item)}
                  className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border border-brand-rule hover:bg-brand-cream-warm transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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
      <SlideOver open={editOpen} onClose={() => setEditOpen(false)} title={editing ? "Edit Resource" : "New Resource"}>
        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-ink">Resource Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Grade 12 Math Mock 2025"
              className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-ink">Upload File / PDF *</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="Or paste direct file path URL"
                className="flex-1 px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
              />
              <label className="bg-brand-cream-warm hover:bg-brand-cream text-brand-ink px-3 py-2.5 rounded-lg text-xs font-bold border border-brand-rule cursor-pointer select-none">
                {uploading ? "Uploading..." : "Browse..."}
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-brand-ink">Grade Level</label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="e.g. Grade 12 / EHEECE"
                className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-brand-ink">Year</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2025"
                className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-ink">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
            >
              <option value="past-paper">Past Exam Paper</option>
              <option value="diagnostic">Diagnostic Assessment</option>
              <option value="syllabus">Syllabus Guide</option>
              <option value="other">Other Asset</option>
            </select>
          </div>

          <div className="flex items-center gap-2 py-2">
            <input
              type="checkbox"
              id="gated-checkbox"
              checked={isGated}
              onChange={(e) => setIsGated(e.target.checked)}
              className="w-4 h-4 text-brand-primary accent-brand-primary cursor-pointer"
            />
            <label htmlFor="gated-checkbox" className="text-xs font-semibold text-brand-ink cursor-pointer">
              Gated Download (Require name, email, and phone capture)
            </label>
          </div>

          <button
            onClick={handleSave}
            disabled={saving || uploading || !title || !fileUrl}
            className="mt-2 bg-brand-primary text-brand-paper hover:bg-brand-primary-deep py-3 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? "Saving..." : editing ? "Update Resource" : "Create Resource"}
          </button>
        </div>
      </SlideOver>
    </div>
  );
}
