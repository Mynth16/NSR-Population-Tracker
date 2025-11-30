-- Sample data for testing
USE nsr_population_tracker;

-- Insert admin account first
INSERT INTO account (acc_id, username, password, role) VALUES
('acc001', 'admin', '$2a$10$xQHGPjVYE7ZqJLLW8xHOZO8jLQvZqO9YqR4qQZHFqZLQzZPZQZPZQ', 'admin'),
('acc002', 'staff1', '$2a$10$xQHGPjVYE7ZqJLLW8xHOZO8jLQvZqO9YqR4qQZHFqZLQzZPZQZPZQ', 'staff');
-- Note: These are hashed versions of 'admin123' and 'staff123' - you should use proper bcrypt hashing

-- Insert staff members
INSERT INTO staff (staff_id, first_name, last_name, title, picture) VALUES
('staff001', 'Maria', 'Santos', 'Barangay Captain', NULL),
('staff002', 'Jose', 'Reyes', 'Barangay Secretary', NULL),
('staff003', 'Ana', 'Cruz', 'Barangay Treasurer', NULL),
('staff004', 'Carlos', 'Garcia', 'Barangay Councilor', NULL),
('staff005', 'Rosa', 'Martinez', 'Health Worker', NULL);

-- Insert sample households (without head_resident_id initially)
INSERT INTO households (household_id, zone_num, house_num, address, status, head_resident_id) VALUES
('h001', 1, '001-A', 'Purok 1, New San Roque', 'active', NULL),
('h002', 1, '002-B', 'Purok 1, New San Roque', 'active', NULL),
('h003', 2, '001-A', 'Purok 2, New San Roque', 'active', NULL),
('h004', 2, '002-C', 'Purok 2, New San Roque', 'active', NULL),
('h005', 3, '001-D', 'Purok 3, New San Roque', 'active', NULL),
('h006', 3, '002-A', 'Purok 3, New San Roque', 'active', NULL),
('h007', 4, '001-B', 'Purok 4, New San Roque', 'active', NULL),
('h008', 4, '002-E', 'Purok 4, New San Roque', 'active', NULL),
('h009', 5, '001-F', 'Purok 5, New San Roque', 'active', NULL),
('h010', 5, '002-A', 'Purok 5, New San Roque', 'active', NULL);

-- Insert sample residents
INSERT INTO residents (resident_id, household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email) VALUES
-- Household 1
('r001', 'h001', 'Juan', 'Dela Cruz', '1975-05-15', 'male', 'married', 'High School Graduate', '09171234567', NULL),
('r002', 'h001', 'Maria', 'Dela Cruz', '1978-08-22', 'female', 'married', 'College Graduate', '09181234567', NULL),
('r003', 'h001', 'Jose', 'Dela Cruz', '2005-03-10', 'male', 'single', 'High School Level', NULL, NULL),
('r004', 'h001', 'Ana', 'Dela Cruz', '2008-11-28', 'female', 'single', 'Elementary Level', NULL, NULL),

-- Household 2
('r005', 'h002', 'Pedro', 'Santos', '1980-02-14', 'male', 'married', 'College Graduate', '09191234567', NULL),
('r006', 'h002', 'Rosa', 'Santos', '1982-07-19', 'female', 'married', 'High School Graduate', '09201234567', NULL),
('r007', 'h002', 'Miguel', 'Santos', '2010-09-05', 'male', 'single', 'Elementary Level', NULL, NULL),

-- Household 3
('r008', 'h003', 'Antonio', 'Gonzales', '1970-12-25', 'male', 'married', 'Elementary Graduate', '09211234567', NULL),
('r009', 'h003', 'Carmen', 'Gonzales', '1972-04-30', 'female', 'married', 'High School Graduate', '09221234567', NULL),
('r010', 'h003', 'Roberto', 'Gonzales', '2000-06-15', 'male', 'single', 'College Level', '09231234567', NULL),
('r011', 'h003', 'Elena', 'Gonzales', '2003-01-20', 'female', 'single', 'High School Graduate', NULL, NULL),

-- Household 4
('r012', 'h004', 'Carlos', 'Reyes', '1985-08-08', 'male', 'single', 'College Graduate', '09241234567', NULL),

