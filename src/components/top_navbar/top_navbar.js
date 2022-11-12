import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLang } from '../../store/reducers/lang_slice/lang_slice';
import i18next from 'i18next';
import styles from './top_navbar.module.css'
function TopNavBar() {
    const [langs, setLangs] = useState([
        {
            id: 1,
            lang: 'english',
            code: 'en',
            country: 'gb'
        },
        {
            id: 2,
            lang: 'العربية',
            code: 'ar',
            country: 'sa'
        }
    ]);
    const { t } = useTranslation();
    const language = useSelector((state) => state.lang.lang);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(language);
    }, [language])
    const selectLang = (code) => {
        dispatch(setLang(code));
        i18next.changeLanguage(code);
    }
    return (
        <div className='conatiner-fluid'>
            <nav className={`row justify-content-between ${styles.top_navbar}`}>
                <div className={`col-md-3 col-6 d-flex justify-content-start ${styles.first_sec}`}>
                    <p>{t("welcome")}</p>
                </div>
                <div className='col-md-3 col-6 d-flex justify-content-center dropdown'>
                    {langs.map((lang)=>(
                        <span className={`${styles.change_lang_btn} ${language === lang.code ? styles.active_lang_btn : ''}`} key={lang.id} onClick={()=>selectLang(lang.code)}>{lang.lang}</span>
                    ))}
                </div>
                <div className={`col-md-4 col-12 d-flex justify-content-center ${styles.socend_sec}`}>
                    <Link to={'#'} className={styles.navLink}>{t("order_tracking")}</Link>
                    <Link to={'#'} className={styles.navLink}>{t("my_wishList")}</Link>
                    <Link to={'#'} className={styles.navLink}>{t("preview_orders")}</Link>
                </div>
            </nav>
        </div>
    )
}

export default TopNavBar