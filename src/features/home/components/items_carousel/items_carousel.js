import React, { useEffect, useState, useRef } from 'react'
import styles from './items_carousel.module.css'
import ItemCard from '../../../../components/item_card/item_card'
import Slider from 'react-slick'
import NextArrow from './helping_components/next_arrow/next_Arrow';
import PrevArrow from './helping_components/prev_arrow/prev_Arrow';
import { getAllItems } from '../../../../services/items';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function ItemCarousel() {
    const lang = useSelector((state)=> state.lang.lang);
    const [settings, setSettings] = useState({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        swipeToSlide: true,
        rtl: lang === "ar",
        responsive: [
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                }
            },]
    });
    const { t } = useTranslation();
    const isDark = useSelector((state) => state.theme.isDarkMode);
    // items shown (will change when production)
    //TODO: make them a limit of 8 items
    const [sampleItems, setSampleItem] = useState([]);
    const windowWidth = useRef(window.innerWidth);
    const changeWidth = () => {
        windowWidth.current = window.innerWidth;
        if (windowWidth.current <= 720) {
            setSettings((prev) => {
                return {
                    ...prev,
                    slidesToShow: 2
                }
            })
        }
        else setSettings((prev) => {
            return {
                ...prev,
                slidesToShow: 4
            }
        })
    }
    const gotItems = async () => {
        if (windowWidth.current <= 720) {
            setSettings((prev) => {
                return {
                    ...prev,
                    slidesToShow: 2
                }
            })
        }
        else setSettings((prev) => {
            return {
                ...prev,
                slidesToShow: 5
            }
        })
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
        window.addEventListener("resize", changeWidth);
        return () => window.removeEventListener("resize", changeWidth);
    }, [])
    return (
        <div className={`container-fluid my-5 ${styles.carousel_Sec} ${isDark ? 'bg-dark' : ''}`}>
            <div className='row justify-content-center'>
                <div className='col-md-8 col-12'>
                    <h2 className={`${isDark ? 'dark-mode-txt' : ''}`}>{t("We_offer")} :</h2>
                    {/* <div className='row justify-content-center'>
                <div className='col-md-2'>
                    <ItemCard />
                </div>
            </div> */}
                    <div className='my-2 row justify-content-between'>
                        {sampleItems.length >= settings.slidesToShow ? <Slider {...settings}>
                            {sampleItems.map((item) => {
                                return (
                                    <ItemCard item={item} key={item.id} />
                                )
                            })}
                        </Slider> : sampleItems.map((item) => {
                            return (
                                <div className='col-md-3 col-6' key={item.id}>
                                    <ItemCard item={item} />
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