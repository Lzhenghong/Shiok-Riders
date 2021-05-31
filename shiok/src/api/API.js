import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default axios.create({
  baseURL: "http://7bded6d5b7f7.ngrok.io",
});

/*
const instance = axios.create({
  baseURL: "http://5b9f2d5873f6.ngrok.io",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    const type = AsyncStorage.getItem('type');
    if (token && type) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.type = type;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);*/
