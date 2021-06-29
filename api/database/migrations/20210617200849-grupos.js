'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('grupos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome_grupo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status_grupo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      projeto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        References: { model: 'projetos', key: 'id',},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      responsavel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        References: { model: 'usuarios', key: 'id',},
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

    await queryInterface.dropTable('grupos');

  }
};
