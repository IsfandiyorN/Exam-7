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
    
    <div className="product-detail p-4 flex">
      <h1 className="text-2xl font-bold">{product.name}</h1>

      <div className='flex flex-col w-1/2'>
      <img src={product.image_url} alt={product.name} className="w-fit h-auto" />
      <div className='flex mt-10'>
      <img src={product.image_url} alt={product.name} className="w-24 h-auto" />
      <img src={product.image_url} alt={product.name} className="w-24 h-auto" />
      <img src={product.image_url} alt={product.name} className="w-24 h-auto" />
      <img src={product.image_url} alt={product.name} className="w-24 h-auto" />
      </div>
      </div>

      <div className='w-1/2'>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <p className="mt-2  text-[#190D26] text-4xl not-italic font-bold leading-[normal]">Price: ${product.price}</p>
      <h3 className="mt-4  text-[#190D26] text-5xl not-italic font-normal leading-[normal]">Available Colors:</h3>
      <div className="color-options">
        {product.color_options.map((color, index) => (
          <span className='fill-white stroke-[2px] stroke-[#0D2612]'
            key={index}
            style={{
              display: 'inline-block',
              width: '50px',
              height: '50px',
              backgroundColor: color,
              marginRight: '15px',
              borderRadius: '50%',
              border: '1px solid #000',
              marginTop: '85px'
            }}
            title={color}
          ></span>
          
        ))}
         <button onClick={() => handleAddToCart(product)} className="bg-green-500 text-white p-2 mt-2">Add to Cart</button>
      </div>
      </div>
     
    </div>
  );
};

export default ProductPage;