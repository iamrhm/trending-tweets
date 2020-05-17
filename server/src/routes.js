import TwitterController from "./controllers/twitter";

class Route {
  constructor() {
    this.tweetRoutes = new TwitterController().router;
  }
  routes(app) {
    app.route("/").get((req, res) => {
      res.send("get successful");
    });
    app.use("/api/tweet", this.tweetRoutes);
  }
}
export default Route;
