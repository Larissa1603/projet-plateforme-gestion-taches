const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connexion MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/samadatabase')
    .then(() => console.log("MongoDB connecté"))
    .catch(err => console.error(err));

// Import des routes
const projectRoutes = require('./routes/projects');
const assignmentRoutes = require('./routes/assignments');

// Route racine
app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur Projets/Affectations !');
});


// Routes API
app.use('/api/projects', projectRoutes);
app.use('/api/assignments', assignmentRoutes);

// Lancement du serveur
app.listen(3000, () => console.log("Server running on port 3000"));




// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Connexion MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/samadatabase')
//     .then(() => console.log("MongoDB connecté"))
//     .catch(err => console.error(err));

// // Routes
// app.use("/api/projects", require("./routes/projects"));
// app.use("/api/assignments", require("./routes/assignments"));

// // Lancement du serveur
// app.listen(3000, () => console.log("Server running on port 3000"));