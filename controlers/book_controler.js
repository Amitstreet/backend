


import Book from '../Modal/books_modal.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const add_book = async (req, res, next) => {
    let { name, price, imageUrl, category, language, addedBy }= req.body;
    if (!name || !price || !imageUrl || !category || !language || !addedBy) {
        return res.status(400).json({ error: 'All required fields must be provided' });
    }
    
    try {
        // Create a new book using the Book model
        const book = new Book({
            name,
            price,
            imageUrl,
            category,
            language,
            description: req.body.description, // Optional field
            addedBy
        });

        // Save the book to the database
        await book.save();

        // Respond with success message
        res.status(201).json({ message: 'Book created successfully', book });
    } catch (error) {
        // Handle database errors or other unexpected errors
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

export const get_list  = async (req,res) => {
    try {
        // Fetch all books from the database
        const books = await Book.find();

        // If there are no books, return an empty array
        if (!books || books.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }

        // If books are found, return them
        res.status(200).json({ books });
    } catch (error) {
        // Handle database errors or other unexpected errors
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}