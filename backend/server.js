import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ==================== AUDIT TRAIL HELPER ====================

// Helper function to log audit trail entries (fails silently)
async function logAudit(record_type, record_id, details, change_type, acc_id, household_id = null, resident_id = null) {
  try {
    await db.query(
      'INSERT INTO audit_trail (record_type, record_id, details, change_type, acc_id, household_id, resident_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [record_type, String(record_id), details, change_type, acc_id || null, household_id || null, resident_id || null]
    );
  } catch (error) {
    console.error('Audit trail logging failed:', error);
    // Fail silently - don't throw error
  }
}

// Helper to get user ID from request headers
function getUserId(req) {
  return req.headers['x-user-id'] || null;
}

// Helper to format a value for audit display
function formatAuditValue(val) {
  if (val === null || val === undefined) return '';
  if (val instanceof Date) {
    return val.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }
  return String(val);
}

// Helper to format changes for audit details
function formatChanges(oldData, newData, fields) {
  const changes = [];
  for (const field of fields) {
    const oldVal = formatAuditValue(oldData[field]);
    const newVal = formatAuditValue(newData[field]);
    if (oldVal !== newVal) {
      changes.push(`${field}: "${oldVal}" → "${newVal}"`);
    }
  }
  return changes.join(', ');
}

// ==================== RESIDENTS ROUTES ====================

// Get all residents (with optional filters)
app.get('/api/residents', async (req, res) => {
  try {
    const { status = 'active', search } = req.query;
    
    let query = `
      SELECT 
        r.*,
        h.house_num,
        h.zone_num
      FROM residents r
      LEFT JOIN households h ON r.household_id = h.household_id
      WHERE r.status = ?
    `;
    
    const params = [status];
    
    if (search) {
      query += ` AND (
        CONCAT(r.first_name, ' ', r.last_name) LIKE ? OR
        r.first_name LIKE ? OR
        r.last_name LIKE ? OR
        r.gender LIKE ? OR
        r.civil_status LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }
    
    query += ' ORDER BY r.last_name, r.first_name';
    
    const [residents] = await db.query(query, params);
    res.json(residents);
  } catch (error) {
    console.error('Error fetching residents:', error);
    res.status(500).json({ error: 'Failed to fetch residents' });
  }
});

// Get single resident by ID
app.get('/api/residents/:id', async (req, res) => {
  try {
    const [residents] = await db.query(
      `SELECT 
        r.*,
        h.house_num,
        h.zone_num
      FROM residents r
      LEFT JOIN households h ON r.household_id = h.household_id
      WHERE r.resident_id = ?`,
      [req.params.id]
    );
    
    if (residents.length === 0) {
      return res.status(404).json({ error: 'Resident not found' });
    }
    
    res.json(residents[0]);
  } catch (error) {
    console.error('Error fetching resident:', error);
    res.status(500).json({ error: 'Failed to fetch resident' });
  }
});

// Create new resident
app.post('/api/residents', async (req, res) => {
  try {
    const {
      household_id,
      first_name,
      last_name,
      birth_date,
      gender,
      civil_status,
      educational_attainment,
      contact_number,
      email
    } = req.body;
    
    const [result] = await db.query(
      `INSERT INTO residents (
        household_id, first_name, last_name, birth_date, gender, 
        civil_status, educational_attainment, contact_number, email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        household_id, first_name, last_name, birth_date, gender,
        civil_status, educational_attainment, contact_number, email
      ]
    );
    
    const [newResident] = await db.query(
      'SELECT * FROM residents WHERE resident_id = ?',
      [result.insertId]
    );
    
    // Log audit trail
    await logAudit(
      'resident',
      result.insertId,
      `Created resident: ${first_name} ${last_name} | Gender: ${gender} | Civil Status: ${civil_status} | Household ID: ${household_id || 'None'}`,
      'create',
      getUserId(req),
      household_id || null,
      result.insertId
    );
    
    res.status(201).json(newResident[0]);
  } catch (error) {
    console.error('Error creating resident:', error);
    res.status(500).json({ error: 'Failed to create resident' });
  }
});

