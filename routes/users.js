import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required" });
    }

    const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    const result = stmt.run(name, email);

    res.status(201).json({
      message: "User created successfully",
      userId: result.lastInsertRowid,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    const row = stmt.get(id);

    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
