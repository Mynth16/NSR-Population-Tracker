<?php
require_once __DIR__ . '/../includes/auth.php';

Auth::startSession();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

if ($method === 'POST' && $action === 'login') {
    header('Content-Type: application/json');
    
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['username']) || !isset($data['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Username and password required']);
            exit();
        }
        
        $result = Auth::login($data['username'], $data['password']);
        
        if (!$result['success']) {
            http_response_code(401);
            echo json_encode(['error' => $result['message']]);
            exit();
        }
        
        echo json_encode($result);
        exit();
    } catch (Exception $e) {
        error_log("Login error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'An error occurred during login. Please check database connection.']);
        exit();
    }
}

if ($method === 'POST' && $action === 'logout') {
    header('Content-Type: application/json');
    $result = Auth::logout();
    echo json_encode($result);
    exit();
}

if ($method === 'GET' && $action === 'check') {
    header('Content-Type: application/json');
    if (Auth::isAuthenticated()) {
        echo json_encode([
            'isAuthenticated' => true,
            'user' => Auth::getCurrentUser()
        ]);
    } else {
        echo json_encode(['isAuthenticated' => false]);
    }
    exit();
}

header('Content-Type: application/json');
http_response_code(404);
echo json_encode(['error' => 'Not found']);
