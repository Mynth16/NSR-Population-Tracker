<?php
require_once __DIR__ . '/db.php';

class AuditTrail {
    
    public static function log($recordType, $recordId, $details, $changeType, $accId = null, $householdId = null, $residentId = null) {
        $db = getDB();
        
        $sql = "INSERT INTO audit_trail (record_type, record_id, details, change_type, acc_id, household_id, resident_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        $db->execute($sql, [
            $recordType,
            $recordId,
            $details,
            $changeType,
            $accId,
            $householdId,
            $residentId
        ]);
    }

    public static function getChangedFields($oldData, $newData, $fields) {
        $changes = [];
        
        foreach ($fields as $field) {
            $oldValue = $oldData[$field] ?? null;
            $newValue = $newData[$field] ?? null;
            
            if ($oldValue !== $newValue) {
                $changes[] = "$field: $oldValue → $newValue";
            }
        }
        
        return $changes;
    }

    public static function formatChanges($changes) {
        return implode(', ', $changes);
    }
}
