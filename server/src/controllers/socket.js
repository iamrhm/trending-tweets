import SocketIO from "socket.io";
import SocketService from "../services/socket";

class SocketController {
  constructor(server) {
    this.io = SocketIO(server);
    this.tweet = new SocketService();
    this.tweet.openChannel(this.io);
  }
}

export default SocketController;
