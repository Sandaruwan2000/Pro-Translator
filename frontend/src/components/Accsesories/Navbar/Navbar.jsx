import React from "react";
import "./Navbar.css";
import logo from "../Images/logo.png"


export default function NavBar(){



    return(
        <div className="header">
          <span className="head title">
            <img src={logo} className="TitleLogo"></img>
            <span className="titleWord T2" >PRO</span>
            <span className="titleWord T1">Translator</span>
          </span>

            <nav className="navi">
  <a href="/" ><i className="fa fa-home"></i></a>
  <a href="/UserHome/translater" ><i className="fa-solid fa-language"></i></a>
  <a href="/UserHome/favorites" ><i className="fa-solid fa-star"></i></a>
  <a href="/packages" ><i className="fa-solid fa-box-open"></i></a>
  <a href="/Myorders" ><i className="fa-solid fa-bag-shopping"></i></a>
  <a href="/UserHome/glossery" ><i className="fa-solid fa-glasses"></i></a>

 
  
 
</nav>
<span className="head profile"><a href="/userdashboard"><i className="fa-solid fa-user"></i></a></span>
        </div>
    )
}