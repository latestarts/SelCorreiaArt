import HeroSection from "./HeroSection";
import ProductTeaseSection from "./ProductTeaseSection";
import ExploreSection from "./ExploreSection";
import AboutSection from "./AboutSection";

const Home = () => {
  return (
    <div className="section-stack">
      <HeroSection />
      <ProductTeaseSection />
      <ExploreSection />
      <AboutSection />
    </div>
  );
};

export default Home;
