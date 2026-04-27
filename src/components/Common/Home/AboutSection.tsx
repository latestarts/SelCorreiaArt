import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import MotionReveal from "../MotionReveal";

const AboutSection = () => {
  return (
    <section className="section-block">
      <MotionReveal className="cta-panel">
        <span className="eyebrow" style={{ color: "rgba(255, 249, 242, 0.72)" }}>
          Artist-led brand
        </span>
        <h2 className="section-title" style={{ maxWidth: "34rem", marginTop: 0 }}>
          Buyers trust handmade work faster when the maker feels present.
        </h2>
        <p className="section-copy" style={{ maxWidth: "38rem", marginTop: "1rem" }}>
          The about section now supports the sale instead of distracting from
          it. It builds confidence, adds personality, and gives the products a
          stronger story context.
        </p>
        <div className="inline-actions">
          <Link to="/about" className="btn-secondary-brand">
            Learn more about Selina <ArrowRightOutlined />
          </Link>
        </div>
      </MotionReveal>
    </section>
  );
};

export default AboutSection;
