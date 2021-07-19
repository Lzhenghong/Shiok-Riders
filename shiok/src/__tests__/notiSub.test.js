import notiSub from '../hooks/notiSub';

const offer = 'You have received an offer from';
const accept = 'Your offer is accepted by';
const reject = 'Your offer is rejected by';
const friend = 'You have been added as a friend by';

describe('test notification subtitles', () => {
    test('receive offer message', () => {
        expect(notiSub({type: 'Offer'})).toEqual(offer);
    });

    test('offer accepted', () => {
        expect(notiSub({type: 'Accept'})).toEqual(accept);
    });

    test('offer rejected', () => {
        expect(notiSub({type: 'Reject'})).toEqual(reject);
    });

    test('added as friend', () => {
        expect(notiSub({type: 'Friend'})).toEqual(friend);
    });
});



