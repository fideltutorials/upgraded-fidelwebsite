-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `fidel` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `fidel`;

-- Table structure for table `blogs`
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `excerpt` TEXT NOT NULL,
  `body` TEXT NOT NULL,
  `cover_image` VARCHAR(512) DEFAULT NULL,
  `author` VARCHAR(255) NOT NULL DEFAULT 'Fidel Tutorial',
  `published` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` VARCHAR(50) NOT NULL,
  `updated_at` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `admins`
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `tutors`
CREATE TABLE IF NOT EXISTS `tutors` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `initials` VARCHAR(50) NOT NULL,
  `image` VARCHAR(512) DEFAULT NULL,
  `specialties` TEXT NOT NULL,
  `grades` TEXT NOT NULL,
  `bio` TEXT NOT NULL,
  `created_at` VARCHAR(50) NOT NULL,
  `updated_at` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `bookings`
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `parent_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `tutor_id` INT DEFAULT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `grade` VARCHAR(50) NOT NULL,
  `format` VARCHAR(50) NOT NULL,
  `message` TEXT DEFAULT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'pending',
  `created_at` VARCHAR(50) NOT NULL,
  CONSTRAINT `fk_bookings_tutors` FOREIGN KEY (`tutor_id`) REFERENCES `tutors` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `testimonials`
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `author_name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL,
  `quote` TEXT NOT NULL,
  `category` VARCHAR(50) NOT NULL DEFAULT 'parents',
  `initials` VARCHAR(10) NOT NULL,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` VARCHAR(50) NOT NULL,
  `updated_at` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `faq_items`
CREATE TABLE IF NOT EXISTS `faq_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `question` TEXT NOT NULL,
  `answer` TEXT NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` VARCHAR(50) NOT NULL,
  `updated_at` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `leads`
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `message` TEXT DEFAULT NULL,
  `source` VARCHAR(50) NOT NULL DEFAULT 'contact',
  `status` VARCHAR(50) NOT NULL DEFAULT 'new',
  `created_at` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `resources`
