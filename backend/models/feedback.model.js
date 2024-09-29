import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        
    },
    mood: {
        type: String,
        required: true,
        enum: ['happy', 'neutral', 'sad'],  // Ensures mood can only be one of these values
    },
    quality: {
        type: Number,
        required: true,
        min: 1,
        max: 5,  // Ensures quality is a number between 1 and 5
    },
    features: {
        type: [String],  // Stores an array of strings for the selected features
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
