import { useDispatch, useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { RootState } from "../../redux/type";
import { unlikeProduct } from "../../redux/slices/LikeSlices";
import { useProductQuery } from "../../redux/api/productsApi";
import { addToCart } from "../../redux/slices/cartSlices";
import { Product } from "../../redux/type";
import { notification } from "antd";

const Wishlist = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state: RootState) => state.currency.selected);
  const likedProducts = useSelector((state: RootState) => state.like?.likedProducts || []);
  const { data: allProducts, isLoading } = useProductQuery();

  const likedProductDetails = allProducts?.filter(product => likedProducts.includes(product.id));

  const handleDelete = (productId: number) => {
    dispatch(unlikeProduct(productId));
    notification.success({
      message: "Product removed from wishlist",
      duration: 2
    });
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    notification.success({
      message: `${product.name} has been added to your cart!`,
      duration: 2
    });
  };

  const formatPrice = (price: number | string): string => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numericPrice)) return "";

    return currency === "UZS"
      ? (numericPrice * 12600).toLocaleString() + " UZS"
      : "€" + numericPrice.toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-4xl text-pink-500"
        >
          <Heart size={48} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8 min-h-screen flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl text-center font-bold mb-12 text-gray-800"
      >
        WISHLIST
      </motion.h1>

      {likedProductDetails && likedProductDetails.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {likedProductDetails.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.03 }}
              className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col" 
            >
              <div className="relative pb-[100%]">
                <img 
                  src={product.image_link} 
                  alt={product.name} 
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <button
                  onClick={() => handleDelete(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition-colors duration-200"
                >
                  <Trash2 size={20} className="text-red-500" />
                </button>
              </div>
              <div className="p-4 flex flex-grow flex-col"> 
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                <p className="text-lg font-bold text-gray-900 mb-3">{formatPrice(product.price)}</p>
                <div className="mt-auto"> 
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to bag
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-gray-600 mt-12"
        >
          <Heart size={64} className="mx-auto mb-4 text-gray-400" />
          <p className="text-2xl font-semibold">Your wishlist is empty</p>
          <p className="mt-2">Browse our products and add your favorites!</p>
        </motion.div>
      )}
    </div>
  );
};

export default Wishlist;
