import React, { useState } from "react";
import Progress from "./Progress";

import "./userAgree.css"
import { useNavigate, useParams } from "react-router-dom";


export default function UserAgree(){
 
    const id=useParams().id;
    const navigate=useNavigate();
    const stg=1;

    const btnClick=()=>{

        navigate(`/UserHome/checkout/card/${id}`)
            }
return(

    <div>
        <Progress stage={stg}/>
        <main className="wrap">
  <section className="agree container">
    <div className="container__heading">
      <h2>Terms & Conditions </h2>
    </div>
    <div className="container__content">
      <p>By purchasing and using Translator Pro, you acknowledge and agree to the following terms and conditions. Translator Pro is licensed to you for personal, non-transferable use on devices that support the app. Your purchase is final, and we do not offer refunds or exchanges unless mandated by applicable law or specific store policies.</p>
      <p>f your purchase includes subscription-based services, please note that these subscriptions will automatically renew at the end of each billing cycle unless you cancel at least 24 hours before the current period expires. The subscription fees will be charged to your designated payment method.</p>
      <p>Translator Pro relies on third-party data sources for its translation services. While we strive to provide accurate translations, we cannot guarantee their accuracy or completeness. The app is provided "as is," and we make no warranties or representations regarding its performance, reliability, or suitability for your needs.</p>
      <p>In using Translator Pro, you consent to the collection and use of your personal data as outlined in our Privacy Policy. While we implement reasonable measures to protect your data, we cannot guarantee absolute security.</p>
      <p>We may periodically update Translator Pro to enhance its functionality or address issues. Continued use of the app following any updates signifies your acceptance of the revised terms.

Failure to comply with these terms may result in the termination of your license to use Translator Pro, without prior notice or compensation. If you have any questions or concerns about these terms, please contact our support team.

</p>
      </div>
    <div className="container__nav">
      <small>By clicking 'Accept' you are agreeing to our terms and conditions.</small>
      <a className="button" onClick={btnClick}>Accept</a>
    </div>
  </section>
</main>
    </div>
)


}