import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const smtp = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  }
});


async function test(){

try{

await smtp.verify();

console.log("✅ Gmail SMTP Connected");


await smtp.sendMail({

from:`Sovereign Identity <${process.env.EMAIL_USER}>`,

to:process.env.EMAIL_TO,

subject:"🚀 Sovereign Identity Engine",

text:
`
Identity Engine Online

Wallet Analyzer
Graph Intelligence
Sybil Detection
Reputation Engine

Status: Running
`

});


console.log("✅ Test Email Sent");


}catch(e){

console.log("❌ SMTP ERROR");
console.log(e.message);

}

}


test();
