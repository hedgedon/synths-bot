require("dotenv").config();
// Discord.js Config
const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.IETH_TOKEN;
const serverId = process.env.SERVER_ID;
client.login(token);

// ** INVOKE DISCORD BOT **
client.on("ready", () => {
  console.log(
    `>>> iETH Discord bot is Online, please wait while its fetching data <<<`
  );
  setBot();
});
client.on("rateLimit", (info) => {
  console.log(
    `Rate limit hit ${
      info.timeDifference
        ? info.timeDifference
        : info.timeout
        ? info.timeout
        : "Unknown timeout "
    }`
  );
});

async function setBot(iETH, iETHRate) {
  try {
    const guild = client.guilds.cache.get(`${serverId}`);

    console.log(`logging from bot sXAU: ${iETHRate}`);

    // SET BOT NAME
    await guild.me.setNickname(`$${iETHRate}`);

    // SET ACTIVITY
    await client.user.setActivity(`${iETH}`, {
      type: "PLAYING",
    });
    console.log("executed setBot() to set the name & activity!");
  } catch (error) {
    console.log("Your Error: ", error);
  }
}
exports.setBot = setBot;
