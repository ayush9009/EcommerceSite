const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


//create product  --Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user.id  //jaise hi hume user ki id mil ja
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  })
});


// //Get All Product
// exports.getAllProducts=catchAsyncErrors(async(req,res,next)=>{

//     //  return next(new ErrorHander("This is my temp error",505));
//      const resultPerPage=8;
//      const productsCount=await Product.countDocuments(); //ye count isliye bnaya taki dashboard par show hoja kitni products hain

//     const apiFeature = new ApiFeatures(Product.find(),req.query)
//     .search()
//     //pagination isliye lagaya manlo agr 100 product hai to 100 kai 100 thodey dekne chaiye,abhi isliye 5 manliye
//     // .filter().pagination(resultPerPage);
//     .filter();
//     // const products=await Product.find();
//     // let products=await apiFeature.query;
//     let products=await apiFeature.query.clone();
//     let filteredProductsCount=products.length;
//     apiFeature.pagination(resultPerPage);

//       // products=await apiFeature.query;
//     res.status(200).json({
//         success:true,
//         productsCount,
//         resultPerPage,
//         filteredProductsCount,
//         products,
//     })
// })
// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query.clone();

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});
//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
    // productCount,
  })
})
//ab kaha ja jab async use kar rai ho ,to aapko try catch karna chaiye lakin humara code itna bada to har ek mai try catch use karenge to line of code bad jayega isliye middleware mai humne ek aur file vna lenge is cheez ko handle karne kai liye jisme hum async vali errors ko handle karenge 
//update product --ADMIN  //aera gera ni access kar sakte sirf admin hi kar sake
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  //let isliiye liya kuki isiko change karne vale hai
  let product = await Product.findById(req.params.id);  //taki id mil ja

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    //deleting images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images=imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })
  res.status(200).json({
    success: true,
    product
  })
})

//delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  //deleting images from cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  await product.remove();  //agr prduct milgyi to ye delete ho jagi

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully"
  })

})
// Create New Review or Update the review(agr tumne ab tak review na diya ho to vo create ho ja,aur agr de raka tha purane vala update ho ja)
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),  //rating number hi hona chaiye isliye is humne number mai wrap kar diya
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()  //agr same hai to iska matlab tumne pahle review kar raka agr nhi kar raka to iska matlb tumne pahle review nhi kara
  );

  if (isReviewed) { //mtlb pahle se review ho raka to ye karna
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else { //nhi to ye kar do
    product.reviews.push(review);   //humne models mai review karke ek array bana raki to agr koi abhi review kar ra jisne pahle se review kara hi ni
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {   //review array mai jitne bhi array unka avg nikal denge 
    avg += rev.rating;
  });


  product.ratings = avg / product.reviews.length;



  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(    //filter method unhe filter kar dega jo hume nhi chaiye
    //do methods->ya to hum aisa kare ki jo hume nhi chaiye vo hum delete kar de,ya usme vo hi rake jo hume chaiye
    (rev) => rev._id.toString() !== req.query.id.toString()  //ye vo sari review hai jo hume nhi delete karni aur vo hum rev mai save kar denge
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

