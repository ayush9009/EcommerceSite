const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a Valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,   //mtlb passowrd ko chorke sab dedega
    },
    avatar: {   //product mai array of objects liya tha kuki kahi sare products ho sake lakin tumhari profile to ek hi hogi ek hi to photo lagaogey
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role: {
        type: String,   //mtlb kya hai admin hai ya user hai,bydefault user le liya humne use
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
        //mtlb agr kuch changes nhi huhe to aapko kuch ni karna lakin agr changes to phir uske liye to if kai neeche likh hi raha ki kya karna
    }
    //mtlb save hone se pahle(pre le raka isliye hi) tumhe ek kam karna password ko bcrypt kar dena,ab aapko pata hi hoga arrow function kai andar aap this keyword ka use ni kar sakte ho
    this.password = await bcrypt.hash(this.password, 10);   //10 power ki ppower10 hai 
})

//JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        //jwt secret hai ye apki secret key agr ye user kai hath lag gayi to kand ho jaga
        //expireinkitne time bad aapki cookie expire hojgagi vo humne mention kar diya
        expiresIn: process.env.JWT_EXPIRE,
    })
}

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


//Generating Password Reset Token   ,aisa bhi to ho sake user apna password bhul ja to use reset karne ki jarorat padegi

// userSchema.methods.getResetPasswordToken = function () {


//     ///Generating token

//     const resetToken = crypto.randomBytes(20).toString("hex");

//     //hashing and adding resetPsswordToken to userSchema

//     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

//     this.resetPasswordExpire = Date.now() + 15 * 60 * 1000   //15*60 second mai convert huuha *1000 to milisecond mai convert hogya
//     //jab aap login karogey to aapko ek cookie milegi vo apne token mai store kara li ab man lo us account mai aap login hi ni kar parrai to to aapko vo jo ccokie mile muje (admin) jo sab kuch bna rahe hai use vo token ,vo time jis time mili vo sab resert karna padega taki ab jab aap resetpassword to jo cookie aru time generate ho vo token mai aa sake
//     return resetToken;

//     //ab hum kya karenge nodemailer kai through ek user ko link taki vo jaise hi link pai click kare uska password yani sari cookie date time sab reset hoja,date reset kar do
// };

//naya vala hun mai
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };



module.exports = mongoose.model("User", userSchema);











// ///yaha smjlo crypto ka use crypto ko use kaise karte hai
// const crypto=require("crypto")
// const token=crypto.randomBytes(20)
// //is sey karne se buffer show hoga mtlb random bytes generate ho jagi
// // Buffer b1 9d 15 3c 3f 8d  aise buffer generate hojga
// ab agr crypto.randomBytes(20).toString("hex")  //to ab hex value bn jagi mtlb smjaga kya likha huha hai
// //to humne 20 random bytes generate kar di ,aisi hex value taki kuch smj bhi ajaaga
// //const tokenCrypto=crypto.createHash("sha256").update(token).digest(hex)  hmne hash generate kar diya ,sha256 ye ek algo hai,digest mai  hex value  define kar di
// //aisse karne se ek bht badi value genertea hogi,ab agr isme se digest(hex) hata de patani azeeb sa data ayega vo na aye isliye digest.hext
// //hash{
//     _handle:{},
//     _options:undefined,
//     writable:true,

//     //to agr digest hex na use karo to aisi vlau ab ise sey humara koi vasta ni hai isliye hum digest(hex) use kara hai
// }