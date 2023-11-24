import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useAdminLogInMutation } from "../../redux/adminApi";
import { toast } from "react-toastify";
import PatternLock from "react-pattern-lock";

// Schema validation
const schema = yup.object({
  password: yup.string().required("Password is required"),
  username: yup.string().required("Username is required"),
  pattern: yup.string().required("Pattern is required"),
  // .test("pattern-validation", "Invalid pattern", (value) => value === "123"),
});

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const [logInAdmin] = useAdminLogInMutation();
  const [pattern, setPattern] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onPatternChange = (pattern) => {
    setValue("pattern", pattern.join(""));
    setPattern(pattern);
  };

  const onSubmit = async (data) => {
    try {
      const patternValue = pattern.join("");
      // console.log(patternValue);
      if (patternValue !== "123") {
        toast.error("Invalid pattern");
        resetPattern();
        return;
      }
      // console.log(pattern);
      const response = await logInAdmin(data).unwrap();
      console.log(response.message);

      if (response.message === "email or password is Invalid!") {
        toast.error(response.message);
      } else {
        localStorage.setItem("LoggedAdminToken", response.token);
        toast.success("Login Success");
        if (response.token) {
          navigate("/admin");
        }
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error(error.data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetPattern = () => {
    setDisabled(false);

    setPattern([]);
  };

  return (
    <div className="App container mt-2">
      <div className="text-center bg-secondary mb-2">
        <Link className="btn btn-primary mx-2 my-3">Admin</Link>
      </div>
      <div className="container p-5">
        <div className="row d-flex justify-content-center align-items-center vh-100">
          <div className="col-lg-8">
            <form
              className="p-5 rounded h-100 mb-5 border border-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3 className="text-dark">Admin Login</h3>

              <div className="form-group mb-3">
                <label>Username: </label>
                <input
                  autoFocus
                  className="form-control"
                  {...register("username")}
                  name="username"
                  type="text"
                />
                <p className="text-danger">{errors.username?.message}</p>
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

              <div className="mb-3">
                <h4>Draw Pattern for Login</h4>
                <PatternLock
                  path={pattern}
                  width={250}
                  size={3}
                  disabled={disabled}
                  onChange={onPatternChange}
                  onFinish={() => {
                    setDisabled(true);
                    // handleSubmit(onSubmit)();
                  }}
                  style={{
                    margin: "0 auto",
                    background: "black",
                  }}
                />
                <p className="text-danger">{errors.pattern?.message}</p>
              </div>

              <button className="btn btn-secondary" onClick={resetPattern}>
                Reset Pattern
              </button>
              <br />

              <input type="submit" className="btn btn-primary mt-3" />

              <div className="d-flex justify-content-between mt-4">
                <Link className="small-link">Forgot Password?</Link>
                <Link className="small-link">Forgot Pattern?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
