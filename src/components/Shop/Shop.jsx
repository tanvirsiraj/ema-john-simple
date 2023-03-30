import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    // console.log(cart)
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        // console.log('products', products)
        const storedCart = getShoppingCart();
        const savedCart = [];
        // console.log(storedCart);
        // step 1: get id
        for (const id in storedCart) {
            // step 2: get product from products by using id
            const addedProduct = products.find(product => product.id === id);
            // step 3: get quantity of the product
            if (addedProduct) {
                // step 3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity
                // console.log(addedProduct);
                // step 4: add the added product to the saved cart
                savedCart.push(addedProduct);
            }
        }
        // step 5: set the cart
        setCart(savedCart)
    }, [products])

    console.log(cart)

    const handleAddToCart = (product) => {
        // cart.push(product) not possible 
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    }
    // console.log(cart)
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;