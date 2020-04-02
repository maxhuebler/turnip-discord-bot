require("dotenv").config();
const Discord = require("discord.js");
const mongoose = require("mongoose");
const fs = require("fs");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
});

client.on("message", async message => {
  if (!message.content.startsWith("!") || message.author.bot) return;
  let args = message.content.slice("!".length).split(" ");
  const command = args.shift();

  if (command === "fish") {
    client.commands.get("fish").execute(message, args);
  } else if (command === "bug") {
    client.commands.get("bug").execute(message, args);
  } else if (command === "fruit") {
    client.commands.get("fruit").execute(message, args);
  } else if (command === "buying") {
    client.commands.get("buying").execute(message, args);
  }
});

client.login(process.env.TOKEN);
