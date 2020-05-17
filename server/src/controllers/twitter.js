import { Router } from "express";
import TwitterService from "../services/twitter";

class TwitterController {
  tService = new TwitterService();
  constructor() {
    this.router = Router();
    this.tService = new TwitterService();
    this.applyRoutes();
  }
  applyRoutes() {
    this.router.route("/trending").get((req, res) => {
      this.tService.getTrendingTopics(req, res);
    });
  }
}
export default TwitterController;
