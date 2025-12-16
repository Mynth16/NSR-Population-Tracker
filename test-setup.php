<?php
/**
 * PHP Setup Verification Script
 * Run this file to check if your environment is configured correctly
 * Access via: http://localhost:8000/test-setup.php
 */

$results = [];

// 1. Check PHP Version
$phpVersion = phpversion();
$results['PHP Version'] = [
    'status' => version_compare($phpVersion, '7.4.0', '>='),
    'message' => "PHP $phpVersion " . (version_compare($phpVersion, '7.4.0', '>=') ? '✓' : '✗ (requires 7.4+)')
];

// 2. Check MySQL Extension
$results['MySQLi Extension'] = [
    'status' => extension_loaded('mysqli'),
    'message' => extension_loaded('mysqli') ? '✓ MySQLi is available' : '✗ MySQLi extension not loaded'
];

// 3. Check Session Support
$results['Session Support'] = [
    'status' => function_exists('session_start'),
    'message' => function_exists('session_start') ? '✓ Sessions available' : '✗ Session support missing'
];

// 4. Check Database Connection
try {
    require_once __DIR__ . '/backend/config.php';
    require_once __DIR__ . '/backend/includes/db.php';
    
    $db = Database::getInstance();
    $connection = $db->getConnection();
    
    $results['Database Connection'] = [
        'status' => $connection->ping(),
        'message' => '✓ Connected to ' . DB_NAME
    ];
    
    // Test query
    $testQuery = $db->fetchOne("SELECT COUNT(*) as count FROM residents");
    $residentCount = $testQuery['count'] ?? 0;
    
    $results['Database Query'] = [
        'status' => true,
        'message' => "✓ Found $residentCount residents in database"
    ];
    
} catch (Exception $e) {
    $results['Database Connection'] = [
        'status' => false,
        'message' => '✗ Database error: ' . $e->getMessage()
    ];
}

// 5. Check File Permissions
$writableDirectories = ['backend/includes', 'assets/js', 'assets/css'];
foreach ($writableDirectories as $dir) {
    $isWritable = is_writable(__DIR__ . '/' . $dir);
    $results["Directory: $dir"] = [
        'status' => $isWritable,
        'message' => $isWritable ? '✓ Writable' : '✗ Not writable'
    ];
}

// 6. Check Required Files
$requiredFiles = [
    'backend/config.php',
    'backend/includes/db.php',
    'backend/includes/auth.php',
    'backend/api/residents.php',
    'backend/api/households.php',
    'assets/js/app.js',
    'login.php',
    'admin.php'
];

foreach ($requiredFiles as $file) {
    $exists = file_exists(__DIR__ . '/' . $file);
    $results["File: $file"] = [
        'status' => $exists,
        'message' => $exists ? '✓ Exists' : '✗ Missing'
    ];
}

// Output Results
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Setup Verification - NSR Population Tracker</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">
                <span class="text-green-600">✓</span> PHP Setup Verification
            </h1>
            
            <p class="text-gray-600 mb-8">
                This page checks if your environment is ready to run the NSR Population Tracker (PHP/jQuery version).
            </p>

            <div class="space-y-3">
                <?php foreach ($results as $test => $result): ?>
                    <div class="flex items-center p-4 rounded-lg <?php echo $result['status'] ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'; ?>">
                        <div class="flex-1">
                            <span class="font-semibold text-gray-800"><?php echo htmlspecialchars($test); ?>:</span>
                            <span class="ml-2 <?php echo $result['status'] ? 'text-green-700' : 'text-red-700'; ?>">
                                <?php echo htmlspecialchars($result['message']); ?>
                            </span>
                        </div>
                        <div class="ml-4">
                            <?php if ($result['status']): ?>
                                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            <?php else: ?>
                                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <?php
            $allPassed = !in_array(false, array_column($results, 'status'));
            ?>

            <div class="mt-8 p-6 rounded-lg <?php echo $allPassed ? 'bg-green-100 border-2 border-green-500' : 'bg-yellow-100 border-2 border-yellow-500'; ?>">
                <?php if ($allPassed): ?>
                    <h2 class="text-2xl font-bold text-green-800 mb-2">
                        🎉 All Checks Passed!
                    </h2>
                    <p class="text-green-700 mb-4">
                        Your environment is ready to run the NSR Population Tracker.
                    </p>
                    <div class="flex gap-4">
                        <a href="index.php" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold inline-block">
                            Go to Home Page
                        </a>
                        <a href="login.php" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-block">
                            Go to Login
                        </a>
                    </div>
                <?php else: ?>
                    <h2 class="text-2xl font-bold text-yellow-800 mb-2">
                        ⚠️ Some Checks Failed
                    </h2>
                    <p class="text-yellow-700 mb-4">
                        Please fix the issues above before running the application.
                    </p>
                    <a href="PHP_MIGRATION_GUIDE.md" class="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold inline-block">
                        View Setup Guide
                    </a>
                <?php endif; ?>
            </div>

            <div class="mt-8 text-sm text-gray-500 border-t pt-4">
                <p><strong>Server Info:</strong></p>
                <ul class="list-disc list-inside ml-4 mt-2">
                    <li>PHP Version: <?php echo phpversion(); ?></li>
                    <li>Server Software: <?php echo $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'; ?></li>
                    <li>Document Root: <?php echo $_SERVER['DOCUMENT_ROOT']; ?></li>
                    <li>Current Time: <?php echo date('Y-m-d H:i:s'); ?></li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>
