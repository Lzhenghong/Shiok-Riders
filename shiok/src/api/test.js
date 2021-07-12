const GeoAPI = require('./GeoAPI');

test('forward geocoding', async () => {
	const testLoc = {
		name: 'Sheares Hall'
	}
	GeoAPI.get = jest.fn().mockResolvedValue((input, limit) => {
		return {
			error: false,
			result: [testLoc]
		};
	});
	const searchAPI = await GeoAPI.get('');
	expect(searchAPI('sheares hall', 1).result).toEqual([testLoc]);
});


