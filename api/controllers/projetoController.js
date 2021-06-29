const Usuario = require('../models/Usuario');
const Projeto = require('../models/Projeto');

const { errorMessage, successMessage } = require('../config/helpers/messages');

module.exports = {
  async list(req, res) {
    const projetos = await Projeto.findAll({ include: { association: 'lider' } });
    
    return res.json({ projetos })
  },

  async find(req, res) {
    const { id } = req.params
    const projeto = await Projeto.findByPk(id, { include: { association: 'lider' } });

    if (!projeto) {
      return res.status(404).json(errorMessage('Projeto não existe!'))
    }
    return res.json({ projeto })
  },

  async create(req, res) {
    const { lider_id } = req.params
    const { nome_projeto, descricao_projeto, status_projeto } = req.body

    const lider = await Usuario.findByPk(lider_id)

    if (!lider) {
      return res.status(404).json(errorMessage('Usuário não cadastrado!'));
    }
    await Projeto.create({ nome_projeto, descricao_projeto, status_projeto, lider_id: lider.id });
    return res.status(201).json(successMessage('Projeto cadastrado com sucesso!'));
  },

  async update(req, res) {
    const { id } = req.params
    const { nome_projeto, descricao_projeto, status_projeto, lider_id } = req.body

    const projeto = await Projeto.findByPk(id);
    const lider = await Usuario.findByPk(lider_id);

    if (!projeto) {
      return res.status(404).json(errorMessage('Projeto não existe!'))
    }
    if (!lider) {
      return res.status(404).json(errorMessage('Usuário não existe!'))
    }

    await Projeto.update({ nome_projeto, descricao_projeto, status_projeto, lider_id: lider.id }, { where: { id: id }});
    return res.status(202).json(successMessage('Projeto atualizado com sucesso!'));
  },

  async delete(req, res) {
    const { id } = req.params
    const projeto = await Projeto.findByPk(id);

    if (!projeto) {
      return res.status(404).json(errorMessage('Projeto não existe ou ja foi excluido!'))
    }
    await Projeto.destroy({ where: { id: id } });

    return res.status(200).json(successMessage('Projeto excluido com sucesso!'));
  }
}