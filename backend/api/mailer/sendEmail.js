require("dotenv").config({ path: "../" });
const nodemailer = require("nodemailer");

const clid = process.env.CLIENTID;
const clsec = process.env.CLIENTSECRET;
const refrtok = process.env.REFRESHTOKEN;
const from = process.env.FROMEMAIL;
const to = process.env.TOEMAIL;

var transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true,
   auth: {
      type: "OAuth2",
      user: from,
      clientId: clid,
      clientSecret: clsec,
      refreshToken: refrtok,
   },
});

sendEmail = async (req, res) => {
   let { replyto, subject, name, content, attachments } = req.body;
   const log = logs[logger.getIP(req)];
   if (!replyto) replyto = "No Return Address";
   if (!subject) subject = "No Subject";
   if (!name) name = "No Name Given";
   if (!content) content = "No Content";

   transporter.sendMail(
      {
         from: `"${name}" <mailer@domain.ext>`,
         to: `${to}`,
         subject: `${subject}`,
         html: `
      <!DOCTYPE html>
<html lang="en">
  <body style="min-height: 100vh; margin: 0px; padding: 0px">

  </body>
</html>


      
    `,
         attachments: attachments.map((attch) => ({
            filename: attch.filename,
            content: new Buffer.from(attch.raw.split("base64,")[1], "base64"),
         })),
      },
      (err, info) => {
         if (err) {
            console.log("ERROR SENDING MAIL");
            console.error(err);
         } else {
            console.log("SENT MAIL!");
            res.status(200).json({
               status: "Sent Email!, updated msg",
               from: `from`,
               time: `time`,
               subject,
               name,
               content,
               replyto,
               emailid: info,
               attachments,
            });
         }
      }
   );
};

module.exports = sendEmail;
