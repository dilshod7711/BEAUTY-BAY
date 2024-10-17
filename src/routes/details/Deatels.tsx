import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useViewdeatesQuery } from "../../redux/api/productsApi";
import { RootState } from '../../redux/type';
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlices";
import { Product } from "../../redux/type";
import { Heart, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { notification } from 'antd';
import { likeProduct } from "../../redux/slices/LikeSlices";
import { FcLikePlaceholder } from "react-icons/fc";

const Details = () => {
    const dispatch = useDispatch();
    const { productId } = useParams<{ productId: string }>();
    const likedProducts = useSelector((state: RootState) => state.like.likedProducts);
    const { data: product, isLoading, error } = useViewdeatesQuery(parseInt(productId!));

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState('');
    const currency = useSelector((state: RootState) => state.currency.selected);


    const formatPrice = (price: number | string) => {
        const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
        if (isNaN(numericPrice)) return "";
        return currency === "UZS" ?
            (numericPrice * 12600).toLocaleString() + " UZS" :
            "€" + numericPrice.toFixed(2);
    };

    const handleAddToCart = () => {
        if (product && selectedColor) {
            dispatch(addToCart({ ...product, selectedColor }));
            notification.success({
                message: `${product.name} has been added to your cart!`,
            });
        }
    };
    const handleLikeProduct = (product: Product) => {
        dispatch(likeProduct(product!.id));
        notification.success({
            message: `You liked this product!`,
        });
    }

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>;
    }

    if (error || !product) {
        return <div className="text-center text-red-500 text-2xl mt-10">Error loading product</div>;
    }

    const images = [product.image_link];

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50">
            <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:w-1/2 p-6">
                    <div className="relative aspect-w-1 aspect-h-1">
                        <img
                            src={images[currentImageIndex]}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                        />
                        {images.length > 1 && (
                            <>
                                <button onClick={() => setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length)} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition">
                                    <ChevronLeft size={24} />
                                </button>
                                <button onClick={() => setCurrentImageIndex(prev => (prev + 1) % images.length)} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition">
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}
                    </div>
                    <div className="flex mt-4 gap-2 overflow-x-auto">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-20 h-20 object-cover cursor-pointer rounded-md ${index === currentImageIndex ? 'border-2 border-blue-500' : 'border border-gray-200'}`}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className="md:w-1/2 p-6">
                    <h1 className="text-3xl font-bold mb-2 text-gray-800">{product.name.toUpperCase()}</h1>
                    <h2 className="text-xl font-semibold mb-4 text-gray-600">{product.category}</h2>
                    <div className="flex items-center mb-4">
                        <div className="flex mr-2">

                        </div>
                        <span className="text-gray-600">{product.rating}  reviews</span>
                    </div>
                    <p className="text-2xl font-bold mb-4 text-blue-600">{formatPrice(product.price)}</p>
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2 text-gray-700">Available Colors:</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.product_colors.map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedColor(color.hex_value)}
                                    className={`w-10 h-10 rounded-full border-2 ${selectedColor === color.hex_value ? 'border-blue-500' : 'border-gray-300'}`}
                                    style={{ backgroundColor: color.hex_value }}
                                    title={color.hex_value}
                                ></button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-100 p-3 mb-4 rounded-md">
                        <p className="text-sm text-gray-700">Get 15% off selected items when you spend 70€ with code: YAY (Excludes sale)</p>
                    </div>
                    <div className="bg-gray-100 p-3 mb-4 rounded-md">
                        <p className="text-sm text-gray-700">Download the app for exclusive offers and discounts</p>
                    </div>
                    <div className="bg-purple-100 p-3 mb-4 rounded-md flex items-center">
                        <p className="text-sm text-purple-700 flex-grow">Various delivery options available.</p>
                        <Info size={16} className="text-purple-700" />
                    </div>
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={handleAddToCart}
                            className={`flex-grow bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition ${!selectedColor ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!selectedColor}
                        >
                            Add to bag
                        </button>
                        <button
                            onClick={() => handleLikeProduct(product)}
                            className="border border-gray-300 p-3 rounded-md hover:bg-gray-100 transition"
                        >
                            {likedProducts.some((id: number) => id === product.id) ? (
                                <Heart className="text-2xl text-red-500" />
                            ) : (
                                <FcLikePlaceholder className="text-2xl text-white" />
                            )}
                        </button>

                    </div>
                    <div className="mb-6">
                        <h3 className="font-bold mb-2 text-gray-800">TRIBE</h3>
                        <p className="text-sm text-gray-600">+ 185 points</p>
                        <a href="#" className="text-sm text-blue-600 hover:underline">What's this?</a>
                    </div>
                    <div className="border-t pt-4">
                        <h3 className="font-bold mb-2 flex justify-between items-center text-gray-800">
                            Description
                            <ChevronRight size={24} className="text-gray-600" />
                        </h3>
                        <p className="text-sm mb-2 text-gray-600">{product.description}</p>
                        <a href="#" className="text-sm text-blue-600 font-semibold hover:underline">Read more</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Details;