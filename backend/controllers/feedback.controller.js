import Feedback from "../models/feedback.model.js";

export const addfeedback = async (req ,res ,next) => {

    
    try{
        const newFeedback = await Feedback.create(req.body);
        return res.status(201).json({
            message: "Feedback added successfully!",
            feedback: newFeedback,
        });

    }catch(error){
        next(error);
    }
};

export const getAllfeedback = async (req , res , next) => {
    try{
 
       const feedback = await Feedback.find();
       res.status(200).json(feedback);
 
 
    }catch (error){
       next(error);
    }
 };

 export const onefeedback = async (req , res , next) => {

    try{
 
       const id = req.params.id;
       const FeedbackExist = await Feedback.findById(id);
 
       res.status(200).json(FeedbackExist);
 
    }catch(error){
       next(error);
    }
 
 
 };


 export const updateFeedback = async(req , res , next) => {

    try{
 
       const id = req.params.id ;
 
       
  
       const updateFeedback = await Feedback.findByIdAndUpdate(id, req.body, {new:true});
       res.status(200).json(updateFeedback);
 
 
    }catch( error){
       next(error);
    }
 }

 export const deletefeedback = async(req , res ,next) => {
 
    try{
 
       const id = req.params.id ;
 
       
  
        await Feedback.findByIdAndDelete(id);
       res.status(200).json('Feedback has been deleted');
 
 
    }catch( error){
       next(error);
    }
 };

 export const customerview = async(req,res,next) =>{

   try{

       const email = req.params.email;
       const user = await Feedback.find({email});
       
       if(!user){
           return res.status(404).json("User not found!");
       }

       res.status(200).json(user);
 
    }catch(error){
       next(error);
    }

};