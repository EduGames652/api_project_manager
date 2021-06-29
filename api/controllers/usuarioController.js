const Usuario = require('../models/Usuario');

const { errorMessage, successMessage } = require('../config/helpers/messages');
const { create } = require('../models/Usuario');

module.exports = {
  
  async list(req, res) {
    const usuario = await Usuario.findAll();
    
    return res.json({ usuario })
  },
  
  async find(req, res) {
    const { id } = req.params
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(400).json(errorMessage('Usuário não existe!'))
    }
    return res.json({ usuario })
  },

  async create(req, res) {
    const { nome, email } = req.body;

    const usuario = await Usuario.create({ nome, email })
    return res.json(usuario)
  },

  async update(req, res) {
    const { id } = req.params
    const { nome_usuario, email_usuario } = req.body
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(400).json(errorMessage('Usuário não existe!'))
    }
    await Usuario.update({ nome_usuario, email_usuario }, { where: { id: id }});
    return res.status(202).json(successMessage('Usuário atualizado com sucesso!'));
  },

  async delete(req, res) {
    const { id } = req.params
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(400).json(errorMessage('Usuário não existe!'))
    }
    await Usuario.destroy({ where: { id: id } });
    return res.status(200).json(successMessage('Usuário excluido com sucesso!'));
  },
}
