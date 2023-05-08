const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    console.log(token);

    //hum is page pai kya kar rai ki jo login hai sirf use hi kuch special adhikar ho ,jo login nhi hai use vo adhikar na ho

    if (!token) {
        return next(new ErrorHander("Please Login to access the resources", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();

});

exports.authorizeRoles = (...roles) => {   //...roles taki roles ki value mil ja
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {    //user kai andar role bhi hoga ki vo user hai ya admin hai to humne not operator lafga diya ki matlb agr vo user ni hai to iska matlb vo admin to sirf vo hi kuch particular cheezo ko use kar sakta hia
            return next(new ErrorHander(
                `Role: ${req.user.role} is not allowed to access the resource`, 403
            )
            );
        }

        next();
    };
};