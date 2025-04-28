import { DataTypes, Model } from "sequelize";
import { insideDatabase } from "../database/inside";

export class UserSurveyResponseTable extends Model {}

UserSurveyResponseTable.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    response_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: insideDatabase,
    modelName: "UserSurveyResponseTable",
    tableName: "users_surveys_responses_aux",
    schema: "inside",
    timestamps: false,
  }
);
