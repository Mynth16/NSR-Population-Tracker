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

// ==================== RESIDENTS ROUTES ====================

// Get all residents (with optional filters)
app.get('/api/residents', async (req, res) => {
  try {
    const { status = 'active', search } = req.query;
    
    let query = `
      SELECT 
        r.*,
        h.house_num,
        h.address as household_address,
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
        h.address as household_address,
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
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating resident:', error);
    res.status(500).json({ error: 'Failed to update resident' });
  }
});

// Delete resident (soft delete)
app.delete('/api/residents/:id', async (req, res) => {
  try {
    await db.query(
      "UPDATE residents SET status = 'archived' WHERE resident_id = ?",
      [req.params.id]
    );
    
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
        h.address LIKE ? OR
        h.house_num LIKE ? OR
        h.zone_num LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
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
      'SELECT * FROM residents WHERE household_id = ? AND status = "active" ORDER BY is_head DESC, birth_date',
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
    const { zone_num, house_num, address, head_resident_id } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO households (zone_num, house_num, address, head_resident_id) VALUES (?, ?, ?, ?)',
      [zone_num, house_num, address, head_resident_id || null]
    );
    
    const [newHousehold] = await db.query(
      'SELECT * FROM households WHERE household_id = ?',
      [result.insertId]
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
    const { zone_num, house_num, address, status, head_resident_id } = req.body;
    
    await db.query(
      'UPDATE households SET zone_num = ?, house_num = ?, address = ?, status = ?, head_resident_id = ? WHERE household_id = ?',
      [zone_num, house_num, address, status, head_resident_id, req.params.id]
    );
    
    const [updated] = await db.query(
      'SELECT * FROM households WHERE household_id = ?',
      [req.params.id]
    );
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating household:', error);
    res.status(500).json({ error: 'Failed to update household' });
  }
});

// Delete household (soft delete)
app.delete('/api/households/:id', async (req, res) => {
  try {
    await db.query(
      "UPDATE households SET status = 'archived' WHERE household_id = ?",
      [req.params.id]
    );
    
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
          WHEN age < 18 THEN 'Minor (0-17)'
          WHEN age BETWEEN 18 AND 30 THEN 'Young Adult (18-30)'
          WHEN age BETWEEN 31 AND 45 THEN 'Adult (31-45)'
          WHEN age BETWEEN 46 AND 60 THEN 'Middle-aged (46-60)'
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
    const { first_name, last_name, title, picture } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO staff (first_name, last_name, title, picture) VALUES (?, ?, ?, ?)',
      [first_name, last_name, title, picture || null]
    );
    
    const [newStaff] = await db.query('SELECT * FROM staff WHERE staff_id = ?', [result.insertId]);
    
    res.status(201).json(newStaff[0]);
  } catch (error) {
    console.error('Error creating staff member:', error);
    res.status(500).json({ error: 'Failed to create staff member' });
  }
});

// Update staff member
app.put('/api/staff/:id', async (req, res) => {
  try {
    const { first_name, last_name, title, picture } = req.body;
    
    await db.query(
      'UPDATE staff SET first_name = ?, last_name = ?, title = ?, picture = ? WHERE staff_id = ?',
      [first_name, last_name, title, picture, req.params.id]
    );
    
    const [updated] = await db.query('SELECT * FROM staff WHERE staff_id = ?', [req.params.id]);
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating staff member:', error);
    res.status(500).json({ error: 'Failed to update staff member' });
  }
});

// Delete staff member
app.delete('/api/staff/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM staff WHERE staff_id = ?', [req.params.id]);
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
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({ error: 'Failed to update account' });
  }
});

// Delete account
app.delete('/api/accounts/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM account WHERE acc_id = ?', [req.params.id]);
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
    
    // Simple authentication (in production, use bcrypt to compare hashed passwords)
    if (username === 'admin' && password === 'admin123') {
      res.json({
        success: true,
        user: {
          acc_id: 'acc001',
          username: 'admin',
          role: 'admin'
        }
      });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
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
    const { record_type, record_id, details, change_type, acc_id } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO audit_trail (record_type, record_id, details, change_type, acc_id) VALUES (?, ?, ?, ?, ?)',
      [record_type, record_id, details, change_type, acc_id || null]
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