-- Household 5
('r013', 'h005', 'Fernando', 'Martinez', '1968-03-17', 'male', 'married', 'Elementary Graduate', '09251234567', NULL),
('r014', 'h005', 'Gloria', 'Martinez', '1970-09-12', 'female', 'married', 'High School Graduate', '09261234567', NULL),
('r015', 'h005', 'Ramon', 'Martinez', '1998-11-03', 'male', 'married', 'Vocational Graduate', '09271234567', NULL),
('r016', 'h005', 'Lisa', 'Martinez', '2000-05-08', 'female', 'married', 'College Graduate', '09281234567', NULL),

-- Household 6
('r017', 'h006', 'Ricardo', 'Castillo', '1983-07-22', 'male', 'married', 'Vocational Graduate', '09291234567', NULL),
('r018', 'h006', 'Teresa', 'Castillo', '1985-12-14', 'female', 'married', 'College Graduate', '09301234567', NULL),
('r019', 'h006', 'Daniel', 'Castillo', '2012-02-28', 'male', 'single', 'Elementary Level', NULL, NULL),
('r020', 'h006', 'Sofia', 'Castillo', '2015-08-19', 'female', 'single', 'Elementary Level', NULL, NULL),

-- Household 7
('r021', 'h007', 'Alfredo', 'Flores', '1977-10-05', 'male', 'widowed', 'High School Graduate', '09311234567', NULL),
('r022', 'h007', 'Luis', 'Flores', '2004-04-12', 'male', 'single', 'High School Level', NULL, NULL),
('r023', 'h007', 'Patricia', 'Flores', '2007-06-25', 'female', 'single', 'Elementary Level', NULL, NULL),

-- Household 8
('r024', 'h008', 'Manuel', 'Garcia', '1990-01-30', 'male', 'married', 'Vocational Graduate', '09321234567', NULL),
('r025', 'h008', 'Angela', 'Garcia', '1992-03-18', 'female', 'married', 'College Graduate', '09331234567', NULL),

-- Household 9
('r026', 'h009', 'Rodrigo', 'Lopez', '1973-05-28', 'male', 'married', 'Elementary Graduate', '09341234567', NULL),
('r027', 'h009', 'Luz', 'Lopez', '1975-11-09', 'female', 'married', 'High School Graduate', '09351234567', NULL),
('r028', 'h009', 'Benjamin', 'Lopez', '2001-07-14', 'male', 'single', 'College Level', '09361234567', NULL),
('r029', 'h009', 'Isabella', 'Lopez', '2006-09-22', 'female', 'single', 'Elementary Level', NULL, NULL),
('r030', 'h009', 'Gabriel', 'Lopez', '2009-12-01', 'male', 'single', 'Elementary Level', NULL, NULL),

-- Household 10
('r031', 'h010', 'Eduardo', 'Rivera', '1987-02-11', 'male', 'married', 'College Graduate', '09371234567', NULL),
('r032', 'h010', 'Cristina', 'Rivera', '1989-08-04', 'female', 'married', 'College Graduate', '09381234567', NULL),
('r033', 'h010', 'Marco', 'Rivera', '2013-10-17', 'male', 'single', 'Elementary Level', NULL, NULL);

-- Update households with head_resident_id
UPDATE households SET head_resident_id = 'r001' WHERE household_id = 'h001';
UPDATE households SET head_resident_id = 'r005' WHERE household_id = 'h002';
UPDATE households SET head_resident_id = 'r008' WHERE household_id = 'h003';
UPDATE households SET head_resident_id = 'r012' WHERE household_id = 'h004';
UPDATE households SET head_resident_id = 'r013' WHERE household_id = 'h005';
UPDATE households SET head_resident_id = 'r017' WHERE household_id = 'h006';
UPDATE households SET head_resident_id = 'r021' WHERE household_id = 'h007';
UPDATE households SET head_resident_id = 'r024' WHERE household_id = 'h008';
UPDATE households SET head_resident_id = 'r026' WHERE household_id = 'h009';
UPDATE households SET head_resident_id = 'r031' WHERE household_id = 'h010';

-- Insert sample audit trail entries
INSERT INTO audit_trail (record_type, record_id, details, change_type, acc_id) VALUES
('household', 'h001', 'Initial household registration', 'create', 'acc001'),
('household', 'h002', 'Initial household registration', 'create', 'acc001'),
('resident', 'r001', 'Initial resident registration', 'create', 'acc001'),
('resident', 'r002', 'Initial resident registration', 'create', 'acc001'),
('staff', 'staff001', 'Staff member added', 'create', 'acc001');
