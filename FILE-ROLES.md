# File Roles and Responsibilities

This document provides a detailed list of all JavaScript and PHP files in the NSR Population Tracker system, describing each file's role, key functions, and responsibilities.

---

## JavaScript Files

- **assets/js/accounts.js**  
  Manages the Account Management page in the admin panel. Includes functions to load/display the accounts table (both desktop and mobile views), fetch accounts from the API, render the table, and handle add/edit account modals. Supports CRUD operations for user accounts via AJAX calls to the backend.

- **assets/js/app.js**  
  Main application entry point for the admin panel. Initializes the admin dashboard after DOM loads, handles mobile menu toggling, manages sidebar navigation, sets up event listeners for navigation items and logout, and loads the appropriate page content (dashboard, population, households, accounts, audit-trail) based on user selection. Integrates with Auth for session and user info.

- **assets/js/audit.js**  
  Handles the Audit Trail page in the admin panel. Loads and displays audit log entries in a filterable table (desktop and mobile views). Supports filtering by record type, change type, and entry limit. Fetches audit data from the API and renders results with user/action/date details.

- **assets/js/auth.js**  
  Provides frontend authentication utilities for the system. Exposes the `Auth` object with methods for login, logout, session checking, user info storage (localStorage), authentication state, and active page management. Handles the login form submission, shows loading/error states, and redirects users on successful login.

- **assets/js/dashboard.js**  
  Renders the Dashboard page with key population statistics. Displays cards for total population, households, male/female counts, registered voters, and PWD. Fetches statistics and zone/age distribution data from the API and dynamically updates the UI.

- **assets/js/households.js**  
  Manages the Household Management page. Loads and displays all households in a table (with zone, house number, head of household, resident count, status). Supports searching, add/edit/delete household modals, and communicates with the households API for CRUD operations.

- **assets/js/population.js**  
  Manages the Population Management (Residents) page. Loads and displays all residents in a filterable/searchable table. Supports filters for gender, civil status, age range, zone, status, voter registration, and PWD. Includes add/edit/delete resident modals and communicates with the residents API.

---

## PHP Files

- **admin.php**  
  Main admin dashboard page. Starts session, includes authentication, and renders the admin panel HTML with sidebar navigation (dashboard, population, households, accounts, audit trail), user info section, and main content area. Loads all JS assets for admin features.

- **check-db.php**  
  Diagnostic script to verify database setup. Checks MySQL connection, confirms the `account` table exists, counts accounts, and verifies the presence of the admin account. Outputs status and troubleshooting instructions if issues are found.

- **index.php**  
  Public landing page for the application. Displays the hero section with Barangay New San Roque branding, links to login, and information about the population management system. Does not require authentication.

- **login.php**  
  Displays the login form for users. Includes username/password fields, error message display, and a login button. Uses auth.js for form submission and authentication logic.

- **logout.php**  
  Handles user logout. Calls Auth::logout() to destroy the session and redirects the user to the login page.

- **migrate-passwords.php**  
  One-time migration script for converting plaintext passwords to bcrypt hashes. Iterates over all accounts, checks if passwords are already hashed, and updates them using PHP's password_hash(). Outputs migration status for each account.

- **test-setup.php**  
  Environment verification script. Checks PHP version, required extensions (MySQLi, sessions), database connectivity, table existence, file/directory permissions, and required files. Outputs a diagnostic report for setup troubleshooting.

---

## Backend Configuration

- **backend/config.php**  
  Defines database connection constants (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME), API and base URL, session lifetime, and environment detection. Supports environment variables for Docker and toggles error reporting based on production mode.

- **backend/database.sql**  
  SQL schema file defining the structure of all database tables (account, households, residents, staff, audit_trail, etc.). Used for initial database setup.

- **backend/seed.sql**  
  SQL seed file for populating the database with initial/sample data (e.g., default admin account, sample households/residents).

---

## API Endpoints

- **backend/api/accounts.php**  
  RESTful API for account management. Supports GET (list/single), POST (create), PUT (update), and DELETE. Validates input, checks permissions (admin only for create), hashes passwords, and logs actions to the audit trail.

- **backend/api/audit-trail.php**  
  API for retrieving and creating audit trail entries. Supports filtering by record type, record ID, and limit. Returns audit entries with associated usernames.

- **backend/api/auth.php**  
  Authentication API. Handles login (POST, verifies credentials, starts session), logout (POST, destroys session), and session check (GET, returns authentication state and user info).

- **backend/api/households.php**  
  RESTful API for household management. Supports GET (list/single with residents), POST (create), PUT (update), and DELETE. Validates permissions, logs changes to audit trail, and returns household data with resident counts.

- **backend/api/residents.php**  
  RESTful API for resident management. Supports GET (list/single), POST (create), PUT (update), and DELETE. Handles filtering, validates permissions, logs changes to audit trail, and returns resident data with household info.

- **backend/api/staff.php**  
  RESTful API for staff management. Supports GET (list/single), POST (create), PUT (update), and DELETE. Logs changes to audit trail.

- **backend/api/statistics.php**  
  API for retrieving population statistics. Endpoints for overall population stats, per-zone stats, and age distribution (grouped by age brackets).

---

## Backend Includes

- **backend/includes/audit.php**  
  AuditTrail utility class. Provides static methods to log changes (log()), compare old/new data for changed fields (getChangedFields()), and format changes for display (formatChanges()). Used by all API endpoints for audit logging.

- **backend/includes/auth.php**  
  Auth utility class. Handles session management, login (with bcrypt password verification), logout, authentication checks, role-based access (requireAuth, requireAdmin, requireEditor), and retrieval of the current user.

- **backend/includes/db.php**  
  Database singleton class. Provides a connection to MySQL, prepared statement execution, fetch methods (fetchAll, fetchOne), execute, UUID generation, and transaction support. Used by all backend scripts for database access.
