import { CgProfile } from "react-icons/cg";
import { FcLike } from "react-icons/fc";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../../redux/slices/currnsySlice";
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import beauty from "../../assets/beauty.png";
import { RootState } from "../../redux/type";
import uz from "../../assets/uz.png";
import aqsh from '../../assets/aqsh.png';
import { useSearchqueryQuery } from "../../redux/api/productsApi";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.products.length);
  const like = useSelector((state: RootState) => state.like.likedProducts.length);
  const currency = useSelector((state: RootState) => state.currency.selected);
  const [search, setSearch] = useState("");

  const { refetch } = useSearchqueryQuery();

  useEffect(() => {
    if (search) {
      refetch();
    }
  }, [search, refetch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  if (pathname.includes("*")) return null;

  return (
    <div className="font-sans">
      <div className="bg-black text-white text-center py-2">
        <h1 className="text-sm ml-[-35px]">
          Save 15% on selected items with code <span className="font-bold">DEALS</span>
        </h1>
      </div>

      <div className="bg-gray-100 text-black py-3 border-b flex items-center justify-between px-6 lg:px-12 shadow-md">
        <h2 className="text-[16px] font-bold text-black text-center max-w-[1550px] mx-auto">
          Head to the app for a FREE gift from Made by Mitchell worth £16* plus exclusive discounts!
        </h2>
        <div className="flex space-x-4">
          <select className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-black transition duration-300">
            <option value="uz"> UZ </option>
            <option value="ru"> RU</option>
            <option value="en"> EN</option>
          </select>

          <div className="relative">
            <img src={currency === 'UZS' ? uz : aqsh} alt={currency} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
            <select
              value={currency}
              onChange={(e) => dispatch(setCurrency(e.target.value))}
              className="border border-gray-300 pl-10 pr-2 py-2 rounded-md focus:outline-none focus:ring focus:ring-black transition duration-300"
            >
              <option value="USD">USD</option>
              <option value="UZS">UZS</option>
            </select>
          </div>
        </div>
      </div>

      <header className="bg-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <img src={beauty} alt="Beauty Bay" className="w-[150px] h-auto" />
          </Link>

          <div className="flex-grow mx-6 hidden lg:block">
            <form onSubmit={handleSubmit}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search for products"
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:border-black focus:ring focus:ring-black transition duration-300"
              />
            </form>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative flex items-center transition duration-300 hover:text-indigo-600">
              <GiShoppingCart className="text-3xl text-gray-700" />
              {cart > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cart}
                </span>
              )}
            </Link>

            <Link to="/like" className="relative flex items-center transition duration-300 hover:text-indigo-600">
              <FcLike className="text-3xl text-gray-700" />
              {like > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {like}
                </span>
              )}
            </Link>

            <Link to="/profile" className="flex items-center transition duration-300 hover:text-indigo-600">
              <CgProfile className="text-3xl text-gray-700" />
            </Link>
          </div>
        </div>

        <nav className="bg-gray-50 py-2 shadow-md">
          <ul className="flex justify-around container mx-auto">
            {['Lipsticks', 'Bronzer', 'Eyebrows', 'Eyeshadows', 'Foundations', 'Lip liners', 'Blush', 'Mascaras', 'Nail polishes'].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase().replace(" ", "")}`} className="text-gray-700 hover:text-indigo-600 transition duration-300 px-4 py-2">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
