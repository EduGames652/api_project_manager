const { Model, DataTypes } = require('sequelize')

class Tarefa extends Model {
  static init (sequelize){
    super.init({
      nome_tarefa: DataTypes.STRING,
      descricao_tarefa: DataTypes.STRING,
      prioridade_tarefa: DataTypes.STRING,
      grupo_id: DataTypes.INTEGER
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Projeto, { foreignKey: 'grupo_id', as: 'grupo' });
  }
}

module.exports = Tarefa;
