import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import API from "../api/API";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return {...state, errorMessage: '', token: action.payload};
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
  if (token) {
    dispatch({
      type: 'signin', 
      payload: token
    });
    navigate('Home');
  } else {
    navigate('Signin');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

const signup = (dispatch) => async ({ email, password, type, phoneNumber }) => {
  try {
    const response = await API.post("/signup", { email, password, type, phoneNumber });
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem('type', type);
    dispatch({
      type: "signin",
      payload: response.data.token
    });
    navigate("Home");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Email has already been registered"
    });
  }
};
                                                                                   
const signin = (dispatch) => async ({email, password, type}) => {
  try {
    const response = await API.post('/signin', {email, password, type});
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('type', type);
    dispatch({
      type: 'signin', 
      payload: response.data.token
    });
    navigate('Home');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Invalid email or password'
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('type');
  dispatch({type: 'signout'});
  navigate('Signin');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);

export default authReducer;
