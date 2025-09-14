import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const query = db.prepare("SELECT * FROM bills WHERE userId = ?");
    const bills = query.all(userId);

    if (!bills || bills.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No bills found for this user",
      });
    }

    return res.status(200).json({
      status: true,
      bills,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
});

export default router;
