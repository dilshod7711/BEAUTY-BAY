import { BiArrowToRight } from "react-icons/bi"; 

import "./BodyCare.css";
const BodyCare = () => {

   
 

  
  return (
   <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-[1500px] mx-auto bg-white mt-[100px] ">
      <div className="flex flex-col items-center text-center bg-white p-6 ">
        <img
          src="https://images.ctfassets.net/eoaaqxyywn6o/7hNkaoJiA32SZR3jEc8lc/2333d7cdbd2c495e3f42b84549365fb9/TT_LIPSTORY.gif"
          alt="Lip Product"
          className="w-full h-full object-cover rounded-t-lg"
        />
        <h1 className="text-2xl font-bold mt-4">The viral lip you've been waiting for</h1>
        <p className="text-gray-600 mt-2">Say hello to the all-day staying power of a lip stain with Wonderskin.</p>
       <span className="text-black mt-8 font-bold flex items-center gap-2 ml-2">
        Shop Now  <BiArrowToRight className="text-black mt-[2px]" />
       </span>
      </div>

      <div className="flex flex-col items-center text-center bg-white p-6 ">
        <img
          src="https://images.ctfassets.net/eoaaqxyywn6o/4beh2XCXNyiu5GIMWQ0p6y/8e1b1c779564cc5d2feafb78fc351bb7/Trading_Trio_ROW-NO_DR_JART.jpg"
          alt="Body Care Product"
          className="w-full h-full object-cover rounded-t-lg"
        />
        <h1 className="text-2xl font-bold mt-4">Head to toe glow</h1>
        <p className="text-gray-600 mt-2">
          Make way for clearer, calmer skin with body care newbies from Acnemey, The Ordinary, and more.
        </p>
       <span className="text-black mt-2 font-bold flex items-center gap-2 ml-2 ">
        Shop Now  <BiArrowToRight className="text-black mt-[2px]" />
       </span>
      </div>
    </div>
    <div>
        <div className="p-8 max-w-[1500px] mx-auto text-center">
             <img className="mx-auto w-[150px]" src="https://images.ctfassets.net/eoaaqxyywn6o/5Vukic1DKqF8l35OlJ3mYE/3862179c4693d4a147859af325a1bf08/EDITEDLOGO_Full_2.svg" alt="" />
             <p className="text-center text-gray-600 mt-8">Discover the latest and greatest in beauty, including tutorials, trends, reviews and advice.
             </p>
        </div>
        <div>
        <div className="p-8 max-w-[1500px] mx-auto">


        </div>
        </div>
    </div>
  
   </>
  );
};

export default BodyCare;
