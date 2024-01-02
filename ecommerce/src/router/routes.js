import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const ProductPage = lazy(() => import('../pages/Product'));
const ProductsPage = lazy(() => import('../pages/Products'));
const CartPage = lazy(() => import('../pages/Cart'));


export default function AppRouter() {
    let element = useRoutes([
        {
            path: '/products/:id',
            element: <ProductPage />,
        },
        {
            path: '/',
            element: <ProductsPage />
        },
        {
            path: '/cart',
            element: <CartPage />
        }
    ])
    return element;
}