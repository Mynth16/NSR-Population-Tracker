<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/audit.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// GET /api/audit-trail - Get audit trail entries
if ($method === 'GET') {
    $recordType = $_GET['recordType'] ?? '';
    $recordId = $_GET['recordId'] ?? '';
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 100;
    
    $sql = "SELECT a.*, acc.username 
            FROM audit_trail a 
            LEFT JOIN account acc ON a.acc_id = acc.acc_id 
            WHERE 1=1";
    
    $params = [];
    
    if (!empty($recordType)) {
        $sql .= " AND a.record_type = ?";
        $params[] = $recordType;
    }
    
    if (!empty($recordId)) {
        $sql .= " AND a.record_id = ?";
        $params[] = $recordId;
    }
    
    $sql .= " ORDER BY a.change_date DESC LIMIT ?";
    $params[] = $limit;
    
    $auditTrail = $db->fetchAll($sql, $params);
    echo json_encode($auditTrail);
    exit();
}

// POST /api/audit-trail - Manually create audit entry
if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    AuditTrail::log(
        $data['record_type'],
        $data['record_id'],
        $data['details'],
        $data['change_type'],
        $data['acc_id'] ?? null,
        $data['household_id'] ?? null,
        $data['resident_id'] ?? null
    );
    
    // Get the last inserted audit entry
    $sql = "SELECT a.*, acc.username 
            FROM audit_trail a 
            LEFT JOIN account acc ON a.acc_id = acc.acc_id 
            ORDER BY a.audit_id DESC LIMIT 1";
    
    $auditEntry = $db->fetchOne($sql);
    
    http_response_code(201);
    echo json_encode($auditEntry);
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
