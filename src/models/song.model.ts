import { Model, DataTypes } from "sequelize";
import { sequelize } from "../services/database.service";
import { Artist } from "./artist.model";

export interface ISong extends Model {
  name: string;
  artistId: string;
  songId: string;
  albumId: string;
  discNumber: number;
  durationMs: number;
  explicit: boolean;
  trackNumber: number;
  type: string;
  isLocal: boolean;
  images?: string;
  uri?: string;
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
  songId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  albumId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discNumber: DataTypes.INTEGER,
  durationMs: DataTypes.INTEGER,
  explicit: DataTypes.BOOLEAN,
  trackNumber: DataTypes.STRING,
  type: DataTypes.STRING,
  isLocal: DataTypes.BOOLEAN,
  uri: DataTypes.STRING,
  images: DataTypes.TEXT,
};

const config = {
  timestamps: true,
};
const Song = sequelize.define<ISong>("songs", model, config);

Song.belongsTo(Artist, {
  foreignKey: "artistId",
});

export { Song };
