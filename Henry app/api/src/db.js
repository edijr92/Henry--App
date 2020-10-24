require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const Clases = require('./models/Clase');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/henryapp`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Usuario, Cohorte, Grupo, Notas, Clase, Pair, Feedback, Nota } = sequelize.models;

// Aca vendrian las relaciones
Usuario.belongsTo(Cohorte);
Cohorte.hasMany(Usuario);
Usuario.belongsTo(Grupo);
Grupo.hasMany(Usuario);
Cohorte.hasMany(Grupo);
Grupo.belongsTo(Cohorte);

Clase.belongsTo (Cohorte);
Cohorte.hasMany (Clase);
Pair.hasMany(Usuario);
Usuario.belongsTo(Pair);
Cohorte.hasMany(Pair);
Pair.belongsTo(Cohorte);
Grupo.hasMany(Pair);
Pair.belongsTo(Grupo);
Usuario.hasMany(Feedback, {foreignKey:"autorId", as:"autor"});
Usuario.hasMany(Feedback, {foreignKey:"alumnoId", as:"alumno"});
Feedback.belongsTo(Usuario, {
  foreignKey: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'autorId',
        allowNull: true
    }, as:"autor"});
Feedback.belongsTo(Usuario, {
  foreignKey: {
  type: Sequelize.DataTypes.INTEGER,
  field: 'alumnoId',
  allowNull: true
}, as:"alumno"});
Usuario.hasMany(Nota, {foreignKey:"evaluadoId", as:"evaluado"});
Usuario.hasMany(Nota, {foreignKey:"correctorId", as:"corrector"});
Nota.belongsTo(Usuario, {
  foreignKey: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'evaluadoId',
        allowNull: true
    }, as:"evaluado"});
Nota.belongsTo(Usuario, {
  foreignKey: {
  type: Sequelize.DataTypes.INTEGER,
  field: 'correctorId',
  allowNull: true
}, as:"corrector"});
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
  