import React from 'react'
import { useTranslation } from 'react-i18next'
import EditItems from '../../items/edit_items/edit_items'

function EditItemModal({ item, restaurant_id, editItemEffect }) {
    const { t } = useTranslation();
    return (
        <div className="modal fade" id={`editItemModal${item.id}`} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{t("edit_Item")}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className='modal-body'>
                        <EditItems item={item} editItemEffect={editItemEffect}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditItemModal