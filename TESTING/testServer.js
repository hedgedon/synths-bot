
// Fetch your rates in this file

const { request, gql } = require("graphql-request");
const timestamp = require("time-stamp");
const cron = require("node-cron");

const { ethers } = require("ethers");

// const xauBot = require("./synths/xauBot");
const testBot = require("./testBot");


const query = gql`
  {
    xau: rateUpdates(
      first: 1
      orderBy: block
      orderDirection: desc
      where: { synth: "sXAU" }
    ) {
      block
      synth
      rate
    }    
  }
`;

const url =
  "https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-rates";

let sXAU = "";
let sXAURate = 0;

let sXAG = "";
let sXAGRate = 0;

let sDEFI = "";
let sDEFIRate = 0;


// Every time cron scheduler is called, fetch the API to get data and update discord bot
cron.schedule("*/5 * * * * *", () => {
  console.log("------");
  console.log("running cron every 5 secs...")

  request(url, query).then((data) => {
    const timeStamp = timestamp.utc("YYYY/MM/DD:mm:ss");

    sXAU = data.xau[0].synth; 
    sXAURate = Number(ethers.utils.formatEther(data.xau[0].rate)).toFixed(2); 

    console.log(sXAU, sXAURate); 
    console.log(`*fetched at: ${timeStamp}`);
    
    return { sXAU, sXAURate };
  })
  .catch(err => {
    console.log("YOUR ERROR: ", err)
  });

  // call the imported getData function and pass in the 2 values from the request above
  console.log('about to call getData()') 
  testBot.getData(sXAU, sXAURate);
});


