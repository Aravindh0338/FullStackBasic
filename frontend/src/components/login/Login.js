import { useFormik } from "formik";
import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import Cookies from 'js-cookie'
import "../register/Register.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const [error,setError]=useState();
    const navigate=useNavigate()
    const validationSchema = yup.object().shape({
    email: yup.string().email("Enter Valid Email").required("Enter Email"),
    password: yup
      .string()
      .min(7, "Enter minimum 7 Digit")
      .required("Enter Password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("submitted Values", values);
      axios.post("http://localhost:3001/login",{
        email:values.email,
        password:values.password,
      })
      .then((res)=>{
        Cookies.set('login-token', res?.data?.token ?? "")
        Cookies.set("isLoggedIn",true);
        Cookies.set("userName",res?.data?.name);
        console.log("login data",res)
        // setError(res.data.message)
        navigate("/home");
      })
      .catch((err)=>{
        console.log("Error",err.response.data.message)
        Cookies.set("isLoggedIn",false)
        setError(err.response.data.message)
      })
    },
  });

  return (
    <div className="formFieldWrapper" data-testid="formfield"> 
        <form className="mainFormWrap" onSubmit={formik.handleSubmit}>
          <h1 className="mainHeading">Login</h1>
          <div className="formWrapper">
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
            </div>
            <div>
            {error?error:""}
            </div>
            
            <button data-testid="submit" className="btn" type="submit">
              Login
            </button>
        </form>

    </div>
  );
}

export default Login;
