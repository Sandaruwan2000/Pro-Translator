import OrderModel from "../models/OrderModel"

exports.SaveOrder=async(req,res)=>{

const Uid=req.params.uid;

    const{
    
        orderID,
        ProductID,
        total
       
    
    
    }=req.body;
    
  
    
    
    
    
    
    const newOrder=new Order({
        
        orderID,
        ProductID,
        total,
        userID:Uid
    
    
    
    
    
    
    });
    
    
    await newOrder.save().then(()=>{
    
        res.status(200).send({status:"Order Saved"});
        
        
        }).catch((err)=>{
        
        res.status(500).send({status:"Error While adding",err});
        
        
        
        })
    
    }


    exports.getAllOrdersofUser=async(req,res)=>{

        const userID = req.params.uid;

        await Order.find({userID}).populate("ProductID").then((orders)=>{
        
        res.json(orders);
        
        
        }).catch((err)=>{
            res.status(500).send({status:"Error While fetching",err});
        })
        
        
        
        }


    
   exports.deleteOrder=async(req,res)=>{

    let Orderid=req.params.oid;

    await Order.findByIdAndDelete(Orderid).then(()=>{
        res.status(200).send({status:"Order Deleted"})
  
     }).catch((err)=>{
  
         console.log(err);
     res.status(500).send({status:"Error While Deleting"})
  
     })



   }
    