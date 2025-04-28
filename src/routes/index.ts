import { Router } from "express";
import surveysRouter from "./surveys.routes";
import usersRouter from "./users.routes";
import sessionsRouter from "./sessions.routes";

const routes = Router();

routes.use("/sessions", sessionsRouter);

routes.use("/surveys", surveysRouter);
routes.use("/users", usersRouter);

export default routes;
