const { Model, DataTypes } = require('sequelize')

class GrupoUsuario extends Model {
  static init (sequelize){
    super.init({
      usuario_id: DataTypes.INTEGER,
      grupo_id: DataTypes.INTEGER,
    }, {
      sequelize
    });
  }
  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    this.belongsTo(models.Grupo, { foreignKey: 'grupo_id', as: 'grupo' });
  }
}

module.exports = GrupoUsuario;
