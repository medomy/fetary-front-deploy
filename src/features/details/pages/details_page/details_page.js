import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneItem } from '../../../../services/items'
import BreadCrumbsDetails from '../../components/details_breadCrumbs/details_breadcrumbs'
import DetailsSide from '../../components/details_side/details_side'
import DetailsHeader from '../../components/header_details/header'
import ImageMagnify from '../../components/image_magnify/image_magnify'
import styles from './details_page.module.css'
function DetailsPage() {
    const [item, setItem] = useState({});
    const params = useParams();
    const lang = useSelector((state)=> state.lang.lang);
    const onInit = async () => {
        try {
            const _item = await getOneItem(params.id);
            setItem(_item);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        onInit();
    }, [])
    return (
        <section className={`${styles.details_page} container-fluid`}>
            <div className='row justify-content-center mt-2 mb-4'>
                <div className='col-md-10 col-12'>
                    <BreadCrumbsDetails />
                    <DetailsHeader itemName={lang === "ar" ? item.name_ar : item.name_en} />
                    <div className='row'>
                        <div className='col-md-5'>
                            <ImageMagnify imgSrc={item.img_url} />
                        </div>
                        <div className='col-md-5'>
                            <DetailsSide item={item} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DetailsPage