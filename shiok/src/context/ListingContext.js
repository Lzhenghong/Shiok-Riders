import createDataContext from '../context/createDataContext';

const listingReducer = (state, action) => {
    switch(action.type) {
        case 'add_origin':
            return {...state, origin: action.payload};
        case 'add_dest':
            return {...state, dest: action.payload};
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

export const {Context, Provider} = createDataContext(
    listingReducer,
    {addOrigin, addDest},
    {origin: null}
);