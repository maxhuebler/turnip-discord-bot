const User = require("../models/User");

module.exports = {
  name: "buying",
  description:
    "Returns sorted list of current turnip prices set by users with !turnip {price}",
  execute(message, args) {
    let time = new Date();
    let dd = time.getDate();
    let mm = time.getMonth() + 1;
    let hr = time.getHours();

    let price = parseInt(args, 10);
    // If no argsument was passed, just post the price list without creating a new user.
    if (!args.length) {
      let msg = `> The price of turnips that are being bought: __**(${mm}/${dd}) ${
        hr >= 12 ? `afternoon` : `morning`
      }**__\n`;
      let headerLength = msg.length;
      User.find({}, null, { sort: { bells: -1 } }, function(err, users) {
        users.forEach(function(user) {
          if (user.bells != 0) {
            msg +=
            "> **" + user.username + "**: " + user.bells + " bells " + "\n";
          } 
        });
        if (headerLength == msg.length) {
          message.channel.send(msg + `> __No prices have been inputed yet this ${
            hr >= 12 ? `afternoon` : `morning`}__`);
        } else {
          message.channel.send(msg);
        }
      });
      // Argsument was passed to the buying command
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
            // Otherwise, let's create a new user with the argsument that was passed
          } else {
            const user = new User({
              username: message.member.user.tag,
              snowflake: message.member.user.id,
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
      message.reply("please enter a valid number from 15 to 800.");
    }
  }
};
