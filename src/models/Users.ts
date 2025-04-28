import { DataTypes, Model } from "sequelize";
import { insideDatabase } from "../database/inside";

export class UsersTable extends Model {}

UsersTable.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: insideDatabase,
    modelName: "UsersTable",
    tableName: "users",
    schema: "inside",
    timestamps: false,
  }
);
