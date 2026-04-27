import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import PageLoader from "./components/Common/PageLoader";

const FloatingCartButton = lazy(() => import("./components/Common/CartButton"));
const Home = lazy(() => import("./components/Common/Home/Home"));
const Cart = lazy(() => import("./components/Common/Cart"));
const About = lazy(() => import("./components/Common/About"));
const ProductDetails = lazy(
  () => import("./components/Products/ProductDetails")
);
const VideoProductList = lazy(
  () => import("./components/VideoProduct/VideoProductList")
);
const ProductList = lazy(() => import("./components/Products/ProductList"));
const NotFound = lazy(() => import("./components/Common/NotFound"));

const App: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-wrapper">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className={`site-main ${!isHomePage ? "main-content" : ""}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route
              path="/"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/product-list"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProductList />
                </Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<PageLoader />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/product/:productId"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProductDetails />
                </Suspense>
              }
            />
            <Route
              path="/video-products"
              element={
                <Suspense fallback={<PageLoader />}>
                  <VideoProductList />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<PageLoader />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <Suspense fallback={null}>
        <FloatingCartButton />
      </Suspense>
    </div>
  );
};

export default App;
