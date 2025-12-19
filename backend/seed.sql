-- Sample data for testing
USE nsr_population_tracker;

-- Insert admin account first (let DB generate UUID)
-- Passwords are hashed using bcrypt (password_hash with PASSWORD_DEFAULT)
-- admin password: admin123
-- staff1 password: staff123
INSERT INTO account (username, password, role) VALUES
('admin', '$2y$12$JPMHokE4XbZeKzQUscc5uOU2OF6jpJhorDaPjWc6G3LUrY84ofuDG', 'A'),
('staff1', '$2y$12$GR7OkerAdiSm6A5QwnR27.MPobillE1sowpVTvMXGlhEA7d4ALWEu', 'S');

-- Leadership
INSERT INTO staff (first_name, last_name, title, category, picture) VALUES
('Hon. Yolanda M.', 'Beriña', 'Punong Barangay', 'L', 'images/Picture3.jpg'),
('Hon. Jennie A.', 'Azor', 'Committee on Health', 'L', 'images/Picture2.jpg'),
('Hon. Maximino B.', 'Eloreta', 'Committee on Health', 'L', 'images/Picture4.jpg');

-- Officials
INSERT INTO staff (first_name, last_name, title, category, picture) VALUES
('Hon. Hazel R.', 'Nanale', 'Committee on Solid Waste Management', 'O', 'images/Picture10.jpg'),
('Hon. Ariel F.', 'Fernando', 'Committee on Agriculture', 'O', 'images/Picture11.jpg'),
('Hon. Edwin D.', 'Portades', 'Committee on Education / Social Services', 'O', 'images/Picture12.jpg'),
('Hon. Jeru A.', 'Adizas', 'Committee on Peace and Order / Committee on Infrastructure', 'O', 'images/Picture13.jpg'),
('Hon. Milagros V.', 'Ballon', 'Committee on Agriculture and Animals', 'O', 'images/Picture14.jpg'),
('Hon. Joy A.', 'Bequillo', 'SK Chairperson / Committee on Youth and Sports', 'O', 'images/Picture15.jpg'),
('Joy B.', 'Catimbang', 'Barangay Secretary', 'O', 'images/Picture16.jpg'),
('Nora A.', 'Penino', 'Barangay Treasurer', 'O', 'images/Picture17.jpg');

-- Health & Support Staff
INSERT INTO staff (first_name, last_name, title, category, picture) VALUES
('RN Catherine A.', 'Villaflor', 'Barangay Nurse', 'H', 'images/blank.jpg'),
('Jane M.', 'Teoxon', 'Barangay Nutrition Scholar', 'H', 'images/Picture8.jpg'),
('Mylene M.', 'Jose', 'Barangay Nutrition Scholar', 'H', 'images/Picture9.jpg'),
('Jocelyn E.', 'Ampongan', 'Barangay Health Worker', 'H', 'images/Picture5.jpg'),
('Rosemarie B.', 'Pardiñas', 'Barangay Health Worker', 'H', 'images/Picture6.jpg'),
('Normita G.', 'Samar', 'Barangay Health Worker', 'H', 'images/Picture7.jpg'),
('Joy A.', 'Ordiales', 'Child Development Worker', 'H', 'images/Picture18.jpg'),
('Marlita N.', 'Lumabe', 'Child Development Worker', 'H', 'images/Picture19.jpg'),
('Jennie O.', 'Talag', 'Barangay Rehab Worker', 'H', 'images/Picture20.jpg'),
('Rachelle R.', 'Bulalacao', 'Barangay Rehab Worker', 'H', 'images/Picture21.jpg');

-- Insert sample households (let DB generate UUID, without head_resident_id initially)
INSERT INTO households (zone_num, house_num, status, head_resident_id) VALUES
(1, '001-A', 'A', NULL),
(1, '002-B', 'A', NULL),
(2, '001-A', 'A', NULL),
(2, '002-C', 'A', NULL),
(3, '001-D', 'A', NULL),
(3, '002-A', 'A', NULL),
(4, '001-B', 'A', NULL),
(4, '002-E', 'A', NULL),
(5, '001-F', 'A', NULL),
(5, '002-A', 'A', NULL);

