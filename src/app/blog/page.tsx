"use client";

import { useEffect, useState } from "react";
import Layout from "@/layouts/Layout";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage: string | null;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (err) {
        console.error("Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Layout
      title="Blog — Fidel Tutorial"
      description="Insights, study tips, and education updates from Fidel Tutorial in Addis Ababa."
    >
      {/* Hero */}
      <section className="py-16 md:py-24 bg-brand-cream-warm/40 border-b border-brand-rule">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-3 font-semibold">Blog</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-brand-ink tracking-tight mb-4">
            Insights & Updates
          </h1>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed max-w-2xl">
            Study tips, exam strategies, and the latest from Fidel Tutorial.
            Written by our team of educators for students and parents.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-brand-muted text-sm">Loading articles...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-brand-cream flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-muted">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-brand-ink mb-2">Coming Soon</h3>
              <p className="text-brand-muted text-base max-w-md mx-auto">
                We're working on new articles. Check back soon for study tips,
                exam preparation strategies, and updates from Fidel Tutorial.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((blog) => (
                <a
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group block bg-brand-paper border border-brand-rule rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-primary/5 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Cover Image or Gradient Placeholder */}
                  {blog.coverImage ? (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-gradient-to-br from-brand-primary/10 via-brand-cream to-brand-secondary/15 flex items-center justify-center">
                      <span className="text-brand-primary/20 font-serif text-6xl font-bold select-none">
                        ፊ
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-2 text-xs text-brand-muted mb-3">
                      <span className="font-medium text-brand-primary">{blog.author}</span>
                      <span className="opacity-40">·</span>
                      <time dateTime={blog.createdAt}>
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-lg font-semibold text-brand-ink group-hover:text-brand-primary transition-colors leading-snug mb-2">
                      {blog.title}
                    </h2>

                    {/* Excerpt */}
                    {blog.excerpt && (
                      <p className="text-brand-muted text-sm leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                    )}

                    {/* Read More */}
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Article
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
