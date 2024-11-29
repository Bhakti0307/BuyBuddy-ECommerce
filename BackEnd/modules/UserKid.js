let mongoose=require('mongoose');
let kid= new mongoose.Schema({
    kidId:{
        type:Number,
        default:0,
    },
    kidName:{
        type:String,
        required:true,
    },
    kidPrice:{
        type:Number,
        required:true,
    },
    kidDescription:{
        type:String,
        default:1000,
    },
    kidprodUrl:String
});
const userSchema2 = mongoose.model("kidEthnic", kid,"kidEthnic");
module.exports=userSchema2;