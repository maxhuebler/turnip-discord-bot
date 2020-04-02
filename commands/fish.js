const Fishes = require("../models/Fish");

module.exports = {
  name: "fish",
  description:
    "Returns list of fish sorted by users with !fish {month} {location | price | time}",
  execute(message, args) {
    if (!args.length) {
      message.reply(
        "please use the form at of !fish {month} {location | price | time}"
      );
    } else if (args.length == 1) {
      let msg = `> All fish that can be caught in ${args[0]} sorted by name:\n`;
      Fishes.find({}, null, { sort: { name: 1 } }, function(err, fishes) {
        fishes.forEach(function(fish) {
          if (
            fish.seasonality.includes(args[0]) ||
            fish.seasonality.includes("All months")
          ) {
            msg += "> **" + fish.name + "**: " + fish.price + "\n";
          }
        });
        message.channel.send(msg);
      });
    } else if (args.length == 2) {
      if (args[1] === "location") {
        let msg = `> All fish that can be caught in ${args[0]} sorted by location:\n`;
        Fishes.find({}, null, { sort: { location: 1 } }, function(err, fishes) {
          fishes.forEach(function(fish) {
            if (
              fish.seasonality.includes(args[0]) ||
              fish.seasonality.includes("All months")
            ) {
              msg += "> **" + fish.name + "**: " + fish.location + "\n";
            }
          });
          message.channel.send(msg);
        });
      } else if (args[1] === "price") {
        let msg = `> All fish that can be caught in ${args[0]} sorted by price:\n`;
        Fishes.find({}, null, { sort: { price: -1 } }, function(err, fishes) {
          fishes.forEach(function(fish) {
            if (
              fish.seasonality.includes(args[0]) ||
              fish.seasonality.includes("All months")
            ) {
              msg += "> **" + fish.name + "**: " + fish.price + "\n";
            }
          });
          message.channel.send(msg);
        });
      } else if (args[1] === "time") {
        let msg = `> All fish that can be caught in ${args[0]} sorted by time:\n`;
        Fishes.find({}, null, { sort: { availability: -1 } }, function(
          err,
          fishes
        ) {
          fishes.forEach(function(fish) {
            if (
              fish.seasonality.includes(args[0]) ||
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
};
