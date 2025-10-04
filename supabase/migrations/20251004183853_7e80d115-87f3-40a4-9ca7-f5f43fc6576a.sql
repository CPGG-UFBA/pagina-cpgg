-- Reset visitor count for Salvador to 1
UPDATE visitor_locations SET visitor_count = 1 WHERE city = 'Salvador' AND country = 'Brazil';