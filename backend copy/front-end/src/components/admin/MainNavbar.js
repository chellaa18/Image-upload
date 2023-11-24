// MainNavbar.js
import React from "react";

const MainNavbar = ({ activeContent }) => {
  const getTitle = () => {
    switch (activeContent) {
      case "dashboard":
        return "Dashboard";
      case "orders":
        return "Contents";
      case "products":
        return "Products";
      case "ContentTable":
        return "Content Table";
      default:
        return "Admin Panel";
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-54581.jpg')`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    
      width: "100%",
    }}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                {getTitle()}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
