import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import useQuery from '../../../../hooks/useQuery';
import { getAllRestaurants } from '../../../../services/restaurants';
import styles from './order_sidebar.module.css'
function OrderSidebar({getRestaurantId}) {
    const [restaurants, setRestaurants] = useState([]);
    const {t}= useTranslation();
    const lang = useSelector((state)=> state.lang.lang);
    const navigate = useNavigate();
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const query = useQuery();
    let searchedRestaurant = query.get('rest');
    const changeRestaurant = (id)=>{
        getRestaurantId(id);
        navigate(`/order?rest=${id}`);
        searchedRestaurant = query.get('rest');
        console.log(searchedRestaurant == 5);
        }
    const onInit = async () => {
        const _restaurants = await getAllRestaurants();
        setRestaurants(_restaurants);
    }
    useEffect(() => {
        onInit();
    }, [])
    return (
        <div className={`${styles.order_sidebar}`}>
            <h4>{t("Restaurants")}</h4>
            <div className={`${styles.btns_wrap} mb-4`}>
                {restaurants.map((restaurant) => {
                    return (
                        <span className={`${styles.restaurant_btn} ${searchedRestaurant== restaurant.id ? styles.active_restaurant_btn : ''} ${isDark? 'dark-mode-links':''} mt-1`} key={restaurant.id} onClick={()=> changeRestaurant(restaurant.id)}>
                            {lang === 'ar' ? restaurant.name_ar : restaurant.name_en}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

export default OrderSidebar