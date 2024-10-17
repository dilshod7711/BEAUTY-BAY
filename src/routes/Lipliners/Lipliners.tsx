import React from "react";
import { useLiplinersQuery } from "../../redux/api/productsApi";
import { Tblush } from "../../redux/type";
import { RootState } from "../../redux/type";
import { useSelector } from "react-redux";
import { Card, Typography, Tag, Tooltip, Empty } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlices";
import { likeProduct } from "../../redux/slices/LikeSlices";
import { notification } from "antd";


const { Text, Title } = Typography;

const Lipliners: React.FC = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useLiplinersQuery();
  const currency = useSelector((state: RootState) => state.currency.selected);

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) return "";

    if (currency === "UZS") {
      return (numericPrice * 12600).toLocaleString() + " UZS";
    }
    return "$" + numericPrice.toFixed(2);
  };
  const handleAddToCart = (product: Tblush) => {
    dispatch(addToCart(product));
    notification.success({
      message: `${product.name} has been added to your cart!`,
    });
  }

  const handleLikeProduct = (product: Tblush) => {
    dispatch(likeProduct(product.id));
    notification.success({
      message: `You liked this product!`,
    });
  }


  const renderSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {Array(8).fill(0).map((_, index) => (
        <Card key={index} hoverable>
          <div className="h-40 flex justify-center items-center overflow-hidden">
            <div className="w-32 h-32 bg-gray-300 rounded-full" />
          </div>
          <div className="mt-4">
            <div className="h-6 bg-gray-200 mb-2 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 mb-4 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 w-24 mb-4 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 w-16 mt-4 rounded animate-pulse"></div>
          </div>
        </Card>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-8 border border-gray-200">
        <Title level={2} className="text-center mb-10 mt-6">
          Lip Liners Collection
        </Title>
        {renderSkeletons()}
      </div>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <Empty description="Hech qanday mahsulot topilmadi" className="my-16" />;
  }

  return (
    <div className="container mx-auto py-10 px-8 border border-gray-200">
      <Title level={2} className="text-center mb-10 mt-6">
        Lip Liners Collection
      </Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {data.slice(8).map((product: Tblush) => (
          <Card
            key={product.id}
            hoverable
            cover={
              <div className="h-40 flex justify-center items-center overflow-hidden">
                <img
                  alt={product.name}
                  src={product.image_link}
                  className="w-32 h-32 object-cover rounded-full transition-transform duration-300 ml-[100px] mt-2"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>
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

export default Lipliners;
