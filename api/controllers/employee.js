import Employee from "../models/employee.js";


export const createEmployee = async (req, res, next) => {
    const newEmployee = new Employee(req.body);
    console.log(newEmployee);

    try {
      const savedEmployee= await newEmployee.save();
      res.status(200).json(savedEmployee);
    } catch (error) {
      next(error)
    }
};

export const getEmployee = async(req,res,next)=>{
    try {
        const requestedEmployee = await Employee.findById(req.params.id);
         res.status(200).json(requestedEmployee);
       } catch (error) {
         next(error);
       }
}