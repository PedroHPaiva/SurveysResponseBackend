import { Router, Request, Response } from "express";

import { Sessions } from "../controllers/sessions";

const sessionsRouter = Router();

sessionsRouter.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.body.email as string;
    const password = req.body.password as string;

    const sessions = new Sessions();
    const newSession = await sessions.createSession({ email, password });

    res.json(newSession);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default sessionsRouter;
