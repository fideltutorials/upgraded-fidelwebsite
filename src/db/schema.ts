import { mysqlTable, int, text, varchar, boolean } from "drizzle-orm/mysql-core";

export const blogs = mysqlTable("blogs", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  body: text("body").notNull(),
  coverImage: varchar("cover_image", { length: 512 }),
  author: varchar("author", { length: 255 }).notNull().default("Fidel Tutorial"),
  published: boolean("published").notNull().default(false),
  createdAt: varchar("created_at", { length: 50 })
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: varchar("updated_at", { length: 50 })
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const admins = mysqlTable("admins", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: varchar("created_at", { length: 50 })
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const tutors = mysqlTable("tutors", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  initials: varchar("initials", { length: 50 }).notNull(),
  image: varchar("image", { length: 512 }),
  specialties: text("specialties").notNull(),
  grades: text("grades").notNull(),
  bio: text("bio").notNull(),
  createdAt: varchar("created_at", { length: 50 })
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: varchar("updated_at", { length: 50 })
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  parentName: varchar("parent_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  tutorId: int("tutor_id"),
  subject: varchar("subject", { length: 255 }).notNull(),
  grade: varchar("grade", { length: 50 }).notNull(),
  format: varchar("format", { length: 50 }).notNull(),
  message: text("message"),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: varchar("created_at", { length: 50 })
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;
export type Admin = typeof admins.$inferSelect;
export type Tutor = typeof tutors.$inferSelect;
export type NewTutor = typeof tutors.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;

// ── Testimonials ──────────────────────────────────────────────────
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  authorName: varchar("author_name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  quote: text("quote").notNull(),
  category: varchar("category", { length: 50 }).notNull().default("parents"),
  initials: varchar("initials", { length: 10 }).notNull(),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: varchar("created_at", { length: 50 })
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: varchar("updated_at", { length: 50 })
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;

// ── FAQ Items ─────────────────────────────────────────────────────
export const faqItems = mysqlTable("faq_items", {
  id: int("id").autoincrement().primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sortOrder: int("sort_order").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: varchar("created_at", { length: 50 })
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: varchar("updated_at", { length: 50 })
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export type FaqItem = typeof faqItems.$inferSelect;
export type NewFaqItem = typeof faqItems.$inferInsert;

// ── Leads (contact form / inquiry submissions) ────────────────────
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  message: text("message"),
  source: varchar("source", { length: 50 }).notNull().default("contact"),
  status: varchar("status", { length: 50 }).notNull().default("new"),
  createdAt: varchar("created_at", { length: 50 })
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;

// ── Resources (downloadable past papers, mock exams) ──────────────
export const resources = mysqlTable("resources", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  file: varchar("file", { length: 512 }),
  grade: varchar("grade", { length: 100 }),
  year: varchar("year", { length: 10 }),
  category: varchar("category", { length: 100 }).notNull().default("past-paper"),
  isGated: boolean("is_gated").notNull().default(false),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: varchar("created_at", { length: 50 })
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: varchar("updated_at", { length: 50 })
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export type Resource = typeof resources.$inferSelect;
export type NewResource = typeof resources.$inferInsert;

// ── Programs (admin-editable offerings) ───────────────────────────
export const programs = mysqlTable("programs", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  tagline: varchar("tagline", { length: 255 }).notNull().default(""),
  subtitle: varchar("subtitle", { length: 255 }).notNull().default(""),
  description: text("description").notNull(),
  details: text("details"),
  category: varchar("category", { length: 100 }).notNull().default("tutoring"),
  icon: varchar("icon", { length: 100 }).notNull().default("BookUserIcon"),
  benefits: text("benefits"),
  pricing: varchar("pricing", { length: 255 }),
  schedule: varchar("schedule", { length: 255 }),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: varchar("created_at", { length: 50 })
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: varchar("updated_at", { length: 50 })
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export type Program = typeof programs.$inferSelect;
export type NewProgram = typeof programs.$inferInsert;
