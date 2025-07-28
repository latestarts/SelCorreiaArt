import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Col, Row, Pagination } from "antd";
import products from "../../data/products";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import type { Product } from "../../types/Product";

const priceRanges = ["Under $15", "$15 - $20", "$20 - $25", "Above $25"];

const parsePrice = (priceStr: string): number => {
  return Number(priceStr.replace(/[^0-9.-]+/g, ""));
};

const getUniqueCategories = (products: Product[]) => {
  const set = new Set<string>();
  products.forEach((p: Product) => {
    if (p.category) set.add(p.category);
  });
  return Array.from(set).sort();
};

const getUniqueColors = (products: Product[]) => {
  const set = new Set<string>();
  products.forEach((p: Product) => {
    if (!p.color) return;
    p.color.split(",").forEach((c) => {
      const color = c.trim().toLowerCase();
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

  // Initialize state from URL params or null
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() =>
    searchParams.get("category")
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(() =>
    searchParams.get("color")
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(() =>
    searchParams.get("price")
  );
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const p = searchParams.get("page");
    return p ? parseInt(p, 10) : 1;
  });
  const [pageSize, setPageSize] = useState<number>(() => {
    const s = searchParams.get("pageSize");
    return s ? parseInt(s, 10) : 12;
  });

  const uniqueCategories = useMemo(() => getUniqueCategories(products), []);
  const uniqueColors = useMemo(() => getUniqueColors(products), []);

  // Update URL params whenever filters or pagination change
  useEffect(() => {
    const params: Record<string, string> = {};
    if (selectedCategory) params.category = selectedCategory;
    if (selectedColor) params.color = selectedColor;
    if (selectedPrice) params.price = selectedPrice;
    if (currentPage !== 1) params.page = currentPage.toString();
    if (pageSize !== 12) params.pageSize = pageSize.toString();

    setSearchParams(params);
  }, [
    selectedCategory,
    selectedColor,
    selectedPrice,
    currentPage,
    pageSize,
    setSearchParams,
  ]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      if (selectedColor) {
        const colors = product.color
          ? product.color
              .toLowerCase()
              .split(",")
              .map((c) => c.trim())
          : [];
        if (
          !colors.some(
            (c) =>
              c === selectedColor.toLowerCase() ||
              (selectedColor.toLowerCase() === "multi-color" &&
                (c === "multi" || c === "multi-color"))
          )
        ) {
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
    });
  }, [selectedCategory, selectedColor, selectedPrice]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div className="container">
      <h2 className="text-center mb-4">Featured Products</h2>

      <FilterBar
        categories={uniqueCategories}
        colors={uniqueColors}
        priceRanges={priceRanges}
        selectedCategory={selectedCategory}
        selectedColor={selectedColor}
        selectedPrice={selectedPrice}
        onCategoryChange={(cat) => {
          setSelectedCategory(cat);
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

      <Row gutter={[24, 24]} justify="center" className="mt-3">
        {paginatedProducts.length === 0 ? (
          <p>No products found for selected filters.</p>
        ) : (
          paginatedProducts.map((product) => (
            <Col
              key={product.id}
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={6}
              className="d-flex justify-content-center"
            >
              <ProductCard product={product} />
            </Col>
          ))
        )}
      </Row>

      <div className="d-flex justify-content-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredProducts.length}
          onChange={(page, size) => {
            setCurrentPage(page);
            if (size) setPageSize(size);
          }}
          showSizeChanger
          pageSizeOptions={["8", "12", "16", "24"]}
        />
      </div>
    </div>
  );
};

export default ProductList;
