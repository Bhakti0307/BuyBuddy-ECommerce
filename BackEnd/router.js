var express=require('express');
var router=express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
router.use(bodyParser.raw());

let mongoose=require('mongoose');
var cust=require("./modules/SignUp")
var userEthic=require("./modules/UserWomenEthnic");
var userMen=require("./modules/UserMen");
var userKid=require("./modules/UserKid");


const db={};
db.custdb=cust;
db.user=userEthic;
db.user1=userMen;
db.user2=userKid;


db.mongoose=mongoose;
db.url="mongodb://127.0.0.1:27017/buyBuddy";
var multer=require("multer");

db.mongoose.connect("mongodb://127.0.0.1:27017/buyBuddy").then(()=>{
    console.log("connected to database");

})
.catch(err =>{
    console.log("Not connected",err);
    process.exit();
});
const Cust=db.custdb;
const User=db.user;
const User1=db.user1;
const User2=db.user2;

router.get("/",function(req,res)
{
    res.send("its home page");
})

router.use(express.static('public'));
// //Serves all the request which includes /images in the url from Images folder
router.use('/images', express.static(__dirname + '/images'));


//Set up multer to handle file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images/'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      const fileName = `${file.originalname}`;
      cb(null, fileName);
    }
  });
  const upload = multer({ storage: storage });
 
  router.get("/home",function(req,res){
    res.send("home page!!");
  })
  // Handle file upload  woman
  router.post('/womanEthnic/upload', upload.single('image'), async (req, res) => {
    // Access the uploaded file through req.file
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    let url="http://localhost:3000/Mesho/images/"+req.file.originalname;
    //insert into database
    var count=await User.find().countDocuments();
   var wId=count+1;
    console.log(count);
    var obj={
            "EthnicId":wId,
             "EthnicName":req.body.txtName,
             "EthnicPrice":req.body.txtPrice,
             "EthnicDescription":req.body.txtDesc,
              "prodUrl":url
            }
    const p1 = new User(obj);
    
    try {
        console.log(p1);
      var result=await p1.save();
      
      res.json({
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.filePath,
      });
    }
    catch(err){
  
    }
   
  })

//insert record
router.post("/womanEthnic",async function (req,res) {
    var obj=req.body;
    console.log(obj);
    var result=await User.insertMany(obj);
    res.json(result);
})
//display records
router.get("/userWomanEthnic",async function (req,res) {
    var result=await User.find({},{id:0,_v:0});
    res.json(result);
})
//serach records
router.get("/getWomanEthnic/:id",async function (req,res) {
   var id=req.params.id;
    var result=await User.findOne({EthnicId:id},{id:0,_v:0});
    if(result)
    {
        res.json({"msg":"record found",data:result});
    }
    else{
        res.json({"msg":"record not found"});
    }   
})
router.put("/updateWomanEthnic/:id",async function(req,res){
        var id=req.params.id;
         var newPrice=req.body.EthnicPrice;
        var getId=await User.findOne({EthnicId:id});
       
        console.log(newPrice);
        if(getId)
     {
         var result=await User.updateOne({EthnicId:id,EthnicPrice:newPrice});
         console.log(result);
           if(result)
                  {
                     var upObj=await User.findOne({EthnicId:id},{_id:0,__v:0});
                  res.json({"msg":"record updated",data:upObj});
                  }
         }
         else
        {
            res.json({"msg":"record not updated"});         
        }
  
 })
// delete record
        router.delete("/deleteWomanEthic/:id",async function(req,res){
        var id=req.params.id;
        var result=await User.findOneAndDelete({EthnicId:id});
        if(result){
        res.json({"msg":"record is deleted"});
         }
         else
         {
            res.json({"msg":"record not deleted"});
         }
    
})

// Mens
router.post('/menEthnic/upload', upload.single('image1'), async (req, res) => {
  // Access the uploaded file through req.file
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  let url="http://localhost:3000/Mesho/images/"+req.file.originalname;
  //insert into database
  var count=await User1.find().countDocuments();
 var menId=count+1;
  console.log(count);
  var obj={
          "menId":menId,
           "menName":req.body.txtName1,
           "menPrice":req.body.txtPrice1,
           "menDescription":req.body.txtDesc1,
            "menprodUrl":url
          }
  const p1 = new User1(obj);
  
  try {
      console.log(p1);
    var result=await p1.save();
    
    res.json({
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.filePath,
    });
  }
  catch(err){

  }
 
})

