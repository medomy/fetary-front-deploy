import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TopNavBar from '../../../components/top_navbar/top_navbar'
import MiddleNavBAr from '../../../components/middle_navbar/middle_navbar'
import BottomNavBar from '../../../components/bottom_navbar/bottom_navbar'
import HomePage from '../../../features/home'
import SignInPage from '../../../features/authentication'
import RegisterationPage from '../../../features/authentication/pages/registiration_page/registeration_page'
import Footer from '../../../features/home/components/footer/footer'
import ProfilePage from '../../../features/profile/pages/profile_page/profile_page'
import OrdersPage from '../../../features/order/pages/orders_page/orders_page'
import DetailsPage from '../../../features/details/pages/details_page/details_page'
import CartPage from '../../../features/cart/pages/cart_page/cart_page'
import ReceiptPage from '../../../features/checkout/pages/receipt_page/receipt_page'
import Restaurants_page from '../../../features/restaurants/pages/restaurants_page/restaurants_page'
import AboutPage from '../../../features/about/pages/about'
function ClientModule() {
    return (
        <div>
            <TopNavBar />
            <MiddleNavBAr />
            <BottomNavBar />
            <Routes>
                <Route element={<HomePage />} path='/' />
                <Route element={<SignInPage />} path='/sign-in' />
                <Route element={<RegisterationPage />} path='/register' />
                <Route element={<ProfilePage />} path='/profile/:id' />
                <Route element={<OrdersPage />} path='/order' />
                <Route element={<DetailsPage />} path='/details/:id' />
                <Route element={<CartPage />} path='/cart' />
                <Route element={<ReceiptPage />} path='/checkout' />
                <Route element={<Restaurants_page />} path='/restaurants' />
                <Route element={<AboutPage />} path='/about' />
            </Routes>
            <Footer />
        </div>
    )
}

export default ClientModule