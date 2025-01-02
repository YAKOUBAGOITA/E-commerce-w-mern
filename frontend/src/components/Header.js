import React, { useState, useContext } from 'react';
import Logo from './Logo'
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import SummaryApi from '../common';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {

  const user=useSelector(state => state?.user?.user);
  const dispatch=useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context= useContext(Context)
 
  const handleLogout = async()=>{
   const fetchData=await fetch(SummaryApi.logout_user.url,{
    method:SummaryApi.logout_user.method,
    credentials:'include'
   })
    const data= await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
    }
    if(data.error){
      toast.error(data.message)
    }
  }

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
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
        
         <div className='relative flex justify-center '>
          {
            user?._id &&(
         <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>{setMenuDisplay(preve => !preve)}}>
           {
                 user?.profilePic ? (
                 <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name}/>
               ) : (
                <FaRegCircleUser />
               )
          }
          </div>
            )
          }
         
             {
              menuDisplay && (
              <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                   <nav>
                   {
                      user && user.role === ROLE.ADMIN && (
                      <Link to={'/admin-panel/all-products'} className='whitespace-nowrap hidden md:block hover:bg-slate-100' onClick={() => { setMenuDisplay(prev => !prev) }}>Admin Panel</Link>
                     )
                    } 
                    </nav>
               </div>
              )
             }
         </div>

         {
          user?._id && (
            <Link to={"/cart"} className='text-2xl relative'>
              <span><FaShoppingCart/></span>            
                <div className='bg-red-600 text-white h-5 w-5 p-1 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                   <p className='text-xl'>{context?.cartProductCount}</p>
               </div>
            </Link>
          )
         }

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
