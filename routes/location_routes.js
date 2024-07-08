import express from 'express';

import { nearest_location,add_current_location } from '../controlers/location_controlers.js';


let router= express.Router();
console.log("yes")
router.post("/current",add_current_location)
router.get("/nearest",nearest_location);// we can add book


export  default router;
