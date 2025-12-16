-- Database Migration Script: Convert to Optimized ENUM Short Codes
-- WARNING: This script modifies existing data. Backup your database before running!
-- 
-- Run this script AFTER updating the application code but BEFORE deploying
-- or when converting an existing database to use the new schema
--
-- Usage: mysql -u root -p nsr_population_tracker < migrate-to-short-codes.sql

USE nsr_population_tracker;

-- Start transaction for safety
START TRANSACTION;

-- ============================================================================
-- PHASE 1: AUDIT_TRAIL TABLE (Highest volume, safest to test first)
-- ============================================================================

-- Update audit_trail.record_type
UPDATE audit_trail SET record_type = 'H' WHERE record_type = 'household';
UPDATE audit_trail SET record_type = 'R' WHERE record_type = 'resident';
UPDATE audit_trail SET record_type = 'S' WHERE record_type = 'staff';
UPDATE audit_trail SET record_type = 'A' WHERE record_type = 'account';

-- Update audit_trail.change_type
UPDATE audit_trail SET change_type = 'C' WHERE change_type = 'create';
UPDATE audit_trail SET change_type = 'U' WHERE change_type = 'update';
UPDATE audit_trail SET change_type = 'D' WHERE change_type = 'delete';

-- ============================================================================
-- PHASE 2: RESIDENTS TABLE (Critical user-facing data)
-- ============================================================================

-- Update residents.gender
UPDATE residents SET gender = 'M' WHERE gender = 'male';
UPDATE residents SET gender = 'F' WHERE gender = 'female';

-- Update residents.civil_status
UPDATE residents SET civil_status = 'S' WHERE civil_status = 'single';
UPDATE residents SET civil_status = 'M' WHERE civil_status = 'married';
UPDATE residents SET civil_status = 'W' WHERE civil_status = 'widowed';
UPDATE residents SET civil_status = 'SEP' WHERE civil_status = 'separated';
UPDATE residents SET civil_status = 'D' WHERE civil_status = 'divorced';

-- Update residents.status
UPDATE residents SET status = 'A' WHERE status = 'active';
UPDATE residents SET status = 'D' WHERE status = 'deceased';
UPDATE residents SET status = 'M' WHERE status = 'moved';
UPDATE residents SET status = 'X' WHERE status = 'archived';

-- ============================================================================
-- PHASE 3: HOUSEHOLDS TABLE
-- ============================================================================

-- Update households.status
UPDATE households SET status = 'A' WHERE status = 'active';
UPDATE households SET status = 'I' WHERE status = 'inactive';
UPDATE households SET status = 'X' WHERE status = 'archived';

-- ============================================================================
-- PHASE 4: STAFF TABLE
-- ============================================================================

-- Update staff.category
UPDATE staff SET category = 'L' WHERE category = 'leadership';
UPDATE staff SET category = 'O' WHERE category = 'official';
UPDATE staff SET category = 'H' WHERE category = 'health';

-- ============================================================================
-- PHASE 5: ACCOUNT TABLE (Security-sensitive, handle carefully)
-- ============================================================================

-- Update account.role
UPDATE account SET role = 'A' WHERE role = 'admin';
UPDATE account SET role = 'S' WHERE role = 'staff';
UPDATE account SET role = 'V' WHERE role = 'viewer';

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify audit_trail conversions
SELECT 'Audit Trail Record Types:' as check_name;
SELECT record_type, COUNT(*) as count FROM audit_trail GROUP BY record_type;

SELECT 'Audit Trail Change Types:' as check_name;
SELECT change_type, COUNT(*) as count FROM audit_trail GROUP BY change_type;

-- Verify residents conversions
SELECT 'Resident Genders:' as check_name;
SELECT gender, COUNT(*) as count FROM residents GROUP BY gender;

SELECT 'Resident Civil Status:' as check_name;
SELECT civil_status, COUNT(*) as count FROM residents GROUP BY civil_status;

SELECT 'Resident Status:' as check_name;
SELECT status, COUNT(*) as count FROM residents GROUP BY status;

-- Verify households conversions
SELECT 'Household Status:' as check_name;
SELECT status, COUNT(*) as count FROM households GROUP BY status;

-- Verify staff conversions
SELECT 'Staff Categories:' as check_name;
SELECT category, COUNT(*) as count FROM staff GROUP BY category;

-- Verify account conversions
SELECT 'Account Roles:' as check_name;
SELECT role, COUNT(*) as count FROM account GROUP BY role;

-- ============================================================================
-- COMMIT OR ROLLBACK
-- ============================================================================

-- Review the verification queries above
-- If everything looks correct, commit the transaction:
COMMIT;

-- If there are any issues, rollback instead:
-- ROLLBACK;

-- ============================================================================
-- POST-MIGRATION NOTES
-- ============================================================================
-- After successful migration:
-- 1. Test all application features thoroughly
-- 2. Verify statistics and reports display correctly
-- 3. Test all CRUD operations (Create, Read, Update, Delete)
-- 4. Check audit trail logging
-- 5. Verify user authentication and authorization
-- ============================================================================
