# File Roles and Responsibilities

This document provides a brief, flat list of all JavaScript and PHP files in the system, with a one-line description of each file's role or responsibility.

---

## JavaScript Files

- assets/js/accounts.js: Handles user account management functionality on the frontend.
- assets/js/app.js: Main application logic and general UI interactions.
- assets/js/audit.js: Manages audit trail display and related frontend logic.
- assets/js/auth.js: Handles authentication-related frontend actions.
- assets/js/dashboard.js: Controls dashboard UI and data visualization.
- assets/js/households.js: Manages household-related frontend operations.
- assets/js/population.js: Handles population data display and interactions on the frontend.

## PHP Files

- admin.php: Admin dashboard or entry point for admin features.
- check-db.php: Checks database connection or status.
- index.php: Main landing page or entry point of the application.
- login.php: Handles user login interface and logic.
- logout.php: Handles user logout process.
- migrate-passwords.php: Migrates or updates user password storage.
- test-setup.php: Used for testing or initializing the application setup.

### Backend/API
- backend/config.php: Configuration settings for backend (e.g., DB credentials).
- backend/database.sql: SQL schema for database structure.
- backend/seed.sql: SQL script for populating the database with initial data.

#### API Endpoints
- backend/api/accounts.php: API for account management operations.
- backend/api/audit-trail.php: API for audit trail data.
- backend/api/auth.php: API for authentication actions.
- backend/api/households.php: API for household-related operations.
- backend/api/residents.php: API for resident data management.
- backend/api/staff.php: API for staff management.
- backend/api/statistics.php: API for statistics and reporting.

#### Backend Includes
- backend/includes/audit.php: Backend logic for audit trail features.
- backend/includes/auth.php: Backend logic for authentication.
- backend/includes/db.php: Database connection and helper functions.
