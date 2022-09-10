import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
    employeeId:{
        type:String,
        require:true,
        unique:true,
    },
    employeeName:{
        type:String,
        require:false,
    },
    employeeEmail:{
        type:String,
        require:true,
        unique:true,
    },
    employeeMobile:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
},{timestamps:true});

export default mongoose.model("Employee",employeeSchema);