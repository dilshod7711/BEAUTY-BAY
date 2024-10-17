
const Banner = () => {



  return (
    <div className="relative flex max-w-[1500px] mx-auto mt-10 ">
      <img
        src="https://images.ctfassets.net/eoaaqxyywn6o/6YHtbyv9EhTTtXMv1h7UJ0/23493e19313777ada9fe69c8c8a24b42/Hero-Banner_Celestial_Launch_Grid.gif"
        alt="Banner Background"
        className="w-[1100px] h-[600px] object-cover"
      />

      <div className="absolute top-0 right-0 h-[350px] w-[600px] bg-[#4a1f34] text-white p-12 flex flex-col justify-center mt-[120px]">
        <div className="max-w-[500px]">
          <h1 className="text-3xl font-bold uppercase mb-4 text-center">Colours of the Cosmos</h1>
          <p className="mb-6 max-w-[400px] text-center mx-auto">
            Your ethereal side is calling. Go beyond with the new By BEAUTY BAY Celestial Charms Collection.
          </p>
          <button 
           
            className="px-6 py-2 bg-white ml-[140px] text-black font-bold rounded shadow hover:bg-gray-200 transition-transform transform hover:scale-105 w-[200px] mx-auto">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
