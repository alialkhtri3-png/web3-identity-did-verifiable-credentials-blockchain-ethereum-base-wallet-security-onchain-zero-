import { Wallet, keccak256, toUtf8Bytes } from "ethers";
import fs from "fs";

const issuer = JSON.parse(
fs.readFileSync("issuer.json")
);

const wallet = new Wallet(issuer.privateKey);

const credential = {
 id: "CRED-8453-d8dA6BF2",
 wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
 network: "Base",
 score: 70,
 status: "Established",
 sybilRisk: false,
 issuer: wallet.address,
 issued: new Date().toISOString()
};

const hash = keccak256(
toUtf8Bytes(JSON.stringify(credential))
);

const signature =
await wallet.signMessage(hash);

const signed = {
 credential,
 hash,
 signature,
 issuer: wallet.address
};

fs.writeFileSync(
"signed_credential.json",
JSON.stringify(signed,null,2)
);

console.log("Credential Signed");
console.log("Hash:",hash);
console.log("Signature:",signature);