-- Insert sample residents (let DB generate UUID, reference households by zone_num and house_num)
-- Household 1 (Zone 1, House 001-A)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email, registered_voter, pwd)
SELECT household_id, 'Juan', 'Dela Cruz', '1975-05-15', 'M', 'M', 'High School Graduate', '09171234567', NULL, 'Y', 'N'
FROM households WHERE zone_num = 1 AND house_num = '001-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email, registered_voter, pwd)
SELECT household_id, 'Maria', 'Dela Cruz', '1978-08-22', 'F', 'M', 'College Graduate', '09181234567', NULL, 'Y', 'N'
FROM households WHERE zone_num = 1 AND house_num = '001-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email, registered_voter, pwd)
SELECT household_id, 'Jose', 'Dela Cruz', '2005-03-10', 'M', 'S', 'High School Level', NULL, NULL, 'N', 'N'
FROM households WHERE zone_num = 1 AND house_num = '001-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email, registered_voter, pwd)
SELECT household_id, 'Ana', 'Dela Cruz', '2008-11-28', 'F', 'S', 'Elementary Level', NULL, NULL, 'N', 'N'
FROM households WHERE zone_num = 1 AND house_num = '001-A';

-- Household 2 (Zone 1, House 002-B)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email, registered_voter, pwd)
SELECT household_id, 'Pedro', 'Santos', '1980-02-14', 'M', 'M', 'College Graduate', '09191234567', NULL, 'Y', 'N'
FROM households WHERE zone_num = 1 AND house_num = '002-B';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email, registered_voter, pwd)
SELECT household_id, 'Rosa', 'Santos', '1982-07-19', 'F', 'M', 'High School Graduate', '09201234567', NULL, 'Y', 'Y'
FROM households WHERE zone_num = 1 AND house_num = '002-B';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email, registered_voter, pwd)
SELECT household_id, 'Miguel', 'Santos', '2010-09-05', 'M', 'S', 'Elementary Level', NULL, NULL, 'N', 'N'
FROM households WHERE zone_num = 1 AND house_num = '002-B';

-- Household 3 (Zone 2, House 001-A)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email, registered_voter, pwd)
SELECT household_id, 'Antonio', 'Gonzales', '1970-12-25', 'M', 'M', 'Elementary Graduate', '09211234567', NULL, 'Y', 'N'
FROM households WHERE zone_num = 2 AND house_num = '001-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email, registered_voter, pwd)
SELECT household_id, 'Carmen', 'Gonzales', '1972-04-30', 'F', 'M', 'High School Graduate', '09221234567', NULL, 'Y', 'N'
FROM households WHERE zone_num = 2 AND house_num = '001-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email, registered_voter, pwd)
SELECT household_id, 'Roberto', 'Gonzales', '2000-06-15', 'M', 'S', 'College Level', '09231234567', NULL, 'Y', 'N'
FROM households WHERE zone_num = 2 AND house_num = '001-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email, registered_voter, pwd)
SELECT household_id, 'Elena', 'Gonzales', '2003-01-20', 'F', 'S', 'High School Graduate', NULL, NULL, 'Y', 'N'
FROM households WHERE zone_num = 2 AND house_num = '001-A';

-- Household 4 (Zone 2, House 002-C)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Carlos', 'Reyes', '1985-08-08', 'M', 'S', 'College Graduate', '09241234567', NULL
FROM households WHERE zone_num = 2 AND house_num = '002-C';

-- Household 5 (Zone 3, House 001-D)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Fernando', 'Martinez', '1968-03-17', 'M', 'M', 'Elementary Graduate', '09251234567', NULL
FROM households WHERE zone_num = 3 AND house_num = '001-D';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Gloria', 'Martinez', '1970-09-12', 'F', 'M', 'High School Graduate', '09261234567', NULL
FROM households WHERE zone_num = 3 AND house_num = '001-D';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Ramon', 'Martinez', '1998-11-03', 'M', 'M', 'Vocational Graduate', '09271234567', NULL
FROM households WHERE zone_num = 3 AND house_num = '001-D';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Lisa', 'Martinez', '2000-05-08', 'F', 'M', 'College Graduate', '09281234567', NULL
FROM households WHERE zone_num = 3 AND house_num = '001-D';

-- Household 6 (Zone 3, House 002-A)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Ricardo', 'Castillo', '1983-07-22', 'M', 'M', 'Vocational Graduate', '09291234567', NULL
FROM households WHERE zone_num = 3 AND house_num = '002-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Teresa', 'Castillo', '1985-12-14', 'F', 'M', 'College Graduate', '09301234567', NULL
FROM households WHERE zone_num = 3 AND house_num = '002-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Daniel', 'Castillo', '2012-02-28', 'M', 'S', 'Elementary Level', NULL, NULL
FROM households WHERE zone_num = 3 AND house_num = '002-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Sofia', 'Castillo', '2015-08-19', 'F', 'S', 'Elementary Level', NULL, NULL
FROM households WHERE zone_num = 3 AND house_num = '002-A';

