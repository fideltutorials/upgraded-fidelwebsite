"use client";

import React, { useEffect, useState } from "react";
import SlideOver from "./SlideOver";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add, GraduationCapIcon, Key } from "@hugeicons/core-free-icons";
import { tutorUploadAction } from "@/app/actions";

const AVAILABLE_GRADES = [
  "All",
  "KG",
  "Grades 1–4",
  "Grades 5–8",
  "Grades 9 & 10",
  "Grades 11 & 12",
  "University",
  "SAT",
  "TOEFL",
  "IELTS",
];

interface Tutor {
  id: number;
  name: string;
  initials: string;
  image?: string | null;
  specialties: string[];
  grades: string[];
  bio: string;
  createdAt: string;
}

export default function TutorsSection() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  // Form slide-over state
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [specialtyInput, setSpecialtyInput] = useState("");
  const [grades, setGrades] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchTutors = async () => {
    try {
      const res = await fetch("/api/tutors");
      if (res.ok) setTutors(await res.json());
    } catch (err) {
      console.error("Failed to load tutors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const resetForm = () => {
    setName("");
    setInitials("");
    setImage(null);
    setSpecialties([]);
    setSpecialtyInput("");
    setGrades([]);
    setBio("");
    setError("");
    setEditingId(null);
    setFormLoading(false);
  };

  const openNewForm = () => {
    resetForm();
    setFormOpen(true);
  };

  const openEditForm = async (id: number) => {
    resetForm();
    setEditingId(id);
    setFormLoading(true);
    setFormOpen(true);

    try {
      const res = await fetch(`/api/tutors/${id}`);
      if (res.ok) {
        const data = await res.json();
        setName(data.name);
        setInitials(data.initials);
        setImage(data.image || "");
        setSpecialties(data.specialties || []);
        setGrades(data.grades || []);
        setBio(data.bio);
      } else {
        setError("Failed to load tutor details.");
      }
    } catch {
      setError("Network error loading tutor details.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleAddSpecialty = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    const value = specialtyInput.trim();
    if (value && !specialties.includes(value)) {
      setSpecialties([...specialties, value]);
      setSpecialtyInput("");
    }
  };

  const handleKeyDownSpecialty = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddSpecialty(e);
    }
  };

  const handleRemoveSpecialty = (indexToRemove: number) => {
    setSpecialties(specialties.filter((_, idx) => idx !== indexToRemove));
  };

  const handleGradeToggle = (grade: string) => {
    if (grade === "All") {
      if (grades.includes("All")) {
        setGrades([]);
      } else {
        setGrades(["All"]);
      }
    } else {
      let updated = grades.filter((g) => g !== "All");
      if (updated.includes(grade)) {
        updated = updated.filter((g) => g !== grade);
      } else {
        updated = [...updated, grade];
      }
      setGrades(updated);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (specialties.length === 0) {
      setError("Please add at least one specialty.");
      return;
    }
    if (grades.length === 0) {
      setError("Please select at least one grade level.");
      return;
    }

    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    // const result = tutorUploadAction(formData);
    // const payload = {
    //   name,
    //   initials: initials || undefined,
    //   image: image || null,
    //   specialties,
    //   grades,
    //   bio,
    // };
    formData.append("grades", JSON.stringify(grades));
    formData.append("specialities", JSON.stringify(specialties));

    try {
      const url = editingId ? `/api/tutors/${editingId}` : "/api/tutors";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        // headers: { "Content-Type": "application/json" },
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        setFormOpen(false);
        resetForm();
        setLoading(true);
        fetchTutors();
      } else {
        setError(result.error || "Failed to save tutor");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this tutor?")) return;

    try {
      const res = await fetch(`/api/tutors/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTutors(tutors.filter((t) => t.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete tutor");
      }
    } catch (err) {
      console.error("Failed to delete tutor:", err);
      alert("Network error. Failed to delete tutor.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/30 text-brand-ink text-sm placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-brand-ink">
            Tutors
          </h1>
          <p className="text-brand-muted text-sm mt-1">
            Manage your tutoring network · {tutors.length} tutor
            {tutors.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={openNewForm}
          className="inline-flex items-center gap-2 bg-brand-primary text-brand-paper px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand-primary-deep transition-colors shadow-md shadow-brand-primary/15 cursor-pointer"
        >
          <HugeiconsIcon icon={Add} size={18} />
          New Tutor
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-muted text-sm">Loading tutors data...</p>
        </div>
      ) : tutors.length === 0 ? (
        <div className="text-center py-20 bg-brand-cream-warm/40 rounded-2xl border border-brand-rule">
          <div className="w-16 h-16 rounded-2xl bg-brand-cream flex items-center justify-center mx-auto mb-4">
            <HugeiconsIcon icon={GraduationCapIcon} />
          </div>
          <h3 className="font-serif text-lg font-semibold text-brand-ink mb-1">
            No tutors yet
          </h3>
          <p className="text-brand-muted text-sm mb-6">
            Add your first tutor to get started.
          </p>
          <button
            onClick={openNewForm}
            className="inline-flex items-center gap-2 bg-brand-primary text-brand-paper px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand-primary-deep transition-colors cursor-pointer"
          >
            Add First Tutor
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-brand-rule overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-cream-warm/60 border-b border-brand-rule">
                  <th className="text-left px-5 py-3 font-semibold text-brand-ink text-xs uppercase tracking-wider w-16">
                    Photo
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-brand-ink text-xs uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-brand-ink text-xs uppercase tracking-wider">
                    Specialties & Grades
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-brand-ink text-xs uppercase tracking-wider hidden md:table-cell">
                    Bio
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-brand-ink text-xs uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-rule/50">
                {tutors.map((tutor) => (
                  <tr
                    key={tutor.id}
                    className="hover:bg-brand-cream-warm/30 transition-colors group"
                  >
                    <td className="px-5 py-4">
                      {tutor.image ? (
                        <img
                          src={tutor.image}
                          alt={tutor.name}
                          className="w-10 h-10 rounded-full object-cover border border-brand-rule"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-brand-primary text-brand-secondary flex items-center justify-center font-serif text-sm font-semibold shadow-sm">
                          {tutor.initials}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 font-medium text-brand-ink whitespace-nowrap">
                      {tutor.name}
                    </td>
                    <td className="px-5 py-4 text-brand-primary font-medium text-xs leading-normal">
                      <span className="font-semibold block text-brand-ink">
                        {tutor.specialties.join(", ")}
                      </span>
                      <span className="text-brand-muted text-[11px] block mt-0.5">
                        {tutor.grades.join(", ")}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-brand-muted hidden md:table-cell text-xs max-w-xs truncate">
                      {tutor.bio}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditForm(tutor.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-brand-ink border border-brand-rule hover:bg-brand-cream-warm transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(tutor.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tutor Form Slide-Over */}
      <SlideOver
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          resetForm();
        }}
        title={editingId ? "Edit Tutor" : "Add New Tutor"}
        wide
      >
        {formLoading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-brand-muted text-sm">Loading tutor details...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="tutor-name"
                className="block text-xs font-semibold text-brand-ink mb-1.5 uppercase tracking-wider"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="tutor-name"
                required
                // value={name}
                // onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="e.g. Hanna G."
              />
            </div>

            {/* Initials */}
            <div>
              <label
                htmlFor="tutor-initials"
                className="block text-xs font-semibold text-brand-ink mb-1.5 uppercase tracking-wider"
              >
                Initials
                <span className="text-brand-muted font-normal normal-case tracking-normal ml-1">
                  (optional, auto-generated if empty)
                </span>
              </label>
              <input
                type="text"
                name="initials"
                id="tutor-initials"
                // value={initials}
                // onChange={(e) => setInitials(e.target.value)}
                maxLength={3}
                className={inputClass}
                placeholder="e.g. HG"
              />
            </div>

            {/* Picture */}
            <div>
              <label
                htmlFor="tutor-image"
                className="block text-xs font-semibold text-brand-ink mb-1.5 uppercase tracking-wider"
              >
                Profile Photo
                <span className="text-brand-muted font-normal normal-case tracking-normal ml-1">
                  (optional)
                </span>
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  name="image"
                  id="tutor-image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 2 * 1024 * 1024) {
                        alert("Image size should be less than 2MB");
                        return;
                      }
                      setImage(file);
                    }
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-brand-rule bg-brand-cream-warm/30 text-brand-ink text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-primary file:text-brand-paper file:cursor-pointer hover:file:bg-brand-primary-deep"
                />
                {/* {image && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-brand-rule flex-shrink-0 bg-brand-cream-warm flex items-center justify-center">
                      <img
                        src={image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setImage("")}
                      className="text-xs text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )} */}
              </div>
            </div>

            <div>
              <label
                htmlFor="tutor-specialties"
                className="block text-xs font-semibold text-brand-ink mb-1.5 uppercase tracking-wider"
              >
                Specialties <span className="text-red-500">*</span>
                <span className="text-brand-muted font-normal normal-case tracking-normal ml-1">
                  (press Enter to add)
                </span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="tutor-specialties"
                  value={specialtyInput}
                  onChange={(e) => setSpecialtyInput(e.target.value)}
                  onKeyDown={handleKeyDownSpecialty}
                  className={`flex-1 ${inputClass}`}
                  placeholder="Type specialty and press Enter"
                />
                <button
                  type="button"
                  onClick={handleAddSpecialty}
                  className="bg-brand-cream border border-brand-rule hover:bg-brand-cream-warm text-brand-ink px-4 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
              {specialties.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {specialties.map((spec, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      {spec}
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecialty(idx)}
                        className="hover:bg-brand-primary/20 rounded-full w-4 h-4 inline-flex items-center justify-center text-[10px] font-bold cursor-pointer"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Grades Checkboxes */}
            <div>
              <label className="block text-xs font-semibold text-brand-ink mb-2 uppercase tracking-wider">
                Grades / Target Levels <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-brand-cream-warm/20 border border-brand-rule rounded-xl p-4">
                {AVAILABLE_GRADES.map((grade) => {
                  const checked = grades.includes(grade);
                  return (
                    <label
                      key={grade}
                      className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-xs font-medium cursor-pointer transition-all ${
                        checked
                          ? "bg-brand-primary/5 border-brand-primary text-brand-primary"
                          : "bg-white border-brand-rule text-brand-ink hover:bg-brand-cream-warm/30"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleGradeToggle(grade)}
                        className="rounded border-brand-rule text-brand-primary focus:ring-brand-primary/30 w-3.5 h-3.5"
                      />
                      {grade}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label
                htmlFor="tutor-bio"
                className="block text-xs font-semibold text-brand-ink mb-1.5 uppercase tracking-wider"
              >
                Biography / Details <span className="text-red-500">*</span>
              </label>
              <textarea
                id="tutor-bio"
                name="bio"
                required
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className={`${inputClass} resize-y`}
                placeholder="Provide a detailed bio or summary of qualifications..."
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-brand-primary text-brand-paper px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-primary-deep transition-colors shadow-md shadow-brand-primary/15 disabled:opacity-50 cursor-pointer"
              >
                {submitting
                  ? editingId
                    ? "Saving..."
                    : "Adding..."
                  : editingId
                    ? "Save Changes"
                    : "Add Tutor"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormOpen(false);
                  resetForm();
                }}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-brand-muted border border-brand-rule hover:bg-brand-cream-warm transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </SlideOver>
    </div>
  );
}
