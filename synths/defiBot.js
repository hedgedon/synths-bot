require("dotenv").config();

const getData = (sDEFI, sDEFIRate) => {
  // Discord.js Config
  const Discord = require("discord.js");
  const client = new Discord.Client();
  const token = process.env.TEST3_TOKEN;
  const serverId = process.env.SERVER_ID;

  // ** INVOKE DISCORD BOT **
  client.on("ready", () => {
    console.log(`sDEFI Discord bot is Online, updating NAME & ACITVITY with fetched data`);
    const guild = client.guilds.cache.get(`${serverId}`);

    console.log(`logging from bot sDEFI: ${sDEFIRate}`)

    // SET BOT NAME
    guild.me.setNickname(` ${sDEFIRate} `);

    // SET ACTIVITY
    client.user.setActivity(`${sDEFI}`, {
      type: "PLAYING",
    });
  });

  client.login(token);
};
exports.getData = getData;
