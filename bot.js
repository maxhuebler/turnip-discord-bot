const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();
const fs = require("fs");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async message => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
    return;
  let arg = message.content.slice(process.env.PREFIX.length).split(" ");
  const command = arg.shift();
  let price = parseInt(arg, 10);

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var hr = today.getHours();

  if (arg.length === 0) {
    fs.readFile("./buying.md", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      msg = message.channel.send(data.toString());
    });
    return;
  } else if (arg.length === 1) {
    if (price >= 15 && price <= 800) {
      // If no arguments are given, display all current prices.
      let msg = await message.reply(
        `adding your stonks to the stonk market (${price} bells)`
      );

      // Let's check to see if the user has already added an entry
      // TODO: Fix unable for new users to actual add their own price.
      fs.readFile("./buying.md", { encoding: "utf-8" }, function(err, data) {
        if (err) return console.log(err);

        let replacement = message.member.user.tag;
        var re = new RegExp(
          `> \\*\\*${replacement}\\*\\*\\: \\d{1,3} bells \\(\\*\\*\\d{1,2}\\/\\d{1,2}\\*\\*\\) \\w*`,
          `g`
        );
        let result = data.replace(
          re,
          `> **${message.member.user.tag}**: ${price} bells (**${mm}/${dd}**) ${
            hr > 12 ? `afternoon` : `morning`
          }`
        );

        fs.writeFile("./buying.md", result, `utf8`, function(err) {
          if (err) return console.log(err);
        });
      });
    } else {
      await message.reply("please enter a valid number from 15 to 800.");
      return;
    }
  }
});

client.login(process.env.TOKEN);
