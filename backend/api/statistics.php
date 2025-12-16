<?php
require_once __DIR__ . '/../includes/db.php';

$db = getDB();
$pathInfo = $_SERVER['PATH_INFO'] ?? '';
$endpoint = trim($pathInfo, '/');

// GET /api/statistics/population
if ($endpoint === 'population') {
    $sql = "SELECT * FROM population_stats LIMIT 1";
    $stats = $db->fetchOne($sql);
    echo json_encode($stats);
    exit();
}

// GET /api/statistics/zones
if ($endpoint === 'zones') {
    $sql = "SELECT * FROM zone_stats ORDER BY zone_num";
    $zoneStats = $db->fetchAll($sql);
    echo json_encode($zoneStats);
    exit();
}

// GET /api/statistics/age-distribution
if ($endpoint === 'age-distribution') {
    $sql = "SELECT 
            CASE 
                WHEN TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) < 18 THEN 'Minor (0-17)'
                WHEN TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) BETWEEN 18 AND 30 THEN 'Young Adult (18-30)'
                WHEN TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) BETWEEN 31 AND 45 THEN 'Adult (31-45)'
                WHEN TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) BETWEEN 46 AND 60 THEN 'Middle-aged (46-60)'
                ELSE 'Senior (60+)'
            END as age_group,
            COUNT(*) as count
            FROM residents
            WHERE status = 'A'
            GROUP BY age_group
            ORDER BY MIN(TIMESTAMPDIFF(YEAR, birth_date, CURDATE()))";
    
    $ageDistribution = $db->fetchAll($sql);
    echo json_encode($ageDistribution);
    exit();
}

http_response_code(404);
echo json_encode(['error' => 'Not found']);
