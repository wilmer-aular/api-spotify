'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class albums extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  albums.init({
    name: DataTypes.STRING,
    artistId: DataTypes.STRING,
    albumId: DataTypes.STRING,
    albumGroup: DataTypes.STRING,
    albumType: DataTypes.STRING,
    artists: DataTypes.TEXT,
    totalTracks: DataTypes.INTEGER,
    releaseDate: DataTypes.STRING,
    images: DataTypes.TEXT,
    uri: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'albums',
  });
  return albums;
};