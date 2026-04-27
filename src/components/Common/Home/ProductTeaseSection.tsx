import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import MotionReveal from "../MotionReveal";

const ProductTeaseSection = () => {
  return (
    <section className="section-block">
      <div className="section-shell split-layout">
        <MotionReveal className="editorial-media" direction="right">
          <img
            src={`${import.meta.env.VITE_BASE_URL}content-images/home-hero-3.jpg`}
            alt="Featured handcrafted resin art"
          />
          <div className="editorial-badge">
            <strong>Small batch, high detail</strong>
            <div style={{ marginTop: 4, fontSize: "0.9rem" }}>
              Products framed to feel premium before the visitor scrolls away.
            </div>
          </div>
        </MotionReveal>

        <MotionReveal direction="left" delay={0.08}>
          <span className="eyebrow">Why it sells</span>
          <h2 className="section-title">The shop now feels curated, not crowded.</h2>
          <p className="section-copy" style={{ marginTop: "1rem" }}>
            Instead of pushing every item equally, the redesigned layout creates
            a sense of selective craftsmanship. That raises perceived value and
            gives buyers a clearer path from discovery to purchase.
          </p>

          <div className="bullet-list">
            <div className="bullet-row">Large product imagery leads the decision.</div>
            <div className="bullet-row">Pricing and discount cues are easier to scan.</div>
            <div className="bullet-row">Mobile CTAs are thumb-friendly and always clear.</div>
          </div>

          <div className="inline-actions">
            <Link to="/product-list" className="btn-primary-brand">
              View all products <ArrowRightOutlined />
            </Link>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
};

export default ProductTeaseSection;
