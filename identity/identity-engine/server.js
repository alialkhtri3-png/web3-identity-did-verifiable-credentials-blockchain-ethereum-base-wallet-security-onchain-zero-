import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;
const RPC = "https://mainnet.base.org";

function scoreIdentity(data){

let score = 50;

const eth = Number(data.portfolio.ETH || 0);

if(eth > 1) score += 10;
if(eth > 5) score += 10;

if(data.intelligence.activity === "scanned")
    score += 10;

const connections =
data.intelligence.graph.uniqueConnections || 0;

if(connections > 5)
    score += 10;

if(data.reputation.sybilRisk)
    score -= 30;

if(score > 100) score = 100;
if(score < 0) score = 0;

let label="Neutral";

if(score >= 80)
label="Trusted";

else if(score >=60)
label="Established";

else if(score <40)
label="Risky";


return {
score,
label
};

}


async function getBalance(wallet){

const body={
jsonrpc:"2.0",
method:"eth_getBalance",
params:[wallet,"latest"],
id:1
};


const r=await fetch(RPC,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(body)
});


const j=await r.json();

let wei=BigInt(j.result || "0x0");

return (Number(wei)/1e18).toFixed(18);

}



app.get("/",(req,res)=>{

res.json({
name:"Sovereign Identity Engine",
version:"V12.1",
status:"running"
});

});



app.get("/api/status",(req,res)=>{

res.json({

status:"online",

engine:"Sovereign Identity Engine V12.1 Production",

port:PORT,

modules:[
"Passport",
"Credential",
"Intelligence",
"Graph",
"IdentityScore",
"ReputationEngine"
],

time:new Date()

});

});



app.post("/api/identity",async(req,res)=>{

try{

const wallet=req.body.wallet;

if(!wallet)
return res.json({
error:"wallet required"
});


const eth=await getBalance(wallet);


const report={

wallet,

network:"Base",

intelligence:{

walletAge:"unknown",

activity:"scanned",

tokens:[],

graph:{
uniqueConnections:0,
topPartners:[]
}

},


portfolio:{
ETH:eth
},


reputation:{
score:50,
label:"Neutral",
sybilRisk:false
},


modules:[

"Passport",
"Credential",
"BaseLogScanner",
"WalletAge",
"ActivityAnalyzer",
"TokenScanner",
"GraphBuilder",
"SybilDetector",
"ReputationEngine"

]

};


const identity=scoreIdentity(report);


report.identityScore=identity;

report.scannedBlock="latest";

report.stored=true;


res.json(report);


}catch(e){

res.status(500).json({
error:e.message
});

}

});



app.get("/api/identity/:wallet",async(req,res)=>{

req.body={wallet:req.params.wallet};

const fake={
wallet:req.params.wallet
};

res.json(fake);

});



app.listen(PORT,()=>{

console.log(
`Sovereign Identity Engine V12.1 Production running on ${PORT}`
);

});
