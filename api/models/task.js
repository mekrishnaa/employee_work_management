import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    employeeId:{
        type:String,
        require:true,
    },
    employeeName:{
        type:String,
        require:false,
    },
    taskName:{
        type:String,
        require:true,
    },
    startDate:{
        type:Date,
        require:true,
    },
    endDate:{
        type:Date,
        require:true,
    },
    status:{
        type:String,
        require:true,
        default:'Not Started',
    }
},{timestamps:true});

export default mongoose.model("Task",taskSchema);