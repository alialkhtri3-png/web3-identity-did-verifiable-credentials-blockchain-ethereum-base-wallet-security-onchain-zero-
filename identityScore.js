export function calculateIdentityScore(data){

let score = 50;

// الرصيد
let eth = Number(data.portfolio?.ETH || 0);

if(eth > 1) score += 10;
if(eth > 10) score += 10;


// النشاط
if(data.intelligence?.activity === "scanned")
    score += 10;


// Graph
let connections =
data.intelligence?.graph?.uniqueConnections || 0;

if(connections > 5)
    score += 10;

if(connections > 50)
    score += 10;


// Tokens
let tokens =
data.intelligence?.tokens?.length || 0;

if(tokens > 2)
    score += 5;


// Sybil
if(data.reputation?.sybilRisk)
    score -= 30;


// حدود
if(score > 100)
    score = 100;

if(score < 0)
    score = 0;


let label="Unknown";

if(score >= 80)
 label="Trusted";

else if(score >=60)
 label="Established";

else if(score >=40)
 label="Neutral";

else
 label="Risky";


return {
score,
label
};

}
