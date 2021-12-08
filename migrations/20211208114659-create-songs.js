'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('songs', {
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
      songId: {
        type: Sequelize.STRING
      },
      albumId: {
        type: Sequelize.STRING
      },
      discNumber: {
        type: Sequelize.INTEGER
      },
      durationMs: {
        type: Sequelize.INTEGER
      },
      explicit: {
        type: Sequelize.BOOLEAN
      },
      trackNumber: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      isLocal: {
        type: Sequelize.BOOLEAN
      },
      uri: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('songs');
  }
};