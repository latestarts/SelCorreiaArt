import { ArrowRightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <section className="hero-section">
      <div className="hero-grid">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">Made in Canada</span>
          <div className="hero-copy">
            <h1 className="hero-title">SelCorreiaArt</h1>
            <p className="hero-lede">
              Small-batch creations that feel personal instantly.
            </p>
            <p className="hero-subtitle">
              SelCorreiaArt turns resin, color, and detail into keepsakes that
              feel intimate, giftable, and ready to order. See something close
              to your idea? We also make customized items with names, colors,
              themes, charms, and gift-ready details.
            </p>
          </div>

          <div className="hero-actions">
            <Link to="/product-list" className="btn-primary-brand">
              Shop the collection <ArrowRightOutlined />
            </Link>
            <Link to="/about" className="btn-secondary-brand">
              Meet the artist
            </Link>
          </div>

          <div className="custom-callout">
            <strong>Want it customized?</strong>
            <span>
              Message us for personalized colors, initials, names, keepsake
              details, or a completely custom gift idea.
            </span>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-value">34+</span>
              <span className="stat-label">Custom-ready pieces across jewelry, gifts, and decor.</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">1:1</span>
              <span className="stat-label">Conversation-first ordering through direct WhatsApp checkout.</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">Giftable</span>
              <span className="stat-label">Designed to feel premium on desktop and effortless on phone.</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <div className="hero-frame hero-frame-main">
            <img src={`${baseUrl}content-images/home-hero.jpg`} alt="Featured resin artwork" />
          </div>
          <div className="hero-frame hero-frame-secondary">
            <img src={`${baseUrl}content-images/home-hero-2.jpg`} alt="Artist with handcrafted work" />
          </div>
          <div className="hero-floating-note">
            <span className="hero-note-title">Conversion-focused layout</span>
            <p className="hero-note-copy">
              Strong imagery, fewer distractions, and clear CTAs keep the buyer
              moving toward product pages and checkout.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
