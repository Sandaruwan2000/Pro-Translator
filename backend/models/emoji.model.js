import mongoose from 'mongoose';

const emojiSchema = new mongoose.Schema({
    emoji:{
        type:String,
        required:true,
        unique:true,
    },
      name:{
        type:String,
        required:true,
        

    },
    
    
},{ timestamps:true });

const Emoji = mongoose.model('Emoji',emojiSchema);

export default Emoji;