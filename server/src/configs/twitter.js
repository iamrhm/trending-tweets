require('dotenv').config();

export default function () {
  const configs = {
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  };
  return configs;
}

export const GET_TRENDING_URL = "https://api.twitter.com/1.1/trends/place.json?id=1"

