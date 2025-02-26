import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'
import Context from '../context'

const VerticalCart = ({loading, data=[]}) => {
    const loadingList=new Array(11).fill(null)
    const { fetchUserAddTocart }= useContext(Context)
    
    const  handleAddToCart =async(e,id)=>{
      await addToCart(e,id)
      fetchUserAddTocart()
    }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all' >

    
            {
              loading ? (
                loadingList.map((product, index)=>{
                  return(
                        <div className='w-full min-w-[280px] max-w-[280px] md:min-w-[300px] md:max-w-[300px] bg-white rounded-sm shadow '>
                              <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>

                              </div>
                              <div className='p-4 grid gap-3'>
                                <h2 className='capitalize font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse bg-slate-200 rounded-full'></h2>
                                <p className='capitalize text-slate-500 p-1 animate-pulse bg-slate-200 rounded-full py-2'></p>
                                <div className='flex gap-4'>
                                <p className='text-red-600 font-medium p-1 animate-pulse bg-slate-200 rounded-full w-full py-2'></p>
                                <p className='text-slate-500 line-through p-1 animate-pulse bg-slate-200 rounded-full w-full py-2'></p>
                                </div>
                                <button className='text-sm  text-white px-3 py-2 p-1 animate-pulse bg-slate-200 rounded-full '></button>
                              </div>
                          </div>
                  )
              })
              ):(
                data.map((product, index)=>{
                  return(
                        <Link to={"/product/"+product?._id} className='w-full min-w-[280px]  max-w-[280px] md:min-w-[300px] md:max-w-[300px] bg-white rounded-sm shadow ' onClick={scrollTop}>
                              <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                              <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                              </div>
                              <div className='p-4 grid gap-3'>
                                <h2 className='capitalize font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                <p className='capitalize text-slate-500'>{product?.category}</p>
                                <div className='flex gap-4'>
                                <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                </div>
                                <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'onClick={(e)=>handleAddToCart(e,product?._id) }>Add to Card</button>
                              </div>
                          </Link>
                  )
              })
              )
            }
        </div>
  )
}

export default VerticalCart