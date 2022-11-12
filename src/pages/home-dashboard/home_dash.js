import React from 'react'
import { DashboardNavbar } from '../../components/dashboard_navbar/dash_nav'
import SideBar from '../../components/side_bar/side_bar'
import FirstDash from '../dashboard/first_dash/first_dash'
import styles from './home_dash.module.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowRestaurants from '../dashboard/restaurants/show_restaurants/show_restaurants';
import AddRestaurant from '../dashboard/restaurants/add_restaurant/add_restaurant'
import EditRestaurant from '../dashboard/restaurants/edit_restaurant/edit_restaurant'
import ShowItems from '../dashboard/items/show_items/show_items'
import AddItem from '../dashboard/items/add_items/add_items'
import EditItems from '../dashboard/items/edit_items/edit_items'
import ShowCompanies from '../dashboard/companies/show_companies/show_companies'
import AddCompanies from '../dashboard/companies/add_companies/add_companies'
import EditCompany from '../dashboard/companies/edit_companies/edit_company'
import ShowOrders from '../dashboard/orders/show_orders/show_orders'
import ShowOrderedItems from '../dashboard/orders/show_ordered/show_ordered_items'
import ShowUsers from '../dashboard/users/show_users/show_users'
import MenuPage from '../dashboard/restaurants/menu_page/menu_page'
import ShowTotalOrders from '../dashboard/orders/show_total_orders/show_total_orders'
export const HomeDash = () => {
  return (

    <section className='container-fluid'>
      <div className={`row ${styles.admin_side}`}>
        <DashboardNavbar />
        <div className={`row justify-content-center ${styles.right_side}`}>
          <Routes>
            <Route element={<FirstDash />} path='/' />
            <Route element={<ShowRestaurants />} path='/restaurants' />
            <Route element={<AddRestaurant />} path='/restaurants/add' />
            <Route element={<EditRestaurant />} path='/restaurants/edit/:id' />
            <Route element={<ShowItems />} path='/items' />
            <Route element={<AddItem />} path='/items/add' />
            <Route element={<EditItems />} path='/items/edit/:id' />
            <Route element={<ShowCompanies />} path='/companies' />
            <Route element={<AddCompanies />} path='/companies/add' />
            <Route element={<EditCompany />} path='/companies/edit/:id' />
            <Route element={<ShowOrders />} path='/orders' />
            <Route element={<ShowTotalOrders />} path='/orders/totalOrders' />
            <Route element={<ShowOrderedItems />} path='/orders/details/:id' />
            <Route element={<ShowUsers />} path='/users' />
            <Route element={<MenuPage />} path='/restaurants/menu/:id' />
          </Routes>
        </div>
      </div>
    </section>
  )
}
