import createDataContext from '../context/createDataContext';
import AuthAPI from '../api/AuthAPI';

const notiReducer = (state, action) => {
    switch(action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'fetch_offernoti':
            return {...state, offer: action.payload};
        case 'fetch_friendnoti':
            return {...state, friend: action.payload};
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

const fetchOfferNoti = (dispatch) => async () => {
    try {
        const response = await AuthAPI.get('/offernoti');
        dispatch({
            type: 'fetch_offernoti',
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: 'add_error',
            payload: e.response.data.error
        });
    }
};

const fetchFriendNoti = (dispatch) => async () => {
    try {
        const response = await AuthAPI.get('/friendnoti');
        dispatch({
            type: 'fetch_friendnoti',
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
        await AuthAPI.post('/deletenoti', {item});
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
    {sendOffer, fetchOfferNoti, fetchFriendNoti, sendResult, deleteNoti, readNoti, clearErrorMessage},
    {errorMessage: '', offer: null, friend: null}
);