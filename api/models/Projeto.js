const { Model, DataTypes } = require('sequelize')

class Projeto extends Model {
  static init (sequelize){
    super.init({
      nome_projeto: DataTypes.STRING,
      descricao_projeto: DataTypes.STRING,
      status_projeto: DataTypes.INTEGER,
      lider_id: DataTypes.INTEGER
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'lider_id', as: 'lider' })
  }
}

module.exports = Projeto;
