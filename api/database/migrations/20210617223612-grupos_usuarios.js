'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('grupo_usuarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        References: { model: 'grupos', key: 'id',},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      grupo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        References: { model: 'grupos', key: 'id',},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('grupo_usuarios');
    
  }
};
