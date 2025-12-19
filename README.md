# NSR Population Tracker

A comprehensive population tracking and management system for Barangay New San Roque, built with PHP and MySQL. Features a responsive design for mobile and desktop, with Docker support for easy deployment.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Using XAMPP (Local Development)](#using-xampp-recommended)
  - [Using Docker (Deployment)](#using-docker)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Default Credentials](#default-credentials)
- [Project Structure](#project-structure)
- [Features](#features)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

### For Local Development (XAMPP)
- **PHP 7.4 or higher**
- **MySQL 5.7+ or MariaDB 10.3+**
- **XAMPP** (recommended for Windows)
- **Git** (for cloning the repository)

### For Docker Deployment
- **Docker Desktop** (for Windows/Mac)
- **Docker and Docker Compose** (for Linux)
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

### Using Docker

1. **Install Docker Desktop**
   - Download from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
   - Install and start Docker Desktop

2. **Clone the Repository**
   ```bash
   git clone https://github.com/Mynth16/NSR-Population-Tracker.git
   cd NSR-Population-Tracker
   ```

3. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access the Application**
   - Open browser to [http://localhost:8080](http://localhost:8080)
   - The database is automatically set up with the schema

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

### Using XAMPP

1. Ensure Apache and MySQL are running in XAMPP Control Panel
2. Open your browser and navigate to:
   - **Home Page:** [http://localhost/NSR-Population-Tracker/](http://localhost/NSR-Population-Tracker/)
   - **Login Page:** [http://localhost/NSR-Population-Tracker/login.php](http://localhost/NSR-Population-Tracker/login.php)
   - **Admin Dashboard:** [http://localhost/NSR-Population-Tracker/admin.php](http://localhost/NSR-Population-Tracker/admin.php)

> 💡 **Quick Start:** Run `start-server.bat` for setup instructions and guidance.

### Using Docker

1. Start the application:
   ```bash
   docker-compose up -d
   ```

2. Access the application:
   - **All Pages:** [http://localhost:8080](http://localhost:8080)
   - Database is automatically available on port 3306

3. View logs:
   ```bash
   docker-compose logs -f
   ```

4. Stop the application:
   ```bash
   docker-compose down
   ```

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
│       ├── accounts.js          # Account management
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
├── start-server.bat             # XAMPP setup guide script
├── deploy.bat                   # Docker Hub deployment script
├── Dockerfile                   # Docker image configuration
├── docker-compose.yml           # Docker Compose for local dev
├── docker-compose.prod.yml      # Docker Compose for production
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
- Account creation and deletion

### Audit Trail
- Comprehensive activity logging
- Track all CRUD operations (Create, Update, Delete)
- User action history with filtering
- Timestamp tracking
- Record type and change type categorization

### Statistics & Reports
- Population demographics
- Household statistics
- Age distribution
- Gender ratios
- Real-time data visualization

### Mobile Responsive Design
- Fully responsive layout for mobile, tablet, and desktop
- Mobile-optimized navigation with hamburger menu
- Card-based mobile view for data tables
- Touch-friendly interface
- Adaptive forms and inputs for mobile devices

### Security Features
- Password hashing with bcrypt
- SQL injection prevention (PDO prepared statements)
- XSS protection
- CSRF token support
- Session management

## 🚢 Deployment

### Docker Hub Deployment

The project includes automated Docker deployment to Docker Hub:

1. **Build and Push to Docker Hub**
   ```bash
   # Windows
   deploy.bat
   
   # Linux/Mac
   docker build -t gabcat/nsr-population-tracker:latest .
   docker push gabcat/nsr-population-tracker:latest
   ```

2. **Pull and Run from Docker Hub**
   ```bash
   docker pull gabcat/nsr-population-tracker:latest
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Production Deployment

For production environments:

1. **Update Database Configuration**
   - Edit `backend/config.php` with production database credentials
   - Or use environment variables in Docker

2. **Configure Environment**
   - Set `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME` environment variables
   - Update `docker-compose.prod.yml` with your database settings

3. **Security Checklist**
   - Change default admin password
   - Enable HTTPS/SSL
   - Update PHP settings in Dockerfile for production
   - Configure proper file permissions
   - Set up regular database backups

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

### Docker Issues

#### Container Won't Start
- **Problem:** Docker container fails to start
- **Solution:**
  1. Check Docker Desktop is running
  2. Run `docker-compose logs` to see error messages
  3. Ensure ports 8080 and 3306 are not in use
  4. Try `docker-compose down` then `docker-compose up -d`

#### Database Connection Failed in Docker
- **Problem:** Application can't connect to database in Docker
- **Solution:**
  1. Verify `backend/config.php` uses `DB_HOST='db'` for Docker
  2. Check `docker-compose.yml` database credentials
  3. Wait a few seconds after starting for MySQL to initialize
  4. Run `docker-compose restart`

#### Port Conflicts
- **Problem:** Port 8080 or 3306 already in use
- **Solution:**
  1. Edit `docker-compose.yml` to use different ports
  2. Change `"8080:80"` to `"8081:80"` for web
  3. Change `"3306:3306"` to `"3307:3306"` for database


### Utility Scripts

- `start-server.bat` - Display setup instructions and guidance for XAMPP
- `deploy.bat` - Build and push Docker image to Docker Hub
- `migrate-passwords.php` - Migrate passwords to bcrypt hashing
- `test-setup.php` - Verify PHP configuration and setup
- `check-db.php` - Test database connectivity
