import { Wallet, keccak256, toUtf8Bytes } from "ethers";
import fs from "fs";

const walletAddress = process.argv[2];

if(!walletAddress){
 console.log("Wallet required");
 process.exit(1);
}

const issuer = JSON.parse(
 fs.readFileSync("issuer.json")
);

const issuerWallet = new Wallet(
 issuer.privateKey
);

const report = JSON.parse(
 await (await fetch("http://localhost:3001/api/identity",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
   wallet:walletAddress,
   network:"base"
  })
 })).text()
);


const credential = {

credentialId:
"CRED-8453-"+walletAddress.slice(2,10),

passportId:
"SID-8453-"+walletAddress.slice(2,10),

wallet:walletAddress,

network:"Base",

identityScore:
report.identityScore,

reputation:
report.reputation,

issuedBy:
issuerWallet.address,

issuedAt:
new Date().toISOString()

};


const hash = keccak256(
toUtf8Bytes(JSON.stringify(credential))
);


const signature =
await issuerWallet.signMessage(hash);


const output={

credential,

hash,

signature,

issuer:issuerWallet.address,

status:"VERIFIED"

};


fs.writeFileSync(
"signed_identity.json",
JSON.stringify(output,null,2)
);


console.log("==============================");
console.log(" Sovereign Identity Issuer V13");
console.log("==============================");
console.log();
console.log("Passport:");
console.log(credential.passportId);
console.log();
console.log("Credential:");
console.log(credential.credentialId);
console.log();
console.log("Identity Score:");
console.log(
credential.identityScore.score+"/100"
);
console.log();
console.log("Signature:");
console.log("VALID");
console.log();
console.log("Issuer:");
console.log(issuerWallet.address);
console.log();
console.log("==============================");
