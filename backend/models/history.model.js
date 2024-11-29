import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        
    },
      word:{
        type:String,
        required:true,
        

    },
    meaning:{
        type:String,
        required:true,
        

    },
    
    
},{ timestamps:true });

const History = mongoose.model('History',historySchema);

export default History;