<?php
require_once __DIR__ . '/../config.php';

class Database {
    private static $instance = null;
    private $connection;

    private function __construct() {
        try {
            $this->connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
            
            if ($this->connection->connect_error) {
                throw new Exception("Connection failed: " . $this->connection->connect_error);
            }
            
            $this->connection->set_charset("utf8mb4");
        } catch (Exception $e) {
            error_log("Database connection error: " . $e->getMessage());
            throw $e;
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->connection;
    }

    public function query($sql, $params = []) {
        $stmt = $this->connection->prepare($sql);
        
        if (!$stmt) {
            throw new Exception("Prepare failed: " . $this->connection->error);
        }

        if (!empty($params)) {
            $types = '';
            $values = [];
            
            foreach ($params as $param) {
                if (is_int($param)) {
                    $types .= 'i';
                } elseif (is_double($param)) {
                    $types .= 'd';
                } else {
                    $types .= 's';
                }
                $values[] = $param;
            }
            
            $stmt->bind_param($types, ...$values);
        }

        $stmt->execute();
        return $stmt;
    }

    public function fetchAll($sql, $params = []) {
        $stmt = $this->query($sql, $params);
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $stmt->close();
        return $data;
    }

    public function fetchOne($sql, $params = []) {
        $stmt = $this->query($sql, $params);
        $result = $stmt->get_result();
        $data = $result->fetch_assoc();
        $stmt->close();
        return $data;
    }

    public function execute($sql, $params = []) {
        $stmt = $this->query($sql, $params);
        $affected = $stmt->affected_rows;
        $stmt->close();
        return $affected;
    }

    public function getLastInsertId() {
        return $this->connection->insert_id;
    }

    public function generateUUID() {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }

    public function beginTransaction() {
        return $this->connection->begin_transaction();
    }

    public function commit() {
        return $this->connection->commit();
    }

    public function rollback() {
        return $this->connection->rollback();
    }
}

// Helper function to get database instance
function getDB() {
    return Database::getInstance();
}

/**
 * Display mapping functions for optimized database fields
 * Maps short codes to full display text
 */

// Gender display mapping
function displayGender($code) {
    $map = ['M' => 'Male', 'F' => 'Female'];
    return $map[$code] ?? $code;
}

// Civil status display mapping
function displayCivilStatus($code) {
    $map = [
        'S' => 'Single',
        'M' => 'Married',
        'W' => 'Widowed',
        'SEP' => 'Separated',
        'D' => 'Divorced'
    ];
    return $map[$code] ?? $code;
}

// Resident status display mapping
function displayResidentStatus($code) {
    $map = [
        'A' => 'Active',
        'D' => 'Deceased',
        'M' => 'Moved',
        'X' => 'Archived'
    ];
    return $map[$code] ?? $code;
}

// Household status display mapping
function displayHouseholdStatus($code) {
    $map = [
        'A' => 'Active',
        'I' => 'Inactive',
        'X' => 'Archived'
    ];
    return $map[$code] ?? $code;
}

// Staff category display mapping
function displayStaffCategory($code) {
    $map = [
        'L' => 'Leadership',
        'O' => 'Official',
        'H' => 'Health'
    ];
    return $map[$code] ?? $code;
}

// Account role display mapping
function displayRole($code) {
    $map = [
        'A' => 'Admin',
        'S' => 'Staff',
        'V' => 'Viewer'
    ];
    return $map[$code] ?? $code;
}

// Audit trail record type display mapping
function displayRecordType($code) {
    $map = [
        'H' => 'Household',
        'R' => 'Resident',
        'S' => 'Staff',
        'A' => 'Account'
    ];
    return $map[$code] ?? $code;
}

// Audit trail change type display mapping
function displayChangeType($code) {
    $map = [
        'C' => 'Create',
        'U' => 'Update',
        'D' => 'Delete'
    ];
    return $map[$code] ?? $code;
}
