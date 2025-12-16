<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/audit.php';

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
    $data = json_decode(file_get_contents('php://input'), true);
    
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
    $data = json_decode(file_get_contents('php://input'), true);
    $userId = Auth::getUserIdFromHeader();
    
    $oldData = $db->fetchOne("SELECT * FROM account WHERE acc_id = ?", [$id]);
    
    if (!$oldData) {
        http_response_code(404);
        echo json_encode(['error' => 'Account not found']);
        exit();
    }
    
    if (isset($data['password']) && !empty($data['password'])) {
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
    $userId = Auth::getUserIdFromHeader();
    
    $account = $db->fetchOne("SELECT * FROM account WHERE acc_id = ?", [$id]);
    
    if (!$account) {
        http_response_code(404);
        echo json_encode(['error' => 'Account not found']);
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
