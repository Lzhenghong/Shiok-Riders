import {useEffect, useState} from 'react';
import {requestForegroundPermissionsAsync, watchPositionAsync, Accuracy} from 'expo-location';
//import '../components/FakeLocations';

export default (callback) => {
    const [err, setErr] = useState(null);
    const startWatching = async () => {
        try {
            const {granted} = await requestForegroundPermissionsAsync();
            if (!granted) {
                throw new Error('Location tracking permission not granted');
            }
            await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
            },
            location => {
                //console.log(location);
                callback(location);
            });
        } catch (e) {
            setErr(e);
        }
    };

    useEffect(() => {
        startWatching();
    }, []);

    return err;
}