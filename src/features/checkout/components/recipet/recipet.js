import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { confirmClientsOrder } from '../../services/confirm_order/confirm_order';
import ReceiptElement from '../receipt_element/receipt_element';
import styles from './recipet.module.css'
function Receipt() {
    const [totalAll, setTotalAll] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [userMessege, setUserMessege] = useState('');
    const cartItems = useSelector((state) => state.cart.addedItems);
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const notes = useRef();
    const calcTotal = () => {
        let _total = 0;
        cartItems.forEach((item) => {
            _total += item.price * item.count;
        })
        setTotalAll(_total);
    }
    const confirmOrder = async () => {
        if (!isLoggedIn) {
            alert('you shoul sign in first')
            navigate('/sign-in');
        }
        else {
            try {
                setIsLoading(true);
                await confirmClientsOrder({
                    uId: user.uId,
                    notes: notes.current.value ? notes.current.value : "no notes",
                    payed: false,
                    items_price: totalAll,
                    delivery: 0,
                    restaurant_id: cartItems[0].restaurant_id
                }, cartItems);
                setIsLoading(false);
                setUserMessege('ordered successfully');
            } catch (err) {
                console.log(err);
                setUserMessege('ooops order error');
            }
        }
    }
    useEffect(() => {
        calcTotal();
    }, [])
    return (
        <div className={`${styles.receipt_sec} mb-3`}>
            <div className={styles.receipt}>
                <h3 className={`mb-3 ${isDark? 'dark-mode-txt':''}`}>{t("Your_reciept")}</h3>
                {cartItems.map((item) => {
                    return (
                        <ReceiptElement element={item} key={item.id} />
                    )
                })}
                <h4 className={`my-4 ${isDark?'icons-dark':''}`}>{t("Total")} : {totalAll}</h4>
                <form className='my-2'>
                    <div class="mb-1">
                        <label for="notes_area" class={`form-label ${isDark?'dark-mode-txt':''}`}>{t("Notes")} :</label>
                        <textarea ref={notes} class="form-control" id="notes_area" rows="3"></textarea>
                    </div>
                </form>
                <button className={`${styles.confirm_btn} mt-5`} onClick={confirmOrder}>{t("confirm_order")}</button>
                {isLoading ? <div className="spinner-border my-4" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> : null}
                {userMessege == 'ordered successfully' ? <p className='text-success'>{userMessege}</p> :
                    userMessege == 'ooops order error' ? <p className='text-danger'>{userMessege}</p> : null}
            </div>
        </div>
    )
}

export default Receipt