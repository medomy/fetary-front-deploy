import React, { useState } from 'react'
import uploadPhoto from '../../../../services/uploadPhoto';
import { addRestaurant } from '../../../../services/restaurants';
import styles from './add_restaurant.module.css'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
function AddRestaurant() {
    const {t} = useTranslation();
    const [img, setImg] = useState("");
    const [logo, setLogo] = useState("");
    const [imgIsLoading, setImgIsLoading] = useState(false);
    const [logoIsLoading, setLogoIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [formVals, setFormVals] = useState({
        eName: "",
        aName: "",
        phoneNumber: "",
        description_en: "",
        description_ar: "",
        logo: null,
        img: null
    });
    const [formErrs, setFormErrs] = useState({
        eName: "",
        aName: "",
        phoneNumber: "",
        description_en: "",
        description_ar: "",
        logo: "",
        img: ""
    });
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const setVals = (event) => {
        event.target.name === "name_en" ? setFormVals({ ...formVals, eName: event.target.value }) :
            event.target.name === "name_ar" ? setFormVals({ ...formVals, aName: event.target.value }) :
                event.target.name === "phone_number" ? setFormVals({ ...formVals, phoneNumber: event.target.value }) :
                    event.target.name === "description_en" ? setFormVals({ ...formVals, description_en: event.target.value }) :
                    event.target.name === "description_ar" ? setFormVals({ ...formVals, description_ar: event.target.value }) : console.log('np')
    }

    const setErrors = (event) => {
        if (event.target.name === "name_en") {
            event.target.value === "" ? setFormErrs({ ...formErrs, eName: "English name is required" }) :
                event.target.value.length < 3 ? setFormErrs({ ...formErrs, eName: "English name must be of at least 3 charachters" }) :
                    setFormErrs({ ...formErrs, eName: null });
        }
        else if (event.target.name === "name_ar") {
            event.target.value === "" ? setFormErrs({ ...formErrs, aName: "Arabic name is required" }) :
                event.target.value.length < 3 ? setFormErrs({ ...formErrs, aName: "Arabic name must be of at least 3 charachters" }) :
                    setFormErrs({ ...formErrs, aName: null })
        }
        else if (event.target.name === "phone_number") {
            event.target.value === "" ? setFormErrs({ ...formErrs, phoneNumber: "a restaurant should have number" }) :
                !(/^01[0125][0-9]{8}$/.test(event.target.value) || /^[0-9]{5}$/.test(event.target.value)) ? setFormErrs({ ...formErrs, phoneNumber: "the number does not match an Egyptian phone number or a hotline" }) :
                    setFormErrs({ ...formErrs, phoneNumber: null });
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
    }

    const changeImg = async (event) => {
        console.log(event.target.files[0]);
        //setImg(event.target.files[0]);
        setFormVals({ ...formVals, img: event.target.files[0] });
        setImgIsLoading(true);
        const data = await uploadPhoto(event.target.files[0]);
        if (data) setFormErrs({ ...formErrs, img: null });
        console.log(data.data.data.display_url);
        setImg(data.data.data.display_url);
        console.log(img);
        setImgIsLoading(false);
    }
    const changeLogo = async (event) => {
        console.log(event.target.files[0]);
        setFormVals({ ...formVals, logo: event.target.files[0] });
        setLogoIsLoading(true);
        const data = await uploadPhoto(event.target.files[0]);
        if (data) setFormErrs({ ...formErrs, logo: null });
        console.log(data);
        setLogo(data.data.data.display_url);
        setLogoIsLoading(false);
    }
    const submitForm = async (event) => {
        event.preventDefault();
        setIsAdding(true);
        await addRestaurant({
            name_en: formVals.eName,
            name_ar: formVals.aName,
            img_url: img,
            logo: logo,
            phoneNumber: formVals.phoneNumber,
            description_en: formVals.description_en,
            description_ar: formVals.description_ar
        });
        setIsAdding(false);

    }
    return (
        <div>
            <div className='row mt-4'>
                <h2 className={`${styles.logo} text-center ${isDark ? 'icons-dark':''}`}>Fetary</h2>
            </div>
            <form className={`${styles.add_form} px-4 py-4`} onSubmit={submitForm}>
                <div className='row justify-content-between mb-2'>
                    <div className="mb-2 col-md-5 col-12">
                        <label htmlFor='name_en' className={`form-label ${isDark ? 'dark-mode-txt':''}`}>{t("English_name")}</label>
                        <input type="text" className={`form-control ${formErrs.eName === null ? 'is-valid' : formErrs.eName === "" ? '' : formErrs.eName !== null ? 'is-invalid' : ''}`} id="name_en" name='name_en' value={formVals.eName} onChange={setVals} onBlur={setErrors} placeholder="example..." />
                        {formErrs.eName ? <p className='text-danger'>{formErrs.eName}</p> : null}
                    </div>
                    <div className="mb-2 col-md-5 col-12">
                        <label htmlFor='name_ar' className={`form-label ${isDark ? 'dark-mode-txt':''}`}>{t("Arabic_name")}</label>
                        <input type="text" className={`form-control ${formErrs.aName === null ? 'is-valid' : formErrs.aName === "" ? '' : formErrs.aName !== null ? 'is-invalid' : ''}`} id="name_ar" name='name_ar' value={formVals.aName} onChange={setVals} onBlur={setErrors} placeholder="مثال..." />
                        {formErrs.aName ? <p className='text-danger'>{formErrs.aName}</p> : null}
                    </div>
                </div>
                <div className="mb-2">
                    <label htmlFor='phone_number' className={`form-label ${isDark ? 'dark-mode-txt':''}`}>{t("Phone_number")}</label>
                    <input type="text" className={`form-control ${formErrs.phoneNumber === null ? 'is-valid' : formErrs.phoneNumber === "" ? '' : formErrs.phoneNumber !== null ? 'is-invalid' : ''}`} id="phone_number" name='phone_number' value={formVals.phoneNumber} onBlur={setErrors} onChange={setVals} placeholder="0123456789" />
                    {formErrs.phoneNumber ? <p className='text-danger'>{formErrs.phoneNumber}</p> : null}
                </div>
                <div className="mb-2">
                    <label htmlFor='description_en' className={`form-label ${isDark ? 'dark-mode-txt':''}`}>{t("Description")}</label>
                    <textarea className={`form-control ${formErrs.description_en === null ? 'is-valid' : formErrs.description_en === "" ? '' : formErrs.description_en !== null ? 'is-invalid' : ''}`} id="description_en" name='description_en' value={formVals.description_en} onChange={setVals} onBlur={setErrors} placeholder="descripe.." rows={5} />
                    {formErrs.description_en ? <p className='text-danger'>{formErrs.description_en}</p> : null}
                </div>
                <div className="mb-2">
                    <label htmlFor='description_ar' className={`form-label ${isDark ? 'dark-mode-txt':''}`}>{t("Description_ar")}</label>
                    <textarea className={`form-control ${formErrs.description_ar === null ? 'is-valid' : formErrs.description_ar === "" ? '' : formErrs.description_ar !== null ? 'is-invalid' : ''}`} id="description_ar" name='description_ar' value={formVals.description_ar} onChange={setVals} onBlur={setErrors} placeholder="الوصف..." rows={5} />
                    {formErrs.description_ar ? <p className='text-danger'>{formErrs.description_ar}</p> : null}
                </div>
                <div className="row justify-content-between mb-4 mt-4">
                    <label htmlFor="logo-upload" className={`${styles.upload_label} col-12 col-md-4 text-center mb-2`}>
                        {logoIsLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <i className="bi bi-cloud-arrow-up-fill"></i>}
                        {t("Upload_logo")}
                    </label>
                    <input className='d-none' id='logo-upload' type="file" accept='.jpg, .png' onChange={changeLogo} />
                    <label htmlFor="img-upload" className={`${styles.upload_label} col-12 col-md-4 text-center mb-2`}>
                        {imgIsLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <i className="bi bi-cloud-arrow-up-fill"></i>}
                        {t("Upload_img")}
                    </label>
                    <input className='d-none' id='img-upload' type="file" accept='.jpg, .png' onChange={changeImg} />
                </div>
                <div className='mb-2 row justify-content-center'>
                    <button type="submit" className={`btn btn-success col-md-4 col-10 mb-4 ${formErrs.eName !== null || formErrs.aName !== null || formErrs.description_en !== null || formErrs.description_ar !== null ||formErrs.phoneNumber !== null || formErrs.img !== null || formErrs.logo !== null ? styles.disabled_btn : ''}`} disabled={formErrs.eName !== null || formErrs.aName !== null || formErrs.description_en !== null || formErrs.description_ar !== null ||formErrs.phoneNumber !== null || formErrs.img !== null || formErrs.logo !== null}>add restaurant</button>
                </div>
                <div className='mb-2 row justify-content-center'>
                {isAdding ?<div className="spinner-border text-dark" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>:null}
                </div>
            </form>
        </div>)
}

export default AddRestaurant