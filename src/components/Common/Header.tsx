import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer, Menu } from "antd";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const cartCount = useAppSelector((state) => state.cart.items.length);
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const menuItems = [
    { key: "products", label: "Products", path: "/product-list" },
    { key: "video-products", label: "Video Products", path: "/video-products" },
    { key: "about", label: "About", path: "/about" },
    { key: "cart", label: `Cart (${cartCount})`, path: "/cart" },
  ];

  const onMenuClick = (e: any) => {
    const item = menuItems.find((i) => i.key === e.key);
    if (item) {
      navigate(item.path);
      closeDrawer();
    }
  };

  return (
    <header
      className="bg-dark text-white sticky-top shadow-sm"
      style={{ position: "relative", zIndex: 1000 }}
    >
      <div className="container d-flex justify-content-between align-items-center flex-wrap py-2">
        <h1
          onClick={() => navigate("/")}
          className="m-0 fw-bold fs-4 d-flex align-items-center gap-2"
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          <img
            src={`${
              import.meta.env.VITE_BASE_URL
            }/icons/SelCorreiaArtLogo.jpeg`}
            alt="SelCorreiaArt Logo"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          SelCorreiaArt
        </h1>

        <nav className="d-none d-md-flex flex-wrap align-items-center gap-4">
          <span
            className="animated-underline"
            onClick={() => navigate("/")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/")}
          >
            Home
          </span>
          <span
            className="animated-underline"
            onClick={() => navigate("/product-list")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/product-list")}
          >
            Products
          </span>
          {/* <span
            className="animated-underline"
            onClick={() => navigate("/video-products")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/video-products")}
          >
            Video Products
          </span> */}
          <span
            className="animated-underline"
            onClick={() => navigate("/about")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/about")}
          >
            About
          </span>
        </nav>

        <div className="d-md-none">
          <MenuOutlined
            onClick={showDrawer}
            style={{ fontSize: 26, cursor: "pointer", color: "white" }}
          />
        </div>

        <Drawer
          title="Menu"
          placement="right"
          onClose={closeDrawer}
          open={drawerVisible} // use `open` not `visible` in AntD v5
          maskClosable={true} // allow closing by clicking outside
          keyboard={true} // allow closing with ESC key
          zIndex={1200} // ensure drawer is above header
        >
          <Menu
            mode="inline"
            selectedKeys={[]}
            onClick={onMenuClick}
            items={menuItems.map(({ key, label }) => ({ key, label }))}
          />
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
