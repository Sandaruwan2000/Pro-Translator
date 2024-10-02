import React from "react";
import { useNavigate, useParams } from "react-router-dom";




export default function Checkout(){
    const {id}=useParams();
    const navigate=useNavigate();

    const btnClick=()=>{

navigate(`/checkout/terms/${id}`)
    }

    
    return(
        <div>
<h1>{id}</h1>
<button onClick={btnClick}>Checkout</button>
        </div>
    )
}