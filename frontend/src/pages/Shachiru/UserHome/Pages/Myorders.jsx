import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";




export default function MyOrders(){
    const [MyOrders,SetMyOrders]=useState([]);

    useEffect(()=>{

       async function GetMyOrders(){

            await axios.get('http://localhost:4000/order/fetchAll/1').then((res)=>{

                SetMyOrders(res.data);
                console.log(MyOrders);
                


            }).catch((err)=>{

                alert(err);
            });


        }
GetMyOrders();




    },[])


    const DeleteHandler=(id)=>{

            axios.delete(`http://localhost:4000/order/delete/${id}`).then(()=>{

                alert("DELETED");
                window.location.reload();
            }).catch((err)=>{

                alert(err);
            })

    }

    return(
        <div>
<h1>MY ORDERS</h1>
<ul>
                    {MyOrders.map((Order,key)=>
                    <li style={{padding:'0'}} key={key}>
                        <span className="All-product" style={{backgroundColor:'lime',margin:'8px',borderRadius:'10px',display: 'flex'}} >
                                     {Order.ProductID.pkgName}
                        </span>
                        <button onClick={()=>DeleteHandler(Order._id)}>DELETE</button>
                    </li>
               )}
                </ul>

        </div>
    )
}