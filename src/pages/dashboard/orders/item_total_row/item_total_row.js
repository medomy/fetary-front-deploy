import React , {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { getOneItem } from '../../../../services/items';
function ItemsTotalRow({element}) {
    const [total,setTotal] = useState(0);
    const [item,setItem] = useState({});
    const lang = useSelector((state)=> state.lang.lang);
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const calcTotal = ()=>{
        let _total = element.count * element.price;
        setTotal(_total);
    }
    const getData = async ()=>{
        try{
            const _item =await getOneItem(element.item_id);
            console.log(_item);
            setItem(_item);
        }catch(err){
            alert('error has happened');
        }
    }
    useEffect(()=>{
        getData();
        calcTotal();
    },[])
  return (
    <div className='d-flex justify-content-center my-3'>
        <div className={`mx-5`}>
            <p>{element.count} x {lang === "ar" ? item.name_ar : item.name_en}</p>
        </div>
        <div className={`mx-5`}>
            <p>{total}</p>
        </div>
    </div>
  )
}

export default ItemsTotalRow