/*
  # Add Image Support to Projects and Insights

  1. Changes
    - Add image_url column to projects table
    - Add image_url column to insights table
    - Both columns are text type to store Unsplash image URLs
    - Allows NULL initially for backward compatibility

  2. Notes
    - Using Unsplash for high-quality stock photos
    - Images will be relevant to engineering/technical content
    - URLs point directly to Unsplash CDN
*/

-- Add image_url to projects table
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS image_url text;

-- Add image_url to insights table
ALTER TABLE insights 
ADD COLUMN IF NOT EXISTS image_url text;
