// ProductPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://headphones-server.onrender.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the product details!', error);
      });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image_url} alt={product.name} />
      <p>{product.description}</p>
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
      </div>
    </div>
  );
};

export default ProductPage;
