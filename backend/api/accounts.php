<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/audit.php';

header('Content-Type: application/json');

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$pathInfo = $_SERVER['PATH_INFO'] ?? '';
$id = trim($pathInfo, '/');

// GET /api/accounts - List all accounts
// GET /api/accounts/{id} - Get single account
if ($method === 'GET') {
    if (empty($id)) {
        $sql = "SELECT acc_id, username, role, created_at FROM account ORDER BY username";
        $accounts = $db->fetchAll($sql);
        echo json_encode($accounts);
    } else {
        $account = $db->fetchOne("SELECT acc_id, username, role, created_at FROM account WHERE acc_id = ?", [$id]);
        
        if (!$account) {
            http_response_code(404);
            echo json_encode(['error' => 'Account not found']);
            exit();
        }
        
        echo json_encode($account);
    }
    exit();
}

// POST /api/accounts - Create new account
if ($method === 'POST' && empty($id)) {
    Auth::requireAdmin();
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (empty($data['username']) || empty($data['password']) || empty($data['role'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Username, password, and role are required']);
        exit();
    }
    
    // Validate username format (alphanumeric, 3-30 characters)
    if (!preg_match('/^[a-zA-Z0-9_]{3,30}$/', $data['username'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Username must be 3-30 characters and contain only letters, numbers, and underscores']);
        exit();
    }
    
    // Check for duplicate username
    $existing = $db->fetchOne("SELECT acc_id FROM account WHERE username = ?", [$data['username']]);
    if ($existing) {
        http_response_code(409);
        echo json_encode(['error' => 'Username already exists']);
        exit();
    }
    
    // Validate password strength (min 8 chars, must contain letter and number)
    if (strlen($data['password']) < 8) {
        http_response_code(400);
        echo json_encode(['error' => 'Password must be at least 8 characters long']);
        exit();
    }
    if (!preg_match('/[A-Za-z]/', $data['password']) || !preg_match('/[0-9]/', $data['password'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Password must contain at least one letter and one number']);
        exit();
    }
    
    // Validate role
    if (!in_array($data['role'], ['A', 'S', 'V'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid role. Must be A (Admin), S (Staff), or V (Viewer)']);
        exit();
    }
    
    $accId = $db->generateUUID();
    $userId = Auth::getUserIdFromHeader();
    
    // Hash the password using PHP's password_hash (bcrypt)
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
    
    $sql = "INSERT INTO account (acc_id, username, password, role) 
            VALUES (?, ?, ?, ?)";
    
    $db->execute($sql, [
        $accId,
        $data['username'],
        $hashedPassword,
        $data['role']
    ]);
    
    $details = "Created account: {$data['username']} (Role: {$data['role']})";
    AuditTrail::log('A', $accId, $details, 'C', $userId, null, null);
    
    $account = $db->fetchOne("SELECT acc_id, username, role, created_at FROM account WHERE acc_id = ?", [$accId]);
    
    http_response_code(201);
    echo json_encode($account);
    exit();
}

// PUT /api/accounts/{id} - Update account
if ($method === 'PUT' && !empty($id)) {
    Auth::requireAdmin();
    $data = json_decode(file_get_contents('php://input'), true);
    $userId = Auth::getUserIdFromHeader();
    
    $oldData = $db->fetchOne("SELECT * FROM account WHERE acc_id = ?", [$id]);
    
    if (!$oldData) {
        http_response_code(404);
        echo json_encode(['error' => 'Account not found']);
        exit();
    }
    
    // Validate username format if provided
    if (isset($data['username']) && !empty($data['username'])) {
        if (!preg_match('/^[a-zA-Z0-9_]{3,30}$/', $data['username'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Username must be 3-30 characters and contain only letters, numbers, and underscores']);
            exit();
        }
        
        // Check for duplicate username (excluding current account)
        $existing = $db->fetchOne("SELECT acc_id FROM account WHERE username = ? AND acc_id != ?", [$data['username'], $id]);
        if ($existing) {
            http_response_code(409);
            echo json_encode(['error' => 'Username already exists']);
            exit();
        }
    }
    
    // Validate role if provided
    if (isset($data['role']) && !in_array($data['role'], ['A', 'S', 'V'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid role. Must be A (Admin), S (Staff), or V (Viewer)']);
        exit();
    }
    
    if (isset($data['password']) && !empty($data['password'])) {
        // Validate password strength
        if (strlen($data['password']) < 8) {
            http_response_code(400);
            echo json_encode(['error' => 'Password must be at least 8 characters long']);
            exit();
        }
        if (!preg_match('/[A-Za-z]/', $data['password']) || !preg_match('/[0-9]/', $data['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Password must contain at least one letter and one number']);
            exit();
        }
        
        // Hash the password using PHP's password_hash (bcrypt)
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        $sql = "UPDATE account SET username = ?, password = ?, role = ? WHERE acc_id = ?";
        $db->execute($sql, [$data['username'], $hashedPassword, $data['role'], $id]);
        $details = "Updated account {$data['username']}: username, password, role";
    } else {
        $sql = "UPDATE account SET username = ?, role = ? WHERE acc_id = ?";
        $db->execute($sql, [$data['username'], $data['role'], $id]);
        $details = "Updated account {$data['username']}: username, role";
    }
    
    AuditTrail::log('A', $id, $details, 'U', $userId, null, null);
    
    $account = $db->fetchOne("SELECT acc_id, username, role, created_at FROM account WHERE acc_id = ?", [$id]);
    echo json_encode($account);
    exit();
}

// DELETE /api/accounts/{id} - Hard delete account
if ($method === 'DELETE' && !empty($id)) {
    Auth::requireAdmin();
    $userId = Auth::getUserIdFromHeader();
    
    $account = $db->fetchOne("SELECT * FROM account WHERE acc_id = ?", [$id]);
    
    if (!$account) {
        http_response_code(404);
        echo json_encode(['error' => 'Account not found']);
        exit();
    }
    
    // Prevent deleting own account
    $currentUser = Auth::getCurrentUser();
    if ($currentUser && $currentUser['acc_id'] === $id) {
        http_response_code(400);
        echo json_encode(['error' => 'Cannot delete your own account']);
        exit();
    }
    
    $db->execute("DELETE FROM account WHERE acc_id = ?", [$id]);
    
    $details = "Deleted account: {$account['username']}";
    AuditTrail::log('A', $id, $details, 'D', $userId, null, null);
    
    echo json_encode(['message' => 'Account deleted successfully']);
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
