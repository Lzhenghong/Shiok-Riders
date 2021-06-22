import {useState} from 'react';
import GeoAPI from '../api/GeoAPI';

const access_key = '816681ab0b49d0f2a6b999f51654fb33';

export default () => {
    const [results, setResults] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const searchAPI = async (searchTerm, limit) => {
        try {
            const response = await GeoAPI.get(`/forward?access_key=${access_key}&query=${searchTerm}&limit=${limit}&country=SG`); 
            setResults(response.data.data);
        } catch (err) {
            setErrorMsg('Could not load locations');
        }
    };
    return {searchAPI, results, errorMsg};
};