import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { addItems, checkRestaurantsItems } from '../../../../store/reducers/added_items/added_items';
import styles from './details_side.module.css'
function DetailsSide({ item }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const addToCart = (item) => {
        if (isLoggedIn) {
            dispatch(addItems(item));
            dispatch(checkRestaurantsItems());
        }
        else alert("you are not registered yet");
    }
    return (
        <section className={styles.details_side}>
            <div className='row justify-content-between mb-3'>
                <div className='col-md-5'>
                    <span className={styles.price_space}>
                        <i className="bi bi-currency-pound me-1"></i>
                        <span>{item.price}</span>
                    </span>
                </div>
                <div className='col-md-5 d-flex justify-content-end'>
                    <i className={`bi bi-heart ${styles.heart_icon}`}></i>
                </div>
            </div>
            <div className={styles.description_part}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisl tortor, lobortis non tortor sit amet, iaculis rhoncus ipsum. Fusce ornare nunc maximus dui molestie.</p>
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