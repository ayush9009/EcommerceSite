const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });
    //upr user bn chuka hai aur usi method hai ek 
    sendToken(user, 201, res);
})
//login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //checking if user has given password and email both mtlb dono honge jab hi sirf vo login kar payga
    if (!email || !password) {
        return next(new ErrorHander("Please enter a email & password", 400));
    }
    //+password kuki humene passowrd kai liye select:false kar raka hai
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        console.log("invalid email or password");
        return next(new ErrorHander("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);  //agr user milgya to hum passwrod mathc karenge ho skae same nam kai do bnde ho lakin passowrd to alg hi hoga agr do alg alg bnde hai to

    if (!isPasswordMatched) {
        console.log("password is not matched,i.e invalid password");
        return next(new ErrorHander("Invalid email or password", 401));  //jab email mathc kar gi to aur passowrd match ni kara to humne invalid email or password ku likha sirf ye likhna chaiye tha invalid passowrd aisa isliye taki invalid user ko lgae shyd emial bhi usene glt leekhi hai kkuki vo koi hacker bhi ho sakta hai
    }

    console.log("login successfully");
    sendToken(user, 200, res);
});

//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

//Forgot password ,here i mention ki matlb agr user forgot password kare to kya hona chaiye
// exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//         return next(new ErrorHander("User not Found", 404));
//     }

//     //Get ResetPassword Token
//     const resetToken = user.getResetPasswordToken();   //jo getresetpsswordtoken tha ye reset kar ra tha aur kuch return bhi kar ra tha tov o humne store bhi kar liya

//     // ab vo jo getResetPasswordToken tha usme hash genetate add hora tha lakin save ni huha deko sasbe forgit passowrd call hoga phir yaha reset value vala hsiab stoore uske bad maine vo sab save kar diya agli line main

//     await user.save({ validateBeforeSave: false })

//     //ab hum hash thode bejenge proper link bejengey jispe click karne se password reset hoja,to is url se jaga msg user kai pass
//     const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset//${resetToken}`;
//     // const resetPasswordUrl= `${process.env.FRONTEND_URL}://${req.get("host")}/password/reset/${resetToken}`;
//     // req.protocol ye isliye likha kuki yaha http bhi ho sake aur https bhi ilye prtocol jo bhi hoga apne aap isme set hojaga ab {host} pahle local host lihka tha ab ho skae vo busy to koi aur host hoja kaam isliye ye kiya
//     //ye message jaga user kai pass
//     // const message = `Your password reset token is ttemp :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email
//     // then,please ignore it`;
//     const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email
//     then,please ignore it`;

//     try {
//         await sendEmail({
//             email: user.email,
//             subject: `Ecommerce Website Password Recovery`,
//             message,
//         });
//         res.status(200).json({
//             success: true,
//             message: `Email sent to ${user.email}.successfully`,
//         })
//         console.log("email sent to forgot password vale user ko succesffully");
//         //ab await laga diya to pahle ye hoga phir kuch neeche ka hoga
//     } catch (error) {
//         console.log("catch vali error hun mai");
//         //kuki aisa ho sake resetpsaswod token call hoja direct us sey kya hoga user agr forgot password nhi bhi karta to bhi userka pasword rest hjga kuki token reset hgey aur uske msg pauch jaga 
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;  //taki agr error ave to ye dono undefined rahi nhi to usrlogin hi ni karpaneka

//         await user.save({ validateBeforeSave: false });  //save kar diya ye sab 

//         return next(new ErrorHander(error.message, 500));
//     }
// })
//mai naya forgot password vala hun
// Forgot Password
// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return next(new ErrorHander("User not found", 404));
    }
  
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
  
    await user.save({ validateBeforeSave: false });
  
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;
  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: `Ecommerce Password Recovery`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorHander(error.message, 500));
    }
  });
  
//reseet password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)  //jo user ko humne restpsawoed kai liye token vo hai ye
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });


    if (!user) {
        return next(new ErrorHander("Reset Password Token or has been expired", 400));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander("Password does not match", 400));

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        sendToken(user, 2000, res);
    }

    //3:16 pai hai reset password kai liye to check kar lo use ek bar ki vo kaise hoga kuki abhi to error ari
});

//GET USER DETAILS
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

//update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("password");

    const isPasswordMatched = user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        console.log("old password is incorrect");
        return next(new ErrorHander("old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        console.log("pasword does not match");
        return next(new ErrorHander("password does not match", 400));
    }

    console.log("password changed succesfufllhy");
    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

//Update user Profile
// exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
//     const newUserData = {
//         name: req.body.name,
//         email: req.body.email,

//ye ho asli comment
//     }
// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    //we will add cloudinary later

    // if (req.body.avatar !== "") {
    //     const user = await User.findById(req.user.id); //mtlbab avatar empty nhi hai to user dund lllo id ki madath se

    //     //aise user mila ki kis user ki bat hori ,phir iski image id lelo

    //     const imageId = user.avatar.public_id;

    //     //ab imageId mil gyi yani ab jaise ki image update karega to purani image destroy kardo

    //     await cloudinary.v2.uploader.destroy(imageId);  //is sey image destroy ho jagi

    //     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //         folder: "avatars",
    //         width: 150,
    //         crop: "scale",
    //     });
    //     newUserData.avatar = {
    //         public_id: myCloud.public_id,
    //         url: myCloud.secure_url,
    //     }


    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        userFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

//Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    });
});
//Get single users(admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHander(`User does not exist with Id:${req.params.id}`)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// //Update user  --Admin
// exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
//     const newUserData = {
//         name: req.body.name,
//         email: req.body.email,
//         role:req.body.role,
//     }

//     //we will add cloudinary later

//     const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//         new: true,
//         runValidators: true,
//         userFindAndModify: false,
//     });

//     res.status(200).json({
//         success: true,
//     });
// });
// //Update user Role --Admin
// exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
//     const newUserData = {
//         name: req.body.name,
//         email: req.body.email,
//         role:req.body.role,
//     }

//     //we will add cloudinary later

//     const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//         new: true,
//         runValidators: true,
//         userFindAndModify: false,
//     });

//     res.status(200).json({
//         success: true,
//     });
// });
// update User Role -- Admin
// exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
//     const newUserData = {
//         name: req.body.name,
//         email: req.body.email,
//         role: req.body.role,
//     };

//     let user=User.findById(req.params.id);
//     if (!user) {
        
//         return next(
           
//             new ErrorHander(`User does not exist with Id:${req.params.id}`)
//         );
//     }


//     user=await User.findByIdAndUpdate(req.params.id, newUserData, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//     });

//     res.status(200).json({
//         success: true,
//     });
// });
// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

   

    if (!user) {
        return next(
            new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    //We will remove the cloudinary user

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});















































