import React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ItemsOrdersSide from '../../components/items_orders_side/items_orders'
import OrderBreadCrumbs from '../../components/order_breadcrumbs/orderBreadCrumbs'
import OrderSidebar from '../../components/order_sidebar/order_sidebar'
import styles from './orders_page.module.css'
function OrdersPage() {
    const [restId , setRestId] = useState(null);
    const {t} = useTranslation();
    const changeRestaurant = (rest_id) => {
        setRestId(rest_id);
    }
    return (
        <div className={`container-fluid ${styles.orders_page}`}>
            <div className='row justify-content-center mt-2 mb-4'>
                <div className='col-md-10 col-12'>
                    <OrderBreadCrumbs />
                    <div className='row mt-2 mb-2'>
                        <h2>{t("Orders")}</h2>
                    </div>
                    <div className='row'>
                        <div className='col-md-3'>
                            <OrderSidebar getRestaurantId={changeRestaurant} />
                        </div>
                        <div className='col-md-9'>
                            <ItemsOrdersSide restaurantId={restId}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersPage