import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="border p-4">
      <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover" />
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-500">{product.price}</p>
      <button 
        className="bg-green-500 text-white px-4 py-2 mt-2"
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
      <Link to={`/product/${product.id}`} className="text-blue-500">View Details</Link>
    </div>
  );
};

export default ProductCard;
