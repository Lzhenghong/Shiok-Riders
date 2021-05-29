import createDataContext from '../context/createDataContext';

const locationReducer = (state, action) => {
    switch(action.type) {
        case 'set_location':
            return {...state, currentLocation: action.payload};
        default:
            return state;
    }
};

const setLocation = (dispatch) => (location) => {
    return dispatch({type: 'set_location', payload: location});
};

export const {Context, Provider} = createDataContext(
    locationReducer,
    {setLocation},
    {currentLocation: null}
);