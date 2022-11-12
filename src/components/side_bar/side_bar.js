import React, { useState } from "react";
import SideBarElement from "../side_bar_element/side_bar_element";
import styles from './side_bar.module.css';

export default function SideBar() {
    // 'restaursnts' , 'orders' , 'users' , 'companies' , 'items'
    const [entities , setEntities] = useState([{
        name: 'restaurants',
        icon: 'bi bi-cup-hot-fill'
    },
    {
        name: 'orders',
        icon: 'bi bi-cart-check-fill'
    },
    {
        name: 'users',
        icon: 'bi bi-person-fill'
    },
    {
        name: 'companies',
        icon: 'bi bi-building'
    },
    {
        name: 'items',
        icon: 'bi bi-tag-fill'
    },
]);
    return (
        <>
            <aside className={`${styles.side_bar} col-md-3 `}>
                <div className={`${styles.logo_wrap}`}>
                    <h2 className={`${styles.logo}`}>
                        Fetary
                    </h2>
                </div>
                {entities.map((entity , i)=>{
                    return (
                        <SideBarElement entity={entity.name} key={entity.name} icon={entity.icon}/>
                    )
                })}
            </aside>
        </>
    )
}