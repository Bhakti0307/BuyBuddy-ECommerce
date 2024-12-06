let mongoose=require('mongoose');
let Customer= new mongoose.Schema({
    CustId:{
        type:Number,
        default:0,
    },
    CustName:{
        type:String,
        required:true,
    },
    CustEmail:{
        type:String,
        required:true,
        unique: true
    },
    CustPass:{
        type:String,
        required:true,
    },
    CustContNo:{
        type:Number,
        required:true,
    }
    
});
const custSchema = mongoose.model("Cust", Customer,"Cust");
module.exports=custSchema;