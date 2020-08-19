require("dotenv").config();

const getData = (sXAU, sXAURate) => {
  // Discord.js Config
  const Discord = require("discord.js");
  const client = new Discord.Client();
  const token = process.env.TEST_TOKEN;
  const serverId = process.env.SERVER_ID;

  // ** INVOKE DISCORD BOT **
  client.on("ready", () => {
    console.log(`sXAU Discord bot is Online, updating NAME & ACITVITY with fetched data`);
    const guild = client.guilds.cache.get(`${serverId}`);

    console.log(`logging from bot sXAU: ${sXAURate}`)

    // SET BOT NAME
    guild.me.setNickname(` ${sXAURate} `);

    // SET ACTIVITY
    client.user.setActivity(`${sXAU}`, {
      type: "PLAYING",
    });
  });

  client.login(token);
};
exports.getData = getData;
