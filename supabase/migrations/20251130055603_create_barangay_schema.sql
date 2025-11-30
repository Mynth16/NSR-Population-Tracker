/*
  # Barangay New San Roque Database Schema

  ## Overview
  This migration creates the complete database schema for the Barangay New San Roque 
  Population Tracking System with proper relationships, constraints, and security policies.

  ## New Tables

  ### 1. households
  - `household_id` (uuid, primary key) - Unique identifier for each household
  - `zone_num` (integer) - Zone/Purok number (1-7)
  - `house_num` (text) - House number within the zone
  - `address` (text) - Full address of the household
  - `status` (text) - Status of household (active, inactive)
  - `head_resident_id` (uuid, nullable) - Reference to the household head (resident)
  - `created_at` (timestamptz) - Timestamp of record creation
  - `updated_at` (timestamptz) - Timestamp of last update

  ### 2. residents
  - `resident_id` (uuid, primary key) - Unique identifier for each resident
  - `first_name` (text) - First name of the resident
  - `last_name` (text) - Last name of the resident
  - `civil_status` (text) - Civil status (single, married, widowed, separated)
  - `gender` (text) - Gender (male, female)
  - `birth_date` (date) - Date of birth
  - `educational_attainment` (text) - Highest educational level achieved
  - `contact_number` (text, nullable) - Contact phone number
  - `email` (text, nullable) - Email address
  - `status` (text) - Status (active, deceased, moved out)
  - `household_id` (uuid) - Foreign key to households table
  - `created_at` (timestamptz) - Timestamp of record creation
  - `updated_at` (timestamptz) - Timestamp of last update

  ### 3. staff
  - `staff_id` (uuid, primary key) - Unique identifier for each staff member
  - `first_name` (text) - First name of staff
  - `last_name` (text) - Last name of staff
  - `title` (text) - Official position/title
  - `picture` (text, nullable) - URL or path to staff picture
  - `created_at` (timestamptz) - Timestamp of record creation
  - `updated_at` (timestamptz) - Timestamp of last update

  ### 4. accounts
  - `acc_id` (uuid, primary key) - Unique identifier for each account
  - `username` (text, unique) - Login username
  - `password` (text) - Hashed password
  - `role` (text) - User role (admin, staff, viewer)
  - `created_at` (timestamptz) - Timestamp of record creation
  - `updated_at` (timestamptz) - Timestamp of last update

  ### 5. audit_trail
  - `audit_id` (uuid, primary key) - Unique identifier for each audit entry
  - `record_type` (text) - Type of record changed (household, resident, etc.)
  - `record_id` (uuid) - ID of the record that was changed
  - `details` (jsonb) - JSON object containing change details
  - `change_type` (text) - Type of change (insert, update, delete)
  - `change_date` (timestamptz) - When the change occurred
  - `acc_id` (uuid, nullable) - Account that made the change
  - `created_at` (timestamptz) - Timestamp of record creation

  ## Security
  - Enable RLS on all tables
  - Admin users can perform all operations
  - Staff users can read and update most data
  - Viewer users have read-only access
  - Audit trail is append-only for non-admin users

  ## Important Notes
  - All foreign key constraints are enforced
  - Timestamps are automatically managed
  - The head_resident_id in households can be NULL initially and updated after resident creation
  - Passwords should be hashed before storage
*/

-- Create households table
CREATE TABLE IF NOT EXISTS households (
  household_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_num integer NOT NULL CHECK (zone_num >= 1 AND zone_num <= 7),
  house_num text NOT NULL,
  address text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  head_resident_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create residents table
CREATE TABLE IF NOT EXISTS residents (
  resident_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  civil_status text NOT NULL CHECK (civil_status IN ('single', 'married', 'widowed', 'separated')),
  gender text NOT NULL CHECK (gender IN ('male', 'female')),
  birth_date date NOT NULL,
  educational_attainment text DEFAULT '',
  contact_number text,
  email text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'deceased', 'moved out')),
  household_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  FOREIGN KEY (household_id) REFERENCES households(household_id) ON DELETE CASCADE
);

-- Add foreign key constraint for head_resident_id (after residents table exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'households_head_resident_id_fkey'
  ) THEN
    ALTER TABLE households 
    ADD CONSTRAINT households_head_resident_id_fkey 
    FOREIGN KEY (head_resident_id) REFERENCES residents(resident_id) ON DELETE SET NULL;
  END IF;
