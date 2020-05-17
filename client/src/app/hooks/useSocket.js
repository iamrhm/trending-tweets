import React from "react";
import io from "socket.io-client";

export const useSocket = (serverUrl, options) => {
  const socket = React.useRef(null);
  const [isConnected, setConnected] = React.useState(false);

  React.useEffect(() => {
    const client = io.connect(serverUrl, { ...options });
    client.on("connect", () => {
      console.log("user connected to server");
      socket.current = client;
      setConnected(true);
    });
    client.on("disconnect", () => {
      console.log("user disconnected from server");
      setConnected(false);
    });
  }, [serverUrl]);

  return { socket: socket.current, isConnected };
};
