import { Link } from "react-router-dom";

const ProductTeaseSection = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col-md-6 mb-4 mb-md-0 d-flex justify-content-center"
            data-aos="fade-right"
          >
            <img
              src={`${
                import.meta.env.VITE_BASE_URL
              }content-images/home-hero-3.jpg`}
              alt="Featured Product"
              className="img-fluid rounded shadow"
              style={{
                maxWidth: "100%",
                maxHeight: "500px",
                objectFit: "cover",
              }}
            />
          </div>

          <div className="col-md-6" data-aos="fade-left">
            <h2 className="fw-bold">Discover the Craft</h2>
            <p>
              From elegant coasters to bold wall art, every piece reflects a
              balance of chaos and beauty.
            </p>
            <Link to="/product-list" className="btn btn-outline-primary">
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductTeaseSection;
