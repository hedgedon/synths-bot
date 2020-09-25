const { request, gql } = require("graphql-request");
const timestamp = require("time-stamp");
const cron = require("node-cron");

const { ethers } = require("ethers");

const xauBot = require("./synths/xauBot");
const xagBot = require("./synths/xagBot");
const defiBot = require("./synths/defiBot");
const ibtcBot = require("./synths/ibtcBot");
const iethBot = require("./synths/iethBot");

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
    ibtc: rateUpdates(
      first: 1
      orderBy: block
      orderDirection: desc
      where: { synth: "iBTC" }
    ) {
      block
      synth
      rate
    }
    ieth: rateUpdates(
      first: 1
      orderBy: block
      orderDirection: desc
      where: { synth: "iETH" }
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

let iBTC = "";
let iBTCRate = 0;

let iETH = "";
let iETHRate = 0;

const getData = () => {
  const fetchQuery = () => {
    request(url, query).then((data) => {
      const timeStamp = timestamp.utc("YYYY/MM/DD:mm:ss");

      sXAU = data.xau[0].synth;
      sXAURate = Number(ethers.utils.formatEther(data.xau[0].rate)).toFixed(2);

      sXAG = data.xag[0].synth;
      sXAGRate = Number(ethers.utils.formatEther(data.xag[0].rate)).toFixed(2);

      sDEFI = data.sdefi[0].synth;
      sDEFIRate = Number(ethers.utils.formatEther(data.sdefi[0].rate)).toFixed(
        2
      );

      iBTC = data.ibtc[0].synth;
      iBTCRate = Number(ethers.utils.formatEther(data.ibtc[0].rate)).toFixed(2);

      iETH = data.ieth[0].synth;
      iETHRate = Number(ethers.utils.formatEther(data.ieth[0].rate)).toFixed(2);

      console.log(sXAU, sXAURate);
      console.log(sXAG, sXAGRate);
      console.log(sDEFI, sDEFIRate);
      console.log(iBTC, iBTCRate);
      console.log(iETH, iETHRate);

      console.log(`*fetched at: ${timeStamp}`);

      return { sXAU, sXAURate, sXAG, sXAGRate, sDEFI, sDEFIRate, iBTC, iBTCRate, iETH, iETHRate };
    });
  };

  cron.schedule("*/15 * * * * *", () => {
    console.log("------");
    console.log(
      timestamp.utc("[YYYY/MM/DD:mm:ss]") + "running a task every 60 sec"
    );
    fetchQuery();
    xauBot.setBot(sXAU, sXAURate);
    xagBot.setBot(sXAG, sXAGRate);
    defiBot.setBot(sDEFI, sDEFIRate);
    ibtcBot.setBot(iBTC, iBTCRate);
    iethBot.setBot(iETH, iETHRate);
  });
};
exports.getData = getData;
