import React from "react";
import io from "socket.io-client";

import { getFavorites, tweetChannel } from "./api";
import List from "../../components/twitter-list";
import { useSocket } from "../../hooks/useSocket";

import { Container } from "./styled.js";

function Group({ favorites, socket }) {
  socket.emit("favorite/tweets", { favorites: favorites });
  return (
    <div>
      {favorites.map((favorite, index) => {
        return <List key={index} favorite={favorite} socket={socket} />;
      })}
    </div>
  );
}

function Tweet() {
  const favorites = getFavorites();
  const { socket } = useSocket(tweetChannel, {
    transports: ["websocket"]
  });

  React.useEffect(() => {
    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);

  function handleNavigation(favorite) {
    console.log(favorite);
  }

  return (
    <Container>
      {favorites && socket ? (
        <Group favorites={favorites} socket={socket} />
      ) : null}
    </Container>
  );
}

export default Tweet;
