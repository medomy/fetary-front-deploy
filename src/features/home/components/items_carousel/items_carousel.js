import React, { useEffect, useState } from 'react'
import styles from './items_carousel.module.css'
import ItemCard from '../../../../components/item_card/item_card'
import Slider from 'react-slick'
import NextArrow from './helping_components/next_arrow/next_Arrow';
import PrevArrow from './helping_components/prev_arrow/prev_Arrow';
import { getAllItems } from '../../../../services/items';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function ItemCarousel() {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };
    const {t} =useTranslation();
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    // items shown (will change when production)
    //TODO: make them a limit of 8 items
    const [sampleItems, setSampleItem] = useState([]);
    const gotItems = async () => {
        try {
            const _items = await getAllItems();
            console.log(_items);
            setSampleItem(_items);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        gotItems();
    },[])
    return (
        <div className={`container-fluid my-5 ${styles.carousel_Sec} ${isDark ? 'bg-dark':''}`}>
            <div className='row justify-content-center'>
                <div className='col-md-8 col-12'>
                    <h2 className={`${isDark? 'dark-mode-txt' : ''}`}>{t("We_offer")} :</h2>
                    {/* <div className='row justify-content-center'>
                <div className='col-md-2'>
                    <ItemCard />
                </div>
            </div> */}
                    <div className='my-2 row justify-content-between'>
                        {sampleItems.length >= 5 ?<Slider {...settings}>
                            {sampleItems.map((item) => {
                                return (
                                    <ItemCard item={item} key={item.id} />
                                )
                            })}
                        </Slider> : sampleItems.map((item)=>{
                            return (
                                <div className='col-md-3 col-6' key={item.id}>
                                    <ItemCard item={item}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCarousel