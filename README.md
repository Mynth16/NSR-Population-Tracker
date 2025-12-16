# NSR Population Tracker

A comprehensive population tracking and management system for Barangay New San Roque, built with PHP and MySQL.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Default Credentials](#default-credentials)
- [Project Structure](#project-structure)
- [Features](#features)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

Before setting up this project, ensure you have the following installed:

- **PHP 7.4 or higher**
- **MySQL 5.7+ or MariaDB 10.3+**
- **XAMPP** (recommended for Windows)
- **Git** (for cloning the repository)

## 📥 Installation

### Using XAMPP (Recommended)

1. **Install XAMPP**
   - Download from [https://www.apachefriends.org/](https://www.apachefriends.org/)
   - Install to the default location (usually `C:\xampp`)

2. **Clone the Repository**
   ```bash
   cd C:\xampp\htdocs
   git clone https://github.com/Mynth16/NSR-Population-Tracker.git
   ```
   Or if already cloned elsewhere, copy the folder to `C:\xampp\htdocs\`

3. **Start XAMPP Services**
   - Open XAMPP Control Panel
   - Start **Apache** (web server)
   - Start **MySQL** (database server)

## 💾 Database Setup

### 1. Create the Database

**Using phpMyAdmin (Recommended):**
1. Open [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
2. Click on "New" in the left sidebar
3. Enter database name: `nsr_population_tracker`
4. Select collation: `utf8mb4_general_ci`
5. Click "Create"

**Using Command Line:**
```bash
mysql -u root -p
CREATE DATABASE nsr_population_tracker;
exit;
```

### 2. Import Database Schema

**Using phpMyAdmin:**
1. Select the `nsr_population_tracker` database
2. Click on the "Import" tab
3. Click "Choose File" and select `backend/database.sql`
4. Click "Go" at the bottom

**Using Command Line:**
```bash
cd C:\xampp\htdocs\NSR-Population-Tracker
mysql -u root -p nsr_population_tracker < backend/database.sql
```

### 3. (Optional) Import Sample Data

If you want to start with sample data:
```bash
mysql -u root -p nsr_population_tracker < backend/seed.sql
```

### 4. Migrate to Short Codes (Optional)

If you need to migrate existing data to use short codes:
```bash
mysql -u root -p nsr_population_tracker < backend/migrate-to-short-codes.sql
```

## 🚀 Running the Application

### Using XAMPP (Recommended)

1. Ensure Apache and MySQL are running in XAMPP Control Panel
2. Open your browser and navigate to:
   - **Home Page:** [http://localhost/NSR-Population-Tracker/](http://localhost/NSR-Population-Tracker/)
   - **Login Page:** [http://localhost/NSR-Population-Tracker/login.php](http://localhost/NSR-Population-Tracker/login.php)
   - **Admin Dashboard:** [http://localhost/NSR-Population-Tracker/admin.php](http://localhost/NSR-Population-Tracker/admin.php)

### Verify Setup

Navigate to the test setup page to verify database connection and PHP configuration:
- [http://localhost/NSR-Population-Tracker/test-setup.php](http://localhost/NSR-Population-Tracker/test-setup.php)

Check database connectivity:
- [http://localhost/NSR-Population-Tracker/check-db.php](http://localhost/NSR-Population-Tracker/check-db.php)

## 🔑 Default Credentials

The system includes a default admin account:

- **Username:** `admin`
- **Password:** `admin123`

> ⚠️ **Security Warning:** Change the default password immediately after first login, especially in a production environment!

### Password Migration

If you need to migrate passwords to the secure hashing system:
```bash
cd C:\xampp\htdocs\NSR-Population-Tracker
php migrate-passwords.php
```

## 📁 Project Structure

```
NSR-Population-Tracker/
├── backend/
│   ├── api/                      # API endpoints
│   │   ├── accounts.php         # Account management
│   │   ├── audit-trail.php      # Audit trail logging
│   │   ├── auth.php             # Authentication
│   │   ├── households.php       # Household management
│   │   ├── residents.php        # Resident management
│   │   ├── staff.php            # Staff management
│   │   └── statistics.php       # Statistics and reports
│   ├── includes/                 # Shared PHP utilities
│   │   ├── auth.php             # Authentication helpers
│   │   ├── audit.php            # Audit logging
│   │   └── db.php               # Database connection
│   ├── config.php               # Database configuration
│   ├── database.sql             # Database schema
│   ├── seed.sql                 # Sample data
│   └── migrate-to-short-codes.sql  # Migration script
├── assets/
│   ├── css/
│   │   └── styles.css           # Custom styles
│   └── js/                       # JavaScript files
│       ├── app.js               # Main application logic
│       ├── audit.js             # Audit trail functionality
│       ├── auth.js              # Authentication
│       ├── dashboard.js         # Dashboard features
│       ├── households.js        # Household management
│       └── population.js        # Population tracking
├── images/                       # Image assets (logos, photos)
├── admin.php                     # Admin dashboard (main app)
├── index.php                     # Public home page
├── login.php                     # Login page
├── logout.php                    # Logout handler
├── test-setup.php               # Setup verification
├── check-db.php                 # Database connection check
├── migrate-passwords.php        # Password migration utility
└── README.md                    # This file
```

## ✨ Features

### Population Management
- Track residents and household information
- Manage demographic data
- Record personal details and family relationships
- Assign unique short codes to residents

### Household Management
- Create and manage household records
- Link residents to households
- Track household composition
- View household statistics

### User Management
- Role-based access control (Admin, Staff)
- Secure password hashing (bcrypt)
- Session-based authentication
- User account management

### Audit Trail
- Comprehensive activity logging
- Track all CRUD operations
- User action history
- Timestamp tracking

### Statistics & Reports
- Population demographics
- Household statistics
- Age distribution
- Gender ratios
- Real-time data visualization

### Security Features
- Password hashing with bcrypt
- SQL injection prevention (PDO prepared statements)
- XSS protection
- CSRF token support
- Session management

## 🔍 Troubleshooting

### Images Not Showing
- **Problem:** Logo and images don't display on login or index pages
- **Solution:** 
  1. Ensure you're accessing via `http://localhost/NSR-Population-Tracker/` (not localhost:8000)
  2. Verify the `<base href="/NSR-Population-Tracker/">` tag is present in HTML files
  3. Check that images exist in the `images/` folder
  4. Clear browser cache (Ctrl+F5)

### Cannot Login
- **Problem:** Login fails with correct credentials
- **Solution:**
  1. Verify database connection in `backend/config.php`
  2. Check that the `account` table exists and has data
  3. Run `migrate-passwords.php` to ensure passwords are properly hashed
  4. Check browser console for JavaScript errors
  5. Ensure the `<base href="/NSR-Population-Tracker/">` tag is in login.php

### Database Connection Failed
- **Problem:** "Connection failed" or database errors
- **Solution:** 
  1. Verify MySQL is running in XAMPP Control Panel
  2. Check database credentials in `backend/config.php`
  3. Ensure database `nsr_population_tracker` exists
  4. Run `test-setup.php` or `check-db.php` to diagnose

### PHP Files Showing as Plain Text
- **Problem:** Browser displays PHP code instead of executing it
- **Solution:** 
  1. Ensure Apache is running in XAMPP Control Panel
  2. Access via `http://localhost/` not `file:///`
  3. Verify PHP module is loaded in Apache

### Port 80 Already in Use (XAMPP)
- **Problem:** Apache won't start because port 80 is occupied
- **Solution:**
  1. Open XAMPP Control Panel
  2. Click "Config" for Apache
  3. Select "httpd.conf"
  4. Change `Listen 80` to `Listen 8080`
  5. Save and restart Apache
  6. Access via [http://localhost:8080/NSR-Population-Tracker/](http://localhost:8080/NSR-Population-Tracker/)

### Session Issues / Login Not Persistent
- **Problem:** Cannot stay logged in or session expires immediately
- **Solution:** 
  1. Ensure PHP session support is enabled
  2. Check that `session.save_path` is writable
  3. Clear browser cookies and localStorage
  4. Verify `Auth::startSession()` is called in backend files

### API Endpoints Not Working
- **Problem:** API calls return 404 or incorrect responses
- **Solution:**
  1. Verify the `<base href="/NSR-Population-Tracker/">` tag exists in HTML files
  2. Check browser Network tab for actual request URLs
  3. Ensure `.htaccess` is not blocking API requests
  4. Check that files exist in `backend/api/` folder

## 📚 Additional Documentation

- [Password Hashing Implementation](PASSWORD_HASHING_IMPLEMENTATION.md) - Details on secure password handling
- [PHP Migration Guide](PHP_MIGRATION_GUIDE.md) - Migration from older PHP versions
- [Quick Start Guide](QUICKSTART_PHP.md) - Fast setup instructions

## 🛡️ Security Considerations

For production deployment, ensure:

- ✅ Change all default passwords
- ✅ Enable HTTPS/SSL certificates
- ✅ Keep PHP and MySQL updated
- ✅ Disable `display_errors` in `php.ini`
- ✅ Set proper file permissions
- ✅ Implement regular database backups
- ✅ Use environment variables for sensitive config
- ✅ Enable CSRF protection
- ✅ Implement rate limiting for login attempts

## 🤝 Contributing

This is a barangay-specific project for Barangay New San Roque. For suggestions or issues, please contact the development team.

## 📝 License

This project is developed for Barangay New San Roque population management.

---

**Version:** 1.0  
**Last Updated:** December 2025  
**Maintainer:** Barangay New San Roque IT Team
