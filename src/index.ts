import { Hono } from "hono";
import { cors } from "hono/cors";
import db from "./db";

const app = new Hono();

app.use("/*", cors());

// Get all tasks
app.get("/tasks", (c) => {
  const tasks = db.query("SELECT * FROM tasks ORDER BY created_at DESC").all();
  return c.json(tasks);
});

// Get single task
app.get("/tasks/:id", (c) => {
  const id = c.req.param("id");
  const task = db.query("SELECT * FROM tasks WHERE id = ?").get(id);
  if (!task) return c.json({ error: "Task not found" }, 404);
  return c.json(task);
});

// Create task
app.post("/tasks", async (c) => {
  const body = await c.req.json();
  const { title, description } = body;

  if (!title) return c.json({ error: "Title is required" }, 400);

  const result = db
    .query("INSERT INTO tasks (title, description) VALUES (?, ?) RETURNING *")
    .get(title, description || "");

  return c.json(result, 201);
});

// Update task
app.put("/tasks/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const { title, description, status } = body;

  const existing = db.query("SELECT * FROM tasks WHERE id = ?").get(id);
  if (!existing) return c.json({ error: "Task not found" }, 404);

  const result = db
    .query(
      `UPDATE tasks
       SET title = ?, description = ?, status = ?, updated_at = datetime('now')
       WHERE id = ? RETURNING *`
    )
    .get(
      title || (existing as any).title,
      description ?? (existing as any).description,
      status || (existing as any).status,
      id
    );

  return c.json(result);
});

// Delete task
app.delete("/tasks/:id", (c) => {
  const id = c.req.param("id");
  const existing = db.query("SELECT * FROM tasks WHERE id = ?").get(id);
  if (!existing) return c.json({ error: "Task not found" }, 404);

  db.run("DELETE FROM tasks WHERE id = ?", [id]);
  return c.json({ message: "Task deleted" });
});

console.log("🚀 Bun Task API running on http://localhost:3000");

export default {
  port: 3000,
  fetch: app.fetch,
};
