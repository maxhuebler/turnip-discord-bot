require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require("mongoose");
const User = require("./models/User");
const Fish = require("./models/Fish");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
});

client.on("message", async message => {
  if (!message.content.startsWith("!") || message.author.bot) return;
  let arg = message.content.slice("!".length).split(" ");
  const command = arg.shift();
  console.log(arg);
  console.log(arg.length);

  let time = new Date();
  let dd = time.getDate();
  let mm = time.getMonth() + 1;
  let hr = time.getHours();

  if (command === "fish") {
    if (!arg.length) {
      let msg = "> All fishes:\n";
      Fish.find({}, null, { sort: { name: 1 } }, function(err, fishes) {
        fishes.forEach(function(fish) {
          msg += "> **" + fish.name + "**: " + fish.price + "\n";
        });
        message.channel.send(msg);
      });
    } else if (arg.length == 1) {
      let msg = `> All fish that can be caught in ${arg[0]} sorted by name:\n`;
      Fish.find({}, null, { sort: { name: 1 } }, function(err, fishes) {
        fishes.forEach(function(fish) {
          if (
            fish.seasonality.includes(arg[0]) ||
            fish.seasonality.includes("All months")
          ) {
            msg += "> **" + fish.name + "**: " + fish.price + "\n";
          }
        });
        message.channel.send(msg);
      });
    } else if (arg.length == 2) {
      if (arg[1] === "location") {
        let msg = `> All fish that can be caught in ${arg[0]} sorted by location:\n`;
        Fish.find({}, null, { sort: { location: 1 } }, function(err, fishes) {
          fishes.forEach(function(fish) {
            if (
              fish.seasonality.includes(arg[0]) ||
              fish.seasonality.includes("All months")
            ) {
              msg += "> **" + fish.name + "**: " + fish.location + "\n";
            }
          });
          message.channel.send(msg);
        });
      } else if (arg[1] === "price") {
        let msg = `> All fish that can be caught in ${arg[0]} sorted by price:\n`;
        Fish.find({}, null, { sort: { price: -1 } }, function(err, fishes) {
          fishes.forEach(function(fish) {
            if (
              fish.seasonality.includes(arg[0]) ||
              fish.seasonality.includes("All months")
            ) {
              msg += "> **" + fish.name + "**: " + fish.price + "\n";
            }
          });
          message.channel.send(msg);
        });
      } else if (arg[1] === "time") {
        let msg = `> All fish that can be caught in ${arg[0]} sorted by time:\n`;
        Fish.find({}, null, { sort: { availability: -1 } }, function(err, fishes) {
          fishes.forEach(function(fish) {
            if (
              fish.seasonality.includes(arg[0]) ||
              fish.seasonality.includes("All months")
            ) {
              msg += "> **" + fish.name + "**: " + fish.availability + "\n";
            }
          });
          message.channel.send(msg);
        });
      }
    }
  }

  if (command === "fruit") {
    if (!arg.length) {
      let msg = "> Native fruits:\n";
      User.find({}, null, { sort: { fruit: -1 } }, function(err, users) {
        users.forEach(function(user) {
          msg += "> **" + user.username + "**: " + user.fruit + "\n";
        });
        message.channel.send(msg);
      });
    } else if (arg == "peach" || arg == "orange" || arg == "apple" || arg == "pear" || arg == "cherry") {
      User.findOne({ username: message.member.user.tag })
        .then(user => {
          if (user) {
            user.fruit = arg.toString();
          user.save(function(err) {
            if (err) console.log(err);
          });
          let msg = message.reply(
            `adding your native fruit ${arg} to the list!`
          );
        }
      });
    } else if (arg == "coconut") {
      let msg = message.reply("coconuts are not real");
    } else {
      await message.reply(
        "please enter a valid native fruit (peach, orange, apple, pear, cherry)"
      );
    }
  }

  if (command === "buying") {
    let price = parseInt(arg, 10);
    // If no argument was passed, just post the price list without creating a new user.
    if (!arg.length) {
      let msg = `> The price of turnips that are being bought: __**(${mm}/${dd}) ${hr >= 12 ? `afternoon` : `morning`}**__\n`;
      User.find({}, null, { sort: { bells: -1 } }, function(err, users) {
        users.forEach(function(user) {
          msg +=
            "> **" + user.username + "**: " + user.bells + " bells " + "\n";
        });
        message.channel.send(msg);
      });
      // Argument was passed to the buying command
    } else if (price >= 15 && price <= 800) {
      User.findOne({ username: message.member.user.tag })
        .then(user => {
          // If the user already exists, let's just update that user
          if (user) {
            const previous = user.bells;
            user.bells = price;
            user.save(function(err) {
              if (err) console.log(err);
            });
            let msg = message.reply(
              `updating your stonks on the stalk market (${price} bells) ${
                previous < price ? `📈 stonks` : `📉 not stonks`
              }`
            );
            // Otherwise, let's create a new user with the argument that was passed
          } else {
            const user = new User({
              username: message.member.user.tag,
              bells: isNaN(price) ? 0 : price
            });
            user.save().catch(err => console.log(err));
            message.reply(
              "thank you for posting your stonk prices for the first time!"
            );
          }
        })
        .catch(err => console.log(err));
    } else {
      await message.reply("please enter a valid number from 15 to 800.");
    }
  }
});

client.login(process.env.TOKEN);
