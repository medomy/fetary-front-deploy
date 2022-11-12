import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getOneItem } from '../../services/items';
import styles from './ordered_item_row.module.css'
function OrderedItemRow({o_item}) {
    const [item,setItem] = useState({});
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const getData = async ()=>{
        const _item = await getOneItem(o_item.item_id);
        setItem(_item);
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <div className='row justify-content-center mt-4'>
        <div className={`${styles.ordered_item_name_row} ${isDark ? 'dark-mode-txt':''} col-3 text-center`}>
            <p>{`${o_item.count} X ${item.name_en}`}</p>
        </div>
        <div className={`${styles.ordered_item_price_row} ${isDark ? 'dark-mode-txt':''} col-3 text-center`}>
            <p>{o_item.price}</p>
        </div>
    </div>
  )
}

export default OrderedItemRow