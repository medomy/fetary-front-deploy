import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'
import ItemCard from '../../../../components/item_card/item_card';
import styles from './orders_sec.module.css'
function OrdersSec({ orderedItems }) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const goToOrders = () => {
        navigate('/order')
    }
    return (
        <>
            <h3 className='text-center'>Last Order : </h3>
            {orderedItems.length > 0 ? <div className='row justify-content-between mb-4'>
                {orderedItems.map((item)=>(
                    <div className='col-md-4 col-8' key={item.id}>
                        <ItemCard item={item}/>
                    </div>
                ))}
            </div> : <h5 className='text-center'>none</h5>}
            <div className='row justify-content-center'>
                <div className='col-md-5 col-12'>
                    <button className={`${styles.order_btn} w-100`} onClick={goToOrders}>{t("make_an_order")}</button>
                </div>
            </div>
        </>
    )
}

export default OrdersSec