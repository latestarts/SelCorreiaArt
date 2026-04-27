import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Col, Pagination, Row } from "antd";
import products from "../../data/products";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import type { Product } from "../../types/Product";
import MotionReveal from "../Common/MotionReveal";

const priceRanges = ["Under $15", "$15 - $20", "$20 - $25", "Above $25"];

const parsePrice = (priceStr: string): number =>
  Number(priceStr.replace(/[^0-9.-]+/g, ""));

const getUniqueCategories = (items: Product[]) => {
  const set = new Set<string>();
  items.forEach((product) => {
    if (product.category) {
      set.add(product.category);
    }
  });
  return Array.from(set).sort();
};

const getUniqueColors = (items: Product[]) => {
  const set = new Set<string>();
  items.forEach((product) => {
    if (!product.color) {
      return;
    }

    product.color.split(",").forEach((value) => {
      const color = value.trim().toLowerCase();
      if (color === "multi" || color === "multi-color") {
        set.add("Multi-color");
      } else if (color) {
        set.add(color.charAt(0).toUpperCase() + color.slice(1));
      }
    });
  });
  return Array.from(set).sort();
};

const filterByPriceRange = (price: number, range: string) => {
  switch (range) {
    case "Under $15":
      return price < 15;
    case "$15 - $20":
      return price >= 15 && price <= 20;
    case "$20 - $25":
      return price > 20 && price <= 25;
    case "Above $25":
      return price > 25;
    default:
      return true;
  }
};

const ProductList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    () => searchParams.get("category")
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    () => searchParams.get("color")
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(
    () => searchParams.get("price")
  );
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page, 10) : 1;
  });
  const [pageSize, setPageSize] = useState<number>(() => {
    const size = searchParams.get("pageSize");
    return size ? parseInt(size, 10) : 12;
  });
  const [isCompact, setIsCompact] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const onResize = () => setIsCompact(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const uniqueCategories = useMemo(() => getUniqueCategories(products), []);
  const uniqueColors = useMemo(() => getUniqueColors(products), []);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (selectedCategory) params.category = selectedCategory;
    if (selectedColor) params.color = selectedColor;
    if (selectedPrice) params.price = selectedPrice;
    if (currentPage !== 1) params.page = currentPage.toString();
    if (pageSize !== 12) params.pageSize = pageSize.toString();
    setSearchParams(params);
  }, [
    currentPage,
    pageSize,
    selectedCategory,
    selectedColor,
    selectedPrice,
    setSearchParams,
  ]);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        if (selectedCategory && product.category !== selectedCategory) {
          return false;
        }

        if (selectedColor) {
          const colors = product.color
            ? product.color
                .toLowerCase()
                .split(",")
                .map((color) => color.trim())
            : [];

          const matchesColor = colors.some(
            (color) =>
              color === selectedColor.toLowerCase() ||
              (selectedColor.toLowerCase() === "multi-color" &&
                (color === "multi" || color === "multi-color"))
          );

          if (!matchesColor) {
            return false;
          }
        }

        if (selectedPrice) {
          const priceNumber = parsePrice(product.price);
          if (!filterByPriceRange(priceNumber, selectedPrice)) {
            return false;
          }
        }

        return true;
      }),
    [selectedCategory, selectedColor, selectedPrice]
  );

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);
  const activeFilters = [selectedCategory, selectedColor, selectedPrice].filter(Boolean).length;
  const averagePrice =
    filteredProducts.reduce((sum, product) => sum + parsePrice(product.price), 0) /
      (filteredProducts.length || 1);

  return (
    <section className="page-hero">
      <MotionReveal className="page-hero-panel">
        <div className="page-hero-grid">
          <div>
            <span className="eyebrow">Shop the collection</span>
            <h1 className="page-title">Products that look intentional on every screen.</h1>
            <p className="page-copy" style={{ marginTop: "1rem", maxWidth: "38rem" }}>
              The browsing layout now prioritizes large visuals, cleaner pricing,
              and stronger CTA rhythm so users can decide faster. Most pieces
              can also be customized by color, name, initial, theme, or gifting
              occasion before you order.
            </p>
          </div>

          <div className="page-summary">
            <div className="summary-chip">
              <span className="summary-chip-label">Products</span>
              <span className="summary-chip-value">{filteredProducts.length}</span>
            </div>
            <div className="summary-chip">
              <span className="summary-chip-label">Filters active</span>
              <span className="summary-chip-value">{activeFilters}</span>
            </div>
            <div className="summary-chip">
              <span className="summary-chip-label">Average price</span>
              <span className="summary-chip-value">${averagePrice.toFixed(0)}</span>
            </div>
          </div>
        </div>

        <FilterBar
          categories={uniqueCategories}
          colors={uniqueColors}
          priceRanges={priceRanges}
          selectedCategory={selectedCategory}
          selectedColor={selectedColor}
          selectedPrice={selectedPrice}
          onCategoryChange={(category) => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
          onColorChange={(color) => {
            setSelectedColor(color);
            setCurrentPage(1);
          }}
          onPriceChange={(price) => {
            setSelectedPrice(price);
            setCurrentPage(1);
          }}
          onClearAll={() => {
            setSelectedCategory(null);
            setSelectedColor(null);
            setSelectedPrice(null);
            setCurrentPage(1);
          }}
        />

        <div className="custom-strip">
          <strong>Custom orders are welcome.</strong>
          <span>
            If you like a shape but want different colors, names, initials,
            flowers, glitter, charms, or a gift theme, send it with your order
            and we will confirm the details.
          </span>
        </div>
      </MotionReveal>

      <Row gutter={[22, 22]} justify="center" className="product-grid">
        {paginatedProducts.length === 0 ? (
          <Col span={24}>
            <div className="empty-state">
              <h2 className="section-title" style={{ fontSize: "2.4rem" }}>
                No products match these filters.
              </h2>
              <p className="section-copy" style={{ maxWidth: "32rem", margin: "0.75rem auto 0" }}>
                Clear the filters to bring the full collection back and keep the shopping flow moving.
              </p>
              <button
                type="button"
                className="btn-primary-brand"
                style={{ marginTop: "1.5rem", border: 0 }}
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedColor(null);
                  setSelectedPrice(null);
                  setCurrentPage(1);
                }}
              >
                Reset filters
              </button>
            </div>
          </Col>
        ) : (
          paginatedProducts.map((product) => (
            <Col
              key={product.id}
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={6}
              className="d-flex justify-content-center"
            >
              <ProductCard product={product} />
            </Col>
          ))
        )}
      </Row>

      {filteredProducts.length > pageSize && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredProducts.length}
            onChange={(page, size) => {
              setCurrentPage(page);
              if (size) {
                setPageSize(size);
              }
            }}
            responsive
            showLessItems={isCompact}
            showSizeChanger={!isCompact}
            pageSizeOptions={["8", "12", "16", "24"]}
          />
        </div>
      )}
    </section>
  );
};

export default ProductList;
