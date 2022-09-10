import express from "express";
import {
  createEmployee,
  getEmployee,
} from "../controllers/employee.js";
import {verifyToken, verifyEmployee} from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauth",verifyToken,(req,res,next)=>{
//     res.send("Hello user u are logged in")
// })

// router.get("/checkuser/:id",verifyEmployee,(req,res,next)=>{
//     res.send("Hello user u are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("Hello Admin u are logged in and you can delete all account")
// })

// CREATE

router.post("/",verifyEmployee, createEmployee);

// UPDATE

// router.put("/:id",verifyEmployee, updateUser);

// DELETE

// router.delete("/:id",verifyEmployee, deleteUser);

// GET

router.get("/:id",verifyEmployee, getEmployee);

// GET ALL

// router.get("/",verifyEmployee, getAllUser);

export default router;
