  
 import { singup,signin } from "../controlers/Auth_controlers.js";
 import  express  from "express";

 const router= express.Router();
 router.post('/signin',signin);
 router.post('/signup',singup)
 
 export default router
