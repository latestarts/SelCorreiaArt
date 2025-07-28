import { Col, Row } from "antd";
import VideoProductCard from "./VideoProductCard";
import productsWithVideos from "../../data/productWithVideo";
import type { Product } from "../../types/Product";

const VideoProductList: React.FC = () => {
  return (
    <div className="container">
      <h2 className="text-center mb-4">Featured Video Products</h2>
      <Row gutter={[24, 24]} justify="center">
        {productsWithVideos.map(
          (product: Product & { video: string; description: string }) => (
            <Col
              key={product.id}
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={6}
              className="d-flex justify-content-center"
            >
              <VideoProductCard product={product} />
            </Col>
          )
        )}
      </Row>
    </div>
  );
};

export default VideoProductList;
