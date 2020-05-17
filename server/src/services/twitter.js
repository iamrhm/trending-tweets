import Twitter from "twitter";
import twitterConfig, { GET_TRENDING_URL } from "../configs/twitter";

class TwitterService {
  constructor() {
    this.config = twitterConfig();
    this.client = new Twitter(this.config);
  }
  getTrendingTopics(req, res) {
    this.client.get(GET_TRENDING_URL, function (error, tweets, response) {
      if (error) throw error;
      else {
        const [data] = JSON.parse(response.body);
        const trends = data.trends;
        const trending = trends.map((trend) => {
          return {
            hashTag: trend.name,
            volume: trend.tweet_volume
          };
        });
        res.send(trending);
      }
    });
  }
}
export default TwitterService;
