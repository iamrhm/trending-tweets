import React from "react";

const initialState = {
  tweets: []
};

function reducer(state, action) {
  switch (action.type) {
    case "update_tweet":
      return { ...state, tweets: [...state.tweets, action.payload] };

    default:
      return state;
  }
}

const List = ({ favorite, socket }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { hashTag } = favorite;

  function handleNewTweets(data) {
    const tweet = data.tweetRes;
    dispatch({
      type: "update_tweet",
      payload: tweet
    });
  }

  React.useEffect(() => {
    if (socket && favorite) {
      socket.emit(`getTweets/${hashTag}`, { favorite: favorite });
      socket.on(`pull/${hashTag}`, handleNewTweets);
    }
    return () => {
      if (socket) socket.disconnect();
    };
  }, [favorite]);

  return <div>Tweet List{console.log("state", state.tweets)}</div>;
};

export default List;