//insert record
router.post("/menEthnic",async function (req,res) {
  var obj=req.body;
  console.log(obj);
  var result=await User1.insertMany(obj);
  res.json(result);
})
//display records
router.get("/userMenEthnic",async function (req,res) {
  var result=await User1.find({},{id:0,_v:0});
  res.json(result);
})
//serach records
router.get("/getMenEthnic/:id",async function (req,res) {
 var id=req.params.id;
  var result=await User1.findOne({menId:id},{id:0,_v:0});
  if(result)
  {
      res.json({"msg":"record found",data:result});
  }
  else{
      res.json({"msg":"record not found"});
  }   
})
router.put("/updateMenEthnic/:id",async function(req,res){
      var id=req.params.id;
       var newPrice=req.body.menPrice;
      var getId=await User1.findOne({menId:id});
     
      console.log(newPrice);
      if(getId)
   {
       var result=await User1.updateOne({menId:id,menPrice:newPrice});
       console.log(result);
         if(result)
                {
                   var upObj=await User1.findOne({menId:id},{_id:0,__v:0});
                res.json({"msg":"record updated",data:upObj});
                }
       }
       else
      {
          res.json({"msg":"record not updated"});         
      }

})
// delete record
      router.delete("/deleteMenEthic/:id",async function(req,res){
      var id=req.params.id;
      var result=await User1.findOneAndDelete({menId:id});
      if(result){
      res.json({"msg":"record is deleted"});
       }
       else
       {
          res.json({"msg":"record not deleted"});
       }
  
})


//Kid
router.post('/kidEthnic/upload', upload.single('image2'), async (req, res) => {
  // Access the uploaded file through req.file
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  let url="http://localhost:3000/Mesho/images/"+req.file.originalname;
  //insert into database
  var count=await User1.find().countDocuments();
 var kidId=count+1;
  console.log(count);
  var obj={
          "menId":kidId,
           "kidName":req.body.txtName2,
           "kidPrice":req.body.txtPrice2,
           "kidDescription":req.body.txtDesc2,
            "kidprodUrl":url
          }
  const p1 = new User2(obj);
  
  try {
      console.log(p1);
    var result=await p1.save();
    
    res.json({
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.filePath,
    });
  }
  catch(err){

  }
 
})

//insert record
router.post("/kidEthnic",async function (req,res) {
  var obj=req.body;
  console.log(obj);
  var result=await User2.insertMany(obj);
  res.json(result);
})
//display records
router.get("/userkidEthnic",async function (req,res) {
  var result=await User2.find({},{id:0,_v:0});
  res.json(result);
})
//serach records
router.get("/getKidEthnic/:id",async function (req,res) {
 var id=req.params.id;
  var result=await User2.findOne({menId:id},{id:0,_v:0});
  if(result)
  {
      res.json({"msg":"record found",data:result});
  }
  else{
      res.json({"msg":"record not found"});
  }   
})
router.put("/updateKidEthnic/:id",async function(req,res){
      var id=req.params.id;
       var newPrice=req.body.kidPrice;
      var getId=await User2.findOne({kidId:id});
     +
      console.log(newPrice);
      if(getId)
   {
       var result=await User2.updateOne({kidId:id,kidPrice:newPrice});
       console.log(result);
         if(result)
                {
                   var upObj=await User2.findOne({kidId:id},{_id:0,__v:0});
                res.json({"msg":"record updated",data:upObj});
                }
       }
       else
      {
          res.json({"msg":"record not updated"});         
      }

})
// delete record
      router.delete("/deleteKidEthic/:id",async function(req,res){
      var id=req.params.id;
      var result=await User2.findOneAndDelete({KidId:id});
      if(result){
      res.json({"msg":"record is deleted"});
       }
       else
       {
          res.json({"msg":"record not deleted"});
       }
  
})

//signUp
router.post("/signup",async function (req,res) {
  var obj=req.body;
  console.log(obj);
  var result=await Cust.insertMany(obj);
  console.log(result);
  res.json(result);
})
// getAllSignUser
router.get("/signupAllUser",async function (req,res) {
  var result=await Cust.find({},{id:0,_v:0});
  res.json(result);
})
// delete record
router.delete("/deleteSignUser/:id",async function(req,res){
  var id=req.params.id;
  var result=await Cust.findOneAndDelete({custId:id});
  if(result){
  res.json({"msg":"record is deleted"});
   }
   else
   {
      res.json({"msg":"record not deleted"});
   }

})
// Signin

router.post("/login", async function (req, res) {
  try {
    const { CustEmail, CustPass } = req.body;

    console.log("Received CustEmail:", CustEmail);
    console.log("Received CustPass:", CustPass);

    if (!CustEmail || !CustPass) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    console.log("Querying database with:", { CustEmail, CustPass });
    const result = await Cust.findOne({ CustEmail, CustPass });

    console.log("Query result:", result);

    if (!result) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Successful login
    return res.status(200).json({
      message: "User login successful",
      result: {
        CustEmail: result.CustEmail,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "An error occurred. Please try again later." });
  }
});

// Pagination
router.get("/getMenEthnic/:lt/:sk",async function(req,res){
  var lmt=req.params.lt;
  var skp=req.params.sk;
  var result=await User.find({},{_id:0,__v:0}).limit(lmt).skip(skp);
  res.json(result);
})
module.exports=router;