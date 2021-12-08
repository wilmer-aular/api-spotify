'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class songs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  songs.init({
    name: DataTypes.STRING,
    artistId: DataTypes.STRING,
    songId: DataTypes.STRING,
    albumId: DataTypes.STRING,
    discNumber: DataTypes.INTEGER,
    durationMs: DataTypes.INTEGER,
    explicit: DataTypes.BOOLEAN,
    trackNumber: DataTypes.INTEGER,
    type: DataTypes.STRING,
    isLocal: DataTypes.BOOLEAN,
    uri: DataTypes.STRING,
    images: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'songs',
  });
  return songs;
};