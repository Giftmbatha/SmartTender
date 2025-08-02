INSERT INTO plans (name, max_users, can_ai_summary, can_readiness_check, can_export, weekly_search_limit)
VALUES 
  ('Free', 1, FALSE, FALSE, FALSE, 3),
  ('Basic', 3, TRUE, TRUE, FALSE, NULL),
  ('Pro', 9999, TRUE, TRUE, TRUE, NULL);
