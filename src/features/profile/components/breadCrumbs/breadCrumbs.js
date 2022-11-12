import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './breadCrumbs.module.css'
function BreadCrumbs({name}) {
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const {t} = useTranslation();
    return (
        <div className='containter-fluid mt-5 mb-3'>
            <div className='row'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className={`breadcrumb-item `}><Link className={`${styles.home_link} ${isDark? 'dark-mode-links':''}`} to={'/'}>{t("Home")}</Link></li>
                        <li className={`breadcrumb-item active ${isDark?'dark-mode-txt':''}`} aria-current="page">{name}</li>
                    </ol>
                </nav>
            </div>
        </div>
    )
}

export default BreadCrumbs