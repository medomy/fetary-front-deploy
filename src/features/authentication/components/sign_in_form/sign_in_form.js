import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLoggedIn, setUser } from '../../../../store/reducers/user_slice/user_slice';
import { signIn } from '../../services/sign_in';
import styles from './sign_in_form.module.css'
function SignInForm() {
    const [isPassword, setIsPassword] = useState(true);
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const [remember_checked, setRemember_cheched] = useState(false);
    const [signErrs, setSignErrs] = useState({
        notUser: null,
        forgotPassword: null
    });
    const {t} =useTranslation();
    const navigate = useNavigate();
    const globalUser = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [userVals, setUserVals] = useState({
        email: '',
        password: ''
    })
    const [userErrs, setUserErrs] = useState({
        email: '',
        password: ''
    })
    const setVals = (e) => {
        e.target.name === "email" ? setUserVals({ ...userVals, email: e.target.value }) :
            setUserVals({ ...userVals, password: e.target.value });
    }
    const setErrors = (e) => {
        if (e.target.name === "email") {
            e.target.value.length === 0 ? setUserErrs({ ...userErrs, email: 'email is required' }) :
                !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value) ? setUserErrs({ ...userErrs, email: 'email is not valid' }) :
                    setUserErrs({ ...userErrs, email: null })
        }
        else if (e.target.name === "password") {
            e.target.value.length === 0 ? setUserErrs({ ...userErrs, password: 'password is required' }) :
                !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value) ? setUserErrs({ ...userErrs, password: 'Minimum eight characters, at least one letter and one number' }) :
                    setUserErrs({ ...userErrs, password: null })
        }
    }
    const checkRemember = () => {
        setRemember_cheched((prev) => !prev);
    }
    const submit = async (e) => {
        e.preventDefault();
        try {
            if (userErrs.email === null && userErrs.password === null) {
                console.log(userErrs);
                const user = await signIn(userVals.email, userVals.password, remember_checked);
                console.log(user);
                if (user) dispatch(setUser(user));
                else setSignErrs({ forgotPassword: "", notUser: "seems this user is not registered" });
                if (user) {
                    dispatch(setLoggedIn(true));
                    navigate(`/`);
                }
                console.log(user, globalUser);
            }
        } catch (err) {
            setSignErrs({ notUser: "", forgotPassword: "Ooops seems you forgot your password" });
            console.log(err);
        }
    }
    const passwordSet = () => {
        setIsPassword((prev) => !prev);
    }
    return (
        <form onSubmit={submit}>
            <div className='mb-2 text-center'>
                <h2>{t("login")}</h2>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className={`form-label ${isDark? 'dark-mode-txt':''}`}>{t("Email_address")}</label>
                <input type="email" className={`form-control ${userErrs.email === null ? 'is-valid' : userErrs.email === "" ? '' : userErrs.email !== null ? 'is-invalid' : ''}`} id="email" name='email' placeholder="name@example.com" onChange={setVals} onBlur={setErrors} />
                {userErrs.email ? <p className='text-danger'>{userErrs.email}</p> : null}
            </div>
            <div className={`mb-3 ${styles.password_area}`}>
                <label htmlFor="password" className={`form-label ${isDark? 'dark-mode-txt':''}`}>{t("Password")}</label>
                <input type={isPassword ? 'password' : 'text'} className={`form-control ${userErrs.password === null ? 'is-valid' : userErrs.password === "" ? '' : userErrs.password !== null ? 'is-invalid' : ''}`} id="password" name='password' onChange={setVals} placeholder="name@example.com" onBlur={setErrors} />
                <span className={`btn ${styles.show_password_btn}`} onClick={passwordSet}>
                    {isPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                </span>
                {userErrs.password ? <p className='text-danger'>{userErrs.password}</p> : null}
            </div>
            <div className='row mt-2 justify-content-between align-items-center'>
                <div className="form-check col-5">
                    <input className="form-check-input" type="checkbox" value={remember_checked} onChange={checkRemember} id="remember_check" />
                    <label className={`form-check-label ${isDark?'dark-mode-txt':''}`} htmlFor="remember_check">
                        {t("remember_me")}
                    </label>
                </div>
                <div className='col-4'>
                    <Link className={`${styles.link} ${isDark? 'dark-mode-links':''}`} to="/register">{t("First_time")}</Link>
                </div>
            </div>
            <div className='mt-5 text-center row justify-content-center'>
                <button type='submit' className={`btn ${styles.sign_in_btn}`}>
                    {t("login")}
                </button>
                {userErrs.password || userErrs.email ? <p className='text-danger'>{t("seems_like_something_is_wrong")}</p> : null}
                {signErrs.notUser ? <p className='text-danger'>{signErrs.notUser}</p> : null}
                {signErrs.forgotPassword ? <p className='text-danger'>{signErrs.forgotPassword}</p> : null}

            </div>
        </form>
    )
}

export default SignInForm