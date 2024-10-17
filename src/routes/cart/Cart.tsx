import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { removeFromCart, clearCartItem, addToCart } from '../../redux/slices/cartSlices';
import { RootState, Product } from "../../redux/type";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState ) => state.cart);
  const dispatch = useDispatch();
  const currency = useSelector((state: RootState) => state.currency.selected);


  const formatPrice = (price: number | string): string => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numericPrice)) return "";

    return currency === "UZS"
      ? (numericPrice * 12600).toLocaleString() + " UZS"
      : "€" + numericPrice.toFixed(2);
  };

  const calculateVAT = (totalPrice: number): number => totalPrice * 0.15;

  const totalPrice = cart.products.reduce((acc: number, product: Product) => acc + (parseFloat(product.price) * product.quantity), 0);
  const vat = calculateVAT(totalPrice);
  const finalTotal = totalPrice + vat;


  if (cart.products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <ShoppingCart size={64} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-4">Looks like you haven't added any items to your cart yet.</p>
        <button 
          onClick={() => navigate('/')} 
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleCheckout = () => {
    if (cart.products.length > 0) {
      navigate("/checkout");
    }
  };
  console.log(cart);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 mt-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">Your Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.products.map((product: Product) => (
              <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    <img src={product.image_link} alt={product.name} className="w-24 h-24 object-cover rounded-md" />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-500">{formatPrice(product.price)}</p>
                      {product.selectedColor && (
                      <div className="flex items-center mt-2">
                        <div
                          className="w-6 h-6 rounded-full border mr-2"
                          style={{ backgroundColor: product.selectedColor }}
                        ></div>
                      </div>
                    )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => dispatch(removeFromCart(product))}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-lg font-semibold">{product.quantity}</span>
                      <button 
                        onClick={() => dispatch(addToCart(product))}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <footer className="flex justify-between items-center bg-gray-50 p-4">
                  <p className="font-semibold text-gray-800">{formatPrice(parseFloat(product.price) * product.quantity)}</p>
                  <button 
                   onClick={() => dispatch(clearCartItem(product))}
                   className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <Trash2 size={16} className="mr-2" /> Remove
                  </button>
                </footer>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VAT (QQS)</span>
                  <span className="font-semibold">{formatPrice(vat)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-4">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
                <div>
                  <button 
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition" 
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;



