import Package from "../models/package.model.js";

export const addpackage = async (req ,res ,next) => {

    
    try{
        const newPackage = await Package.create(req.body);
        return res.status(201).json({
            message: "Package added successfully!",
            Package: newPackage,
        });

    }catch(error){
        next(error);
    }
};

export const getAllpackage = async (req , res , next) => {
    try{
 
       const packages = await Package.find();
       res.status(200).json(packages);
 
 
    }catch (error){
       next(error);
    }
 };

 export const onepackage = async (req , res , next) => {

    try{
 
       const id = req.params.id;
       const PackageExist = await Package.findById(id);
 
       res.status(200).json(PackageExist);
 
    }catch(error){
       next(error);
    }
 
 
 };


 export const updatePackage = async(req , res , next) => {

    try{
 
       const id = req.params.id ;
 
       
  
       const updatePackage = await Package.findByIdAndUpdate(id, req.body, {new:true});
       res.status(200).json(updatePackage);
 
 
    }catch( error){
       next(error);
    }
 }
 
 export const deletePackage = async(req , res ,next) => {
 
    try{
 
       const id = req.params.id ;
 
       
  
        await Package.findByIdAndDelete(id);
       res.status(200).json('Package has been deleted');
 
 
    }catch( error){
       next(error);
    }
 };