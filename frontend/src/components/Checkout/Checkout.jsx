import React from "react";

const Checkout = ({ cartItems, onRemove, onQuantityChange, onCheckout }) => {
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md sticky top-20 h-fit w-full max-w-sm mx-auto md:mx-0">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4 text-gray-800">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is currently empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start border-b pb-4 gap-4"
            >
              <div className="flex1">
                <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500 mb-2">
                  ${parseFloat(item.price).toFixed(2)} each
                </p>
       
                       <button
                className="text-red-500 hover:text-red-700 text-sm font-medium"
                onClick={() => onRemove(item.id)}
              >
                Remove
              </button>
              </div>
                <div className="flex items-center gap-2">
                  <label htmlFor={`qty-${item.id}`} className="text-sm text-gray-600">
                    Qty:
                  </label>
                  <input
                    type="number"
                    id={`qty-${item.id}`}
                    className="w-16 p-1 border border-gray-300 rounded"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
                  />
                </div>
            </div>
          ))}
          <div className="border-t pt-4 text-right">
            <p className="text-lg font-semibold text-gray-800">
              Total: ${totalAmount.toFixed(2)}
            </p>
            <button
              onClick={onCheckout}
              className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded shadow"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
