import jwt from "jsonwebtoken";
import { User } from "../models/User.mjs";

const jwtSecret = "AXYTNBGFTYU";

export const authentication = async(req, res, next)=>{
    let token;
    if(req.header.authorization && req.header.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, jwtSecret);
            req.user = await User.findById(decoded._id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({success: false, msg: 'not authorized'})
        }
    }
    if(!token){
        res.status(401).json({success: false, msg: 'not authorized'});
    }
}