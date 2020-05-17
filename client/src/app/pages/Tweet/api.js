import store from "../../../helpers/store";
import { socket } from "../../../config/index";

export function getFavorites() {
  const userDetail = store.getDataInLocal("userDetail");
  if (userDetail) {
    if (userDetail.favorites) return userDetail.favorites;
    else return null;
  } else return null;
}

export const tweetChannel = socket.tweet.channel + "/twitter/feed";
