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
        case 'add_error':
            return {...state, errorMessage: action.payload};
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

const addListing = (dispatch) => async ({originObj, destObj, priceString}) => {
    const origin = {name: originObj.name, latitude: originObj.latitude, longitude: originObj.longitude};
    const dest = {name: destObj.name, latitude: destObj.latitude, longitude: destObj.longitude};
    const price = Number(priceString);
    try {
        await AuthAPI.post('/listing', {origin, dest, price});
        console.log('success');
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Unable to post listing'
        });
        console.log('Unable to post listing');
    }
};

export const {Context, Provider} = createDataContext(
    listingReducer,
    {addOrigin, addDest, addPrice, addListing},
    {origin: null}
);