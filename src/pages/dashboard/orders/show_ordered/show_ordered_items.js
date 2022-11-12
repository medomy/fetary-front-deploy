import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OrderedItemRow from '../../../../components/ordered_item_row/ordered_item_row';
import { getAllorderedItems } from '../../../../services/ordered_items';
import { getOneOrder, updateOrder } from '../../../../services/orders';
import { getOneuser } from '../../../../services/users';
import styles from './show_ordered_items.module.css'
function ShowOrderedItems() {
    const [user, setUser] = useState({});
    const [order, setOrder] = useState({});
    const [orderedItems, setOrderedItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [paid,setPaid] = useState(false);
    const [confirmed,setConfirmed] = useState(false);
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const {t} = useTranslation();
    const params = useParams();
    const getData = async () => {
        try {
            const _order = await getOneOrder(params.id);
            setOrder(_order);
            const _user = await getOneuser(_order.uId);
            setUser(_user);
            const _orderedItems = await getAllorderedItems(params.id);
            setOrderedItems(_orderedItems)
            console.log(_orderedItems);
            const _total = _orderedItems.reduce((a, b) => a + b.price * b.count, 0);
            setTotal(_total);
            setPaid(_order.is_payed === 0 ? false : true);
        } catch (err) {
            console.log(err);
        }
    }
    const confirmPayment =async ()=>{
        try{
            await updateOrder(order.id , {
                payed : true
            });
            setPaid(true);
            const newOrder = await getOneOrder(params.id);
            setOrder(newOrder);
        }catch(err){
            console.log(err);
        }
    }
    const confirmOrder = async ()=>{
        try{
            await updateOrder(order.id , {
                payed : order.is_payed,
                items_price : total
            });
            setConfirmed(true);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className={`${styles.ordered_items_page} mt-5`}>
            <div className='row justify-content-center text-center'>
                <h1 className={`logo_admin ${isDark ? 'icons-dark':''}`}>Fetary</h1>
            </div>
            <div className='row justify-content-between mb-5 mt-5'>
                <div className={`${styles.ordered_info} col-md-5 col-5`}>
                    <h4 className={`${styles.ordered_label} text-center ${isDark ? 'dark-mode-txt':''}`}>{t("User")} : {user.user_name}</h4>
                </div>
                <div className={`${styles.ordered_info} col-md-5 col-5`}>
                    <h4 className={`${styles.ordered_label} text-center ${isDark ? 'dark-mode-txt':''}`}>{t("time_ordered")} : {order.time}</h4>
                </div>
            </div>
            <div className='row justify-content-center'>
                <div className={`${styles.orders_recipt} col-12`}>
                    {orderedItems.map((item) => {
                        return (
                            <OrderedItemRow o_item={item} key={item.id} />
                        )
                    })}
                </div>
            </div>
            <div className='mt-4 row justify-content-between'>
                <div className='col-md-5 col-12 text-center'><h6 >{t("Total")} : {total}</h6></div>
                <div className='col-md-5 col-12 text-center'><h6>{t("Dilevery")} : </h6></div>
            </div>
            <div className='mt-4 row justify-content-between'>
                <div className='col-5 text-center'>
                    <button type="button" class="btn btn-secondary" disabled={confirmed} onClick={confirmOrder}>{t("confirm_order")}</button>
                </div>
                <div className='col-5 text-center'>
                    <button type="button" class="btn btn-success" disabled={paid} onClick={confirmPayment}>{t("confirm_payment")}</button>
                </div>
            </div>
        </div>
    )
}

export default ShowOrderedItems