import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../../components/Accsesories/Navbar/Navbar";
import "./UserHomelayout.css"


export default function UserHomeLayout(){


return(
    <div className="UserHome">
<NavBar/>
<Outlet/>
</div>
)


}