# Quick Start Guide - PHP/jQuery Version

## 🚀 Get Started in 3 Steps

### Step 1: Start PHP Development Server

Open PowerShell in the project directory and run:

```powershell
php -S localhost:8000
```

You should see:
```
PHP 8.x Development Server (http://localhost:8000) started
```

### Step 2: Verify Setup

Open your browser and go to:
```
http://localhost:8000/test-setup.php
```

This will check:
- ✓ PHP version (7.4+)
- ✓ MySQLi extension
- ✓ Database connection
- ✓ Required files
- ✓ File permissions

### Step 3: Access the Application

If all checks pass:

**Public Page:**
```
http://localhost:8000/index.php
```

**Admin Login:**
```
http://localhost:8000/login.php
```

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

*Note: You'll need to create this account in the database first (see below)*

---

## 📊 Database Setup

### Create Admin Account

Run this SQL in your MySQL client:

```sql
USE nsr_population_tracker;

INSERT INTO account (acc_id, username, password, role, created_at) 
VALUES (
    UUID(), 
    'admin', 
    'admin123', 
    'admin',
    NOW()
);
```

### Verify Tables Exist

```sql
SHOW TABLES;
```

You should see:
- account
- audit_trail
- households
- population_stats (view)
- residents
- staff
- zone_stats (view)

---

## 🎯 Testing the Application

### 1. Login Test
- Go to http://localhost:8000/login.php
- Enter username: `admin` password: `admin123`
- You should be redirected to the admin dashboard

### 2. Dashboard Test
- Check if statistics cards load
- Verify zone statistics appear
- Check age distribution chart
- View recent activity

### 3. Population Management Test
- Click "Population" in sidebar
- Click "Add Resident" button
- Fill in the form and submit
- Verify the resident appears in the table
- Try editing and deleting

### 4. Household Management Test
- Click "Households" in sidebar
- Click "Add Household" button
- Create a household
- Verify it appears in the table

### 5. Audit Trail Test
- Click "Audit Trail" in sidebar
- Verify your previous actions are logged
- Test filters

---

## 🔧 Troubleshooting

### "Cannot connect to database"
1. Ensure MySQL is running
2. Check credentials in `backend/config.php`
3. Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### "Page not found" errors
1. Make sure you're using the full URL with `.php` extension
2. Check that PHP server is running on port 8000
3. Verify file exists in the directory

### AJAX requests failing
1. Open browser DevTools (F12)
2. Go to Network tab
3. Look for failed requests (red)
4. Check the response for error details

### Modals not working
1. Check browser console for JavaScript errors
2. Verify jQuery is loaded (Network tab)
3. Ensure Bootstrap JS is included

---

## 📁 Project Structure

```
NSR-Population-Tracker/
├── backend/
│   ├── api/              # 7 PHP API files
│   ├── includes/         # db.php, auth.php, audit.php
│   ├── config.php        # Database credentials
│   └── database.sql      # Schema
├── assets/
│   ├── css/
│   │   └── styles.css    # Custom styles
│   └── js/
│       ├── app.js        # Main logic
│       ├── auth.js       # Authentication
│       ├── dashboard.js  # Dashboard
│       ├── population.js # Population CRUD
│       ├── households.js # Household CRUD
│       └── audit.js      # Audit trail
├── images/               # NSRLogo.png
├── index.php             # Landing page
├── login.php             # Login page
├── admin.php             # Admin dashboard
├── logout.php            # Logout
├── test-setup.php        # Setup verification
└── .htaccess             # URL rewriting (for Apache)
```

---

## 🎨 Features

### ✅ Implemented
- Login/Logout with PHP sessions
- Dashboard with live statistics
- Population CRUD (Create, Read, Update, Delete)
- Household CRUD
- Audit trail with filtering
- Search and filter functionality
- Responsive design
- Bootstrap modals
- AJAX form submissions
- Real-time data updates

### 🔐 Security Notes
- ⚠️ Passwords are **plain text** (matching original system)
- ⚠️ No API authentication middleware
- ✅ SQL injection protection via prepared statements
- ✅ Session-based auth on frontend

---

## 🚢 Production Deployment

### Before deploying:

1. **Enable password hashing**
   ```php
   // In backend/includes/auth.php
   $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
   password_verify($inputPassword, $hashedPassword);
   ```

2. **Disable error display**
   ```php
   // In backend/config.php
   error_reporting(0);
   ini_set('display_errors', 0);
   ```

3. **Update database credentials**
   - Use strong passwords
   - Create dedicated MySQL user (not root)

4. **Configure HTTPS**
   - Get SSL certificate
   - Force HTTPS in .htaccess

5. **Add CSRF protection**
   - Generate tokens for forms
   - Validate on submission

---

## 📞 Support

If you encounter issues:

1. Check `test-setup.php` for system verification
2. Review browser console for JavaScript errors
3. Check PHP error log
4. Verify database connection
5. See `PHP_MIGRATION_GUIDE.md` for detailed docs

---

## ✨ What Changed from React Version

### Removed
- ❌ Node.js backend (server.js)
- ❌ React components (.tsx files)
- ❌ TypeScript compilation
- ❌ Vite build process
- ❌ npm dependencies
- ❌ Zustand state management

### Added
- ✅ PHP backend APIs
- ✅ jQuery for DOM manipulation
- ✅ PHP sessions for auth
- ✅ Static HTML pages
- ✅ Bootstrap modals
- ✅ CDN-based libraries

### Maintained
- ✅ Same database schema
- ✅ Same functionality
- ✅ Same design/styling
- ✅ Audit trail system
- ✅ CRUD operations

---

**Migration Complete!** 🎉

The application now runs entirely on **PHP + jQuery + MySQL** with no Node.js dependencies.
