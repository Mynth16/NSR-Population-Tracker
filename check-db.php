<?php
// Temporary database check script
require_once __DIR__ . '/backend/config.php';

echo "Checking database setup...\n\n";

try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    
    if ($conn->connect_error) {
        echo "❌ Database connection failed: " . $conn->connect_error . "\n";
        echo "Please create the database using phpMyAdmin or MySQL:\n";
        echo "1. Open phpMyAdmin (http://localhost/phpmyadmin)\n";
        echo "2. Create database: " . DB_NAME . "\n";
        echo "3. Import: backend/database.sql\n";
        echo "4. Import: backend/seed.sql\n";
        exit(1);
    }
    
    echo "✓ Database connection successful\n";
    
    // Check if account table exists
    $result = $conn->query("SHOW TABLES LIKE 'account'");
    if ($result->num_rows === 0) {
        echo "❌ Table 'account' does not exist\n";
        echo "Please import backend/database.sql\n";
        exit(1);
    }
    echo "✓ Table 'account' exists\n";
    
    // Check for accounts
    $result = $conn->query("SELECT COUNT(*) as count FROM account");
    $row = $result->fetch_assoc();
    echo "✓ Found " . $row['count'] . " account(s)\n";
    
    if ($row['count'] === 0) {
        echo "⚠ No accounts found - please import backend/seed.sql\n";
        exit(1);
    }
    
    // Check for admin account
    $stmt = $conn->prepare("SELECT username, role FROM account WHERE username = ?");
    $username = 'admin';
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $admin = $result->fetch_assoc();
        echo "✓ Admin account found (role: " . $admin['role'] . ")\n";
        echo "\n✓ Database is properly set up!\n";
        echo "Default credentials: admin / admin123\n";
    } else {
        echo "⚠ Admin account not found - please import backend/seed.sql\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}
