import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";

function UploadProduct({ onClose }) {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    
    setData((prevData) => ({
      ...prevData,
      productImage: [...prevData.productImage, uploadImageCloudinary.url]
    }));
  };

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center '>
      <div className='bg-white p-4 rounded w-full max-w-xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Upload Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
        </div>

        <form className='grid p-4 gap-3 overflow-y-scroll h-full pb-5'>
          <label htmlFor='productName'>Product Name:</label>
          <input
            type='text'
            id='productName'
            placeholder='enter product name'
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
          />

          <label htmlFor='brandName' className='mt-3'>Brand Name:</label>
          <input
            type='text'
            id='brandName'
            placeholder='enter brand name'
            name="brandName"
            value={data.brandName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
          />

          <label htmlFor='category'>Category:</label>
          <select
            id='category'
            name='category'
            value={data.category}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
          >
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>{el.label}</option>
            ))}
          </select>

          <label htmlFor='productImage'>Product Image:</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
              <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                <span className='text-4xl'><FaCloudUploadAlt /></span>
                <p className='text-sm'>Upload Product Image</p>
                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
              </div>
            </div>
          </label>

          <div>
            {
              data?.productImage[0] ? (
                <div className='flex items-center gap-2'>
                  {
                    data.productImage.map((el, index) => (
                      <div className='relative'>
                          <img 
                              src={el}
                              alt={el} 
                              key={index} 
                              width={80} 
                              height={80} 
                              className='p-2 bg-slate-100 border cursor-pointer' 
                              onClick={() => {
                                setOpenFullScreenImage(true);
                                setFullScreenImage(el);
                              }}
                            />
                            <div className='absolute bottom-0 right-0'>
                              <MdDelete/>
                            </div>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <p className='text-red-600 text-xs'>*Please upload product Image</p>
              )
            }
          </div>

          <button className='px-3 py-1 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>
        </form>
      </div>

      {/***display image full screen  */}
      {
        openFullScreenImage && (
          <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
      }
    </div>
  );
};

export default UploadProduct;
