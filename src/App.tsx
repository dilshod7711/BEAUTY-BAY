import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "./App.css";
import bay from "./assets/bay.webp";

const Home = lazy(() => import("./routes/home/Home"));
const Cart = lazy(() => import("./routes/cart/Cart"));
const Like = lazy(() => import("./routes/like/Like"));
const Details = lazy(() => import("./routes/details/Deatels"));
const Blush = lazy(() => import("./routes/blush/Blush"));
const Bronzer = lazy(() => import("./routes/bronzer/Bronzer"));
const Eyebrows = lazy(() => import("./routes/Eyebrows/Eyebrows"));
const Eyeshadows = lazy(() => import("./routes/Eyeshadows/Eyeshadows"));
const Foundations = lazy(() => import("./routes/Foundations/Foundations"));
const Lipliners = lazy(() => import("./routes/Lipliners/Lipliners"));
const Lipsticks = lazy(() => import("./routes/Lipsticks/Lipsticks"));
const Mascaras = lazy(() => import("./routes/Mascaras/Mascaras"));
const Nailpolishes = lazy(() => import("./routes/Nailpolishes/Nailpolishes"));
const NotFound = lazy(() => import("./routes/NotFound/NotFound"));

const BeautyBaySpinner: React.FC = () => (
  <div className="image-container">
    <img src={bay} alt="Loading Bay" className="bay-image" />
  </div>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <BeautyBaySpinner />
      ) : (
        <Suspense fallback={<BeautyBaySpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/like" element={<Like />} />
            <Route path="/details/:productId" element={<Details />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/blush" element={<Blush />} />
            <Route path="/bronzer" element={<Bronzer />} />
            <Route path="/eyebrows" element={<Eyebrows />} />
            <Route path="/eyeshadows" element={<Eyeshadows />} />
            <Route path="/foundations" element={<Foundations />} />
            <Route path="/lipliners" element={<Lipliners />} />
            <Route path="/lipsticks" element={<Lipsticks />} />
            <Route path="/mascaras" element={<Mascaras />} />
            <Route path="/nailpolishes" element={<Nailpolishes />} />
          </Routes>
        </Suspense>
      )}
      <Footer />
    </>
  );
};

export default App;
