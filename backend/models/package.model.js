import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    duration:{
        type:String,
        required:true,
        

    },
      details:{
        type:String,
        required:true,
        

    },
    price:{
        type:String,
        required:true,
        

    },
    
    
},{ timestamps:true });

const Package = mongoose.model('Package',packageSchema);

export default Package;