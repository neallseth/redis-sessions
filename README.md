# redis-sessions

Implementation of cookie-based session management with Redis. Designed for compatibility with Next.js and Vercel Functions.

## API Endpoints

Manage session state via HTTP

1. `/api/auth/login` (POST) - Pass user credentials in request body, and update handler function to set authentication status based on successful credential look-up. Sever will generate a new session and set corresponding browser cookie
2. `/api/auth/logout` (GET) - Server will automatically retrieve session ID and terminate the active session
3. `/api/auth/refresh-token` (GET) - Server will generate a fresh session from an existing one, and update browser cookies accordingly.

## Utility Functions

Note: all auth-related utility functions are presently in `auth-helpers.js`

1. `getLocalSession` (Browser util) - Returns active session data from the client environment
2. `createSession` (Server util) - Creates a new session of arbitrary expiration, for a given user
3. `invalidateSession` (Server util) - Invalidates an active session on the server
