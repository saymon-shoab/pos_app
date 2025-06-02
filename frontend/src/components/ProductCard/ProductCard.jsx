import React from "react";
import  giftbox from '../../assets/giftbox.jpg'

const ProductCard = ({ product, onAddToCart }) => {
  const { name, code, price, quantity } = product;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
      <div className="bg-gray-100 h-48 flex items-center justify-center">
        <img
          src={giftbox}
          alt={name}
          className="object-contain h-full"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{name}</h3>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
            {code}
          </span>
        </div>

        <div className="text-sm text-gray-600 space-y-1 mb-4">
          <p>
            <span className="font-medium text-gray-700">Price:</span> $
            {parseFloat(price).toFixed(2)}
          </p>
          <p>
            <span className="font-medium text-gray-700">Stock:</span> {quantity}
          </p>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="mt-auto w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-sm font-semibold text-white rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
