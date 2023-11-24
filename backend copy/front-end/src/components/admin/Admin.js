import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Contents from "./contents/Contents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faClipboard,
  faBox,
  faAddressBook,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import ContentTable from "./contentsTable/ContentTable";
import MainNavbar from "./MainNavbar";


const Admin = () => {
  const [activeContent, setActiveContent] = useState(
    localStorage.getItem("activeContent") || "dashboard"
  );

  useEffect(() => {
    localStorage.setItem("activeContent", activeContent);
  }, [activeContent]);

  const handleNavClick = (content) => {
    setActiveContent(content);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <nav
          id="sidebar"
          className="col-md-3 col-lg-3 d-md-block bg-dark sidebar vh-100"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('https://i.pinimg.com/originals/ba/7a/ce/ba7ace6e786f8ec7d46eece15cd9c025.jpg')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: "250px",
          }}
        >
          <div className="position-sticky">
            <div
              className="d-flex align-items-center justify-content-center my-4"
              style={{ height: "70px" }}
            >
              <FontAwesomeIcon
                className="text-white"
                icon={faAddressBook}
                style={{ width: "50px", height: "50px" }}
              />
            </div>
            <ul className="nav flex-column">
              <li
                className={`nav-item ${
                  activeContent === "dashboard" ? "active" : ""
                }`}
              >
                <a
                  className={`nav-link text-white px-2 ${
                    activeContent === "dashboard" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => handleNavClick("dashboard")}
                >
                  <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                  Dashboard
                </a>
              </li>
              <li
                className={`nav-item ${
                  activeContent === "orders" ? "active" : ""
                }`}
              >
                 <a
                  className={`nav-link text-white px-2 ${
                    activeContent === "orders" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => handleNavClick("orders")}
                >
                  <FontAwesomeIcon icon={faClipboard} className="me-2" />
                  Contents
                </a>
              </li>
              <li
                className={`nav-item ${
                  activeContent === "products" ? "active" : ""
                }`}
              >
                     <a
                  className={`nav-link text-white px-2 ${
                    activeContent === "products" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => handleNavClick("products")}
                >
                  <FontAwesomeIcon icon={faBox} className="me-2" />
                  Products
                </a>
              </li>

              <li
                className={`nav-item ${
                  activeContent === "ContentTable" ? "active" : ""
                }`}
              >
                <a
                  className={`nav-link text-white px-2 ${
                    activeContent === "ContentTable" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => handleNavClick("ContentTable")}
                >
                  <FontAwesomeIcon icon={faTableList} className="me-2" />
                  ContentTable
                </a>
              </li>
            </ul>
          </div>
        
        </nav>

        <main className="col-md-9 col-lg-9 vh-100 px-0">
          <MainNavbar activeContent={activeContent} />
          {activeContent === "dashboard" && <h2>Admin Dashboard</h2>}
          {activeContent === "orders" && <Contents />}
          {activeContent === "products" && <h2>Products</h2>}
          {activeContent === "ContentTable" && <ContentTable />}
        </main>
      </div>
    </div>
  );
};

export default Admin;
