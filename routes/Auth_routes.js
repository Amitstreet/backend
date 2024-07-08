  
 import { singup,signin,signout} from "../controlers/Auth_controlers.js";
 import  express  from "express";
import { get_otp,verify_otp } from "../controlers/otp_controlers.js";
 const router= express.Router();
 router.post('/signin',signin);
 router.post('/signup',singup);
 router.post('/signout',signout); 
 router.post('/send-otp',get_otp);
 router.post('/verify-otp',verify_otp)
 
 export default router
