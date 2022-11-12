import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './side_bar_element.module.css';

const SideBarElement = ({ entity, icon }) => {
    //TODO: orders and users don't have add option
    const [options, setOptions] = useState([]);
    useEffect(() => {
        if (entity === 'orders' || entity === 'users') {
            console.log('here');
            setOptions([{
                name: 'show',
                link: `/admin/${entity}`
            }])
        }
        else {
            setOptions([{
                name: 'show',
                link: `/admin/${entity}`
            },
            {
                name: 'add',
                link: `/admin/${entity}/add`
            }])
        }
    }, [])
    const [isClicked, setIsClicked] = useState(false);
    const setClicked = () => {
        setIsClicked((prev) => !prev);
    }
    return (
        <>
            <div className={`${styles.element_side_wrap}`}>
                <div className={`${styles.element_side}`} onClick={setClicked}>
                    <div className={`${styles.name_area}`}>
                        <i className={icon}></i>
                        <p className={`${styles.element_para}`}>{entity}</p>
                    </div>
                    {isClicked ? <i className={`bi bi-caret-down-fill ${styles.icon}`}></i> : <i className={`bi bi-caret-right-fill ${styles.icon}`}></i>}
                </div>
                {isClicked ? <div className={`${styles.options_wrap}`}>
                    {options.map((option, i) => <NavLink className={`${styles.link}`} to={option.link} key={option.name} activeclassname={`${styles.active_link}`}>{option.name}</NavLink>)}
                </div> : null}
            </div>
        </>
    )
}

export default SideBarElement