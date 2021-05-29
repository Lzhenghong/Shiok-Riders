import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import API from "../api/API";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload.token, email: action.payload.email };
      //return {errorMessage: '', token: action.payload};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signout':
      return {token: null, errorMessage: ''};
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  const email = await AsyncStorage.getItem('email');
  if (token) {
    dispatch({
      type: 'signin', 
      //payload: token
      payload: {token, email}
    });
    navigate('Home');
  } else {
    navigate('Signup');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await API.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem('email', email);
    dispatch({
      type: "signin",
      //payload: response.data.token
      payload: {token: response.data.token, email}
    });
    navigate("Home");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up"
    });
  }
};
                                                                                   
const signin = (dispatch) => async ({email, password}) => {
  try {
    const response = await API.post('/signin', {email, password});
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('email', email);
    dispatch({
      type: 'signin', 
      //payload: response.data.token
      payload: {token: response.data.token, email}
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
  dispatch({type: 'signout'});
  navigate('Signup');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
