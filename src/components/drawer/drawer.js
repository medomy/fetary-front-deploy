import React from 'react'
import styles from './drawer.module.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react';
import Drawer from 'react-modern-drawer';
import { changeIsDark } from '../../store/reducers/dark_mode/dark_mode_slice';
import 'react-modern-drawer/dist/index.css'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function CustomDrawer({ isShowed, links, header, hideDrawer }) {
    const [show, setShow] = useState(isShowed);
    const { t } = useTranslation();
    const isDark = useSelector((state) => state.theme.isDarkMode);
    const mode = useSelector((state) => state.theme.mode);
    const lang = useSelector((state)=> state.lang.lang);
    const dispatch = useDispatch();
    const changeMode = (e) => {
        dispatch(changeIsDark(e.target.checked));
        console.log(e.target.checked);
    }
    useEffect(() => {
        setShow(isShowed);
    }, [isShowed])
    const toggleDrawer = () => {
        setShow(false);
        hideDrawer(false);
    }
    return (
        <Drawer
            open={show}
            direction={lang =='ar' ?'right' : 'left'}
            onClose={toggleDrawer}
            size={'50vw'}
            className={`${isDark ? 'bg-dark dark-mode-links' : ''}`}>
            <div className={styles.header}>
                <h2 className={`logo_admin ${isDark ? 'icons-dark' : ''}`}>Fetary</h2>
                <h3>{header}</h3>
                <div className="form-check form-switch mx-2">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={changeMode} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{mode}</label>
                </div>
            </div>
            <div className={styles.links_wrap}>
                {links.map((link) => {
                    return (<div key={link.id} className={`${styles.bottom_link_wrap}`}>
                        <NavLink to={link.to} className={({ isActive }) => {
                            const linkClasses = [styles.bottom_link];
                            if (isActive && !isDark) linkClasses.push(styles.bottom_navbar_active);
                            if (isDark) {
                                linkClasses.push('dark-mode-links');
                                if (isActive) {
                                    linkClasses.push('dark-mode-links-active');
                                }
                            }
                            return linkClasses.join(" ");
                        }}>{link.name}</NavLink>
                    </div>
                    )
                })}
            </div>
        </Drawer>
    )
}

export default CustomDrawer