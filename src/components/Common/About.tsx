import React from "react";
import aboutLogo from "/icons/SelCorreiaArtLogo.jpeg"; // Ensure this image is available

const About: React.FC = () => {
  return (
    <div className="container-fluid px-md-5">
      {/* Title */}
      <h2 className="text-center mb-5 text-primary">About SelCorreia Art</h2>

      {/* Main Content Row */}
      <div className="row align-items-center">
        {/* Left Text Section */}
        <div className="col-md-6 mb-4 mb-md-0">
          <h4 className="text-dark">Welcome to SelCorreia Art</h4>
          <p>
            SelCorreia Art is a Canadian-based creative studio specializing in
            unique handcrafted resin art, personalized sketches, paintings, and
            custom gifts.
          </p>
          <p>
            Each creation is a reflection of individuality, passion, and
            artistic precision. From elegant resin coasters to intricate
            paintings, every item is lovingly made.
          </p>
          <ul className="list-unstyled">
            <li>📍 Based in Canada | Self-Taught Resin Artist</li>
            <li>✨ Custom Coasters | Jewelry | Art Prints | Decor</li>
            <li>📬 DM or Email for Orders & Commissions</li>
            <li>
              Main Account: <strong>@selina_correia</strong>
            </li>
            <li>
              Art Account: <strong>@selcorreia_art</strong>
            </li>
          </ul>
        </div>

        {/* Right Logo Image */}
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src={aboutLogo}
            alt="SelCorreia Art Logo"
            className="img-fluid rounded shadow float-animate"
            style={{ maxHeight: "280px", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Divider */}
      <hr className="my-5" />

      {/* Artists Section */}
      <div className="text-center">
        <h3 className="text-secondary mb-4">🎨 Meet the Artist</h3>
        <div className="row justify-content-center">
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">SelCorreia Art</h5>
                <p className="card-text text-muted">
                  A self-taught artist who brings ideas to life through resin,
                  sketching, and painting. Known for thoughtful detail and
                  personal touches. Connect for custom pieces or personalized
                  commissions.
                </p>
                <p className="mb-0">
                  🎨 Main Account: <strong>@selina_correia</strong>
                  <br />
                  🖌️ Art Account: <strong>@selcorreia_art</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
