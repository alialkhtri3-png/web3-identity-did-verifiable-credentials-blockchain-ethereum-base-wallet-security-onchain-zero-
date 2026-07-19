import { Wallet } from "ethers";
import fs from "fs";

const wallet = Wallet.createRandom();

const issuer = {
  address: wallet.address,
  privateKey: wallet.privateKey,
  created: new Date().toISOString()
};

fs.writeFileSync(
"issuer.json",
JSON.stringify(issuer,null,2)
);

console.log("Issuer Created");
console.log("Address:", wallet.address);
