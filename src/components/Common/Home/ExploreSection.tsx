import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import products from "../../../data/products";
import MotionReveal from "../MotionReveal";

const ExploreSection = () => {
  const getProductByCategory = (category: string) =>
    products.find((product) => product.category?.toLowerCase() === category.toLowerCase());

  const categories = [
    {
      key: "Earrings",
      title: "Elegant Earrings",
      description: "Light-catching statement pieces that instantly read as handmade.",
      product: getProductByCategory("Earrings"),
    },
    {
      key: "Bracelet",
      title: "Artistic Bracelets",
      description: "Small-batch bracelet designs that look gift-worthy at first glance.",
      product: getProductByCategory("Bracelet"),
    },
    {
      key: "Keychain",
      title: "Custom Keychains",
      description: "Personal pieces with emotional pull, ideal for impulse-friendly gifting.",
      product: getProductByCategory("Keychain"),
    },
  ];

  return (
    <section className="section-block">
      <div className="section-shell">
        <MotionReveal className="section-intro">
          <span className="eyebrow">Shop by feeling</span>
          <h2 className="section-title">Collections with clearer emotional hooks.</h2>
          <p className="section-copy" style={{ marginTop: "1rem" }}>
            Each category card now supports buying intent: one strong image, one
            tight message, and one next action instead of a generic grid wall.
          </p>
        </MotionReveal>

        <div className="category-grid">
          {categories.map(
            (category, index) =>
              category.product && (
                <MotionReveal
                  key={category.key}
                  className="category-card"
                  delay={index * 0.08}
                >
                  <img src={category.product.image} alt={category.product.name} />
                  <div className="category-content">
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                    <Link
                      to={`/product-list?category=${encodeURIComponent(category.key)}`}
                      className="category-link"
                    >
                      Explore this collection <ArrowRightOutlined />
                    </Link>
                  </div>
                </MotionReveal>
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
