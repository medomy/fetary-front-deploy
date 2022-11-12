import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import DatePicker from 'react-date-picker';
import { getAllOrders } from '../../../../services/orders';
import EntitiesTable from '../../../../components/entities_table/entities_table';
import styles from './show_orders.module.css'
import { getAllusers } from '../../../../services/users';
import { getAllRestaurants } from '../../../../services/restaurants';
import { useTranslation } from 'react-i18next';
import Time from '../../../../utils/date_format/date_format';
import filterOrders from '../../../../utils/filter_orders/filter_orders';
import { useNavigate } from 'react-router-dom';
import Toast from '../../../../components/toast/toast';
function ShowOrders() {
    const [cols, setCols] = useState([
        {
            name: 'id',
            col_md: 1,
            col_sm: 1,
            col_xs: 1,
        },
        {
            name: 'user',
            col_md: 2,
            col_sm: 2,
            col_xs: 2,

        },
        {
            name: 'total',
            col_md: 2,
            col_sm: 2,
            col_xs: 2,

        },
        {
            name: 'details',
            col_md: 2,
            col_sm: 2,
            col_xs: 2,

        },
        {
            name: 'date',
            col_md: 3,
            col_sm: 3,
            col_xs: 3,

        },
        {
            name: 'paid',
            col_md: 1,
            col_sm: 1,
            col_xs: 1,

        },
        {
            name: 'delete',
            col_md: 1,
            col_sm: 1,
            col_xs: 1,

        }
    ])
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [removed,setRemoved] = useState(false);
    const [flag, setFlag] = useState('orders');
    const [user, setUser] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();
    const lang = useSelector((state) => state.lang.lang)
    const isDark = useSelector((state) => state.theme.isDarkMode);
    const userRef = useRef();
    const restRef = useRef();
    const { t } = useTranslation()
    const changeCols = () => {
        if (window.innerWidth >= 720) {
            setCols([{
                name: 'id',
                col_md: 1,
                col_sm: 1,
                col_xs: 1,
            },
            {
                name: 'user',
                col_md: 2,
                col_sm: 2,
                col_xs: 2,

            },
            {
                name: 'total',
                col_md: 2,
                col_sm: 2,
                col_xs: 2,

            },
            {
                name: 'details',
                col_md: 2,
                col_sm: 2,
                col_xs: 2,

            },
            {
                name: 'date',
                col_md: 3,
                col_sm: 3,
                col_xs: 3,

            },
            {
                name: 'paid',
                col_md: 1,
                col_sm: 1,
                col_xs: 1,

            },
            {
                name: 'delete',
                col_md: 1,
                col_sm: 1,
                col_xs: 1,

            }])
        }
        else {
            setCols([{
                name: 'id',
                col_md: 1,
                col_sm: 1,
                col_xs: 1,
            },
            {
                name: 'user',
                col_md: 2,
                col_sm: 2,
                col_xs: 2,

            },
            {
                name: 'details',
                col_md: 2,
                col_sm: 2,
                col_xs: 2,

            },
            {
                name: 'date',
                col_md: 3,
                col_sm: 3,
                col_xs: 3,

            },
            {
                name: 'paid',
                col_md: 1,
                col_sm: 2,
                col_xs: 2,

            },
            {
                name: 'delete',
                col_md: 1,
                col_sm: 2,
                col_xs: 2,

            }])
        }
    }
    const getData = async () => {
        try {
            const _orders = await getAllOrders();
            const _users = await getAllusers();
            const _restaurants = await getAllRestaurants();
            setOrders(filterOrders(_orders , {date : Time.getExactdate(date) , rest_id : restaurant , uId : user}));
            setUsers(_users);
            setRestaurants(_restaurants);
        } catch (err) {
            console.log(err);
        }
    }
    const submit = (e) => {
        e.preventDefault();
    }
    const showTotalOrders = ()=>{
        navigate('totalOrders');
    }
    const removedOrder = (isRemoved)=>{
        if(isRemoved) setRemoved(isRemoved);
        setTimeout(()=>{
            setRemoved(false);
        },3000)
    }
    useEffect(() => {
        getData();
        window.addEventListener('resize', changeCols);
        return () => window.removeEventListener('resize', changeCols);
    }, [user, restaurant, date])

    return (
        <section className='container-fluid'>
            <form className='row my-4 px-5 align-items-center justify-content-center' onSubmit={submit}>
                <div className='col-md-3 col-8'>
                    <label htmlFor="chooseUser" className={`form-label ${isDark ? 'dark-mode-txt' : ''}`}>{t("choose_a_user")}</label>
                    <select defaultValue={1} className={`form-select form-select`} aria-label="Default select example" id='chooseUser' ref={userRef} onChange={(e) => setUser(e.target.value)}>
                        <option value={null}>all users</option>
                        {users.map((user) => {
                            return (
                                <option key={user.uId} value={user.uId}>{user.user_name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='col-md-3 col-8'>
                    <label htmlFor="chooseRestaurant" className={`form-label ${isDark ? 'dark-mode-txt' : ''}`}>{t("choose_a_restaurant")}</label>
                    <select defaultValue={1} className={`form-select form-select`} aria-label="Default select example" id='chooseRestaurant' ref={restRef} onChange={(e) => setRestaurant(e.target.value)}>
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
                    <DatePicker value={date} onChange={setDate} />
                </div>
            </form>
            <div className='row'>
                <div className={`${styles.pageSec}`}>
                    <EntitiesTable columns={cols} obs={orders} flag={flag} deletedOrNot={removedOrder}/>
                </div>
            </div>
            <div className='row my-4 justify-content-center'>
                <div className='col-md-4'>
                    <button className='btn btn-success w-100' onClick={showTotalOrders}>Show total orders per day</button>
                </div>
            </div>
            {removed ?<div className='toast_wrap'>
                <Toast messege={'deleted successfully'}/>
            </div> : null}
        </section>
    )
}

export default ShowOrders