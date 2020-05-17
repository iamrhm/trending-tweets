import express from "express";
import Router from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

class App {
  constructor() {
    this.app = express();
    this.config();
    this.router = new Router();
    this.router.routes(this.app);
  }
  config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }
}

export default new App().app;
