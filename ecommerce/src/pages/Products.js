import React from 'react'
import ProductsSection from '../components/ProductsSection'
import FilterSidebar from '../components/FilterSidebar'

const Products = () => {
    return (
        <div className='flex'>
            <FilterSidebar />
            <ProductsSection />
        </div>
    )
}

export default Products

