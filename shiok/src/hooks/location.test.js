import useLocation from './useLocation';
import * as Location from 'expo_location';

test('track user location', async (done) => {
    const testLoc = {
        coords: {
            latitude: 1.29177,
            longitude: 103.77561
        }
    };
    Location.watchPositionAsync = jest.fn().mockResolvedValue((location) => testLoc);
    const response = await useLocation((location) => location);
    expect(response).toEqual(testLoc);
});