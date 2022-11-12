import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';

function ReceiptElement({element}) {
    const [total,setTotal] = useState(0);
    const lang = useSelector((state)=> state.lang.lang);
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    const calcTotal = ()=>{
        let _total = element.count * element.price;
        setTotal(_total);
    }
    useEffect(()=>{
        calcTotal();
    },[])
  return (
    <div className='d-flex justify-content-center my-3'>
        <div className={`mx-2 ${isDark? 'dark-mode-txt':''}`}>
            <p>{element.count} x {lang === "ar" ? element.name_ar : element.name_en}</p>
        </div>
        <div className={`mx-1 ${isDark? 'dark-mode-txt':''}`}>
            <p>{total}</p>
        </div>
    </div>
  )
}

export default ReceiptElement