// Update resident
app.put('/api/residents/:id', async (req, res) => {
  try {
    const {
      household_id,
      first_name,
      last_name,
      birth_date,
      gender,
      civil_status,
      educational_attainment,
      contact_number,
      email,
      status
    } = req.body;
    
    // Get old data for audit trail
    const [oldData] = await db.query('SELECT * FROM residents WHERE resident_id = ?', [req.params.id]);
    
    await db.query(
      `UPDATE residents SET
        household_id = ?,
        first_name = ?,
        last_name = ?,
        birth_date = ?,
        gender = ?,
        civil_status = ?,
        educational_attainment = ?,
        contact_number = ?,
        email = ?,
        status = ?
      WHERE resident_id = ?`,
      [
        household_id, first_name, last_name, birth_date, gender,
        civil_status, educational_attainment, contact_number,
        email, status, req.params.id
      ]
    );
    
    const [updated] = await db.query(
      'SELECT * FROM residents WHERE resident_id = ?',
      [req.params.id]
    );
    
    // Log audit trail with changes
    if (oldData.length > 0) {
      const changes = formatChanges(
        oldData[0],
        req.body,
        ['household_id', 'first_name', 'last_name', 'birth_date', 'gender', 'civil_status', 'educational_attainment', 'contact_number', 'email', 'status']
      );
      await logAudit(
        'resident',
        req.params.id,
        `Updated resident: ${first_name} ${last_name} | Changes: ${changes || 'No changes'}`,
        'update',
        getUserId(req),
        household_id || null,
        req.params.id
      );
    }
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating resident:', error);
    res.status(500).json({ error: 'Failed to update resident' });
  }
});

// Delete resident (soft delete)
app.delete('/api/residents/:id', async (req, res) => {
  try {
    // Get resident info before archiving for audit trail
    const [residentData] = await db.query('SELECT first_name, last_name FROM residents WHERE resident_id = ?', [req.params.id]);
    
    await db.query(
      "UPDATE residents SET status = 'archived' WHERE resident_id = ?",
      [req.params.id]
    );
    
    // Log audit trail
    if (residentData.length > 0) {
      await logAudit(
        'resident',
        req.params.id,
        `Archived resident: ${residentData[0].first_name} ${residentData[0].last_name}`,
        'delete',
        getUserId(req),
        null,
        req.params.id
      );
    }
    
    res.json({ message: 'Resident archived successfully' });
  } catch (error) {
    console.error('Error deleting resident:', error);
    res.status(500).json({ error: 'Failed to delete resident' });
  }
});

// ==================== HOUSEHOLDS ROUTES ====================

// Get all households (with optional filters)
app.get('/api/households', async (req, res) => {
  try {
    const { status = 'active', search, zone } = req.query;
    
    let query = `
      SELECT 
        h.*,
        COUNT(r.resident_id) as resident_count
      FROM households h
      LEFT JOIN residents r ON h.household_id = r.household_id AND r.status = 'active'
      WHERE h.status = ?
    `;
    
    const params = [status];
    
    if (search) {
      query += ` AND (
        h.house_num LIKE ? OR
        h.zone_num LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }
    
    if (zone) {
      query += ' AND h.zone_num = ?';
      params.push(zone);
    }
    
    query += ' GROUP BY h.household_id ORDER BY h.zone_num, h.house_num';
    
    const [households] = await db.query(query, params);
    res.json(households);
  } catch (error) {
    console.error('Error fetching households:', error);
    res.status(500).json({ error: 'Failed to fetch households' });
  }
});

// Get single household by ID
app.get('/api/households/:id', async (req, res) => {
  try {
    const [households] = await db.query(
      `SELECT 
        h.*,
        COUNT(r.resident_id) as resident_count
      FROM households h
      LEFT JOIN residents r ON h.household_id = r.household_id AND r.status = 'active'
      WHERE h.household_id = ?
      GROUP BY h.household_id`,
      [req.params.id]
    );
    
    if (households.length === 0) {
      return res.status(404).json({ error: 'Household not found' });
    }
    
    // Get residents in this household
    const [residents] = await db.query(
      'SELECT * FROM residents WHERE household_id = ? AND status = "active" ORDER BY birth_date',
      [req.params.id]
    );
    
    res.json({
      ...households[0],
      residents
    });
  } catch (error) {
    console.error('Error fetching household:', error);
    res.status(500).json({ error: 'Failed to fetch household' });
  }
});

// Create new household
app.post('/api/households', async (req, res) => {
  try {
    const { zone_num, house_num, head_resident_id } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO households (zone_num, house_num, head_resident_id) VALUES (?, ?, ?)',
      [zone_num, house_num, head_resident_id || null]
    );
    
    const [newHousehold] = await db.query(
      'SELECT * FROM households WHERE household_id = ?',
      [result.insertId]
    );
    
    // Log audit trail
    await logAudit(
      'household',
      result.insertId,
      `Created household: House #${house_num} | Zone: ${zone_num}`,
      'create',
      getUserId(req),
      result.insertId,
      null
    );
    
    res.status(201).json(newHousehold[0]);
  } catch (error) {
    console.error('Error creating household:', error);
    res.status(500).json({ error: 'Failed to create household' });
  }
});

