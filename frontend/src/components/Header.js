import React from 'react'
import Logo from './Logo'
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import SummaryApi from '../common';

const Header = () => {

  const user=useSelector(state => state?.user?.user)

  console.log("user header", user)

  const handleLogout = async()=>{
   const fetchData=await fetch(SummaryApi.logout_user.url,{
    method:SummaryApi.logout_user.method,
    credentials:'include'
   })
    const data= await fetchData.json()

    if(data.success){
      toast.success(data.message)
    }
    if(data.error){
      toast.error(data.message)
    }
  }
  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
             <Logo w={90} h={50}/>
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
          <input type='text' placeholder='search product here... ' className='w-full outline-none'/>
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full'>
           <CiSearch/>
          </div>
        </div>


        <div className=' flex items-center justify-between gap-7'>
          <div className='text-3xl cursor-pointer'>
          {
            user?.profilePic ? (
            <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name}/>
           ) : (
             <FaRegCircleUser />
           )
          }
          </div>
          <div className='text-2xl relative'>
            <span><FaShoppingCart/></span>
            
            <div className='bg-red-600 text-white h-5 w-5 p-1 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
            <p className='text-xl'>2</p>
            </div>
          </div>
          <div>
            {
              user?._id ?(
                <button onClick={handleLogout} className='px-3 py-1 bg-red-600 hover:bg-red-700 rounded-full text-white'>Logout</button>
              ):(<Link to={"/login"} className='px-3 py-1 bg-red-600 hover:bg-red-700 rounded-full text-white'>Login</Link>)
            }
          </div>
        </div>
        
      </div>
    </header>

  )
}

export default Header
