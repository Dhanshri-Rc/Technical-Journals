-- Technical Journals — MySQL schema
-- Run with: mysql -u root -p technical_journals < backend/database/schema.sql

CREATE DATABASE IF NOT EXISTS technical_journals CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE technical_journals;

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  university VARCHAR(190) NULL,
  professional_role ENUM('Author','Reviewer','Editor','University Administrator') NOT NULL DEFAULT 'Author',
  password_hash VARCHAR(255) NOT NULL,
  account_role ENUM('user','admin') NOT NULL DEFAULT 'user',
  status ENUM('active','suspended') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_email (email)
) ENGINE=InnoDB;

-- ============================================================
-- UNIVERSITIES
-- ============================================================
CREATE TABLE IF NOT EXISTS universities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(190) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  country VARCHAR(120) NULL,
  logo VARCHAR(255) NULL,
  journals_count INT NOT NULL DEFAULT 0,
  website_url VARCHAR(255) NULL,
  description TEXT NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  display_order INT NOT NULL DEFAULT 0,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_universities_status (status),
  INDEX idx_universities_featured (featured)
) ENGINE=InnoDB;

-- ============================================================
-- JOURNALS
-- ============================================================
CREATE TABLE IF NOT EXISTS journals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(220) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  short_title VARCHAR(150) NULL,
  description TEXT NULL,
  about TEXT NULL,
  aims_scope TEXT NULL,
  subject_area VARCHAR(150) NULL,
  category VARCHAR(150) NULL,
  issn VARCHAR(20) NULL,
  eissn VARCHAR(20) NULL,
  pissn VARCHAR(20) NULL,
  indexing VARCHAR(255) NULL COMMENT 'Comma separated, e.g. Scopus,WoS,UGC',
  frequency VARCHAR(60) NULL,
  access_type VARCHAR(60) NULL DEFAULT 'Open Access',
  language VARCHAR(60) NULL DEFAULT 'English',
  publisher VARCHAR(190) NULL,
  university_id INT NULL,
  cover_image VARCHAR(255) NULL,
  color VARCHAR(60) NULL,
  icon VARCHAR(60) NULL,
  website_url VARCHAR(255) NULL,
  review_type VARCHAR(100) NULL,
  meta_title VARCHAR(190) NULL,
  meta_description VARCHAR(255) NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  featured TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_journal_university FOREIGN KEY (university_id) REFERENCES universities(id) ON DELETE SET NULL,
  INDEX idx_journals_status (status),
  INDEX idx_journals_featured (featured),
  INDEX idx_journals_subject (subject_area),
  INDEX idx_journals_category (category),
  INDEX idx_journals_frequency (frequency),
  INDEX idx_journals_access (access_type),
  INDEX idx_journals_language (language),
  FULLTEXT INDEX ft_journals_search (title, issn, subject_area)
) ENGINE=InnoDB;

-- ============================================================
-- CONFERENCES
-- ============================================================
CREATE TABLE IF NOT EXISTS conferences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(220) NOT NULL UNIQUE,
  code VARCHAR(60) NULL,
  title VARCHAR(255) NOT NULL,
  conference_type VARCHAR(80) NULL,
  subject_area VARCHAR(150) NULL,
  organizer VARCHAR(190) NULL,
  description TEXT NULL,
  topics VARCHAR(500) NULL COMMENT 'Comma separated topic list',
  start_date DATE NULL,
  end_date DATE NULL,
  display_date VARCHAR(120) NULL,
  location VARCHAR(190) NULL,
  city VARCHAR(120) NULL,
  country VARCHAR(120) NULL,
  region VARCHAR(60) NULL,
  venue VARCHAR(190) NULL,
  conference_mode VARCHAR(60) NULL DEFAULT 'In-Person',
  registration_url VARCHAR(255) NULL,
  image VARCHAR(255) NULL,
  color VARCHAR(60) NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  featured TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_conferences_status (status),
  INDEX idx_conferences_type (conference_type),
  INDEX idx_conferences_subject (subject_area),
  INDEX idx_conferences_region (region),
  INDEX idx_conferences_start (start_date),
  FULLTEXT INDEX ft_conferences_search (title, code, organizer)
) ENGINE=InnoDB;

-- ============================================================
-- CONTACT ENQUIRIES
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('new','read','replied','closed') NOT NULL DEFAULT 'new',
  admin_notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_enquiries_status (status)
) ENGINE=InnoDB;
