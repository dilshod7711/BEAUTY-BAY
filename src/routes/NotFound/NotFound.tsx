import { Link } from 'react-router-dom';
import { AlertTriangle, Home, Search, ArrowRightCircle } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full px-4">
      <div className="max-w-[1500px] w-full p-10 bg-white shadow-lg rounded-lg text-center relative mt-[-100px]">
        <div className="animate-shake">
          <AlertTriangle className="mx-auto text-yellow-500 w-20 h-20 mb-4" />
        </div>
        <h1 className="text-[130px] font-extrabold text-gray-800 mb-4 tracking-tight drop-shadow-lg">404</h1>
        <h2 className="text-4xl font-bold text-gray-700 mb-6">
          Sahifa topilmadi!
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          Kechirasiz, siz izlayotgan sahifa mavjud emas yoki o'zgartirilgan.
        </p>

        <div className="mb-8">
          <div className="flex items-center justify-center">
            <Search className="text-gray-500 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Sahifani qidirish"
              className="border-b-2 border-gray-300 focus:border-blue-500 outline-none px-2 py-1 w-full max-w-xs"
            />
            <ArrowRightCircle className="text-blue-600 w-6 h-6 ml-2 cursor-pointer" />
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform duration-300 transform hover:scale-105 shadow-md"
        >
          <Home className="mr-3 h-6 w-6" />
          Bosh sahifaga qaytish
        </Link>

        <div className="absolute -top-5 right-10 w-16 h-16 bg-blue-500 rounded-full opacity-20"></div>
        <div className="absolute -bottom-10 left-8 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
      </div>
    </div>
  );
};

export default NotFound;
