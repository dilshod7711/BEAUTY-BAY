import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { BiCartAdd } from "react-icons/bi";
import { useProductQuery } from "../../redux/api/productsApi";
import { Product } from "../../redux/type";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlices";
import { likeProduct } from "../../redux/slices/LikeSlices";
import { useSelector } from "react-redux";
import { RootState } from '../../redux/type';
import { useNavigate } from "react-router-dom";
import { Skeleton } from 'antd';
import { Rate } from 'antd';
import { notification } from "antd";
import { unlikeProduct } from "../../redux/slices/LikeSlices";

const Products = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useProductQuery();
    const dispatch = useDispatch();
    const currency = useSelector((state: RootState) => state.currency.selected);
    const likedProducts = useSelector((state: RootState) => state.like.likedProducts);



    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
        notification.success({
            message: `${product.name} has been added to your cart!`,
        })

    };

    const handleLikeProduct = (product: Product) => {
        if (likedProducts.some((id) => id === product.id)) {
            dispatch(unlikeProduct(product.id));
            notification.info({
                message: `You unliked the product!`,
            })

        }
        else {
            dispatch(likeProduct(product.id));
            notification.success({
                message: `You liked this product!`,
            })
        }
    };

    const formatPrice = (price: string) => {
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice)) return "";

        if (currency === "UZS") {
            return (numericPrice * 12600).toLocaleString() + " UZS";
        }
        return "$" + numericPrice.toFixed(2);
    };


    const handleViewDetails = (productId: number) => {
        navigate(`/details/${productId}`);
    };
    console.log(data);

    if (isLoading) {
        return (
            <div className="py-10 max-w-[1500px] mx-auto ">
                <h2 className="text-3xl text-center font-bold mb-8">Popular products</h2>
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

    if (error) return <p className="text-center py-4 text-red-500 ">Mahsulotlarni olishda xatolik</p>;

    return (
        <div className="py-10 max-w-[1500px] mx-auto mt-10 ">
            <h2 className="text-4xl text-center font-bold mb-16">Popular products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 h-[550px]">
                {data?.slice(130, 134).map((product: Product) => (
                    <div
                        key={product.id}
                        className="bg-white overflow-hidden relative border border-gray-150 rounded-lg transition duration-00 ease-in-out transform hover:scale-100 hover:shadow-xl"
                    >
                        <div className="absolute top-2 right-2 z-10 cursor-pointer">
                            <button onClick={() => handleLikeProduct(product)}>
                                {likedProducts.some((id) => id === product.id) ? (
                                    <FcLike className="text-2xl text-pink-500" />
                                ) : (
                                    <FcLikePlaceholder className="text-2xl text-pink-500" />
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

                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-2">{product.category}</p>
                            <p className="text-pink-600 font-bold text-lg mb-4">
                                {formatPrice(product.price)}
                            </p>
                            <p className="text-sm text-gray-700 mb-4 line-clamp-2">{product.description}</p>
                            <div>
                                {product.product_colors && (
                                    <div className="mb-4">
                                        <div className="flex gap-2 mt-2">
                                            {product.product_colors.slice(0, 5).map((color, index) => (
                                                <div key={index} className="flex flex-col items-center">
                                                    <div
                                                        className="w-6 h-6 rounded-full border border-gray-300"
                                                        style={{ backgroundColor: color.hex_value }}
                                                    ></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-4 text-center text-sm text-gray-600 mb-4 gap-[10px] flex justify-between">
                                <button
                                    onClick={() => handleViewDetails(product.id)}
                                    className="text-gray-500 underline text-sm mb-4 inline-block hover:text-blue-600 cursor-pointer ml-[-10px]"
                                    rel="noopener noreferrer"
                                >
                                    View details
                                </button>
                                <span> <Rate disabled defaultValue={2} value={product.rating ?? undefined} /> </span>
                            </div>

                            <div className="flex justify-between items-center mt-4 text-center">
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="flex items-center justify-center bg-gray-800 text-white px-3 py-2 hover:bg-gray-700 transition w-full text-center mt-[-23px] rounded-lg"
                                >
                                    <BiCartAdd className="mr-2 text-2xl text-center" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Products;
