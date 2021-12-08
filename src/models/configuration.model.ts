import { Model, DataTypes } from "sequelize";
import { sequelize } from "../services/database.service";

export interface IConfiguration extends Model {
  token: string;
  key: string;
}

const model = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
  },
  token: DataTypes.STRING,
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
};
const config = {
  timestamps: true,
};

export const Configutation = sequelize.define<IConfiguration>(
  "configurations",
  model,
  config
);
