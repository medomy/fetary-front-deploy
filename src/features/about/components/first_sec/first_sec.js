import React from 'react'
import styles from './first_sec.module.css'
import first_about from '../../../../assets/images/first_about.jpg'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
function AboutFirstSec() {
  const isDark = useSelector((state)=> state.theme.isDarkMode);
  const {t} =useTranslation();
  return (
    <div className='row justify-content-between my-3'>
        <div className='col-md-6 col-10'>
            <img className={`${styles.about_img} ${isDark ? 'box-shadow-dark' : ''}`} alt='about-pic' src={first_about}/>
        </div>
        <div className='col-md-6 col-10 mt-3'>
            <h2 className={`${styles.about_title} ${isDark ? 'dark-mode-txt' : ''}`}>{t("Who_we_are")}</h2>
            <p className={`my-2 ${isDark ? 'dark-mode-txt' : ''}`}>{t("Who_we_are_sub")}</p>
        </div>
    </div>
  )
}

export default AboutFirstSec