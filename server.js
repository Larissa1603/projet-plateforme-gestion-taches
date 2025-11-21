import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import userRoutes from './routes/userRoutes.js';
//import roleRoutes from './routes/roleRoutes.js';

dotenv.config().parsed;

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Routes pour Users et Roles
app.use('/api/users', userRoutes);
//app.use('/api/roles', roleRoutes);

// Route racine simple
app.get('/', (req, res) => {
  res.send('API Users & Roles en marche !');
});

// Vérification de la connexion à la base
db.authenticate()
  .then(() => console.log('Connexion à la base de données réussie !'))
  .catch(err => console.error('Impossible de se connecter à la base :', err));

// Synchronisation des modèles et lancement du serveur
const PORT = process.env.PORT || 3000;
db.sync({ alter: true }) // Met à jour les tables automatiquement
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur le port ${PORT}`);
    });
  })
  .catch(err => console.error('Erreur lors de la synchronisation des modèles :', err));
