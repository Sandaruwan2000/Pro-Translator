import Order, { find, findByIdAndDelete } from "../model/OrderModel";


export async function SaveOrder(req,res){

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


    export async function     getAllOrdersofUser(req,res){

        const userID = req.params.uid;

        await find({userID}).populate("ProductID").then((orders)=>{
        
        res.json(orders);
        
        
        }).catch((err)=>{
            res.status(500).send({status:"Error While fetching",err});
        })
        
        
        
        }


    
   export async function    deleteOrder(req,res){

    let Orderid=req.params.oid;

    await findByIdAndDelete(Orderid).then(()=>{
        res.status(200).send({status:"Order Deleted"})
  
     }).catch((err)=>{
  
         console.log(err);
     res.status(500).send({status:"Error While Deleting"})
  
     })



   }
    