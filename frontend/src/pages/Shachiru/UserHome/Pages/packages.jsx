import React from "react";
import pkg from "../assets/pkg.json";
import { useNavigate,useLocation } from "react-router-dom";


export default function Packages(){
const id=pkg.name;
const navigate=useNavigate();
    const handlePurchase=()=>{

        navigate(`/checkout/${id}`);

    }

return(
    <div>
        <h1>{pkg.name}</h1>
        <h2>{pkg.details}</h2>
        <h2>{pkg.duration}</h2>                     
        <h2>{pkg.price}</h2>         
       <button onClick={handlePurchase}>PURCHASE</button>        

    </div>
)

}