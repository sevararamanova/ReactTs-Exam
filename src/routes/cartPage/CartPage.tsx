import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeFromCart } from '../../redux/slices/cartSlices';
import placeholder from '../../images/placeholder.webp'; // Ensure correct path

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id)); // Use the removeFromCart action
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image_link || placeholder}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                    onError={(e) => (e.currentTarget.src = placeholder)} // Fallback to placeholder
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right">
            <h2 className="text-2xl font-semibold">Total: ${totalAmount.toFixed(2)}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
