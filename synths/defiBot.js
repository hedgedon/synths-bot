require("dotenv").config();

const getData = (sDEFI, sDEFIRate) => {
  // Discord.js Config
  const Discord = require("discord.js");
  const client = new Discord.Client();
  const token = process.env.SDEFI_TOKEN;
  const serverId = process.env.SERVER_ID;

  async function fetchIt() {
    const guild = client.guilds.cache.get(`${serverId}`);

    // SET BOT NAME
    guild.me.setNickname(`$${sDEFIRate} `);

    // SET ACTIVITY
    client.user.setActivity(`${sDEFI}`, {
      type: "PLAYING",
    });
  }

  // ** INVOKE DISCORD BOT **
  client.on("ready", () => {
    console.log("Discord bot is Online, please wait while fetching data");
    fetchIt();
  });

  client.login(token);
};
exports.getData = getData;
