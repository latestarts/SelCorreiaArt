import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "#001529",
        color: "white",
        padding: "1rem 2rem",
        textAlign: "center",
        fontSize: "0.9rem",
        boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.15)",
        userSelect: "none",
      }}
    >
      <p style={{ margin: 0 }}>
        &copy; {new Date().getFullYear()} SelCorreia Arts | Quality Products
        You'll Love. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
