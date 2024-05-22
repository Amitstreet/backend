import express from 'express';

import {add_book,get_list,delete_book,get_book_by_id,filter_books_by_userid,edit_book} from '../controlers/book_controler.js'

let router= express.Router();

router.post("/addbook",add_book);// we can add book
router.get("/getall",get_list); // we can get all book from user
router.delete('/delete_book/:bookId', delete_book); // we can delate any book  acording to book id
router.get('/get_book/:bookId', get_book_by_id); // we can get unique book acording to book id
router.get('/filter_book/:id', filter_books_by_userid); // we can show the books acording userid 
router.put('/edit_book/:id',edit_book);// we can edit particuler book by bookid 

export  default router;