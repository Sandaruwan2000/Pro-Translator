
import express from "express";
const Router=express.Router();

import { SaveOrder, getAllOrdersofUser, deleteOrder } from "../controllers/Order.controller.js";


Router.post("/addOrder/:uid",SaveOrder);
Router.get("/fetchAll/:uid",getAllOrdersofUser);
Router.delete("/delete/:oid",deleteOrder);


export default Router;
