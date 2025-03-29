import mongoose from "mongoose"

const userScema = new mongoose.Schema({
    uniqeId: { type: String, required: true, unique: true },
    name: { type: String, required: false },
    email: { type: String, required: false }
},
    {
        timestamps: true
    });

export default mongoose.model('User', userScema);