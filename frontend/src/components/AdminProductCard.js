import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';

const AdminProductCard = ({
   data,
   fetchData
}) => {
  const [editProduct, setEditProduct]=useState (false)
  return (
    <div className='bg-white p-4 rounded'>
        <img src={data?.productImage?.[0]} width={120} height={120} alt="Data" />
        <h1>{data.productName}</h1>

        <div className='w-fit ml-auto p-2 bg-green-100
                     hover:bg-green-600 rounded-full
                      hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
           <MdModeEdit />
        </div>
        {
            editProduct && (
                <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchData={fetchData}/>
            )
        }
        
  </div>
  )
}

export default AdminProductCard