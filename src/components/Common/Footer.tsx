import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-panel">
        <div className="footer-grid">
          <div className="footer-copy">
            <div className="footer-brand">SelCorreiaArt</div>
            <p className="footer-note">
              Handmade resin art, gifts, and keepsakes designed to feel personal
              before they ever reach the cart.
            </p>
          </div>
          <div className="footer-meta">
            <p style={{ margin: 0 }}>Custom orders, gifting, and one-of-one pieces.</p>
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/selina_correia/"
                target="_blank"
                rel="noreferrer"
              >
                @selina_correia
              </a>
              <a
                href="https://www.instagram.com/selcorreia_art/"
                target="_blank"
                rel="noreferrer"
              >
                @selcorreia_art
              </a>
            </div>
            <p style={{ margin: "0.4rem 0 0", color: "rgba(255, 249, 242, 0.62)" }}>
              &copy; {new Date().getFullYear()} SelCorreiaArt. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
