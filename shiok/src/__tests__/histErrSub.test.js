import errSubtitle from '../hooks/historyErrSub';

const existingFriend = 'This user had been added previously';
const others = 'Please check your connection';

describe('test error descriptions in history flow', () => {
    test('cannot add existing friend', () => {
        expect(errSubtitle({errorMessage: 'Existing friend'})).toEqual(existingFriend);
    });

    test('connection errors', () => {
        expect(errSubtitle({errorMessage: ''})).toEqual(others);
    });
});