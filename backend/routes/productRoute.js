const express=require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router=express.Router();

router.route("/products").get(getAllProducts)  //ye hum get kar rai
router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts)
router
.route("/admin/product/new")
.post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);   //ye humne create kar dia 

router
.route("/admin/product/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser,createProductReview);  ///kuki isme update kar rai isliye put requrest ,jab data get kr rai ho to get ,jab data de rai ho to post requrest 


//YE JO HUM BAR BAR LIK RAI IS auhtenticated user iska matlb hai hai login hona jarori hai aisa ni hai ki login hai ni aur aap delete ya update kar par rai
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview)
//delete mai authentication get mai nhi hai matlb jab bhi koi open karenge website to use peechle reviews show hone chaiye isliye ...

module.exports=router
//yaha authenciation laga diya agr to sirf vo hi product update delete aur create kar sakta hai
//routes yaha se bna lenge,aur jo main vo productControll se kar rai