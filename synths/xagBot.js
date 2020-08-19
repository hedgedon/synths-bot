require("dotenv").config();

const getData = (sXAG, sXAGRate) => {
  // Discord.js Config
  const Discord = require("discord.js");
  const client = new Discord.Client();
  const token = process.env.TEST2_TOKEN;
  const serverId = process.env.SERVER_ID;

  // ** INVOKE DISCORD BOT **
  client.on("ready", () => {
    console.log(`sXAG Discord bot is Online, updating NAME & ACITVITY with fetched data`);
    const guild = client.guilds.cache.get(`${serverId}`);

    console.log(`logging from bot sXAG: ${sXAGRate}`)
    // SET BOT NAME
    guild.me.setNickname(` ${sXAGRate} `);

    // SET ACTIVITY
    client.user.setActivity(`${sXAG}`, {
      type: "PLAYING",
    });
  });

  client.login(token);
};
exports.getData = getData;
