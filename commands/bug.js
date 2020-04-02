const Bugs = require("../models/Bug");

module.exports = {
  name: "bug",
  description:
    "Returns list of bugs sorted by users with !bug {month} {location | price | time}",
  execute(message, args) {
    if (!args.length) {
      message.reply(
        "please use the form at of !bug {month} {location | price | time}"
      );
    } else if (args.length == 1) {
      let msg = `> All bugs that can be caught in ${args[0]} sorted by name:\n`;
      Bugs.find({}, null, { sort: { name: 1 } }, function(err, bugs) {
        bugs.forEach(function(bug) {
          if (
            bug.seasonality.includes(args[0]) ||
            bug.seasonality.includes("All months")
          ) {
            msg += "> **" + bug.name + "**: " + bug.price + "\n";
          }
        });
        message.channel.send(msg);
      });
    } else if (args.length == 2) {
      if (args[1] === "location") {
        let msg = `> All bugs that can be caught in ${args[0]} sorted by location:\n`;
        Bugs.find({}, null, { sort: { location: 1 } }, function(err, bugs) {
          bugs.forEach(function(bug) {
            if (
              bug.seasonality.includes(args[0]) ||
              bug.seasonality.includes("All months")
            ) {
              msg += "> **" + bug.name + "**: " + bug.location + "\n";
            }
          });
          message.channel.send(msg);
        });
      } else if (args[1] === "price") {
        let msg = `> All bugs that can be caught in ${args[0]} sorted by price:\n`;
        Bugs.find({}, null, { sort: { price: -1 } }, function(err, bugs) {
          bugs.forEach(function(bug) {
            if (
              bug.seasonality.includes(args[0]) ||
              bug.seasonality.includes("All months")
            ) {
              msg += "> **" + bug.name + "**: " + bug.price + "\n";
            }
          });
          message.channel.send(msg);
        });
      } else if (args[1] === "time") {
        let msg = `> All bugs that can be caught in ${args[0]} sorted by time:\n`;
        Bugs.find({}, null, { sort: { availability: -1 } }, function(
          err,
          bugs
        ) {
          bugs.forEach(function(bug) {
            if (
              bug.seasonality.includes(args[0]) ||
              bug.seasonality.includes("All months")
            ) {
              msg += "> **" + bug.name + "**: " + bug.availability + "\n";
            }
          });
          message.channel.send(msg);
        });
      }
    }
  }
};
