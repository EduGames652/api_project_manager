'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tarefas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome_tarefa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao_tarefa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      grupo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        References: { model: 'grupos', key: 'id',},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      prioridade_tarefa: {
        type: Sequelize.STRING,
        allowNull: false,
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

    await queryInterface.dropTable('tarefas');
    
  }
};