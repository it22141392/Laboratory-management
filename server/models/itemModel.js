const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    Treatment: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } 
);

const itemModel = mongoose.model("Lab", itemSchema);

module.exports = itemModel;