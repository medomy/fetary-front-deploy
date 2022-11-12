import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import styles from './info_component.module.css'
function InfoComponent() {
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const {t} =useTranslation();
    const infos =[
        {
            iconClass :'bi bi-star',
            title:t('top_rank_restaurants'),
            subTitle:t("top_rank_restaurants_sub")
        },
        {
            iconClass :'bi bi-patch-check-fill',
            title:t('Chosen_restaurants'),
            subTitle:t("Chosen_restaurants_sub")
        },
        {
            iconClass :'bi bi-lightning',
            title:t('near_restaurants'),
            subTitle:t("near_restaurants_sub")
        },
        {
            iconClass :'bi bi-check2-all',
            title:t('boost_your_day'),
            subTitle:t("boost_your_day_sub")
        },
    ]
  return (
    <section className={`mt-4 container-fluid ${styles.info_sec} ${isDark ? 'bg-dark' : ''}`}>
        <div className={`row justify-content-center my-3  ${styles.infos_wrap}`}>
            {infos.map((info)=>{
                return(
                    <div className={`${styles.info_card} col-md-2 col-6`} key={info.iconClass}>
                        <i className={`${styles.info_icon} ${info.iconClass} ${isDark ? 'icons-dark':''}`}></i>
                        <h4 className={`${isDark ? 'dark-mode-txt' : ''}`}>{info.title}</h4>
                        <p className={`${styles.info_subTitle} ${isDark ? 'dark-mode-txt' : ''}`}>{info.subTitle}</p>
                    </div>
                )
            })}

        </div>
    </section>
  )
}

export default InfoComponent