CREATE TABLE IF NOT EXISTS `resources` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `file` VARCHAR(512) DEFAULT NULL,
  `grade` VARCHAR(100) DEFAULT NULL,
  `year` VARCHAR(10) DEFAULT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'past-paper',
  `is_gated` TINYINT(1) NOT NULL DEFAULT 0,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` VARCHAR(50) NOT NULL,
  `updated_at` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `programs`
CREATE TABLE IF NOT EXISTS `programs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `tagline` VARCHAR(255) NOT NULL DEFAULT '',
  `subtitle` VARCHAR(255) NOT NULL DEFAULT '',
  `description` TEXT NOT NULL,
  `details` TEXT DEFAULT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'tutoring',
  `icon` VARCHAR(100) NOT NULL DEFAULT 'BookUserIcon',
  `benefits` TEXT DEFAULT NULL,
  `pricing` VARCHAR(255) DEFAULT NULL,
  `schedule` VARCHAR(255) DEFAULT NULL,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` VARCHAR(50) NOT NULL,
  `updated_at` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ═══════════════════════════════════════════════════════════════════
-- SEED DATA
-- ═══════════════════════════════════════════════════════════════════

-- Seed default admin account (username: admin, password: admin123)
INSERT INTO `admins` (`username`, `password_hash`, `created_at`)
SELECT 'admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', '2026-07-14T18:35:00.000Z'
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `admins` WHERE `username` = 'admin');

-- Seed default tutors
INSERT INTO `tutors` (`name`, `initials`, `image`, `specialties`, `grades`, `bio`, `created_at`, `updated_at`)
SELECT 'Hanna G.', 'HG', NULL, '["Mathematics"]', '["Grades 9 & 10","Grades 11 & 12"]', 'Eight years guiding Grade-12 students through EHEECE mathematics. Specialises in students who say they ''are not a maths person.''', '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `tutors` WHERE `name` = 'Hanna G.');

INSERT INTO `tutors` (`name`, `initials`, `image`, `specialties`, `grades`, `bio`, `created_at`, `updated_at`)
SELECT 'Daniel M.', 'DM', NULL, '["English"]', '["SAT","TOEFL"]', 'Tutors students preparing for US and Canadian universities. Former examiner; obsessive about clear writing and a calm test day.', '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `tutors` WHERE `name` = 'Daniel M.');

INSERT INTO `tutors` (`name`, `initials`, `image`, `specialties`, `grades`, `bio`, `created_at`, `updated_at`)
SELECT 'Selam A.', 'SA', NULL, '["Sciences"]', '["Grades 5–8","Grades 9 & 10"]', 'Biology and chemistry. Brings lab thinking into living rooms — every concept demonstrated before it is memorised.', '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `tutors` WHERE `name` = 'Selam A.');

INSERT INTO `tutors` (`name`, `initials`, `image`, `specialties`, `grades`, `bio`, `created_at`, `updated_at`)
SELECT 'Yonas T.', 'YT', NULL, '["Coding"]', '["Grades 5–8","Grades 9 & 10"]', 'Python, web development, and competitive maths. Leads the summer STEM camp and the Saturday coding cohort.', '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `tutors` WHERE `name` = 'Yonas T.');

-- Seed default testimonials
INSERT INTO `testimonials` (`author_name`, `role`, `quote`, `category`, `initials`, `is_published`, `created_at`, `updated_at`)
SELECT 'Meron T.', 'Parent of a Grade-9 student · Bole', 'The change was not just in the marks — it was in how she sat down to study. The tutor didn''t just teach the subject, she taught my daughter how to learn it.', 'parents', 'MT', 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `testimonials` WHERE `author_name` = 'Meron T.');

INSERT INTO `testimonials` (`author_name`, `role`, `quote`, `category`, `initials`, `is_published`, `created_at`, `updated_at`)
SELECT 'Tewodros A.', 'Diaspora sponsor · Washington, DC', 'We are in Washington and our nephew is in Addis. Fidel made it simple — we pay here, he learns there, and we get a monthly progress note. It just works.', 'diaspora', 'TA', 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `testimonials` WHERE `author_name` = 'Tewodros A.');

INSERT INTO `testimonials` (`author_name`, `role`, `quote`, `category`, `initials`, `is_published`, `created_at`, `updated_at`)
SELECT 'Rahel B.', 'Parent of an EHEECE candidate · Lebu', 'The Grade-12 bootcamp was the most organised support my son received in his exam year. Weekly mocks made the real exam feel ordinary.', 'bootcamps', 'RB', 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `testimonials` WHERE `author_name` = 'Rahel B.');

INSERT INTO `testimonials` (`author_name`, `role`, `quote`, `category`, `initials`, `is_published`, `created_at`, `updated_at`)
SELECT 'Saron W.', 'Diaspora Sponsor · London, UK', 'Finding a tutor back home used to be a hassle of trust. Fidel''s monthly feedback logs and Stripe USD payment portal makes sponsoring my siblings'' education entirely hands-off.', 'diaspora', 'SW', 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `testimonials` WHERE `author_name` = 'Saron W.');

INSERT INTO `testimonials` (`author_name`, `role`, `quote`, `category`, `initials`, `is_published`, `created_at`, `updated_at`)
SELECT 'Kaleb D.', 'Grade 12 Student · Addis Ababa', 'My math diagnostic went from 45% in October to 88% on the final EHEECE national exam. The Saturday mocks taught me exactly how to manage my time.', 'bootcamps', 'KD', 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `testimonials` WHERE `author_name` = 'Kaleb D.');

INSERT INTO `testimonials` (`author_name`, `role`, `quote`, `category`, `initials`, `is_published`, `created_at`, `updated_at`)
SELECT 'Dr. Elias H.', 'Parent of Grade 10 student · Old Airport', 'Fidel matches tutors based on personality, not just availability. Our physics tutor is a role model who got my son excited about engineering.', 'parents', 'EH', 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `testimonials` WHERE `author_name` = 'Dr. Elias H.');

-- Seed default FAQ items
INSERT INTO `faq_items` (`question`, `answer`, `sort_order`, `is_published`, `created_at`, `updated_at`)
SELECT 'What grades and subjects do you cover?', 'KG through Grade 12 across every core subject — mathematics, English, Amharic, sciences, social studies, ICT and coding — plus university-level support in selected subjects. Test prep includes EHEECE, SAT, TOEFL and IELTS.', 1, 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `faq_items` WHERE `sort_order` = 1);

INSERT INTO `faq_items` (`question`, `answer`, `sort_order`, `is_published`, `created_at`, `updated_at`)
SELECT 'Are sessions in English or Amharic?', 'Both. Tutors deliver in whichever language helps the student learn best, and they switch as needed. Diaspora-focused programmes are typically taught in English with Amharic as a heritage option.', 2, 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `faq_items` WHERE `sort_order` = 2);

INSERT INTO `faq_items` (`question`, `answer`, `sort_order`, `is_published`, `created_at`, `updated_at`)
SELECT 'How are tutors vetted?', 'Every tutor passes a subject test, a teaching demonstration, an interview and a background check before they are matched with a student — and is trained on the Fidel teaching standard during onboarding.', 3, 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `faq_items` WHERE `sort_order` = 3);

INSERT INTO `faq_items` (`question`, `answer`, `sort_order`, `is_published`, `created_at`, `updated_at`)
SELECT 'What does it cost?', 'Tutoring is offered as monthly packages with transparent pricing by grade and subject. Bootcamps are priced per cohort. Diaspora programmes are billed in USD. Book a free advisory call for a written quote.', 4, 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `faq_items` WHERE `sort_order` = 4);

INSERT INTO `faq_items` (`question`, `answer`, `sort_order`, `is_published`, `created_at`, `updated_at`)
SELECT 'Do you offer online tutoring outside Addis Ababa?', 'Yes — we serve students in Bahir Dar, Hawassa, Mekelle, Dire Dawa and beyond, as well as Ethiopian families living abroad. The teaching standard is the same; only the delivery is online.', 5, 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `faq_items` WHERE `sort_order` = 5);

INSERT INTO `faq_items` (`question`, `answer`, `sort_order`, `is_published`, `created_at`, `updated_at`)
SELECT 'How do diaspora families pay?', 'International debit and credit cards via secure checkout, in USD. We invoice in dollars and handle the Birr-side logistics so your relative or child receives tutoring without you sending money home first.', 6, 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `faq_items` WHERE `sort_order` = 6);

-- Seed default programs
INSERT INTO `programs` (`name`, `slug`, `tagline`, `subtitle`, `description`, `details`, `category`, `icon`, `benefits`, `pricing`, `schedule`, `is_published`, `created_at`, `updated_at`)
SELECT 'One-on-One Tutoring', 'one-on-one', 'Personalised academic support', 'Matched, vetted tutor · one student · proven method', 'Every student is paired with a vetted tutor who builds a custom learning plan from a diagnostic assessment. Sessions happen in-home or online, and parents receive monthly progress reports with clear data.', 'Our one-on-one tutoring starts with a free diagnostic assessment. The assigned tutor builds a tailored learning path addressing knowledge gaps, exam strategy, and study habits. Monthly written reports ensure parents always know where their child stands.', 'tutoring', 'BookUserIcon', '["Personalised learning plan from diagnostic assessment","Vetted, background-checked tutors","Monthly progress reports to parents","Flexible in-home or online delivery","Subject and tutor switching at any time"]', 'From 3,500 ETB / month', 'Flexible — 2 to 5 sessions per week', 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `programs` WHERE `slug` = 'one-on-one');

INSERT INTO `programs` (`name`, `slug`, `tagline`, `subtitle`, `description`, `details`, `category`, `icon`, `benefits`, `pricing`, `schedule`, `is_published`, `created_at`, `updated_at`)
SELECT 'Group Classes', 'group-classes', 'Small-group subject intensives', '3–6 students · subject-focused · collaborative', 'Small group classes (3–6 students) offer collaborative learning at a lower per-student cost. Groups are formed by grade and subject, led by an instructor trained in facilitated peer learning.', 'Groups are capped at 6 students to ensure individual attention. The instructor rotates focus, uses group activities, and sets weekly quizzes. Ideal for families who want regular academic structure without the cost of private tutoring.', 'tutoring', 'UserGroupIcon', '["Small groups of 3–6 students maximum","Lower cost per student than private tutoring","Weekly quizzes and group activities","Grade and subject matched grouping","Structured curriculum with clear milestones"]', 'From 1,800 ETB / month per student', 'Fixed weekly schedule', 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `programs` WHERE `slug` = 'group-classes');

INSERT INTO `programs` (`name`, `slug`, `tagline`, `subtitle`, `description`, `details`, `category`, `icon`, `benefits`, `pricing`, `schedule`, `is_published`, `created_at`, `updated_at`)
SELECT 'Exam Bootcamps', 'exam-bootcamps', 'Intensive national exam preparation', 'Grade 6, 8, 12 · EHEECE · weekend mocks', 'Structured bootcamps for Grade 6, 8, and 12 national exams, including EHEECE. Combines subject review, timed mock exams, and performance analytics over an 8–12 week intensive period.', 'Our bootcamps run for 8–12 weeks before exam season. Each week includes subject review sessions, a timed Saturday mock, and a performance debrief. Students receive personal score tracking and exam strategy coaching.', 'bootcamp', 'Award01Icon', '["8–12 week structured intensive programme","Weekly timed mock exams with scoring","Performance analytics and personal tracking","Expert instructors with exam board experience","Proven 94% EHEECE pass rate"]', 'From 8,000 ETB per bootcamp cycle', 'Weekends + 2 weekday evenings', 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `programs` WHERE `slug` = 'exam-bootcamps');

INSERT INTO `programs` (`name`, `slug`, `tagline`, `subtitle`, `description`, `details`, `category`, `icon`, `benefits`, `pricing`, `schedule`, `is_published`, `created_at`, `updated_at`)
SELECT 'Summer Camps', 'summer-camps', 'STEM, language & enrichment camps', 'Ages 8–16 · hands-on projects · 2–4 week sessions', 'Summer enrichment camps in STEM, coding, languages, and creative arts. Project-based learning with certified instructors in a structured, fun environment.', 'Camps run in 2-week or 4-week sessions during July and August. Activities include coding projects, science experiments, language immersion, and collaborative challenges. Each camp concludes with a student showcase.', 'camp', 'Calendar01Icon', '["Project-based hands-on learning","Certified and vetted instructors","2-week and 4-week session options","STEM, coding, languages, and creative arts","Student showcase at programme end"]', 'From 5,000 ETB per 2-week session', 'July–August, weekday mornings', 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `programs` WHERE `slug` = 'summer-camps');

INSERT INTO `programs` (`name`, `slug`, `tagline`, `subtitle`, `description`, `details`, `category`, `icon`, `benefits`, `pricing`, `schedule`, `is_published`, `created_at`, `updated_at`)
SELECT 'Test Prep', 'test-prep', 'SAT, TOEFL, IELTS preparation', 'Standardised test coaching · score targets · practice tests', 'Dedicated preparation for standardised tests including SAT, TOEFL, and IELTS. Expert tutors with testing experience deliver targeted practice, strategy coaching, and score improvement plans.', 'Our test prep programme pairs students with tutors who have direct experience with each test format. Preparation includes diagnostic scoring, targeted skill building, full-length practice tests, and strategy sessions for test-day performance.', 'test-prep', 'Book02Icon', '["Expert tutors with direct test experience","Diagnostic scoring and skill gap analysis","Full-length timed practice tests","Test-day strategy and anxiety management","Average +180 SAT score improvement"]', 'From 12,000 ETB per prep cycle', '6–10 week cycles, flexible scheduling', 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `programs` WHERE `slug` = 'test-prep');

INSERT INTO `programs` (`name`, `slug`, `tagline`, `subtitle`, `description`, `details`, `category`, `icon`, `benefits`, `pricing`, `schedule`, `is_published`, `created_at`, `updated_at`)
SELECT 'Academic Counselling', 'counselling', 'University guidance & subject selection', 'Grade 10–12 · university applications · career mapping', 'One-on-one academic counselling for students navigating subject selection (Grade 10), university applications, scholarship essays, and career pathway planning.', 'Our counsellors work with students and parents on subject stream selection, university shortlisting, application essays, and scholarship strategy. Sessions include career interest mapping and academic planning to graduation.', 'counselling', 'GraduationCapIcon', '["One-on-one sessions with experienced counsellors","Subject stream and university selection guidance","Scholarship essay review and strategy","Career interest mapping and planning","Support through the full application cycle"]', 'From 4,000 ETB per counselling package', 'By appointment, ongoing support', 1, '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `programs` WHERE `slug` = 'counselling');
