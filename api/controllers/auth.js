import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Employee from "../models/employee.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
    // res.send("Hello, this is auth register endpoint");
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(req.body.password, salt);
      const newEmployee = new Employee({
        employeeId: req.body.id,
        employeeName: req.body.name,
        employeeEmail: req.body.email,
        employeeMobile:req.body.mobile,
        password: hashPassword,
      });
      await newEmployee.save();
      res.status(200).json("Employee created Successfully!!!");
    } catch (error) {
      next(error);
    }
  };

  export const login = async (req, res, next) => {
    try {
      const employeeId = req.body.id;
      const employeepassword = req.body.password;
      const employee = await Employee.findOne({ employeeId });
      if (!employee) return next(createError(404, "Employee Not Found!"));
  
      const isPasswordCorrect = await bcrypt.compare(employeepassword, employee.password);
      if (!isPasswordCorrect)
        return next(createError(400, "Wrong Password or Username"));
  
      const token = jwt.sign(
        { id: employee._id },
        process.env.JWT
      );
  
      const { password, ...otherDetails } = employee._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(otherDetails);
      // res.status(200).json("user login successfully on the system!!!");
    } catch (error) {
      next(error);
    }
  };

 export const logout = async(req,res,next)=>{
  console.log("in logout")
    try{
      if (req.session) {
        console.log("req has session");
        req.session.destroy(err => {
          if (err) {
            res.status(400).send('Unable to log out')
          } else {
            res.send('Logout successful')
          }
        });
      } else {
        res.end()
      }
    }catch (error) {
      next(error);
    }
 }
  
  