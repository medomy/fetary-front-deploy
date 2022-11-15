import React from 'react'
import { useSelector } from 'react-redux';
import Time from '../../utils/date_format/date_format';
import styles from './dash_card.module.css'
function DashCard({iconPath , info , infoType , color}) {
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const style = {backgroundColor:color};
  return (
    <div className={`${styles.dash_card}`} style={style}>
        <div className={styles.dash_card_up}>
            <div className={styles.info_card}>
                {iconPath === 'bi bi-currency-pound' ? <i className={`${iconPath}`}></i> : null}
                <span>{info}</span>
                <div className={styles.info_type}>
                    {infoType}
                </div>
            </div>
        </div>
        <div className={`${styles.dash_card_down}`}>
        <i className="bi bi-clock"></i>
        <span> {Time.getexactTime(new Date)}</span>
        </div>
    </div>
  )
}

export default DashCard