END $$;

-- Create staff table
CREATE TABLE IF NOT EXISTS staff (
  staff_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  title text NOT NULL,
  picture text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create accounts table
CREATE TABLE IF NOT EXISTS accounts (
  acc_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  role text NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'staff', 'viewer')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create audit_trail table
CREATE TABLE IF NOT EXISTS audit_trail (
  audit_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  record_type text NOT NULL,
  record_id uuid NOT NULL,
  details jsonb DEFAULT '{}'::jsonb,
  change_type text NOT NULL CHECK (change_type IN ('insert', 'update', 'delete')),
  change_date timestamptz DEFAULT now(),
  acc_id uuid,
  created_at timestamptz DEFAULT now(),
  FOREIGN KEY (acc_id) REFERENCES accounts(acc_id) ON DELETE SET NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_households_zone ON households(zone_num);
CREATE INDEX IF NOT EXISTS idx_households_status ON households(status);
CREATE INDEX IF NOT EXISTS idx_residents_household ON residents(household_id);
CREATE INDEX IF NOT EXISTS idx_residents_status ON residents(status);
CREATE INDEX IF NOT EXISTS idx_residents_name ON residents(last_name, first_name);
CREATE INDEX IF NOT EXISTS idx_audit_trail_record ON audit_trail(record_type, record_id);
CREATE INDEX IF NOT EXISTS idx_audit_trail_date ON audit_trail(change_date DESC);

-- Enable Row Level Security
ALTER TABLE households ENABLE ROW LEVEL SECURITY;
ALTER TABLE residents ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_trail ENABLE ROW LEVEL SECURITY;

-- RLS Policies for households table
CREATE POLICY "Admin full access to households"
  ON households FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role = 'admin'
    )
  );

CREATE POLICY "Staff can view and edit households"
  ON households FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role IN ('admin', 'staff', 'viewer')
    )
  );

CREATE POLICY "Staff can insert households"
  ON households FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Staff can update households"
  ON households FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role IN ('admin', 'staff')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Only admin can delete households"
  ON households FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role = 'admin'
    )
  );

-- RLS Policies for residents table
CREATE POLICY "Admin full access to residents"
  ON residents FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role = 'admin'
    )
  );

CREATE POLICY "Staff can view residents"
  ON residents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role IN ('admin', 'staff', 'viewer')
    )
  );

CREATE POLICY "Staff can insert residents"
  ON residents FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Staff can update residents"
  ON residents FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role IN ('admin', 'staff')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Only admin can delete residents"
  ON residents FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role = 'admin'
    )
  );

-- RLS Policies for staff table
CREATE POLICY "Anyone can view staff"
  ON staff FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admin can manage staff"
  ON staff FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role = 'admin'
    )
  );

-- RLS Policies for accounts table
CREATE POLICY "Users can view own account"
  ON accounts FOR SELECT
  TO authenticated
  USING (acc_id = auth.uid());

CREATE POLICY "Admin can view all accounts"
  ON accounts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role = 'admin'
    )
  );

CREATE POLICY "Only admin can manage accounts"
  ON accounts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role = 'admin'
    )
  );

-- RLS Policies for audit_trail table
CREATE POLICY "Admin can view all audit logs"
  ON audit_trail FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role = 'admin'
    )
  );

CREATE POLICY "Staff can view audit logs"
  ON audit_trail FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role IN ('admin', 'staff')
    )
  );

CREATE POLICY "All authenticated users can insert audit logs"
  ON audit_trail FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid()
    )
  );

CREATE POLICY "Only admin can delete audit logs"
  ON audit_trail FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM accounts 
      WHERE accounts.acc_id = auth.uid() 
      AND accounts.role = 'admin'
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
DROP TRIGGER IF EXISTS update_households_updated_at ON households;
CREATE TRIGGER update_households_updated_at
  BEFORE UPDATE ON households
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_residents_updated_at ON residents;
CREATE TRIGGER update_residents_updated_at
  BEFORE UPDATE ON residents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_staff_updated_at ON staff;
CREATE TRIGGER update_staff_updated_at
  BEFORE UPDATE ON staff
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_accounts_updated_at ON accounts;
CREATE TRIGGER update_accounts_updated_at
  BEFORE UPDATE ON accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
