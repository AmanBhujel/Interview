import React from 'react';
import { useCartContext } from '../contexts/cartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, setCart } = useCartContext();
    const navigate = useNavigate()

    const handleDelete = (itemId) => {
        const updatedCart = cart.filter((item) => item.id !== itemId);
        setCart(updatedCart);
    };
    const handleGoToProducts = () => {
        navigate('/')
    }

    return (
        <div className='flex items-center flex-col'>
            <h2 className='text-3xl font-bold'>Your Cart</h2>
            {cart.length === 0 ? (
                <p className='text-3xl font-extrabold'>Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.map((item) => (
                        <li key={item.id} className='flex items-center '>
                            <div>
                                <img src={item.image} alt={item.name} style={{ width: '150px', height: '150px' }} />
                            </div>
                            <div className='flex'>
                                <p className='font-bold text-lg ml-5 mr-16'> {item.name}</p>
                                <p className='text-lg font-bold mr-16'> Rs {item.price * item.quantity}</p>
                                <p className='text-lg mr-12'>Quantity: {item.quantity}</p>
                                <button
                                    className='bg-red-500 px-4 py-2 rounded-xl text-white'
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <p className='bg-blue-500 px-4 py-2 text-white rounded-lg cursor-pointer' onClick={handleGoToProducts}>Go back to products</p>
        </div>
    );
};

export default Cart;

