require("dotenv").config();

const getData = (sXAU, sXAURate) => {
  // Discord.js Config
  const Discord = require("discord.js");
  const client = new Discord.Client();
  const token = process.env.SXAU_TOKEN;
  const serverId = process.env.SERVER_ID;

  // ** INVOKE DISCORD BOT **
  client.on("ready", () => {
    console.log("Discord bot is Online, please wait while fetching data");
    const guild = client.guilds.cache.get(`${serverId}`);

    // SET BOT NAME
    guild.me.setNickname(`$${sXAURate} `);

    // SET ACTIVITY
    client.user.setActivity(`${sXAU}`, {
      type: "PLAYING",
    });
  });

  client.login(token);
};
exports.getData = getData;
