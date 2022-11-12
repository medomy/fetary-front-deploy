import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useAuthGuard from '../../../../guards/auth-guard/auth-guard';
import AuthGuard from '../../../../guards/auth-guard/auth-guard';
import useLogOut from '../../../../hooks/useLogOut';
import { setUser } from '../../../../store/reducers/user_slice/user_slice';
import { getOrdersOneUser } from '../../../../services/orders';
import { getAllorderedItems } from '../../../../services/ordered_items';
import BreadCrumbs from '../../components/breadCrumbs/breadCrumbs'
import DashboardProfile from '../../components/dashboard_section/dashboard_section';
import ProfilePicsSec from '../../components/images_sec/profile_pics'
import OrdersSec from '../../components/orders_section/orders_sec';
import ProfileSideBar from '../../components/sidebar/profile_sidebar'
import UserDataProfile from '../../components/userData_sec/userData';
import { getAllItems } from '../../../../services/items';

function ProfilePage() {
    const [pageName, setPageName] = useState('dashboard');
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    useAuthGuard(isLoggedIn, '/');
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const logOut = useLogOut();
    const changePage = (name) => {
        if (name === 'log out') {
            logOut();
        }
        setPageName(name)
    };
    const [orders, setOrders] = useState([]);
    const [lastOrderedItems , setLastOrderedItems] = useState([]);
    const params = useParams()
    const getData = async () => {
        try {
            const _orders = await getOrdersOneUser(params.id);
            const orderedItems = await getAllorderedItems(_orders[_orders.length -1].id);
            const allItems = await getAllItems();
            let usersItems = [];
            orderedItems.forEach((oItem)=>{
                const item = allItems.find((_item)=> _item.id === oItem.item_id);
                if(item) usersItems.push(item);
            })
            console.log(orderedItems);
            setLastOrderedItems(usersItems);
            setOrders(_orders);
        } catch (err) {
            console.log(err);
            alert('error in getting your orders')
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <section className='container-fluid'>
            <BreadCrumbs name={'profile'} />
            <ProfilePicsSec />
            <div className='row justify-content-center mb-5 mt-5'>
                <div className='col-md-8 col-12'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <ProfileSideBar changePage={changePage} />
                        </div>
                        <div className='col-md-8'>
                            {pageName === 'dashboard' ? <DashboardProfile numOfOrders={orders.length}/> : pageName === 'orders' ? <OrdersSec orderedItems={lastOrderedItems}/> : pageName === 'account details' ? <UserDataProfile /> : null}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfilePage