import React from 'react'
import "./NavBar.css"
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function NavBar() {
    const navigate=useNavigate()
    const LogoutHandler=()=>{
        Cookies.set('login-token',"");
         Cookies.set('isLoggedIn',false)
         Cookies.set("userName","");
         navigate("/login")
    }
    const name=Cookies.get("userName")? Cookies.get('userName') : "";
  return (
    <nav className='navWrapper'>
        <h2>{name}</h2>
        <button onClick={LogoutHandler} className='btn'>Logout</button>
    </nav>
  )
}

export default NavBar