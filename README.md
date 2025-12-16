<<<<<<< HEAD
# NSR Population Tracker

A comprehensive population tracking and management system built with PHP and MySQL.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Default Credentials](#default-credentials)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

Before setting up this project, ensure you have the following installed:

- **PHP 7.4 or higher**
- **MySQL 5.7+ or MariaDB 10.3+**
- **XAMPP** (recommended) or any PHP development environment
- **Git** (for cloning the repository)

## 📥 Installation

### Option 1: Using XAMPP (Recommended for Windows)

1. **Install XAMPP**
   - Download from [https://www.apachefriends.org/](https://www.apachefriends.org/)
   - Install to the default location (usually `C:\xampp`)

2. **Clone the Repository**
   ```bash
   cd C:\xampp\htdocs
   git clone <repository-url> NSR-Population-Tracker
   ```
   Or if already cloned elsewhere, copy the folder to `C:\xampp\htdocs\`

3. **Start XAMPP Services**
   - Open XAMPP Control Panel
   - Start **Apache** (web server)
   - Start **MySQL** (database server)

### Option 2: Using PHP Built-in Server

1. **Clone the Repository**
   ```bash
   git clone <repository-url> NSR-Population-Tracker
   cd NSR-Population-Tracker
   ```

2. **Ensure MySQL is Running**
   - Make sure you have MySQL or MariaDB running on your system

## 💾 Database Setup

### 1. Create the Database

**Using phpMyAdmin (XAMPP):**
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
mysql -u root -p nsr_population_tracker < backend/database.sql
```

### 3. (Optional) Import Sample Data

If you want to start with sample data:
```bash
mysql -u root -p nsr_population_tracker < backend/seed.sql
```

### 4. Create Admin Account

Run the password migration script to create an admin account with hashed passwords:
```bash
php migrate-passwords.php
```

Or manually create an admin account:
```sql
USE nsr_population_tracker;

INSERT INTO account (acc_id, username, password, role, created_at) 
VALUES (
    UUID(), 
    'admin', 
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: admin123
    'A',
    NOW()
);
```

## ⚙️ Configuration

### 1. Database Configuration

Edit `backend/config.php` if your database credentials are different:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', ''); // Update if you have a MySQL password
define('DB_NAME', 'nsr_population_tracker');
```

### 2. Base URL Configuration

If using XAMPP and the folder name is different, update:
```php
define('BASE_URL', '/NSR-Population-Tracker'); // Change if your folder name is different
```

If using PHP built-in server, set to:
```php
define('BASE_URL', '');
```

## 🚀 Running the Application

### Using XAMPP

1. Ensure Apache and MySQL are running in XAMPP Control Panel
2. Open your browser and navigate to:
   - **Home Page:** [http://localhost/NSR-Population-Tracker/index.php](http://localhost/NSR-Population-Tracker/index.php)
   - **Login Page:** [http://localhost/NSR-Population-Tracker/login.php](http://localhost/NSR-Population-Tracker/login.php)
   - **Admin Dashboard:** [http://localhost/NSR-Population-Tracker/admin.php](http://localhost/NSR-Population-Tracker/admin.php)

### Using PHP Built-in Server

1. Open terminal/PowerShell in the project directory
2. Run the development server:
   ```bash
   php -S localhost:8000
   ```
3. Open your browser and navigate to:
   - **Home Page:** [http://localhost:8000/index.php](http://localhost:8000/index.php)
   - **Login Page:** [http://localhost:8000/login.php](http://localhost:8000/login.php)
   - **Admin Dashboard:** [http://localhost:8000/admin.php](http://localhost:8000/admin.php)

### Verify Setup

Navigate to the test setup page to verify all components:
- XAMPP: [http://localhost/NSR-Population-Tracker/test-setup.php](http://localhost/NSR-Population-Tracker/test-setup.php)
- Built-in Server: [http://localhost:8000/test-setup.php](http://localhost:8000/test-setup.php)

## 🔑 Default Credentials

After running the password migration script or creating an admin account:

- **Username:** `admin`
- **Password:** `admin123`

> ⚠️ **Security Warning:** Change the default password immediately after first login in a production environment!

## 📁 Project Structure

```
NSR-Population-Tracker/
├── backend/
│   ├── api/              # API endpoints
│   │   ├── accounts.php
│   │   ├── auth.php
│   │   ├── households.php
│   │   ├── residents.php
│   │   └── statistics.php
│   ├── includes/         # Shared PHP utilities
│   │   ├── auth.php
│   │   ├── audit.php
│   │   └── db.php
│   ├── config.php        # Configuration file
│   ├── database.sql      # Database schema
│   └── seed.sql          # Sample data
├── assets/
│   ├── css/              # Stylesheets
│   └── js/               # JavaScript files
├── images/               # Image assets
├── admin.php             # Admin dashboard
├── index.php             # Public home page
├── login.php             # Login page
└── README.md             # This file
```

## 🔍 Troubleshooting

### PHP Files Showing as Plain Text
- **Problem:** Browser displays PHP code instead of executing it
- **Solution:** Ensure Apache is running in XAMPP or use `php -S localhost:8000`

### Database Connection Failed
- **Problem:** "Connection failed" errors
- **Solution:** 
  1. Verify MySQL is running
  2. Check database credentials in `backend/config.php`
  3. Ensure database `nsr_population_tracker` exists

### Port 80 Already in Use (XAMPP)
- **Problem:** Apache won't start because port 80 is occupied
- **Solution:**
  1. Open XAMPP Control Panel
  2. Click "Config" for Apache
  3. Select "httpd.conf"
  4. Change `Listen 80` to `Listen 8080`
  5. Save and restart Apache
  6. Access via [http://localhost:8080/NSR-Population-Tracker/](http://localhost:8080/NSR-Population-Tracker/)

### Session Issues / Login Not Working
- **Problem:** Cannot stay logged in or session expires immediately
- **Solution:** Ensure PHP session support is enabled and `session.save_path` is writable

### Permission Errors (Linux/Mac)
- **Problem:** File permission errors
- **Solution:**
  ```bash
  chmod -R 755 NSR-Population-Tracker
  chmod -R 777 NSR-Population-Tracker/uploads # if uploads directory exists
  ```

## 📚 Additional Documentation

- [Password Hashing Implementation](PASSWORD_HASHING_IMPLEMENTATION.md)
- [PHP Migration Guide](PHP_MIGRATION_GUIDE.md)
- [Quick Start Guide](QUICKSTART_PHP.md)

## 🤝 Support

If you encounter any issues not covered in this guide, please check the documentation files or verify your PHP and MySQL installations.

---

**Note:** This application is designed for local development. For production deployment, ensure proper security measures are in place, including:
- Strong passwords
- HTTPS/SSL certificates
- Updated PHP and MySQL versions
- Proper error handling (disable `display_errors`)
- Regular backups
=======
follow the setup guide
>>>>>>> 18f984af9c0341a68173c23eaf84c1c32a479c52
