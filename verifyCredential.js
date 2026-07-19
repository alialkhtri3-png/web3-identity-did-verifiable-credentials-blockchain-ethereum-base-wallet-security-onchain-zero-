import { verifyMessage, keccak256, toUtf8Bytes } from "ethers";
import fs from "fs";

const data = JSON.parse(
  fs.readFileSync("signed_credential.json")
);

const hash = keccak256(
  toUtf8Bytes(JSON.stringify(data.credential))
);

const recovered = verifyMessage(
  hash,
  data.signature
);

console.log("==============================");
console.log(" Sovereign Credential Verify");
console.log("==============================");

console.log();
console.log("Credential:");
console.log(data.credential.id);

console.log();
console.log("Hash Match:");

console.log(
 hash === data.hash ? "PASS" : "FAILED"
);

console.log();
console.log("Signature:");

console.log(
 recovered === data.issuer ? "VALID" : "INVALID"
);

console.log();
console.log("Issuer:");
console.log(recovered);

console.log();
console.log("Status:");

console.log(
 recovered === data.issuer ? "VERIFIED" : "REJECTED"
);

console.log("==============================");
