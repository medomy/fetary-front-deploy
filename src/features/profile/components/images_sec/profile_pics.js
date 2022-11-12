import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneuser } from '../../../../services/users';
import styles from './profile_pics.module.css'

function ProfilePicsSec() {
    const [user,setUser] = useState({});
    const params = useParams();
    const onInit = async ()=>{
      try{
        const _user = await getOneuser(params.id);
        console.log(_user);
        setUser(_user);
      }catch(err){
        console.log(err);
      }
    }
    useEffect(()=>{
      onInit();
    },[])    
  return (
    <div className={`row ${styles.cover_img}`} style={{backgroundImage : `url(${user.img_url})`}}>
        <div className={styles.profile_pic}>
            <img className={styles.profile_img} src={user.photo_Url} alt='profile-pic'/>
        </div>
    </div>
  )
}

export default ProfilePicsSec