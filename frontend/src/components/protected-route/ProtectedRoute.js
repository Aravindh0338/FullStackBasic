import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute(element) {
    // const navigate=useNavigate()
    const login=JSON.parse(Cookies.get("isLoggedIn")? Cookies.get('isLoggedIn') : false);
    const [loginData,setLoginData]=useState(login);
    useEffect(()=>{
    setLoginData(login)
    },[login])
    console.log("login",login)
    console.log("login data",loginData)
    if(!loginData){
       return <Navigate to="/login"/>
    }
    return element;
}

export default ProtectedRoute