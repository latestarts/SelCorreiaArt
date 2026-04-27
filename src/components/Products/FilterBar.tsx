import React, { useMemo } from "react";
import { Button, Popover, Tooltip } from "antd";

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
  blue: "#2f71cf",
  white: "#ffffff",
  pink: "#de7aa2",
  purple: "#7f58af",
  black: "#1f1a17",
  green: "#577c56",
  gold: "#cda86d",
  silver: "#c5c8cf",
  red: "#b84e43",
  orange: "#d78446",
  turquoise: "#4aa8ac",
  brown: "#8b5c44",
  clear: "transparent",
  multi: "#999999",
  "multi-color": "#999999",
};

const getColorCss = (colorName: string) => {
  const key = colorName.trim().toLowerCase();
  if (key === "multi" || key === "multi-color") {
    return "conic-gradient(#b84e43 0 18%, #d78446 18% 36%, #cda86d 36% 54%, #577c56 54% 72%, #4aa8ac 72% 86%, #7f58af 86% 100%)";
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
  const activeFilters = useMemo(
    () =>
      [
        selectedCategory ? { label: "Category", value: selectedCategory, clear: () => onCategoryChange(null) } : null,
        selectedColor ? { label: "Color", value: selectedColor, clear: () => onColorChange(null) } : null,
        selectedPrice ? { label: "Price", value: selectedPrice, clear: () => onPriceChange(null) } : null,
      ].filter(Boolean) as Array<{ label: string; value: string; clear: () => void }>,
    [onCategoryChange, onColorChange, onPriceChange, selectedCategory, selectedColor, selectedPrice]
  );

  const renderList = (
    items: string[],
    selected: string | null,
    onSelect: (value: string | null) => void
  ) => (
    <div className="filter-popover">
      <div className="filter-popover-list">
        <button
          type="button"
          className={`filter-popover-item ${!selected ? "filter-popover-item-active" : ""}`}
          onClick={() => onSelect(null)}
        >
          All
        </button>
        {items.map((item) => (
          <button
            type="button"
            key={item}
            className={`filter-popover-item ${
              selected === item ? "filter-popover-item-active" : ""
            }`}
            onClick={() => onSelect(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  const renderColorPalette = () => (
    <div className="filter-popover">
      <div className="color-palette">
        <Tooltip title="All colors">
          <button
            type="button"
            className={`color-clear ${!selectedColor ? "color-clear-active" : ""}`}
            onClick={() => onColorChange(null)}
          >
            ×
          </button>
        </Tooltip>
        {colors.map((color) => {
          const isSelected = selectedColor === color;
          const colorStyle = color.toLowerCase().includes("multi")
            ? { background: getColorCss(color) }
            : {
                backgroundColor: getColorCss(color),
                borderColor: isLightColor(color) ? "rgba(77, 53, 42, 0.2)" : undefined,
              };

          return (
            <Tooltip key={color} title={color}>
              <button
                type="button"
                className={`color-swatch ${isSelected ? "color-swatch-active" : ""}`}
                style={colorStyle}
                onClick={() => onColorChange(isSelected ? null : color)}
              />
            </Tooltip>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <div className="filter-bar">
        <Popover
          content={renderList(categories, selectedCategory, onCategoryChange)}
          trigger="click"
          placement="bottomLeft"
        >
          <Button className={`filter-trigger ${selectedCategory ? "filter-trigger-active" : ""}`}>
            Category: {selectedCategory ?? "All"}
          </Button>
        </Popover>

        <Popover content={renderColorPalette()} trigger="click" placement="bottomLeft">
          <Button className={`filter-trigger ${selectedColor ? "filter-trigger-active" : ""}`}>
            Color: {selectedColor ?? "All"}
          </Button>
        </Popover>

        <Popover
          content={renderList(priceRanges, selectedPrice, onPriceChange)}
          trigger="click"
          placement="bottomLeft"
        >
          <Button className={`filter-trigger ${selectedPrice ? "filter-trigger-active" : ""}`}>
            Price: {selectedPrice ?? "All"}
          </Button>
        </Popover>

        {activeFilters.length > 0 ? (
          <button type="button" className="text-reset-button" onClick={onClearAll}>
            Clear all filters
          </button>
        ) : null}
      </div>

      {activeFilters.length > 0 ? (
        <div className="active-filter-list" style={{ marginTop: "1rem" }}>
          {activeFilters.map((filter) => (
            <div key={filter.label} className="active-filter-chip">
              <span>
                {filter.label}: <strong>{filter.value}</strong>
              </span>
              <button type="button" onClick={filter.clear} aria-label={`Clear ${filter.label}`}>
                ×
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default FilterBar;
