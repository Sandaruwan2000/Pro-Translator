import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
    PkgCode:{
        type:String,
        required:true,
        
    },
    
    name:{
        type:String,
        required:true,
        
    },
    duration:{
        type:Number,
        required:true,
        

    },
      details:{
        type:String,
        required:true,
        

    },
    price:{
        type:Number,
        required:true,
        

    },
    
    
},{ timestamps:true });

const Package = mongoose.model('Package',packageSchema);

export default Package;