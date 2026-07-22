"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/layouts/Layout";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { getUploadUrl } from "@/lib/utils";


interface BlogPostData {
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

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [blog, setBlog] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) {
      router.push("/blog");
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blogs/slug/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.published) {
            setBlog(data);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to load blog post:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, router]);

  if (loading) {
    return (
      <Layout title="Loading... — Fidel Tutorial Blog">
        <div className="text-center py-32">
          <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-muted text-sm">Loading article...</p>
        </div>
      </Layout>
    );
  }

  if (error || !blog) {
    return (
      <Layout title="Post Not Found — Fidel Tutorial Blog">
        <div className="text-center py-32 max-w-md mx-auto px-6">
          <h2 className="font-serif text-2xl font-semibold text-brand-ink mb-2">
            Article Not Found
          </h2>
          <p className="text-brand-muted text-sm mb-6">
            The article you are looking for does not exist or may have been
            unpublished.
          </p>
          <a
            href="/blog"
            className="inline-block bg-brand-primary text-brand-paper px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand-primary-deep transition-colors"
          >
            Back to Blog
          </a>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${blog.title} — Fidel Tutorial Blog`}
      description={
        blog.excerpt || `Read "${blog.title}" on the Fidel Tutorial blog.`
      }
    >
      <article className="py-12 md:py-20">
        <div className="max-w-[800px] mx-auto px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-primary transition-colors mb-8"
          >
            <HugeiconsIcon icon={ArrowLeft02Icon} />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 text-sm text-brand-muted mb-4">
              <span className="font-medium text-brand-primary">
                {blog.author}
              </span>
              <span className="opacity-40">·</span>
              <time dateTime={blog.createdAt}>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-ink tracking-tight leading-tight">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="text-brand-muted text-lg leading-relaxed mt-4">
                {blog.excerpt}
              </p>
            )}
          </header>

          {/* Cover Image */}
          {blog.coverImage && (
            <div className="rounded-2xl overflow-hidden border border-brand-rule mb-10 shadow-sm">
              <img
                src={getUploadUrl(blog.coverImage, "images")}
                alt={blog.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose-fidel"
            dangerouslySetInnerHTML={{ __html: blog.body }}
          />

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-brand-rule">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:text-brand-primary-deep transition-colors"
              >
                More Articles
                <HugeiconsIcon icon={ArrowRight02Icon} />
              </Link>
            </div>
          </footer>
        </div>
      </article>

      <style>{`
        /* Blog prose styles */
        .prose-fidel {
          font-size: 1.0625rem;
          line-height: 1.8;
          color: var(--brand-ink);
        }

        .prose-fidel h2 {
          font-family: 'Geist Variable', serif;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: var(--brand-ink);
        }

        .prose-fidel h3 {
          font-family: 'Geist Variable', serif;
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: var(--brand-ink);
        }

        .prose-fidel p {
          margin-bottom: 1.25rem;
        }

        .prose-fidel a {
          color: var(--brand-primary);
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.15s;
        }

        .prose-fidel a:hover {
          color: var(--brand-primary-deep);
        }

        .prose-fidel ul,
        .prose-fidel ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }

        .prose-fidel li {
          margin-bottom: 0.5rem;
        }

        .prose-fidel ul {
          list-style-type: disc;
        }

        .prose-fidel ol {
          list-style-type: decimal;
        }

        .prose-fidel blockquote {
          border-left: 3px solid var(--brand-secondary);
          padding-left: 1.25rem;
          margin: 1.5rem 0;
          color: var(--brand-muted);
          font-style: italic;
        }

        .prose-fidel code {
          background: var(--brand-cream-warm);
          padding: 0.15rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }

        .prose-fidel pre {
          background: var(--brand-ink);
          color: var(--brand-cream);
          padding: 1.25rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }

        .prose-fidel pre code {
          background: transparent;
          padding: 0;
        }

        .prose-fidel img {
          border-radius: 0.75rem;
          margin: 1.5rem 0;
        }

        .prose-fidel hr {
          border: none;
          border-top: 1px solid var(--brand-rule);
          margin: 2rem 0;
        }

        .prose-fidel strong {
          font-weight: 600;
          color: var(--brand-ink);
        }
      `}</style>
    </Layout>
  );
}
