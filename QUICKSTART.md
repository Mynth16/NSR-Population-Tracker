# Quick Start Guide - NSR Population Tracker

## Step-by-Step Setup

### 1. Install MySQL (if not already installed)
Download and install MySQL from: https://dev.mysql.com/downloads/mysql/

### 2. Create the Database

Open MySQL command line or MySQL Workbench and run:

```bash
# Login to MySQL
mysql -u root -p

# Then execute these commands:
```

```sql
CREATE DATABASE nsr_population_tracker;
USE nsr_population_tracker;

-- Copy and paste the entire contents of backend/database.sql here
-- Or use: SOURCE C:/Users/Michael Angelo/Downloads/NSR-Population-Tracker/backend/database.sql;
```

### 3. Load Sample Data (Optional but recommended)

```sql
-- Copy and paste the entire contents of backend/seed.sql
-- Or use: SOURCE C:/Users/Michael Angelo/Downloads/NSR-Population-Tracker/backend/seed.sql;
```

### 4. Configure Backend

Edit `backend/.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
DB_NAME=nsr_population_tracker
PORT=3001
```

### 5. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 6. Run the Application

**Option A: Run both frontend and backend together**
```bash
npm start
```

**Option B: Run separately**

Terminal 1 (Backend):
```bash
cd backend
npm start
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 7. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Admin Login: username: `admin`, password: `admin123`

## Troubleshooting

### "Failed to load residents/households"
- Make sure backend is running: `cd backend && npm start`
- Check MySQL is running
- Verify database credentials in `backend/.env`

### "Database connection failed"
- Check MySQL service is running
- Verify password in `backend/.env`
- Make sure database `nsr_population_tracker` exists

### Port already in use
- Change PORT in `backend/.env` for backend
- Frontend will auto-suggest another port

## What's Included

✅ Full MySQL database schema with:
- Households table (with head_resident_id reference)
- Residents table (with educational_attainment)
- Staff table for barangay officials
- Account table for user authentication
- Audit trail table for tracking changes
- Statistical views

✅ REST API with endpoints for:
- CRUD operations on residents
- CRUD operations on households
- CRUD operations on staff
- CRUD operations on accounts
- Audit trail tracking
- Population statistics
- Zone statistics

✅ 33 sample residents across 10 households with realistic data
✅ 5 sample staff members
✅ 2 sample accounts (admin and staff)
✅ Sample audit trail entries

✅ Frontend updated to use MySQL backend instead of Supabase

## Next Steps

1. Add more residents and households through the UI
2. Customize the fields in the database schema as needed
3. Add authentication (currently using simple admin/admin123)
4. Deploy to production (consider using PM2 for the backend)
