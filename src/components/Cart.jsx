import { useState } from "react";
import stars from "../../assets/stars.svg";
import c from "../../assets/c.svg";
import deliver from "../../assets/bus.svg";


const SinlgleProductDetail = ({ product, cart, setCart }) => {
    const [count, setCount] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    return (
      <div className="flex-1 mt-10 max-sm:mt-0 text-prDetaiCol mb-52">
        <div className="mt-8 pb-7 border-b-2 border-dashed border-filterBorder">
          <strong className="font-readex text-4xl max-sm:text-2xl font-bold">
            ${product.price} or {Math.floor(product.price / 6)}/month
          </strong>
          <p className="text-spec font-medium text-lg mt-3">
            Suggested payments with 6 month special financing
          </p>
        </div>
        <div className="mt-7">
          <p className="text-2xl font-semibold font-readex mb-7">
            Choose a color
          </p>
          <div className="flex gap-3 pb-9 border-b-2 border-dashed border-filterBorder">
            {product.color_options.map((c, index) => {
              return (
                <span
                  key={index}
                  style={{ backgroundColor: c }}
                  className=" w-16 h-16 max-sm:w-8 max-sm:h-8 rounded-full border border-black "
                ></span>
              );
            })}
          </div>
        </div>
        <div className="mt-11 font-bold text-2xl max-sm:text-lg flex gap-16 items-center mb-12">
          <button className="px-8 py-5 bg-bgBorder flex gap-8 border-4 rounded-full border-green-600 items-center  ">
            <p className="w-36 ">- <span className="ml-5 mr-5" >1</span> +</p>
          </button>
          <p>
            Only <span className="text-green-600">16 items </span>left! <br />{" "}
            Don't miss it
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setCart([...cart, product])}
            className="rounded-xl bg-buttonColor text-white flex items-center py-4 px-8 gap-2 font-bold text-xl w-fit active:bg-blue-600 duration-75"
          >
            <span class="material-symbols-outlined">shopping_cart</span>
            Add to Cart
          </button>
        </div>
        <div className="border-4  rounded-2xl  border-filterBorder flex-col mt-14 mb-10">
          <div className="flex items-center gap-7 border-b-2 border-dashed border-filterBorder p-5">
            <div>
              <img src={deliver} alt="" />
            </div>
            <div>
              <p>Free delivery</p>
              <a href="">Enter your Postal Code for Delivery Availability</a>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-7 p-5">
              <div>
                <img src={c} alt="" />
              </div>
              <div>
                <p>Return Delivery</p>
                <a href="">Free delivery 30 Days return</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Cart;