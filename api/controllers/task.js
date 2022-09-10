import Task from '../models/task.js';

export const createTask = async (req, res, next) => {
    const newTask = new Task(req.body);
    console.log("in the create task");
    try {
      const savedTask = await newTask.save();
      res.status(200).json(savedTask);
    } catch (error) {
      next(error)
    }
};

export const updateTask = async(req,res,next)=>{
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true});
        res.status(200).json(updatedTask);
      } catch (error) {
        next(error);
      }
}

export const deleteTask = async(req,res,next)=>{
  console.log(res.locals.employeeId)
    try {
        await Task.findByIdAndDelete(req.params.id);
         res.status(200).json("Task is deleted");
       } catch (error) {
         next(error);
       }
}

export const getTask = async(req,res,next)=>{
    try {
        // const requestedTask = await Task.findById(req.params.id);
        const requestedTask = await Task.find().sort({createdAt:-1});
         res.status(200).json(requestedTask);
       } catch (error) {
         next(error);
       }
}

export const getAllTask = async(req,res,next)=>{
      const page=parseInt(req.query.page ? req.query.page : 1);
      const limit = parseInt(req.query.limit ? req.query.limit : 5);
      const skipIndex  =(page-1)*limit;
      const result = {};
    try {      
        result.requestedTask = await Task.find().sort({_id:1}).limit(limit).skip(skipIndex).exec();
         res.status(200).json(result);
       } catch (error) {
         next(error);
       }
}
