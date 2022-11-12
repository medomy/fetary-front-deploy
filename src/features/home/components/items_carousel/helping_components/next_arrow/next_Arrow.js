import React from 'react'
import styles from './next_Arrow.module.css'
function NextArrow({className, style, onClick}) {
  return (
    // <div
    //   className={`${className} ${styles.next_btn}`}
    //   style={{ ...style}}
    //   onClick={onClick}
    // />
    <button type='button' className={`${styles.next_btn}`} onClick={onClick}>
        <i className="bi bi-chevron-right"></i>
    </button>
  )
}

export default NextArrow