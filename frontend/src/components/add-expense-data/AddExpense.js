import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import "../register/Register.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";

function AddExpense() {

  const navigate=useNavigate()
  const token = Cookies.get("login-token");
  const headers = { "authorization": `Bearer ${token}` };

  const validationSchema = yup.object().shape({
    reason: yup.string().required("Enter Why you spent?"),
    cost: yup.string().required("Enter cost of expense"),
    expensetype: yup.string().required("Choose Expense Type"),
  });

  const formik = useFormik({
    initialValues: {
      reason: "",
      cost: "",
      expensetype: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("submitted Values", values);
      const data= {
        reason: values.reason,
        cost: values.cost,
        expensetype: values.expensetype,
  }
      axios
        .post("http://localhost:3001/add-expense",{data,
        headers  }
    )
        .then((res) => {
          console.log(res);
          // setError(res.data.message)
          navigate("/")
        })
        .catch((err) => {
          console.log("Error", err.response.data.message);
          // setError(err.response.data.message)
        });
    },
  });
  return (
    <>
    <NavBar/>
    <form className="mainFormWrap" onSubmit={formik.handleSubmit}>
      <h1 className="mainHeading">Add Expense Data</h1>
      <div className="formWrapper">
        <div className="inputWrap">
          <label>Reason</label>
          <input
            type="text"
            name="reason"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.reason}
            placeholder="Enter Why you spent?"
          />
          <p
            className={
              formik.touched.reason && formik.errors.reason
                ? "displayBlock"
                : "displayNone"
            }
          >
            {" "}
            {formik.errors.reason}
          </p>
        </div>
        <div className="inputWrap">
          <label>Cost of Pay</label>
          <input
            type="text"
            name="cost"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cost}
            placeholder="Enter Cost of Pay"
          />
          <p
            className={
              formik.touched.cost && formik.errors.cost
                ? "displayBlock"
                : "displayNone"
            }
          >
            {" "}
            {formik.errors.cost}
          </p>
        </div>

        <div className="inputWrap">
          <label>Expense Type</label>
          <select
            className="option"
            data-testid="dropdown"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.expensetype}
            name="expensetype"
          >
            <option value="travel">Travel-Tickets</option>
            <option value="food">Food</option>
            <option value="others">Others</option>
          </select>

          <p
            className={
              formik.touched.expensetype && formik.errors.expensetype
                ? "displayBlock"
                : "displayNone"
            }
          >
            {" "}
            {formik.errors.expensetype}
          </p>
        </div>

        <button data-testid="submit" className="btn" type="submit">
          Add Expense
        </button>
      </div>
    </form>
    </>
  );
}

export default AddExpense;
