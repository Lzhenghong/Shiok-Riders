import {useEffect, useState} from 'react';
import {requestForegroundPermissionsAsync, watchPositionAsync, Accuracy} from 'expo-location';

export default (callback) => {
    const [err, setErr] = useState(null);
    const startWatching = async () => {
        try {
            const {granted} = await requestForegroundPermissionsAsync();
            await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
            },
            location => {
                console.log(location);
                callback(location);
            });
            if (!granted) {
                throw new Error('Location tracking permission not granted');
            }
        } catch (e) {
            setErr(e);
        }
    };

    useEffect(() => {
        startWatching();
    }, []);

    return err;
}
