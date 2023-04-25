import React , {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import  "./ExpenseTrackerHome.css";
import NavBar from "../navbar/NavBar";
import '../register/Register.css'

function ExpenseTrackerHome() {
  const [expense,setExpense]=useState();
  const navigate=useNavigate();
  const token = Cookies.get("login-token");
 const addExpenseHandler=()=>{
  navigate("/add-expense")
 }
  const headers = { "authorization": `Bearer ${token}` };
  const apiCall=()=>{
    axios
    .get("http://localhost:3001/get-expense", {headers})
    .then((res) => {
      console.log(res);
      Cookies.set("isLoggedIn",true);
      setExpense(res?.data?.expenses)
    })
    .catch((err) => {
      console.log("Error", err);
      Cookies.set("isLoggedIn",false)
    });
  }

  useEffect(()=>{
    apiCall()
  },[])
    
  return <div>
    <NavBar/>
    <table>
         <tr>
          <th>Reason</th>
          <th>Expense type</th>
          <th>Cost of Pay</th>
         </tr>
         {expense?.length>0?expense.map((expense)=> <tr>
          <td>{expense?.reason}</td>
          <td>{expense?.typeofexpense}</td>
          <td>{expense?.expenserate}</td>
         </tr>)
        :<tr><td colSpan={3} >No Data Found</td></tr>}
    </table>
    <div className="btnWrapper">
    <button onClick={addExpenseHandler} className="btn">Add Expense</button>
    </div>
  </div>;
}

export default ExpenseTrackerHome;
