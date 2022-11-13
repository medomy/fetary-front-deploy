import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOneRestaurants } from '../../services/restaurants';
import { addItems, checkRestaurantsItems } from '../../store/reducers/added_items/added_items';
import styles from './item_card.module.css'
function ItemCard({ item }) {
    const [restaurant, setRestaurant] = useState({});
    const dispatch = useDispatch();
    const addedItems = useSelector((state) => state.cart.addedItems);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const isDark = useSelector((state) => state.theme.isDarkMode);
    const { t } = useTranslation();
    const lang = useSelector((state) => state.lang.lang);
    const onInit = async () => {
        if (item) {
            console.log(item);
            const _restaurant = await getOneRestaurants(item.restaurant_id);
            setRestaurant(_restaurant);
        }
    }
    const addToCart = (item) => {
        if (isLoggedIn) {
            dispatch(addItems(item));
            dispatch(checkRestaurantsItems());
        }
        else {
            alert('you must register first');
        }
    }
    useEffect(() => {
        onInit();
    }, [])
    return (
        <div className={`${styles.item_card} ${isDark ? 'bg-dark' : ''}`}>
            {item ? <Link to={`/details/${item.id}`} className={styles.details_link}>
                <div className={styles.img_wrapper}>
                    <img className={styles.item_img} src={item ? item.img_url : "https://el3.thembaydev.com/greenmart_fresh/wp-content/uploads/2021/08/product-02-291x291.jpg"} alt='item_image' />
                    <div className={styles.item_Card_Adds}>
                        <div className={`${styles.btn_wrap} ${isDark ? 'icons-dark' : ''}`}>
                            <i className="bi bi-heart"></i>
                            <span>{t('favourites')}</span>
                        </div>
                        <div className={styles.btn_wrap}>
                            <i className="bi bi-eye"></i>
                            <span>{t('overView')}</span>
                        </div>
                    </div>
                </div>
            </Link> : <div className={styles.img_wrapper}>
                <img className={styles.item_img} src={item ? item.img_url : "https://el3.thembaydev.com/greenmart_fresh/wp-content/uploads/2021/08/product-02-291x291.jpg"} alt='item_image' />
                <div className={styles.item_Card_Adds}>
                    <div className={`${styles.btn_wrap} ${isDark ? 'icons-dark' : ''}`}>
                        <i className="bi bi-heart"></i>
                        <span>{t('favourites')}</span>
                    </div>
                    <div className={styles.btn_wrap}>
                        <i className="bi bi-eye"></i>
                        <span>{t('overView')}</span>
                    </div>
                </div>
            </div>}
            <div className={`${styles.restaurant_Sec} ${isDark ? 'dark-mode-txt' : ''} mt-1 mb-1`}>
                {restaurant && lang === 'ar' ? restaurant.name_ar : restaurant && lang === 'en' ? restaurant.name_en : 'restaurant'}
            </div>
            <p className={`my-2 ${isDark ? 'dark-mode-txt' : ''}`}>{item && lang === 'ar' ? item.name_ar : item.name_en}</p>
            <span className={`${styles.item_price} icons-dark`}>
                <i className="bi bi-currency-pound"></i>
                {item ? item.price : 50.0}
            </span>
            <button className={styles.order_btn} onClick={() => addToCart(item)}>
                {t('Add_to_cart')}
            </button>
        </div>
    )
}

export default ItemCard