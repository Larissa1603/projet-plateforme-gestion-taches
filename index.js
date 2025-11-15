import sequelize from './config/db.js';
import { DataTypes } from 'sequelize';

import defineRole from './models/Role.js';
import defineUtilisateur from './Utilisateur.js';
import defineProjet from './Projet.js';
import defineTache from './Tache.js';
import defineCommentaire from './Commentaire.js';
import defineAffectation from './Affectation.js';

const Role = defineRole(sequelize, DataTypes);
const Utilisateur = defineUtilisateur(sequelize, DataTypes);
const Projet = defineProjet(sequelize, DataTypes);
const Tache = defineTache(sequelize, DataTypes);
const Commentaire = defineCommentaire(sequelize, DataTypes);
const Affectation = defineAffectation(sequelize, DataTypes);

// Relations
Role.hasMany(Utilisateur, { foreignKey: 'role_id' });
Utilisateur.belongsTo(Role, { foreignKey: 'role_id' });
Projet.hasMany(Tache, { foreignKey: 'projet_id' });
Tache.belongsTo(Projet, { foreignKey: 'projet_id' });
Tache.hasMany(Commentaire, { foreignKey: 'tache_id' });
Commentaire.belongsTo(Tache, { foreignKey: 'tache_id' });
Commentaire.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });
Tache.belongsToMany(Utilisateur, { through: Affectation, foreignKey: 'tache_id' });
Utilisateur.belongsToMany(Tache, { through: Affectation, foreignKey: 'utilisateur_id' });

export default { sequelize, Role, Utilisateur, Projet, Tache, Commentaire, Affectation };