import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default axios.create({
  baseURL: "http://61ae539b7a0a.ngrok.io",
});
