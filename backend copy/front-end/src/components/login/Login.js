import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useLogInUserMutation } from "../../redux/api";
import { toast } from "react-toastify";

// Schema validation
const schema = yup.object({
  password: yup.string().required("Password is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [logInUser] = useLogInUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    try {
      // const response = await axios.post("http://localhost:8000/users/login", data);
      const response = await logInUser(data).unwrap();
      // console.log(response.message);
      localStorage.setItem("LoggedUserToken", response.token);
      toast.success("login Success");
      setTimeout(() => {
       
          navigate("/dashboard");
       
      }, 2000);
    } catch (error) {
      console.error("Login failed", error);
      toast.error(error.data.message);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="App container mt-2">
      <div className="text-center bg-secondary mb-2">
        <Link className="btn btn-primary mx-2 my-3" to={"/"}>
          Home
        </Link>
        <Link className="btn btn-primary mx-2 my-3" to={"/register"}>
          Users
        </Link>
        <Link className="btn btn-primary mx-2 my-3" to={"/addproducts"}>
          Products
        </Link>
      </div>
      <div className="container p-5">
        <div className="row d-flex justify-content-center align-items-center vh-100">
          <div className="col-lg-5">
            <form
              className="p-5 rounded h-100 mb-5 border border-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3 className="text-dark">Login Form</h3>

              <div className="form-group mb-3">
                <label>Email: </label>
                <input
                  autoFocus
                  className="form-control"
                  {...register("email")}
                  name="email"
                  type="email"
                />
                <p className="text-danger">{errors.email?.message}</p>
              </div>

              <div className="form-group mb-3">
                <label>Password: </label>
                <div className="input-group">
                  <input
                    className="form-control"
                    {...register("password")}
                    name="password"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    className="input-group-text"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <span>Hide</span> : <span>Show</span>}
                  </button>
                </div>
                <p className="text-danger">{errors.password?.message}</p>
              </div>
              <input type="submit" className="btn btn-primary" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
