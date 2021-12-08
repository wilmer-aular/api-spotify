'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('albums', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      artistId: {
        type: Sequelize.STRING
      },
      albumId: {
        type: Sequelize.STRING
      },
      albumGroup: {
        type: Sequelize.STRING
      },
      albumType: {
        type: Sequelize.STRING
      },
      artists: {
        type: Sequelize.TEXT
      },
      totalTracks: {
        type: Sequelize.INTEGER
      },
      releaseDate: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.TEXT
      },
      uri: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('albums');
  }
};