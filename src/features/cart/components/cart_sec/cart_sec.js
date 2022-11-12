import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../cart_item/cart_item';
import styles from './cart_sec.module.css'
function CartSec() {
  const [total,setTotal] = useState(0);
  const addedItems = useSelector((state) => state.cart.addedItems);
  const isDark = useSelector((state)=> state.theme.isDarkMode);
  const {t} = useTranslation();
  const navigate = useNavigate(); 
  const calcTotal = ()=>{
    let _total = 0;
    addedItems.forEach((item)=>{
      _total += item.count * item.price;
    })
    setTotal(_total);
  }
  const checkOut = ()=>{
    navigate('/checkout');
  }
  useEffect(()=>{
    //setTotal(()=>addedItems.reduce((a,b)=> a+ b.count * b.price),0);
    calcTotal();
  },[addedItems])
  return (
    <section className={styles.cart_sec}>
      <div className={`${styles.cart_div} ${isDark ? 'bg-dark box-shadow-dark':''}`}>
        {addedItems.length === 0 ? <h3 className={`${isDark? 'dark-mode-txt':''}`}>{t("No_Items_yet")}</h3> : <div>
          {addedItems.map((item) => {
            return (
              <CartItem item={item} key={item.id} />
            )
          })}
        </div>}
      </div>
      <div className='row justify-content-center mt-5 mb-3'>
        <div className={`col-md-5 col-10 ${styles.total_wrap} ${isDark? 'icons-dark':''}`}>
          <span>{t("Total")} : </span>
          <span><i className="bi bi-currency-pound"></i></span>
          <span>{total}</span>
        </div>
      </div>
      <div className='row justify-content-center mt-5 mb-3'>
        <div className='col-md-5 col-10'>
          <button className={styles.checkout_btn} onClick={checkOut}>
            {t("check_out")}
          </button>
        </div>
      </div>
    </section>
  )
}

export default CartSec