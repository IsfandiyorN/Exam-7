import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the product details!', error);
      });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img src={product.image_url} alt={product.name} className="w-fit h-auto" />
      <p className="mt-2 text-gray-700">{product.description}</p>
      <p className="mt-2 font-bold">Price: ${product.price}</p>
      <h3 className="mt-4 font-bold">Available Colors:</h3>
      <div className="color-options">
        {product.color_options.map((color, index) => (
          <span
            key={index}
            style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              backgroundColor: color,
              marginRight: '5px',
              borderRadius: '50%',
              border: '1px solid #000',
            }}
            title={color}
          ></span>
          
        ))}
         <button onClick={() => handleAddToCart(product)} className="bg-green-500 text-white p-2 mt-2">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductPage;
