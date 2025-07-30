import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className="text-white position-relative d-flex align-items-center"
      style={{
        minHeight: "100vh",
        background: `url(${
          import.meta.env.VITE_BASE_URL
        }content-images/home-hero.jpg) no-repeat center center/cover`,
        overflow: "hidden",
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>

      <div className="container position-relative z-3">
        <div className="row align-items-center">
          <div className="col-lg-6 text-center text-lg-start">
            <TypeAnimation
              sequence={["SelCorreia Art", 2000, "", 1000]}
              wrapper="h1"
              speed={40}
              repeat={Infinity}
              className="display-2 fw-bold mb-4"
            />
            <p className="lead mb-4">
              Custom resin art inspired by nature, created with love and a touch
              of elegance.
            </p>
            <Link to="/product-list" className="btn btn-primary px-4 py-2">
              Browse Products
            </Link>
          </div>
          <div className="col-lg-6 d-none d-lg-block text-center">
            <img
              src={`${
                import.meta.env.VITE_BASE_URL
              }content-images/home-hero-2.jpg`}
              alt="Artist"
              className="img-fluid rounded-4 shadow float-animation"
              style={{ maxWidth: "80%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
