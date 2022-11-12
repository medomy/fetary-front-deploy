import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { decreamentItem, increamentItem, removeItems } from '../../../../store/reducers/added_items/added_items';
import styles from './cart_item.module.css'
function CartItem({ item }) {
    const [totalPrice, setTotalPrice] = useState(0);
    const lang = useSelector((state)=> state.lang.lang);
    const dispatch = useDispatch();
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const increament = () => {
        dispatch(increamentItem(item));
    }
    const decreament = () => {
        dispatch(decreamentItem(item));
    }
    const removeElement = () => {
        dispatch(removeItems(item));
    }
    useEffect(() => {
        setTotalPrice((prev) => item.count * item.price);
    }, [item.count])
    return (
        <div className={`row ${styles.cart_row} justify-content-center align-items-center`}>
            <div className={`col-md-2 ${isDark ? 'dark-mode-txt':''}`}>
                <p>{lang === 'ar' ? item.name_ar: item.name_en} </p>
            </div>
            <div className='col-md-1'>
                <img className={styles.cart_img} src={item.img_url} />
            </div>
            <div className={`col-md-4 d-flex justify-content-center ${isDark ? 'dark-mode-txt':''}`}>
                <span className={styles.counter_btn} onClick={increament}>
                    <i className="bi bi-plus"></i>
                </span>
                <span className={`${styles.counter} mx-3`}>{item.count}</span>
                <span className={styles.counter_btn} onClick={decreament}>
                    <i className="bi bi-dash"></i>
                </span>
            </div>
            <div className={`col-md-3 ${isDark? 'dark-mode-txt':''}`}>
                <span className='mx-1'>
                    <i className="bi bi-currency-pound"></i>
                </span>
                <span>{totalPrice}</span>
            </div>
            <div className={'col-md-2 d-flex justify-content-center'}>
                <span className={`${styles.delete_btn} ${isDark ? 'dark-mode-txt':''} btn`} onClick={removeElement}>
                    <i className={`bi bi-trash3-fill`}></i>
                </span>
            </div>
        </div>
    )
}

export default CartItem