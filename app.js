require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

const User = require("./models/User");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

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

  User.findOne({ username: message.member.user.tag })
    .then(user => {
      if (user) {
        console.log("User already taken");
      } else {
        const user = new User({
          username: message.member.user.tag,
          bells: 0,
          time: `(${mm}/${dd}) ${hr > 12 ? `afternoon` : `morning`}`
        });
        user
          .save()
          .then(result => console.log(result))
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));

  // If no arguments are given, display all current prices.
  if (arg.length === 0) {
    let msg = "> The price of turnips that are being bought:\n"
    User.find({}, function(err, users) {
      users.forEach(function(user) {
        msg += ("> **" + user.username + "**: **" + user.bells + "** bells" + user.time + "\n");
      });
      message.channel.send(msg);
    });
  // Command: (!buying {price}) update the users bell amount
  } else {
    if (price >= 15 && price <= 800) {
      let msg = await message.reply(
        `adding your stonks to the stonk market (${price} bells)`
      );
      User.findOne({ username: message.member.user.tag}, function (err, user) {
        user.bells = price;
        user.save(function (err) {
          if (err) console.log(err);
        })
      });
    } else {
      await message.reply("please enter a valid number from 15 to 800.");
      return;
    }
  }
});

client.login(process.env.TOKEN);
