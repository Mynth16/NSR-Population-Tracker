-- Create database
CREATE DATABASE IF NOT EXISTS nsr_population_tracker;
USE nsr_population_tracker;

-- Households table
CREATE TABLE IF NOT EXISTS households (
  household_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  zone_num INT NOT NULL,
  house_num VARCHAR(50) NOT NULL,
  status ENUM('active', 'inactive', 'archived') DEFAULT 'active',
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
  gender ENUM('male', 'female') NOT NULL,
  civil_status ENUM('single', 'married', 'widowed', 'separated', 'divorced') NOT NULL,
  educational_attainment VARCHAR(100),
  contact_number VARCHAR(20),
  email VARCHAR(100),
  status ENUM('active', 'deceased', 'moved', 'archived') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (household_id) REFERENCES households(household_id) ON DELETE SET NULL,
  INDEX idx_household (household_id),
  INDEX idx_status (status),
  INDEX idx_last_name (last_name)
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
  category ENUM('leadership', 'official', 'health') NOT NULL DEFAULT 'official',
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
  role ENUM('admin', 'staff', 'viewer') NOT NULL DEFAULT 'viewer',
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
  record_type ENUM('household', 'resident', 'staff', 'account') NOT NULL,
  record_id VARCHAR(36) NOT NULL,
  details TEXT,
  change_type ENUM('create', 'update', 'delete') NOT NULL,
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
  SUM(CASE WHEN gender = 'male' THEN 1 ELSE 0 END) as male_count,
  SUM(CASE WHEN gender = 'female' THEN 1 ELSE 0 END) as female_count,
  COUNT(DISTINCT household_id) as total_households,
  AVG(TIMESTAMPDIFF(YEAR, birth_date, CURDATE())) as average_age
FROM residents
WHERE status = 'active';

-- Zone statistics view
CREATE OR REPLACE VIEW zone_stats AS
SELECT 
  h.zone_num,
  COUNT(DISTINCT h.household_id) as household_count,
  COUNT(r.resident_id) as population,
  SUM(CASE WHEN r.gender = 'male' THEN 1 ELSE 0 END) as male_count,
  SUM(CASE WHEN r.gender = 'female' THEN 1 ELSE 0 END) as female_count
FROM households h
LEFT JOIN residents r ON h.household_id = r.household_id AND r.status = 'active'
WHERE h.status = 'active'
GROUP BY h.zone_num
ORDER BY h.zone_num;
