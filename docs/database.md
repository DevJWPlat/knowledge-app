# Database model

The first migration deliberately uses a category/item/skill progress model instead of hard-coding flag and capital columns.

A geography row might represent:

```text
category = geography
item_id  = PT
skill    = country_to_capital
mastery  = 61
```

A future category can reuse the same structure without a schema migration.

## Core tables

### users

Minimal local user record. Authentication identities and password-reset data will be added with the auth implementation.

### user_progress

One row per user/category/item/skill combination. Stores the current mastery snapshot plus useful counters and timestamps.

### quiz_sessions

One row per quiz attempt. `scope_json` stores flexible configuration such as continent or weak-only filters without creating many nullable columns.

### quiz_answers

Raw answer history. This is retained so mastery logic can improve later without losing the underlying attempt data.
