@echo off
echo ======================================
echo NSR Population Tracker - Server Setup
echo ======================================
echo.
echo IMPORTANT: This project is designed to run with XAMPP
echo.
echo SETUP INSTRUCTIONS:
echo ======================================
echo.
echo 1. Install XAMPP if not already installed
echo    Download from: https://www.apachefriends.org/
echo.
echo 2. Copy this project folder to XAMPP's htdocs directory
echo    Example: C:\xampp\htdocs\NSR-Population-Tracker
echo.
echo 3. Start Apache and MySQL from XAMPP Control Panel
echo.
echo 4. Import the database:
echo    - Open http://localhost/phpmyadmin
echo    - Create database 'nsr_population_tracker'
echo    - Import backend/database.sql
echo.
echo 5. Access the application at:
echo    - Home: http://localhost/NSR-Population-Tracker/index.php
echo    - Login: http://localhost/NSR-Population-Tracker/login.php
echo    - Admin: http://localhost/NSR-Population-Tracker/admin.php
echo.
echo PORT INFORMATION:
echo ======================================
echo - Apache (Web Server): Port 80 or 8080
echo - MySQL (Database): Port 3306
echo - Check XAMPP Control Panel if ports are in use
echo.
echo TROUBLESHOOTING:
echo ======================================
echo - If seeing plaintext: Ensure Apache is running in XAMPP
echo - Port conflicts: Change ports in XAMPP config
echo - Database errors: Verify MySQL is running
echo.
echo ======================================
echo.
echo Press any key to exit...
pause
