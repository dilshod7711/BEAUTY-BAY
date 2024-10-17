import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { BiCartAdd } from "react-icons/bi";
import { useProductQuery } from "../../redux/api/productsApi";
import { Product } from "../../redux/type";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlices";
import { RootState } from '../../redux/type';
import { useNavigate } from "react-router-dom";
import { Skeleton } from 'antd';
import { Rate } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { likeProduct } from "../../redux/slices/LikeSlices";
import { unlikeProduct } from "../../redux/slices/LikeSlices";
import { notification } from "antd";

const Brand2 = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useProductQuery();
    const dispatch = useDispatch();
    const currency = useSelector((state: RootState) => state.currency.selected);
    const likedProducts = useSelector((state: RootState) => state.like.likedProducts);


    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
        toast.success(`${product.name} has been added to your cart!`);
    };

    const handleLikeProduct = (product: Product) => {
        if(likedProducts.some((id) => id === product.id)) {
          dispatch(unlikeProduct(product.id));
          notification.info({
            message: `You unliked the product!`,
        })
         
        }
        else{
          dispatch(likeProduct(product.id));
        notification.success({
            message: `You liked this product!`,
        })
        }
      };

    const formatPrice = (price: string) => {
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice)) return "";

        return currency === "UZS"
            ? (numericPrice * 12600).toLocaleString() + " UZS"
            : "$" + numericPrice.toFixed(2);
    };

    const handleViewDetails = (productId: number) => {
        navigate(`/details/${productId}`);
    };

    if (isLoading) {
        return (
            <div className="py-10 max-w-[1500px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
                    {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <Skeleton.Image active className="w-[350px] h-[250px] object-cover mx-auto" />
                            <div className="p-4">
                                <Skeleton active paragraph={{ rows: 2 }} />
                                <Skeleton.Button active />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <p className="text-center py-4 text-red-500">Failed to load products</p>;
    }

    return (
        <div className="py-10 max-w-[1500px] mx-auto ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
                {data?.slice(139, 143).map((product: Product) => (
                    <div
                        key={product.id}
                        className="bg-white overflow-hidden relative border border-gray-150 rounded-lg transition duration-300 ease-in-out transform hover:scale-100 hover:shadow-xl"
                    >
                        <div className="absolute top-2 right-2 z-10 cursor-pointer">
                            <button onClick={() => handleLikeProduct(product)}>
                                {likedProducts.includes(product.id) ? (
                                    <FcLike className="text-3xl" />
                                ) : (
                                    <FcLikePlaceholder className="text-3xl" />
                                )}
                            </button>
                        </div>

                        <div className="relative">
                            <img
                                src={product.image_link}
                                alt={product.name}
                                className="w-[250px] h-[250px] object-cover mx-auto"
                            />
                        </div>

                        <div className="p-4 ">
                            <div >
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-2">{product.category}</p>
                            <p className="text-pink-600 font-bold text-lg mb-4">
                                {formatPrice(product.price)}
                            </p>
                            <p className="text-sm text-gray-700 mb-4 line-clamp-2">{product.description}</p>
                            </div>
                        <div>
                                {product.product_colors && product.product_colors.length > 0 ? (
                                    <div className="mb-4">
                                        <div className="flex gap-2 mt-2">
                                            {product.product_colors.slice(0, 5).map((color, index) => (
                                                <div key={index} className="flex flex-col items-center">
                                                    <div
                                                        className="w-6 h-6 rounded-full border border-gray-300"
                                                        style={{ backgroundColor: color.hex_value ? color.hex_value : '#fff', color: '#000' }}
                                                    ></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-gray-500 text-[25px]">No colors available</div>
                                )}
                            </div>
                            <div className="p-4 text-center text-sm text-gray-600 mb-4 gap-[10px] flex justify-between">
                                <button
                                    onClick={() => handleViewDetails(product.id)}
                                    className="text-gray-500 underline text-sm mb-4 inline-block hover:text-blue-600 cursor-pointer"
                                >
                                    View details
                                </button>
                                <span><Rate disabled defaultValue={2} value={product.rating ?? undefined} /></span>
                            </div>

                            <div className="flex justify-between items-center mt-4 text-center">
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="flex items-center justify-center bg-gray-800 text-white px-3 py-2 hover:bg-gray-700 transition w-full text-center rounded-lg mt-[-10px]"
                                >
                                    <BiCartAdd className="mr-2 text-2xl" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Brand2;
