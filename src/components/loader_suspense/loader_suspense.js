import React from 'react'
import styles from './loader_suspense.module.css'
function LoaderSuspense() {
    return (
        <div className='container-fluid'>
            <div className={`row justify-content-center align-items-center ${styles.loader_wrap}`}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default LoaderSuspense