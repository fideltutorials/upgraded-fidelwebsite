"use client";

import { useEffect, useState } from "react";
import SlideOver from "./SlideOver";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
}

export default function FaqSection() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Slide-over states
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form states
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const fetchFaqs = async () => {
    try {
      const res = await fetch("/api/faq");
      if (res.ok) {
        setFaqs(await res.json());
      }
    } catch (err) {
      console.error("Failed to load FAQs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setQuestion("");
    setAnswer("");
    setSortOrder(faqs.length + 1);
    setEditOpen(true);
  };

  const openEdit = (item: FaqItem) => {
    setEditing(item);
    setQuestion(item.question);
    setAnswer(item.answer);
    setSortOrder(item.sortOrder);
    setEditOpen(true);
  };

  const handleSave = async () => {
    if (!question || !answer) return;
    setSaving(true);

    try {
      if (editing) {
        const res = await fetch(`/api/faq/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, answer, sortOrder }),
        });
        if (res.ok) {
          const updated = await res.json();
          setFaqs(faqs.map((f) => (f.id === updated.id ? updated : f)).sort((a, b) => a.sortOrder - b.sortOrder));
        }
      } else {
        const res = await fetch("/api/faq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, answer, sortOrder }),
        });
        if (res.ok) {
          const created = await res.json();
          setFaqs([...faqs, created].sort((a, b) => a.sortOrder - b.sortOrder));
        }
      }
      setEditOpen(false);
    } catch (err) {
      console.error("Save FAQ error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (item: FaqItem) => {
    try {
      const res = await fetch(`/api/faq/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !item.isPublished }),
      });
      if (res.ok) {
        const updated = await res.json();
        setFaqs(faqs.map((f) => (f.id === updated.id ? updated : f)).sort((a, b) => a.sortOrder - b.sortOrder));
      }
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this FAQ item?")) return;
    try {
      const res = await fetch(`/api/faq/${id}`, { method: "DELETE" });
      if (res.ok) {
        setFaqs(faqs.filter((f) => f.id !== id));
      }
    } catch (err) {
      console.error("Delete FAQ error:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-brand-muted text-sm">Loading FAQs...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-lg font-bold text-brand-ink">Frequently Asked Questions</h2>
          <p className="text-brand-muted text-xs">{faqs.length} FAQ{faqs.length !== 1 ? "s" : ""} total</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
        >
          + Add FAQ Item
        </button>
      </div>

      {/* List */}
      {faqs.length === 0 ? (
        <div className="text-center py-12 bg-brand-cream-warm/20 rounded-xl border border-brand-rule border-dashed">
          <p className="text-brand-muted text-sm">No FAQ items yet. Add your first one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((f) => (
            <div
              key={f.id}
              className="border border-brand-rule rounded-xl p-4 bg-white flex items-start justify-between gap-4 hover:border-brand-primary/20 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-brand-cream text-brand-muted border border-brand-rule">
                    Order: {f.sortOrder}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    f.isPublished
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "bg-amber-50 text-amber-700 border border-amber-100"
                  }`}>
                    {f.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm text-brand-ink mb-1">{f.question}</h4>
                <p className="text-xs text-brand-muted line-clamp-2">{f.answer}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => handleTogglePublish(f)}
                  className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border border-brand-rule hover:bg-brand-cream-warm transition-colors cursor-pointer"
                >
                  {f.isPublished ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => openEdit(f)}
                  className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border border-brand-rule hover:bg-brand-cream-warm transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
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
      <SlideOver open={editOpen} onClose={() => setEditOpen(false)} title={editing ? "Edit FAQ Item" : "New FAQ Item"}>
        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-ink">Question *</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What grades do you cover?"
              className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-ink">Answer *</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={5}
              placeholder="Faq answer content..."
              className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary resize-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-ink">Sort Order</label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value, 10) || 0)}
              placeholder="0"
              className="px-3 py-2.5 rounded-lg border border-brand-rule text-sm focus:outline-none focus:border-brand-primary"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !question || !answer}
            className="mt-2 bg-brand-primary text-brand-paper hover:bg-brand-primary-deep py-3 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? "Saving..." : editing ? "Update FAQ" : "Create FAQ"}
          </button>
        </div>
      </SlideOver>
    </div>
  );
}
