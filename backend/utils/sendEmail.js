// const nodemailer=require("nodemailer");

// const sendEmail=async(options)=>{   //options tume pata ek object hai,is options mai subject emial aur msg aya taki hum unhe user kar skae isliye liya
//     const transporter=nodeMailer.createTransport({
//         host:process.env.SMPT_HOST,
//         port:process.env.SMPT_PORT,
//         service:process.env.SMPT_SERVICE, //ya jo fake emial id bnayga vo aur uska password dalna hai yad rako,lakin env kar diya taki agr emial bloxk ya cookie expire hogi tab bhi koi dikkt na ho
//         auth:{
//             user:process.env.SMPT_MAIL,   //ab ya env use kiya kuki kuch huch cookie email ki expire hogai ya ye email blcok hogyi to kya karogey phir code mai changes karogey nhi na isliye,simplemailpasswordtranfer(smpt)
//             pass:process.env.SMPT_PASSWORD,   //ye deko SMPT_PASSWORD yani ye bhi vo hi upr vai line rea
//         }
//     })

//     const mailOptions={
//         from:process.env.SMPT_MAIL,    //yaha humari fake gmail ayegi
//         to:options.email,   //jiski email pai bej rai uski email agyi yaha
//         subject:options.subject,  //kya subject vo b
//         text:options.message,
//     };

//     await transporter.sendMail(mailOptions);  //is sey chli jagi mail
// };

// module.exports=sendEmail;
const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;



















//ab jab bhi hum development kai liye emailtesting service ka
 //jaise ki mail trap but uska nuksan ye hai ki vo sirf show
  //karegi ki email chla gya to uska kya fayda hume to email bejni kisi bhi halat mai,to isliye
  //hum ek fake gmail id banaygey aur aur us sey msg jayenge