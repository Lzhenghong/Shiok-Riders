import profileReducer from '../context/ProfileCOntext';

const testUser = {
    username: 'jmhitcher'
};

const testErrorMessage = 'test error message';

describe('test profile reducer', () => {
    var state = {};
    var action = {};

    test('fetch profile data', () => {
        action = {
            type: 'fetch',
            payload: testUser
        };
        state = profileReducer(state, action);
        expect(state.user).toEqual(testUser);
    });

    test('add error message', () => {
        action = {
            type: 'add_error',
            payload: testErrorMessage
        };
        state = profileReducer(state, action);
        expect(state.errorMessage).toEqual(testErrorMessage);
    });

    test('delete error message', () => {
        action = {
            type: 'clear_error_message',
            payload: ''
        };
        state = profileReducer(state, action);
        expect(state.errorMessage).toEqual('');
    });
});
