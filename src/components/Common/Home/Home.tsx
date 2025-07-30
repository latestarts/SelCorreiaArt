import HeroSection from "./HeroSection";
import ProductTeaseSection from "./ProductTeaseSection";
import ExploreSection from "./ExploreSection";
import AboutSection from "./AboutSection";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/aos@2.3.1/dist/aos.js";
    script.onload = () => {
      if (window && window.Aos) {
        window.Aos.init({ duration: 1000 });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    // Bootstrap class 'overflow-hidden' prevents horizontal overflow
    <div className="overflow-hidden">
      <HeroSection />
      <ProductTeaseSection />
      <ExploreSection />
      <AboutSection />
    </div>
  );
};

export default Home;
