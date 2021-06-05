import createDataContext from '../context/createDataContext';
import AuthAPI from '../api/AuthAPI';

const listingReducer = (state, action) => {
    switch(action.type) {
        case 'add_origin':
            return {...state, origin: action.payload};
        case 'add_dest':
            return {...state, dest: action.payload};
        case 'add_price':
            return {...state, price: action.payload};
        default:
            return state;
    }
};

const addOrigin = (dispatch) => (location) => {
    dispatch({
        type: 'add_origin', 
        payload: location
    });
};

const addDest = (dispatch) => (location) => {
    dispatch({
        type: 'add_dest',
        payload: location
    });
};

const addPrice = (dispatch) => (price) => {
    dispatch({
        type: 'add_price',
        payload: price
    });
};

export const {Context, Provider} = createDataContext(
    listingReducer,
    {addOrigin, addDest, addPrice},
    {origin: null}
);