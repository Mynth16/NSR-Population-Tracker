# API Documentation

Base URL: `http://localhost:3001/api`

## Schema Overview

### HOUSEHOLD
- `household_id` (VARCHAR(36), Primary Key)
- `zone_num` (INT)
- `house_num` (VARCHAR(50))
- `address` (VARCHAR(255))
- `status` (ENUM: 'active', 'inactive', 'archived')
- `head_resident_id` (VARCHAR(36), Foreign Key -> residents.resident_id)
- `created_at`, `updated_at` (TIMESTAMP)

### RESIDENT
- `resident_id` (VARCHAR(36), Primary Key)
- `household_id` (VARCHAR(36), Foreign Key -> households.household_id)
- `first_name` (VARCHAR(100))
- `last_name` (VARCHAR(100))
- `birth_date` (DATE)
- `age` (INT, computed)
- `gender` (ENUM: 'male', 'female')
- `civil_status` (ENUM: 'single', 'married', 'widowed', 'separated', 'divorced')
- `educational_attainment` (VARCHAR(100))
- `contact_number` (VARCHAR(20))
- `email` (VARCHAR(100))
- `status` (ENUM: 'active', 'deceased', 'moved', 'archived')
- `created_at`, `updated_at` (TIMESTAMP)

### STAFF
- `staff_id` (VARCHAR(36), Primary Key)
- `first_name` (VARCHAR(100))
- `last_name` (VARCHAR(100))
- `title` (VARCHAR(100))
- `picture` (VARCHAR(255))
- `created_at`, `updated_at` (TIMESTAMP)

### ACCOUNT
- `acc_id` (VARCHAR(36), Primary Key)
- `username` (VARCHAR(50), Unique)
- `password` (VARCHAR(255))
- `role` (ENUM: 'admin', 'staff', 'viewer')
- `created_at`, `updated_at` (TIMESTAMP)

### AUDIT_TRAIL
- `audit_id` (INT, Primary Key, Auto Increment)
- `record_type` (ENUM: 'household', 'resident', 'staff', 'account')
- `record_id` (VARCHAR(36))
- `details` (TEXT)
- `change_type` (ENUM: 'create', 'update', 'delete')
- `change_date` (TIMESTAMP)
- `acc_id` (VARCHAR(36), Foreign Key -> account.acc_id)

---

## Residents API

### Get All Residents
**GET** `/api/residents`

Query Parameters:
- `status` (optional) - Filter by status (default: 'active')
- `search` (optional) - Search by name, gender, or civil status

**Response:**
```json
[
  {
    "resident_id": "r001",
    "household_id": "h001",
    "first_name": "Juan",
    "last_name": "Dela Cruz",
    "birth_date": "1975-05-15",
    "age": 49,
    "gender": "male",
    "civil_status": "married",
    "educational_attainment": "High School Graduate",
    "contact_number": "09171234567",
    "email": null,
    "status": "active",
    "house_num": "001-A",
    "household_address": "Purok 1, New San Roque",
    "zone_num": 1
  }
]
```

### Get Single Resident
**GET** `/api/residents/:id`

**Response:**
```json
{
  "resident_id": "r001",
  "household_id": "h001",
  "first_name": "Juan",
  "last_name": "Dela Cruz",
  ...
}
```

### Create Resident
**POST** `/api/residents`

**Request Body:**
```json
{
  "household_id": "h001",
  "first_name": "Juan",
  "last_name": "Dela Cruz",
  "birth_date": "1975-05-15",
  "gender": "male",
  "civil_status": "married",
  "educational_attainment": "High School Graduate",
  "contact_number": "09171234567",
  "email": "juan@example.com"
}
```

### Update Resident
**PUT** `/api/residents/:id`

**Request Body:** (same as create)

### Delete Resident (Soft Delete)
**DELETE** `/api/residents/:id`

---

## Households API

### Get All Households
**GET** `/api/households`

Query Parameters:
- `status` (optional) - Filter by status (default: 'active')
- `search` (optional) - Search by address, house number, or zone
- `zone` (optional) - Filter by zone number

**Response:**
```json
[
  {
    "household_id": "h001",
    "zone_num": 1,
    "house_num": "001-A",
    "address": "Purok 1, New San Roque",
    "status": "active",
    "head_resident_id": "r001",
    "resident_count": 4
  }
]
```

