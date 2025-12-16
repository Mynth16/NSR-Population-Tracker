<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'nsr_population_tracker');

// API configuration
define('API_URL', 'http://localhost');

// Base URL configuration
define('BASE_URL', '/NSR-Population-Tracker');

// Session configuration
define('SESSION_LIFETIME', 3600); // 1 hour

// Error reporting (set to 0 in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers and JSON content type should only be set in API files
// These have been removed from config.php to prevent interference with HTML pages
