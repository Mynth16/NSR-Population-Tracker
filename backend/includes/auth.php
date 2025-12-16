<?php
require_once __DIR__ . '/db.php';

class Auth {
    
    public static function startSession() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    public static function login($username, $password) {
        try {
            $db = getDB();
            
            $sql = "SELECT acc_id, username, password, role FROM account WHERE username = ?";
            $user = $db->fetchOne($sql, [$username]);
            
            if (!$user) {
                return ['success' => false, 'message' => 'Invalid credentials'];
            }
            
            // Verify password using PHP's password_verify (bcrypt)
            if (!password_verify($password, $user['password'])) {
                return ['success' => false, 'message' => 'Invalid credentials'];
            }
            
            self::startSession();
            $_SESSION['user'] = [
                'acc_id' => $user['acc_id'],
                'username' => $user['username'],
                'role' => $user['role']
            ];
            $_SESSION['isAuthenticated'] = true;
            
            // Return user without password
            return [
                'success' => true,
                'user' => [
                    'acc_id' => $user['acc_id'],
                    'username' => $user['username'],
                    'role' => $user['role']
                ]
            ];
        } catch (Exception $e) {
            error_log("Auth::login error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Database error. Please ensure database is set up correctly.'];
        }
    }

    public static function logout() {
        self::startSession();
        session_unset();
        session_destroy();
        return ['success' => true, 'message' => 'Logged out successfully'];
    }

    public static function isAuthenticated() {
        self::startSession();
        return isset($_SESSION['isAuthenticated']) && $_SESSION['isAuthenticated'] === true;
    }

    public static function getCurrentUser() {
        self::startSession();
        return $_SESSION['user'] ?? null;
    }

    public static function requireAuth() {
        if (!self::isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            exit();
        }
    }

    public static function getUserIdFromHeader() {
        $headers = getallheaders();
        return $headers['X-User-Id'] ?? null;
    }
}