// Update household
app.put('/api/households/:id', async (req, res) => {
  try {
    const { zone_num, house_num, status, head_resident_id } = req.body;
    
    // Get old data for audit trail
    const [oldData] = await db.query('SELECT * FROM households WHERE household_id = ?', [req.params.id]);
    
    await db.query(
      'UPDATE households SET zone_num = ?, house_num = ?, status = ?, head_resident_id = ? WHERE household_id = ?',
      [zone_num, house_num, status, head_resident_id, req.params.id]
    );
    
    const [updated] = await db.query(
      'SELECT * FROM households WHERE household_id = ?',
      [req.params.id]
    );
    
    // Log audit trail with changes
    if (oldData.length > 0) {
      const changes = formatChanges(
        oldData[0],
        req.body,
        ['zone_num', 'house_num', 'status', 'head_resident_id']
      );
      await logAudit(
        'household',
        req.params.id,
        `Updated household: House #${house_num} | Zone: ${zone_num} | Changes: ${changes || 'No changes'}`,
        'update',
        getUserId(req),
        req.params.id,
        null
      );
    }
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating household:', error);
    res.status(500).json({ error: 'Failed to update household' });
  }
});

// Delete household (soft delete)
app.delete('/api/households/:id', async (req, res) => {
  try {
    // Get household info before archiving for audit trail
    const [householdData] = await db.query('SELECT house_num, zone_num FROM households WHERE household_id = ?', [req.params.id]);
    
    await db.query(
      "UPDATE households SET status = 'archived' WHERE household_id = ?",
      [req.params.id]
    );
    
    // Log audit trail
    if (householdData.length > 0) {
      await logAudit(
        'household',
        req.params.id,
        `Archived household: House #${householdData[0].house_num} | Zone: ${householdData[0].zone_num}`,
        'delete',
        getUserId(req),
        req.params.id,
        null
      );
    }
    
    res.json({ message: 'Household archived successfully' });
  } catch (error) {
    console.error('Error deleting household:', error);
    res.status(500).json({ error: 'Failed to delete household' });
  }
});

// ==================== STATISTICS ROUTES ====================

