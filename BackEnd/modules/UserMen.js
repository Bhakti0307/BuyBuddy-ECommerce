let mongoose=require('mongoose');
let men= new mongoose.Schema({
    menId:{
        type:Number,
        default:0,
    },
    menName:{
        type:String,
        required:true,
    },
    menPrice:{
        type:Number,
        required:true,
    },
    menDescription:{
        type:String,
        default:1000,
    },
    menprodUrl:String
});
const userSchema1 = mongoose.model("menEthnic", men,"menEthnic");
module.exports=userSchema1;