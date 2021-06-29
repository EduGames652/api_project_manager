const Usuario = require('../models/Usuario');
const Projeto = require('../models/Projeto');
const Grupo = require('../models/Grupo');
const GrupoUsuario = require('../models/GrupoUsuario');

const { errorMessage, successMessage } = require('../config/helpers/messages');

module.exports = {
  async list(req, res) {
    const grupos = await Grupo.findAll({
      include: [
        { association: 'responsavel' }, 
        { association: 'projeto' }
      ]
    });
    
    return res.json({ grupos });
  },
  
  async find(req, res) {
    const { id } = req.params;
    const grupo = await Grupo.findByPk(id, {
      include: [
        { association: 'responsavel' },
        {
          association: 'grupos_usuarios',
          include: { association: 'usuario' },
        }
      ]
    });

    if (!grupo) {
      return res.status(400).json(errorMessage('Grupo não existe!'));
    }

    return res.json({ grupo });
  },

  async create(req, res) {
    const { projeto_id } = req.params;
    const { nome_grupo, status_grupo, responsavel_id } = req.body;

    const projeto = await Projeto.findByPk(projeto_id);
    const responsavel = await Usuario.findByPk(responsavel_id);

    if (!projeto) {
      return res.status(404).json(errorMessage('Projeto não cadastrado!'));
    }
    if (!responsavel) {
      return res.status(404).json(errorMessage('Usuário não cadastrado!'));
    }

    await Grupo.create({
      nome_grupo,
      status_grupo,
      projeto_id: projeto.id,
      responsavel_id: responsavel.id
    });

    return res.status(201).json(successMessage('Grupo cadastrado com sucesso!'));
  },

  async update(req, res) {
    const { id } = req.params;
    const { nome_grupo, status_grupo, responsavel_id } = req.body;

    const projeto = await Projeto.findByPk(projeto_id);
    const responsavel = await Usuario.findByPk(responsavel_id);

    if (!projeto) {
      return res.status(404).json(errorMessage('Projeto não cadastrado!'));
    }
    if (!responsavel) {
      return res.status(404).json(errorMessage('Usuário não cadastrado!'));
    }

    await Grupo.update({
      nome_grupo,
      status_grupo,
      projeto_id: projeto.id,
      responsavel_id: responsavel.id
    }, { where: { id }});
    return res.status(202).json(successMessage('Grupo atualizado com sucesso!'));
  },

  async delete(req, res) {
    const { id } = req.params;
    const grupo = await Grupo.findByPk(id);

    if (!grupo) {
      return res.status(400).json(errorMessage('Grupo não existe!'));
    }
    await Grupo.destroy({ where: { id: id } });
    return res.status(200).json(successMessage('Grupo excluido com sucesso!'));
  },

  async associate_user(req, res) {
    const { id, usuario_id } = req.params;

    const grupo = await Grupo.findByPk(id);
    const usuario = await Usuario.findByPk(usuario_id);

    if (!grupo) {
      return res.status(404).json(errorMessage('Grupo não cadastrado!'));
    }
    if (!usuario) {
      return res.status(404).json(errorMessage('Usuário não cadastrado!'));
    }

    await GrupoUsuario.create({
      usuario_id: usuario.id,
      grupo_id: grupo.id
    })

    return res.status(201).json(successMessage('Vinculo cadastrado com sucesso!'));
  }
}
