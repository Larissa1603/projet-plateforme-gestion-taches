// server.js
import express from "express";
import db from "./models/index.js";
import projectRoutes from "./routes/projects.js";
import assignmentRoutes from "./routes/assignments.js";

const app = express();

app.use(express.json());

// Routes
app.use("/projects", projectRoutes);
app.use("/assignments", assignmentRoutes);

// Synchronisation MySQL
db.sequelize
  .sync()
  .then(() => console.log("📦 Base de données synchronisée !"))
  .catch((err) => console.error("❌ Erreur Sequelize :", err));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});