import products from "../../../data/products";

const ExploreSection = () => {
  // Helper to get first product image by category
  const getProductByCategory = (category: string) =>
    products.find((p) => p.category?.toLowerCase() === category.toLowerCase());

  const earrings = getProductByCategory("Earrings");
  const bracelets = getProductByCategory("Bracelet");
  const keychains = getProductByCategory("Keychain");

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="fw-bold">Explore Unique Creations</h2>
          <p className="text-muted">
            Discover how different forms of resin art come to life. Each piece
            is carefully handcrafted to express personality and elegance.
          </p>
        </div>

        <div className="row g-4">
          {/* Earrings */}
          <div className="col-md-4" data-aos="fade-right">
            {earrings && (
              <div className="d-flex flex-column align-items-center text-center h-100">
                <img
                  src={earrings.image}
                  alt={earrings.name}
                  className="img-fluid rounded shadow"
                  style={{ maxWidth: "300px" }}
                />
                <h4 className="mt-3">Elegant Earrings</h4>
                <p className="text-muted">
                  Shimmery, lightweight statement earrings
                </p>
              </div>
            )}
          </div>

          {/* Bracelets */}
          <div className="col-md-4" data-aos="zoom-in">
            {bracelets && (
              <div className="d-flex flex-column align-items-center text-center h-100">
                <img
                  src={bracelets.image}
                  alt={bracelets.name}
                  className="img-fluid rounded shadow"
                  style={{ maxWidth: "300px" }}
                />
                <h4 className="mt-3">Artistic Bracelets</h4>
                <p className="text-muted">
                  Wrap your wrist in handmade beauty that tells a story.
                </p>
              </div>
            )}
          </div>

          <div className="col-md-4" data-aos="fade-left">
            {keychains && (
              <div className="d-flex flex-column align-items-center text-center h-100">
                <img
                  src={keychains.image}
                  alt={keychains.name}
                  className="img-fluid rounded shadow"
                  style={{ maxWidth: "300px" }}
                />
                <h4 className="mt-3">Custom Keychains</h4>
                <p className="text-muted">
                  Personalized keychains with a fun twist.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
