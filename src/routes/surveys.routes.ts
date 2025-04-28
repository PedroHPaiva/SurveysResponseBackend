import { Router, Request, Response } from "express";

import { ensureAuthenticated } from "../middlewares/auth";

import { UserSurveyResponse } from "../controllers/userSurveyResponse";

const surveysRouter = Router();

// surveysRouter.use(ensureAuthenticated);

surveysRouter.get("/", ensureAuthenticated, async (req: Request, res: Response): Promise<void> => {
  try {
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const groupBy = req.query.groupBy as string | undefined;

    const userSurveyResponse = new UserSurveyResponse();
    const evolution = await userSurveyResponse.getEvolutionTime({ startDate, endDate, groupBy });

    res.json(evolution);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

surveysRouter.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const userSurveyResponse = new UserSurveyResponse();
    const response = await userSurveyResponse.saveSurveysInCache();
    res.json(response);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default surveysRouter;
