import jwt from 'jsonwebtoken';

// Middleware pour protéger les routes
const auth = (req, res, next) => {
  try {
    // Récupérer le token depuis les headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token manquant ou invalide' });
    }

    const token = authHeader.split(' ')[1]; // "Bearer TOKEN"

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter l'utilisateur décodé à la requête
    req.user = decoded;

    next(); // passer au controller
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token invalide' });
  }
};

export default auth;
