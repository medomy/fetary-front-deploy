import React from 'react'
import styles from './toast.module.css'
function Toast({messege}) {
    return (
        <div className={styles.toast_wrap}>
            <div class="toast show align-items-center bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body text-light">
                        {messege}
                    </div>
                    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
    )
}

export default Toast