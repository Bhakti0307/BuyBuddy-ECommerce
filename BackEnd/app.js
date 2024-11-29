var express=require('express');
var app=express();
var cors=require('cors');
var routes=require('./router');

app.use(cors({
    origin: 'http://localhost:3001',  // The frontend origin that you want to allow
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
}));
app.use("/Mesho",routes);
app.listen(3000,function(){
    console.log("server listening at port 3000");
})