-- Household 7 (Zone 4, House 001-B)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Alfredo', 'Flores', '1977-10-05', 'M', 'W', 'High School Graduate', '09311234567', NULL
FROM households WHERE zone_num = 4 AND house_num = '001-B';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Luis', 'Flores', '2004-04-12', 'M', 'S', 'High School Level', NULL, NULL
FROM households WHERE zone_num = 4 AND house_num = '001-B';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Patricia', 'Flores', '2007-06-25', 'F', 'S', 'Elementary Level', NULL, NULL
FROM households WHERE zone_num = 4 AND house_num = '001-B';

-- Household 8 (Zone 4, House 002-E)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Manuel', 'Garcia', '1990-01-30', 'M', 'M', 'Vocational Graduate', '09321234567', NULL
FROM households WHERE zone_num = 4 AND house_num = '002-E';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Angela', 'Garcia', '1992-03-18', 'F', 'M', 'College Graduate', '09331234567', NULL
FROM households WHERE zone_num = 4 AND house_num = '002-E';

-- Household 9 (Zone 5, House 001-F)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Rodrigo', 'Lopez', '1973-05-28', 'M', 'M', 'Elementary Graduate', '09341234567', NULL
FROM households WHERE zone_num = 5 AND house_num = '001-F';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Luz', 'Lopez', '1975-11-09', 'F', 'M', 'High School Graduate', '09351234567', NULL
FROM households WHERE zone_num = 5 AND house_num = '001-F';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Benjamin', 'Lopez', '2001-07-14', 'M', 'S', 'College Level', '09361234567', NULL
FROM households WHERE zone_num = 5 AND house_num = '001-F';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Isabella', 'Lopez', '2006-09-22', 'F', 'S', 'Elementary Level', NULL, NULL
FROM households WHERE zone_num = 5 AND house_num = '001-F';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Gabriel', 'Lopez', '2009-12-01', 'M', 'S', 'Elementary Level', NULL, NULL
FROM households WHERE zone_num = 5 AND house_num = '001-F';

-- Household 10 (Zone 5, House 002-A)
INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Eduardo', 'Rivera', '1987-02-11', 'M', 'M', 'College Graduate', '09371234567', NULL
FROM households WHERE zone_num = 5 AND house_num = '002-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Cristina', 'Rivera', '1989-08-04', 'F', 'M', 'College Graduate', '09381234567', NULL
FROM households WHERE zone_num = 5 AND house_num = '002-A';

INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, educational_attainment, contact_number, email)
SELECT household_id, 'Marco', 'Rivera', '2013-10-17', 'M', 'S', 'Elementary Level', NULL, NULL
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
SELECT 'H', h.household_id, 'Initial household registration', 'C', a.acc_id
FROM households h, account a WHERE h.zone_num = 1 AND h.house_num = '001-A' AND a.username = 'admin';

INSERT INTO audit_trail (record_type, record_id, details, change_type, acc_id)
SELECT 'H', h.household_id, 'Initial household registration', 'C', a.acc_id
FROM households h, account a WHERE h.zone_num = 1 AND h.house_num = '002-B' AND a.username = 'admin';

INSERT INTO audit_trail (record_type, record_id, details, change_type, acc_id)
SELECT 'R', r.resident_id, 'Initial resident registration', 'C', a.acc_id
FROM residents r, account a WHERE r.first_name = 'Juan' AND r.last_name = 'Dela Cruz' AND a.username = 'admin';

INSERT INTO audit_trail (record_type, record_id, details, change_type, acc_id)
SELECT 'R', r.resident_id, 'Initial resident registration', 'C', a.acc_id
FROM residents r, account a WHERE r.first_name = 'Maria' AND r.last_name = 'Dela Cruz' AND a.username = 'admin';

INSERT INTO audit_trail (record_type, record_id, details, change_type, acc_id)
SELECT 'S', s.staff_id, 'Staff member added', 'C', a.acc_id
FROM staff s, account a WHERE s.first_name = 'Hon. Yolanda M.' AND s.last_name = 'Beriña' AND a.username = 'admin';
