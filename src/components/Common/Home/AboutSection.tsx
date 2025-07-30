import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section
      className="text-white py-5"
      style={{
        background: `linear-gradient(to bottom right, #141e30, #243b55)`,
      }}
    >
      <div className="container text-center" data-aos="zoom-in">
        <h2 className="fw-bold mb-3">About SelCorreia Art</h2>
        <p className="lead">
          We create expressive resin art that captures the textures of nature
          and the soul of storytelling.
        </p>
        <Link to="/about" className="btn btn-light mt-3 px-4 py-2">
          Learn More
        </Link>
      </div>
    </section>
  );
};

export default AboutSection;
