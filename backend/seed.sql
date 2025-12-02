-- Sample data for testing
USE nsr_population_tracker;

-- Insert admin account first (let DB generate UUID)
INSERT INTO account (username, password, role) VALUES
('admin', 'admin123', 'admin'),
('staff1', 'staff123', 'staff');
-- Note: Using plain text passwords for simplicity. In production, use bcrypt to hash passwords.

-- Insert staff members (let DB generate UUID)
INSERT INTO staff (first_name, last_name, title, picture) VALUES
('Maria', 'Santos', 'Barangay Captain', NULL),
('Jose', 'Reyes', 'Barangay Secretary', NULL),
('Ana', 'Cruz', 'Barangay Treasurer', NULL),
('Carlos', 'Garcia', 'Barangay Councilor', NULL),
('Rosa', 'Martinez', 'Health Worker', NULL);

-- Insert sample households (let DB generate UUID, without head_resident_id initially)
INSERT INTO households (zone_num, house_num, address, status, head_resident_id) VALUES
(1, '001-A', 'Purok 1, New San Roque', 'active', NULL),
(1, '002-B', 'Purok 1, New San Roque', 'active', NULL),
(2, '001-A', 'Purok 2, New San Roque', 'active', NULL),
(2, '002-C', 'Purok 2, New San Roque', 'active', NULL),
(3, '001-D', 'Purok 3, New San Roque', 'active', NULL),
(3, '002-A', 'Purok 3, New San Roque', 'active', NULL),
(4, '001-B', 'Purok 4, New San Roque', 'active', NULL),
(4, '002-E', 'Purok 4, New San Roque', 'active', NULL),
(5, '001-F', 'Purok 5, New San Roque', 'active', NULL),
(5, '002-A', 'Purok 5, New San Roque', 'active', NULL);

-- Insert sample residents (let DB generate UUID, reference households by zone_num and house_num)
-- Household 1 (Zone 1, House 001-A)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Juan', 'Dela Cruz', '1975-05-15', 'male', 'married', 'High School Graduate', '09171234567', NULL
FROM households WHERE zone_num = 1 AND house_num = '001-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Maria', 'Dela Cruz', '1978-08-22', 'female', 'married', 'College Graduate', '09181234567', NULL
FROM households WHERE zone_num = 1 AND house_num = '001-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Jose', 'Dela Cruz', '2005-03-10', 'male', 'single', 'High School Level', NULL, NULL
FROM households WHERE zone_num = 1 AND house_num = '001-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Ana', 'Dela Cruz', '2008-11-28', 'female', 'single', 'Elementary Level', NULL, NULL
FROM households WHERE zone_num = 1 AND house_num = '001-A';

-- Household 2 (Zone 1, House 002-B)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Pedro', 'Santos', '1980-02-14', 'male', 'married', 'College Graduate', '09191234567', NULL
FROM households WHERE zone_num = 1 AND house_num = '002-B';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Rosa', 'Santos', '1982-07-19', 'female', 'married', 'High School Graduate', '09201234567', NULL
FROM households WHERE zone_num = 1 AND house_num = '002-B';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Miguel', 'Santos', '2010-09-05', 'male', 'single', 'Elementary Level', NULL, NULL
FROM households WHERE zone_num = 1 AND house_num = '002-B';

-- Household 3 (Zone 2, House 001-A)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Antonio', 'Gonzales', '1970-12-25', 'male', 'married', 'Elementary Graduate', '09211234567', NULL
FROM households WHERE zone_num = 2 AND house_num = '001-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Carmen', 'Gonzales', '1972-04-30', 'female', 'married', 'High School Graduate', '09221234567', NULL
FROM households WHERE zone_num = 2 AND house_num = '001-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Roberto', 'Gonzales', '2000-06-15', 'male', 'single', 'College Level', '09231234567', NULL
FROM households WHERE zone_num = 2 AND house_num = '001-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Elena', 'Gonzales', '2003-01-20', 'female', 'single', 'High School Graduate', NULL, NULL
FROM households WHERE zone_num = 2 AND house_num = '001-A';

-- Household 4 (Zone 2, House 002-C)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Carlos', 'Reyes', '1985-08-08', 'male', 'single', 'College Graduate', '09241234567', NULL
FROM households WHERE zone_num = 2 AND house_num = '002-C';

