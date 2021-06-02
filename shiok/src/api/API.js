import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default axios.create({
  baseURL: "http://2f6304fe8aa4.ngrok.io",
});
