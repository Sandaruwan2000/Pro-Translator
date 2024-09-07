import Emoji from "../models/emoji.model.js";

export const addemoji = async (req ,res ,next) => {

    
    try{
        const newEmoji = await Emoji.create(req.body);
        return res.status(201).json({
            message: "Emoji added successfully!",
            emoji: newEmoji,
        });

    }catch(error){
        next(error);
    }
};

export const getAllemoji = async (req , res , next) => {
    try{
 
       const emoji = await Emoji.find();
       res.status(200).json(emoji);
 
 
    }catch (error){
       next(error);
    }
 };

 export const oneEmoji = async (req , res , next) => {

    try{
 
       const id = req.params.id;
       const emojiExist = await Emoji.findById(id);
 
       res.status(200).json(emojiExist);
 
    }catch(error){
       next(error);
    }
 
 
 };


 export const updateEmoji = async(req , res , next) => {

    try{
 
       const id = req.params.id ;
 
       
  
       const updateEmoji = await Emoji.findByIdAndUpdate(id, req.body, {new:true});
       res.status(200).json(updateEmoji);
 
 
    }catch( error){
       next(error);
    }
 }
 
 export const deleteEmoji = async(req , res ,next) => {
 
    try{
 
       const id = req.params.id ;
 
       
  
        await Emoji.findByIdAndDelete(id);
       res.status(200).json('Emoji has been deleted');
 
 
    }catch( error){
       next(error);
    }
 };
