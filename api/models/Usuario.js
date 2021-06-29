const { Model, DataTypes } = require('sequelize')

class Usuario extends Model {
  static init (sequelize){
    super.init({
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.Projeto, { foreignKey: 'lider_id', as: 'projetos'})
    this.hasMany(models.GrupoUsuario, { foreignKey: 'usuario_id', as: 'grupos_usuarios'})
  }
}

module.exports = Usuario;
