import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import styles from './profile_sidebar.module.css'
function ProfileSideBar({ changePage }) {
    const user = useSelector((state)=> state.user.user) ?? sessionStorage.getItem('user');
    
    const {t} = useTranslation();
    const navigate = useNavigate();
    let [options , setOPtions] =useState([
        {
            name: t('dashboard'),
            icon: 'bi bi-speedometer',
            active: true
        },
        {
            name: t('orders'),
            icon: 'bi bi-cart',
            active: false
        },
        {
            name: t('account_details'),
            icon: 'bi bi-person',
            active: false
        },
        {
            name: t('log_out'),
            icon: 'bi bi-door-open',
            active: false
        }
    ])
    const goToAdmin = ()=>{
        navigate('/admin');
    }
    const changeOption = (name) => {
        changePage(name);
        if (name === 'dashboard') {
            setOPtions([
                {
                    name: t('dashboard'),
                    icon: 'bi bi-speedometer',
                    active: true
                },
                {
                    name: t('orders'),
                    icon: 'bi bi-cart',
                    active: false
                },
                {
                    name: t('account_details'),
                    icon: 'bi bi-person',
                    active: false
                },
                {
                    name: t('log_out'),
                    icon: 'bi bi-door-open',
                    active: false
                }
            ])
        }
        else if (name === 'orders') {
            setOPtions([
                {
                    name: t('dashboard'),
                    icon: 'bi bi-speedometer',
                    active: false
                },
                {
                    name: t('orders'),
                    icon: 'bi bi-cart',
                    active: true
                },
                {
                    name: t('account_details'),
                    icon: 'bi bi-person',
                    active: false
                },
                {
                    name: t('log_out'),
                    icon: 'bi bi-door-open',
                    active: false
                }
            ])
        }
        else if (name === 'account details') {
            setOPtions([
                {
                    name: t('dashboard'),
                    icon: 'bi bi-speedometer',
                    active: false
                },
                {
                    name: t('orders'),
                    icon: 'bi bi-cart',
                    active: false
                },
                {
                    name: t('account_details'),
                    icon: 'bi bi-person',
                    active: true
                },
                {
                    name: t('log_out'),
                    icon: 'bi bi-door-open',
                    active: false
                }
            ])
        }
    }
    return (
        <div className={styles.profile_sidebar}>
            {options.map((option) => {
                return (
                    <div className={option.active ? styles.sidebar_active_element : styles.sidebar_element} key={option.name} onClick={() => changeOption(option.name)}>
                        <i className={option.icon}></i>
                        <p>{option.name}</p>
                    </div>
                )
            })}
            {user.role === 'admin' ? <div className={styles.sidebar_element} onClick={() => goToAdmin()}>
                <i className='bi bi-person-check-fill'></i>
                <p>{t("admin_area")}</p>
            </div>:null}
        </div>
    )
}

export default ProfileSideBar