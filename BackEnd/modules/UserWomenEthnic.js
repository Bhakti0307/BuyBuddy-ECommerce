let mongoose=require('mongoose');
let ethnic= new mongoose.Schema({
    EthnicId:{
        type:Number,
        default:0,
    },
    EthnicName:{
        type:String,
        required:true,
    },
    EthnicPrice:{
        type:Number,
        required:true,
    },
    EthnicDescription:{
        type:String,
        default:1000,
    },
    prodUrl:String
});
const userSchema = mongoose.model("userEthnic", ethnic,"WomanEthnic");
module.exports=userSchema;