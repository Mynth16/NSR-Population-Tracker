# NSR Population Tracker - PHP/jQuery Version

## Migration Complete! 🎉

The application has been completely rewritten from React/TypeScript/Node.js to PHP/jQuery/MySQL.

## What's New

### Backend
- ✅ **PHP 7.4+** instead of Node.js/Express
- ✅ **MySQLi** database connection (backend/includes/db.php)
- ✅ **Session-based authentication** (backend/includes/auth.php)
- ✅ **RESTful PHP APIs** (backend/api/)
  - residents.php
  - households.php
  - statistics.php
  - staff.php
  - accounts.php
  - audit-trail.php
  - auth.php
- ✅ **Audit trail logging** maintained (backend/includes/audit.php)

### Frontend
- ✅ **jQuery 3.7.1** instead of React
- ✅ **Static HTML/PHP pages** instead of React components
- ✅ **Bootstrap 5 Modals** for forms
- ✅ **Tailwind CSS** (via CDN) for styling
- ✅ **Font Awesome 6** for icons
- ✅ **AJAX** for all API calls

### Pages
- **index.php** - Public landing page
- **login.php** - Authentication page
- **admin.php** - Main admin dashboard (single-page app with jQuery)
- **logout.php** - Session cleanup

## Requirements

- **PHP** 7.4 or higher
- **MySQL** 5.7 or higher
- **Apache** or **Nginx** web server (with mod_rewrite for Apache)
- Web browser with JavaScript enabled

## Installation

### 1. Database Setup

The database structure remains the same. If you haven't set it up yet:

```bash
mysql -u root -p < backend/database.sql
```

Or import through phpMyAdmin.

### 2. Configure Database Connection

Edit `backend/config.php` and update your database credentials:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', ''); // Your MySQL password
define('DB_NAME', 'nsr_population_tracker');
```

### 3. Web Server Setup

#### Option A: PHP Built-in Server (Development Only)

```bash
cd C:\Users\admin\Downloads\NSR-Population-Tracker
php -S localhost:8000
```

Then open: http://localhost:8000

#### Option B: Apache/XAMPP (Recommended)

1. Copy the project folder to your Apache `htdocs` directory
2. Ensure `.htaccess` is enabled (check `AllowOverride All` in Apache config)
3. Restart Apache
4. Open: http://localhost/NSR-Population-Tracker

#### Option C: Windows IIS

1. Create a new website in IIS Manager
2. Point to the project directory
3. Install URL Rewrite module for IIS
4. Import `.htaccess` rules to web.config

### 4. Verify Installation

Visit the main page: http://localhost:8000 (or your configured URL)

You should see the landing page with:
- Barangay logo
- Hero section
- "Admin Login" button

## Default Login Credentials

You'll need to create an account in the database first, or use seed data:

```sql
INSERT INTO account (acc_id, username, password, role) 
VALUES (UUID(), 'admin', 'admin123', 'admin');
```

**Login:**
- Username: `admin`
- Password: `admin123`

⚠️ **Security Note**: Passwords are stored in plain text (matching the original system). For production, implement password hashing with `password_hash()` and `password_verify()`.

## File Structure

```
NSR-Population-Tracker/
├── backend/
│   ├── api/                      # PHP API endpoints
│   │   ├── auth.php
│   │   ├── residents.php
│   │   ├── households.php
│   │   ├── statistics.php
│   │   ├── staff.php
│   │   ├── accounts.php
│   │   └── audit-trail.php
│   ├── includes/                 # Shared PHP utilities
│   │   ├── db.php               # Database connection
│   │   ├── auth.php             # Authentication helpers
│   │   └── audit.php            # Audit trail logging
│   ├── config.php               # Configuration
│   ├── database.sql             # Database schema
│   └── seed.sql                 # Sample data
├── assets/
│   ├── css/
│   │   └── styles.css           # Custom Tailwind CSS
│   └── js/
│       ├── app.js               # Main application logic
│       ├── auth.js              # Authentication
│       ├── dashboard.js         # Dashboard page
│       ├── population.js        # Population management
│       ├── households.js        # Household management
│       └── audit.js             # Audit trail
├── images/                       # Logos and images
├── .htaccess                     # Apache URL rewrite rules
├── index.php                     # Public landing page
├── login.php                     # Login page
├── admin.php                     # Admin dashboard
└── logout.php                    # Logout handler
```

## Key Features

### 1. Dashboard
- Population statistics (total, male, female)
- Household count
- Zone-based breakdown
- Age distribution chart
- Recent activity feed

### 2. Population Management
- Add/Edit/Delete residents
- Soft delete (archive) functionality
- Search and filter
- Assign to households
- Audit trail for all changes

### 3. Household Management
- Add/Edit/Delete households
- Zone organization
- Resident count per household
- Head of household designation

### 4. Audit Trail
- Complete activity log
- Filter by record type and change type
- User attribution
- Timestamp tracking

## API Endpoints

All endpoints follow RESTful conventions:

### Authentication
- `POST /backend/api/auth.php?action=login` - Login
- `POST /backend/api/auth.php?action=logout` - Logout
- `GET /backend/api/auth.php?action=check` - Check session

### Residents
- `GET /backend/api/residents.php` - List all residents
- `GET /backend/api/residents.php/{id}` - Get single resident
- `POST /backend/api/residents.php` - Create resident
- `PUT /backend/api/residents.php/{id}` - Update resident
- `DELETE /backend/api/residents.php/{id}` - Delete (archive) resident

### Households
- `GET /backend/api/households.php` - List all households
- `GET /backend/api/households.php/{id}` - Get single household
- `POST /backend/api/households.php` - Create household
- `PUT /backend/api/households.php/{id}` - Update household
- `DELETE /backend/api/households.php/{id}` - Delete (archive) household

### Statistics
- `GET /backend/api/statistics.php/population` - Population stats
- `GET /backend/api/statistics.php/zones` - Zone breakdown
- `GET /backend/api/statistics.php/age-distribution` - Age groups

### Audit Trail
- `GET /backend/api/audit-trail.php` - Get audit entries
- Query params: `recordType`, `recordId`, `limit`

## Development

### Debugging

Enable error reporting in `backend/config.php`:

```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

