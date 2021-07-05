import createDataContext from '../context/createDataContext';
import AuthAPI from '../api/AuthAPI';

const bookingReducer = (state, action) => {
    switch(action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'fetch_history':
            return {history: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: action.payload};
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

const deleteRecord = (dispatch) => async ({item}) => {
    try {
        await AuthAPI.post('/deletehistory', {item});
    } catch (e) {
        dispatch({
            type: 'add_error',
            payload: e.response.data.error
        });
    }
};

const readRecord = (dispatch) => async ({item}) => {
    try {
        await AuthAPI.post('/readhistory', {item});
    } catch (e) {
        dispatch({
            type: 'add_error',
            payload: e.response.data.error
        });
    }
};

const rateClient = (dispatch) => async ({item, rating}) => {
    try {
        await AuthAPI.post('/rate', {item, rating});
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
    bookingReducer,
    {fetchHistory, deleteRecord, readRecord, rateClient, clearErrorMessage},
    {errorMessage: '', history: null}
);