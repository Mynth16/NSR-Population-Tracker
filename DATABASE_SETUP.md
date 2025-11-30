# NSR Population Tracker - MySQL Backend

This application uses a MySQL database backend. Follow the steps below to set up the database and run the application.

## Prerequisites

- Node.js (v16 or higher)
- MySQL Server (v8.0 or higher)
- npm or yarn

## Database Setup

### 1. Install MySQL

If you don't have MySQL installed, download and install it from [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)

### 2. Create Database and Tables

Open your MySQL client (MySQL Workbench, command line, or any other tool) and run the following commands:

```sql
-- Run the database.sql file
SOURCE /path/to/backend/database.sql;
```

Or manually execute the contents of `backend/database.sql` in your MySQL client.

### 3. Load Sample Data (Optional)

To populate the database with sample data for testing:

```sql
-- Run the seed.sql file
SOURCE /path/to/backend/seed.sql;
```

Or manually execute the contents of `backend/seed.sql`.

## Configuration

### Backend Configuration

1. Navigate to the `backend` folder
2. Copy `.env.example` to `.env`:
   ```
   cp .env.example .env
   ```
3. Edit `.env` and update with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=nsr_population_tracker
   PORT=3001
   ```

### Frontend Configuration

1. In the root directory, copy `.env.example` to `.env`:
   ```
   cp .env.example .env
   ```
2. The default API URL is set to `http://localhost:3001`

## Installation

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ..
npm install
```

## Running the Application

### Start the Backend Server

In the `backend` directory:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The backend API will be available at `http://localhost:3001`

### Start the Frontend

In the root directory:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or another port if 5173 is in use)

## API Endpoints

The backend provides the following REST API endpoints:

### Residents
- `GET /api/residents` - Get all residents (with optional filters)
- `GET /api/residents/:id` - Get single resident
- `POST /api/residents` - Create new resident
- `PUT /api/residents/:id` - Update resident
- `DELETE /api/residents/:id` - Archive resident

### Households
- `GET /api/households` - Get all households (with optional filters)
- `GET /api/households/:id` - Get single household with residents
- `POST /api/households` - Create new household
- `PUT /api/households/:id` - Update household
- `DELETE /api/households/:id` - Archive household

### Staff
- `GET /api/staff` - Get all staff members
- `GET /api/staff/:id` - Get single staff member
- `POST /api/staff` - Create new staff member
- `PUT /api/staff/:id` - Update staff member
- `DELETE /api/staff/:id` - Delete staff member

### Accounts
- `GET /api/accounts` - Get all accounts (without passwords)
- `GET /api/accounts/:id` - Get single account
- `POST /api/accounts` - Create new account
- `PUT /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account
- `POST /api/auth/login` - Login endpoint

### Audit Trail
- `GET /api/audit-trail` - Get audit trail entries (with optional filters)
- `POST /api/audit-trail` - Create audit trail entry

### Statistics
- `GET /api/statistics/population` - Get population statistics
- `GET /api/statistics/zones` - Get zone statistics
- `GET /api/statistics/age-distribution` - Get age distribution

## Database Schema

The database includes the following main tables:

- **households** - Stores household information (zone, house number, address, head_resident_id)
- **residents** - Stores resident information (name, birth date, gender, civil status, educational_attainment, etc.)
- **staff** - Stores barangay staff information (name, title, picture)
- **account** - Stores user accounts for system access (username, password, role)
- **audit_trail** - Tracks all changes made to records (who, what, when)

The schema also includes views for easy access to statistics:
- `population_stats` - Overall population statistics
- `zone_stats` - Statistics by zone

## Troubleshooting

### Connection Issues

If you get "Failed to load residents/households" error:
1. Make sure the backend server is running (`npm start` in backend folder)
2. Verify your MySQL server is running
3. Check your `.env` configuration in the backend folder
4. Verify the database and tables were created successfully

### Database Connection Failed

If you see "Database connection failed" in the backend console:
1. Verify MySQL server is running
2. Check your database credentials in `backend/.env`
3. Make sure the database `nsr_population_tracker` exists

### Port Already in Use

If port 3001 or 5173 is already in use:
- Backend: Change `PORT` in `backend/.env`
- Frontend: Vite will automatically suggest another port, or you can configure it in `vite.config.ts`

## Admin Credentials

For the admin panel:
- Username: `admin`
- Password: `admin123`

## Development Notes

- The backend uses ES modules (type: "module" in package.json)
- Frontend uses Vite + React + TypeScript
- Database uses MySQL 8.0 features (UUID(), generated columns)
- All soft deletes use status fields ('active', 'inactive', 'archived')
