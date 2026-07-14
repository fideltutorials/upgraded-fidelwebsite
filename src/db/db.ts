import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import * as schema from "./schema";

const dataDir = resolve(process.cwd(), "data");
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const dbPath = resolve(dataDir, "fidel.db");
const client = createClient({ url: `file:${dbPath}` });

export const db = drizzle(client, { schema });

// Auto-create tables if they don't exist
// In a serverless/Next.js environment, we run schema creation once when the db client initializes.
const initDb = async () => {
  try {
    await client.executeMultiple(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        excerpt TEXT NOT NULL DEFAULT '',
        body TEXT NOT NULL DEFAULT '',
        cover_image TEXT,
        author TEXT NOT NULL DEFAULT 'Fidel Tutorial',
        published INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS tutors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        initials TEXT NOT NULL,
        image TEXT,
        specialties TEXT NOT NULL,
        grades TEXT NOT NULL,
        bio TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        parent_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        tutor_id INTEGER,
        subject TEXT NOT NULL,
        grade TEXT NOT NULL,
        format TEXT NOT NULL,
        message TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);

    // Seed admin
    const adminCountResult = await client.execute(
      "SELECT COUNT(*) as count FROM admins"
    );
    const adminCount = Number(adminCountResult.rows[0]?.count ?? 0);

    if (adminCount === 0) {
      const defaultHash = createHash("sha256").update("admin123").digest("hex");
      await client.execute({
        sql: "INSERT INTO admins (username, password_hash) VALUES (?, ?)",
        args: ["admin", defaultHash],
      });
      console.log(
        '🔐 Default admin created — username: "admin", password: "admin123"'
      );
    }

    // Seed tutors
    const tutorCountResult = await client.execute(
      "SELECT COUNT(*) as count FROM tutors"
    );
    const tutorCount = Number(tutorCountResult.rows[0]?.count ?? 0);

    if (tutorCount === 0) {
      const defaultTutors = [
        {
          name: "Hanna G.",
          initials: "HG",
          image: null,
          specialties: JSON.stringify(["Mathematics"]),
          grades: JSON.stringify(["Grades 9 & 10", "Grades 11 & 12"]),
          bio: "Eight years guiding Grade-12 students through EHEECE mathematics. Specialises in students who say they 'are not a maths person.'",
        },
        {
          name: "Daniel M.",
          initials: "DM",
          image: null,
          specialties: JSON.stringify(["English"]),
          grades: JSON.stringify(["SAT", "TOEFL"]),
          bio: "Tutors students preparing for US and Canadian universities. Former examiner; obsessive about clear writing and a calm test day.",
        },
        {
          name: "Selam A.",
          initials: "SA",
          image: null,
          specialties: JSON.stringify(["Sciences"]),
          grades: JSON.stringify(["Grades 5–8", "Grades 9 & 10"]),
          bio: "Biology and chemistry. Brings lab thinking into living rooms — every concept demonstrated before it is memorised.",
        },
        {
          name: "Yonas T.",
          initials: "YT",
          image: null,
          specialties: JSON.stringify(["Coding"]),
          grades: JSON.stringify(["Grades 5–8", "Grades 9 & 10"]),
          bio: "Python, web development, and competitive maths. Leads the summer STEM camp and the Saturday coding cohort.",
        },
      ];

      for (const t of defaultTutors) {
        await client.execute({
          sql: "INSERT INTO tutors (name, initials, image, specialties, grades, bio) VALUES (?, ?, ?, ?, ?, ?)",
          args: [t.name, t.initials, t.image, t.specialties, t.grades, t.bio],
        });
      }
      console.log("🏫 Default tutors seeded");
    }
  } catch (err) {
    console.error("❌ Database initialization error:", err);
  }
};

// Start database initialization asynchronously if not building
if (typeof process !== "undefined" && process.env.NEXT_PHASE !== "phase-production-build") {
  initDb();
}
