import createDataContext from "./createDataContext";
import AuthAPI from '../api/AuthAPI';

const profileReducer = (state, action) => {
    switch (action.type) {
        case "add_error":
            return { ...state, errorMessage: action.payload };
        case 'fetch':
            return {user: action.payload};
        case 'edit_profile':
            return {user: action.payload};
        default:
            return state;
    }
};

const fetchProfile = (dispatch) => async () => {
    try {
      const response = await AuthAPI.get('/profile');
      dispatch({
        type: 'fetch',
        payload: response.data
      });
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Unable to load data'
      });
    }
  };
  
  const editProfile = (dispatch) => (username, hp) => {
    dispatch({
      type: 'edit_profile', 
      payload: {username, phoneNumber: hp}
    });
  };

  export const { Provider, Context } = createDataContext(
    profileReducer,
    { fetchProfile, editProfile },
    {}
  );