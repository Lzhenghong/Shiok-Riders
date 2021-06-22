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
        case 'fetch_listing':
            return {result: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
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
    const origin = {
        name: originObj.name, 
        type: 'Point',
        coordinates: [originObj.longitude, originObj.latitude]
    };
    const dest = {
        name: destObj.name, 
        type: 'Point',
        coordinates: [destObj.longitude, destObj.latitude]
        };
    const price = Number(priceString);
    try {
        await AuthAPI.post('/listing', {origin, dest, price});
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Unable to post listing'
        });
    }
};

const fetchListing = (dispatch) => async ({originObj, destObj, priceString, type}) => {
    const origin = {
        latitude: originObj.latitude,
        longitude: originObj.longitude
    };
    const dest = {
        latitude: destObj.latitude,
        longitude: destObj.longitude
    };
    const price = Number(priceString);
    try {
        const response = type == 'Driver' ? await AuthAPI.post('/hitcherlisting', {origin, dest, price}) : await AuthAPI.post('/driverlisting', {origin, dest, price});
        if (response.data.length == 0) {
            dispatch({
                type: 'add_error',
                payload: 'No search results'
            });
        } else {
            dispatch({
                type: 'fetch_listing',
                payload: response.data
            });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Unable to fetch listing'
        });
        console.log('Unable to fetch listing');
    }
};

const clearErrorMessage = (dispatch) => () => {
    dispatch({type: 'clear_error_message'});
  };

export const {Context, Provider} = createDataContext(
    listingReducer,
    {addOrigin, addDest, addPrice, addListing, fetchListing, clearErrorMessage},
    {origin: null}
);