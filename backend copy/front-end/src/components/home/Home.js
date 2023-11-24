import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="container vh-100">
        <div className="text-center ">
          <Link className="btn btn-primary mx-2 my-5" to={"/register"}>
            Users
          </Link>
          <Link className="btn btn-primary mx-2 my-5" to={"/addproducts"}>
            products
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
