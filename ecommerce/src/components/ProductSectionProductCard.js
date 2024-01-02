import React, { useEffect, useState } from 'react';
import '../styles/ProductsSectionProductCard.css';
import axios from 'axios';
import { useFilterContext } from './FilterContext';

const ProductsSectionProductCard = () => {
  const { selectedFilter, setSelectedFilter } = useFilterContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the server using Axios
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products/all');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products based on the selectedFilter
  let filteredAndSortedProducts = products.filter((product) => {
    if (selectedFilter === 'all') {
      return true;
    } else if (selectedFilter === 'designed') {
      return !product.designable;
    } else if (selectedFilter === 'designable') {
      return product.designable;
    } else if (selectedFilter === 'white') {
      return product.colors[0] === 'White';
    } else if (selectedFilter === 'black') {
      return product.colors[0] === 'Black';
    } else if (selectedFilter === 'yellow') {
      return product.colors[0] === 'Yellow';
    }
    return false;
  });

  // Sort products according to price
  if (selectedFilter === 'price high to low') {
    filteredAndSortedProducts = products.slice().sort((a, b) => b.price - a.price);
  }
  if (selectedFilter === 'price low to high') {
    filteredAndSortedProducts = products.slice().sort((a, b) => a.price - b.price);
  }

  // Sort products alphabetically
  if (selectedFilter === 'alphabetically') {
    filteredAndSortedProducts = products.slice().sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }

  return (
    <>
      {filteredAndSortedProducts.map((product, index) => (
        <a
          href={`/products/${product.id}`}
          key={product.id}
          style={{ textDecoration: 'none' }}
        >
          <div className='productsSectionProductCardContainer' key={index}>
            <img
              src={product.images[0]}
              alt={product.name}
            />
            <div className='productsSectionProductCardContainerContents'>
              <article className='productsSectionProductCardContainerContentsTexts'>
                <h2>{product.name}</h2>
                <p className='productsSectionProductCardContainerContentsStock'>
                  In Stock({product.stock})
                </p>
                <ul className='productsSectionProductCardContainerContentsFeatures'>
                  {product.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </article>
              <p className='productsSectionProductCardContainerContentsPrice'>
                {product.price}
              </p>
            </div>
          </div>
        </a>
      ))}
    </>
  );
};

export default ProductsSectionProductCard;
