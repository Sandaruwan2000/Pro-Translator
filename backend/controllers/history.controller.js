import History from "../models/history.model.js";




export const addhistory = async (req ,res ,next) => {

    
    try{
        const newhistory = await History.create(req.body);
        return res.status(201).json({
            message: "History added successfully!",
            history: newhistory,
        });

    }catch(error){
        next(error);
    }
};

export const getAllhistory = async (req , res , next) => {
    try{
 
       const history = await History.find();
       res.status(200).json(history);
 
 
    }catch (error){
       next(error);
    }
 };

 export const deletehistory = async(req , res ,next) => {
 
    try{
 
       const id = req.params.id ;
 
       
  
        await History.findByIdAndDelete(id);
       res.status(200).json('History has been deleted');
 
 
    }catch( error){
       next(error);
    }
 };

 export const historyview = async(req,res,next) =>{

   try{

       const email = req.params.email;
       const user = await History.find({email});
       
       if(!user){
           return res.status(404).json("User not found!");
       }

       res.status(200).json(user);
 
    }catch(error){
       next(error);
    }

}