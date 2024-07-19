import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchProducts} from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
    axios.get(`${import.meta.env.VITE_BASE_URL}/brands`).then(response => setBrands(response.data));
    axios.get(`${import.meta.env.VITE_BASE_URL}/colors`).then(response => setColors(response.data));
    axios.get(`${import.meta.env.VITE_BASE_URL}/products`).then(response => {
      console.log('Fetched Products:', response.data); 
      dispatch(setProducts(response.data));
    });
  }, [dispatch]);

  const handleBrandChange = (brand) => {
    console.log('Brand clicked:', brand); 
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleColorChange = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const filteredProducts = sortedProducts.filter(product => {
    console.log('Product:', product); 
    console.log('Product brand:', product.brand_name); 
    console.log('Selected Brands for filtering:', selectedBrands); 

    return (
      (selectedBrands.length === 0 || selectedBrands.includes(product.brand_name)) &&
      (selectedColors.length === 0 || product.color_options.some(color => selectedColors.includes(color)))
    );
  });

  console.log("Selected Brands:", selectedBrands); 
  console.log("Selected Colors:", selectedColors); 
  console.log("Filtered Products:", filteredProducts); 

  return (
    <div className="products-page flex">
      <aside className='w-40'>
        <h2>Brands</h2>
        <ul>
          {brands.map((brand, index) => (
            <li key={index}>
              <input
                type="checkbox"
                value={brand}
                name="brand"
                id={brand}
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              <label htmlFor={brand}>{brand}</label>
            </li>
          ))}
        </ul>
        <h2>Colors</h2>
        {colors.map((color, index) => (
          <span
            key={index}
            onClick={() => handleColorChange(color)}
            style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              backgroundColor: color,
              marginRight: '5px',
              borderRadius: '50%',
              border: '1px solid #000',
              cursor: 'pointer',
            }}
            title={color}
          ></span>
        ))}
        <h2>Sort by Price</h2>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
        <button className='text-green-500 border border-solid border-[green-500]' onClick={handleResetFilters}>Reset</button>
      </aside>
      <div className='w-fit flex flex-wrap'>
        {filteredProducts.map((product) => (
          <div key={product.id} className="product m-auto">
            <img src={product.image_url} alt={product.name} />
            <h2 onClick={() => navigate(`/product/${product.id}`)} className="cursor-pointer text-[#190D26] text-xl not-italic font-normal leading-[normal]">{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
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
            <button onClick={() => handleAddToCart(product)} className="bg-green-500 text-white p-2 mt-2">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
