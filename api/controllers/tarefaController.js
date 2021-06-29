const Tarefa = require('../models/Tarefa');
const Grupo = require('../models/Grupo');

const { errorMessage, successMessage } = require('../config/helpers/messages');

module.exports = {
  async list_by_group(req, res) {
    const { grupo_id } = req.params;

    const grupo = await Grupo.findByPk(grupo_id);

    if (!grupo) {
      return res.status(404).json(errorMessage('Grupo não existe!'))
    }

    const tarefas = await Tarefa.findAll({
      where: {
        grupo_id: grupo.id
      }
    });
    
    return res.json({ tarefas })
  },

  async find(req, res) {
    const { id } = req.params

    const tarefa = await Tarefa.findByPk(id);

    if (!tarefa) {
      return res.status(404).json(errorMessage('Tarefa não existe!'))
    }

    return res.json({ tarefa })
  },

  async create(req, res) {
    const { grupo_id } = req.params;
    const { nome_tarefa, descricao_tarefa, prioridade_tarefa } = req.body

    const grupo = await Grupo.findByPk(grupo_id);

    if (!grupo) {
      return res.status(404).json(errorMessage('Grupo não existe!'))
    }

    await Tarefa.create({ nome_tarefa, descricao_tarefa, prioridade_tarefa, grupo_id });
    return res.status(201).json(successMessage('Tarefa cadastrado com sucesso!'));
  },

  async update(req, res) {
    const { id } = req.params
    const { nome_tarefa, descricao_tarefa, prioridade_tarefa, grupo_id } = req.body

    const tarefa = await Tarefa.findByPk(id);

    const grupo = await Grupo.findByPk(grupo_id);

    if (!grupo) {
      return res.status(404).json(errorMessage('Grupo não existe!'))
    }

    if (!tarefa) {
      return res.status(404).json(errorMessage('Tarefa não existe!'))
    }

    await Tarefa.update({ nome_tarefa, descricao_tarefa, prioridade_tarefa }, { where: { id: id }});

    return res.status(202).json(successMessage('Tarefa atualizado com sucesso!'));
  },

  async delete(req, res) {
    const { id } = req.params
    const tarefa = await Tarefa.findByPk(id);

    if (!tarefa) {
      return res.status(404).json(errorMessage('Tarefa não existe ou ja foi excluido!'))
    }

    await Tarefa.destroy({ where: { id } });

    return res.status(200).json(successMessage('Tarefa excluido com sucesso!'));
  }
}
