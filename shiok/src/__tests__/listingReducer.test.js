import listingReducer from '../context/ListingContext';

const origin = 'sheares hall';
const dest = 'city hall';
const price = 10;
const testListing = [{origin, dest, price}];
const testErrorMessage = 'test error message';

describe('test listing reducer', () => {
    var state = {};
    var action = {};

    test('add pick up point', () => {
        action = {
            type: 'add_origin',
            payload: origin
        };
        state = listingReducer(state, action);
        expect(state.origin).toEqual(origin);
    });

    test('add drop off point', () => {
        action = {
            type: 'add_dest',
            payload: dest
        };
        state = listingReducer(state, action);
        expect(state.dest).toEqual(dest);
    });

    test('add price', () => {
        action = {
            type: 'add_price',
            payload: price
        };
        state = listingReducer(state, action);
        expect(state.price).toEqual(price);
    });

    test('fetch listing', () => {
        action = {
            type: 'fetch_listing',
            payload: testListing
        };
        state = listingReducer(state, action);
        expect(state.result).toEqual(testListing);
    });

    test('add error message', () => {
        action = {
            type: 'add_error',
            payload: testErrorMessage
        };
        state = listingReducer(state, action);
        expect(state.errorMessage).toEqual(testErrorMessage);
    });

    test('delete error message', () => {
        action = {
            type: 'clear_error_message',
            payload: ''
        };
        state = listingReducer(state, action);
        expect(state.errorMessage).toEqual('');
    });
});