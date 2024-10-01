import React, { useEffect } from "react";
import "./Navbar.css";
import logo from "../Images/logo.png";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";


export default function NavBar(){

  const { currentUser } = useSelector((state) => state.user);
  const [userPkgs,setuserPkgs]=useState([]);
  const [isEmoji,setisEmoji]=useState(false);
  const [isGlossery,setisGlossery]=useState(false);
 

  
useEffect(()=>{

  
  getpackages();
  chkpkgs();
  console.log(isEmoji,isGlossery);
 
  


},[])


const getpackages = async () => {
  try {
    

      const response = await axios.get(`/backend/order/fetchAll/${currentUser._id}`);
     
      setuserPkgs(response.data);
   
     
  } catch (error) {
      console.error('Error fetching Packages:', error);
  }
};

const pkgCodes = userPkgs.map(pkg => pkg.ProductID.PkgCode);

const chkpkgs=()=>{
  const matchingPkgCodeEmo = pkgCodes.find(code => code === 'Emo1');
  if(matchingPkgCodeEmo!==null){
    setisEmoji(true);
  }
  const matchingPkgCodeGlos = pkgCodes.find(code => code === 'Gloss1');
  if(matchingPkgCodeGlos!==null){
    setisGlossery(true);
  }

}



    return(
        <div className="header">
          <span className="head title">
            <img src={logo} className="TitleLogo"></img>
            <span className="titleWord T2" >PRO</span>
            <span className="titleWord T1">Translator</span>
          </span>

            <nav className="navi">
  <a href="/" ><i className="fa fa-home"><span className="tooltiptext">Home</span></i></a>
  <a href="/UserHome/translater" ><i className="fa-solid fa-language"><span className="tooltiptext">Translate</span></i> </a>
  <a href="/UserHome/favorites" ><i className="fa-solid fa-star"><span className="tooltiptext">Favorites</span></i></a>
  <a href="/UserHome/Membership" ><i className="fa-solid fa-box-open"><span className="tooltiptext">Packages</span></i></a>
  <a href="/UserHome/emojitranslator" ><i className="fa-solid fa-face-smile-wink"><span className="tooltiptext">Emoji to A</span></i></a>
  <a href="/UserHome/glossery" ><i className="fa-solid fa-glasses"><span className="tooltiptext">Glossery</span></i></a>
  

 
  
 
</nav>
<span className="head profile"><a href="/profile"><i className="fa-solid fa-user"></i></a></span>
        </div>
    )
}