-- Household 5 (Zone 3, House 001-D)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Fernando', 'Martinez', '1968-03-17', 'male', 'married', 'Elementary Graduate', '09251234567', NULL
FROM households WHERE zone_num = 3 AND house_num = '001-D';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Gloria', 'Martinez', '1970-09-12', 'female', 'married', 'High School Graduate', '09261234567', NULL
FROM households WHERE zone_num = 3 AND house_num = '001-D';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Ramon', 'Martinez', '1998-11-03', 'male', 'married', 'Vocational Graduate', '09271234567', NULL
FROM households WHERE zone_num = 3 AND house_num = '001-D';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Lisa', 'Martinez', '2000-05-08', 'female', 'married', 'College Graduate', '09281234567', NULL
FROM households WHERE zone_num = 3 AND house_num = '001-D';

-- Household 6 (Zone 3, House 002-A)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Ricardo', 'Castillo', '1983-07-22', 'male', 'married', 'Vocational Graduate', '09291234567', NULL
FROM households WHERE zone_num = 3 AND house_num = '002-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Teresa', 'Castillo', '1985-12-14', 'female', 'married', 'College Graduate', '09301234567', NULL
FROM households WHERE zone_num = 3 AND house_num = '002-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Daniel', 'Castillo', '2012-02-28', 'male', 'single', 'Elementary Level', NULL, NULL
FROM households WHERE zone_num = 3 AND house_num = '002-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Sofia', 'Castillo', '2015-08-19', 'female', 'single', 'Elementary Level', NULL, NULL
FROM households WHERE zone_num = 3 AND house_num = '002-A';

-- Household 7 (Zone 4, House 001-B)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Alfredo', 'Flores', '1977-10-05', 'male', 'widowed', 'High School Graduate', '09311234567', NULL
FROM households WHERE zone_num = 4 AND house_num = '001-B';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Luis', 'Flores', '2004-04-12', 'male', 'single', 'High School Level', NULL, NULL
FROM households WHERE zone_num = 4 AND house_num = '001-B';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Patricia', 'Flores', '2007-06-25', 'female', 'single', 'Elementary Level', NULL, NULL
FROM households WHERE zone_num = 4 AND house_num = '001-B';

-- Household 8 (Zone 4, House 002-E)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Manuel', 'Garcia', '1990-01-30', 'male', 'married', 'Vocational Graduate', '09321234567', NULL
FROM households WHERE zone_num = 4 AND house_num = '002-E';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Angela', 'Garcia', '1992-03-18', 'female', 'married', 'College Graduate', '09331234567', NULL
FROM households WHERE zone_num = 4 AND house_num = '002-E';

-- Household 9 (Zone 5, House 001-F)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Rodrigo', 'Lopez', '1973-05-28', 'male', 'married', 'Elementary Graduate', '09341234567', NULL
FROM households WHERE zone_num = 5 AND house_num = '001-F';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Luz', 'Lopez', '1975-11-09', 'female', 'married', 'High School Graduate', '09351234567', NULL
FROM households WHERE zone_num = 5 AND house_num = '001-F';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Benjamin', 'Lopez', '2001-07-14', 'male', 'single', 'College Level', '09361234567', NULL
FROM households WHERE zone_num = 5 AND house_num = '001-F';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Isabella', 'Lopez', '2006-09-22', 'female', 'single', 'Elementary Level', NULL, NULL
FROM households WHERE zone_num = 5 AND house_num = '001-F';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Gabriel', 'Lopez', '2009-12-01', 'male', 'single', 'Elementary Level', NULL, NULL
FROM households WHERE zone_num = 5 AND house_num = '001-F';

-- Household 10 (Zone 5, House 002-A)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Eduardo', 'Rivera', '1987-02-11', 'male', 'married', 'College Graduate', '09371234567', NULL
FROM households WHERE zone_num = 5 AND house_num = '002-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Cristina', 'Rivera', '1989-08-04', 'female', 'married', 'College Graduate', '09381234567', NULL
FROM households WHERE zone_num = 5 AND house_num = '002-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Marco', 'Rivera', '2013-10-17', 'male', 'single', 'Elementary Level', NULL, NULL
FROM households WHERE zone_num = 5 AND house_num = '002-A';

