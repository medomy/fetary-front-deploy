import { decodeToken } from 'react-jwt';
import { adduser } from '../../../services/users';

export async function registerNewUser(_user){
    try{
        const registeration  = await adduser(_user);
        if(registeration) {
           const user = decodeToken(registeration);
           sessionStorage.setItem('user' , JSON.stringify(user.user));
           return user.user;
        }
    }catch(err){
        throw new Error(`can not add user , ${err}`)
    }
}