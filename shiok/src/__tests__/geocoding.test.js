import GeoAPI from '../api/GeoAPI';
import geoSearch from '../hooks/geoSearch';
import reverseGeoSearch from '../hooks/reverseGeoSearch';

test('forward geocoding', async () => {
	const testLoc = {
		name: 'Sheares Hall'
	};
	GeoAPI.get = jest.fn().mockResolvedValue({
			data: {
				data: [
					testLoc
				]
			}
		});
	const {error, result} = await geoSearch('sheares hall', 1);
	expect(result[0]).toEqual(testLoc);
});

test('reverse geocoding', async () => {
	const testLoc = {
		name: 'Sheares Hall'
	};
	GeoAPI.get = jest.fn().mockResolvedValue({
		data: {
			data: [
				testLoc
			]
		}
	});
	const {error, result} = await reverseGeoSearch(103, 1.2);
	expect(result).toEqual(testLoc);
});





