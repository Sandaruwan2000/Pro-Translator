//import packages
import mongoose from "mongoose";

const schema=mongoose.Schema;

//create model for readymade items

const Order_Scheama=new schema({
    orderID:{type:String},
    ProductID:{type:schema.Types.ObjectId,ref:"Package",required:true},
    total:{type:String},
    userID: { type:schema.Types.ObjectId,ref:"User",required:true},
    PurchasedDate:{type:Date,required:true}



     

})

//mongoDB document creation

const Order=mongoose.model("Order",Order_Scheama);

export default Order;