import createDataContext from "./createDataContext";
import AuthAPI from '../api/AuthAPI';

const profileReducer = (state, action) => {
	switch (action.type) {
		case "add_error":
			return { ...state, errorMessage: action.payload };
		case 'fetch':
			return {user: action.payload};
		case 'clear_error_message':
			return {...state, errorMessage: action.payload};
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
	} catch (e) {
		dispatch({
			type: 'add_error',
			payload: e.response.data.error
		});
	}
};

const editProfile = (dispatch) => async ({username, phoneNumber, teleHandle, licenseNumber}) => {
	try {
		const response = await AuthAPI.put('/editprofile', {username, phoneNumber, teleHandle, licenseNumber});
		dispatch({
			type: 'fetch',
			payload: response.data
		})
	} catch (e) {
		dispatch({
			type: 'add_error',
			payload: e.response.data.error
		});
	}
};

const deleteFriend = (dispatch) => async ({friend}) => {
	try {
		const response = await AuthAPI.post('/deletefriend', {friend});
		dispatch({
			type: 'fetch',
			payload: response.data
		});
	} catch (e) {
		dispatch({
			type: 'add_error',
			payload: e.response.data.error
		});
	}
};

const editPic = (dispatch) => async ({pic}) => {
	try {
		const response = await AuthAPI.post('/editpic', {pic});
		dispatch({
			type: 'fetch',
			payload: response.data
		});
	} catch (e) {
		dispatch({
			type: 'add_error',
			payload: e.response.data.error
		});
	}
};

const clearErrorMessage = (dispatch) => () => {
	dispatch({
		type: 'clear_error_message',
		payload: ''
	});
};

export const { Provider, Context } = createDataContext(
	profileReducer,
	{ fetchProfile, editProfile, deleteFriend, editPic, clearErrorMessage },
	{errorMessage: ''}
);

export default profileReducer;