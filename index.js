import express from "express";
import { db } from "./db.js";
import registerRoutes from "./routes/routes.js";

const app = express();

app.use(express.json());

registerRoutes(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
