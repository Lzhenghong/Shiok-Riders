import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import API from "../api/API";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return {errorMessage: '', token: action.payload.token, email: action.payload.email, type: action.payload.type}
      //return { errorMessage: "", token: action.payload.token, user: action.payload.user };
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signout':
      return {token: null, errorMessage: ''};
    case 'fetch':
      return {...state, email: action.payload.email, type: action.payload.type, username: action.payload.name, hp: action.payload.phoneNumber};
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  const email = await AsyncStorage.getItem('email');
  const type = await AsyncStorage.getItem('type');
  if (token) {
    dispatch({
      type: 'signin', 
      payload: {token, email, type}
    });
    navigate('Home');
  } else {
    navigate('Signup');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

const signup = (dispatch) => async ({ email, password, type }) => {
  try {
    const response = await API.post("/signup", { email, password, type });
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('type', type);
    dispatch({
      type: "signin",
      payload: {token: response.data.token, email, type}
      //payload: {token: response.data.token, user: {email, type}}
    });
    navigate("Home");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up"
    });
  }
};
                                                                                   
const signin = (dispatch) => async ({email, password, type}) => {
  try {
    const response = await API.post('/signin', {email, password, type});
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('type', type);
    dispatch({
      type: 'signin', 
      payload: {token: response.data.token, email, type}
      //payload: {token: response.data.token, user: {email, type}}
    });
    navigate('Home');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in'
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('email');
  await AsyncStorage.removeItem('type');
  dispatch({type: 'signout'});
  navigate('Signup');
};

const fetchProfile = (dispatch) => async () => {
    const token = await AsyncStorage.getItem('token');
    const type = await AsyncStorage.getItem('type');
  try {
    //const config = {headers: {Authorization: `Bearer ${token}`, Type: type}};
    const response = await API.get('/profile', {authorization: `Bearer ${token}`, type: type});
    console.log(response.data);
    dispatch({
      type: 'fetch',
      payload: response.data
    });
  } catch (err) {
    console.log('cannot profile');
    dispatch({
      type: 'add_error',
      payload: 'Unable to load data'
    });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin, fetchProfile },
  { token: null, errorMessage: "" }
);
