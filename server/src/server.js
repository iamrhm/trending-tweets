import App from "./app";
import SocketController from "./controllers/socket";

class Server {
  constructor() {
    this.PORT = 9080;
    this.server = this.startServer();
    this.socket = new SocketController(this.server);
  }
  startServer() {
    return App.listen(this.PORT, () => {
      console.log(`server started at Port ${this.PORT}`);
    });
  }
}

new Server();
