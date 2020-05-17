import axios from "axios";
import { api as config } from "../config";

const api = (options) => {
  const normalizedOptions = {
    ...options,
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    data: { ...options.data }
  };

  const axiosInstance = axios.create({
    baseURL: config.endpoint,
    headers: {
      ...normalizedOptions.headers
    },
    data: { ...normalizedOptions.data }
  });

  function onSuccess(response) {
    return response;
  }

  function onError(error) {
    if (axios.isCancel(error)) {
      return null;
    }
    return Promise.reject(error);
  }

  return axiosInstance(normalizedOptions)
    .then((response) => onSuccess(response))
    .catch((error) => onError(error));
};

export default api;
