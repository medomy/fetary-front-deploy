import React from 'react'
import SignInForm from '../sign_in_form/sign_in_form'
import SliderComponent from '../slider_comp/slider_comp'
import styles from './slider_side.module.css'
function SliderSide() {
  return (
    <section className={`container-fluid ${styles.slider_side} d-flex justify-content-center align-items-center`}>
      <div className={styles.small_screen_form}>
        <div>
          <h1 className={`logo_admin ${styles.sign_logo} text-center`}>Fetary</h1>
        </div>
        <SignInForm />
      </div>
    </section>
  )
}

export default SliderSide