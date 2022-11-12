import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import EntitiesTable from '../../../../components/entities_table/entities_table'
import SideBar from '../../../../components/side_bar/side_bar'
import Toast from '../../../../components/toast/toast';
import { getAllRestaurants } from '../../../../services/restaurants';
import styles from './show_restaurants.module.css'
function ShowRestaurants() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [removed , setRemoved] = useState(false);
    const {t} = useTranslation();
    const [cols, setCols] = useState([]);
    // const [obs,setObs] = useState([{
    //     id:1,
    //     name: 'example'
    // }])
    const [restaurants, setRestaurants] = useState([]);
    const [flag, setFlag] = useState('restaurants');
    const getData = async () => {
        try {
            const rests = await getAllRestaurants();
            console.log(rests);
            setRestaurants(rests);
        } catch (err) {
            console.log(err);
        }
    }
    const changeWidth = () => {
        setWindowWidth(window.innerWidth);
    }
    const changeCols = () => {
        if (windowWidth < 720) {
            setCols([{
                name: 'id',
                col_md: 1,
                col_sm: 1,
                col_xs: 1,

            },
            {
                name: 'name_en',
                col_md: 1,
                col_sm: 2,
                col_xs: 2,

            },
            {
                name: 'logo',
                col_md: 1,
                col_sm: 2,
                col_xs: 2,
            },
            {
                name: 'phone_number',
                col_md: 2,
                col_sm: 2,
                col_xs: 2,
            },
            {
                name: 'menu',
                col_md: 1,
                col_sm: 1,
                col_xs: 1,
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
        else {
            setCols([
                {
                    name: 'id',
                    col_md: 1,
                    col_sm: 1,
                    col_xs: 1,

                },
                {
                    name: 'name_en',
                    col_md: 1,
                    col_sm: 1,
                    col_xs: 1,

                },
                {
                    name: 'name_ar',
                    col_md: 1,
                    col_sm: 1,
                    col_xs: 1,
                },
                {
                    name: 'img',
                    col_md: 1,
                    col_sm: 1,
                    col_xs: 1,
                },
                {
                    name: 'logo',
                    col_md: 1,
                    col_sm: 1,
                    col_xs: 1,
                },
                {
                    name: 'phone_number',
                    col_md: 2,
                    col_sm: 2,
                    col_xs: 2,
                },
                {
                    name: 'menu',
                    col_md: 2,
                    col_sm: 3,
                    col_xs: 3,
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
                }
            ])
        }
    }
    const removedRestaurant = (isRemoved)=>{
        if(isRemoved) setRemoved(isRemoved);
        setTimeout(()=>{
            setRemoved(false);
        },3000)
    }
    useEffect(() => {
        getData();
        window.addEventListener('resize', changeWidth);
        return () => window.removeEventListener('resize', changeWidth);
    }, []);
    useEffect(() => changeCols(), [windowWidth])
    return (
        <section className='container-fluid px-0'>
            <div className='row justify-content-center'>
                <div className={`${styles.pageSec}`}>
                    <EntitiesTable columns={cols} obs={restaurants} flag={flag} deletedOrNot={removedRestaurant}/>
                </div>
                <div className='my-4 col-md-6 text-center'>
                    <Link className='add_entity_btn' to={'add'}>
                        <i className="bi bi-plus"></i>
                        <span>{t("add_a_restaurant")}</span>
                    </Link>
                </div>
            </div>
            {removed ?<div className={'toast_wrap'}>
                <Toast messege={'deleted successfully'}/>
            </div> : null}
        </section>
    )
}

export default ShowRestaurants