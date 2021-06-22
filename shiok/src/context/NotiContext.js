import createDataContext from '../context/createDataContext';
import AuthAPI from '../api/AuthAPI';

const notiReducer = (state, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

const sendToDriver = (dispatch) => async ({recipient, type, booking, offer}) => {
    try {
        const response = await AuthAPI.post('/drivernoti', {recipient, type, booking, offer});
        console.log(response);
    } catch {
        console.log(response);
    }
};

export const {Context, Provider} = createDataContext(
    notiReducer,
    {sendToDriver},
    {errorMessage: ''}
);