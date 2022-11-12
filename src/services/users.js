import { public_instance } from "../network/instance";
const url = '/users';

export async function getAllusers(){
    try{
        const users =await public_instance.get(url);
        return users.data;
    }catch(err){
        throw new Error(`can't get all users , ${err}`)
    }
}

export async function getOneuser(id){
    try{
        const user = await public_instance.get(`${url}/${id}`)
        return user.data;
    }catch(err){
        throw new Error(`can't get user , ${err}`)
    }
}

export async function adduser(data){
    try{
       const response =  await public_instance.post(url,data);
       return response.data;
    }catch(err){
        throw new Error(`can't post user , ${err}`)
    }
}

export async function updateuser(id,data){
    try{
        await public_instance.put(`${url}/${id}` , data);
    }catch(err){
        throw new Error(`can't update user , ${err}`)
    }

}

export async function removeuser(id){
    try{
        await public_instance.delete(`${url}/${id}`);
    }catch(err){
        throw new Error(`can't remove user , ${err}`)
    }
}