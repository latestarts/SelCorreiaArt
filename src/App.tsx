import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PageLoader from "./components/Common/PageLoader";
import "./styles/route-transition.css";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";

// Lazy imports
const FloatingCartButton = lazy(() => import("./components/Common/CartButton"));
const Home = lazy(() => import("./components/Common/Home"));
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

  // useEffect(() => {
  //   const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  //     e.preventDefault();
  //     e.returnValue =
  //       "Are you sure you want to reload? All saved products in cart will be cleared.";
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  return (
    <div className="app-wrapper">
      <Header />
      <main
        key={location.pathname}
        className={`route-fade ${!isHomePage ? "main-content" : ""}`}
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
      </main>
      <Footer />
      <Suspense fallback={null}>
        <FloatingCartButton />
      </Suspense>
    </div>
  );
};

export default App;
