import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import styles from './bottom_navbar.module.css';
function BottomNavBar() {
    const { t } = useTranslation();
    const isDark = useSelector((state) => state.theme.isDarkMode);
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
    ]
    // const [links, setLinks] = useState([
    //     {
    //         id: 1,
    //         name: t('Home'),
    //         to: '/'
    //     },
    //     {
    //         id: 2,
    //         name: t('about'),
    //         to: '/about'
    //     },
    //     {
    //         id: 3,
    //         name: t('place_an_order'),
    //         to: '/order',
    //     },
    //     {
    //         id: 4,
    //         name: t('restaurants'),
    //         to: '/restaurants'
    //     },
    // ]);
    // useEffect(() => {
    //     setLinks([
    //         {
    //             id: 1,
    //             name: t('Home'),
    //             to: '/'
    //         },
    //         {
    //             id: 2,
    //             name: t('about'),
    //             to: '/about'
    //         },
    //         {
    //             id: 3,
    //             name: t('place_an_order'),
    //             to: '/order',
    //         },
    //         {
    //             id: 4,
    //             name: t('restaurants'),
    //             to: '/restaurants'
    //         },
    //     ])
    // }, [])
    return (
        <div className='container-fluid'>
            <div className={`row justify-content-center ${styles.bottom_navbar} ${isDark ? 'bg-dark' : ''}`}>
                {links.map((link) => {
                    return (<div key={link.id} className={`col-md-2 d-flex justify-content-center ${styles.bottom_link_wrap}`}>
                        <NavLink to={link.to} className={({ isActive }) => {
                            const linkClasses = [styles.bottom_link, isDark ? 'dark-mode-links' : ''];
                            if (isActive) {
                                if (isDark) linkClasses.push('dark-mode-links-active');
                                else linkClasses.push(styles.bottom_navbar_active);

                            }
                            return linkClasses.join(" ");
                        }}>{link.name}</NavLink>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BottomNavBar