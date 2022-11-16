import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { addItems, checkRestaurantsItems } from '../../../../store/reducers/added_items/added_items';
import styles from './details_side.module.css'
function DetailsSide({ item }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const lang = useSelector((state)=> state.lang.lang);
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const addToCart = (item) => {
        if (isLoggedIn) {
            dispatch(addItems(item));
            dispatch(checkRestaurantsItems());
        }
        else alert("you are not registered yet");
    }
    return (
        <section className={`${styles.details_side}`}>
            <div className='row justify-content-center mb-3'>
                <h2 className={`${isDark ? 'dark-mode-txt':''}`}>{lang === 'ar' ? item.name_ar : item.name_en}</h2>
            </div>
            <div className='row justify-content-between mb-3'>
                <div className='col-md-5'>
                    <span className={`${styles.price_space}`}>
                        <i className="bi bi-currency-pound me-1"></i>
                        <span>{item.price}</span>
                    </span>
                </div>
                <div className='col-md-5 d-flex justify-content-end'>
                    <i className={`bi bi-heart ${styles.heart_icon} ${isDark ? 'dark-mode-txt':''}`}></i>
                </div>
            </div>
            <div className={styles.description_part}>
                <p className={`${isDark ? 'dark-mode-txt':''}`}>{lang === 'ar' ? item.description_ar : item.description_en}</p>
            </div>
            <div className={`${styles.counter_div} mt-4`}>
                <span className={styles.counter_btn}>
                    <i className="bi bi-plus"></i>
                </span>
                <span className={styles.counter}>1</span>
                <span className={styles.counter_btn}>
                    <i className="bi bi-dash"></i>
                </span>
            </div>
            <button className={`my-3 ${styles.add_cart_btn}`} onClick={() => addToCart(item)}>
                {t("Add_to_cart")}
            </button>
        </section>
    )
}

export default DetailsSide