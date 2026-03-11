# Authentication System Architecture

This document describes the file-based authentication system for this Next.js application.

## Overview

This is a simple file-based authentication system designed for development/testing purposes. It stores user credentials and session data in JSON files rather than a database.

**⚠️ Warning:** This is NOT secure for production use. For production, use a proper database with password hashing (bcrypt), secure cookies, and HTTPS.

## File Structure

```
lib/
├── actions.ts          # Server actions for session management
├── users.json          # User credentials storage
├── session.json        # Current session data
└── users.ts            # User CRUD operations

app/
├── page.tsx            # Home page (redirects to login/dashboard)
├── login/
│   └── page.tsx        # Login form
├── register/
│   └── page.tsx        # Registration form
├── dashboard/
│   └── page.tsx        # Protected dashboard
└── api/
    └── auth/
        ├── register/route.ts   # Registration API endpoint
        └── login/route.ts      # Login API endpoint
```

## File Descriptions

### `lib/actions.ts`
Server actions for session management. Uses Node.js `fs` module to read/write `session.json`.

**Functions:**
- `saveSession(user)` - Saves user session to file
- `clearSession()` - Clears current session
- `getSession()` - Reads and returns current session

### `lib/users.json`
JSON file storing registered users. Each user has:
- `id` - Unique identifier
- `name` - Full name
- `email` - Email address
- `password` - Plain text password (⚠️ not secure)

**Example:**
```json
[
  {
    "id": "1",
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }
]
```

### `lib/session.json`
JSON file storing current session data:
- `userId` - Current user's ID
- `email` - Current user's email
- `name` - Current user's name

**Example:**
```json
{
  "userId": "1",
  "email": "test@example.com",
  "name": "Test User"
}
```

### `lib/users.ts`
User CRUD operations using `fs` module. Provides:
- `readUsers()` - Read all users from file
- `writeUsers(users)` - Write users to file
- `createUser(name, email, password)` - Create new user
- `findUserByEmail(email)` - Find user by email

### `app/page.tsx`
Home page that checks session and redirects:
- If logged in → redirects to `/dashboard`
- If not logged in → redirects to `/login`

### `app/login/page.tsx`
Login form that:
- Collects email and password
- Calls `/api/auth/login` endpoint
- On success → redirects to `/dashboard`
- Shows "Don't have an account? Sign up" link

### `app/register/page.tsx`
Registration form that:
- Collects name, email, and password
- Calls `/api/auth/register` endpoint
- On success → redirects to `/login`
- Shows "Already have an account? Log in" link

### `app/dashboard/page.tsx`
Protected dashboard that:
- Shows welcome message with user's name
- Shows logout button
- Redirects to `/login` if not authenticated

### `app/api/auth/register/route.ts`
API endpoint for registration:
- `POST /api/auth/register`
- Validates input
- Checks if user exists
- Creates new user in `users.json`
- Returns success/error response

### `app/api/auth/login/route.ts`
API endpoint for login:
- `POST /api/auth/login`
- Validates input
- Finds user by email
- Verifies password
- Saves session to `session.json`
- Returns success/error response

## Authentication Flow

1. User visits `/` → redirected to `/login`
2. User fills login form → POST to `/api/auth/login`
3. Server validates credentials → saves session to `session.json`
4. User redirected to `/dashboard`
5. Dashboard shows welcome message
6. User clicks logout → clears session → redirected to `/login`

## Testing Credentials

Default test user in `users.json`:
- Email: `test@example.com`
- Password: `password123`

## Security Notes

⚠️ **This system is NOT secure for production:**

1. Passwords stored in plain text
2. No password hashing (bcrypt, argon2, etc.)
3. Session stored in file (not secure cookies)
4. No CSRF protection
5. No rate limiting
6. No HTTPS enforcement
7. Client-side session checking not possible

**For production, use:**
- NextAuth.js or Auth0
- Database with hashed passwords
- Secure HTTP-only cookies
- JWT tokens with expiration
- Rate limiting
- HTTPS only
