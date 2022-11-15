import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './footer.module.css'
function Footer() {
    const {t} = useTranslation()
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const [firstFooterList, setFirstFooterList] = useState([
        {
            title: 'ayhaga@example.com',
            icon: 'bi bi-envelope',
            type: 'email'
        }
    ])
    const socialIcons = useRef([
        {
            id: 'facebook',
            icon: 'bi bi-facebook',
            href: 'www.facebook.com'
        },
        {
            id: 'instagram',
            icon: 'bi bi-instagram',
            href: 'www.instagram.com'
        },
        {
            id: 'linked-in',
            icon: 'bi bi-linkedin',
            href: 'www.linkedin.com'
        },
        {
            id: 'twitter',
            icon: 'bi bi-twitter',
            href: 'www.twitter.com'
        }
    ])
    const aboutLinks = [
        {
            name: t('about'),
            to: '/about'
        },
        {
            name: t('Contact-US'),
            to: '/about'
        },
        {
            name: t('Help_center'),
            to: '/about'
        },
        {
            name: t('FAQ'),
            to: '/about'
        },
    ]
    const termsOfUSeLinks =[
        {
            name: t("terms_of_use"),
            to: '/about'
        },
        {
            name: t("conditions"),
            to: '/about'
        },
        {
            name: t("rules"),
            to: '/about'
        }
    ]
    useEffect(() => {
        setFirstFooterList([
            {
                title: 'ayhaga@example.com',
                icon: 'bi bi-envelope',
                type: 'mailto:'
            },
            {
                title: '00201002304226',
                icon: 'bi bi-telephone',
                type: 'tel:'
            },
            {
                title: 'mohandseen - ActGlobalSoft',
                icon: 'bi bi-house',
                type: 'address'
            }

        ])
    }, [])
    function submit(e){
        e.preventDefault()
    }
    return (
        <footer className={`${styles.footer} ${isDark?'bg-dark':''} container-fluid px-5 py-5`}>
            <div className='row'>
                <div className={`col-md-4 my-4 col-12 ${styles.first_footer_Sec} ${isDark ? 'dark-mode-txt' : ''}`}>
                    <h2 className={`logo_admin ${isDark ? 'icons-dark':''}`}>Fetary</h2>
                    <p>
                        Lorem ipsum dolor sit amet, con sectetur adipiscing elit. Quisque id luctus mauris, eget varius libero. Vestibulum metus leo.
                    </p>
                    <ul className={`${styles.contacts_footer_list}`}>
                        {firstFooterList.map((item) => {
                            return (item.type === "mailto:" || item.type === "tel:" ? <li className={`${styles.first_list_item}`} key={item.type}>
                                <a className={styles.first_list_link} href={`${item.type}${item.title}`}>
                                    <span className={`${styles.footer_contact_icon} ${isDark? 'icons-dark':''}`}>
                                        <i className={item.icon}></i>
                                    </span>
                                    <span className={`${styles.footer_contact_title} ${isDark ? 'dark-mode-links':''}`}>
                                        {item.title}
                                    </span>
                                </a>
                            </li> : <li className={`${styles.first_list_item_flex}`} key={item.type}>
                                <span className={styles.footer_contact_icon}>
                                    <i className={item.icon}></i>
                                </span>
                                <span className={styles.footer_contact_title}>
                                    {item.title}
                                </span>
                            </li>
                            )
                        })}
                    </ul>
                    <div className={`${styles.social_icons_wrap}`}>
                        {socialIcons.current.map((soc) => {
                            return (
                                <div className={styles.soc_wrap} key={soc.id}>
                                    <a className={`${styles.first_list_link} ${isDark? 'dark-mode-links':''}`} href={soc.href}>
                                        <i className={soc.icon}></i>
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                    <p className={styles.copy_write}>© 2022 <strong>Fetary</strong>. All rights reserved.</p>
                </div>
                <div className={`${styles.about_footer_sec} row col-md-4 col-12`}>
                    <div className={`${styles.about_list} col-6`}>
                        <h6 className={`mb-4  ${isDark ? 'dark-mode-txt':''}`}>{t('about')}</h6>
                        <ul className={`${styles.contacts_footer_list}`}>
                            {aboutLinks.map((link) => {
                                return (
                                    <Link className={`${styles.first_list_link}  ${isDark ? 'dark-mode-links':''} my-4`} to={link.to} key={link.name}>{link.name}</Link>
                                )
                            })}
                        </ul>
                    </div>
                    <div className={`${styles.about_list} col-6`}>
                        <h6 className={`mb-4  ${isDark ? 'dark-mode-txt':''}`}>{t('terms_of_use')}</h6>
                        <ul className={`${styles.contacts_footer_list}`}>
                            {termsOfUSeLinks.map((link) => {
                                return (
                                    <Link className={`${styles.first_list_link}  ${isDark ? 'dark-mode-links':''} my-4`} to={link.to} key={link.name}>{link.name}</Link>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className='col-md-3 col-12'>
                    <h6 className={`mb-4  ${isDark ? 'dark-mode-txt':''}`}>{t('terms_of_use')}</h6>
                    <p className={isDark ? 'dark-mode-txt' : ''}>{t('miss_out')}<strong> {t("thousands_of_great_deals")} </strong>{t("promotions")}.</p>
                    <form onSubmit={submit}>
                        <div className='mb2'>
                            <input className={styles.sunscripe_input} type='text' placeholder='write your email'/>
                        </div>
                        <div className='mb2'>
                            <button type='submit' className={`${styles.subscripe_btn} ${isDark ? 'elements-bg-dark':''}`}>{t("Subscripe")}</button>
                        </div>
                    </form>
                </div>
            </div>
        </footer>
    )
}

export default Footer