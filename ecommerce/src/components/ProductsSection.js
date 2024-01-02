import React from 'react';
import '../styles/ProductsSection.css';
import ProductsSectionProductCard from './ProductSectionProductCard';
import { IoCart } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const ProductsSection = () => {
  const navigate=useNavigate();
  return (
    <>
      <p className=' text-5xl text-red-500 rounded-xl absolute right-5 top-5 cursor-pointer' onClick={()=>navigate('/cart')}><IoCart /></p>
      <section className='productsSection'>
        <p className='productsSectionHeading'>Shop Our Best Picks </p>
        <div className='productsSectionProducts'>
          <ProductsSectionProductCard />
        </div>
      </section>
    </>
  )
}

export default ProductsSection;