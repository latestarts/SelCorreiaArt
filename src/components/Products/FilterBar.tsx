import React, { useState, useEffect } from "react";
import { Popover, Button, Tooltip } from "antd";

interface FilterBarProps {
  categories: string[];
  colors: string[];
  priceRanges: string[];
  selectedCategory: string | null;
  selectedColor: string | null;
  selectedPrice: string | null;
  onCategoryChange: (category: string | null) => void;
  onColorChange: (color: string | null) => void;
  onPriceChange: (price: string | null) => void;
  onClearAll: () => void;
}

const colorNameToCss: Record<string, string> = {
  blue: "#007bff",
  white: "#ffffff",
  pink: "#ff69b4",
  purple: "#800080",
  black: "#000000",
  green: "#28a745",
  gold: "#ffd700",
  silver: "#c0c0c0",
  red: "#dc3545",
  orange: "#fd7e14",
  turquoise: "#40e0d0",
  brown: "#8b4513",
  clear: "transparent",
  multi: "#999999",
  "multi-color": "#999999",
};

const getColorCss = (colorName: string) => {
  const key = colorName.trim().toLowerCase();
  if (key === "multi" || key === "multi-color") {
    return `repeating-conic-gradient(#999 0% 25%, #ccc 25% 50%)`;
  }
  return colorNameToCss[key] || key;
};

const isLightColor = (colorName: string) => {
  const key = colorName.trim().toLowerCase();
  return key === "white" || key === "clear" || key === "silver";
};

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  colors,
  priceRanges,
  selectedCategory,
  selectedColor,
  selectedPrice,
  onCategoryChange,
  onColorChange,
  onPriceChange,
  onClearAll,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 576);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hasFiltersApplied =
    selectedCategory !== null ||
    selectedColor !== null ||
    selectedPrice !== null;

  const renderList = (
    items: string[],
    selected: string | null,
    onSelect: (val: string | null) => void
  ) => (
    <div style={{ maxHeight: 200, overflowY: "auto", minWidth: 150 }}>
      <div
        key="all"
        onClick={() => onSelect(null)}
        style={{
          padding: "6px 12px",
          cursor: "pointer",
          fontWeight: !selected ? "bold" : "normal",
        }}
      >
        All
      </div>
      {items.map((item) => (
        <div
          key={item}
          onClick={() => onSelect(item)}
          style={{
            padding: "6px 12px",
            cursor: "pointer",
            fontWeight: selected === item ? "bold" : "normal",
            backgroundColor: selected === item ? "#e6f7ff" : undefined,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );

  const renderColorPalette = () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        maxWidth: 200,
        maxHeight: 200,
        overflowY: "auto",
      }}
    >
      {/* "All Colors" circle */}
      <div
        onClick={() => onColorChange(null)}
        style={{
          position: "relative",
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: !selectedColor ? "2px solid #1890ff" : "1px solid #ccc",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          userSelect: "none",
        }}
        title="All Colors"
      >
        ×
      </div>

      {colors.map((color) => {
        const bgColor = getColorCss(color);
        const isSelected = selectedColor === color;
        return (
          <Tooltip key={color} title={color}>
            <div
              onClick={() => {
                if (isSelected) {
                  onColorChange(null);
                } else {
                  onColorChange(color);
                }
              }}
              style={{
                position: "relative",
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: color.toLowerCase().includes("multi")
                  ? bgColor
                  : undefined,
                backgroundColor: !color.toLowerCase().includes("multi")
                  ? bgColor
                  : undefined,
                border: isSelected
                  ? "2px solid #1890ff"
                  : isLightColor(color)
                  ? "1px solid #999"
                  : "1px solid transparent",
                cursor: "pointer",
              }}
            >
              {isSelected && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onColorChange(null);
                  }}
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "#1890ff",
                    color: "white",
                    borderRadius: "50%",
                    width: 16,
                    height: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 0 4px rgba(0,0,0,0.3)",
                  }}
                  title="Clear this color"
                >
                  ×
                </div>
              )}
            </div>
          </Tooltip>
        );
      })}
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "8px 0",
        alignItems: "center",
        gap: 16,
        flexWrap: isMobile ? "wrap" : "nowrap",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          flexWrap: isMobile ? "wrap" : "nowrap",
          justifyContent: "center",
        }}
      >
        <Popover
          content={renderList(categories, selectedCategory, onCategoryChange)}
          trigger="click"
          placement="bottom"
        >
          <Button type="default">Category: {selectedCategory ?? "All"}</Button>
        </Popover>

        <Popover
          content={renderColorPalette()}
          trigger="click"
          placement="bottom"
        >
          <Button type="default">Color: {selectedColor ?? "All"}</Button>
        </Popover>

        <Popover
          content={renderList(priceRanges, selectedPrice, onPriceChange)}
          trigger="click"
          placement="bottom"
        >
          <Button type="default">Price: {selectedPrice ?? "All"}</Button>
        </Popover>

        {hasFiltersApplied && (
          <Button type="link" danger onClick={onClearAll}>
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
