import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserQuery, useUpdateUserMutation } from '../../redux/api';
import Swal from "sweetalert2";

const schema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  acceptTerms: yup.bool().oneOf([true], "Accept Ts & Cs is required"),
});

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user = [], isLoading, isError } = useGetUserQuery(id);
  const [updateUser] = useUpdateUserMutation();

  const userFromDB = user.data;

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!isLoading && !isError && userFromDB) {
      reset(userFromDB);
    }
  }, [userFromDB, reset, isLoading, isError]);

  const onSubmit = async (data) => {
    try {
      const result = await Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      });
  
      if (result.isConfirmed) {
        await updateUser({ userId: id, updatedData: data });
        Swal.fire('Saved!', '', 'success');
        navigate('/register');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>Error fetching user data</div>;
  }

  return (
    <div className="container mt-5">
      <form id="registration-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            name="firstName"
            type="text"
            {...register("firstName")}
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.firstName?.message}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            name="lastName"
            type="text"
            {...register("lastName")}
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.lastName?.message}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="text"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        {/* <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div> */}
       
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUser;
