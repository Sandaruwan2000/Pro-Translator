import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Progress from "./Progress";

import "./Card.css"


export default function Card(){
    
    const id=useParams().id;
    const stg=2;
    const navigate=useNavigate();
    const btnClick=()=>{

        navigate(`/checkout/recipt/${id}`)
            }


    return(
        <div>
            <Progress stage={stg}/>

<div >
  <div className="Creditcard">
   <button className="proceed" onClick={btnClick}><svg className="sendicon" width="24" height="24" viewBox="0 0 24 24">
        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
      </svg></button>
    <img src="https://seeklogo.com/images/V/VISA-logo-62D5B26FE1-seeklogo.com.png" className="logo-card"/>
    <label>Card number:</label>
    <input id="user" type="text" className="input cardnumber" placeholder="1234 5678 9101 1121"/>
    <label>Name:</label>
    <input className="input name" placeholder="T.U Imbulana"/>
    <label className="toleft">CCV:</label>
    <input className="input toleft ccv" placeholder="321"/>
  </div>
</div>

        </div>
    )
}