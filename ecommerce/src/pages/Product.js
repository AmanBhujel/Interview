import React, { useEffect, useState } from 'react';
import '../styles/ProductPage.css';
import axios from 'axios';
import Loading from '../components/Loading';
import ToastMessage from '../components/ToastMessage';
import { useNavigate, useParams } from 'react-router-dom';
import { useCartContext } from '../contexts/cartContext';

const ProductPage = () => {
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const [product, setProduct] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const productId = params.id;
    const { cart, setCart } = useCartContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${productId}`);
                const fetchedProduct = response.data;
                console.log(fetchedProduct.product)
                setProduct(fetchedProduct.product);
                setImages(fetchedProduct.product.images);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [productId]);

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleImageClick = (index) => {
        setSelectedImage(index);
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const handleCart = () => {
        const existingProductIndex = cart.findIndex((item) => item.id === product.id);
        if (existingProductIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += quantity;
            setCart(updatedCart);
            ToastMessage('success', 'Item added successfully.');
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            const newCartItem = {
                id: product.id,
                name: product.name,
                image: product.images[0],
                quantity: quantity,
                price: product.price,
            };
            const newCart = [...cart, newCartItem];
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
            ToastMessage('success', 'Item added successfully.');
        }
    };

    return (
        <>
            {loading ?
                <Loading /> :
                <>
                    <button className='bg-blue-400 px-4 py-2 rounded-xl mt-2 ml-2 absolute' onClick={() => navigate('/')}>Back</button>
                    {windowWidth > 900 ?
                        <section className='productPage'>
                            <div className='productPageImageSection'>
                                {/* Display the selected image */}
                                <img
                                    src={images[selectedImage]}

                                    alt={`Image ${selectedImage}`}
                                    style={{ width: '100%', maxWidth: '500px' }}
                                />
                                <div className='productPageSmallerImages'>
                                    {images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`${image}`}

                                            alt={`Image ${index}`}
                                            style={{

                                                border: index === selectedImage ? '2px solid gray' : 'none',
                                            }}
                                            onClick={() => handleImageClick(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className='productPageContentSection'>
                                <h2>{product.name}</h2>
                                <p className='productPageContentSectionDescription'><span style={{ fontSize: '1rem', color: 'black' }}> Description:</span><br />{product.description}</p>
                                <ul className='productPageContentSectionFeatures'>
                                    {product.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                                <div className='productPageColorAndQuantity'>
                                    {
                                        product.colors ?
                                            <div className='productPageContentSectionColors'>
                                                <p>Available Colours:</p>
                                                <div className='productPageContentSectionColorsContainer'>
                                                    {product.colors.map((color, index) => (
                                                        <div className='productPageContentSectionColorsColor'
                                                            key={index}
                                                            style={{ backgroundColor: color }}>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div> : ''
                                    }
                                    <div className='productPageSectionQuantity'>
                                        <label> Quantity</label>
                                        <input
                                            type="number"
                                            value={quantity}
                                            min={1}
                                            max={10}
                                            step={1}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className='productPageSectionSizes'>
                                    <div className='productPageSectionSizesButtons'>
                                        {
                                            ['S', 'M', 'L', 'XL'].map((size) => (
                                                <button
                                                    className={`productPageSectionSizesButton ${selectedSize === size ? 'selected' : ''}`}
                                                    onClick={() => handleSizeClick(size)}
                                                >
                                                    {size}
                                                </button>))
                                        }
                                    </div>
                                </div>
                                <p className='productPageContentSectionPrice'>Price: Rs {product.price}</p>

                                <div className='productPageContentSectionButtonContainer'>
                                    <button className='productPageContentSectionButton' onClick={handleCart}> Add to cart </button>
                                </div>
                            </div>
                        </section>
                        :
                        <section className='productPage'>
                            <div className='productPageImageSection'>
                                {/* Display the selected image */}
                                <img
                                    src={`${images[selectedImage]}`}
                                    alt={`Image ${selectedImage}`}
                                    style={{ width: '100%', maxWidth: '500px' }}
                                />
                                <div className='productPageSmallerImages'>
                                    {images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Image ${index}`}
                                            style={{

                                                border: index === selectedImage ? '2px solid gray' : 'none',
                                            }}
                                            onClick={() => handleImageClick(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className='productPageContentSection'>
                                <h2>{product.name}</h2>
                                <div className='productPageColorAndQuantity'>
                                    {
                                        product.colors ?
                                            <div className='productPageContentSectionColors'>
                                                <p>Available Colours:</p>
                                                <div className='productPageContentSectionColorsContainer'>
                                                    {product.colors.map((color, index) => (
                                                        <div className='productPageContentSectionColorsColor'
                                                            key={index}
                                                            style={{ backgroundColor: color }}>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div> : ''
                                    }
                                    <div className='productPageSectionQuantity'>
                                        <label> Quantity:</label>
                                        <input
                                            type="number"
                                            value={quantity}
                                            min={1}
                                            max={10}
                                            step={1}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className='productPageSectionSizes'>
                                    <div className='productPageSectionSizesButtons'>
                                        {
                                            ['S', 'M', 'L', 'XL'].map((size, index) => (
                                                <button
                                                    className={`productPageSectionSizesButton ${selectedSize === size ? 'selected' : ''}`}
                                                    onClick={() => handleSizeClick(size)}
                                                    key={index}
                                                >
                                                    {size}
                                                </button>))
                                        }
                                    </div>
                                </div>
                                <p className='productPageContentSectionPrice'>Price: Rs {product.price}</p>
                                <p className='productPageContentSectionDescription'><span style={{ fontSize: '1rem', color: 'black' }}> Description:</span><br />{product.description}</p>
                                <ul className='productPageContentSectionFeatures'>
                                    {product.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                                <div className='productPageContentSectionButtonContainer'>
                                    <button className='productPageContentSectionButton' onClick={handleCart}> Add to cart </button>
                                </div>
                            </div>
                        </section>
                    }
                </>

            }

        </>
    );
}

export default ProductPage;
