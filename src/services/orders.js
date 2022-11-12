import { public_instance } from "../network/instance";
import { getItemsOneRestaurant } from "./items";
import { getAllorderedItems, getOrderedItemsBunchOfOrders } from "./ordered_items";
const url = '/orders';

export async function getAllOrders() {
    try {
        const orders = await public_instance.get(url);
        return orders.data;
    } catch (err) {
        throw new Error(`can't get all orders , ${err}`)
    }
}

export async function getOneOrder(id) {
    try {
        const order = await public_instance.get(`${url}/${id}`)
        return order.data;
    } catch (err) {
        throw new Error(`can't get order , ${err}`)
    }
}

export async function addOrder(data) {
    try {
        const res = await public_instance.post(url, data);
        return res.data;
    } catch (err) {
        throw new Error(`can't post order , ${err}`)
    }
}

export async function updateOrder(id, data) {
    try {
        await public_instance.put(`${url}/${id}`, data);
    } catch (err) {
        throw new Error(`can't update order , ${err}`)
    }

}

export async function removeOrder(id) {
    try {
        await public_instance.delete(`${url}/${id}`);
    } catch (err) {
        throw new Error(`can't remove order , ${err}`)
    }
}

export async function getStats() {
    try {
        const _url = 'orderstats';
        const stats = await public_instance.get(_url);
        return stats.data
    } catch (err) {
        throw new Error(`can't get stats orders , ${err}`)
    }
}
export async function getOrdersOneUser(uId){
    try {
        const _url = 'ordersOneUser';
        const stats = await public_instance.get(_url,{
            params:{
                uId
            }
        });
        return stats.data
    } catch (err) {
        throw new Error(`can't get stats orders , ${err}`)
    }
}
export async function collectAllOrders(date, rest_id) {
    try {
        const _url = `ordersOneRestaurant`;
        const stats = await public_instance.get(_url, {
            params: {
                date,
                rest_id
            }
        });
        const allOrdersItems = await getOrderedItemsBunchOfOrders({orders : stats.data.map((order)=> order.id)});
        console.log(allOrdersItems);
        console.log(stats.data);
        // stats.data.forEach(async (order)=>{
        //     const orderedItems = await getAllorderedItems(order.id);
        //     allOrdersItems.push(...orderedItems);
        // })
        let collectionItems = [];
        const allItems = await getItemsOneRestaurant(rest_id);
        allItems.forEach((_item)=>{
            const itemsFilter = allOrdersItems.filter((item)=> item.item_id === _item.id);
            if(itemsFilter.length > 1){
                for(let i =1 ; i < itemsFilter.length ; i++) {
                    itemsFilter[0].count += itemsFilter[i].count;
                }
                collectionItems.push(itemsFilter[0]);
            }
            else if(itemsFilter.length === 1) collectionItems.push(itemsFilter[0]);
        })
        // allOrdersItems.forEach((item)=>{
        //     const items = allOrdersItems.filter((_item)=> _item.item_id === item.item_id);
        //     console.log(items);
        //     if(items.length > 1){
        //         for(let i = 1 ; i < items.length ; i++){
        //             items[0].count += items[i].count;
        //         }
        //         collectionItems.push(items[0]);
        //     }
        //     else if(items.length === 1) collectionItems.push(items[0]);
        // })
        // console.log(collectionItems);
        return collectionItems;
    } catch (err) {
        throw new Error(`can't get stats orders , ${err}`)
    }
}