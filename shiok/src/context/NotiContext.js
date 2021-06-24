import createDataContext from '../context/createDataContext';
import AuthAPI from '../api/AuthAPI';

const notiReducer = (state, action) => {
    switch(action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'fetch_bookingnoti':
            return {...state, booking: action.payload}
        case 'clear_error_message':
            return {...state, errorMessage: action.payload};
        default:
            return state;
    }
};

const sendToDriver = (dispatch) => async ({recipient, type, booking, offer}) => {
    try {
        await AuthAPI.post('/drivernoti', {recipient, type, booking, offer});
    } catch (e) {
        dispatch({
            type: 'add_error',
            payload: e.response.data.error
        });
    }   
};

const fetchBookingNoti = (dispatch) => async () => {
    try {
        const response = await AuthAPI.get('/bookingnoti');
        dispatch({
            type: 'fetch_bookingnoti',
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

export const {Context, Provider} = createDataContext(
    notiReducer,
    {sendToDriver, fetchBookingNoti, clearErrorMessage},
    {errorMessage: ''}
);