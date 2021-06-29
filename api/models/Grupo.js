const { Model, DataTypes } = require('sequelize')

class Grupo extends Model {
  static init (sequelize){
    super.init({
      nome_grupo: DataTypes.STRING,
      status_grupo: DataTypes.INTEGER,
      projeto_id: DataTypes.INTEGER,
      responsavel_id: DataTypes.INTEGER,
    }, {
      sequelize
    })
  }
  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'responsavel_id', as: 'responsavel' });
    this.belongsTo(models.Projeto, { foreignKey: 'projeto_id', as: 'projeto' });
    this.hasMany(models.GrupoUsuario, { foreignKey: 'grupo_id', as: 'grupos_usuarios'});
    this.hasMany(models.Tarefa, { foreignKey: 'grupo_id', as: 'tarefas'});
  }
}

module.exports = Grupo;
