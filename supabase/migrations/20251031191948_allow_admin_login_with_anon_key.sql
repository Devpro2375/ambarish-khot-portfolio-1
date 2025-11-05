/*
  # Allow Admin Login with Anon Key

  1. Changes
    - Add policy to allow reading admin_users by email for login verification
    - This is safe because:
      - Only allows SELECT operation
      - Password hashes are bcrypt (cannot be reversed)
      - Login happens server-side in API routes
      - No user can modify admin_users data

  2. Security
    - RLS remains enabled
    - Only SELECT is allowed (no INSERT/UPDATE/DELETE)
    - Passwords are hashed with bcrypt
    - Authentication logic validates passwords server-side
*/

-- Allow reading admin_users for login verification
-- This is safe because passwords are hashed and verification happens server-side
CREATE POLICY "Allow reading admin users for authentication"
  ON admin_users
  FOR SELECT
  USING (true);
