import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneuser, updateuser } from '../../../../services/users';
import { setUser } from '../../../../store/reducers/user_slice/user_slice';
import Validators from '../../../../utils/validators/validators';
import { checkPassword } from '../../../authentication/components/utils/checkPassword';
import styles from './userData.module.css'
function UserDataProfile() {
    const [formErrs, setFormErrs] = useState({
        userName: '',
        mobileNum: '',
        currentPassword: '',
        changePassword: '',
        checkChangePassword: ''
    })
    const {t} = useTranslation();
    const [isCurrentPassword, setIsCurrentPassword] = useState(true);
    const [isChangedPassword, setIsChangedPassword] = useState(true);
    const [isConfirmedChangedPassword, setIsConfirmedChangedPassword] = useState(true);
    const [changedPasswordTouched, setChangedPasswordTouched] = useState(false);
    const [confirmChangedPasswordTouched, setConfirmChangedPasswordTouched] = useState(false);
    const [saveMessege, setSaveMessege] = useState('');
    const [currentUser , setCurrentUser] = useState({});
    const user = useSelector((state) => state.user.user);
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const dispatch = useDispatch();
    const params = useParams();
    const userNameRef = useRef();
    const mobileNumberRef = useRef();
    const currentPasswordRef = useRef();
    const changePasswordRef = useRef();
    const checkChangePasswordRef = useRef();

    const setErrors = (e) => {
        if (e.target.name === 'user_name') {
            userNameRef.current.value.length === 0 ? setFormErrs({ ...formErrs, userName: 'this field is required' }) :
                setFormErrs({ ...formErrs, userName: null })
        }
        else if (e.target.name === 'mobile_number') {
            mobileNumberRef.current.value.length === 0 ? setFormErrs({ ...formErrs, mobileNum: 'field is required' }) :
                !Validators.validatePhoneNumber(mobileNumberRef.current.value) ? setFormErrs({ ...formErrs, mobileNum: 'does not match Egyptian phone number' }) :
                    setFormErrs({ ...formErrs, mobileNum: null })
        }
        else if (e.target.name === 'changed_password') {
            !Validators.validatePassword(changePasswordRef.current.value) ? setFormErrs({ ...formErrs, changePassword: 'at least 8 charachter 1 charachter and 1 number' }) :
                setFormErrs({ ...formErrs, changePassword: null });
            setChangedPasswordTouched(true);
        }
        else if (e.target.name === 'check_changed_password') {
            !checkPassword(changePasswordRef.current.value, checkChangePasswordRef.current.value) ? setFormErrs({ ...formErrs, checkChangePassword: 'does not match password' }) :
                setFormErrs({ ...formErrs, checkChangePassword: null });
            setConfirmChangedPasswordTouched(true);
        }
    }
    const saveChanges = async (e) => {
        console.log(userNameRef.current.value);
        e.preventDefault();
        if (changedPasswordTouched && confirmChangedPasswordTouched) {
            await updateuser(params.id, {
                user_name: userNameRef.current.value,
                mobile_number: mobileNumberRef.current.value,
                old_password: currentPasswordRef.current.value,
                password: changePasswordRef.current.value
            })
            setSaveMessege('new data saved');
        }
        else {
            await updateuser(params.id, {
                user_name: userNameRef.current.value,
                mobile_number: mobileNumberRef.current.value,
            })
            setSaveMessege('new data saved');
        }
        const newUser = await getOneuser(params.id);
        // dispatch(setUser(newUser));
        console.log(newUser);
    }
    const onInit =async () => {
        const _user = await getOneuser(params.id);
        setCurrentUser(_user);
        userNameRef.current.value = currentUser.user_name ?? _user.user_name;
        mobileNumberRef.current.value = currentUser.mobile_number ?? _user.user_name;
    }
    useEffect(() => {
        onInit();
    }, [])
    const passwordSet = () => {
        setIsCurrentPassword((prev) => !prev);
    }
    const newPasswordSet = () => {
        setIsChangedPassword((prev) => !prev);
    }
    const checkNewPasswordSet = () => {
        setIsConfirmedChangedPassword((prev) => !prev);
    }
    return (
        <section className={styles.profile_form_sec}>
            <form onSubmit={saveChanges}>
                <h2>{t("General_Info")}:</h2>
                <div className='mb-3'>
                    <label htmlFor="user_name" className={`form-label ${isDark ? 'dark-mode-txt':''}`}> {t("User_name")}</label>
                    <input type="text" className={`form-control ${formErrs.userName === null ? 'is-valid' : formErrs.userName === "" ? '' : formErrs.userName !== null ? 'is-invalid' : ''}`} id="user_name" name='user_name' placeholder="user name ..." ref={userNameRef} onBlur={setErrors} />
                    {formErrs.userName ? <p className='text-danger'>{formErrs.userName}</p> : null}
                </div>
                <div className='mb-3'>
                    <label htmlFor="mobile_number" className={`form-label ${isDark? 'dark-mode-txt':''}`}> {t("mobile_number")}</label>
                    <input type="text" className={`form-control ${formErrs.mobileNum === null ? 'is-valid' : formErrs.mobileNum === "" ? '' : formErrs.mobileNum !== null ? 'is-invalid' : ''}`} id="mobile_number" name='mobile_number' ref={mobileNumberRef} onBlur={setErrors} />
                    {formErrs.mobileNum ? <p className='text-danger'>{formErrs.mobileNum}</p> : null}
                </div>
                <h2>change password</h2>
                <div className={`mb-3 ${styles.password_area}`}>
                    <label htmlFor="current_password" className={`form-label ${isDark? 'dark-mode-txt':''}`}>{t("Current_Password")}</label>
                    <input type={isCurrentPassword ? 'password' : 'text'} className={`form-control ${formErrs.currentPassword === null ? 'is-valid' : formErrs.currentPassword === "" ? '' : formErrs.currentPassword !== null ? 'is-invalid' : ''}`} id="current_password" name='current_password' ref={currentPasswordRef} onBlur={setErrors} />
                    <span className={`btn ${styles.show_password_btn}`} id='current' onClick={passwordSet}>
                        {isCurrentPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                    </span>
                    {formErrs.currentPassword ? <p className='text-danger'>{formErrs.currentPassword}</p> : null}
                </div>
                <div className={`mb-3 ${styles.password_area}`}>
                    <label htmlFor="changed_password" className={`form-label ${isDark? 'dark-mode-txt':''}`}>{t("new_Password")}</label>
                    <input type={isChangedPassword ? 'password' : 'text'} className={`form-control ${formErrs.changePassword === null ? 'is-valid' : formErrs.changePassword === "" ? '' : formErrs.changePassword !== null ? 'is-invalid' : ''}`} id="changed_password" name='changed_password' ref={changePasswordRef} onBlur={setErrors} />
                    <span className={`btn ${styles.show_password_btn}`} id='change' onClick={newPasswordSet}>
                        {isChangedPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                    </span>
                    {formErrs.changePassword ? <p className='text-danger'>{formErrs.changePassword}</p> : null}
                </div>
                <div className={`mb-3 ${styles.password_area}`}>
                    <label htmlFor="check_changed_password" className={`form-label ${isDark?'dark-mode-txt':''}`}>{t("confirm_new_Password")}</label>
                    <input type={isConfirmedChangedPassword ? 'password' : 'text'} className={`form-control ${formErrs.checkChangePassword === null ? 'is-valid' : formErrs.checkChangePassword === "" ? '' : formErrs.checkChangePassword !== null ? 'is-invalid' : ''}`} id="check_changed_password" name='check_changed_password' ref={checkChangePasswordRef} onBlur={setErrors} />
                    <span className={`btn ${styles.show_password_btn}`} id='confirm_change' onClick={checkNewPasswordSet}>
                        {isConfirmedChangedPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                    </span>
                    {formErrs.checkChangePassword ? <p className='text-danger'>{formErrs.checkChangePassword}</p> : null}
                </div>
                <div className='row justify-content-center'>
                    <div className='col-md-5 col-10'>
                        <button type='submit' className={styles.update_btn}>{t("save_changes")}</button>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    {saveMessege ? <p className='text-success'>{saveMessege}</p> : null}
                </div>
            </form>
        </section>
    )
}

export default UserDataProfile