<?php
// Database configuration (supports environment variables for Docker)
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASSWORD', getenv('DB_PASSWORD') ?: '');
define('DB_NAME', getenv('DB_NAME') ?: 'nsr_population_tracker');

// API configuration
define('API_URL', getenv('API_URL') ?: 'http://localhost');

// Base URL configuration (empty by default, set BASE_URL env var for subdirectory installs)
define('BASE_URL', getenv('BASE_URL') !== false ? getenv('BASE_URL') : '');

// Session configuration
define('SESSION_LIFETIME', 3600); // 1 hour

// Environment detection
$isProduction = getenv('APP_ENV') === 'production';

// Error reporting (disabled in production)
if ($isProduction) {
    error_reporting(0);
    ini_set('display_errors', 0);
} else {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}

// CORS headers and JSON content type should only be set in API files
// These have been removed from config.php to prevent interference with HTML pages
