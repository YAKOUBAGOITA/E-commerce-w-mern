import React from 'react'
import { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link,useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';



const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name:'',
    email: '',
    password: '',
    confirmPassword:'',
    profilePic:'',
  });
  const navigate= useNavigate()


  const handleOnChange = (e) => {
    const { name, value } = e.target; // Correctly destructure name and value from e.target

    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUploadPic= async(e)=>{
    const file= e.target.files[0]


    const imagePic=await imageTobase64(file)
    
    setData((prev)=>{
      return{
        ...prev,
        profilePic: imagePic
      }
    })
 }

  const handleSubmit =async(e)=>{
            e.preventDefault()

            if(data.password===data.confirmPassword){
              const dataResponse=await fetch(SummaryApi.signUP.url,{
                method:SummaryApi.signUP.method,
                headers:{
                  "content-type": "application/json"
                },
                body:JSON.stringify(data)
              })
              const dataApi=await dataResponse.json()

              if(dataApi.success){
              toast.success(dataApi.message)
              navigate('/login')
              }

              if(dataApi.error){
                toast.error(dataApi.message)
                }

            }else{
              console.log("Please check password and confirmPassword")
            }            
  }

  
  return (
    <section id='sign-up'>
    <div className='mx-auto container p-4'>
      <div className='bg-white p-2 py-4 w-full max-w-md mx-auto'>
        <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
          <div>
            <img src={data.profilePic || loginIcons} alt='login icons'/>
          </div>
          <form>
            <label>
             <div className='text-xs bg-slate-200 bg-opacity-80 py-4 cursor-pointer text-center absolute bottom-0 w-full'>
              Upload Photo
             </div>
              <input type='file' className='hidden' onChange={handleUploadPic}/> 
            </label>
          </form>
        </div>
        <form className='pt-6 flex flex-col gap-2'   onSubmit={handleSubmit}>
          <div className='grid'>
            <label>Name:</label>
            <div className='bg-slate-100'>
              <input
                type='text'
                placeholder='enter your name'
                name='name'
                value={data.name}
                onChange={handleOnChange}
                className='w-full h-full outline-none bg-transparent'
              />
            </div>
            <div className='grid'>
            <label>Email:</label>
            <div className='bg-slate-100'>
              <input
                type='email'
                placeholder='enter email'
                name='email'
                value={data.email}
                onChange={handleOnChange}
                required
                className='w-full h-full outline-none bg-transparent'
              />
            </div>
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
                required
                className='w-full h-full outline-none bg-transparent'
              />
              <div className='cursor-pointer text-lg' onClick={() => setShowPassword((prev) => !prev)}>
                <span>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </div>
          <div>
            <label>Confirm Password:</label>
            <div className='bg-slate-100 flex items-center text-between'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='confrirm password'
                value={data.confirmPassword}
                name='confirmPassword'
                onChange={handleOnChange}
                required
                className='w-full h-full outline-none bg-transparent'
              />
              <div className='cursor-pointer text-lg' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                <span>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </div>
          <button className='bg-red-600 text-white px-4 py-1 w-full max-w-[100px] rounded-full 
            hover:scale-110 transition-all mx-auto block mt-4'>
            Sign up
          </button>
        </form>
        <p className='my-4'>
          Alreaddy have an account? <Link to={'/login'} className='text-red-600 underline hover:text-red-700'>Login</Link>
        </p>
      </div>
    </div>
  </section>
  )
}

export default SignUp