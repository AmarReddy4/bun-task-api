# Bun Task API

A lightweight task management REST API built with [Bun 1.0](https://bun.sh) and [Hono](https://hono.dev).

Trying out Bun 1.0 which just dropped — wanted to see how the built-in SQLite and the Hono framework work together for a simple CRUD API.

## Tech Stack

- **Bun 1.0** — Runtime + package manager + bundler
- **Hono** — Lightweight web framework
- **bun:sqlite** — Bun's built-in SQLite driver (no external DB needed)
- **TypeScript**

## Getting Started

```bash
# Install dependencies
bun install

# Run the server
bun run dev

# Server starts at http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | List all tasks |
| GET | `/tasks/:id` | Get a single task |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

## Example Usage

```bash
# Create a task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Try Bun 1.0", "description": "Build a REST API"}'

# List all tasks
curl http://localhost:3000/tasks

# Update a task
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'

# Delete a task
curl -X DELETE http://localhost:3000/tasks/1
```

## Why Bun?

- Crazy fast startup times compared to Node.js
- Built-in SQLite means zero database setup
- Native TypeScript support — no build step needed
- `bun:sqlite` is synchronous and fast, perfect for small APIs
