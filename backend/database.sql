-- Create database
CREATE DATABASE IF NOT EXISTS nsr_population_tracker;
USE nsr_population_tracker;

/*
 * OPTIMIZED ENUM VALUES REFERENCE
 * Database fields use short codes for space efficiency
 * Display mapping is handled in application layer (see backend/includes/db.php and assets/js/app.js)
 * 
 * GENDER: M=Male, F=Female
 * CIVIL_STATUS: S=Single, M=Married, W=Widowed, SEP=Separated, D=Divorced
 * RESIDENT_STATUS: A=Active, D=Deceased, M=Moved, X=Archived
 * HOUSEHOLD_STATUS: A=Active, I=Inactive, X=Archived
 * STAFF_CATEGORY: L=Leadership, O=Official, H=Health
 * ROLE: A=Admin, S=Staff, V=Viewer
 * RECORD_TYPE: H=Household, R=Resident, S=Staff, A=Account
 * CHANGE_TYPE: C=Create, U=Update, D=Delete
 */

-- Households table
CREATE TABLE IF NOT EXISTS households (
  household_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  zone_num INT NOT NULL,
  house_num VARCHAR(50) NOT NULL,
  status ENUM('A', 'I', 'X') DEFAULT 'A', -- A=Active, I=Inactive, X=Archived
  head_resident_id VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_zone (zone_num),
  INDEX idx_status (status),
  INDEX idx_head (head_resident_id)
);

-- Residents table
CREATE TABLE IF NOT EXISTS residents (
  resident_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  household_id VARCHAR(36),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  birth_date DATE NOT NULL,
  gender ENUM('M', 'F') NOT NULL, -- M=Male, F=Female
  civil_status ENUM('S', 'M', 'W', 'SEP', 'D') NOT NULL, -- S=Single, M=Married, W=Widowed, SEP=Separated, D=Divorced
  educational_attainment VARCHAR(100),
  contact_number VARCHAR(20),
  email VARCHAR(100),
  registered_voter ENUM('Y', 'N') DEFAULT 'N', -- Y=Yes, N=No
  pwd ENUM('Y', 'N') DEFAULT 'N', -- Y=Yes (Person with Disability), N=No
  status ENUM('A', 'D', 'M', 'X') DEFAULT 'A', -- A=Active, D=Deceased, M=Moved, X=Archived
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (household_id) REFERENCES households(household_id) ON DELETE SET NULL,
  INDEX idx_household (household_id),
  INDEX idx_status (status),
  INDEX idx_last_name (last_name),
  INDEX idx_registered_voter (registered_voter),
  INDEX idx_pwd (pwd)
);

-- Add foreign key constraint for head_resident_id after residents table is created
ALTER TABLE households
ADD CONSTRAINT fk_head_resident
FOREIGN KEY (head_resident_id) REFERENCES residents(resident_id) ON DELETE SET NULL;

-- Staff table
CREATE TABLE IF NOT EXISTS staff (
  staff_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  category ENUM('L', 'O', 'H') NOT NULL DEFAULT 'O', -- L=Leadership, O=Official, H=Health
  picture VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_title (title),
  INDEX idx_category (category)
);

-- Account table
CREATE TABLE IF NOT EXISTS account (
  acc_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('A', 'S', 'V') NOT NULL DEFAULT 'V', -- A=Admin, S=Staff, V=Viewer
  staff_id VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (staff_id) REFERENCES staff(staff_id) ON DELETE SET NULL,
  INDEX idx_username (username),
  INDEX idx_role (role),
  INDEX idx_staff (staff_id)
);

-- Audit trail table
CREATE TABLE IF NOT EXISTS audit_trail (
  audit_id INT AUTO_INCREMENT PRIMARY KEY,
  record_type ENUM('H', 'R', 'S', 'A') NOT NULL, -- H=Household, R=Resident, S=Staff, A=Account
  record_id VARCHAR(36) NOT NULL,
  details TEXT,
  change_type ENUM('C', 'U', 'D') NOT NULL, -- C=Create, U=Update, D=Delete
  change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  acc_id VARCHAR(36),
  household_id VARCHAR(36),
  resident_id VARCHAR(36),
  FOREIGN KEY (acc_id) REFERENCES account(acc_id) ON DELETE SET NULL,
  FOREIGN KEY (household_id) REFERENCES households(household_id) ON DELETE SET NULL,
  FOREIGN KEY (resident_id) REFERENCES residents(resident_id) ON DELETE SET NULL,
  INDEX idx_record_type (record_type),
  INDEX idx_record_id (record_id),
  INDEX idx_change_date (change_date),
  INDEX idx_acc (acc_id),
  INDEX idx_household (household_id),
  INDEX idx_resident (resident_id)
);

-- Population statistics view
CREATE OR REPLACE VIEW population_stats AS
SELECT 
  COUNT(*) as total_population,
  SUM(CASE WHEN gender = 'M' THEN 1 ELSE 0 END) as male_count,
  SUM(CASE WHEN gender = 'F' THEN 1 ELSE 0 END) as female_count,
  COUNT(DISTINCT household_id) as total_households,
  AVG(TIMESTAMPDIFF(YEAR, birth_date, CURDATE())) as average_age,
  SUM(CASE WHEN registered_voter = 'Y' THEN 1 ELSE 0 END) as registered_voter_count,
  SUM(CASE WHEN pwd = 'Y' THEN 1 ELSE 0 END) as pwd_count
FROM residents
WHERE status = 'A';

-- Zone statistics view
CREATE OR REPLACE VIEW zone_stats AS
SELECT 
  h.zone_num,
  COUNT(DISTINCT h.household_id) as household_count,
  COUNT(r.resident_id) as population,
  SUM(CASE WHEN r.gender = 'M' THEN 1 ELSE 0 END) as male_count,
  SUM(CASE WHEN r.gender = 'F' THEN 1 ELSE 0 END) as female_count
FROM households h
LEFT JOIN residents r ON h.household_id = r.household_id AND r.status = 'A'
WHERE h.status = 'A'
GROUP BY h.zone_num
ORDER BY h.zone_num;
