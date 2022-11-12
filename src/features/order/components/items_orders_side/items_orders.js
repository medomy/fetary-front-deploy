import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ItemCard from '../../../../components/item_card/item_card';
import useQuery from '../../../../hooks/useQuery';
import { getAllItems , getItemsOneRestaurant } from '../../../../services/items';
import styles from './items_orders.module.css'
function ItemsOrdersSide({restaurantId}) {
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const [items,setItems] = useState([]);
    const query = useQuery();
    const {t} = useTranslation();
    const searchRestaurant = query.get('rest');
    const getItems =async ()=>{
        if(restaurantId === null){
            if(searchRestaurant){
                const _items = await getItemsOneRestaurant(searchRestaurant);
                setItems(_items);
            }
            const _items =await getAllItems();
            setItems(_items);
        }
        else {
            const _items =await getItemsOneRestaurant(restaurantId);
            setItems(_items);
        }
    }
    useEffect(()=>{
        getItems();
    },[restaurantId])
  return (
    <section className={styles.items_side}>
        <div className='row justify-content-between mb-2'>
            <h5 className={isDark ? 'dark-mode-txt' : ''}>{t("Showing")} {items.length} {t("of")} {items.length}</h5>
            <form onSubmit={(e)=> e.preventDefault()}>
                <input className={styles.search_input} placeholder="search here"/>
            </form>
        </div>
        <div className='row mt-4'>
            {items.map((item)=>{
                return(
                    <div className='col-md-3 col-6' key={item.id}>
                        <ItemCard item={item}/>
                    </div>
                )
            })}
        </div>
    </section>
  )
}

export default ItemsOrdersSide