import React from 'react'
import { useRef } from 'react'
import AddItem from '../../items/add_items/add_items'
import { useEffect } from 'react';
import createAndHideModal from '../../../../utils/create_modal/create_modal';
import { useTranslation } from 'react-i18next';
function AddItemModal({ restaurant_id, addNewItem }) {
    const modalRef = useRef();
    const {t} = useTranslation();
    const showHide = (data) => {
        if (data == 'hide') {
            //console.log(data);
            addNewItem(data);
            // createAndHideModal(modalRef.current);
        }
    }
    useEffect(()=>{
        // console.log(typeof(document.getElementById('addItemModal')));
        // console.log(typeof(modalRef.current));
    },[])

    return (
        <div ref={modalRef} className="modal fade" id="addItemModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{t("add_Item")}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className='modal-body'>
                        <AddItem restaurant_id={restaurant_id} finishModalBusinness={showHide} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItemModal