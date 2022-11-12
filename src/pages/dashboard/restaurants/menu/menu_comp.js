import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import styles from './menu_comp.module.css'
import TableRow from '../../../../components/table_body_row/table_body_row';
import { getOneRestaurants } from '../../../../services/restaurants';
function MenuComponent({items , handleDelete , editItemEffect}) {
    const [cols, setCols] = useState([]);
    const [restaurant,setRestaurant] = useState({});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const params = useParams();
    const getData = async () => {
        try {
            const _restaurant = await getOneRestaurants(params.id);
            setRestaurant(_restaurant);
        } catch (err) {
            console.log(err);
        }
    }
    const changeWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    }
    const changeCols = () => {
        if (windowWidth >= 720) {
            setCols([{
                name: 'id',
                col_md: 1,
                col_sm: 1,
                col_xs: 1,

            },
            {
                name: 'name_en',
                col_md: 2,
                col_sm: 2,
                col_xs: 2,

            },
            {
                name: 'name_ar',
                col_md: 2,
                col_sm: 2,
                col_xs: 2,

            },
            {
                name: 'img',
                col_md: 1,
                col_sm: 1,
                col_xs: 1,

            },
            {
                name: 'restaurant',
                col_md: 2,
                col_sm: 2,
                col_xs: 2,

            },
            {
                name: 'price',
                col_md: 2,
                col_sm: 2,
                col_xs: 2,

            },
            {
                name: 'edit',
                col_md: 1,
                col_sm: 1,
                col_xs: 1,

            },
            {
                name: 'delete',
                col_md: 1,
                col_sm: 1,
                col_xs: 1,

            }])
        }
        else {
            setCols([{
                name: 'id',
                col_md: 1,
                col_sm: 1,
                col_xs: 1,

            },
            {
                name: 'name_en',
                col_md: 2,
                col_sm: 3,
                col_xs: 3,

            },
            {
                name: 'img',
                col_md: 1,
                col_sm: 2,
                col_xs: 2,

            },
            {
                name: 'restaurant',
                col_md: 2,
                col_sm: 2,
                col_xs: 2,

            },
            {
                name: 'edit',
                col_md: 1,
                col_sm: 2,
                col_xs: 2,

            },
            {
                name: 'delete',
                col_md: 1,
                col_sm: 2,
                col_xs: 2,

            }])
        }
    }
    const removeItem = async (id) => {
        handleDelete(id);
     };
    useEffect(() => {
        changeCols();
        getData();
        window.addEventListener('resize', changeWindowWidth);
        return () => window.removeEventListener('resize', changeWindowWidth);
    }, [])
    useEffect(() => {
        changeCols();
    }, [windowWidth])
    return (
        <section className={styles.menu_part}>
            <h2 className='logo_admin my-3'>Fetary</h2>
            <h4 className='my-3'>{restaurant.name_en}</h4>
            <div className={styles.menu_wrapper}>
                <div className={`${styles.table_head} row justify-content-center`}>
                    {cols.map((column) => {
                        return (<div className={`${styles.table_head_cell} text-center col-md-${column.col_md} col-sm-${column.col_sm} col-${column.col_xs}`} key={column.name}>
                            <p>{column.name}</p>
                        </div>)
                    })}
                </div>
                <div className={styles.wrap}>
                    {items.map((item) => {
                        return (
                            <TableRow key={item.id} ob={item} flag='items' handleDelete={removeItem} windowWidth={windowWidth} editItemEffect = {editItemEffect}/>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default MenuComponent