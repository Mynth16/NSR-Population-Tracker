/*
  # Insert Sample Resident Data

  1. Purpose
    - Populate the database with sample residents from the frontend demo data
    - Create test households for the residents
    - Provide initial data for the population management system

  2. Data Added
    - 1 sample household (Zone 1, House 1)
    - 10 sample residents with first name, last name, civil status, gender, and birth dates
    - All residents are linked to the sample household

  3. Important Notes
    - Birth dates are calculated based on ages from original demo data
    - Household is marked as active
    - All residents have active status
*/

DO $$
DECLARE
  household_id uuid;
BEGIN
  INSERT INTO households (zone_num, house_num, address, status)
  VALUES (1, '1', 'Zone 1, House 1, Barangay New San Roque', 'active')
  RETURNING households.household_id INTO household_id;

  INSERT INTO residents (first_name, last_name, civil_status, gender, birth_date, status, household_id)
  VALUES
    ('Juan', 'Dela Cruz', 'married', 'male', '1989-01-15'::date, 'active', household_id),
    ('Maria', 'Santos', 'single', 'female', '1996-05-22'::date, 'active', household_id),
    ('Pedro', 'Reyes', 'married', 'male', '1979-03-10'::date, 'active', household_id),
    ('Ana', 'Garcia', 'married', 'female', '1992-08-18'::date, 'active', household_id),
    ('Carlos', 'Mendoza', 'widowed', 'male', '1972-06-05'::date, 'active', household_id),
    ('Rosa', 'Flores', 'single', 'female', '2000-11-30'::date, 'active', household_id),
    ('Miguel', 'Torres', 'married', 'male', '1983-09-20'::date, 'active', household_id),
    ('Elena', 'Ramos', 'single', 'female', '1995-12-14'::date, 'active', household_id),
    ('Ricardo', 'Cruz', 'married', 'male', '1986-07-25'::date, 'active', household_id),
    ('Sofia', 'Hernandez', 'married', 'female', '1991-02-28'::date, 'active', household_id);

END $$;
