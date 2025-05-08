import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const ensureAuthenticated: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string | undefined = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({ error: "token não encontrado" });
    return;
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não definido nas variáveis de ambiente!");
  }

  jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      res.status(403).json({ error: "token não compatível" });
      return;
    }

    req.user = user as string;
    next();
  });
};
