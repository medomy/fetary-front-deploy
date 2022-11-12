import React from 'react'
import SignInSide from '../../components/sign_in_side/sign_in_side'
import SliderSide from '../../components/slider_side/slider_side'
import styles from './sign_in_page.module.css'

function SignInPage() {
  return (
    <section className='container-fluid'>
        <div className='row'>
            <div className={`col-md-4 ${styles.sign_side}`}>
                <SignInSide />
            </div>
            <div className={`col-md-8 ${styles.slider_side}`}>
                <SliderSide />
            </div>
        </div>
    </section>
  )
}

export default SignInPage