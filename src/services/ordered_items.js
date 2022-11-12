import { public_instance } from "../network/instance";
const url = '/orderItems';

export async function getAllorderedItems(o_id){
    try{
        const orderedItems =await public_instance.get(url,{
            params:{
                order_id :o_id
            }
        });
        return orderedItems.data;
    }catch(err){
        throw new Error(`can't get all orderedItems , ${err}`)
    }
}

export async function getOneorderedItem(id){
    try{
        const orderedItem = await public_instance.get(`${url}/${id}`)
        return orderedItem.data;
    }catch(err){
        throw new Error(`can't get orderedItem , ${err}`)
    }
}

export async function addorderedItem(data){
    try{
        await public_instance.post(url,data)
    }catch(err){
        throw new Error(`can't post orderedItem , ${err}`)
    }
}
export async function getOrderedItemsBunchOfOrders({orders}){
    try{
        const res = await public_instance.post(`/orderItemsAll`,{
            orders
        })
        return res.data;
    }catch(err){
        throw new Error(`can't post orderedItem , ${err}`)
    }
}
export async function updateorderedItem(id,data){
    try{
        await public_instance.put(`${url}/${id}` , data);
    }catch(err){
        throw new Error(`can't update orderedItem , ${err}`)
    }

}

export async function removeorderedItem(id){
    try{
        await public_instance.delete(`${url}/${id}`);
    }catch(err){
        throw new Error(`can't remove orderedItem , ${err}`)
    }
}