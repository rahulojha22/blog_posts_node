import express from "express";
import { User } from "../models/User.mjs";
import jwt from "jsonwebtoken";

const jwtSecret = "AXYTNBGFTYU";

export const auth_router = express.Router();

auth_router.post('/register', async(req, res)=>{
    const {name, email, password}= req.body;
    try {
        const User = new User({name, email, password});
        await User.save();
        res.status(200).json({success: true, msg: "User registered"});
    } catch (error) {
        res.status(500).json({success: false, msg: 'error'});
    }
})

auth_router.post('/login', async(req, res)=>{
    const {email, password}= req.body;
    try {
        const user = await User.findOne({email: email});
        if(!user || !(await user.matchPassword(password))){
            return res.status(401).json({success: false, msg: "Invalid credentials"});
        }
        const token = jwt.sign({id: user._id, jwtSecret, expiredIn: '1h'});
        res.status(200).json({success: true, token: token});
    } catch (error) {
        res.status(500).json({success: false, msg: 'error'});
    }
})