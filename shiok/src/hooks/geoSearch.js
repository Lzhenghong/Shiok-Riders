import GeoAPI from '../api/GeoAPI';

const access_key = '816681ab0b49d0f2a6b999f51654fb33';

const geoSearch = async (searchTerm, limit) => {
    try {
        const response = await GeoAPI.get(`/forward?access_key=${access_key}&query=${searchTerm}&limit=${limit}&country=SG`); 
        return {error: false, result: response.data.data};
    } catch (err) {
        return {error: true, result: 'Could not load locations'};
    }
};

export default geoSearch;
 