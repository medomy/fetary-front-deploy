import React, { useEffect, useState } from 'react'
import { addItem } from '../../../../services/items';
import uploadPhoto from '../../../../services/uploadPhoto';
import styles from './add_items.module.css'
import { useTranslation } from 'react-i18next';

function AddItem({ restaurant_id, finishModalBusinness }) {
    const { t } = useTranslation();
    const [formVals, setFormVals] = useState({
        name_en: "",
        name_ar: "",
        description_en: "",
        description_ar: "",
        img_url: "",
        price: 0
    })
    const [formErrs, setFormErrs] = useState({
        name_en: "",
        name_ar: "",
        description_en: "",
        description_ar: "",
        img_url: "",
        price: ""
    })
    //const [restaurants, setRestaurants] = useState([]);
    const [imgIsLoading, setImgIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [addedd, setAdded] = useState(false);

    const setVals = (event) => {
        event.target.name === "name_en" ? setFormVals({ ...formVals, name_en: event.target.value }) :
            event.target.name === "name_ar" ? setFormVals({ ...formVals, name_ar: event.target.value }) :
                event.target.name === "description_en" ? setFormVals({ ...formVals, description_en: event.target.value }) :
                    event.target.name === "description_ar" ? setFormVals({ ...formVals, description_ar: event.target.value }) :
                        event.target.name === "price" ? setFormVals({ ...formVals, price: event.target.value }) :
                            event.target.name === "restaurants" ? setFormVals({ ...formVals, restaurant: event.target.value }) : console.log('no')
    }

    const setErrors = (event) => {
        if (event.target.name === "name_en") {
            event.target.value === "" ? setFormErrs({ ...formErrs, name_en: "English name is required" }) :
                event.target.value.length < 3 ? setFormErrs({ ...formErrs, name_en: "English name must be of at least 3 charachters" }) :
                    setFormErrs({ ...formErrs, name_en: null });
        }
        else if (event.target.name === "name_ar") {
            event.target.value === "" ? setFormErrs({ ...formErrs, name_ar: "Arabic name is required" }) :
                event.target.value.length < 3 ? setFormErrs({ ...formErrs, name_ar: "Arabic name must be of at least 3 charachters" }) :
                    setFormErrs({ ...formErrs, name_ar: null })
        }
        else if (event.target.name === "price") {
            event.target.value === "" ? setFormErrs({ ...formErrs, price: "an item should have a price" }) : setFormErrs({ ...formErrs, price: null });
        }
        else if (event.target.name === "description_en") {
            event.target.value === "" ? setFormErrs({ ...formErrs, description_en: "description is required and at least 20 charachters" }) :
                event.target.value.length < 20 ? setFormErrs({ ...formErrs, description_en: "description must be of at least 20 charachters" }) :
                    setFormErrs({ ...formErrs, description_en: null })
        }
        else if (event.target.name === "description_ar") {
            event.target.value === "" ? setFormErrs({ ...formErrs, description_ar: "description is required and at least 20 charachters" }) :
                event.target.value.length < 20 ? setFormErrs({ ...formErrs, description_ar: "description must be of at least 20 charachters" }) :
                    setFormErrs({ ...formErrs, description_ar: null })
        }
        // else if (event.target.name === "restaurants") {
        //     event.target.value === "" ? setFormErrs({ ...formErrs, restaurant: "restaurant is required" }) : setFormErrs({ ...formErrs, restaurant: null })
        // }
    }

    const changeImgAdd = async (event) => {
        console.log(event.target.files[0]);
        setImgIsLoading(true);
        const data = await uploadPhoto(event.target.files[0]);
        if (data) setFormErrs({ ...formErrs, img_url: null });
        console.log(data.data.data.display_url);
        console.log(formErrs);
        setFormVals({ ...formVals, img_url: data.data.data.display_url });
        setImgIsLoading(false);
    }

    // const catchRestaurants = async () => {
    //     try {
    //         const _restaurants = await getAllRestaurants();
    //         setRestaurants(_restaurants);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            setIsAdding(true);
            await addItem({
                name_en: formVals.name_en,
                name_ar: formVals.name_ar,
                description_en: formVals.description_en,
                description_ar: formVals.description_ar,
                price: formVals.price,
                restaurant_id: restaurant_id,
                img_url: formVals.img_url
            })
            setIsAdding(false);
            setAdded(true);
            setFormVals(
                {
                    name_en: "",
                    name_ar: "",
                    img_url: "",
                    description_en: "",
                    description_ar: "",
                    price: 0
                }
            )
            setFormErrs({
                name_en: "",
                name_ar: "",
                description_en: "",
                description_ar: "",
                img_url: "",
                price: ""
            })
            finishModalBusinness('hide');
        } catch (err) {
            console.log(err);
        }
    }
    // useEffect(() => {
    //     catchRestaurants();
    // }, [])
    useEffect(() => {
        console.log(formErrs);
    }, [formErrs])

    return (
        <div>
            <div className='row mt-4'>
                <h2 className={`logo_admin text-center`}>Fetary</h2>
            </div>
            <form className={`${styles.add_form} px-4 py-4`} onSubmit={submitForm}>
                <div className='row justify-content-between mb-2'>
                    <div className="mb-2 col-md-5 col-12">
                        <label htmlFor='name_en' className="form-label">{t("English_name")}</label>
                        <input type="text" className={`form-control ${formErrs.name_en === null ? 'is-valid' : formErrs.name_en === "" ? '' : formErrs.name_en !== null ? 'is-invalid' : ''}`} id="name_en" name='name_en' value={formVals.name_en} onChange={setVals} onBlur={setErrors} placeholder="example..." />
                        {formErrs.eName ? <p className='text-danger'>{formErrs.name_en}</p> : null}
                    </div>
                    <div className="mb-2 col-md-5 col-12">
                        <label htmlFor='name_ar' className="form-label">{t("Arabic_name")}</label>
                        <input type="text" className={`form-control ${formErrs.name_ar === null ? 'is-valid' : formErrs.name_ar === "" ? '' : formErrs.name_ar !== null ? 'is-invalid' : ''}`} id="name_ar" name='name_ar' value={formVals.name_ar} onChange={setVals} onBlur={setErrors} placeholder="مثال..." />
                        {formErrs.aName ? <p className='text-danger'>{formErrs.name_ar}</p> : null}
                    </div>
                </div>
                <div className="mb-2">
                    <label htmlFor='price' className="form-label">{t("Price")}</label>
                    <input type="number" className={`form-control ${formErrs.price === null ? 'is-valid' : formErrs.price === "" ? '' : formErrs.price !== null ? 'is-invalid' : ''}`} id="price" name='price' value={formVals.price} onBlur={setErrors} onChange={setVals} placeholder="5" />
                    {formErrs.price ? <p className='text-danger'>{formErrs.price}</p> : null}
                </div>
                <div className="mb-2">
                    <label htmlFor='description_en' className="form-label">{t("Description")}</label>
                    <textarea className={`form-control ${formErrs.description_en === null ? 'is-valid' : formErrs.description_en === "" ? '' : formErrs.description_en !== null ? 'is-invalid' : ''}`} id="description_en" name='description_en' value={formVals.description_en} onChange={setVals} onBlur={setErrors} placeholder="descripe.." rows={5} />
                    {formErrs.description_en ? <p className='text-danger'>{formErrs.description_en}</p> : null}
                </div>
                <div className="mb-2">
                    <label htmlFor='description_ar' className="form-label">{t("Description_ar")}</label>
                    <textarea className={`form-control ${formErrs.description_ar === null ? 'is-valid' : formErrs.description_ar === "" ? '' : formErrs.description_ar !== null ? 'is-invalid' : ''}`} id="description_ar" name='description_ar' value={formVals.description_ar} onChange={setVals} onBlur={setErrors} placeholder="الوصف..." rows={5} />
                    {formErrs.description_ar ? <p className='text-danger'>{formErrs.description_ar}</p> : null}
                </div>
                {/* <div className='mb-2'>
                    <label htmlFor='restaurants-menu' className='form-label'>Restaurants</label>
                    <select className={`form-select ${formErrs.restaurant === null ? 'is-valid' : formErrs.restaurant === "" ? '' : formErrs.restaurant !== null ? 'is-invalid' : ''}`} id='restaurants-menu' aria-label="Default select example" name='restaurants' onChange={setVals} onBlur={setErrors}>
                        {restaurants.map((restaurant, i) => {
                            return (
                                <option key={restaurant.id} value={restaurant.id}>{restaurant.name_en}</option>
                            )
                        })}
                    </select>
                </div> */}
                <div className="row justify-content-center mb-4 mt-4">
                    <label htmlFor="img-upload-add" className={`${styles.upload_label} col-12 col-md-4 text-center mb-2`}>
                        {imgIsLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <i className="bi bi-cloud-arrow-up-fill"></i>}
                        {t("Upload_img")}
                    </label>
                    <input className='d-none' id='img-upload-add' type="file" accept='.jpg, .png' onChange={changeImgAdd} />
                </div>
                {formVals.img_url ? <div className="row justify-content-center mb-4 mt-4">
                    <div className='col-md-4 col-12'>
                        <img className={styles.shown_img} alt={'pic'} src={formVals.img_url} />
                    </div>
                </div> : null}
                <div className='mb-2 row justify-content-center'>
                    {/*disabled={formErrs.name_en !== null || formErrs.name_ar !== null || formErrs.price !== null || formErrs.img_url !== null}*/}
                    <button type="submit" className={`btn btn-success col-md-4 col-10 mb-4 ${formErrs.name_en !== null || formErrs.name_ar !== null || formErrs.price !== null || formErrs.description_en !== null || formErrs.description_ar !== null || formErrs.img_url !== null ? 'disapled_btn' : ''}`} disabled={formErrs.name_en !== null || formErrs.name_ar !== null || formErrs.price !== null || formErrs.description_en !== null || formErrs.description_ar !== null || formErrs.img_url !== null}>add item</button>
                </div>
                <div className='mb-2 row justify-content-center'>
                    {isAdding ? <div className="spinner-border text-dark" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> : null}
                </div>
            </form>
            {addedd ? <div className="toast align-items-center bg-success" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        data addedd successfully
                    </div>
                    <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div> : null}
        </div>
    )
}

export default AddItem