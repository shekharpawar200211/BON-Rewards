import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.post("/query", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const allowed = /^(SELECT|INSERT|UPDATE|DELETE)\s/i;
    if (!allowed.test(query.trim())) {
      return res.status(403).json({
        error: "Only SELECT, INSERT, UPDATE, DELETE queries are allowed",
      });
    }

    const stmt = db.prepare(query);
    let result;

    const command = query.trim().split(" ")[0].toUpperCase();

    if (command === "SELECT") {
      result = stmt.all();
      res.json({ success: true, rows: result, count: result.length });
    } else {
      result = stmt.run();
      res.json({
        success: true,
        message: `${result.changes} row(s) affected`,
        lastInsertRowid: result.lastInsertRowid || null,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
