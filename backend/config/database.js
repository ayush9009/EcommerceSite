const mongoose = require("mongoose");



const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI).then((data) => console.log(`Mongodb connected with server :${data.connection.host}`))
}

module.exports = connectDatabase

// agr kuch gadbad hori to host kai bad ye catch pastekar dena .catch((error) => console.log("error" + error.message))

//bcrypt use hoga passwrord kai liye nodemailer koi forgot passowrd kar to uske pass otp kai form reset password kai roop mai link jaye jo token generate hoga vo hum cookie mai store karayenge kuki frontend pai ni hoti ye cheez store