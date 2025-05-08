import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import cors from "cors";

dotenv.config();

class App {
  public server: Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());

    this.server.get("/liveness_check", (req: Request, res: Response): void => {
      res.status(200).json({
        message: "API viva.",
      });
    });
  }

  private routes(): void {
    this.server.use(routes);
  }
}

export default App;
