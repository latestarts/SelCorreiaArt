import React from "react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <section>
      <div className="page-hero-panel" style={{ marginBottom: "1.6rem" }}>
        <div className="page-hero-grid">
          <div>
            <span className="eyebrow">About the studio</span>
            <h1 className="page-title">A warmer story behind every handcrafted piece.</h1>
            <p className="page-copy" style={{ marginTop: "1rem", maxWidth: "38rem" }}>
              This page now supports trust and purchase intent: who makes the work,
              what makes it personal, and why custom conversation is part of the experience.
            </p>
          </div>
          <div className="page-summary">
            <div className="summary-chip">
              <span className="summary-chip-label">Based in</span>
              <span className="summary-chip-value">Canada</span>
            </div>
            <div className="summary-chip">
              <span className="summary-chip-label">Focus</span>
              <span className="summary-chip-value">Resin art</span>
            </div>
            <div className="summary-chip">
              <span className="summary-chip-label">Orders</span>
              <span className="summary-chip-value">Custom friendly</span>
            </div>
          </div>
        </div>
      </div>

      <div className="about-grid">
        <div className="about-story-card about-panel">
          <span className="eyebrow">Studio story</span>
          <h2 className="section-title" style={{ fontSize: "3rem" }}>
            SelCorreiaArt is built around keepsakes that feel personal fast.
          </h2>
          <p className="section-copy">
            Based in Canada, the studio creates handcrafted resin work, custom
            gifts, jewelry, and small decor pieces that feel intimate rather
            than mass-produced. That is now reflected directly in the site’s
            layout, copy, and purchase flow.
          </p>
          <p className="section-copy">
            Each item is meant to carry texture, memory, and personality.
            Instead of a generic product wall, the updated interface gives each
            product more room to feel intentional and worth buying.
          </p>

          <div className="social-list">
            <a
              className="social-row"
              href="https://www.instagram.com/selina_correia/"
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <div className="social-row-label">Main account</div>
                <div className="social-row-value">@selina_correia</div>
              </div>
              <span className="pill pill-surface">Open Instagram</span>
            </a>
            <a
              className="social-row"
              href="https://www.instagram.com/selcorreia_art/"
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <div className="social-row-label">Art account</div>
                <div className="social-row-value">@selcorreia_art</div>
              </div>
              <span className="pill pill-surface">Open Instagram</span>
            </a>
            <div className="social-row">
              <div>
                <div className="social-row-label">Best for</div>
                <div className="social-row-value">Custom gifts and commissions</div>
              </div>
              <span className="pill pill-surface">Direct order</span>
            </div>
          </div>
        </div>

        <div>
          <div className="about-portrait">
            <img
              src={`${import.meta.env.VITE_BASE_URL}content-images/artist-image.jpeg`}
              alt="SelCorreiaArt artist portrait"
            />
          </div>

          <div className="about-highlight-grid" style={{ marginTop: "1.4rem" }}>
            <article className="value-card">
              <div className="feature-kicker">01</div>
              <h3>Custom-first</h3>
              <p>Products and ordering support one-on-one customization naturally.</p>
            </article>
            <article className="value-card">
              <div className="feature-kicker">02</div>
              <h3>Giftable presentation</h3>
              <p>The new layout gives each piece a more premium, present-worthy feel.</p>
            </article>
            <article className="value-card">
              <div className="feature-kicker">03</div>
              <h3>Mobile confidence</h3>
              <p>Phone users get large imagery, better spacing, and easier buying actions.</p>
            </article>
          </div>

          <div className="inline-actions">
            <Link to="/product-list" className="btn-primary-brand">
              Explore products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
