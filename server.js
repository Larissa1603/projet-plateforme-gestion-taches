import express from 'express';
import db from './models/index.js';
import userRoutes from './routes/userRoutes.js';
// Importez les autres routes

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
// app.use('/api/projects', projectRoutes); etc.

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Server on port ${PORT}`));
}).catch(err => console.error(err));