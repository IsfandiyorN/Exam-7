import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.items.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div>
          <ul>
            {cart.items.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-4">
                <div><img src={item.image_url} alt="Product Image" /></div>
                <div>{item.name}</div>
                <div>${item.price}</div>
                <div>quantity: {item.quantity}</div>
                <button 
                  className="bg-red-500 text-white px-4 py-2"
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">Total: ${cart.totalPrice}</div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
