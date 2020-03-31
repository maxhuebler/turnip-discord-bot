require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Heroku Scheduler job that runs this daily bell reset at (12am/pm EST)
User.updateMany({}, { bells: 0 }, function(err) {
  if (err) { console.log(err); }
});
