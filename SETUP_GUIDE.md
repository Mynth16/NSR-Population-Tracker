# NSR Population Tracker - Setup Guide

This guide will walk you through setting up the NSR Population Tracker on a new PC after cloning from Git.

---

## Prerequisites

Before you begin, make sure you have the following installed:

| Software | Version | Download Link |
|----------|---------|---------------|
| **Node.js** | v16 or higher | [https://nodejs.org/](https://nodejs.org/) |
| **MySQL Server** | v8.0 or higher | [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/) |
| **Git** | Latest | [https://git-scm.com/downloads](https://git-scm.com/downloads) |

### Optional but Recommended
- **MySQL Workbench** - For easier database management: [https://dev.mysql.com/downloads/workbench/](https://dev.mysql.com/downloads/workbench/)
- **VS Code** - For code editing: [https://code.visualstudio.com/](https://code.visualstudio.com/)

---

## Step 1: Clone the Repository

Open your terminal (Command Prompt, PowerShell, or Git Bash) and run:

```bash
git clone https://github.com/Mynth16/NSR-Population-Tracker.git
cd NSR-Population-Tracker
```

---

## Step 2: Set Up MySQL Database

### 2.1 Start MySQL Server

Make sure your MySQL server is running. On Windows, you can:
- Check Services (`services.msc`) and ensure "MySQL80" is running
- Or start it from MySQL Installer

### 2.2 Create the Database

Open MySQL command line or MySQL Workbench:

**Using MySQL Command Line:**
```bash
mysql -u root -p
```
Enter your MySQL root password when prompted.

**Then run:**
```sql
-- Create the database and tables
SOURCE C:/path/to/NSR-Population-Tracker/backend/database.sql;
```

> **Note:** Replace `C:/path/to/` with the actual path where you cloned the repository.

**Alternative:** Copy and paste the entire contents of `backend/database.sql` directly into MySQL Workbench and execute.

### 2.3 Load Sample Data (Optional but Recommended)

This will populate the database with test data:

```sql
SOURCE C:/path/to/NSR-Population-Tracker/backend/seed.sql;
```

---

## Step 3: Configure Environment Variables

### 3.1 Backend Configuration

1. Navigate to the `backend` folder
2. Copy `.env.example` to `.env`:

   **Windows (PowerShell):**
   ```powershell
   cd backend
   Copy-Item .env.example .env
   ```

   **Windows (Command Prompt):**
   ```cmd
   cd backend
   copy .env.example .env
   ```

3. Open `backend/.env` in a text editor and update with your MySQL credentials:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
   DB_NAME=nsr_population_tracker
   PORT=3001
   ```

   > **Important:** Replace `YOUR_MYSQL_PASSWORD_HERE` with your actual MySQL root password.

### 3.2 Frontend Configuration

1. Go back to the root directory
2. Copy `.env.example` to `.env`:

   **Windows (PowerShell):**
   ```powershell
   cd ..
   Copy-Item .env.example .env
   ```

   The default settings should work fine (API URL: `http://localhost:3001`).

---

## Step 4: Install Dependencies

### 4.1 Install Frontend Dependencies

From the root directory of the project:

```bash
npm install
```

### 4.2 Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

---

## Step 5: Run the Application

### Option A: Run Both Frontend and Backend Together (Recommended)

From the root directory:

```bash
npm start
```

This will start both the backend API and frontend development server simultaneously.

### Option B: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

---

## Step 6: Access the Application

Once running, open your browser and go to:

| Service | URL |
|---------|-----|
| **Frontend** | [http://localhost:5173](http://localhost:5173) |
| **Backend API** | [http://localhost:3001](http://localhost:3001) |

### Default Login Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Staff | `staff` | `staff123` |

---

## Quick Setup Summary

Here's the complete setup in one go:

```bash
# 1. Clone the repo
git clone https://github.com/Mynth16/NSR-Population-Tracker.git
cd NSR-Population-Tracker

# 2. Set up database (do this in MySQL)
# mysql -u root -p
# SOURCE ./backend/database.sql;
# SOURCE ./backend/seed.sql;

# 3. Configure backend environment
cd backend
Copy-Item .env.example .env
# Edit .env with your MySQL password

# 4. Install dependencies
npm install
cd ..
npm install

# 5. Run the app
npm start
```

---

## Troubleshooting

### "Failed to load residents/households"
- ✅ Make sure the backend server is running
- ✅ Check that MySQL service is running
- ✅ Verify database credentials in `backend/.env`
- ✅ Ensure the database `nsr_population_tracker` exists

### "Database connection failed"
- ✅ Verify MySQL server is running (`services.msc` → MySQL80)
- ✅ Double-check your password in `backend/.env`
- ✅ Make sure you ran `database.sql` to create the database

### "ECONNREFUSED" or "Connection refused"
- ✅ Backend server is not running - start it with `npm start` or `cd backend && npm run dev`

### "Port already in use"
- **Backend (3001):** Change `PORT` in `backend/.env`
- **Frontend (5173):** Vite will automatically suggest another port

### "Module not found" errors
- ✅ Run `npm install` in both root and `backend` directories

### MySQL "Access denied"
- ✅ Verify your MySQL password is correct in `backend/.env`
- ✅ Make sure the MySQL user has privileges on the database

---

## Project Structure

```
NSR-Population-Tracker/
├── backend/
│   ├── server.js        # Express API server
│   ├── db.js            # Database connection
│   ├── database.sql     # Database schema
│   ├── seed.sql         # Sample data
│   ├── package.json     # Backend dependencies
│   └── .env             # Backend config (create from .env.example)
├── src/
│   ├── components/      # React components
│   ├── stores/          # Zustand state management
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── package.json         # Frontend dependencies
├── .env                 # Frontend config (create from .env.example)
└── vite.config.ts       # Vite configuration
```

---

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm start` | Run both frontend and backend |
| `npm run dev` | Run frontend only |
| `npm run backend` | Run backend only (production) |
| `npm run backend:dev` | Run backend with auto-reload |
| `npm run build` | Build frontend for production |
| `npm run lint` | Run ESLint |

---

## Need More Help?

- Check `DATABASE_SETUP.md` for detailed database setup instructions
- Check `QUICKSTART.md` for a quick overview
- Check `API_DOCUMENTATION.md` for API endpoint details

---

Happy coding! 🚀
