import React from 'react'
import styles from './socend_sec.module.css'
import socend_about from '../../../home/assets/images/restaurant_photo.png'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
function AboutSocendSec() {
  const isDark = useSelector((state)=> state.theme.isDarkMode);
  const {t} = useTranslation();
  return (
    <div className='row justify-content-between my-3'>
        <div className='col-md-6 col-10 mt-3'>
            <h2 className={`${styles.about_title} ${isDark? 'dark-mode-txt':''}`}>{t("Why_we")}</h2>
            <p className={`my-2 ${isDark? 'dark-mode-txt':''}`}>{t("Why_we_sub")}</p>
        </div>
        <div className='col-md-6 col-10'>
            <img className={`${styles.about_img} ${isDark? 'box-shadow-dark':''}`} alt='about-pic' src={socend_about}/>
        </div>
    </div>
  )
}

export default AboutSocendSec