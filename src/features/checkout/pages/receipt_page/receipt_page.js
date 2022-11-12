import React from 'react'
import CheckOutBreadCrumps from '../../components/breadCrumps/checkout_breadcrumps'
import Receipt from '../../components/recipet/recipet'
import styles from './receipt_page.module.css'
function ReceiptPage() {
    return (
        <section className={`${styles.cart_page} container-fluid`}>
            <div className='row justify-content-center mt-2 mb-4'>
                <div className='col-md-10 col-12'>
                    <CheckOutBreadCrumps />
                    <div className='row justify-content-center'>
                        <div className='col-md-6 col-12'>
                            <Receipt />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReceiptPage