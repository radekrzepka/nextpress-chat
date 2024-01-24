import nodemailer from "nodemailer";

interface MailData {
   from: string;
   to: string;
   subject: string;
   text: string;
}

const transporter = nodemailer.createTransport({
   port: 465,
   host: "smtp.gmail.com",
   auth: {
      user: process.env.MAIL_FROM,
      pass: process.env.MAIL_PASSWORD,
   },
   secure: true,
});

export const sendMail = (mailData: Omit<MailData, "from">): Promise<void> => {
   return new Promise((resolve, reject) => {
      transporter.sendMail(
         { ...mailData, from: process.env.MAIL_FROM },
         err => {
            if (err) {
               reject(err);
            } else {
               resolve();
            }
         }
      );
   });
};
