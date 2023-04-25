import { useFormik } from "formik";
import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate=useNavigate()
    const [error,setError]=useState()
  const validationSchema = yup.object().shape({
    name: yup.string().required("Enter UserName"),
    email: yup.string().email("Enter Valid Email").required("Enter Email"),
    password: yup
      .string()
      .min(7, "Enter minimum 7 Digit")
      .required("Enter Password"),
      age:yup
      .string()
      .required("Enter age"),
      location:yup
      .string()
      .required("Enter Location"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      location: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("submitted Values", values.name);
      axios.post("http://localhost:3001/register-user",{
        name:values.name,
        email:values.email,
        password:values.password,
        age:parseInt(values.age),
        location:values.location,
      })
      .then((res)=>{
        console.log(res)
        setError(res.data.message)
        navigate("/login")
      })
      .catch((err)=>{
        console.log("Error",err.response.data.message)
        setError(err.response.data.message)
      })
    },
  });

  return (
    <div className="formFieldWrapper" data-testid="formfield"> 
        <form className="mainFormWrap" onSubmit={formik.handleSubmit}>
          <h1 className="mainHeading">Register</h1>
          <div className="formWrapper">
            <div className="inputWrap">
              <label>Username</label>
              <input
                type="text"
                data-testid="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                name="name"
                placeholder="User Name"
              />
              <p
                className={
                  formik.touched.username && formik.errors.username
                    ? "displayBlock"
                    : "displayNone"
                }
              >
                {" "}
                {formik.errors.username}
              </p>
            </div>

            <div className="inputWrap">
              <label>Email</label>
              <input
                type="email"
                data-testid="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                name="email"
                placeholder="User Email"
              />

              <p
                className={
                  formik.touched.email && formik.errors.email
                    ? "displayBlock"
                    : "displayNone"
                }
              >
                {" "}
                {formik.errors.email}
              </p>
            </div>

            <div className="inputWrap">
              <label>Password</label>
              <input
                type="password"
                data-testid="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                name="password"
                placeholder="Password"
              />
              <p
                className={
                  formik.touched.password && formik.errors.password
                    ? "displayBlock"
                    : "displayNone"
                }
              >
                {" "}
                {formik.errors.password}
              </p>
            </div>
            <div className="inputWrap">
              <label>Age</label>
              <input
                type="age"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
                name="age"
                placeholder="age"
              />
              <p
                className={
                  formik.touched.age && formik.errors.age
                    ? "displayBlock"
                    : "displayNone"
                }
              >
                {" "}
                {formik.errors.age}
              </p>
            </div>
            <div className="inputWrap">
              <label>Location</label>
              <input
                type="location"
                data-testid="location"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
                name="location"
                placeholder="location"
              />
              <p
                className={
                  formik.touched.location && formik.errors.location
                    ? "displayBlock"
                    : "displayNone"
                }
              >
                {" "}
                {formik.errors.location}
              </p>
            </div>
            </div>
            <div>
            {error?error:""}
            </div>
            
            <button data-testid="submit" className="btn" type="submit">
              Register
            </button>
        </form>

    </div>
  );
}

export default Register;
