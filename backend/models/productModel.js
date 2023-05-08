
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"]
    },
    price: {
        type: "Number",
        required: [true, "Please Enter Product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    ratings: {
        type: "Number",
        default: 0  //bydefault rating 0 le chlre hum
    },
    images: [  //array of objects kuki ek image thodi hogi
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type:String,
        required:[true,"Please Enter Product Category"],
    },
    Stock:{
        type:Number,
        required:[true,"Please Enter product Stock"],
        maxLength:[4,"Stock cannot exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    //ab aisa bhi ho sake aap kai alava bhi koi admin ho sake  matlb ek company usme aapka friend bhi partner hai aapkse sath to aapne ho changes kar site mai to useko pata lag jana chaiye ki acha usne isme kuch changes kare hai
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

// const Products=new mongoose.model("clients",productsSchema);

module.exports=mongoose.model("Product",productSchema);