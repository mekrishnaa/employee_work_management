import jwt from "jsonwebtoken";
import { createError } from "./error.js";



export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(501,"you are not authorized"))
    }
    jwt.verify(token,process.env.JWT,(err,employee)=>{
        if(err){
            return next(createError(403,"session-expried"));
        }
        req.employee=employee;
        next();
    });

}


export const verifyEmployee = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.employee.id === req.params.id){
            res.locals.employeeId = req.employee.id;
            next();
        }
        else{
            if(err){
                return next(createError(403,"you are not authorized"));
            }
        }
    })
}