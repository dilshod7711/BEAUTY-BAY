import { AiOutlineInstagram } from "react-icons/ai";
import { Carousel } from 'antd';
import './Community.css'; 

const Community = () => {
  return (
    <>
      <div className=" max-w-7xl mx-auto px-4 py-12 mt-[100px]">
        <div className="flex items-center justify-between gap-[100px]">
          
          <div className="w-1/2 ml-[-100px]">
            <div className="flex justify-start items-center gap-2 mb-2">
              <AiOutlineInstagram className="text-4xl text-red-500" />
              <h1 className="text-4xl font-bold text-gray-800">Our Community</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-[900px] w-full">
              Show us your latest looks using <span className="font-semibold text-red-500">#BEAUTYBAYhaul</span> for a chance to appear on our homepage.
            </p>
          </div>

          <div className="w-[900px]">
            <Carousel
              arrows
              infinite
              autoplay
              autoplaySpeed={3000}
              slidesToShow={4}
              slidesToScroll={1}
              dots={false}
              prevArrow={<button className="custom-arrow prev-arrow ">←</button>}
              nextArrow={<button className="custom-arrow next-arrow">→</button>}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ]}
              className="rounded-lg overflow-hidden"
            >
              {[
                "//cdn-yotpo-images-production.yotpo.com/instagram/3/18400391236072203/low_resolution.jpg",
                "https://cdn-yotpo-images-production.yotpo.com/instagram/1/18025425016917401/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/81/18038466841847481/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/20/18350641783097820/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/22/18036721687843422/standard_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/66/18425958460033066/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/72/17956105775642572/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/96/18075854371473196/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/59/18025896440079259/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/87/18097957123392487/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/13/18008474066175013/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/19/17930842517835619/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/64/17858892963118664/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/86/18020852936294186/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/12/18327507367141312/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/73/18030703894744373/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/2/18310751815122902/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/81/18023802526936181/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/44/18036754666656144/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/15/18007653791477215/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/29/17946812432727129/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/90/17865666276038290/low_resolution.jpg",
                "//cdn-yotpo-images-production.yotpo.com/instagram/14/17867514780010514/low_resolution.jpg",
              ].map((src, index) => (
                <div key={index} className="px-2">
                  <img
                    src={src}
                    alt={`Community image ${index + 1}`}
                    className="w-[300px] h-[250px] object-cover rounded-md"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;
