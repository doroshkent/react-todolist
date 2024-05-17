import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    "API-KEY": "a28a56e1-ba51-4753-a062-ef2932404ace"
  }
})

instance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = "Bearer " + localStorage.getItem("sn-token");

  return config;
});
