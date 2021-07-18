import notiReducer from '../context/NotiContext';

const testNoti = {
    recipient: 'jmhitcher',
    sender: 'jmdriver'
};

const testErrorMessage = 'test error message';

describe('test noti reducer', () => {
    var state = {};
    var action = {};

    test('fetch notifications', () => {
        action = {
            type: 'fetch_noti',
            payload: testNoti
        };
        state = notiReducer(state, action);
        expect(state.noti).toEqual(testNoti);
    });

    test('add error message', () => {
        action = {
            type: 'add_error',
            payload: testErrorMessage
        };
        state = notiReducer(state, action);
        expect(state.errorMessage).toEqual(testErrorMessage);
    });

    test('delete error message', () => {
        action = {
            type: 'clear_error_message',
            payload: ''
        };
        state = notiReducer(state, action);
        expect(state.errorMessage).toEqual('');
    });
});