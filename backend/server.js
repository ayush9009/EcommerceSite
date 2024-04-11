const app=require('./app');

const dotenv=require("dotenv");
const cloudinary=require("cloudinary");
const connectDatabase=require("./config/database");
// const { connect } = require('http2')


//Handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Rejection`);
    process.exit(1);
})

//config
dotenv.config({path:"backend/config/config.env"})

// what is cloudinary?
// Upload widget: A ready-made, responsive user 
// interface that enables your users to upload files
//  from a variety of sources directly to Cloudinary
//connecting to database
connectDatabase()  //yye databse se connection hoja isliye ye function call karliya
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const server=app.listen(process.env.port,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

// console.log(youtube); //ab deko is error ko bhi humne handle kar liya jaise hi ise likogey to error ajagai youtube is not defined shutting down the server due to uncaught exception

//unhandled Promise Rejections
//isme vo error handles include karenge jo matlb ki jasie env file mai mongodb ki jagah humne mongo lik tha to kitni sari errors agyi thi to unsabko handle karne kai liye 
process.on("unhandledRejection",(err)=>{
    console.log(`Errror: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
})

//uncaught error
// console.log(youtube)  //to yaha error ajagi uncaught error kuki youtube to defined hi nhi hai
