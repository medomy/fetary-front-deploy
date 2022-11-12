import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Mychart from '../chart/chart'
import styles from './statistic_card.module.css'
function StatisticCard({header , flag , info}) {
  const isDark = useSelector((state)=> state.theme.isDarkMode);
  const {t} = useTranslation();
  return (
    <div className={`${styles.statistic_card} ${isDark ? 'bg-dark':''}`}>
        <div className={styles.statistic_card_header}>
            <p>{header}</p>
        </div>
        <div className={`${styles.statistic_card_subject} ${isDark ? 'dark-mode-txt':''}`}>
            {flag === "items" ? <div className={styles.items_subject}>
              <p>{t("We_have")}</p>
              <h2>{info}</h2>
              <p>{t("items")}</p>
            </div> : flag === "ordered_items" ? <div className={styles.items_subject}>
              <p>{t("you_have_ordered")}</p>
              <h2>{info}</h2>
              <p>{t("items_singular")}</p>
            </div> : flag === "most_ordered_item" ? <div className={styles.items_subject}>
              <p>{t("the_item_you_have_ordered_most")}</p>
              <h2>{info}</h2>
            </div> : <Mychart />}
        </div>
    </div>
  )
}
export default StatisticCard