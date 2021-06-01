import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: "http://61ae539b7a0a.ngrok.io",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    const type = await AsyncStorage.getItem('type');
    if (token && type) {
      config.headers.authorization = `Bearer ${token}`;
      config.headers.type = type;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;