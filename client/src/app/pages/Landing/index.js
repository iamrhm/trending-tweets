import React, { useReducer, useEffect } from "react";
import { Container, WelcomeBox, InputBox, Btn } from "./styled";

import { storeData, getTrendingHashTags } from "./api";

const initialState = {
  username: "",
  favorites: [],
  step: 1,
  isLoggedIn: false
};

function reducer(state, action) {
  switch (action.type) {
    case "update-username":
      return { ...state, username: action.payload.username };
    case "update-favorites":
      return { ...state, favorites: [...action.payload.favorites] };
    case "update-step":
      return { ...state, step: action.payload.step };
    case "update-loggedin":
      return { ...state, isLoggedIn: action.payload.loggedIn };
    default:
      return state;
  }
}

export default function ({ history }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmit() {
    storeData(state);
    history.push("/tweet");
  }

  return (
    <Container>
      {state.step === 1 ? (
        <UserNameSlide username={state.username} dispatch={dispatch} />
      ) : (
        <TrendingSlide
          favorites={state.favorites}
          dispatch={dispatch}
          handleSubmit={handleSubmit}
        />
      )}
    </Container>
  );
}

function UserNameSlide({ username, dispatch }) {
  function handleInputChange(e) {
    const newUsername = e.target.value.trim();
    const action = {
      type: "update-username",
      payload: { username: newUsername }
    };
    dispatch({ ...action });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "update-step", payload: { step: 2 } });
  }
  return (
    <WelcomeBox>
      <InputBox
        type="text"
        name="username"
        value={username}
        onChange={(e) => handleInputChange(e)}
        placeholder="enter name"
      ></InputBox>
      <Btn onClick={handleSubmit}>Next</Btn>
    </WelcomeBox>
  );
}

function TrendingSlide({ favorites, dispatch, handleSubmit }) {
  const [trending, setTrending] = React.useState(null);

  useEffect(() => {
    async function fetchTrending() {
      const { data } = await getTrendingHashTags();
      setTrending(data);
    }
    fetchTrending();
  }, []);

  function addToFavorite(trend) {
    if (favorites.length <= 5) {
      let newFavorite = [...favorites];
      newFavorite.push(trend);
      const action = {
        type: "update-favorites",
        payload: { favorites: newFavorite }
      };
      dispatch({ ...action });
    }
  }

  if (trending) {
    return (
      <WelcomeBox>
        {trending.map((trend, index) => {
          let isFavorite = favorites.find(
            (favorite) =>
              favorite.hashTag.toLowerCase() === trend.hashTag.toLowerCase()
          );
          return (
            <span
              key={index}
              favorite={isFavorite}
              onClick={() => addToFavorite(trend)}
            >
              {trend.hashTag}
            </span>
          );
        })}
        <span>Limit:{5 - favorites.length}</span>
        <Btn onClick={handleSubmit}>Join</Btn>
      </WelcomeBox>
    );
  } else {
    return <div>LOADING</div>;
  }
}
