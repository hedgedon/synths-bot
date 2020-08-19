
// Fetch your rates in this file

const { request, gql } = require("graphql-request");
const timestamp = require("time-stamp");
const cron = require("node-cron");

const { ethers } = require("ethers");

// const xauBot = require("./synths/xauBot");
const testBot = require("./testBot");
const test2Bot = require("./test2Bot");
const test3Bot = require("./test3Bot");


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
    xag: rateUpdates(
      first: 1
      orderBy: block
      orderDirection: desc
      where: { synth: "sXAG" }
    ) {
      block
      synth
      rate
    }  
    sdefi: rateUpdates(
      first: 1
      orderBy: block
      orderDirection: desc
      where: { synth: "sDEFI" }
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
cron.schedule("*/15 * * * * *", () => {
  console.log("------");
  console.log("running cron every 15 secs...")

  request(url, query).then((data) => {
    const timeStamp = timestamp.utc("YYYY/MM/DD:mm:ss");
    console.log(`>>> fetched at: [${timeStamp}] <<<`);
    // console.log(data)

    sXAU = data.xau[0].synth; 
    sXAURate = Number(ethers.utils.formatEther(data.xau[0].rate)).toFixed(2); 

    sXAG = data.xag[0].synth; 
    sXAGRate = Number(ethers.utils.formatEther(data.xag[0].rate)).toFixed(2); 

    sDEFI = data.sdefi[0].synth; 
    sDEFIRate = Number(ethers.utils.formatEther(data.sdefi[0].rate)).toFixed(2); 
    
    return { sXAU, sXAURate, sXAG, sXAGRate, sDEFI, sDEFIRate };
  })
  .catch(err => {
    console.log("YOUR ERROR: ", err)
  });

  // call the imported getData function and pass in the 2 values from the request above
  console.log('CALLING FUNCTION getData()') 
  testBot.getData(sXAU, sXAURate);
  test2Bot.getData(sXAG, sXAGRate);
  test3Bot.getData(sDEFI, sDEFIRate);
});


