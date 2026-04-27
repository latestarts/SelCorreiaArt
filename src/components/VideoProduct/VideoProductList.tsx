import { Col, Row } from "antd";
import productsWithVideos from "../../data/productWithVideo";
import type { Product } from "../../types/Product";
import VideoProductCard from "./VideoProductCard";

const VideoProductList: React.FC = () => {
  return (
    <section>
      <div className="page-hero-panel" style={{ marginBottom: "1.6rem" }}>
        <div className="page-hero-grid">
          <div>
            <span className="eyebrow">Studio motion</span>
            <h1 className="page-title">Short-form product highlights.</h1>
            <p className="page-copy" style={{ marginTop: "1rem", maxWidth: "36rem" }}>
              Video cards now feel aligned with the handmade brand instead of unrelated demo content.
            </p>
          </div>
        </div>
      </div>

      <Row gutter={[22, 22]} justify="center">
        {productsWithVideos.map((product: Product & { video: string }) => (
          <Col
            key={product.id}
            xs={24}
            sm={12}
            md={12}
            lg={8}
            xl={6}
            className="d-flex justify-content-center"
          >
            <VideoProductCard product={product} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default VideoProductList;
