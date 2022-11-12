import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeIsDark } from '../../store/reducers/dark_mode/dark_mode_slice';
import CustomDrawer from '../drawer/drawer';
import styles from './middle_navbar.module.css';
function MiddleNavBAr() {
    // const [w_width, setWwidth] = useState(window.innerWidth);
    const user = useSelector((state) => state.user.user);
    const isDark = useSelector((state) => state.theme.isDarkMode);
    const mode = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const windowWidth = useRef(window.innerWidth);
    const [showDrawe, setShowDrawer] = useState(false);
    const lang = useSelector((state) => state.lang.lang);
    const { t } = useTranslation();
    const links = [
        {
            id: 1,
            name: t('Home'),
            to: '/'
        },
        {
            id: 2,
            name: t('about'),
            to: '/about'
        },
        {
            id: 3,
            name: t('place_an_order'),
            to: '/order',
        },
        {
            id: 4,
            name: t('restaurants'),
            to: '/restaurants'
        },
        {
            id: 6,
            name: t('login/register'),
            to: '/sign-in'
        },
        {
            id: 7,
            name: t('cart'),
            to: '/cart'
        }
    ];
    const [isSmall, setIsSmall] = useState(false);
    const toggleDrawer = () => {
        setShowDrawer((prev) => !prev);
    }
    const changeWidth = () => {
        windowWidth.current = window.innerWidth;
        // setWwidth(window.innerWidth);
        windowWidth.current <= 720 ? setIsSmall(true) : setIsSmall(false);
        // w_width <=720 ? setIsSmall(true) : setIsSmall(false);
    }
    const changeMode = (e)=>{
        dispatch(changeIsDark(e.target.checked));
        console.log(e.target.checked);
    }
    useEffect(() => {
        console.log(isLoggedIn);
        console.log(user);
    }, [isLoggedIn]);
    useEffect(() => {
        changeWidth();
        window.addEventListener('resize', changeWidth);
        return () => window.removeEventListener('resize', changeWidth);
    }, [])
    return (
        <div className={`container-fluid ${styles.nav_cntainer}`}>
            <div className={`row align-items-center ${styles.sticky_nav} ${isDark ? 'bg-dark dark-mode-txt' :''}`}>
                <div className='col-md-3 col-3 d-flex justify-content-end'>
                    <h2 className={`logo_admin ${isDark ? 'icons-dark':''}`}>Fetary</h2>
                </div>
                <div className={`col-md-3 ${styles.search_form_wrap}`}>
                    <form className={`row ${styles.search_form}`}>
                        <input className={`${lang === "ar" ? styles.search_bar_ar : styles.search_bar}`} type='text' placeholder={t("search_placeHolder")} />
                        <div type='button' className={`${lang === "ar" ? styles.search_btn_ar : styles.search_btn}`}>
                            <span className='btn'>
                                <i className="bi bi-search"></i>
                            </span>
                        </div>
                    </form>
                </div>
                <div className={`col-md-6 col-9 justify-content-start align-items-center d-md-flex d-none`}>
                    <div className={`${styles.info_box} d-flex align-items-center`}>
                        <i className={`bi bi-telephone-fill ${styles.info_icon} mx-2 ${isDark ? 'icons-dark' : ''}`}></i>
                        <div className={`${styles.info}`}>
                            <p className={`${styles.info_header}`}>
                                {t("Contact-US")}
                            </p>
                            <p className={`${styles.info_bottom} ${isDark ? 'dark-mode-links' : ''}`}>
                                Yalla_neftar@haha.com
                            </p>
                        </div>
                    </div>
                    <div className={`${styles.info_box} d-flex align-items-center`}>
                        <i className={`bi bi-person-fill ${styles.info_icon} mx-2 ${isDark ? 'icons-dark' : ''}`}></i>
                        {!isLoggedIn ? <div className={`${styles.info}`}>
                            <p className={`${styles.info_header}`}>
                                {t("Authentication")}
                            </p>
                            <Link to={'/sign-in'} className={`${styles.info_bottom} ${isDark ? 'dark-mode-links' : ''}`}>
                                {t("login/register")}
                            </Link>
                        </div> : <div className={`${styles.info}`}>
                            <p className={`${styles.info_header}`}>
                                {user.user_name}
                            </p>
                            <Link to={`/profile/${user.uId}`} className={`${styles.info_bottom} ${isDark ? 'dark-mode-links' : ''}`}>
                                {t("profile")}
                            </Link>
                        </div>}
                    </div>
                    <Link to={'/cart'} className={`${styles.info_bottom_cart}`}>
                        <div className={`${styles.cart_box} d-flex align-items-center ms-5 px-3 ${isDark ? 'elements-bg-dark' : ''}`}>
                            <i className={`bi bi-cart-fill me-2`}></i>
                            <div className={`${styles.info}`}>
                                <p className={`${styles.info_header}`}>
                                    {t("Orders")}
                                </p>
                                <p>
                                    {t("cart")}
                                </p>
                            </div>
                        </div>
                    </Link>
                    <div className="form-check form-switch mx-2">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isDark} onChange={changeMode}/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{mode}</label>
                    </div>
                </div>
                {
                    isSmall ? <div className='col-9 d-flex justify-content-end'>
                        <div className={`${styles.drawer_btn} ms-5`} onClick={toggleDrawer}>
                            {[1, 2, 3].map((part) => {
                                return (
                                    <div className={styles.drawer_span} key={part}></div>
                                )
                            })}
                        </div>
                    </div> : null
                }
                <CustomDrawer isShowed={showDrawe} links={links} header={t("Where_To")} hideDrawer={(state) => setShowDrawer(state)} />
            </div>
        </div>
    )
}

export default MiddleNavBAr