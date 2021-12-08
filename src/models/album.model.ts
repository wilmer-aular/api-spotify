import { Model, DataTypes } from "sequelize";
import { sequelize } from "../services/database.service";
import { Artist } from "./artist.model";

export interface IAlbum extends Model {
  name: string;
  albumId: string;
  artistId: string;
  albumGroup: string;
  albumType: string;
  artists?: string;
  totalTracks: number;
  releaseDate: string;
  uri: string;
  images: string;
}

const model = {
  artistId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,

    autoIncrement: true,
  },
  name: DataTypes.STRING,
  albumId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  albumGroup: DataTypes.STRING,
  albumType: DataTypes.STRING,
  artists: DataTypes.STRING,
  totalTracks: DataTypes.INTEGER,
  releaseDate: DataTypes.STRING,
  uri: DataTypes.STRING,
  images: DataTypes.TEXT,
};

const config = {
  timestamps: true,
};
const Album = sequelize.define<IAlbum>("albums", model, config);

Album.belongsTo(Artist, {
  foreignKey: "artistId",
});

export { Album };
