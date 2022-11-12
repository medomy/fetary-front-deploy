import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { deleteRestaurant } from '../../services/restaurants';
import styles from './table_body_row.module.css'
import { removeItem } from '../../services/items';
import { getOneCompany, removecompany } from '../../services/companies';
import { getOneuser, removeuser } from '../../services/users';
import { removeOrder } from '../../services/orders';
import EditItemModal from '../../pages/dashboard/restaurants/edit_item_modal/edit_item_modal';
function TableRow({ ob, flag, handleDelete, windowWidth , editItemEffect }) {
    const [isChecked, setIsChecked] = useState(false);
    const [user, setUser] = useState({});
    const [company, setCompany] = useState({});
    const handleCheck = (event) => {
        setIsChecked(event.target.value);
    }
    const navigate = useNavigate();
    const goToEdit = () => {
        navigate(`edit/${ob.id}`);
    }
    const getUser = async () => {
        if (flag === "orders") {
            const _user = await getOneuser(ob.uId);
            console.log(_user);
            setUser(_user)
        }
        else if (flag === "users") {
            const _company = await getOneCompany(ob.companyId);
            setCompany(_company);
        }
    }
    useEffect(() => {
        getUser();
    }, []);
    return (
        <>
            {flag === 'restaurants' && windowWidth >= 720 ? <div className={`row ${styles.table_row} justify-content-center`}>
                <div className={`${styles.table_cell} col-md-1 col-sm-1 col-1 text-center`}>
                    <span>{ob.id}</span>
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <p>{ob.name_en}</p>
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <p>{ob.name_ar}</p>
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <img className={styles.img_style} src={ob.img_url} alt="restaurant image" />
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <img className={styles.img_style} src={ob.logo} alt="restaurant logo" />
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <p>{ob.phone_number}</p>
                </div>
                <div className='col-md-2 col-sm-3 col-3 text-center'>
                    <Link className={styles.details_link} to={`menu/${ob.id}`}>menu</Link>
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <span className={`btn`} onClick={goToEdit}>
                        <i className={`bi bi-pencil-fill ${styles.edit_btn}`}></i>
                    </span>
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <span className={`btn`} onClick={() => handleDelete(ob.id, isChecked)}>
                        <i className={`bi bi-trash-fill ${styles.delete_btn}`}></i>
                    </span>
                </div>
            </div> : flag === 'restaurants' && windowWidth < 720 ? <div className={`row ${styles.table_row} justify-content-center`}>
                <div className={`${styles.table_cell} col-md-1 col-sm-1 col-1 text-center`}>
                    <div className="form-check">
                        <span>{ob.id}</span>
                    </div>
                </div>
                <div className='col-md-1 col-sm-2 col-2 text-center'>
                    <p>{ob.name_en}</p>
                </div>
                <div className='col-md-1 col-sm-2 col-2 text-center'>
                    <img className={styles.img_style} src={ob.logo} alt="restaurant logo" />
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <p>{ob.phone_number}</p>
                </div>
                <div className='col-md-2 col-sm-1 col-1 text-center'>
                    <Link className={styles.details_link} to={`menu/${ob.id}`}>menu</Link>
                </div>
                <div className='col-md-1 col-sm-2 col-2 text-center'>
                    <span className={`btn`} onClick={goToEdit}>
                        <i className={`bi bi-pencil-fill ${styles.edit_btn}`}></i>
                    </span>
                </div>
                <div className='col-md-1 col-sm-2 col-2 text-center'>
                    <span className={`btn`} onClick={() => handleDelete(ob.id, isChecked)}>
                        <i className={`bi bi-trash-fill ${styles.delete_btn}`}></i>
                    </span>
                </div>
            </div> : flag === 'items' && windowWidth >= 720 ? <div className={`row ${styles.table_row} justify-content-center`}>
                <div className={`${styles.table_cell} col-md-1 col-sm-1 col-1 text-center`}>
                    <span>{ob.id}</span>
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <p>{ob.name_en}</p>
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <p>{ob.name_ar}</p>
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <img className={styles.img_style} src={ob.img_url} alt="meal image" />
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <p>{ob.restaurant_id}</p>
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <p>{ob.price}</p>
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <span className={`btn`} data-bs-toggle="modal" data-bs-target={`#editItemModal${ob.id}`}>
                        <i className={`bi bi-pencil-fill ${styles.edit_btn}`}></i>
                    </span>
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <span className={`btn`} onClick={() => handleDelete(ob.id, isChecked)}>
                        <i className={`bi bi-trash-fill ${styles.delete_btn}`}></i>
                    </span>
                </div>
                <EditItemModal item={ob} editItemEffect={editItemEffect}/>
            </div> : flag === 'items' && windowWidth < 720 ? <div className={`row ${styles.table_row} justify-content-center`}>
                <div className={`${styles.table_cell} col-md-1 col-sm-1 col-1 text-center`}>
                    <span>{ob.id}</span>
                </div>
                <div className='col-md-2 col-sm-3 col-3 text-center'>
                    <p>{ob.name_en}</p>
                </div>
                <div className='col-md-1 col-sm-2 col-2 text-center'>
                    <img className={styles.img_style} src={ob.img_url} alt="meal image" />
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <p>{ob.restaurant_id}</p>
                </div>
                <div className='col-md-1 col-sm-2 col-2 text-center'>
                    <span className={`btn`} data-bs-toggle="modal" data-bs-target={`#editItemModal${ob.id}`}>
                        <i className={`bi bi-pencil-fill ${styles.edit_btn}`}></i>
                    </span>
                </div>
                <div className='col-md-1 col-sm-2 col-2 text-center'>
                    <span className={`btn`} onClick={() => handleDelete(ob.id, isChecked)}>
                        <i className={`bi bi-trash-fill ${styles.delete_btn}`}></i>
                    </span>
                </div>
                <EditItemModal item={ob} editItemEffect={editItemEffect}/>
            </div> : flag === 'companies' && windowWidth >= 720 ? <div className={`row ${styles.table_row} justify-content-center`}>
                <div className={`${styles.table_cell} col-md-1 col-sm-1 col-1 text-center`}>
                    <span>{ob.id}</span>
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <p>{ob.name_en}</p>
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <p>{ob.name_ar}</p>
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <img className={styles.img_style} src={ob.img_url} alt="company image" />
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <img className={styles.img_style} src={ob.img_url} alt="company logo" />
                </div>
                <div className='col-md-3 col-sm-3 col-3 text-center'>
                    <p>{ob.address}</p>
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <span className={`btn`} onClick={goToEdit}>
                        <i className={`bi bi-pencil-fill ${styles.edit_btn}`}></i>
                    </span>
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <span className={`btn`} onClick={() => handleDelete(ob.id, isChecked)}>
                        <i className={`bi bi-trash-fill ${styles.delete_btn}`}></i>
                    </span>
                </div>
            </div> : flag === 'companies' && windowWidth < 720 ? <div className={`row ${styles.table_row} justify-content-center`}>
                <div className={`${styles.table_cell} col-md-1 col-sm-2 col-2 text-center`}>
                    <span>{ob.id}</span>
                </div>
                <div className='col-md-2 col-sm-3 col-3 text-center'>
                    <p>{ob.name_en}</p>
                </div>
                <div className='col-md-1 col-sm-2 col-2 text-center'>
                    <img className={styles.img_style} src={ob.img_url} alt="company logo" />
                </div>
                <div className='col-md-1 col-sm-2 col-2 text-center'>
                    <span className={`btn`} onClick={goToEdit}>
                        <i className={`bi bi-pencil-fill ${styles.edit_btn}`}></i>
                    </span>
                </div>
                <div className='col-md-1 col-sm-2 col-2 text-center'>
                    <span className={`btn`} onClick={() => handleDelete(ob.id, isChecked)}>
                        <i className={`bi bi-trash-fill ${styles.delete_btn}`}></i>
                    </span>
                </div>
            </div> : flag === 'orders' && windowWidth >= 720 ? <div className={`row ${styles.table_row} justify-content-center align-items-center`}>
                <div className={`${styles.table_cell} col-md-1 col-sm-1 col-1 text-center`}>
                    <span>{ob.id}</span>
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <p>{user.user_name}</p>
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <p>{ob.items_price === 0 ? 'N/A' : ob.items_price}</p>
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <Link to={`details/${ob.id}`} className={styles.details_link}>details</Link>
                </div>
                <div className='col-md-3 col-sm-3 col-3 text-center'>
                    <p>{ob.date}</p>
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <span>
                        {ob.is_payed=== 0 ? <i className={`bi bi-x-octagon-fill ${styles.delete_btn}`}></i> : <i className={`bi bi-check-circle-fill ${styles.edit_btn}`}></i>}
                    </span>
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <span className={`btn`} onClick={() => handleDelete(ob.id, isChecked)}>
                        <i className={`bi bi-trash-fill ${styles.delete_btn}`}></i>
                    </span>
                </div>
            </div> : flag === 'orders' && windowWidth < 720 ? <div className={`row ${styles.table_row} justify-content-center align-items-center`}>
                <div className={`${styles.table_cell} col-md-1 col-sm-1 col-1 text-center`}>
                    <span>{ob.id}</span>
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <p>{user.user_name}</p>
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <Link to={`details/${ob.id}`} className={styles.details_link}>details</Link>
                </div>
                <div className='col-md-3 col-sm-3 col-3 text-center'>
                    <p>{ob.date}</p>
                </div>
                <div className='col-md-1 col-sm-2 col-2 text-center'>
                    <span>
                        {ob.is_payed=== 0 ? <i className={`bi bi-x-octagon-fill ${styles.delete_btn}`}></i> : <i className={`bi bi-check-circle-fill ${styles.edit_btn}`}></i>}
                    </span>
                </div>
                <div className='col-md-1 col-sm-2 col-2 text-center'>
                    <span className={`btn`} onClick={() => handleDelete(ob.id, isChecked)}>
                        <i className={`bi bi-trash-fill ${styles.delete_btn}`}></i>
                    </span>
                </div>
            </div> : flag === "users" && windowWidth >= 720 ? <div className={`row ${styles.table_row} justify-content-center`}>
                <div className={`${styles.table_cell} col-md-1 col-sm-1 col-1 text-center`}>
                    <span>{ob.uId}</span>
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <p>{ob.user_name}</p>
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <p>{ob.email}</p>
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <img className={styles.img_style} src={company.logo} alt="company logo" />
                </div>
                <div className='col-md-2 col-sm-2 col-2 text-center'>
                    <p>{ob.mobile_number}</p>
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <img className={styles.img_style} src={ob.photo_Url} alt="avatar" />
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <p>{ob.role}</p>
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <span className={`btn`} onClick={() => handleDelete(ob.uId, isChecked)}>
                        <i className={`bi bi-trash-fill ${styles.delete_btn}`}></i>
                    </span>
                </div>
            </div> : flag === "users" && windowWidth < 720 ? <div className={`row ${styles.table_row} justify-content-center`}>
                <div className={`${styles.table_cell} col-md-1 col-sm-1 col-1 text-center`}>
                    <span>{ob.uId}</span>
                </div>
                <div className='col-md-2 col-sm-3 col-3 text-center'>
                    <p>{ob.user_name}</p>
                </div>
                <div className='col-md-2 col-sm-3 col-3 text-center'>
                    <p>{ob.email}</p>
                </div>
                <div className='col-md-1 col-sm-2 col-2 text-center'>
                    <img className={styles.img_style} src={ob.photo_Url} alt="avatar" />
                </div>
                <div className='col-md-1 col-sm-1 col-1 text-center'>
                    <p>{ob.role}</p>
                </div>
                <div className='col-md-1 col-sm-2 col-2 text-center'>
                    <span className={`btn`} onClick={() => handleDelete(ob.uId, isChecked)}>
                        <i className={`bi bi-trash-fill ${styles.delete_btn}`}></i>
                    </span>
                </div>
            </div> : null}
        </>
    )
}

export default TableRow