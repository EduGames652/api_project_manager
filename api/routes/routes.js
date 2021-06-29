const express = require("express");
const usuarioController = require("../controllers/usuarioController")
const projetoController = require("../controllers/projetoController")
const tarefaController = require("../controllers/tarefaController")
const grupoController = require("../controllers/grupoController")

const routes = express.Router();

routes.get('/', (req, res) => res.json({ Server: 'OK'}));

// Usuários
routes.get('/usuarios', usuarioController.list);
routes.get('/usuario/:id', usuarioController.find);
routes.post('/usuario', usuarioController.create);
routes.put('/usuario/:id', usuarioController.update);
routes.delete('/usuario/:id', usuarioController.delete);

// Projetos
routes.get('/projetos', projetoController.list);
routes.get('/projeto/:id', projetoController.find);
routes.post('/usuario/:lider_id/projeto', projetoController.create);
routes.put('/projeto/:id', projetoController.update);
routes.delete('/projeto/:id', projetoController.delete);

// Grupos
routes.get('/projeto/:projeto_id/grupos', grupoController.list);
routes.get('/projeto/:projeto_id/grupo/:id', grupoController.find);
routes.post('/projeto/:projeto_id/grupo', grupoController.create);
routes.delete('/grupo/:id', grupoController.delete);
routes.put('/grupo/:id', grupoController.update);
routes.post('/usuario/:usuario_id/grupo/:id', grupoController.associate_user);

// Tarefas
routes.get('/grupo/:grupo_id/tarefas', tarefaController.list_by_group);
routes.get('/tarefa/:id', tarefaController.find);
routes.post('/grupo/:grupo_id/tarefa', tarefaController.create);
routes.delete('/tarefa/:id', tarefaController.delete);
routes.put('/tarefa/:id', tarefaController.update);

module.exports = routes