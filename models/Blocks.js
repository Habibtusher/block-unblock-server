const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema(
  {
    blockedName: {
      type: String,
    },
    blockedEmail: {
      type: String,
    },
    email: {
      type: String,
    },
 
  },

);

module.exports = mongoose.model("blockList", BlockSchema);
