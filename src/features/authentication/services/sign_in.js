import { decodeToken } from 'react-jwt';
import { public_instance } from '../../../network/instance';

export async function signIn(email, password , checked) {
    try {
        const userToken = await public_instance.post('/auth', { email, password });
        console.log(userToken);
        console.log(userToken.data);
        if (userToken.data !== null) {
            const user = decodeToken(userToken.data);
            console.log(user);
            sessionStorage.setItem('user' , JSON.stringify(user.user));
            if(checked) localStorage.setItem('user' , JSON.stringify(user.user));
            return user.user;
        }
        return userToken.data;
    } catch (err) {
        throw new Error(`error signing : ${err}`)
    }
}