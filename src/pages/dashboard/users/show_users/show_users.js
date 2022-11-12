import React,{useState , useEffect, useCallback} from 'react'
import { getAllusers } from '../../../../services/users';
import styles from './show_users.module.css'
import EntitiesTable from '../../../../components/entities_table/entities_table';
import Toast from '../../../../components/toast/toast';
function ShowUsers() {
    //TODO: refactor code and remove width states
    const [windowWidth , setWindowWidth] = useState(window.innerWidth);
    const [cols,setCols] = useState([]);
    const [users,setUsers] = useState([]);
    const [removed,setRemoved]= useState(false);
    const [flag,setFlag] = useState('users');
    const changeWidth = useCallback(()=>{
        setWindowWidth(window.innerWidth);
    },[window.innerWidth])
    const changeCols = ()=>{
        if(windowWidth < 720) {
            setCols([
                {
                    name : 'uId',
                    col_md: 1,
                    col_sm: 1,
                    col_xs:1,
                },
                {
                    name : 'user_name',
                    col_md: 2,
                    col_sm: 3,
                    col_xs:3,
                    
                },
                {
                    name : 'email',
                    col_md: 2,
                    col_sm: 3,
                    col_xs:3,
                    
                },
                {
                    name : 'img',
                    col_md: 1,
                    col_sm: 2,
                    col_xs:2,
                    
                },
                {
                    name : 'role',
                    col_md: 1,
                    col_sm: 1,
                    col_xs:1,
                    
                },
                {
                    name : 'delete',
                    col_md: 1,
                    col_sm: 2,
                    col_xs:2,
                    
                }
            ])
        }
        else {
            setCols([
                {
                    name : 'uId',
                    col_md: 1,
                    col_sm: 1,
                    col_xs:1,
                },
                {
                    name : 'user_name',
                    col_md: 2,
                    col_sm: 2,
                    col_xs:2,
                    
                },
                {
                    name : 'email',
                    col_md: 2,
                    col_sm: 2,
                    col_xs:2,
                    
                },
                {
                    name : 'company',
                    col_md: 2,
                    col_sm: 2,
                    col_xs:2,
                    
                },
                {
                    name : 'phone',
                    col_md: 2,
                    col_sm: 2,
                    col_xs:2,
                    
                },
                {
                    name : 'img',
                    col_md: 1,
                    col_sm: 1,
                    col_xs:1,
                    
                },
                {
                    name : 'role',
                    col_md: 1,
                    col_sm: 1,
                    col_xs:1,
                    
                },
                {
                    name : 'delete',
                    col_md: 1,
                    col_sm: 1,
                    col_xs:1,
                    
                }
            ])
        }
    }
    const getData =async ()=>{
        try{
            const _users = await getAllusers();
            setUsers(_users);
        }catch(err){
            console.log(err);
        }
    }
    const removedUser= (isRemoved)=>{
        if(isRemoved) setRemoved(isRemoved);
        setTimeout(()=>{
            setRemoved(false);
        },3000)
    }
    useEffect(()=>{
        getData();
        window.addEventListener('resize' , changeWidth);
        return ()=> window.removeEventListener('resize' , changeWidth);
    },[])
    useEffect(()=>{
        changeCols();
    },[windowWidth])
  return (
    <section className='container-fluid'>
        <div className='row'>
            <div className={`${styles.pageSec}`}>
                <EntitiesTable columns={cols} obs={users} flag={flag} deletedOrNot={removedUser}/>
            </div>
        </div>
        {removed ? <div className='toast_wrap'>
            <Toast messege={'deleted successfully'}/>
        </div> : null}
    </section>
  )
}

export default ShowUsers