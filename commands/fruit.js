const User = require("../models/User");

module.exports = {
  name: "fruit",
  description:
    "Returns sorted list of native fruit set by users with !fruit {peach|orange|apple|pear|cherry}",
  execute(message, args) {
    if (!args.length) {
      let msg = "> Native fruits:\n";
      User.find({}, null, { sort: { fruit: -1 } }, function(err, users) {
        users.forEach(function(user) {
          msg += "> **" + user.username + "**: " + user.fruit + "\n";
        });
        message.channel.send(msg);
      });
    } else if (
      args == "peach" ||
      args == "orange" ||
      args == "apple" ||
      args == "pear" ||
      args == "cherry"
    ) {
      User.findOne({ username: message.member.user.tag }).then(user => {
        if (user) {
          user.fruit = args.toString();
          user.save(function(err) {
            if (err) console.log(err);
          });
          let msg = message.reply(
            `adding your native fruit ${args} to the list!`
          );
        }
      });
    } else {
      message.reply(
        "please enter a valid native fruit (peach, orange, apple, pear, cherry)"
      );
    }
  }
};