### Get Single Household
**GET** `/api/households/:id`

**Response:**
```json
{
  "household_id": "h001",
  "zone_num": 1,
  "house_num": "001-A",
  "address": "Purok 1, New San Roque",
  "status": "active",
  "head_resident_id": "r001",
  "resident_count": 4,
  "residents": [
    {
      "resident_id": "r001",
      "first_name": "Juan",
      ...
    }
  ]
}
```

### Create Household
**POST** `/api/households`

**Request Body:**
```json
{
  "zone_num": 1,
  "house_num": "001-A",
  "address": "Purok 1, New San Roque",
  "head_resident_id": "r001"
}
```

### Update Household
**PUT** `/api/households/:id`

**Request Body:** (same as create, plus status)

### Delete Household (Soft Delete)
**DELETE** `/api/households/:id`

---

## Staff API

### Get All Staff
**GET** `/api/staff`

**Response:**
```json
[
  {
    "staff_id": "staff001",
    "first_name": "Maria",
    "last_name": "Santos",
    "title": "Barangay Captain",
    "picture": null,
    "created_at": "2025-12-01T00:00:00.000Z"
  }
]
```

### Get Single Staff Member
**GET** `/api/staff/:id`

### Create Staff Member
**POST** `/api/staff`

**Request Body:**
```json
{
  "first_name": "Maria",
  "last_name": "Santos",
  "title": "Barangay Captain",
  "picture": "path/to/image.jpg"
}
```

### Update Staff Member
**PUT** `/api/staff/:id`

### Delete Staff Member
**DELETE** `/api/staff/:id`

---

## Accounts API

### Get All Accounts
**GET** `/api/accounts`

**Response:** (passwords are excluded)
```json
[
  {
    "acc_id": "acc001",
    "username": "admin",
    "role": "admin",
    "created_at": "2025-12-01T00:00:00.000Z"
  }
]
```

### Get Single Account
**GET** `/api/accounts/:id`

### Create Account
**POST** `/api/accounts`

**Request Body:**
```json
{
  "username": "newuser",
  "password": "password123",
  "role": "staff"
}
```

**Note:** In production, passwords should be hashed using bcrypt before storage.

### Update Account
**PUT** `/api/accounts/:id`

**Request Body:**
```json
{
  "username": "newuser",
  "password": "newpassword123",
  "role": "admin"
}
```
Password is optional when updating.

### Delete Account
**DELETE** `/api/accounts/:id`

### Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "acc_id": "acc001",
    "username": "admin",
    "role": "admin"
  }
}
```

---

## Audit Trail API

### Get Audit Trail
**GET** `/api/audit-trail`

Query Parameters:
- `record_type` (optional) - Filter by record type
- `record_id` (optional) - Filter by specific record ID
- `limit` (optional) - Limit results (default: 100)

**Response:**
```json
[
  {
    "audit_id": 1,
    "record_type": "household",
    "record_id": "h001",
    "details": "Initial household registration",
    "change_type": "create",
    "change_date": "2025-12-01T00:00:00.000Z",
    "acc_id": "acc001",
    "username": "admin"
  }
]
```

### Create Audit Trail Entry
**POST** `/api/audit-trail`

**Request Body:**
```json
{
  "record_type": "resident",
  "record_id": "r001",
  "details": "Updated contact information",
  "change_type": "update",
  "acc_id": "acc001"
}
```

---

## Statistics API

### Get Population Statistics
**GET** `/api/statistics/population`

**Response:**
```json
{
  "total_population": 3946,
  "male_count": 1973,
  "female_count": 1973,
  "total_households": 987,
  "average_age": 28.5
}
```

### Get Zone Statistics
**GET** `/api/statistics/zones`

**Response:**
```json
[
  {
    "zone_num": 1,
    "household_count": 200,
    "population": 800,
    "male_count": 400,
    "female_count": 400
  }
]
```

### Get Age Distribution
**GET** `/api/statistics/age-distribution`

**Response:**
```json
[
  {
    "age_group": "Minor (0-17)",
    "count": 1200
  },
  {
    "age_group": "Young Adult (18-30)",
    "count": 1000
  }
]
```

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error
