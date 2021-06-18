import {useState} from 'react';
import GeoAPI from '../api/GeoAPI';

const access_key = '816681ab0b49d0f2a6b999f51654fb33';

export default () => {
    const [results, setResults] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const searchAPI = async (lat, long) => {
        try {
            const response = await GeoAPI.get(`/reverse?access_key=${access_key}&query=${lat},${long}&limit=1&country=SG`); 
            setResults(response.data.data[0]);
        } catch (err) {
            setErrorMsg('Could not get current location');
        }
    };
    return {searchAPI, results, errorMsg};
};