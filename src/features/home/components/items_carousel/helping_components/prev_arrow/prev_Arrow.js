import React from 'react'
import styles from './prev_Arrow.module.css'
function PrevArrow({className, style, onClick}) {
    return (
        // <div
        //   className={`${className} ${styles.next_btn}`}
        //   style={{ ...style}}
        //   onClick={onClick}
        // />
        <button type='button' className={`${styles.prev_btn}`} onClick={onClick}>
            <i className="bi bi-chevron-left"></i>
        </button>
      )
}

export default PrevArrow