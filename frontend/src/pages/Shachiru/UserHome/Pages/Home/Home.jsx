import React, { useState, useEffect } from "react";
import "./Home.css"
import HomeVedio from "../../../../../Image/home.mp4"


export default function Home(){
  

  return (
    <div className="container mt-4">
    <video  loop autoPlay id="myVideo">
      <source src={HomeVedio} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    
    <div className="content">
            <div className="text-content">
                <h1 className="white">Enhanse Your Language Skills
                By Using <strong> Translater PRO</strong>
                </h1>
                <h4 className="blackish">We offer special services And Features!</h4>
                <div className="two-button">
                    <button className="w-btn btn">View Our Features</button>
                    <button className="t-btn btn">About Us</button>
                </div>

            </div>
            </div>
            <div className="backdrop-filter"></div>
 
  </div>
  
  );
};


