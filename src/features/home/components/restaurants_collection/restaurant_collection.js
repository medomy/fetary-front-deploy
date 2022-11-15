import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './restaurant_collection.module.css'
import { getAllRestaurants } from '../../../../services/restaurants'
import { useEffect } from 'react'
import RestaurantCard from '../../../restaurants/components/restaurant_card/restaurant_card'
import { useSelector } from 'react-redux'
function RestaurantsCollection() {
    const [restaurants, setRestaurants] = useState([])
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const getData = async () => {
        try {
            const _restaurants = await getAllRestaurants();
            if(_restaurants.length > 4) {
                let rests = [];
                for(let i =0 ; i < 4 ; i++){
                    rests.push(_restaurants[i]);
                }
                setRestaurants(rests);
            }
            else setRestaurants(_restaurants);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className={`${isDark ? 'bg-dark' : styles.restaurants_home_Sec} container-fluid pb-5`}>
            <div className='row justify-content-center'>
                <div className={`col-md-8 col-12 ${styles.restaurants_cards_wrapper}`}>
                    <div className='row justify-content-between mb-5 align-items-center'>
                        <h2 className={`col-10 ${isDark? 'dark-mode-txt' :''}`}>Our Restaurants</h2>
                        <Link className={`${styles.toRestsLink} ${isDark? 'dark-mode-links':''} col-2`} to={'#'}>see all</Link>
                    </div>
                    <div className='row justify-content-center'>
                        {restaurants.map((restaurant) => {
                            return (
                                <div className='col-md-3 col-6' key={restaurant.id}>
                                    <RestaurantCard restaurant={restaurant} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RestaurantsCollection