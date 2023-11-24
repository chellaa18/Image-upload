import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddProductsMutation, useGetProductsQuery } from "../../redux/productApi";
import { useNavigate, Link } from "react-router-dom";

const schema = yup.object({
  productName: yup.string().required("Product Name is required"),
  productPrice: yup
    .number()
    .typeError("Price must be a number")
    .required("Product Price is required")
    .positive("Price must be a positive number"),
  category: yup.string().required("Category is required"),
  stock: yup
    .number()
    .typeError("Stock must be a number")
    .required("Stock is required")
    .integer("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
});

const AddProducts = () => {
  const [addProducts] = useAddProductsMutation();
  const { data : products = [], isLoading, isError } = useGetProductsQuery();
  // console.log(products.data);

  const productsFromDB = products.data;
  console.log(productsFromDB);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAddProduct = async (data) => {
    try {
      let res = await addProducts(data);
      console.log("Product added:", res);
    } catch (error) {
      console.error("Error adding product:", error);
    }
    document.getElementById("product-form").reset();
  };

  return (
    <div className="container mt-2">
      <div className="text-center bg-secondary mb-2">
        <Link className="btn btn-primary mx-2 my-3" to={"/"}>
          Home
        </Link>
        <Link className="btn btn-primary mx-2 my-3" to={"/register"}>
          Users
        </Link>
        <Link className="btn btn-primary mx-2 my-3" to={"/login"}>
          Login
        </Link>
      </div>
      
      <form className="border border-2 p-4 rounded" id="product-form" onSubmit={handleSubmit(handleAddProduct)}>
      <h4>Add Products</h4>
        <div className="mb-3 row">
          <div className="col-md-6">
            <label htmlFor="productName" className="form-label">
              Product Name
            </label>
            <input
              name="productName"
              type="text"
              {...register("productName")}
              className={`form-control ${
                errors.productName ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.productName?.message}
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="productPrice" className="form-label">
              Product Price
            </label>
            <input
              name="productPrice"
              type="number"
              step="0.01"
              {...register("productPrice")}
              className={`form-control ${
                errors.productPrice ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.productPrice?.message}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            name="category"
            type="text"
            {...register("category")}
            className={`form-control ${errors.category ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.category?.message}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            name="stock"
            type="number"
            {...register("stock")}
            className={`form-control ${errors.stock ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.stock?.message}</div>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </div>
      </form>

      <div className="row d-flex mt-5">
      <h4>Products List</h4>
      {productsFromDB && productsFromDB.length > 0  ? (
            productsFromDB.map((product, i) => {
              return (
                <div
                  className="card ms-2 mt-2 col-lg-3 m-1"
                  key={product._id}
            
                >
               
                  <div className="card-body p-4">
                    <h5 className="card-title">{product.productName}</h5>
                     <p className="card-text">Price: ${product.productPrice}</p> 
                     <p className="card-text">Category: ${product.category}</p> 
                     <p>Only {product.stock} left..</p> 
                  </div>
                  <button
                    className="view-button mb-4"
                   
                  >
                    View Product
                  </button>
                  <button
                    className="pro-button mb-4"
                  
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })
          ) : (
            <h2>No data</h2>
          )}

        
        </div>


     
    </div>
  );
};

export default AddProducts;
