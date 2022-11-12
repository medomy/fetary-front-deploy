export default function filterOrders(orders,{date,rest_id,uId}){
    if(date && rest_id && uId) {
        return orders.filter((order)=> order.date === date && order.restaurant_id === rest_id && order.uId === uId);
    }
    else if(date && rest_id) return orders.filter((order)=> order.date === date && order.restaurant_id === rest_id);
    else if(rest_id && uId) return orders.filter((order)=> order.restaurant_id === rest_id && order.uId === uId);
    else if(date && uId) return orders.filter((order)=> order.date === date && order.uId === uId);
    else if(date && typeof(date) === 'string') return orders.filter((order)=> order.date === date);
    else if(rest_id) return orders.filter((order)=> order.restaurant_id === rest_id);
    else if(uId) return orders.filter((order)=> order.uId === uId);
    else return orders;
}