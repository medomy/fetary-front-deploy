import React, { useEffect, useRef, useState } from 'react'
import styles from './registeration_form.module.css'
import breakfastBackground from '../../assets/images/breakfast_background.jpg'
import { getAllCompanies } from '../../../../services/companies';
import { checkPassword } from '../utils/checkPassword';
import uploadPhoto from '../../../../services/uploadPhoto';
import { registerNewUser } from '../../services/register';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn, setUser } from '../../../../store/reducers/user_slice/user_slice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function RegisterationForm() {
  const [formVals, setFormVals] = useState({
    userName: "",
    email: "",
    password: "",
    checkPassword: "",
    company: 1,
    phoneNumber: "",
    profilePic: "https://www.w3schools.com/howto/img_avatar.png",
    coverPic: breakfastBackground
  });
  const [formErrs, setFormErrs] = useState({
    userName: "",
    email: "",
    password: "",
    checkPassword: "",
    company: "",
    phoneNumber: "",
    profilePic: null,
    coverPic: null
  });
  const isDark = useSelector((state)=> state.theme.isDarkMode);
  const [companies, setCompanies] = useState([]);
  const [profilePicLoading, setProfilePicLoading] = useState(false);
  const [imgIsLoading, setImgIsLoading] = useState(false);
  const [isPassword , setIsPassword] = useState(true);
  const [isPasswordCheck , setIsPasswordCheck] = useState(true);
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const checkPasswordRef = useRef();
  const companyRef = useRef();
  const phoneNumber = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const getData = async () => {
    try {
      const _companies = await getAllCompanies();
      setCompanies(_companies);
      console.log(_companies);
    } catch (err) {
      console.log(err);
    }
  }
  const setErrors = (e) => {
    if (e.target.name === "user_name") {
      userNameRef.current.value.length === 0 ? setFormErrs({ ...formErrs, userName: 'user name is required' }) :
        setFormErrs({ ...formErrs, userName: null });
    }
    else if (e.target.name === "email") {
      emailRef.current.value.length === 0 ? setFormErrs({ ...formErrs, email: 'a valid email is required' }) :
        !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailRef.current.value) ? setFormErrs({ ...formErrs, email: 'email is not valid' }) :
          setFormErrs({ ...formErrs, email: null });
    }
    else if (e.target.name === "password") {
      passwordRef.current.value.length === 0 ? setFormErrs({ ...formErrs, password: 'password is required' }) :
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordRef.current.value) ? setFormErrs({ ...formErrs, password: 'Minimum eight characters, at least one letter and one number ,eg: password1' }) :
          setFormErrs({ ...formErrs, password: null });
    }
    else if (e.target.name === "passwordCheck") {
      checkPasswordRef.current.value.length === 0 ? setFormErrs({ ...formErrs, checkPassword: 'repeat password' }) :
        !checkPassword(passwordRef.current.value, checkPasswordRef.current.value) ? setFormErrs({ ...formErrs, checkPassword: `passwords don't match` }) :
          setFormErrs({ ...formErrs, checkPassword: null })
    }
    else if (e.target.name === "company") {
      setFormErrs({ ...formErrs, company: null })
    }
    else if (e.target.name === "phone_number") {
      phoneNumber.current.value.length === 0 ? setFormErrs({ ...formErrs, phoneNumber: 'phone number is required' }) :
        !/^01[0125][0-9]{8}$/.test(phoneNumber.current.value) ? setFormErrs({ ...formErrs, phoneNumber: 'number does not match an Egyptian mobile number' }) :
          setFormErrs({ ...formErrs, phoneNumber: null });
    }
  }
  const passwordSet = ()=>{
    setIsPassword((prev)=> !prev);
  }
  const passwordCheckSet = ()=>{
    setIsPasswordCheck((prev)=> !prev);
  }
  const changeImg = async (event) => {
    //setImg(event.target.files[0]);
    setImgIsLoading(true);
    const data = await uploadPhoto(event.target.files[0]);
    if (data) setFormErrs({ ...formErrs, coverPic: null });
    setFormVals({ ...formVals, coverPic: data.data.data.display_url })
    setImgIsLoading(false);
  }
  const changeProfilePic = async (event) => {
    setProfilePicLoading(true);
    const data = await uploadPhoto(event.target.files[0]);
    if (data) setFormErrs({ ...formErrs, profilePic: null });
    setFormVals({ ...formVals, profilePic: data.data.data.display_url });
    setProfilePicLoading(false);
  }
  const register = async (e) => {
    e.preventDefault();
    try {
      const _newUser = {
        user_name: userNameRef.current.value,
        password: passwordRef.current.value,
        email: emailRef.current.value,
        companyId: companyRef.current.value,
        mobile_number: phoneNumber.current.value,
        photo_Url: formVals.profilePic,
        img_url: formVals.coverPic,
        role: 'customer'
      }
      console.log(_newUser);
      const newUser = await registerNewUser(_newUser);
      console.log(newUser);
      if(newUser){
        dispatch(setUser(newUser));
        dispatch(setLoggedIn(true));
        navigate('/');
      }
      else {
        setFormErrs({...formErrs , email : 'seems to be something error with email'});
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <form onSubmit={register} className={`${styles.register_form} ${isDark? 'bg-dark':''}`}>
      <h2 className={`logo_admin text-center mt-3 mb-3 ${isDark? 'icons-dark':''}`}>Fetary</h2>
      <div className='row justify-content-between mb-2'>
        <div className='col-md-5 col-12'>
          <label htmlFor="user_name" className={`form-label ${isDark? 'dark-mode-txt':''}`}>{t("preferred_User_name")}</label>
          <input type="text" className={`form-control ${formErrs.userName === null ? 'is-valid' : formErrs.userName === "" ? '' : formErrs.userName !== null ? 'is-invalid' : ''}`} id="user_name" name='user_name' placeholder="user name ..." ref={userNameRef} onBlur={setErrors} />
          {formErrs.userName ? <p className='text-danger'>{formErrs.userName}</p> : null}
        </div>
        <div className='col-md-5 col-12'>
          <label htmlFor="email" className={`form-label ${isDark ? 'dark-mode-txt':''}`}>{t("Email_address")}</label>
          <input type="email" className={`form-control ${formErrs.email === null ? 'is-valid' : formErrs.email === "" ? '' : formErrs.email !== null ? 'is-invalid' : ''}`} id="email" name='email' placeholder="name@example.com" ref={emailRef} onBlur={setErrors} />
          {formErrs.email ? <p className='text-danger'>{formErrs.email}</p> : null}
        </div>
      </div>
      <div className='row justify-content-between mb-2'>
        <div className={`col-md-5 col-12 ${styles.password_area}`}>
          <label htmlFor="password" className={`form-label ${isDark? 'dark-mode-txt':''}`}>{t("Password")}</label>
          <input type={isPassword ? 'password' : 'text'} className={`form-control ${formErrs.password === null ? 'is-valid' : formErrs.password === "" ? '' : formErrs.password !== null ? 'is-invalid' : ''}`} id="password" name='password' ref={passwordRef} onBlur={setErrors} />
          <span className={`btn ${styles.show_password_btn}`} onClick={passwordSet}>
            {isPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
          </span>
          {formErrs.password ? <p className='text-danger'>{formErrs.password}</p> : null}
        </div>
        <div className={`col-md-5 col-12 ${styles.password_area}`}>
          <label htmlFor="passwordCheck" className={`form-label ${isDark? 'dark-mode-txt':''}`}>{t("retype_password")}</label>
          <input type={isPasswordCheck ? 'password' : 'text'} className={`form-control ${formErrs.checkPassword === null ? 'is-valid' : formErrs.checkPassword === "" ? '' : formErrs.checkPassword !== null ? 'is-invalid' : ''}`} id="passwordCheck" name='passwordCheck' ref={checkPasswordRef} onBlur={setErrors} />
          <span className={`btn ${styles.show_password_btn}`} onClick={passwordCheckSet}>
            {isPasswordCheck ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
          </span>
          {formErrs.checkPassword ? <p className='text-danger'>{formErrs.checkPassword}</p> : null}
        </div>
      </div>
      <div className='row justify-content-between mb-2'>
        <div className='col-md-5 col-12'>
          <label htmlFor="chooseCompany" className={`form-label ${isDark? 'dark-mode-txt':''}`}>{t("choose_your_company")}</label>
          <select defaultValue={1} className={`form-select form-select ${formErrs.company === null ? 'is-valid' : formErrs.company === "" ? '' : formErrs.company !== null ? 'is-invalid' : ''}`} aria-label="Default select example" name='company' id='chooseCompany' ref={companyRef}>
            {companies.map((company) => {
              return (
                <option key={company.id} value={company.id}>{company.name_en}</option>
              )
            })}
          </select>
        </div>
        <div className='col-md-5 col-12'>
          <label htmlFor='phone_number' className={`form-label ${isDark? 'dark-mode-txt':''}`}>{t("Phone_number")}</label>
          <input type="text" className={`form-control ${formErrs.phoneNumber === null ? 'is-valid' : formErrs.phoneNumber === "" ? '' : formErrs.phoneNumber !== null ? 'is-invalid' : ''}`} id="phone_number" name='phone_number' onBlur={setErrors} ref={phoneNumber} placeholder="0123456789" />
          {formErrs.phoneNumber ? <p className='text-danger'>{formErrs.phoneNumber}</p> : null}
        </div>
      </div>
      <div className="row justify-content-between mb-4 mt-4">
        <label htmlFor="profile-upload" className={`${styles.upload_label} ${isDark? 'dark-mode-txt':''} col-12 col-md-4 text-center mb-2`}>
          {profilePicLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <i className="bi bi-cloud-arrow-up-fill"></i>}
          {t("Upload_profile_pic")}
        </label>
        <input className='d-none' id='profile-upload' type="file" accept='.jpg, .png' onChange={changeProfilePic} />
        <label htmlFor="img-upload" className={`${styles.upload_label} ${isDark ? 'dark-mode-txt':''} col-12 col-md-4 text-center mb-2`}>
          {imgIsLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <i className="bi bi-cloud-arrow-up-fill"></i>}
          {t("Upload_cover_photo")}
        </label>
        <input className='d-none' id='img-upload' type="file" accept='.jpg, .png' onChange={changeImg} />
      </div>
      <div className="row justify-content-between mb-4 mt-4">
        <div className='col-12 col-md-4 text-center mb-2'>
          <img className={`${styles.img}`} src={formVals.profilePic} alt='profile-pic' />
        </div>
        <div className='col-12 col-md-4 text-center mb-2'>
          <img className={`${styles.img}`} src={formVals.coverPic} alt='cover-pic' />
        </div>
      </div>
      <div className='row justify-content-center mt-3'>
        <button type='submit' className={styles.register_btn} disabled={formErrs.userName !== null && formErrs.checkPassword !== null && formErrs.company !== null && formErrs.password !== null && formErrs.email !== null && formErrs.phoneNumber !== null && formErrs.profilePic !== null && formErrs.coverPic !== null}>{t("Register")}</button>
      </div>
    </form>
  )
}

export default RegisterationForm