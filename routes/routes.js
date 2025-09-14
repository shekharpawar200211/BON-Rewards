import usersRouter from "./users.js";
import paymentsRouter from "./payments.js";
import billsRouter from "./bills.js";
import rewardsRouter from "./rewards.js";
import adminRouter from "./admin.js";

export default function registerRoutes(app) {
  app.use("/users", usersRouter);
  app.use("/payments", paymentsRouter);
  app.use("/bills", billsRouter);
  app.use("/rewards", rewardsRouter);
  app.use("/admin", adminRouter);
}
