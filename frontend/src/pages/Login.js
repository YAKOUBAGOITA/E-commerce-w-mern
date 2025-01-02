import { useContext, useState } from 'react';
import React from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import {toast} from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const navigate=useNavigate()
  const {fetchUserDetails, fetchUserAddTocart}= useContext(Context)
 
  const handleOnChange = (e) => {
    const { name, value } = e.target; // Correctly destructure name and value from e.target

    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit =async(e)=>{
            e.preventDefault()

            console.log('SummaryApi:', SummaryApi);
  
            const dataResponse=await fetch(SummaryApi.signIn.url,{
              method:SummaryApi.signIn.method,
              credentials:'include',
              headers:{
                "content-type":"application/json"
              },
              body:JSON.stringify(data)
            })
            const dataApi=await dataResponse.json()

            if(dataApi.success){
              toast.success(dataApi.message)
              navigate('/')
              fetchUserDetails()
              fetchUserAddTocart()
              
            }
            if(dataApi.error){
              toast.error(dataApi.message)
            
          } 
}

  //console.log('data login', data);

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-2 py-4 w-full max-w-md mx-auto'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='login icons'/>
          </div>
          <form className='pt-6 flex flex-col gap-2'   onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Email:</label>
              <div className='bg-slate-100'>
                <input
                  type='email'
                  placeholder='enter email'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className='bg-slate-100 flex items-center text-between'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='enter password'
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'
                />
                <div className='cursor-pointer text-lg' onClick={() => setShowPassword((prev) => !prev)}>
                  <span>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                Forgot password ?
              </Link>
            </div>
            <button className='bg-red-600 text-white px-4 py-1 w-full max-w-[100px] rounded-full 
              hover:scale-110 transition-all mx-auto block mt-4'>
              Login
            </button>
          </form>
          <p className='my-4'>
            Don't have an account? <Link to={'/sign-up'} className='text-red-600 underline hover:text-red-700'>Sign up</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;