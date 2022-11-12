import React ,{useState} from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { addcompany } from '../../../../services/companies'
import uploadPhoto from '../../../../services/uploadPhoto'
import styles from './add_companies.module.css'
function AddCompanies() {
    const {t} = useTranslation();
    const [formVals, setFormVals] = useState({
        name_en: "",
        name_ar: "",
        img_url: "",
        logo: "",
        address: ""
    })
    const [formErrs, setFormErrs] = useState({
        name_en: "",
        name_ar: "",
        img_url: "",
        logo: "",
        address: ""
    })
    const [imgIsLoading, setImgIsLoading] = useState(false);
    const [logoIsLoading, setLogoIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const setVals = (event) => {
        event.target.name === "name_en" ? setFormVals({ ...formVals, name_en: event.target.value }) :
            event.target.name === "name_ar" ? setFormVals({ ...formVals, name_ar: event.target.value }) :
                event.target.name === "address" ? setFormVals({ ...formVals, address: event.target.value }) :
                    console.log('no')
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
        else if (event.target.name === "address") {
            event.target.value === "" ? setFormErrs({ ...formErrs, address: "address is required and at least 20 charachters" }) :
                event.target.value.length < 20 ? setFormErrs({ ...formErrs, address: "address must be of at least 20 charachters" }) :
                    setFormErrs({ ...formErrs, address: null })
        }
    }
    const changeImg = async (event) => {
        //setImg(event.target.files[0]);
        setImgIsLoading(true);
        const data = await uploadPhoto(event.target.files[0]);
        if (data) setFormErrs({ ...formErrs, img_url: null });
        setFormVals({...formVals, img_url: data.data.data.display_url})
        setImgIsLoading(false);
    }
    const changeLogo = async (event) => {
        setLogoIsLoading(true);
        const data = await uploadPhoto(event.target.files[0]);
        if (data) setFormErrs({ ...formErrs, logo: null });
        setFormVals({...formVals , logo:data.data.data.display_url});
        setLogoIsLoading(false);
    }
    const submitForm = async (event) => {
        event.preventDefault();
        setIsAdding(true);
        await addcompany({
            name_en: formVals.name_en,
            name_ar: formVals.name_ar,
            img_url: formVals.img_url,
            logo: formVals.logo,
            address: formVals.address,
        });
        setIsAdding(false);
    }
  return (
    <div>
            <div className='row mt-4'>
                <h2 className={`logo_admin text-center ${isDark ? 'icons-dark':''}`}>Fetary</h2>
            </div>
            <form className={`${styles.add_form} px-4 py-4`} onSubmit={submitForm}>
                <div className='row justify-content-between mb-2'>
                    <div className="mb-2 col-md-5 col-12">
                        <label htmlFor='name_en' className={`form-label ${isDark?'dark-mode-txt':''}`}>{t("English_name")}</label>
                        <input type="text" className={`form-control ${formErrs.name_en === null ? 'is-valid' : formErrs.name_en === "" ? '' : formErrs.name_en !== null ? 'is-invalid' : ''}`} id="name_en" name='name_en' value={formVals.name_en} onChange={setVals} onBlur={setErrors} placeholder="example..." />
                        {formErrs.name_en ? <p className='text-danger'>{formErrs.name_en}</p> : null}
                    </div>
                    <div className="mb-2 col-md-5 col-12">
                        <label htmlFor='name_ar' className={`form-label ${isDark ? 'dark-mode-txt':''}`}>{t("Arabic_name")}</label>
                        <input type="text" className={`form-control ${formErrs.name_ar === null ? 'is-valid' : formErrs.name_ar === "" ? '' : formErrs.name_ar !== null ? 'is-invalid' : ''}`} id="name_ar" name='name_ar' value={formVals.name_ar} onChange={setVals} onBlur={setErrors} placeholder="مثال..." />
                        {formErrs.name_ar ? <p className='text-danger'>{formErrs.name_ar}</p> : null}
                    </div>
                </div>
                <div className="mb-2">
                    <label htmlFor='address' className={`form-label ${isDark ? 'dark-mode-txt':''}`}>{t("address")}</label>
                    <textarea className={`form-control ${formErrs.address === null ? 'is-valid' : formErrs.address === "" ? '' : formErrs.address !== null ? 'is-invalid' : ''}`} id="address" name='address' value={formVals.address} onChange={setVals} onBlur={setErrors} placeholder="city/district/st.no" rows={5} />
                    {formErrs.address ? <p className='text-danger'>{formErrs.address}</p> : null}
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
                    <button type="submit" className="btn btn-success col-md-4 col-10 mb-4" disabled={formErrs.name_en !== null || formErrs.name_ar !== null || formErrs.address !== null || formErrs.img_url !== null || formErrs.logo !== null}>add company</button>
                </div>
                <div className='mb-2 row justify-content-center'>
                {isAdding ?<div className="spinner-border text-dark" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>:null}
                </div>
            </form>
        </div>
  )
}

export default AddCompanies