import createDataContext from '../context/createDataContext';
import AuthAPI from '../api/AuthAPI';

const bookingReducer = (state, action) => {
    switch(action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'fetch_history':
            return {history: action.payload};
        default:
            return state;
    }
};

const fetchHistory = (dispatch) => async () => {
    try {
        const response = await AuthAPI.get('/history');
        dispatch({
            type: 'fetch_history',
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: 'add_error',
            payload: e.response.data.error
        });
    }
};

export const {Context, Provider} = createDataContext(
    bookingReducer,
    {fetchHistory},
    {errorMessage: '', history: null}
);