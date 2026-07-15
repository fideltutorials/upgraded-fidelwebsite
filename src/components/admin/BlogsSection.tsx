"use client";

import React, { useEffect, useState } from "react";
import SlideOver from "./SlideOver";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add,
  PencilEdit02Icon,
  PencilEditIcon,
} from "@hugeicons/core-free-icons";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  coverImage?: string | null;
  body: string;
  published: boolean;
  createdAt: string;
}

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Form slide-over state
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [manualSlug, setManualSlug] = useState(false);
  const [author, setAuthor] = useState("Fidel Tutorial");
  const [coverImage, setCoverImage] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs?all=true");
      if (res.ok) setBlogs(await res.json());
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setManualSlug(false);
    setAuthor("Fidel Tutorial");
    setCoverImage("");
    setExcerpt("");
    setBody("");
    setPublished(false);
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
      const res = await fetch(`/api/blogs/${id}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title);
        setSlug(data.slug);
        setManualSlug(true);
        setAuthor(data.author);
        setCoverImage(data.coverImage || "");
        setExcerpt(data.excerpt);
        setBody(data.body);
        setPublished(data.published);
      } else {
        setError("Failed to load blog post details.");
      }
    } catch {
      setError("Network error loading post data.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!manualSlug) setSlug(slugify(val));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setManualSlug(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const payload = {
      title,
      slug: slug || slugify(title),
      author,
      coverImage: coverImage || null,
      excerpt,
      body,
      published,
    };

    try {
      const url = editingId ? `/api/blogs/${editingId}` : "/api/blogs";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        setFormOpen(false);
        resetForm();
        // Refresh blogs list
        setLoading(true);
        fetchBlogs();
      } else {
        setError(result.error || "Failed to save post");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (id: number, currentPublished: boolean) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !currentPublished }),
      });
      if (res.ok) {
        setBlogs(
          blogs.map((b) =>
            b.id === id ? { ...b, published: !currentPublished } : b,
          ),
        );
      }
    } catch (err) {
      console.error("Failed to toggle publish status:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs(blogs.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete blog post:", err);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/30 text-brand-ink text-sm placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-brand-ink">
            Blog Posts
          </h1>
          <p className="text-brand-muted text-sm mt-1">
            Manage your blog content · {blogs.length} post
            {blogs.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={openNewForm}
          className="inline-flex items-center gap-2 bg-brand-primary text-brand-paper px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand-primary-deep transition-colors shadow-md shadow-brand-primary/15 cursor-pointer"
        >
          <HugeiconsIcon icon={Add} size={18} />
          New Post
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-muted text-sm">Loading posts data...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 bg-brand-cream-warm/40 rounded-2xl border border-brand-rule">
          <div className="w-16 h-16 rounded-2xl bg-brand-cream flex items-center justify-center mx-auto mb-4">
            <HugeiconsIcon icon={PencilEdit02Icon} />
          </div>
          <h3 className="font-serif text-lg font-semibold text-brand-ink mb-1">
            No posts yet
          </h3>
          <p className="text-brand-muted text-sm mb-6">
            Create your first blog post to get started.
          </p>
          <button
            onClick={openNewForm}
            className="inline-flex items-center gap-2 bg-brand-primary text-brand-paper px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand-primary-deep transition-colors cursor-pointer"
          >
            Create First Post
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-brand-rule overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-cream-warm/60 border-b border-brand-rule">
                  <th className="text-left px-5 py-3 font-semibold text-brand-ink text-xs uppercase tracking-wider">
                    Title
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-brand-ink text-xs uppercase tracking-wider hidden md:table-cell">
                    Author
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-brand-ink text-xs uppercase tracking-wider hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-center px-5 py-3 font-semibold text-brand-ink text-xs uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-brand-ink text-xs uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-rule/50">
                {blogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-brand-cream-warm/30 transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <div className="font-medium text-brand-ink group-hover:text-brand-primary transition-colors">
                        {blog.title}
                      </div>
                      <div className="text-xs text-brand-muted mt-0.5">
                        /{blog.slug}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-brand-muted hidden md:table-cell">
                      {blog.author}
                    </td>
                    <td className="px-5 py-4 text-brand-muted text-xs hidden lg:table-cell">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          blog.published
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${blog.published ? "bg-emerald-500" : "bg-amber-500"}`}
                        ></span>
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            handleTogglePublish(blog.id, blog.published)
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                            blog.published
                              ? "text-amber-700 border-amber-200 hover:bg-amber-50"
                              : "text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                          }`}
                        >
                          {blog.published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => openEditForm(blog.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-brand-ink border border-brand-rule hover:bg-brand-cream-warm transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
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

      {/* Blog Form Slide-Over */}
      <SlideOver
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          resetForm();
        }}
        title={editingId ? "Edit Post" : "Create New Post"}
        wide
      >
        {formLoading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-brand-muted text-sm">Loading post details...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Title */}
            <div>
              <label
                htmlFor="blog-title"
                className="block text-xs font-semibold text-brand-ink mb-1.5 uppercase tracking-wider"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="blog-title"
                required
                value={title}
                onChange={handleTitleChange}
                className={inputClass}
                placeholder="Enter post title"
              />
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="blog-slug"
                className="block text-xs font-semibold text-brand-ink mb-1.5 uppercase tracking-wider"
              >
                Slug
                <span className="text-brand-muted font-normal normal-case tracking-normal ml-1">
                  (auto-generated from title if empty)
                </span>
              </label>
              <input
                type="text"
                id="blog-slug"
                value={slug}
                onChange={handleSlugChange}
                className={inputClass}
                placeholder="my-blog-post"
              />
            </div>

            {/* Author */}
            <div>
              <label
                htmlFor="blog-author"
                className="block text-xs font-semibold text-brand-ink mb-1.5 uppercase tracking-wider"
              >
                Author
              </label>
              <input
                type="text"
                id="blog-author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={inputClass}
                placeholder="Author name"
              />
            </div>

            {/* Cover Image URL */}
            <div>
              <label
                htmlFor="blog-cover"
                className="block text-xs font-semibold text-brand-ink mb-1.5 uppercase tracking-wider"
              >
                Cover Image URL
                <span className="text-brand-muted font-normal normal-case tracking-normal ml-1">
                  (optional)
                </span>
              </label>
              <input
                type="url"
                id="blog-cover"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className={inputClass}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label
                htmlFor="blog-excerpt"
                className="block text-xs font-semibold text-brand-ink mb-1.5 uppercase tracking-wider"
              >
                Excerpt
              </label>
              <textarea
                id="blog-excerpt"
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className={`${inputClass} resize-y`}
                placeholder="A brief summary of the post..."
              />
            </div>

            {/* Body */}
            <div>
              <label
                htmlFor="blog-body"
                className="block text-xs font-semibold text-brand-ink mb-1.5 uppercase tracking-wider"
              >
                Content
                <span className="text-brand-muted font-normal normal-case tracking-normal ml-1">
                  (HTML supported)
                </span>
              </label>
              <textarea
                id="blog-body"
                rows={10}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className={`${inputClass} resize-y font-mono`}
                placeholder="Write your blog post content here... HTML tags are supported."
              />
            </div>

            {/* Published */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="blog-published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded border-brand-rule text-brand-primary focus:ring-brand-primary/30"
              />
              <label
                htmlFor="blog-published"
                className="text-sm font-medium text-brand-ink"
              >
                {editingId ? "Published" : "Publish immediately"}
              </label>
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
                    : "Creating..."
                  : editingId
                    ? "Save Changes"
                    : "Create Post"}
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
