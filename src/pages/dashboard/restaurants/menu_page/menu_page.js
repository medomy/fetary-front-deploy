import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import Toast from '../../../../components/toast/toast'
import { getItemsOneRestaurant, removeItem } from '../../../../services/items'
import { getAllRestaurants } from '../../../../services/restaurants'
import AddItemModal from '../add_item_modal/add_item_modal'
import MenuComponent from '../menu/menu_comp'
import styles from './menu_page.module.css'
function MenuPage() {
    const params = useParams();
    const { t } = useTranslation();
    const [items, setItems] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const onInit = async () => {
        try {
            const _items = await getItemsOneRestaurant(params.id);
            setItems(_items);
        } catch (err) {
            console.log(err);
        }
    }
    const deleteItem = async (id) => {
        try {
            await removeItem(id);
            const _items = await getItemsOneRestaurant(params.id);
            setItems(_items);
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000)
        } catch (err) {
            console.log(err);
        }
    }
    const getNewData = async (data) => {
        if (data == 'hide') {
            try {
                const _items = await getItemsOneRestaurant(params.id);
                setItems(_items);
            } catch (err) {
                console.log(err);
            }
        }
    }
    useEffect(() => {
        onInit();
    }, []);
    return (
        <section className={`container-fluid ${styles.menu_page}`}>
            <div className='my-4'>
                <MenuComponent items={items} handleDelete={deleteItem} editItemEffect={getNewData} />
            </div>
            <div className='row justify-content-center'>
                <div className='col-md-4 col-8'>
                    <button type="button" className="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#addItemModal">
                        {t("add_an_item")}
                    </button>
                    <AddItemModal restaurant_id={params.id} addNewItem={getNewData} />
                </div>
            </div>
            {showToast ? <Toast messege={'deleted successfully'}/> : null}
        </section>
    )
}

export default MenuPage