import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Userdashboard from "../../../../components/Userdashboard";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";




export default function MyOrders(){
    const [MyOrders,SetMyOrders]=useState([]);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(()=>{

       async function GetMyOrders(){

            await axios.get(`/backend/order/fetchAll/${currentUser._id}`).then((res)=>{

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

        <div className='flex' >
      
        <div  >
          <Userdashboard />
        </div>
  
        
        <div className="ml-auto flex-1 overflow-y-auto ">
          
        <div>
<h1>MY ORDERS</h1>


<div className="bg-slate-200 shadow-md rounded-lg overflow-hidden m-3">
          <Table 
           
          >
            <TableHeader>
              <TableColumn key="word" className='bg-black text-white'>OrderID</TableColumn>
              <TableColumn key="pkgNAme" className='bg-black text-white'>Package Name</TableColumn>
              <TableColumn key="createdAt" className='bg-black text-white'>Perchased AT</TableColumn>
              <TableColumn key="EX" className='bg-black text-white'>Expirery Date</TableColumn>
              <TableColumn key="action" className='bg-black text-white'>Expirery Date</TableColumn>
            </TableHeader>

            <TableBody >
        
            </TableBody>
          </Table>
        </div>
<ul>
                    {MyOrders.map((Order,key)=>
                    <li style={{padding:'0'}} key={key}>
                         <span className="All-product" style={{backgroundColor:'lime',margin:'8px',borderRadius:'10px',display: 'flex'}} >
                                     {Order.orderID}
                        </span>
                        <span className="All-product" style={{backgroundColor:'lime',margin:'8px',borderRadius:'10px',display: 'flex'}} >
                                     {Order.ProductID.name}
                        </span>
                        <span className="All-product" style={{backgroundColor:'lime',margin:'8px',borderRadius:'10px',display: 'flex'}} >
                                     {Order.PurchasedDate}
                        </span>
                        <button onClick={()=>DeleteHandler(Order._id)}>DELETE</button>
                    </li>
               )}
                </ul>

        </div>
        </div>
      </div>
    )
}