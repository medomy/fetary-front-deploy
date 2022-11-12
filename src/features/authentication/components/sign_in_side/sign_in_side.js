import React from 'react'
import { useSelector } from 'react-redux'
import SignInForm from '../sign_in_form/sign_in_form'
import styles from './sign_in_side.module.css'
function SignInSide() {
  const isDark = useSelector((state)=> state.theme.isDarkMode);
  return (
    <div className={`${styles.sign_in_side} ${isDark ? 'bg-dark':''}`}>
        <div>
            <h1 className={`logo_admin ${styles.sign_logo} ${isDark? 'icons-dark':''} mt-4`}>Fetary</h1>
        </div>
        <div className={styles.form_area}>
            <SignInForm />
        </div>
    </div>
  )
}

export default SignInSide