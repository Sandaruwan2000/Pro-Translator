import React, { useEffect, useState } from "react";
import Progress from "./Progress";
import "./recipt.css";
import pkg from "./pkg.json"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export default function Recipt(){

const id=useParams().id;
const stage=3;



const [Package,setpackage] = useState("");

const pkgid="66e71a158a10cfd24617a4f7";
const uid=1;


useEffect(()=>{

   
 getpackage();
  


},[])

const getpackage = async () => {
  try {
    

      const response = await axios.get(`http://localhost:4000/package/fetch/${pkgid}`);
     setpackage(response.data);
   
     
  } catch (error) {
      console.error('Error fetching Packages:', error);
  }
};

console.log(Package);
const order={

  orderID :"324234237623476",
  ProductID:Package._id,
  total:99000


  


};

function checkout(){

  axios.post(`http://localhost:4000/order/addOrder/${uid}`,order).then(()=>{

    alert("Order Confirmed");
 
    }).catch((err)=>{
    
    alert(err);
    
    })
    




}

    return(
        <div>
            <Progress stage={stage}/>
    <div className="receipt">

    <div className="name"> <h2>Translator PRO </h2></div>

  

    <div className="order">

      <p> Order No: 1234567890 </p>
      <p> Date : 4/5/2020 </p>
      <p> Customer Name</p>

    </div>

    <hr/>

  
    <div className="details">

      <h3> Details </h3>

      <div className="product">

        

        <div className="info">

          <h4> {Package.pkgName} </h4>

          <p> {Package.disciption}</p>
          <p> {Package.duration}</p>

        </div>

      </div>

      <p> LKR {Package.price} </p>

    </div>


    <div className="totalprice">

      <p className="sub"> Subtotal <span className="Pricelist"> {Package.price}  </span></p>

      <p className="del"> Additionals <span  className="Pricelist"> LKR 10.00  </span> </p>

      <hr/>

      <p className="tot"> Total <span  className="Pricelist">LKR {Package.price+10} </span> </p>

<div className="btnSpan">
<a className="button btn1" onClick={checkout} >checkout

</a>
<a className="button btn2" >Print</a>

</div>
     

    </div>

   
    

  </div>
  </div>)

}