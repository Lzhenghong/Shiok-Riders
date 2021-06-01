import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default axios.create({
  baseURL: "http://be0c4f53bfdc.ngrok.io",
});


/*const instance = axios.create({
  baseURL: "http://be0c4f53bfdc.ngrok.io",
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
