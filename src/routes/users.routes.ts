import { Router, Request, Response } from "express";

import { ensureAuthenticated } from "../middlewares/auth";

import { Users } from "../controllers/users";

const usersRouter = Router();
usersRouter.use(ensureAuthenticated);

usersRouter.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.body.email as string;
    const password = req.body.password as string;

    const users = new Users();
    const newUser = await users.createUser({ email, password });

    res.json(newUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default usersRouter;
