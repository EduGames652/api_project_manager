const Sequelize = require('sequelize');
const dbConfig = require('../database/database');
const Usuario = require('../../models/Usuario');
const Projeto = require('../../models/Projeto');
const Tarefa = require('../../models/Tarefa');
const Grupo = require('../../models/Grupo');
const GrupoUsuario = require('../../models/GrupoUsuario');
// const Privilegio = require('../../models/Privilegio')

const connection = new Sequelize(dbConfig);

// Inits
Usuario.init(connection)
Projeto.init(connection)
Grupo.init(connection)
GrupoUsuario.init(connection)
Tarefa.init(connection)

// Associates
Projeto.associate(connection.models)
Usuario.associate(connection.models)
Grupo.associate(connection.models)
GrupoUsuario.associate(connection.models)
Tarefa.associate(connection.models)

module.exports = connection;
