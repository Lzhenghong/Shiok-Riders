import bookingReducer from '../context/BookingContext';

const testRecord = [{
    origin: 'sheares hall',
    dest: 'city hall',
    price: 10
}]

const testErrorMessage = 'test error message';

describe('test booking reducer', () => {
    var state = {};
    var action = {};

    test('fetch records', () => {
        action = {
            type: 'fetch_history',
            payload: testRecord
        };
        state = bookingReducer(state, action);
        expect(state.history).toEqual(testRecord);
    });

    test('add error message', () => {
        action = {
            type: 'add_error',
            payload: testErrorMessage
        };
        state = bookingReducer(state, action);
        expect(state.errorMessage).toEqual(testErrorMessage);
    });

    test('delete error message', () => {
        action = {
            type: 'clear_error_message',
            payload: ''
        };
        state = bookingReducer(state, action);
        expect(state.errorMessage).toEqual('');
    });
});