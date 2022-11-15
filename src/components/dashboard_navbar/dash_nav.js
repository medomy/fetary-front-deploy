import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { changeIsDark } from '../../store/reducers/dark_mode/dark_mode_slice';
import i18next from 'i18next';
import { setLang } from '../../store/reducers/lang_slice/lang_slice';
import styles from './dash_nav.module.css'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import "bootstrap/js/src/collapse.js";
export const DashboardNavbar = () => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.lang.lang);
    const isDark = useSelector((state) => state.theme.isDarkMode);
    const mode = useSelector((state) => state.theme.mode);
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
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { t } = useTranslation();
    const entities = [{
        name: t('restaurants'),
        icon: 'bi bi-cup-hot-fill',
    },
    {
        name: t('orders'),
        icon: 'bi bi-cart-check-fill'
    },
    {
        name: t('users'),
        icon: 'bi bi-person-fill'
    },
    {
        name: t('companies'),
        icon: 'bi bi-building'
    },
    ];
    const selectLang = (code) => {
        dispatch(setLang(code));
        i18next.changeLanguage(code);
    }
    const changeMode = (e) => {
        dispatch(changeIsDark(e.target.checked));
        localStorage.setItem("theme", e.target.checked);
    }
    useEffect(() => {
        // setEntities([{
        //     name: 'restaurants',
        //     icon: 'bi bi-cup-hot-fill',
        // },
        // {
        //     name: 'orders',
        //     icon: 'bi bi-cart-check-fill'
        // },
        // {
        //     name: 'users',
        //     icon: 'bi bi-person-fill'
        // },
        // {
        //     name: 'companies',
        //     icon: 'bi bi-building'
        // },
        // ])
    }, [])
    // useEffect(()=>{
    //     if(!user) {
    //         user = JSON.parse(sessionStorage.getItem('user'));
    //     }
    //     console.log(user);
    // },[user])
    return (
        <>
            {/* <nav className={`navbar navbar-expand-lg ${isDark ? 'navbar-dark' : 'navbar-light'} ${isDark ? 'bg-dark' : 'bg-light'}`}>
                <div className="container-fluid">
                    <Link className={`${styles.home_link} mx-4`} to='/'>
                        <h2 className={`logo_admin text-center ms-4`}>Fetary</h2>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 col-md-6 justify-content-center">
                            <li className="nav-item ms-4">
                                <Link className="nav-link active" aria-current="page" to={'/admin'}>{t("Home")}</Link>
                            </li>
                            {entities.map((entity) => {
                                return (
                                    <li className="nav-item mx-1" key={entity.name}>
                                        <Link className="nav-link active" aria-current="page" to={`/admin/${entity.name}`}>{entity.name}</Link>
                                    </li>
                                )
                            })}
                            <div className={`${styles.lngs_btns_wrapper} mx-4 d-flex justify-content-center align-items-center`}>
                                {langs.map((lang) => (
                                    <span className={`${styles.change_lang_btn} ${isDark ? 'dark-mode-links' : ''} ${isDark && language === lang.code ? 'dark-mode-links-active' : !isDark && language === lang.code ? styles.active_lang_btn : ''}`} key={lang.id} onClick={() => selectLang(lang.code)}>{lang.lang}</span>
                                ))}
                            </div>
                            <li className="nav-item mx-1">
                                <Link className="nav-link active" aria-current="page" to={`/profile/${user.uId}`}>
                                    {user.user_name}
                                </Link>
                            </li>
                            <li className='nav-item mx-1'>
                                <div className="form-check form-switch mx-2">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isDark} onChange={changeMode} />
                                    <label className={`form-check-label ${isDark? 'dark-mode-txt':''}`} htmlFor="flexSwitchCheckDefault">{mode}</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> */}
            <Navbar bg={isDark ? 'dark' : 'light'} expand="lg">
                <Container>
                    <Link className={`${styles.home_link} mx-4`} to='/'>
                        <h2 className={`logo_admin text-center ms-4`}>Fetary</h2>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to={'/admin'}>Home</NavLink>
                            {entities.map((entity) => {
                                return (
                                    <li className="nav-item mx-1" key={entity.name}>
                                        <Link className="nav-link active" aria-current="page" to={`/admin/${entity.name}`}>{entity.name}</Link>
                                    </li>
                                )
                            })}
                            <div className={`${styles.lngs_btns_wrapper} mx-4 d-flex justify-content-center align-items-center`}>
                                {langs.map((lang) => (
                                    <span className={`${styles.change_lang_btn} ${isDark ? 'dark-mode-links' : ''} ${isDark && language === lang.code ? 'dark-mode-links-active' : !isDark && language === lang.code ? styles.active_lang_btn : ''}`} key={lang.id} onClick={() => selectLang(lang.code)}>{lang.lang}</span>
                                ))}
                            </div>
                            <li className="nav-item mx-1">
                                <Link className="nav-link active" aria-current="page" to={`/profile/${user.uId}`}>
                                    {user.user_name}
                                </Link>
                            </li>
                            <li className='nav-item mx-1'>
                                <div className="form-check form-switch mx-2">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isDark} onChange={changeMode} />
                                    <label className={`form-check-label ${isDark ? 'dark-mode-txt' : ''}`} htmlFor="flexSwitchCheckDefault">{mode}</label>
                                </div>
                            </li>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
