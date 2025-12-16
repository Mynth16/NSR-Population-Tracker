<?php
/**
 * Password Migration Script
 * 
 * This script migrates plaintext passwords to bcrypt hashed passwords.
 * Run this ONCE before deploying the password hashing code changes.
 * 
 * Usage: php migrate-passwords.php
 */

require_once __DIR__ . '/backend/includes/db.php';

echo "=================================================\n";
echo "Password Migration Script\n";
echo "=================================================\n\n";

try {
    $db = getDB();
    
    // Fetch all accounts
    $sql = "SELECT acc_id, username, password FROM account";
    $accounts = $db->fetchAll($sql);
    
    if (empty($accounts)) {
        echo "No accounts found in database.\n";
        exit(0);
    }
    
    echo "Found " . count($accounts) . " account(s) to migrate.\n\n";
    
    $migrated = 0;
    $skipped = 0;
    
    foreach ($accounts as $account) {
        // Check if password is already hashed (bcrypt hashes start with $2y$)
        if (substr($account['password'], 0, 4) === '$2y$') {
            echo "✓ Skipped: {$account['username']} (already hashed)\n";
            $skipped++;
            continue;
        }
        
        // Hash the plaintext password
        $hashedPassword = password_hash($account['password'], PASSWORD_DEFAULT);
        
        // Update the account with hashed password
        $updateSql = "UPDATE account SET password = ? WHERE acc_id = ?";
        $db->execute($updateSql, [$hashedPassword, $account['acc_id']]);
        
        echo "✓ Migrated: {$account['username']}\n";
        $migrated++;
    }
    
    echo "\n=================================================\n";
    echo "Migration Complete!\n";
    echo "=================================================\n";
    echo "Accounts migrated: $migrated\n";
    echo "Accounts skipped: $skipped\n";
    echo "Total accounts: " . count($accounts) . "\n\n";
    
    if ($migrated > 0) {
        echo "⚠️  IMPORTANT: Your passwords have been hashed.\n";
        echo "    Test login with existing credentials before deploying.\n";
    }
    
} catch (Exception $e) {
    echo "\n❌ Error: " . $e->getMessage() . "\n";
    echo "Make sure the database is set up and accessible.\n";
    exit(1);
}
