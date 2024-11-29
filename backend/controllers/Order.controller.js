import Order from "../models/OrderModel.js";


export const SaveOrder=async(req,res)=>{

const Uid=req.params.uid;

    const{
    
        orderID,
        ProductID,
        total,
        PurchasedDate
        
       
    
    
    }=req.body;
    
  
    
    
    
    
    
    const newOrder=new Order({
        
        orderID,
        ProductID,
        total,
        PurchasedDate,
        userID:Uid
    
    
    
    
    
    
    });
    
    
    await newOrder.save().then(()=>{
    
        res.status(200).send({status:"Order Saved"});
        
        
        }).catch((err)=>{
        
        res.status(500).send({status:"Error While adding",err});
        
        
        
        })
    
    }


    export const getAllOrdersofUser=async(req,res)=>{

        const userID = req.params.uid;

        await Order.find({userID}).populate({ path: 'ProductID', populate: { path: 'PkgCode' } }).then((orders)=>{
        
        res.json(orders);
        
        
        }).catch((err)=>{
            res.status(500).send({status:"Error While fetching",err});
        })
        
        
        
        }


    
        export const deleteOrder=async(req,res)=>{

    let Orderid=req.params.oid;

    await Order.findByIdAndDelete(Orderid).then(()=>{
        res.status(200).send({status:"Order Deleted"})
  
     }).catch((err)=>{
  
         console.log(err);
     res.status(500).send({status:"Error While Deleting"})
  
     })



   }
    