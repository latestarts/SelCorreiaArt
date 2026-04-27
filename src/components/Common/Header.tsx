import React, { useMemo, useState } from "react";
import { MenuOutlined, MoonOutlined, ShoppingOutlined, SunOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Drawer, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useTheme } from "../../context/ThemeContext";

const Header: React.FC = () => {
  const cartCount = useAppSelector((state) => state.cart.items.length);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const cartLabel = `${cartCount} ${cartCount === 1 ? "item" : "items"}`;

  const menuItems = useMemo(
    () => [
      { key: "home", label: "Home", path: "/" },
      { key: "products", label: "Shop", path: "/product-list" },
      { key: "about", label: "About", path: "/about" },
      { key: "cart", label: `Cart (${cartCount})`, path: "/cart" },
    ],
    [cartCount]
  );

  const selectedKey = useMemo(() => {
    if (location.pathname.startsWith("/product-list")) return "products";
    if (location.pathname.startsWith("/product/")) return "products";
    if (location.pathname.startsWith("/about")) return "about";
    if (location.pathname.startsWith("/cart")) return "cart";
    return "home";
  }, [location.pathname]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setDrawerVisible(false);
  };

  const onMenuClick: MenuProps["onClick"] = ({ key }) => {
    const item = menuItems.find((entry) => entry.key === key);
    if (item) {
      handleNavigate(item.path);
    }
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <div
          className="brand-lockup"
          onClick={() => handleNavigate("/")}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              handleNavigate("/");
            }
          }}
        >
          <img
            src={`${import.meta.env.VITE_BASE_URL}icons/SelCorreiaArtLogo.jpeg`}
            alt="SelCorreiaArt Logo"
            className="brand-logo"
          />
          <div className="brand-copy">
            <span className="brand-name">SelCorreiaArt</span>
            <span className="brand-tagline">Handcrafted Resin Stories</span>
          </div>
        </div>

        <nav className="header-nav" aria-label="Primary navigation">
          {menuItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`site-nav-link ${
                selectedKey === item.key ? "site-nav-link-active" : ""
              }`}
              onClick={() => handleNavigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-side">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? <SunOutlined /> : <MoonOutlined />}
            <span>{isDark ? "Light" : "Dark"}</span>
          </button>

          <button
            type="button"
            className="header-pill"
            onClick={() => handleNavigate("/cart")}
          >
            <span className="header-pill-label">Ready to order</span>
            <span className="header-pill-value">{cartLabel}</span>
          </button>

          <button
            type="button"
            className="header-menu-button icon-button"
            onClick={() => setDrawerVisible(true)}
            aria-label="Open menu"
          >
            <MenuOutlined />
          </button>
        </div>
      </div>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={300}
      >
        <div className="inline-actions" style={{ marginTop: 0, marginBottom: "1rem" }}>
          <button
            type="button"
            className="theme-toggle theme-toggle-drawer"
            onClick={toggleTheme}
          >
            {isDark ? <SunOutlined /> : <MoonOutlined />}
            <span>{isDark ? "Switch to light theme" : "Switch to dark theme"}</span>
          </button>
          <button
            type="button"
            className="header-pill"
            onClick={() => handleNavigate("/cart")}
            style={{ display: "inline-flex", width: "100%", justifyContent: "space-between" }}
          >
            <span className="header-pill-label">Cart</span>
            <span className="header-pill-value">{cartLabel}</span>
          </button>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={onMenuClick}
          items={menuItems.map(({ key, label }) => ({
            key,
            label: (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                {key === "cart" ? <ShoppingOutlined /> : null}
                {label}
              </span>
            ),
          }))}
        />
      </Drawer>
    </header>
  );
};

export default Header;
