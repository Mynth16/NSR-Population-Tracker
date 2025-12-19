<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/audit.php';

header('Content-Type: application/json');

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$pathInfo = $_SERVER['PATH_INFO'] ?? '';
$id = trim($pathInfo, '/');

// GET /api/staff - List all staff
// GET /api/staff/{id} - Get single staff member
if ($method === 'GET') {
    if (empty($id)) {
        $sql = "SELECT * FROM staff ORDER BY title, last_name, first_name";
        $staff = $db->fetchAll($sql);
        echo json_encode($staff);
    } else {
        $staff = $db->fetchOne("SELECT * FROM staff WHERE staff_id = ?", [$id]);
        
        if (!$staff) {
            http_response_code(404);
            echo json_encode(['error' => 'Staff not found']);
            exit();
        }
        
        echo json_encode($staff);
    }
    exit();
}

// POST /api/staff - Create new staff member
if ($method === 'POST' && empty($id)) {
    Auth::requireEditor();
    $data = json_decode(file_get_contents('php://input'), true);
    
    $staffId = $db->generateUUID();
    $userId = Auth::getUserIdFromHeader();
    
    $sql = "INSERT INTO staff (staff_id, first_name, last_name, title, category, picture) 
            VALUES (?, ?, ?, ?, ?, ?)";
    
    $db->execute($sql, [
        $staffId,
        $data['first_name'],
        $data['last_name'],
        $data['title'],
        $data['category'],
        $data['picture'] ?? null
    ]);
    
    $details = "Created staff: {$data['first_name']} {$data['last_name']} ({$data['title']})";
    AuditTrail::log('S', $staffId, $details, 'C', $userId, null, null);
    
    $staff = $db->fetchOne("SELECT * FROM staff WHERE staff_id = ?", [$staffId]);
    
    http_response_code(201);
    echo json_encode($staff);
    exit();
}

// PUT /api/staff/{id} - Update staff member
if ($method === 'PUT' && !empty($id)) {
    Auth::requireEditor();
    $data = json_decode(file_get_contents('php://input'), true);
    $userId = Auth::getUserIdFromHeader();
    
    $oldData = $db->fetchOne("SELECT * FROM staff WHERE staff_id = ?", [$id]);
    
    if (!$oldData) {
        http_response_code(404);
        echo json_encode(['error' => 'Staff not found']);
        exit();
    }
    
    $sql = "UPDATE staff SET 
            first_name = ?, last_name = ?, title = ?, category = ?, picture = ?
            WHERE staff_id = ?";
    
    $db->execute($sql, [
        $data['first_name'],
        $data['last_name'],
        $data['title'],
        $data['category'],
        $data['picture'] ?? null,
        $id
    ]);
    
    $fields = ['first_name', 'last_name', 'title', 'category', 'picture'];
    $changes = AuditTrail::getChangedFields($oldData, $data, $fields);
    
    if (!empty($changes)) {
        $details = "Updated staff {$data['first_name']} {$data['last_name']}: " . AuditTrail::formatChanges($changes);
        AuditTrail::log('S', $id, $details, 'U', $userId, null, null);
    }
    
    $staff = $db->fetchOne("SELECT * FROM staff WHERE staff_id = ?", [$id]);
    echo json_encode($staff);
    exit();
}

// DELETE /api/staff/{id} - Hard delete staff member
if ($method === 'DELETE' && !empty($id)) {
    Auth::requireEditor();
    $userId = Auth::getUserIdFromHeader();
    
    $staff = $db->fetchOne("SELECT * FROM staff WHERE staff_id = ?", [$id]);
    
    if (!$staff) {
        http_response_code(404);
        echo json_encode(['error' => 'Staff not found']);
        exit();
    }
    
    $db->execute("DELETE FROM staff WHERE staff_id = ?", [$id]);
    
    $details = "Deleted staff: {$staff['first_name']} {$staff['last_name']} ({$staff['title']})";
    AuditTrail::log('S', $id, $details, 'D', $userId, null, null);
    
    echo json_encode(['message' => 'Staff deleted successfully']);
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
