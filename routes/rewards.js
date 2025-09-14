import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const query = "SELECT * FROM rewards WHERE userId = ?";
    const rows = db.prepare(query).all(userId);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No rewards found for this user" });
    }

    res.status(200).json({ rewards: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
