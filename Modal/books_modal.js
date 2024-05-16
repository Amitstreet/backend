import mongoose from 'mongoose';
const BookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    language: { type: String, required: true },
    description: { type: String },
    // Store the user's ID directly
    addedBy: { type: String, required: true }
});


const book = mongoose.model('book',BookSchema);


export  default book;