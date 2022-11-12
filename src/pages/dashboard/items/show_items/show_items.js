import React, { useState , useEffect, useCallback } from 'react'
import { getAllItems } from '../../../../services/items';
import EntitiesTable from '../../../../components/entities_table/entities_table';
import styles from './show_items.module.css'
import { useTranslation } from 'react-i18next';
function ShowItems() {
    const [cols,setCols] = useState([])
    const [windowWidth , setWindowWidth] = useState(window.innerWidth);
    const [items,setItems] = useState([]);
    const [flag,setFlag] = useState('items');
    const changeCols = ()=>{
        if(windowWidth >= 720) {
            setCols([{
                name : 'id',
                col_md: 1,
                col_sm: 1,
                col_xs:1,
        
            },
            {
                name : 'name_en',
                col_md: 2,
                col_sm: 2,
                col_xs:2,
                
            },
            {
                name : 'name_ar',
                col_md: 2,
                col_sm: 2,
                col_xs:2,
                
            },
            {
                name : 'img',
                col_md: 1,
                col_sm: 1,
                col_xs:1,
                
            },
            {
                name : 'restaurant',
                col_md: 2,
                col_sm: 2,
                col_xs:2,
                
            },
            {
                name : 'price',
                col_md: 2,
                col_sm: 2,
                col_xs:2,
                
            },
            {
                name : 'edit',
                col_md: 1,
                col_sm: 1,
                col_xs:1,
                
            },
            {
                name : 'delete',
                col_md: 1,
                col_sm: 1,
                col_xs:1,
                
            }])
        }
        else {
            setCols([{
                name : 'id',
                col_md: 1,
                col_sm: 1,
                col_xs:1,
        
            },
            {
                name : 'name_en',
                col_md: 2,
                col_sm: 3,
                col_xs:3,
                
            },
            {
                name : 'img',
                col_md: 1,
                col_sm: 2,
                col_xs:2,
                
            },
            {
                name : 'restaurant',
                col_md: 2,
                col_sm: 2,
                col_xs:2,
                
            },
            {
                name : 'edit',
                col_md: 1,
                col_sm: 2,
                col_xs:2,
                
            },
            {
                name : 'delete',
                col_md: 1,
                col_sm: 2,
                col_xs:2,
                
            }])
        }
    }
    const changeWidth = useCallback(()=>{
        setWindowWidth(window.innerWidth);
    },[window.innerWidth])
    const getData =async ()=>{
        try{
            const items = await getAllItems();
            setItems(items);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getData();
        window.addEventListener('resize' , changeWidth);
        return ()=> window.removeEventListener('resize' , changeWidth);
    },[]);
    useEffect(()=>{
        changeCols();
    },[windowWidth])
  return (
    <section className='container-fluid'>
        <div className='row'>
            <div className={`${styles.pageSec}`}>
                <EntitiesTable columns={cols} obs={items} flag={flag}/>
            </div>
        </div>
    </section>
  )
}

export default ShowItems