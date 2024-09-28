//import packages
const mongoose=require("mongoose");

const schema=mongoose.Schema;

//create model for readymade items

const Order_Scheama=new schema({
    orderID:{type:String},
    ProductID:{type:mongoose.Schema.Types.ObjectId,ref:"pkges",required:true},
    total:{type:Number},
    userID: { type: Number}



     

})

//mongoDB document creation

const Order=mongoose.model("Order",Order_Scheama);

module.exports=Order;