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

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (err) {
    console.log(err);
    message.reply("there was an err trying to execute that command!");
  }
});

client.login(process.env.TOKEN);
