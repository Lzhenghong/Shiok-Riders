import locationReducer from '../context/LocationContext';

const testLoc = {
    name: 'sheares hall'
};

test('set current location', () => {
    var state = {};
    var action = {
        type: 'set_location',
        payload: testLoc
    };
    state = locationReducer(state, action);
    expect(state.currentLocation).toEqual(testLoc);
});