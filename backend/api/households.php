<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/audit.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$pathInfo = $_SERVER['PATH_INFO'] ?? '';
$id = trim($pathInfo, '/');

// GET /api/households - List all households
// GET /api/households/{id} - Get single household with residents
if ($method === 'GET') {
    if (empty($id)) {
        // List all households with resident counts
        $status = $_GET['status'] ?? 'A';
        $search = $_GET['search'] ?? '';
        $zone = $_GET['zone'] ?? '';
        
        $sql = "SELECT h.*, 
                COUNT(r.resident_id) as resident_count,
                hr.first_name as head_first_name,
                hr.last_name as head_last_name
                FROM households h 
                LEFT JOIN residents r ON h.household_id = r.household_id AND r.status = 'A'
                LEFT JOIN residents hr ON h.head_resident_id = hr.resident_id
                WHERE h.status = ?";
        
        $params = [$status];
        
        if (!empty($search)) {
            $sql .= " AND (h.house_num LIKE ? OR h.zone_num LIKE ?)";
            $searchParam = "%$search%";
            $params[] = $searchParam;
            $params[] = $searchParam;
        }
        
        if (!empty($zone)) {
            $sql .= " AND h.zone_num = ?";
            $params[] = $zone;
        }
        
        $sql .= " GROUP BY h.household_id ORDER BY h.zone_num, h.house_num";
        
        $households = $db->fetchAll($sql, $params);
        echo json_encode($households);
    } else {
        // Get single household with all residents
        $householdSql = "SELECT h.*,
                         hr.first_name as head_first_name,
                         hr.last_name as head_last_name
                         FROM households h
                         LEFT JOIN residents hr ON h.head_resident_id = hr.resident_id
                         WHERE h.household_id = ?";
        
        $household = $db->fetchOne($householdSql, [$id]);
        
        if (!$household) {
            http_response_code(404);
            echo json_encode(['error' => 'Household not found']);
            exit();
        }
        
        // Get all residents in household
        $residentsSql = "SELECT * FROM residents WHERE household_id = ? AND status = 'A' ORDER BY last_name, first_name";
        $household['residents'] = $db->fetchAll($residentsSql, [$id]);
        
        echo json_encode($household);
    }
    exit();
}

// POST /api/households - Create new household
if ($method === 'POST' && empty($id)) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $householdId = $db->generateUUID();
    $userId = Auth::getUserIdFromHeader();
    
    $sql = "INSERT INTO households (household_id, zone_num, house_num, head_resident_id, status) 
            VALUES (?, ?, ?, ?, 'A')";
    
    $db->execute($sql, [
        $householdId,
        $data['zone_num'],
        $data['house_num'],
        $data['head_resident_id'] ?? null
    ]);
    
    // Log audit trail
    $details = "Created household: Zone {$data['zone_num']}, House {$data['house_num']}";
    AuditTrail::log('H', $householdId, $details, 'C', $userId, $householdId, null);
    
    // Fetch and return created household
    $household = $db->fetchOne("SELECT * FROM households WHERE household_id = ?", [$householdId]);
    
    http_response_code(201);
    echo json_encode($household);
    exit();
}

// PUT /api/households/{id} - Update household
if ($method === 'PUT' && !empty($id)) {
    $data = json_decode(file_get_contents('php://input'), true);
    $userId = Auth::getUserIdFromHeader();
    
    // Get old data for comparison
    $oldData = $db->fetchOne("SELECT * FROM households WHERE household_id = ?", [$id]);
    
    if (!$oldData) {
        http_response_code(404);
        echo json_encode(['error' => 'Household not found']);
        exit();
    }
    
    $sql = "UPDATE households SET 
            zone_num = ?, house_num = ?, status = ?, head_resident_id = ?
            WHERE household_id = ?";
    
    $db->execute($sql, [
        $data['zone_num'],
        $data['house_num'],
        $data['status'] ?? 'A',
        $data['head_resident_id'] ?? null,
        $id
    ]);
    
    // Track changes for audit
    $fields = ['zone_num', 'house_num', 'status', 'head_resident_id'];
    $changes = AuditTrail::getChangedFields($oldData, $data, $fields);
    
    if (!empty($changes)) {
        $details = "Updated household Zone {$data['zone_num']}, House {$data['house_num']}: " . AuditTrail::formatChanges($changes);
        AuditTrail::log('H', $id, $details, 'U', $userId, $id, null);
    }
    
    // Fetch and return updated household
    $household = $db->fetchOne("SELECT * FROM households WHERE household_id = ?", [$id]);
    echo json_encode($household);
    exit();
}

// DELETE /api/households/{id} - Soft delete (archive) household
if ($method === 'DELETE' && !empty($id)) {
    $userId = Auth::getUserIdFromHeader();
    
    $household = $db->fetchOne("SELECT * FROM households WHERE household_id = ?", [$id]);
    
    if (!$household) {
        http_response_code(404);
        echo json_encode(['error' => 'Household not found']);
        exit();
    }
    
    $db->execute("UPDATE households SET status = 'X' WHERE household_id = ?", [$id]);
    
    $details = "Archived household: Zone {$household['zone_num']}, House {$household['house_num']}";
    AuditTrail::log('H', $id, $details, 'D', $userId, $id, null);
    
    echo json_encode(['message' => 'Household archived successfully']);
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
