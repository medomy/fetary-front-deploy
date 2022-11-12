import React from 'react'
import { useSelector } from 'react-redux'
//import Footer from '../../components/footer/footer'
import InfoComponent from '../../components/info_component/info_component'
import ItemCarousel from '../../components/items_carousel/items_carousel'
import RestaurantsCollection from '../../components/restaurants_collection/restaurant_collection'
import Slider from '../../components/slider/slider'
import styles from './home_page.module.css'

export default function HomePage() {
  const isDark = useSelector((state)=> state.theme.isDarkMode);
  return (
    <>
      <section className={`${styles.home_page} ${isDark ? 'bg-dark':''}`}>
        <Slider />
        <InfoComponent />
        <ItemCarousel />
        <RestaurantsCollection />
      </section>
    </>
  )
}
