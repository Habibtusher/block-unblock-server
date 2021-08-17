const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: async (email) => {
        try {
            const result = await userModel.findOne({ email: email })
            if (result) throw new Error("duplicity detected: email :" + email);
        } catch (error) {
            throw new Error(error);
        }
    }
    },
    password: {
      type: String,
    },
    name: {
      type: String
    }
  },

);

UserSchema.statics.isThisEmailUse = async function (email) {
  if (!email) throw new Error('Invalid Email')
  try {
      const user = await this.findOne({ email })
      if (user) return false

      return true
  } catch (error) {
      console.log('Error inside isThisEmailUse', error.message)
      return false
  }
}
const userModel = mongoose.model("user", UserSchema);
module.exports= userModel;
