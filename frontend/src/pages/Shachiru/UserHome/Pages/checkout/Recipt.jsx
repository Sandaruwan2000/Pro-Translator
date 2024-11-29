import React, { useEffect, useState } from "react";
import Progress from "./Progress";
import "./recipt.css";
import pkg from "./pkg.json"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";


export default function Recipt(){

const id=useParams().id;
const stage=3;


const navigate=useNavigate();
const [Package,setpackage] = useState("");
const { currentUser } = useSelector((state) => state.user);
const [currentDate, setCurrentDate] = useState('');
const [currentTime, setCurrentTime] = useState('');

const formattedPriceValue = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD', 
}).format(Package.price);



useEffect(()=>{

  const today = new Date();
  const dateString = today.toLocaleDateString(); 
  setCurrentDate(dateString);
  const timeString=today.toLocaleTimeString();
  setCurrentTime(timeString);
  getpackage();
  


},[])

const getpackage = async () => {
  try {
    

      const response = await axios.get(`/backend/package/onepackage/${id}`);
     setpackage(response.data);
   
     
  } catch (error) {
      console.error('Error fetching Packages:', error);
  }
};

console.log(Package);
const order={

  orderID :"4654",
  ProductID:Package._id,
  total:formattedPriceValue,
  PurchasedDate:currentDate
 

  


};

function checkout(){

  axios.post(`/backend/order/addOrder/${currentUser._id}`,order).then(()=>{

    alert("Order Confirmed");

    navigate("/");
 
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
      <p> Date : {currentDate}   {currentTime}</p>
      <p> Customer Name:  {currentUser.username}</p>

    </div>

    <hr/>

  
    <div className="details">

      <h3> Details </h3>

      <div className="product">

        

        <div className="info">

          <h4> {Package.name} </h4>
          <br/>
          <h4>Duration</h4> 
          <p> {Package.duration} Months</p>
          <br/>
          <p> {Package.details}</p>
          <br/>
        </div>

      </div>
     
      <p> <h4>Amount:</h4> {formattedPriceValue} </p>

    </div>


    <div className="totalprice">

      <p className="sub"> Subtotal <span className="Pricelist">   </span></p>

      <p className="del"> Additionals <span  className="Pricelist"> LKR 10.00  </span> </p>

      <hr/>

      <p className="tot"> Total <span  className="Pricelist">{formattedPriceValue} </span> </p>

<div className="btnSpan">
<a className="button btn1" onClick={checkout} >checkout

</a>
<a className="button btn2" >Print</a>

</div>
     

    </div>

   
    

  </div>
  </div>)

}