// Get population statistics
app.get('/api/statistics/population', async (req, res) => {
  try {
    const [stats] = await db.query('SELECT * FROM population_stats');
    res.json(stats[0]);
  } catch (error) {
    console.error('Error fetching population stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get zone statistics
app.get('/api/statistics/zones', async (req, res) => {
  try {
    const [zones] = await db.query('SELECT * FROM zone_stats');
    res.json(zones);
  } catch (error) {
    console.error('Error fetching zone stats:', error);
    res.status(500).json({ error: 'Failed to fetch zone statistics' });
  }
});

// Get age distribution
app.get('/api/statistics/age-distribution', async (req, res) => {
  try {
    const [distribution] = await db.query(`
      SELECT 
        CASE 
          WHEN TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) < 18 THEN 'Minor (0-17)'
          WHEN TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) BETWEEN 18 AND 30 THEN 'Young Adult (18-30)'
          WHEN TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) BETWEEN 31 AND 45 THEN 'Adult (31-45)'
          WHEN TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) BETWEEN 46 AND 60 THEN 'Middle-aged (46-60)'
          ELSE 'Senior (60+)'
        END as age_group,
        COUNT(*) as count
      FROM residents
      WHERE status = 'active'
      GROUP BY age_group
      ORDER BY 
        CASE age_group
          WHEN 'Minor (0-17)' THEN 1
          WHEN 'Young Adult (18-30)' THEN 2
          WHEN 'Adult (31-45)' THEN 3
          WHEN 'Middle-aged (46-60)' THEN 4
          ELSE 5
        END
    `);
    
    res.json(distribution);
  } catch (error) {
    console.error('Error fetching age distribution:', error);
    res.status(500).json({ error: 'Failed to fetch age distribution' });
  }
});

// ==================== STAFF ROUTES ====================

// Get all staff
app.get('/api/staff', async (req, res) => {
  try {
    const [staff] = await db.query('SELECT * FROM staff ORDER BY title, last_name, first_name');
    res.json(staff);
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
});

// Get single staff member
app.get('/api/staff/:id', async (req, res) => {
  try {
    const [staff] = await db.query('SELECT * FROM staff WHERE staff_id = ?', [req.params.id]);
    
    if (staff.length === 0) {
      return res.status(404).json({ error: 'Staff member not found' });
    }
    
    res.json(staff[0]);
  } catch (error) {
    console.error('Error fetching staff member:', error);
    res.status(500).json({ error: 'Failed to fetch staff member' });
  }
});

// Create new staff member
app.post('/api/staff', async (req, res) => {
  try {
    const { first_name, last_name, title, category, picture } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO staff (first_name, last_name, title, category, picture) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, title, category || 'official', picture || null]
    );
    
    const [newStaff] = await db.query('SELECT * FROM staff WHERE staff_id = ?', [result.insertId]);
    
    // Log audit trail
    await logAudit(
      'staff',
      result.insertId,
      `Created staff member: ${first_name} ${last_name} | Title: ${title}`,
      'create',
      getUserId(req)
    );
    
    res.status(201).json(newStaff[0]);
  } catch (error) {
    console.error('Error creating staff member:', error);
    res.status(500).json({ error: 'Failed to create staff member' });
  }
});

// Update staff member
app.put('/api/staff/:id', async (req, res) => {
  try {
    const { first_name, last_name, title, category, picture } = req.body;
    
    // Get old data for audit trail
    const [oldData] = await db.query('SELECT * FROM staff WHERE staff_id = ?', [req.params.id]);
    
    await db.query(
      'UPDATE staff SET first_name = ?, last_name = ?, title = ?, category = ?, picture = ? WHERE staff_id = ?',
      [first_name, last_name, title, category, picture, req.params.id]
    );
    
    const [updated] = await db.query('SELECT * FROM staff WHERE staff_id = ?', [req.params.id]);
    
    // Log audit trail with changes
    if (oldData.length > 0) {
      const changes = formatChanges(
        oldData[0],
        req.body,
        ['first_name', 'last_name', 'title', 'category', 'picture']
      );
      await logAudit(
        'staff',
        req.params.id,
        `Updated staff member: ${first_name} ${last_name} | Changes: ${changes || 'No changes'}`,
        'update',
        getUserId(req)
      );
    }
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating staff member:', error);
    res.status(500).json({ error: 'Failed to update staff member' });
  }
});

// Delete staff member
app.delete('/api/staff/:id', async (req, res) => {
  try {
    // Get staff info before deleting for audit trail
    const [staffData] = await db.query('SELECT first_name, last_name, title FROM staff WHERE staff_id = ?', [req.params.id]);
    
    await db.query('DELETE FROM staff WHERE staff_id = ?', [req.params.id]);
    
    // Log audit trail
    if (staffData.length > 0) {
      await logAudit(
        'staff',
        req.params.id,
        `Deleted staff member: ${staffData[0].first_name} ${staffData[0].last_name} | Title: ${staffData[0].title}`,
        'delete',
        getUserId(req)
      );
    }
    
    res.json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    console.error('Error deleting staff member:', error);
    res.status(500).json({ error: 'Failed to delete staff member' });
  }
});

// ==================== ACCOUNT ROUTES ====================

// Get all accounts (without passwords)
app.get('/api/accounts', async (req, res) => {
  try {
    const [accounts] = await db.query('SELECT acc_id, username, role, created_at FROM account ORDER BY username');
    res.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
});

// Get single account (without password)
app.get('/api/accounts/:id', async (req, res) => {
  try {
    const [accounts] = await db.query(
      'SELECT acc_id, username, role, created_at FROM account WHERE acc_id = ?',
      [req.params.id]
    );
    
    if (accounts.length === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }
    
    res.json(accounts[0]);
  } catch (error) {
    console.error('Error fetching account:', error);
    res.status(500).json({ error: 'Failed to fetch account' });
  }
});

// Create new account
app.post('/api/accounts', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    // Note: In production, you should hash the password using bcrypt
    const [result] = await db.query(
      'INSERT INTO account (username, password, role) VALUES (?, ?, ?)',
      [username, password, role || 'viewer']
    );
    
    const [newAccount] = await db.query(
      'SELECT acc_id, username, role, created_at FROM account WHERE acc_id = ?',
      [result.insertId]
    );
    
    // Log audit trail
    await logAudit(
      'account',
      result.insertId,
      `Created account: ${username} | Role: ${role || 'viewer'}`,
      'create',
      getUserId(req)
    );
    
    res.status(201).json(newAccount[0]);
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Update account
app.put('/api/accounts/:id', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    // Get old data for audit trail
    const [oldData] = await db.query('SELECT username, role FROM account WHERE acc_id = ?', [req.params.id]);
    
    let query = 'UPDATE account SET username = ?, role = ?';
    let params = [username, role];
    
    // Only update password if provided
    if (password) {
      query += ', password = ?';
      params.push(password);
    }
    
    query += ' WHERE acc_id = ?';
    params.push(req.params.id);
    
    await db.query(query, params);
    
    const [updated] = await db.query(
      'SELECT acc_id, username, role, created_at FROM account WHERE acc_id = ?',
      [req.params.id]
    );
    
    // Log audit trail with changes
    if (oldData.length > 0) {
      const changes = [];
      if (oldData[0].username !== username) changes.push(`username: "${oldData[0].username}" → "${username}"`);
      if (oldData[0].role !== role) changes.push(`role: "${oldData[0].role}" → "${role}"`);
      if (password) changes.push('password: [changed]');
      
      await logAudit(
        'account',
        req.params.id,
        `Updated account: ${username} | Changes: ${changes.join(', ') || 'No changes'}`,
        'update',
        getUserId(req)
      );
    }
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({ error: 'Failed to update account' });
  }
});

// Delete account
app.delete('/api/accounts/:id', async (req, res) => {
  try {
    // Get account info before deleting for audit trail
    const [accountData] = await db.query('SELECT username, role FROM account WHERE acc_id = ?', [req.params.id]);
    
    await db.query('DELETE FROM account WHERE acc_id = ?', [req.params.id]);
    
    // Log audit trail
    if (accountData.length > 0) {
      await logAudit(
        'account',
        req.params.id,
        `Deleted account: ${accountData[0].username} | Role: ${accountData[0].role}`,
        'delete',
        getUserId(req)
      );
    }
    
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Query database for user
    const [accounts] = await db.query(
      'SELECT acc_id, username, password, role FROM account WHERE username = ?',
      [username]
    );
    
    // Check if user exists
    if (accounts.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }
    
    const account = accounts[0];
    
    // Simple password comparison (in production, use bcrypt to compare hashed passwords)
    if (password !== account.password) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }
    
    // Successful login - return user data without password
    res.json({
      success: true,
      user: {
        acc_id: account.acc_id,
        username: account.username,
        role: account.role
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// ==================== AUDIT TRAIL ROUTES ====================

// Get all audit trail entries
app.get('/api/audit-trail', async (req, res) => {
  try {
    const { record_type, record_id, limit = 100 } = req.query;
    
    let query = `
      SELECT 
        at.*,
        a.username
      FROM audit_trail at
      LEFT JOIN account a ON at.acc_id = a.acc_id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (record_type) {
      query += ' AND at.record_type = ?';
      params.push(record_type);
    }
    
    if (record_id) {
      query += ' AND at.record_id = ?';
      params.push(record_id);
    }
    
    query += ' ORDER BY at.change_date DESC LIMIT ?';
    params.push(parseInt(limit));
    
    const [entries] = await db.query(query, params);
    res.json(entries);
  } catch (error) {
    console.error('Error fetching audit trail:', error);
    res.status(500).json({ error: 'Failed to fetch audit trail' });
  }
});

// Create audit trail entry
app.post('/api/audit-trail', async (req, res) => {
  try {
    const { record_type, record_id, details, change_type, acc_id, household_id, resident_id } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO audit_trail (record_type, record_id, details, change_type, acc_id, household_id, resident_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [record_type, record_id, details, change_type, acc_id || null, household_id || null, resident_id || null]
    );
    
    const [newEntry] = await db.query(
      `SELECT 
        at.*,
        a.username
      FROM audit_trail at
      LEFT JOIN account a ON at.acc_id = a.acc_id
      WHERE at.audit_id = ?`,
      [result.insertId]
    );
    
    res.status(201).json(newEntry[0]);
  } catch (error) {
    console.error('Error creating audit trail entry:', error);
    res.status(500).json({ error: 'Failed to create audit trail entry' });
  }
});

// ==================== HEALTH CHECK ====================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
