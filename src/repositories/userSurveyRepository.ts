import { Request, Response } from "express";
import { insideDatabase } from "../database/inside";
import { UserSurveyResponseTable } from "../models/UserSurveyResponse";

interface evoltionParameters {
  startDate: string;
  endDate: string;
  format: string;
}

export class UserSurveyRepository {
  getEvolutionTime = async () => {
    try {
      const [results] = await insideDatabase.query(
        `
          SELECT 
            origin,
            TO_CHAR(created_at, 'YYYY-MM-DD HH24:00') AS period,
            COUNT(*) AS total,
            SUM(CASE WHEN response_status_id = 6 THEN 1 ELSE 0 END) AS converted
          FROM inside.users_surveys_responses_aux
          GROUP BY origin, period
          ORDER BY period ASC;
        `
      );

      return results;
    } catch (error: any) {
      console.log(error);
      throw new Error(`Erro ao receber os itens por evolução de itens`);
    }
  };

  getEvolutionTimePerPeriod = async ({ startDate, endDate, format }: evoltionParameters) => {
    try {
      const [results] = await insideDatabase.query(
        `
          SELECT 
            origin,
            TO_CHAR(created_at, :format) AS period,
            COUNT(*) AS total,
            SUM(CASE WHEN response_status_id = 6 THEN 1 ELSE 0 END) AS converted
          FROM inside.users_surveys_responses_aux
          WHERE DATE(created_at) BETWEEN DATE(:startDate) AND DATE(:endDate)
          GROUP BY origin, period
          ORDER BY period ASC;
        `,
        {
          replacements: { startDate, endDate, format },
        }
      );

      return results;
    } catch (error: any) {
      console.log(error);
      throw new Error(`Erro ao receber os itens por evolução de itens`);
    }
  };

  getItems = async () => {
    try {
      const responses = await UserSurveyResponseTable.findAll();
      return responses;
    } catch (error: any) {
      console.log(error);
      throw new Error(`Erro ao receber os itens`);
    }
  };
}
