export default function filterOrders(orders,{date,rest_id,uId}){
    console.log(orders , date , rest_id , uId);
    if(uId == 'all users') uId = null;
    if(rest_id == 'all restaurants') rest_id = null;
    console.log(uId);
    if(date && rest_id && uId) {
        return orders.filter((order)=> order.date === date && order.restaurant_id === Number(rest_id) && order.uId === Number(uId));
    }
    else if(date && rest_id) return orders.filter((order)=> order.date === date && order.restaurant_id === Number(rest_id));
    else if(rest_id && uId) return orders.filter((order)=> order.restaurant_id === Number(rest_id) && order.uId === Number(uId));
    else if(date && uId) return orders.filter((order)=> order.date === date && order.uId === Number(uId));
    else if(date && typeof(date) === 'string') return orders.filter((order)=> order.date === date);
    else if(rest_id) return orders.filter((order)=> order.restaurant_id === Number(rest_id));
    else if(uId) return orders.filter((order)=> order.uId === Number(uId));
    else return orders;
}