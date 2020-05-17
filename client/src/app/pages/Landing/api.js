import api from "../../../helpers/api";
import store from '../../../helpers/store'

const data = {
  endpoint: "/tweet/trending"
};

export async function getTrendingHashTags(params) {
  const trending = api({ url: data.endpoint, method: "get" });
  return trending;
}

export function storeData(value) {
  store.setDataInLocal("userDetail", value);
}