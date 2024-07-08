import express from 'express';
import {edit_profile_controlers} from '../controlers/edit_profile_controlers.js'


let router= express.Router();
console.log("yes")
router.post("/:userId",edit_profile_controlers)
export  default router;
