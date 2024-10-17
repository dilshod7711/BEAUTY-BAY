import React from 'react';
import { useBlushQuery } from "../../redux/api/productsApi";
import { Tblush, RootState } from "../../redux/type";
import { useSelector } from "react-redux";
import { Card, Typography, Tag, Tooltip, Empty } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { Product } from '../../redux/type';
import { addToCart } from '../../redux/slices/cartSlices';
import { likeProduct } from '../../redux/slices/LikeSlices';
import { useDispatch } from 'react-redux';
import { notification } from "antd";

const { Text, Title } = Typography;

const Blush: React.FC = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useBlushQuery();
    const currency = useSelector((state: RootState) => state.currency.selected);

    const formatPrice = (price: string) => {
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice)) return "";

        if (currency === "UZS") {
            return (numericPrice * 12600).toLocaleString() + " UZS";
        }
        return "$" + numericPrice.toFixed(2);
    };
    const handleAddToCart = (product:Product) => {
        dispatch(addToCart(product));
        notification.success({
            message: `${product.name} has been added to your cart!`
        })
         
        
    }

    const handleLikeProduct = (product:Product) => {
        dispatch(likeProduct(product.id));
        notification.success({
            message: `You liked this product!`
        })

    }

    const renderSkeletons = () => (
        <div className="flex space-x-6 py-4">
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

    if (isLoading) {
        return (
            <div className="container mx-auto py-10 px-8 border border-gray-200">
                <Title level={2} className="text-center mb-10 mt-6">Blush Collection</Title>
                {renderSkeletons()}
            </div>
        );
    }

    if (!Array.isArray(data) || data.length === 0) {
        return (
            <Empty description="Hech qanday mahsulot topilmadi" className="my-16" />
        );
    }

    return (
        <div className="container mx-auto py-10 px-8 border border-gray-200">
            <Title level={2} className="text-center mb-10 mt-6">Blush Collection</Title>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                {data.slice(27).map((product: Tblush) => (
                    <Card
                        key={product.id}
                        hoverable
                        cover={
                            <img
                                alt={product.name}
                                src={product.image_link}
                                className="w-full h-[300px] object-contain mx-auto rounded-full transition-transform duration-300"
                                style={{ objectFit: 'cover' }}
                                onError={(e) => {
                                    e.currentTarget.src = "https://via.placeholder.com/150";
                                }}
                            />
                        }
                        actions={[
                            <Tooltip title="Savatga qo'shish">
                                <ShoppingCartOutlined onClick={() => handleAddToCart(product)} key="cart" />
                            </Tooltip>,
                            <Tooltip title="Sevimlilarga qo'shish">
                                <HeartOutlined onClick={() => handleLikeProduct(product)} key="heart" />
                            </Tooltip>,
                        ]}
                    >
                        <Card.Meta
                            title={product.name}
                            description={
                                <>
                                    <Text type="secondary" className="block mb-2">{product.brand}</Text>
                                    <div className="mb-2">
                                        <Tag color="blue" className="mr-0">
                                            {product.category}
                                        </Tag>
                                    </div>
                                    <Text strong className="text-lg text-blue-600">
                                        {formatPrice(product.price)}
                                    </Text>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {product.product_colors && product.product_colors.length > 0 ? (
                                            product.product_colors.slice(0, 5).map((color, index) => (
                                                <Tooltip key={index} title={color.colour_name}>
                                                    <div
                                                        className="w-6 h-6 rounded-full border border-gray-300"
                                                        style={{ backgroundColor: color.hex_value }}
                                                    />
                                                </Tooltip>
                                            ))
                                        ) : (
                                            <Text type="secondary">Ranglar mavjud emas</Text>
                                        )}
                                        {product.product_colors && product.product_colors.length > 5 && (
                                            <Tooltip title="Qo'shimcha ranglar">
                                                <Tag className="ml-1">+{product.product_colors.length - 5}</Tag>
                                            </Tooltip>
                                        )}
                                    </div>
                                </>
                            }
                        />
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Blush;
