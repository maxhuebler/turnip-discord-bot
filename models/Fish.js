const mongoose = require("mongoose");

const FishSchema = mongoose.Schema(
  {
    name: String,
    price: Number,
    seasonality: String,
    availability: String,
    location: String
  },
  { versionKey: false }
);

module.exports = mongoose.model("Fishes", FishSchema);
