import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import DashCard from '../../../components/dash_card/dash_card';
import LoadingPage from '../../../components/loading_page/loading_page';
import StatisticCard from '../../../components/statistic_card/statistic_card';
import { getAllItems } from '../../../services/items';
import { getAllOrders } from '../../../services/orders';
import { getAllusers } from '../../../services/users';
import styles from './first_dash.module.css'
export default function FirstDash() {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [noOfItems , setNoOfItems] = useState(0);
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const {t} = useTranslation();
    const getData = async () => {
        try {
            setIsLoading(true);
            const orders = await getAllOrders();
            const users = await getAllusers();
            const items = await getAllItems();
            const total = orders.reduce((a, b) => a + b.items_price, 0);
            setNoOfItems(items.length);
            setCards([
                {
                    id: 1,
                    info: `${orders.length}`,
                    infoType: t('orders'),
                    color: '#FEA47E',
                    iconPath: 'bi bi-cart-check-fill'
                },
                {
                    id: 2,
                    info: `${users.length}`,
                    infoType: t('users'),
                    color: '#0BD68F',
                    iconPath: 'bi bi-person-fill'
                },
                {
                    id: 3,
                    info: `${total}`,
                    infoType: t('total_spent'),
                    color: '#01B9BD',
                    iconPath: 'bi bi-currency-pound'
                },
            ])
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.log(err);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            {!isLoading ? <section className={`${styles.first_dash} ${isDark ? 'bg-dark':''}`}>
                <section className={`${styles.card_sec} row px-5 py-5`}>
                    {cards.map((card, i) => {
                        return (
                            <div className='col-md-3 col-sm-6' key={card.id}>
                                <DashCard color={card.color} iconPath={card.iconPath} info={card.info} infoType={card.infoType}  />
                            </div>
                        )
                    })}
                </section>
                <section className={`${styles.statistic_sec} row px-5 py-5`}>
                    <div className='col-md-8 col-sm-12'>
                        <StatisticCard header={t('orders_statistics')} />
                    </div>
                    <div className='col-md-4 col-sm-12'>
                        <StatisticCard header={t('items')} flag={"items"} info={noOfItems}/>
                    </div>
                </section>
            </section> : <div className={styles.full_page}><LoadingPage/></div>}

        </>
    )
}
