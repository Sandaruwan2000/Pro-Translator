import React, { useState } from "react";

import "./progress.css"


export default function Progress(props){

    let stage=props.stage;

    return(


          <div>

<div class="progress-container">
   
            <div class="progress" id="progress"></div>
            <div class="text-wrap active">
             
                <div class="circle">1</div>
                <p class="text">Terms</p>
            </div>
            <div class={stage>1?"text-wrap active":"text-wrap"}>
                <div class="circle">2</div>
                <p class="text">Payment</p>
            </div>
            <div class={stage==3?"text-wrap active":"text-wrap"}>
                <div class="circle">3</div>
                <p class="text">Recipt</p>
            </div>
           
        </div>
          </div>
       

    )
}