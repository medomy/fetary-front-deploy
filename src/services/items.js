import { public_instance } from "../network/instance";
const url = '/items';

export async function getAllItems(){
    try{
        const items =await public_instance.get(url);
        return items.data;
    }catch(err){
        throw new Error(`can't get all items , ${err}`)
    }
}
export async function getItemsOneRestaurant(rest_id){
    try{
        const items = await public_instance.get(`/restaurantitems?restaurant=${rest_id}`);
        return items.data;
    }catch(err){
        throw new Error(`can't get all items in restaurant, ${err}`)
    }
}
export async function getOneItem(id){
    try{
        const item = await public_instance.get(`${url}/${id}`)
        return item.data;
    }catch(err){
        throw new Error(`can't get item , ${err}`)
    }
}

export async function addItem(data){
    try{
        await public_instance.post(url,data)
    }catch(err){
        throw new Error(`can't post item , ${err}`)
    }
}

export async function updateItem(id,data){
    try{
        await public_instance.put(`${url}/${id}` , data);
    }catch(err){
        throw new Error(`can't update item , ${err}`)
    }

}

export async function removeItem(id){
    try{
        await public_instance.delete(`${url}/${id}`);
    }catch(err){
        throw new Error(`can't remove item , ${err}`)
    }
}