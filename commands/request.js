const User = require("../models/User");

module.exports = {
  name: "request",
  description:
    "Requests the highest or inputted user for access to their island to sell turnips",
  args: true,
  usage: "<highest | username>",
  execute(message, args) {
    if (args.length == 1) {
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
        message.reply(
          "please enter a valid argument !request <highest | username>"
        );
      }
    }
  }
};
