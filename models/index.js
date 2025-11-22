import { Sequelize } from "sequelize";
import ProjectModel from "./Project.js";
import AssignmentModel from "./Assignment.js";

// Connexion MySQL
const sequelize = new Sequelize("myprojectdb", "root", "", {
  host: "127.0.0.1",  // ou localhost

  dialect: "mysql",
});

// Initialisation des modèles
const db = {};
db.sequelize = sequelize;
db.Project = ProjectModel(sequelize);
db.Assignment = AssignmentModel(sequelize);

// Relation simple
db.Project.hasMany(db.Assignment, { foreignKey: "projectId" });
db.Assignment.belongsTo(db.Project, { foreignKey: "projectId" });

export default db;