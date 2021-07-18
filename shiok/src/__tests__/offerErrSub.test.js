import errorSubtitle from '../hooks/offerErrSub';

const expired = 'This listing has expired';
const submitted = 'Please wait for the outcome';
const others = 'Please check your connection';

describe('test error descriptions in offer flow', () => {
    test('expired listing', () => {
        expect(errorSubtitle({errorMessage: 'Unable to find listing'})).toEqual(expired);
    });

    test('already submitted listing', () => {
        expect(errorSubtitle({errorMessage: 'Already submitted an offer'})).toEqual(submitted);
    });

    test('connection errors', () => {
        expect(errorSubtitle({errorMessage: ''})).toEqual(others);
    });
});