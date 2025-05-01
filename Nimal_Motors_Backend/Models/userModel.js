import mongoose from "mongoose";

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      default: ""  // We'll set this manually in the pre-save hook
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: [
        "premiumCustomer",
        "admin",
        "bodyshopsupervisor",
        "electricalsupervisor",
        "mechanicalsupervisor",
        "servicesupervisor",
        "accountant"
      ]
    }
  },
  { timestamps: true } // adds createdAt and updatedAt
);

userSchema.pre("save", async function (next) {
    if (this.isNew && !this.userId) {
      try {
        const lastUser = await mongoose.model("User").findOne().sort({ createdAt: -1 });
  
        let nextId = 1;
  
        if (lastUser && lastUser.userId) {
          const match = lastUser.userId.match(/USR-(\d+)/);
          if (match) {
            nextId = parseInt(match[1], 10) + 1;
          }
        }
  
        this.userId = `USR-${nextId.toString().padStart(3, "0")}`;
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  });
  
// Create the User model
const User = mongoose.model("User", userSchema);
export default User;
