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
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Erro interno do servidor." });
  }
});

export default sessionsRouter;
