import { Express } from "express";
import bodyParser from "body-parser";
import apiRouter from "./routers/index";

export class Server {
  private app: Express;

  constructor(app: Express) {
    this.app = app;

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use("/api", apiRouter);
  }

  public start(port: number): void {
    this.app.listen(port, () =>
      console.info(`Server listening on port ${port}!`)
    );
  }
}
