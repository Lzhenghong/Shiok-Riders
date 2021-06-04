import createDataContext from '../context/createDataContext';

const listingReducer = (state, action) => {
    switch(action.type) {
        case 'add_origin':
            return {...state, origin: action.payload};
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

export const {Context, Provider} = createDataContext(
    listingReducer,
    {addOrigin},
    {origin: null}
);