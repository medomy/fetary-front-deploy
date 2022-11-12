import React, { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import ReceiptElement from '../../../../features/checkout/components/receipt_element/receipt_element';
import { collectAllOrders } from '../../../../services/orders';
import { getAllRestaurants } from '../../../../services/restaurants';
import Time from '../../../../utils/date_format/date_format';
import ItemsTotalRow from '../item_total_row/item_total_row';
import styles from './show_total_orders.module.css';
function ShowTotalOrders() {
    const [restaurant, setRestaurant] = useState(null);
    const [date, setDate] = useState(new Date());
    const [restaurants, setRestaurants] = useState([]);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const isDark = useSelector((state) => state.theme.isDarkMode);
    const lang = useSelector((state) => state.lang.lang);
    const { t } = useTranslation();
    const getData = async () => {
        try {
            const _restaurants = await getAllRestaurants();
            setRestaurants(_restaurants);
            const _items = await collectAllOrders(Time.getExactdate(date), restaurant);
            const _total = _items.reduce((a, b) => a + b.count * b.price, 0)
            setTotal(_total)
            setItems(_items);
        } catch (err) {
            setItems([]);
            console.log(err);
        }
    }
    useEffect(() => {
        getData();
    }, [restaurant, date]);
    return (
        <div className='container-fluid'>
            <div className='row justify-content-between align-items-center'>
                <div className='col-md-3 col-8'>
                    <label htmlFor="chooseRestaurant" className={`form-label ${isDark ? 'dark-mode-txt' : ''}`}>{t("choose_a_restaurant")}</label>
                    <select defaultValue={1} className={`form-select form-select`} aria-label="Default select example" id='chooseRestaurant' onChange={(e) => setRestaurant(e.target.value)}>
                        <option value={null}>all restaurants</option>
                        {restaurants.map((restaurant) => {
                            return (
                                <option key={restaurant.id} value={restaurant.id}>{lang === 'ar' ? restaurant.name_ar : restaurant.name_en}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='col-md-3 col-8'>
                    <div>
                        <label htmlFor="datePicker" className={`form-label ${isDark ? 'dark-mode-txt' : ''}`}>pick a date</label>
                    </div>
                    <DatePicker value={date} onChange={setDate} className={isDark ? 'dark-mode-txt':''}/>
                </div>
            </div>
            <div className='row justify-content-center my-5'>
                <div className='col-md-6 col-10'>
                    <div className={`${styles.items_wrapper}`}>
                        <h4 className='mb-3'>All items ordered</h4>
                        {items.length === 0 ? <p className='mx-4 my-4'>{t('no_items_match_current_search')}</p> : null}
                        {items.map((item) => <ItemsTotalRow key={item.id} element={item} />)}
                        <div className='row justify-content-center'>
                            <span className={styles.line_div}>
                            </span>
                            <h6 className='text-center'>Total : {total}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowTotalOrders