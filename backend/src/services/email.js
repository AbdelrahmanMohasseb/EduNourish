const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, text, attachmentPath) => {
      console.log("hello")

  const transporter = nodemailer.createTransport({
    port: 587,
    secure: false,
    service: "gmail", // or another SMTP provider
    auth: {
      user: process.env.senderEmail,
      pass: process.env.senderPassWord,
    },
  });
  console.log("hello")
  const mailOptions = {
    from: process.env.senderEmail,
    to:to,
    subject:subject,
    text:text,
    attachments: [
      {
        filename: "report.pdf",
        path: attachmentPath,
      },
    ],
  };
  console.log("hello")

 try {
    
      await transporter.sendMail(mailOptions);

  } catch (err) {
    console.error("Error sending email:", err);
    throw err; // Important to throw it back to controller to catch
  }
};

module.exports = sendEmail;


// const nodemailer = require("nodemailer");

// async function sendEmail(dest, message , attachment) {


//     let attach =[];
//     if(attachment){
//         attach  = attachment
//     }
//     let transporter = nodemailer.createTransport({
//         port: 587 || 50000,
//         secure: false, // true for 465, false for other ports
//         service:'gmail',
//         auth: {
//             user:process.env.senderEmail, // generated ethereal user
//             pass:process.env.senderPassWord, // generated ethereal password
//         },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: `"Fred Foo 👻" <${process.env.senderEmail}>`, // sender address
//         to: dest, // list of receivers
//         subject: "confirmationEmail ✔", // Subject line
//         attachments :attach,
//         text: "hello confirmation email", // plain text body
//         html: message, // html body
//     });

// }
// // const message = `<a href="${req.protocol}://${req.headers.host}/user/confirm/${token}">click me </a> <br>
// //             <a href="${req.protocol}://${req.headers.host}/user/email/re_send/${refreshToken}">re-send activation  link </a>`
// //             await sendEmail(email, message)

// module.exports = sendEmail