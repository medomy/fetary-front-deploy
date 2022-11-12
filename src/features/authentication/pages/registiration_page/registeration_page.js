import React from 'react'
import RegisterationForm from '../../components/registeration_form/registeration_form'
import styles from './registeration_page.module.css'
function RegisterationPage() {
  return (
    <section className={`container-fluid ${styles.registeration_page}`}>
      <div className='row justify-content-center align-items-center'>
        <div className='col-md-6 col-sm-10 col-12'>
          <RegisterationForm />
        </div>
      </div>
    </section>
  )
}

export default RegisterationPage