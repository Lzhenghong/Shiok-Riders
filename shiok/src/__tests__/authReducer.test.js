import authReducer from '../context/AuthContext';

const testToken = '123';
const testErrorMessage = 'test error message';


describe('test auth reducer', () => {
    var state = {};
    var action = {};

    test('sign in', () => {
        action = {
            type: 'signin',
            payload: testToken
        };
        state = authReducer(state, action);
        expect(state.token).toEqual(testToken);
    });

    test('add error message', () => {
        action = {
            type: 'add_error',
            payload: testErrorMessage
        };
        state = authReducer(state, action);
        expect(state.errorMessage).toEqual(testErrorMessage);
    });

    test('delete error message', () => {
        action = {
            type: 'clear_error_message',
            payload: ''
        };
        state = authReducer(state, action);
        expect(state.errorMessage).toEqual('');
    });

    test('sign out', () => {
        action = {
            type: 'signout'
        };
        state = authReducer(state, action);
        expect(state.token).toEqual(null);
    });
});