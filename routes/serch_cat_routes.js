import express from 'express';
import {searchByKeyword,searchByCategory} from '../controlers/serch_cat_controlers.js'


let router= express.Router();

router.get("/search/keyword/:keyword",searchByKeyword);
router.get("/search/category/:category",searchByCategory)

export  default router;

