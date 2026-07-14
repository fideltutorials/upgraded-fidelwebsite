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

-- Seed default admin account (username: admin, password: admin123)
-- SHA-256 for admin123 is 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9
INSERT INTO `admins` (`username`, `password_hash`, `created_at`)
SELECT 'admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', '2026-07-14T18:35:00.000Z'
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `admins` WHERE `username` = 'admin');

-- Seed default tutors
INSERT INTO `tutors` (`name`, `initials`, `image`, `specialties`, `grades`, `bio`, `created_at`, `updated_at`)
SELECT 'Hanna G.', 'HG', NULL, '["Mathematics"]', '["Grades 9 & 10","Grades 11 & 12"]', 'Eight years guiding Grade-12 students through EHEECE mathematics. Specialises in students who say they \'are not a maths person.\'', '2026-07-14T18:35:00.000Z', '2026-07-14T18:35:00.000Z'
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
