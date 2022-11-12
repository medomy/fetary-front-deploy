import { addorderedItem } from "../../../../services/ordered_items";
import { addOrder } from "../../../../services/orders"

export async function confirmClientsOrder(orderData , items){
    try{
        const createdOrder = await addOrder({...orderData});
        const OrderedItems = items.map((item)=> {
           return {oId : createdOrder.insertId , item_id: item.id , price: item.price , count:item.count}
        });
        OrderedItems.forEach(async (item)=>{
            await addorderedItem(item);
        })
    }catch(err){
        throw new Error(`can not add order , error is ${err}`)
    }
}