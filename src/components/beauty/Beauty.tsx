import beautys from "../../assets/beautys.png";
import { useProductQuery } from "../../redux/api/productsApi";
import { Product } from "../../redux/type";
import { useNavigate } from "react-router-dom";

const Beauty = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useProductQuery();

    const handleViewDetails = (productId: number) => {
        navigate(`/details/${productId}`);
    };

    const renderSkeletons = () => (
        <div className="flex space-x-6 py-4 ml-[50px]">
            {Array(4).fill(0).map((_, index) => (
                <div
                    key={index}
                    className="flex-shrink-0 bg-white border border-gray-200 rounded-lg p-6 w-[300px] transition-transform transform h-[400px]"
                >
                    <div className="relative h-[200px] bg-gray-200 mb-4 overflow-hidden rounded-lg animate-pulse"></div>
                    <div className="h-6 bg-gray-200 mb-2 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 mb-4 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 w-24 mb-4 rounded animate-pulse"></div>
                    <div className="h-6 bg-gray-200 w-16 mt-4 rounded animate-pulse"></div>
                </div>
            ))}
        </div>
    );

    if (error) return <p className="text-center py-4 text-red-500">Mahsulotlarni olishda xatolik</p>;

    return (
        <>
            <div className="flex flex-col gap-[100px] lg:flex-row items-center p-8 max-w-[1200px] mx-auto bg-white mt-[100px] ">
                <div className="flex-1">
                    <img src={beautys} alt="Beauty Products" className="w-full h-auto " />
                </div>
                <div className="flex-1 p-6 text-center">
                    <p className="text-gray-600 mb-6 text-[14px] leading-relaxed">
                        Looking for five-star formulas, minus the price tag? From skincare essentials to makeup must-haves and results-driven haircare, BY BEAUTY BAY has everything you need to discover your next best obsession.
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                        Shop Now
                    </button>
                </div>
            </div>

            <div className="p-8 max-w-[1500px] mx-auto">
                {isLoading ? (
                    renderSkeletons()
                ) : (
                    <div className="flex space-x-6 py-4 ml-[50px]">
                        {data?.slice(59, 63).map((product: Product) => (
                            <div
                                key={product.id}
                                className="flex-shrink-0 bg-white border border-gray-200 rounded-lg p-6 w-[300px] transition-transform transform hover:shadow-lg duration-300 h-[400px]"
                            >
                                <div className="relative h-[200px] bg-gray-200 mb-4 overflow-hidden rounded-lg">
                                    <img
                                        src={product.image_link}
                                        alt={product.name}
                                        className="w-full h-full object-cover "
                                    />
                                </div>
                                
                                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{product.description}</p>

                                <button
                                    onClick={() => handleViewDetails(product.id)}
                                    className="text-gray-800 underline text-sm mb-4 inline-block hover:text-blue-600 cursor-pointer transition duration-200"
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Beauty;