-- Update households with head_resident_id (first adult male in each household)
UPDATE households h SET head_resident_id = (
  SELECT r.resident_id FROM residents r 
  WHERE r.household_id = h.household_id AND r.first_name = 'Juan' AND r.last_name = 'Dela Cruz'
) WHERE h.zone_num = 1 AND h.house_num = '001-A';

UPDATE households h SET head_resident_id = (
  SELECT r.resident_id FROM residents r 
  WHERE r.household_id = h.household_id AND r.first_name = 'Pedro' AND r.last_name = 'Santos'
) WHERE h.zone_num = 1 AND h.house_num = '002-B';

UPDATE households h SET head_resident_id = (
  SELECT r.resident_id FROM residents r 
  WHERE r.household_id = h.household_id AND r.first_name = 'Antonio' AND r.last_name = 'Gonzales'
) WHERE h.zone_num = 2 AND h.house_num = '001-A';

UPDATE households h SET head_resident_id = (
  SELECT r.resident_id FROM residents r 
  WHERE r.household_id = h.household_id AND r.first_name = 'Carlos' AND r.last_name = 'Reyes'
) WHERE h.zone_num = 2 AND h.house_num = '002-C';

UPDATE households h SET head_resident_id = (
  SELECT r.resident_id FROM residents r 
  WHERE r.household_id = h.household_id AND r.first_name = 'Fernando' AND r.last_name = 'Martinez'
) WHERE h.zone_num = 3 AND h.house_num = '001-D';

UPDATE households h SET head_resident_id = (
  SELECT r.resident_id FROM residents r 
  WHERE r.household_id = h.household_id AND r.first_name = 'Ricardo' AND r.last_name = 'Castillo'
) WHERE h.zone_num = 3 AND h.house_num = '002-A';

UPDATE households h SET head_resident_id = (
  SELECT r.resident_id FROM residents r 
  WHERE r.household_id = h.household_id AND r.first_name = 'Alfredo' AND r.last_name = 'Flores'
) WHERE h.zone_num = 4 AND h.house_num = '001-B';

UPDATE households h SET head_resident_id = (
  SELECT r.resident_id FROM residents r 
  WHERE r.household_id = h.household_id AND r.first_name = 'Manuel' AND r.last_name = 'Garcia'
) WHERE h.zone_num = 4 AND h.house_num = '002-E';

UPDATE households h SET head_resident_id = (
  SELECT r.resident_id FROM residents r 
  WHERE r.household_id = h.household_id AND r.first_name = 'Rodrigo' AND r.last_name = 'Lopez'
) WHERE h.zone_num = 5 AND h.house_num = '001-F';

UPDATE households h SET head_resident_id = (
  SELECT r.resident_id FROM residents r 
  WHERE r.household_id = h.household_id AND r.first_name = 'Eduardo' AND r.last_name = 'Rivera'
) WHERE h.zone_num = 5 AND h.house_num = '002-A';

-- Insert sample audit trail entries (reference by subqueries since IDs are auto-generated)
INSERT INTO audit_trail (record_type, record_id, details, change_type, acc_id)
SELECT 'household', h.household_id, 'Initial household registration', 'create', a.acc_id
FROM households h, account a WHERE h.zone_num = 1 AND h.house_num = '001-A' AND a.username = 'admin';

INSERT INTO audit_trail (record_type, record_id, details, change_type, acc_id)
SELECT 'household', h.household_id, 'Initial household registration', 'create', a.acc_id
FROM households h, account a WHERE h.zone_num = 1 AND h.house_num = '002-B' AND a.username = 'admin';

INSERT INTO audit_trail (record_type, record_id, details, change_type, acc_id)
SELECT 'resident', r.resident_id, 'Initial resident registration', 'create', a.acc_id
FROM residents r, account a WHERE r.first_name = 'Juan' AND r.last_name = 'Dela Cruz' AND a.username = 'admin';

INSERT INTO audit_trail (record_type, record_id, details, change_type, acc_id)
SELECT 'resident', r.resident_id, 'Initial resident registration', 'create', a.acc_id
FROM residents r, account a WHERE r.first_name = 'Maria' AND r.last_name = 'Dela Cruz' AND a.username = 'admin';

INSERT INTO audit_trail (record_type, record_id, details, change_type, acc_id)
SELECT 'staff', s.staff_id, 'Staff member added', 'create', a.acc_id
FROM staff s, account a WHERE s.first_name = 'Maria' AND s.last_name = 'Santos' AND a.username = 'admin';
