import React from 'react'
import CartBreadCrumps from '../../components/cart_breadcrumps/cart_breadcrumps'
import CartSec from '../../components/cart_sec/cart_sec'
import CartHeader from '../../components/header/cart_header'
import styles from './cart_page.module.css'
function CartPage() {
  return (
    <section className={`${styles.cart_page} container-fluid`}>
            <div className='row justify-content-center mt-2 mb-4'>
                <div className='col-md-10 col-12'>
                    <CartBreadCrumps />
                    <CartHeader />
                    <div className='row'>
                        <CartSec />
                    </div>
                </div>
            </div>
        </section>
  )
}

export default CartPage