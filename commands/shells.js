const Shells = require("../models/Shell");

module.exports = {
  name: "shells",
  description:
    "Returns sorted list of shells by name or price with !shells {price}",
  execute(message, args) {
    if (!args.length) {
      let msg = `> All shells that can be found sorted by name:\n`;
      Shells.find({}, null, { sort: { name: 1 } }, function(err, shells) {
        shells.forEach(function(shell) {
          msg += "> **" + shell.name + "**: " + shell.price + "\n";
        });
        message.channel.send(msg);
      });
    } else if (args[0] === "price") {
      let msg = `> All shells that can be found sorted by price:\n`;
      Shells.find({}, null, { sort: { price: -1 } }, function(err, shells) {
        shells.forEach(function(shell) {
          msg += "> **" + shell.name + "**: " + shell.price + "\n";
        });
        message.channel.send(msg);
      });
    } else {
      message.reply("please enter a valid argument !shells {price}");
    }
  }
};
