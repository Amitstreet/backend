import mongoose from 'mongoose';
const BookSchema = new mongoose.Schema({
    id: { type: String, required: true },
    bookname: { type: String, required: true },
    writer: { type: String, required: true },
    url: { type: String, required: true },
    catogery: { type: String, required: true },
    description: { type: String },
});


const book = mongoose.model('book',BookSchema);


export  default book;

