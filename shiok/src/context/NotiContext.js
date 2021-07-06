import createDataContext from '../context/createDataContext';
import AuthAPI from '../api/AuthAPI';

const notiReducer = (state, action) => {
    switch(action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'fetch_noti':
            return {noti: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: action.payload};
        default:
            return state;
    }
};

const sendOffer = (dispatch) => async ({recipient, type, listing, offer}) => {
    try {
        await AuthAPI.post('/sendoffer', {recipient, type, listing, offer});
    } catch (e) {
        dispatch({
            type: 'add_error',
            payload: e.response.data.error
        });
    }   
};

const fetchNoti = (dispatch) => async () => {
    try {
        const response = await AuthAPI.get('fetchnoti');
        dispatch({
            type: 'fetch_noti',
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: 'add_error',
            payload: e.response.data.error
        });
    }
};

const sendResult = (dispatch) => async ({result, item}) => {
    try {
        await AuthAPI.post('/sendresult', {result, item});
    } catch (e) {
        dispatch({
            type: 'add_error',
            payload: e.response.data.error
        });
    }
};

const deleteNoti = (dispatch) => async ({item}) => {
    try {
        const response = await AuthAPI.post('/deletenoti', {item});
        dispatch({
            type: 'fetch_noti',
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: 'add_error',
            payload: e.response.data.error
        });
    }
};

const readNoti = (dispatch) => async ({item}) => {
    try {
        await AuthAPI.post('/readnoti', {item});
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
    {sendOffer, fetchNoti, sendResult, deleteNoti, readNoti, clearErrorMessage},
    {errorMessage: '', noti: []}
);