import {useContext} from 'react';
import {Context as ProfContext} from '../context/ProfileContext';
import AuthAPI from '../api/AuthAPI';

const {state, fetchProfile} = useContext(ProfContext);

test('fetch profile', async () => {
    const testProf = {
        username: 'testuser'
    };
    const testResponse = {
        data: testProf
    };
    AuthAPI.get = jest.fn().mockResolvedValue(testResponse);
    await fetchProfile();
    test(state.user).toEqual(testProf);
});