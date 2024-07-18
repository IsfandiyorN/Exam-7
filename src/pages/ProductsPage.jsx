import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductsPage = () => {
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const brands = [...new Set(products.map((product) => product.brand))];
  const colors = [...new Set(products.map((product) => product.color))];

  const filteredProducts = products
    .filter((product) => {
      return (
        (selectedBrand ? product.brand === selectedBrand : true) &&
        (selectedColor ? product.color === selectedColor : true)
      );
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex">
      <aside className="w-1/4 p-4">
        <div>
          <h3 className="font-bold">Brand</h3>
          <select onChange={(e) => setSelectedBrand(e.target.value)} value={selectedBrand}>
            <option value="">All</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <h3 className="font-bold">Color</h3>
          <select onChange={(e) => setSelectedColor(e.target.value)} value={selectedColor}>
            <option value="">All</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <h3 className="font-bold">Sort by Price</h3>
          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </aside>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded">
              <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" />
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <div className="flex gap-3  ">
        {product.color_options.map((c, index) => {
          return (
            <span
              key={index}
              style={{ backgroundColor: c }}
              className=" w-8 h-8 rounded-full border border-black "
            ></span>
          );
        })}
      </div>
              <p>${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 bg-green-500 text-white p-2 rounded"
              >
                Add to Cart
              </button>
              <div>
            
          </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