For production, disable display_errors and log to file instead.

### Browser Console

Open Developer Tools (F12) to see:
- AJAX requests
- JavaScript errors
- Network calls to API

### Database Queries

Check `backend/includes/db.php` for query execution. You can add debugging:

```php
echo $sql; // Print SQL before execution
var_dump($params); // Print parameters
```

## Troubleshooting

### "Database connection failed"
- Check `backend/config.php` credentials
- Ensure MySQL is running
- Verify database exists: `SHOW DATABASES;`

### "404 Not Found" on API calls
- Check `.htaccess` is in root directory
- Verify mod_rewrite is enabled: `a2enmod rewrite`
- Check Apache config allows `.htaccess`: `AllowOverride All`

### Modals not appearing
- Check browser console for JavaScript errors
- Ensure jQuery is loaded (check Network tab)
- Verify Bootstrap JS is included

### Session not persisting
- Check PHP session settings: `session.save_path`
- Ensure cookies are enabled
- Check `php.ini` for session configuration

### CORS errors
- Ensure headers are set in `backend/config.php`
- For cross-origin requests, update `Access-Control-Allow-Origin`

## Migration Notes

### Removed Dependencies
- ❌ React, React-DOM
- ❌ TypeScript
- ❌ Vite build system
- ❌ Node.js backend
- ❌ Express.js
- ❌ Zustand state management
- ❌ Lucide React icons

### Replaced With
- ✅ jQuery 3.7.1
- ✅ Bootstrap 5.3.3 (CSS + JS)
- ✅ Tailwind CSS (CDN)
- ✅ Font Awesome 6 icons
- ✅ PHP 7.4+ backend
- ✅ MySQLi database driver

## Security Considerations

⚠️ **Important**: The current implementation maintains the original security model:

1. **Plain Text Passwords** - Consider implementing:
   ```php
   $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
   password_verify($password, $hashedPassword);
   ```

2. **No API Authentication** - All endpoints are publicly accessible
   - Add authentication middleware to PHP APIs
   - Validate sessions on every request

3. **SQL Injection Protection** - Already implemented via prepared statements
   - All queries use parameterized statements
   - Never concatenate user input into SQL

4. **XSS Protection** - Use when displaying user content:
   ```php
   echo htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');
   ```

5. **CSRF Protection** - Consider adding tokens to forms

## Performance Tips

1. **Enable PHP OPcache** in `php.ini`:
   ```ini
   opcache.enable=1
   opcache.memory_consumption=128
   ```

2. **Database Indexing** - Already implemented on key fields

3. **AJAX Caching** - Implemented in jQuery calls where appropriate

4. **CDN Resources** - All external libraries loaded from CDN

## Next Steps

1. **Seed the Database** - Run `backend/seed.sql` for sample data
2. **Create Admin Account** - Insert into `account` table
3. **Test All Features** - Go through each page and feature
4. **Customize** - Update logos, colors, content as needed
5. **Deploy** - Move to production server when ready

## Support

For issues or questions:
1. Check browser console for errors
2. Check PHP error logs
3. Verify database connection
4. Review this documentation

---

**Migration completed successfully!** The application now runs entirely on PHP/jQuery with no Node.js dependencies.
