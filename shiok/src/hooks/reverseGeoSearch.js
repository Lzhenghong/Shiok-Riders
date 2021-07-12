import GeoAPI from '../api/GeoAPI';

const access_key = '816681ab0b49d0f2a6b999f51654fb33';

const reverseGeoSearch = async (lat, long) => {
    try {
        const response = await GeoAPI.get(`/reverse?access_key=${access_key}&query=${lat},${long}&limit=1&country=SG`); 
        return {error: false, result: response.data.data[0]};
    } catch (err) {
        return {error: true, result: 'Could not get current location'};
    }
};

export default reverseGeoSearch;