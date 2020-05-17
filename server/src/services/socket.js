import Twitter from "twitter";
import twitterConfig from "../configs/twitter";
import { parseTweet } from "../helper/tweet";

class SocketService {
  constructor() {
    const config = twitterConfig();
    this.client = new Twitter(config);
  }

  openChannel(io) {
    io.of("/socket/twitter/feed").on("connection", (socket) => {
      console.log("user connected");
      this.setupSocket(socket);
    });
  }

  setupSocket(socket) {
    this.socket = socket;
    this.setupEvents(this.socket);
  }

  setupEvents(socket) {
    socket.on("favorite/tweets", (data) => {
      let favorites = data.favorites;
      favorites.map((favorite) => {
        this.getTweetEvent(socket, favorite);
      });
    });
    socket.on("disconnect", function () {
      console.log("user disconnected");
    });
  }

  getTweetEvent(socket, favorite) {
    const client = this.client;
    const { hashTag } = favorite;
    socket.on(`getTweets/${hashTag}`, function (data) {
      let track = data.favorite.hashTag;
      const stream = client.stream("statuses/filter", {
        track: track,
        language: "en"
      });
      stream.on("data", function (event) {
        const response = parseTweet(event);
        console.log(response);
        socket.emit(`pull/${hashTag}`, { tweetRes: response });
      });
      stream.on("error", function (error) {
        console.log(error);
        //throw error;
      });
    });
    socket.on("disconnect", function () {
      console.log("user disconnected");
    });
  }
}
export default SocketService;
