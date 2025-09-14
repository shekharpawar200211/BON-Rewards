import { db } from "../db.js";

export async function checkAndReward(userId) {
  try {
    const bills = db
      .prepare(
        "SELECT * FROM bills WHERE userId = ? ORDER BY dueDate DESC LIMIT 3"
      )
      .all(userId);

    if (bills.length < 3) {
      return false;
    }

    const allOnTime = bills.every(
      (bill) =>
        bill.status === "PAID" &&
        new Date(bill.paymentDate) <= new Date(bill.dueDate)
    );

    if (allOnTime) {
      const issuedAt = new Date();
      const expiryDate = new Date(issuedAt);
      expiryDate.setMonth(expiryDate.getMonth() + 6);

      const reward = {
        userId,
        rewardType: "Gift Card",
        value: "$10 Amazon Gift Card",
        issuedAt: issuedAt.toISOString(),
        expiryDate: expiryDate.toISOString(),
      };

      db.prepare(
        "INSERT INTO rewards (userId, rewardType, value, issuedAt, expiryDate) VALUES (?, ?, ?, ?, ?)"
      ).run(
        reward.userId,
        reward.rewardType,
        reward.value,
        reward.issuedAt,
        reward.expiryDate
      );

      return reward;
    }

    return false;
  } catch (err) {
    console.error("Reward check failed:", err.message);
    throw err;
  }
}
