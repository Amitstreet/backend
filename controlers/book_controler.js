


import Book from '../Modal/books_modal.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';






export const add_book = async (req, res, next) => {
    let { id, bookname, writer, url , catogery, description }= req.body;
    if (!id || !bookname || !url || !catogery || !description) {
        return res.status(400).json({ error: 'All required fields must be provided' });
    }
    
    try {
        // Create a new book using the Book model
        const book = new Book({
            id,
            bookname,
            writer,
            url,
            catogery,
            description,// Optional field
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


export const get_book_by_id = async (req, res) => {
    const { bookId } = req.params; // Assuming bookId is passed as a route parameter

    try {
        // Find the book by its ID
        const book = await Book.findById(bookId);

        // If no book is found with the provided ID, return 404
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Respond with the book data
        res.status(200).json({ book });
    } catch (error) {
        // Handle database errors or other unexpected errors
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const delete_book = async (req, res) => {
    const { bookId } = req.params; // Assuming bookId is passed as a route parameter

    try {
        // Find the book by its ID and delete it
        const deletedBook = await Book.findByIdAndDelete(bookId);

        // If no book is found with the provided ID, return 404
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Respond with success message
        res.status(200).json({ message: 'Book deleted successfully', deletedBook });
    } catch (error) {
        // Handle database errors or other unexpected errors
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



export const filter_books_by_userid = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ error: 'ID query parameter is required' });
    }

    try {
        // Find the book by its custom ID attribute
        const book = await Book.find({ id });
        

        // If no book is found with the provided ID, return 404
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Respond with the book data
        res.status(200).json({ book });
    } catch (error) {
        // Handle database errors or other unexpected errors
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const edit_book = async (req, res) => {
    const { nid } = req.params;
    const {id, bookname, writer, url, category, description } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'ID parameter is required' });
    }

    try {
        // Find the book by its custom ID attribute and update its details
        const updatedBook = await Book.findOneAndUpdate(
            { nid },
            {id ,bookname, writer, url, category, description },
            { new: true, runValidators: true }
        );

        // If no book is found with the provided ID, return 404
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Respond with the updated book data
        res.status(200).json({ message: 'Book updated successfully', updatedBook });
    } catch (error) {
        // Handle database errors or other unexpected errors
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};