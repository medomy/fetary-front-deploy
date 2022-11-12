import React from 'react'
import { useState } from 'react'
import RestaurantBreadCrumbs from '../../components/rest_breadcrumbs/rest_breadcrumbs'
import styles from './restaurants_page.module.css'
import restaurantImg from '../../../home/assets/images/restaurant_photo.png';
import RestaurantCard from '../../components/restaurant_card/restaurant_card';
import { getAllRestaurants } from '../../../../services/restaurants';
import { useEffect } from 'react';
function Restaurants_page() {
    const [restaurants, setRestaurants] = useState([{
        id :1,
        name_en : 'ay' ,
        name_ar :'ay' ,
        img_url :  'VARCHAR(100)' ,
        logo:  restaurantImg ,
        phone_number: "no" ,
        description: "yoyooyoyoyoyoyo"
    }]);
    const onInit = async ()=>{
        try{
            const _restaurants = await getAllRestaurants();
            setRestaurants(_restaurants);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        onInit();
    },[])
    return (
        <div className={`container-fluid ${styles.rests_page}`}>
            <div className='row justify-content-center mt-2 mb-4'>
                <div className='col-md-10 col-12'>
                    <RestaurantBreadCrumbs />
                    <div className='row mt-2 mb-2'>
                        <h2>restaurants</h2>
                    </div>
                    <div className='row my-5 justify-content-between'>
                        {restaurants.map((rest)=>{
                            return(
                                <div className='col-md-3 col-6' key={rest.id}>
                                    <RestaurantCard restaurant={rest}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Restaurants_page