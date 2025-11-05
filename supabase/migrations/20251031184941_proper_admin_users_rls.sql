/*
  # Proper Admin Users RLS Policy

  1. Changes
    - Drop the overly permissive policy
    - Keep RLS enabled but rely on service role key bypassing RLS
    - Service role key is only used server-side in API routes

  2. Security
    - RLS is enabled on admin_users table
    - No public access policies (service role bypasses RLS automatically)
    - Only backend API routes with service role can access admin_users
    - Frontend cannot directly query admin_users table
*/

-- Drop the permissive policy we just created
DROP POLICY IF EXISTS "Service role can manage admin users" ON admin_users;

-- RLS remains enabled, but we rely on service role key bypassing RLS
-- No policies needed because:
-- 1. Service role bypasses RLS (used in backend auth.ts)
-- 2. Anon key has no policies, so cannot access the table
-- This is the most secure approach for admin authentication
