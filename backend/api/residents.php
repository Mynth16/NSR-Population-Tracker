<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/audit.php';

header('Content-Type: application/json');

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$pathInfo = $_SERVER['PATH_INFO'] ?? '';
$id = trim($pathInfo, '/');

// GET /api/residents - List all residents
// GET /api/residents/{id} - Get single resident
if ($method === 'GET') {
    if (empty($id)) {
        // List all residents with filters
        $status = $_GET['status'] ?? 'A';
        $search = $_GET['search'] ?? '';
        
        $sql = "SELECT r.*, h.house_num, h.zone_num 
                FROM residents r 
                LEFT JOIN households h ON r.household_id = h.household_id 
                WHERE r.status = ?";
        
        $params = [$status];
        
        if (!empty($search)) {
            $sql .= " AND (r.first_name LIKE ? OR r.last_name LIKE ? OR r.gender LIKE ? OR r.civil_status LIKE ?)";
            $searchParam = "%$search%";
            $params[] = $searchParam;
            $params[] = $searchParam;
            $params[] = $searchParam;
            $params[] = $searchParam;
        }
        
        $sql .= " ORDER BY r.last_name, r.first_name";
        
        $residents = $db->fetchAll($sql, $params);
        echo json_encode($residents);
    } else {
        // Get single resident
        $sql = "SELECT r.*, h.house_num, h.zone_num 
                FROM residents r 
                LEFT JOIN households h ON r.household_id = h.household_id 
                WHERE r.resident_id = ?";
        
        $resident = $db->fetchOne($sql, [$id]);
        
        if (!$resident) {
            http_response_code(404);
            echo json_encode(['error' => 'Resident not found']);
            exit();
        }
        
        echo json_encode($resident);
    }
    exit();
}

// POST /api/residents - Create new resident
if ($method === 'POST' && empty($id)) {
    Auth::requireEditor();
    $data = json_decode(file_get_contents('php://input'), true);
    
    $residentId = $db->generateUUID();
    $userId = Auth::getUserIdFromHeader();
    
    $sql = "INSERT INTO residents (resident_id, household_id, first_name, last_name, birth_date, 
            gender, civil_status, educational_attainment, contact_number, email, 
            registered_voter, pwd, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'A')";
    
    $db->execute($sql, [
        $residentId,
        $data['household_id'] ?? null,
        $data['first_name'],
        $data['last_name'],
        $data['birth_date'],
        $data['gender'],
        $data['civil_status'],
        $data['educational_attainment'] ?? null,
        $data['contact_number'] ?? null,
        $data['email'] ?? null,
        $data['registered_voter'] ?? 'N',
        $data['pwd'] ?? 'N'
    ]);
    
    // Log audit trail
    $details = "Created resident: {$data['first_name']} {$data['last_name']}";
    AuditTrail::log('R', $residentId, $details, 'C', $userId, $data['household_id'] ?? null, $residentId);
    
    // Fetch and return created resident
    $sql = "SELECT r.*, h.house_num, h.zone_num 
            FROM residents r 
            LEFT JOIN households h ON r.household_id = h.household_id 
            WHERE r.resident_id = ?";
    
    $resident = $db->fetchOne($sql, [$residentId]);
    
    http_response_code(201);
    echo json_encode($resident);
    exit();
}

// PUT /api/residents/{id} - Update resident
if ($method === 'PUT' && !empty($id)) {
    Auth::requireEditor();
    $data = json_decode(file_get_contents('php://input'), true);
    $userId = Auth::getUserIdFromHeader();
    
    // Get old data for comparison
    $oldData = $db->fetchOne("SELECT * FROM residents WHERE resident_id = ?", [$id]);
    
    if (!$oldData) {
        http_response_code(404);
        echo json_encode(['error' => 'Resident not found']);
        exit();
    }
    
    $sql = "UPDATE residents SET 
            household_id = ?, first_name = ?, last_name = ?, birth_date = ?, 
            gender = ?, civil_status = ?, educational_attainment = ?, 
            contact_number = ?, email = ?, registered_voter = ?, pwd = ?, status = ? 
            WHERE resident_id = ?";
    
    $db->execute($sql, [
        $data['household_id'] ?? null,
        $data['first_name'],
        $data['last_name'],
        $data['birth_date'],
        $data['gender'],
        $data['civil_status'],
        $data['educational_attainment'] ?? null,
        $data['contact_number'] ?? null,
        $data['email'] ?? null,
        $data['registered_voter'] ?? 'N',
        $data['pwd'] ?? 'N',
        $data['status'] ?? 'A',
        $id
    ]);
    
    // Track changes for audit
    $fields = ['household_id', 'first_name', 'last_name', 'birth_date', 'gender', 'civil_status', 
               'educational_attainment', 'contact_number', 'email', 'registered_voter', 'pwd', 'status'];
    $changes = AuditTrail::getChangedFields($oldData, $data, $fields);
    
    if (!empty($changes)) {
        $details = "Updated resident {$data['first_name']} {$data['last_name']}: " . AuditTrail::formatChanges($changes);
        AuditTrail::log('R', $id, $details, 'U', $userId, $data['household_id'] ?? null, $id);
    }
    
    // Fetch and return updated resident
    $sql = "SELECT r.*, h.house_num, h.zone_num 
            FROM residents r 
            LEFT JOIN households h ON r.household_id = h.household_id 
            WHERE r.resident_id = ?";
    
    $resident = $db->fetchOne($sql, [$id]);
    echo json_encode($resident);
    exit();
}

// DELETE /api/residents/{id} - Soft delete (archive) resident
if ($method === 'DELETE' && !empty($id)) {
    Auth::requireEditor();
    $userId = Auth::getUserIdFromHeader();
    
    $resident = $db->fetchOne("SELECT * FROM residents WHERE resident_id = ?", [$id]);
    
    if (!$resident) {
        http_response_code(404);
        echo json_encode(['error' => 'Resident not found']);
        exit();
    }
    
    $db->execute("UPDATE residents SET status = 'X' WHERE resident_id = ?", [$id]);
    
    $details = "Archived resident: {$resident['first_name']} {$resident['last_name']}";
    AuditTrail::log('R', $id, $details, 'D', $userId, $resident['household_id'], $id);
    
    echo json_encode(['message' => 'Resident archived successfully']);
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
