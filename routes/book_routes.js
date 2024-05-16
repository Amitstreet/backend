import express from 'express';

import {add_book,get_list} from '../controlers/book_controler.js'

let router= express.Router();

router.post("/addbook",add_book);
router.get("/getall",get_list);

export  default router;