import { Model, DataTypes } from "sequelize";
import { sequelize } from "../services/database.service";
import { Song } from "./song.model";
import { Album } from "./album.model";

export interface IArtist extends Model {
  name: string;
  artistId: string;
  popularity: number;
  genres: string[];
  totalFallowers: number;
  images: string;
  uri: string;
}

const model = {
  artistId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  popularity: DataTypes.INTEGER,
  genres: DataTypes.STRING,
  totalFallowers: DataTypes.INTEGER,
  images: DataTypes.TEXT,
  uri: DataTypes.STRING,
};

const config = {
  timestamps: true,
};
const Artist = sequelize.define<IArtist>("artists", model, config);

// Artist.hasMany(Album, {
//   foreignKey: "artistId",
// });

export { Artist };
