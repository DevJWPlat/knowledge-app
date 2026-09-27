PRAGMA foreign_keys = ON;

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_active_at TEXT
);

CREATE TABLE user_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  category TEXT NOT NULL,
  item_id TEXT NOT NULL,
  skill TEXT NOT NULL,
  mastery REAL NOT NULL DEFAULT 0 CHECK (mastery >= 0 AND mastery <= 100),
  correct_count INTEGER NOT NULL DEFAULT 0 CHECK (correct_count >= 0),
  incorrect_count INTEGER NOT NULL DEFAULT 0 CHECK (incorrect_count >= 0),
  streak INTEGER NOT NULL DEFAULT 0 CHECK (streak >= 0),
  last_seen_at TEXT,
  last_correct_at TEXT,
  last_incorrect_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (user_id, category, item_id, skill)
);

CREATE TABLE quiz_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  category TEXT NOT NULL,
  mode TEXT NOT NULL,
  scope_json TEXT NOT NULL DEFAULT '{}',
  question_count INTEGER NOT NULL CHECK (question_count > 0),
  correct_count INTEGER NOT NULL DEFAULT 0 CHECK (correct_count >= 0),
  incorrect_count INTEGER NOT NULL DEFAULT 0 CHECK (incorrect_count >= 0),
  score INTEGER NOT NULL DEFAULT 0,
  accuracy REAL CHECK (accuracy IS NULL OR (accuracy >= 0 AND accuracy <= 100)),
  duration_ms INTEGER CHECK (duration_ms IS NULL OR duration_ms >= 0),
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE quiz_answers (
  id TEXT PRIMARY KEY,
  quiz_session_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  category TEXT NOT NULL,
  item_id TEXT NOT NULL,
  skill TEXT NOT NULL,
  question_type TEXT NOT NULL,
  prompt_key TEXT,
  selected_answer TEXT,
  correct_answer TEXT NOT NULL,
  is_correct INTEGER NOT NULL CHECK (is_correct IN (0, 1)),
  response_time_ms INTEGER CHECK (response_time_ms IS NULL OR response_time_ms >= 0),
  answered_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (quiz_session_id) REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_progress_user_category
  ON user_progress (user_id, category);

CREATE INDEX idx_user_progress_weak
  ON user_progress (user_id, category, mastery ASC);

CREATE INDEX idx_quiz_sessions_user_started
  ON quiz_sessions (user_id, started_at DESC);

CREATE INDEX idx_quiz_answers_session
  ON quiz_answers (quiz_session_id, answered_at ASC);

CREATE INDEX idx_quiz_answers_user_item
  ON quiz_answers (user_id, category, item_id, skill, answered_at DESC);
