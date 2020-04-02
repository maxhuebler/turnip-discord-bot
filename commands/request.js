const User = require("../models/User");

module.exports = {
  name: "request",
  description:
    "Returns sorted list of shells by name or price with !request {highest | {username}}",
  execute(message, args) {
    if (!args.length) {
      message.reply("please use the form at of !request {highest | user}");
    } else if (args.length == 1) {
      if (args[0] === "highest") {
        User.findOne()
          .sort("-bells")
          .exec(function(err, user) {
            message.client.users.fetch(user.snowflake).then(id => {
              message.channel.send(
                `Hey ${id}, ${message.author} wants to come to your island to sell their turnips!`
              );
            });
          });
      } else if (args[0].length === 21 || args[0].length === 22) {
        let snowflake = args[0].substring(3, args[0].length - 1);
        User.findOne({ snowflake: snowflake }, function(err, user) {
          message.client.users
            .fetch(user.snowflake)
            .then(id => {
              message.channel.send(
                `Hey ${id}, ${message.author} wants to come to your island to sell their turnips!`
              );
            })
            .catch(err => console.log(err));
        });
      } else {
        message.reply("please use the format !request {highest | {username}}");
      }
    }
  }
};
