import express from "express";
import { db } from "../db.js";
import { checkAndReward } from "../services/rewardService.js";

const router = express.Router();

router.post("/pay", async (req, res) => {
  try {
    const { userId, billId } = req.body;

    if (!userId || !billId) {
      return res.status(400).json({
        status: false,
        message: "userId and billId are required",
      });
    }

    const bill = db
      .prepare("SELECT * FROM bills WHERE id = ? AND userId = ?")
      .get(billId, userId);

    if (!bill) {
      return res.status(404).json({ status: false, message: "Bill not found" });
    }

    db.prepare("UPDATE bills SET paymentDate = ?, status = ? WHERE id = ?").run(
      new Date().toISOString(),
      "PAID",
      billId
    );

    const ifReward = checkAndReward(userId);

    if (ifReward) {
      return res.status(200).json({
        status: true,
        message:
          "Bill paid successfully and you have won a $10 Amazon Gift Card",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Bill paid successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
});

export default router;
