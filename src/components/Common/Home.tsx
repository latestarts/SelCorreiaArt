import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const glassStyle = {
  background: "rgba(255, 255, 255, 0.25)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  padding: "2rem",
  color: "#fff", // white text for all glass sections
};

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="position-relative text-white"
        style={{
          height: "90vh",
          backgroundImage: 'url("/content-images/home-hero.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      >
        {/* Blur Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            zIndex: 1,
          }}
        />

        <div
          className="container h-100 d-flex align-items-center justify-content-between position-relative"
          style={{ zIndex: 2 }}
        >
          {/* Floating Artist Image */}
          <div className="col-md-5 d-none d-md-block">
            <img
              src="/content-images/artist-image.jpeg"
              alt="Artist"
              className="img-fluid float-animate"
              style={{
                maxWidth: "80%",
                borderRadius: "12px",
                border: "4px solid white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            />
          </div>
          {/* Text Left with Glass Background */}
          <div className="col-md-6" style={glassStyle}>
            <TypeAnimation
              sequence={[
                "SelCorreia Art",
                2000, // Wait after typing
                "", // Delete all text
                1000, // Pause before retyping
              ]}
              speed={20} // Typing and deleting speed
              deletionSpeed={50} // Optional: make deletion slightly faster
              wrapper="h1"
              repeat={Infinity}
              cursor={true}
              className="display-2 fw-bold"
            />

            <p className="lead mt-3">
              Visual poetry brought to life. Dive into curated collections that
              speak in colors, textures, and emotion.
            </p>
          </div>
        </div>
      </section>

      {/* Explore Products Section */}
      <section
        className="position-relative d-flex align-items-center"
        style={{
          minHeight: "100vh",
          backgroundImage: 'url("/content-images/home-hero-2.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      >
        {/* Blur Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            zIndex: 1,
          }}
        />

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            {/* Text Content with Glass Background */}
            <div className="col-md-6 mb-4 mb-md-0 me-5" style={glassStyle}>
              <h2 className="mb-3">Discover Our Collections</h2>
              <p>
                Dive into a selection of fine artwork inspired by nature,
                humanity, and abstraction. Each piece tells a unique story.
              </p>
              <Link
                to="/product-list"
                className="btn btn-primary mt-3 px-4 py-2"
              >
                Explore Products
              </Link>
            </div>

            {/* Floating Image */}
            <div className="col-md-5 d-none d-md-block ">
              <img
                src="/content-images/featured-art.jpg"
                alt="Featured Art"
                className="img-fluid float-animate"
                style={{
                  maxWidth: "80%",
                  borderRadius: "12px",
                  border: "4px solid white",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        className="d-flex align-items-center"
        style={{
          minHeight: "100vh",
          backgroundImage: 'url("/content-images/home-hero-3.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
          position: "relative",
          color: "#fff",
        }}
      >
        {/* Blur Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(0,0,0,0.55)",
            zIndex: 1,
          }}
        />

        <div
          className="container text-center position-relative"
          style={{ ...glassStyle, zIndex: 2 }}
        >
          <h2 className="mb-3">About SelCorreia Art</h2>
          <p className="mb-4">
            At SelCorreia, art isn't decoration—it's expression. From conceptual
            sketches to immersive canvases, we bring passion to pigment.
          </p>
          <Link to="/about" className="btn btn-outline-light px-4 py-2">
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
