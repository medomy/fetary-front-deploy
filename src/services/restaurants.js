import { public_instance } from "../network/instance";
const url = '/restaurants';

export async function getAllRestaurants(){
    try{
        const restaurants = await public_instance.get(url);
        return restaurants.data;
    }catch(err){
        throw new Error(`can not get all restaurants , ${err}`);
    }

}

export async function getOneRestaurants(id){
    try{
        const restaurant = await public_instance.get(`${url}/${id}`);
        return restaurant.data;
    }catch(err){
        throw new Error(`can not get restaurant , ${err}`);

    }
}

export async function addRestaurant(restaurant){
    try{
        await public_instance.post(url,restaurant);
    }catch(err){
        throw new Error(`can not add restaurant , ${err}`);
    }
}

export async function updateRestaurant(id,data){
    try{
        await public_instance.put(`${url}/${id}`,data);
    }catch(err){
        throw new Error(`can not update restaurant , ${err}`);
    }
}

export async function deleteRestaurant(id){
 try{
    await public_instance.delete(`${url}/${id}`);

 }catch(err){
    throw new Error(`can not delete restaurant , ${err}`)
 } 
}