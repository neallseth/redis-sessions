# redis-sessions

Implementation of cookie-based session management with Redis. Designed for compatibility with Next.js and Vercel Functions.

## API Endpoints
Manage session state via HTTP

1. `/login` (POST) - Pass user credentials in request body, and update handler function to set authentication status based on successful credential look-up. Sever will generate a new session and set corresponding browser cookie
2. `/logout` (GET) - Server will automatically retrieve session ID and terminate the active session
3. `/refresh-token` (GET) - Server will generate a fresh session from an existing one, and update browser cookies accordingly.
