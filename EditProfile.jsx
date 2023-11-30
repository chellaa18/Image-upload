import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "../Components/Header";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../redux/services/userApi";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup.string().required("Mobile is required"),
  addressLine1: yup.string().required("Address Line 1 is required"),
  addressLine2: yup.string().required("Address Line 2 is required"),
  country: yup.string().required("Country is required"),
  pincode: yup.string().required("Pincode is required"),
});

const EditProfile = () => {
  const [imageBase, setImageBase] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const navigate = useNavigate();

  const { data, isFetching } = useGetSingleUserQuery();
  const user = data?.data;
  // console.log(user.profilePic);
  // console.log(user._id);
  const [updateUser] = useUpdateUserMutation();

  const { handleSubmit, control, register, formState, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        mobile: user.address ? (user.address.mobile) : '',
        addressLine1: user.address ? (user.address.addressLine1) : '',
        addressLine2: user.address ? (user.address.addressLine2) : '' ,
        country: user.address ? (user.address.country) : '',
        pincode: user.address ? (user.address.pincode) : '',
      });
    }
  }, [user, reset]);

  // handling Edited Imagefile
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const filename = file;
    // console.log(file);
    setImageBase(filename);

    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      setImageBase64(base64Image);
    };

    reader.readAsDataURL(file);
  };

  //submitting EditedForm
  // const onSubmit = async (data) => {
  //   try {
  //     const newData = {...data, "profilePic": imageBase}

  //     const result = await Swal.fire({
  //       title: "Do you want to save the changes?",
  //       showDenyButton: true,
  //       showCancelButton: true,
  //       confirmButtonText: "Save",
  //       denyButtonText: `Don't save`,
  //     });

  //     if (result.isConfirmed) {
  //       await updateUser({ userId: user._id, formData: newData });
  //       Swal.fire("Saved!", "", "success");
  //     } else if (result.isDenied) {
  //       Swal.fire("Changes are not saved", "", "info");
  //     }
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //   }
  //   // console.log(data);
  // };

  const onSubmit = async (data) => {
    try {
    
      const imageFile = imageBase;
      // console.log(imageFile);
      // const imageFile2 = user.profilePic;
      // console.log(imageFile2);

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      
       if(imageFile){
        formData.append("profilePic", imageFile);
       }
        
      const result = await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      });
  
      if (result.isConfirmed) {
        await updateUser({ userId: user._id, formData });
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  // console.log(imageBase);

  return (
    <>
      <Header />

      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 col-md-auto col-lg-auto pgCntC-lt "></div>
          <div class="col-sm-12 col-md-12 col-lg pgCntC-rt ">
            <div class="pgCntCon ">
              <div class="pade_padding_wrap ">
                <div class="InrPgHdrSec mb-4 ">
                  <h2>Edit Profile</h2>
                </div>
                <div class="HelpDskMain ">
                  <div class="AdTcktBtn d-flex flex-wrap ">
                    <Link
                      to={"/profile"}
                      class="btn BtnPrimry Btn-148-40 mb-2 mr-2 "
                    >
                      View Profile
                    </Link>
                    <Link
                      to={"/change-password"}
                      class="btn BtnPrimry Btn-148-40 mb-2 "
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12 mx-auto">
                    <div class="MyWlltTbbBox mt-120">
                      <div class="prfimgcd">
                        {imageBase64 ? (
                          // Display the selected image preview
                          <img
                            src={imageBase64}
                            alt="Profile Image"
                            className="updatepro"
                            style={{
                              width: "110px",
                              height: "110px",
                              borderRadius: "50%",
                              marginTop: "25px",
                            }}
                          />
                        ) : (
                          // Display the existing profile picture
                          <img
                            src={`http://localhost:8000/${user?.profilePic}`}
                            alt="Profile srver"
                            className="updatepro"
                            style={{
                              width: "110px",
                              height: "110px",
                              borderRadius: "50%",
                              marginTop: "25px",
                            }}
                          />
                        )}
                        <div class="upLo2 ">
                          <div class="variants">
                            <div class="file">
                              <label for="input-file">
                                <img src="/static/images/edit.svg" alt="" />
                              </label>
                              <input
                                id="input-file"
                                type="file"
                                onChange={handleImageChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <form
                        className="pt-md-5 pt-3 pb-3"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <div className="Frmstl mb-20">
                              <h1>First Name</h1>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    formState.errors.firstName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Enter your First Name"
                                  {...register("firstName")}
                                />
                                {formState.errors.firstName && (
                                  <div className="invalid-feedback">
                                    {formState.errors.firstName.message}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="Frmstl mb-20">
                              <h1>Last Name</h1>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    formState.errors.lastName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Enter your Last Name"
                                  {...register("lastName")}
                                />
                                {formState.errors.lastName && (
                                  <div className="invalid-feedback">
                                    {formState.errors.lastName.message}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="Frmstl mb-20">
                              <h1>Username</h1>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    formState.errors.username
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Enter your Username"
                                  {...register("username")}
                                />
                                {formState.errors.username && (
                                  <div className="invalid-feedback">
                                    {formState.errors.username.message}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="Frmstl mb-20">
                              <h1>Email Id</h1>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    formState.errors.email ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter your Email Id"
                                  {...register("email")}
                                />
                                {formState.errors.email && (
                                  <div className="invalid-feedback">
                                    {formState.errors.email.message}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="Frmstl mb-20">
                              <h1>Mobile</h1>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    formState.errors.mobile ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter your Mobile"
                                  {...register("mobile")}
                                />
                                {formState.errors.mobile && (
                                  <div className="invalid-feedback">
                                    {formState.errors.mobile.message}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="Frmstl mb-20">
                              <h1>Address Line 1</h1>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    formState.errors.addressLine1
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Enter your Address Line 1"
                                  {...register("addressLine1")}
                                />
                                {formState.errors.addressLine1 && (
                                  <div className="invalid-feedback">
                                    {formState.errors.addressLine1.message}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="Frmstl mb-20">
                              <h1>Address Line 2</h1>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    formState.errors.addressLine2
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Enter your Address Line 2"
                                  {...register("addressLine2")}
                                />
                                {formState.errors.addressLine2 && (
                                  <div className="invalid-feedback">
                                    {formState.errors.addressLine2.message}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="Frmstl mb-20">
                              <h1>Country</h1>
                              <div className="form-group">
                                <select
                                  className={`form-control ${
                                    formState.errors.country ? "is-invalid" : ""
                                  }`}
                                  {...register("country")}
                                >
                                  <option value="">Select Country</option>
                                  <option value="Australia">Australia</option>
                                  <option value="Armenia">Armenia</option>
                                  <option value="Bangladesh">Bangladesh</option>
                                  <option value="Canada">Canada</option>
                                  <option value="India">India</option>
                                </select>
                                {formState.errors.country && (
                                  <div className="invalid-feedback">
                                    {formState.errors.country.message}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="Frmstl mb-20">
                              <h1>Pincode</h1>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    formState.errors.pincode ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter your Pincode"
                                  {...register("pincode")}
                                />
                                {formState.errors.pincode && (
                                  <div className="invalid-feedback">
                                    {formState.errors.pincode.message}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn BtnPrimry fntsize Btn-182-44 m-auto"
                          type="submit"
                        >
                          Update
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <footer>
                <div class="FtrSecMain ">
                  <div class="container ">
                    <div class="FtrCntMain text-center ">
                      <div class="FtrCpyRt ">
                        <p>© 2023 Osiz Support. All rights reserved.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
