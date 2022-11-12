import React from 'react'
import styles from './restaurant_card.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import cutText from '../../utils/cut_text';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
function RestaurantCard({ restaurant }) {
    const navigate = useNavigate();
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const goToOrder = ()=>{
        navigate(`/order?rest=${restaurant.id}`);
    };
    const lang = useSelector((state)=> state.lang.lang);
    const {t} = useTranslation();
    useEffect(()=>{
        console.log(restaurant);
    },[])
    return (
        <Link className={`${styles.restaurants_order_link} ${isDark ? 'dark-mode-links':''}`} to={`/order?rest=${restaurant.id}`}>
            <div className={styles.restaurant_card}>
                <div className={styles.rest_img}>
                    <img src={restaurant.logo} alt='restaurant_img' />
                </div>
                <div className={`${styles.restaurant_name_wrap} mt-2`}>
                    <h4 className={styles.restaurant_name}>{lang === "ar" ? restaurant.name_ar:restaurant.name_en}</h4>
                </div>
                <div className={`${styles.restaurant_desc_wrap} mt-2`}>
                    <p className={styles.restaurant_desc}>{cutText(lang ===  'ar'? restaurant.description_ar : restaurant.description_en)}</p>
                </div>
                <div className={`${styles.btn_wrap} my-2`}>
                    <button className={styles.order_btn} onClick={goToOrder}>{t("go_to_orders")}</button>
                </div>
            </div>
        </Link>
    )
}

export default RestaurantCard