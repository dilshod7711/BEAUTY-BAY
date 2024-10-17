import by from "../../assets/by.png";
import ave from "../../assets/ave.png";
import jos from "../../assets/jos.png";
import skin from "../../assets/skin.png";
import mie from "../../assets/mie.png";
import cera from "../../assets/cera.png";
import hair from "../../assets/hair.png";
import "./Brand.css"
const Brand = () => {
  return (
    <div className="p-8 max-w-[1500px] mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">SHOP BY BRAND</h1>
      <div className="flex space-x-6 overflow-x-auto py-4 custom-scrollbar">
        {[
          { img: by, name: "BY BEAUTY BAY" },
          { img: ave, name: "AVENE" },
          { img: jos, name: "BEAUTY OF JOSEON" },
          { img: skin, name: "SKIN1004" },
          { img: mie, name: "MIELLE ORGANICS" },
          { img: cera, name: "CERAVE" },
          { img: hair, name: "HAIRMAX" },
        ].map((brand, index) => (
          <div key={index} className="flex-shrink-0 flex flex-col items-center p-6 rounded-lg transition-all hover:scale-105">
            <img src={brand.img} alt={brand.name} className="h-[300px] w-auto object-contain" />
            <h1 className="text-xl font-semibold mt-4 text-gray-800">{brand.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brand;
