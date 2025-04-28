import { Request, Response } from "express";
import { insideDatabase } from "../database/inside";
import { UserSurveyResponseTable } from "../models/UserSurveyResponse";

interface evoltionParameters {
  startDate: string;
  endDate: string;
  format: string;
}

export class UserSurveyRepository {
  // createItem = async (req: Request, res: Response) => {
  //   try {
  //     const response = await UserSurveyResponseTable.create(req.body);
  //     res.status(201).json(response);
  //   } catch (error: any) {
  //     res.status(500).json({ error: error.message });
  //   }
  // };

  //   SELECT
  //   origin,
  //   TO_CHAR(created_at, 'YYYY-MM-DD HH24:00') as hour,
  //   COUNT(*) as total,
  //   SUM(CASE WHEN response_stat = 1 THEN 1 ELSE 0 END) as converted
  // FROM your_table_name
  // GROUP BY origin, hour
  // ORDER BY hour ASC;

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

  // updateItem = async (req: Request, res: Response) => {
  //   try {
  //     const [updated] = await UserSurveyResponseTable.update(req.body, {
  //       where: { id: req.params.id },
  //     });
  //     if (!updated) return res.status(404).json({ error: "Response not found" });
  //     res.json({ message: "Response updated" });
  //   } catch (error: any) {
  //     res.status(500).json({ error: error.message });
  //   }
  // };

  // deleteItem = async (req: Request, res: Response) => {
  //   try {
  //     const deleted = await UserSurveyResponseTable.destroy({
  //       where: { id: req.params.id },
  //     });
  //     if (!deleted) return res.status(404).json({ error: "Response not found" });
  //     res.json({ message: "Response deleted" });
  //   } catch (error: any) {
  //     res.status(500).json({ error: error.message });
  //   }
  // };
}
