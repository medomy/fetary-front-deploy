import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './slider.module.css'
function Slider() {
    const [slides, setSlides] = useState([
        {
            id: 1,
            bg_img: 'https://el3.thembaydev.com/greenmart_fresh/wp-content/uploads/revslider/slider-1/background-slider-01.jpg',
            isSelected: true
        },
        {
            id: 2,
            bg_img: 'https://el3.thembaydev.com/greenmart_fresh/wp-content/uploads/revslider/slider-1/background-slider-02.jpg',
            isSelected: false
        }
    ]);
    const changeSlide = (i) => {
        console.log(i);
        let _slides = [
            {
                id: 1,
                bg_img: 'https://el3.thembaydev.com/greenmart_fresh/wp-content/uploads/revslider/slider-1/background-slider-01.jpg',
                isSelected: true
            },
            {
                id: 2,
                bg_img: 'https://el3.thembaydev.com/greenmart_fresh/wp-content/uploads/revslider/slider-1/background-slider-02.jpg',
                isSelected: false
            }
        ];
        _slides.forEach((slide)=> slide.isSelected = false);
        console.log(_slides);
        _slides[i].isSelected = true;
        setSlides(_slides);
    }
    const changeSlideSide = ()=>{
        let _slides = [
            {
                id: 1,
                bg_img: 'https://el3.thembaydev.com/greenmart_fresh/wp-content/uploads/revslider/slider-1/background-slider-01.jpg',
                isSelected: true
            },
            {
                id: 2,
                bg_img: 'https://el3.thembaydev.com/greenmart_fresh/wp-content/uploads/revslider/slider-1/background-slider-02.jpg',
                isSelected: false
            }
        ]
         if(slides[0].isSelected) {
            _slides[0].isSelected = false;
            _slides[1].isSelected = true;
            setSlides(_slides);
        }
        else if (slides[1].isSelected){
            _slides[1].isSelected = false;
            _slides[0].isSelected = true;
            setSlides(_slides);
        }
        console.log(slides);
    }
    const {t} = useTranslation();
    const navigate = useNavigate();
    const goToAuth=()=>{
        navigate('/sign-in');
    };
    const goToOrders=()=>{
        navigate('/order');
    };
    useEffect(()=>{
        
    },[])
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className={`${styles.slider_wrap} col-md-12`}>
                    {slides.map((slide) => {
                        return (
                            <div className={`${slide.isSelected ? styles.slide_wrap_active : styles.slide_wrap_inActive}`} key={slide.id} style={{ backgroundImage: `url(${slide.bg_img})` }}>
                                {slide.id === 1 ? <p className={styles.slider_inside_words}>{t('enjoy_privel')}</p> : <p className={styles.slider_inside_words}>{t("order_words")}</p>}
                                {slide.id === 1 ? <span className={`${styles.slider_inside_btn}`} onClick={goToAuth}>{t('login/register')}</span> : <span className={`${styles.slider_inside_btn}`} onClick={goToOrders}>{t('order_now')}</span>}
                            </div>
                        )
                    })}
                    <div className={`row ${styles.buttons_wrap} justify-content-center`}>
                        {slides.map((slide , i) => {
                            return (
                                <div className={`${styles.slider_btn} ${slide.isSelected ? styles.active_slider_btn : styles.inActive_slider_btn}`} onClick={()=>changeSlide(i)} key={slide.id}></div>
                            )

                        })}
                    </div>
                    <span className={styles.right_fwd_btn} onClick={changeSlideSide}>
                        <i className="bi bi-chevron-right"></i>
                    </span>
                    <span className={styles.right_bwd_btn} onClick={changeSlideSide}>
                        <i className="bi bi-chevron-left"></i>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Slider