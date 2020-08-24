require("dotenv").config();
// Discord.js Config
const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.SXAG_TOKEN;
const serverId = process.env.SERVER_ID;
client.login(token);

// ** INVOKE DISCORD BOT **
client.on("ready", () => {
  console.log(
    `>>> sXAG Discord bot is Online, please wait while its fetching data <<<`
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

async function setBot(sXAG, sXAGRate) {
  try {
    const guild = client.guilds.cache.get(`${serverId}`);

    console.log(`logging from bot sXAG: ${sXAGRate}`);

    // SET BOT NAME
    guild.me.setNickname(` ${sXAGRate} `);

    // SET ACTIVITY
    client.user.setActivity(`${sXAG}`, {
      type: "PLAYING",
    });
    console.log("executed setBot() to set the name & activity!");
  } catch (error) {
    console.log("Your Error: ", error);
  }
}
exports.setBot = setBot;
