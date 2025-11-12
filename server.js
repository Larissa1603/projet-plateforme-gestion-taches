require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('DB syncée');
  app.listen(PORT, () => {
    console.log(`API en marche sur http://localhost:${PORT}`);
  });
});