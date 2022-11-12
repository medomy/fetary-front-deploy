import React, { useEffect, useState } from 'react'
import { getAllCompanies } from '../../services/companies';
import { getAllItems } from '../../services/items';
import { getAllRestaurants } from '../../services/restaurants';
import { deleteRestaurant } from '../../services/restaurants';
import { removeItem } from '../../services/items';
import { removecompany } from '../../services/companies';
import TableRow from '../table_body_row/table_body_row'
import styles from './entities_table.module.css'
import { getAllOrders, removeOrder } from '../../services/orders';
import { getAllusers, removeuser } from '../../services/users';
function EntitiesTable({ columns, obs, flag, deletedOrNot }) {
    console.log(columns);
    console.log(obs);
    console.log(flag);
    const [tableObs , setTableObs] = useState([]);
    const [windowWidth , setWindowWidth] = useState(window.innerWidth);
    const changeWidth = ()=>{
        setWindowWidth(window.innerWidth);
    }
    async function handleDelete(id  ){
        console.log(id);
        if( flag=== 'restaurants'){
            await deleteRestaurant(id);
            const _rests = await getAllRestaurants();
            setTableObs(_rests);
            deletedOrNot(true);
        }
        else if( flag=== 'items'){
            await removeItem(id);
            const _items = await getAllItems();
            setTableObs(_items);
        }
        else if( flag=== 'companies'){
            await removecompany(id);
            const _comps = await getAllCompanies();
            setTableObs(_comps);
            deletedOrNot(true);
        }
        else if( flag=== 'orders') {
            await removeOrder(id);
            const _orders = await getAllOrders();
            setTableObs(_orders);
            deletedOrNot(true);
        }
        else if(flag=== 'users') {
            await removeuser(id);
            const _users = await getAllusers();
            setTableObs(_users);
            deletedOrNot(true);
        }
    }
    useEffect(()=>{
        window.addEventListener('resize' , changeWidth);
        console.log(windowWidth);
        return ()=> window.removeEventListener('resize' , changeWidth);
    },[windowWidth])
    return (
        <div className={`${styles.entities_table} col-12 col-sm-12 mt-4 mb-4`}>
            <div className={`${styles.table_head} row justify-content-center`}>
                {columns.map((column) => {
                    return (<div className={`${styles.table_head_cell} text-center col-md-${column.col_md} col-sm-${column.col_sm} col-${column.col_xs}`} key={column.name}>
                        <p>{column.name}</p>
                    </div>)
                })}
            </div>
            <div className={`${styles.table_body}`}>
                {tableObs.length !==0 ?tableObs.map((ob)=>{
                    return(<TableRow ob={ob} flag={flag} key={ob.id} windowWidth={windowWidth} handleDelete = {(id , isChecked)=> handleDelete(id , isChecked)}/>)
                }) :obs.map((ob) => {
                    return(<TableRow ob={ob} flag={flag} key={ob.id} windowWidth={windowWidth} handleDelete = {(id , isChecked)=> handleDelete(id , isChecked)}/>)
                })}
            </div>

        </div>
    )
}

export default EntitiesTable